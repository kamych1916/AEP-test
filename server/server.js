'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const shortid = require('shortid');
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const SECRET_KEY = '123456789'
const expiresIn = '1h'

const nodemailer = require('nodemailer');
const { type } = require('os');
const { reset } = require('nodemon');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function decryptCode(idecur){
  let bytes  = CryptoJS.AES.decrypt(idecur, 'AeP-idecur_2020');
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Create a token from a payload 
function createToken(payload){
  return jwt.sign({payload}, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated(data, mode){
  if(mode == "check_user"){
    return userdb.users.findIndex(user => user.email === data.email && user.password === data.password) !== -1
  }else if(mode == "check_email"){
    return userdb.users.findIndex(user => user.email === data) !== -1
  }else {
    return userdb.reset_links.findIndex(link => link.reset_link === data) !== -1
  }
}

let check_accsess = function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    
    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({status, message})
      return
    }
      next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
};

app.use(/^(?!\/auth).*$/, check_accsess);

app.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}, 'check_user') === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  let store_shortid = shortid.generate()
  const access_token = createToken({email, store_shortid})
  let UserStore = userdb.users.find((user) => {
    if(user.email == email){ return user }
  })
  let store_role = UserStore.role
  let store_idecur = CryptoJS.AES.encrypt(UserStore.id.toString(), 'AeP-idecur_2020').toString();
  res.status(200).json({access_token, store_role, store_idecur})
})

// START - АПИ ДЛЯ РЕГИСТРАЦИИ
app.post('/auth/registration', (req, res) => {
  const {username, phone_number, email, password} = req.body
  
  if (isAuthenticated(email, 'check_email') === true) {
    const status = 401
    const message = 'Incorrect email'
    res.status(status).json({status, message})
    return
  }

  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };

    // create color for avatar color css block 
    let letters = '0123456789ABCDEF';
    let store_avatar_color = '#';
    for (let i = 0; i < 6; i++) {
      store_avatar_color += letters[Math.floor(Math.random() * 16)];
    }

    // find last item in object for increment user id
    let last_item;
    for(let key of userdb.users) {
      last_item = key;
    }

    // create new object of new user
    var data = JSON.parse(data.toString());
    let new_user = {
      id: last_item.id+1,
      role: 'client',
      username: username,
      phone_number: phone_number,
      email: email,
      password: password,
      avatar_color: store_avatar_color,
      company_site: "",
      position: "",
      company_name: "",
      objects: []
    }
    data.users.push(new_user)

    //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return err
      }
    });
    let message = 'ok'
    res.status(200).json({message})
  })
})
// END - АПИ ДЛЯ РЕГИСТРАЦИИ


app.post('/auth/get_reset_code', (req, res) => {
  
  if (isAuthenticated(req.body.code, 'check_link') === false) {
    const status = 401
    const message = 'Incorrect link for reset password'
    res.status(status).json({status, message})
    return
  }

})

app.post('/auth/reset', (req, res) => {
  if(req.body.code != null && req.body.password != null && req.body.email != null){
    fs.readFile("./db.json", (err, data) => {  
      if (err) {
        return err
      };
      
      // Get current users data
      var data = JSON.parse(data.toString());
      
      for(let idx_code in data.reset_links){
        if(data.reset_links[idx_code].reset_link == req.body.code){
          data.reset_links.splice(idx_code, 1)
        } 
      }

      for(let idx_email in data.users){
        if(data.users[idx_email].email == req.body.email){
          data.users[idx_email].password = req.body.password
        }
      }
      // //Add new user
      fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          return err
        }
      });
      let message = 'ok'
      res.status(200).json({message})
    })
  }else{
    const status = 401
    const message = 'Incorrect query for reset password'
    res.status(status).json({status, message})
    return
  }

})

app.post('/auth/get_reset_code', (req, res) => {
  if (isAuthenticated(req.body.code, 'check_link') === false) {
    const status = 401
    const message = 'Incorrect link for reset password'
    res.status(status).json({status, message})
    return
  }
})

app.post('/auth/remember', (req, res) => {
    const email = req.body
    if (isAuthenticated(email.email, 'check_email') === false) {
      const status = 401
      const message = 'Incorrect email'
      res.status(status).json({status, message})
      return
    }
  
    let transporter = nodemailer.createTransport({
      host: 'smtp.jino.ru',
      port: 587,
      secure: false,
      requireTLS: true,
      debug: false,
      auth: {
          user: 'info@perugino.club',
          pass: 'perugino1916'
      },
    });
    const reset_code = crypto.randomBytes(16).toString("hex");
    let mailOptions = {
      from: 'AEP agency - info@perugino.club', // sender address
      to: 'krakhimov.it@gmail.com', // list of receivers
      subject: 'Сброс пароля AEP', // Subject line
      html: '<h2> Здравствуйте, для восстановления пароля перейдите по ссылке ' + 'http://localhost:3000/account/reset?id=' + reset_code + '&email='+ email.email +'</h2>'
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        res.status(status).json({err})
        console.log(err)
        return
      }else{
        fs.readFile("./db.json", (err, data) => {  
          if (err) {
            return err
          };
          
          // Get current users data
          var data = JSON.parse(data.toString());
      
          let new_reset_link = {"reset_link": reset_code} 
          
          //Add new user
          data.reset_links.push(new_reset_link)
    
          fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
              return err
            }
          });
    
        });
        res.status(200).json({info})
      }
    });
 
})

app.post('/test', (req, res) => {
  //id encrupt user
  const {idecur} = req.body
  console.log('kek-> ', decryptCode(idecur))
  let test = 'test'
  res.status(200).json({test})
})


app.post('/newUserData', (req, res) => {
  const {UserData} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };
    let UserStore = userdb.users.find((user) => {
      if(user.id == UserData.id){ return user }
    })
    // create new object of new user
    var data = JSON.parse(data.toString());
    data.users.splice(UserStore.id-1, 1, UserData)

    // //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return err
      }
    });
    let message = 'ok'
    res.status(200).json({message})
  })
})


app.post('/getClientInfo', (req, res) => {
  const {PageRole, UserRole, idecur} = req.body
  if(PageRole != UserRole){
    const status = 401
    const message = 'Dont have access for this request'
    res.status(status).json({status, message})
    return
  }else{
    let UserStore = userdb.users.find((user) => {
      if(user.id == decryptCode(idecur)){ return user }
    })
    if(UserStore){
      if(UserStore.role == UserRole){
        res.status(200).json({UserStore})
      }else{
        res.status(401)
        return
      }
    }else{
      res.status(401)
      return
    }
  }
})


app.post('/getObjects', (req, res) => {
  const {PageRole, UserRole, idecur} = req.body
  if(PageRole != UserRole){
    const status = 401
    const message = 'Dont have access for this request'
    res.status(status).json({status, message})
    return
  }else{
    let UserStore = userdb.users.find((user) => {
      if(user.id == decryptCode(idecur)){ return user }
    })
    if(UserStore){
      if(UserStore.role == UserRole){
        let ObjectsStore = []
        for(let idx of UserStore.objects){
          ObjectsStore.push(userdb.objects.find((object) => {
            if(object.id == idx){ return object }
          }))
        }
        res.status(200).json({ObjectsStore})
      }else{
        res.status(401)
        return
      }
    }else{
      res.status(401)
      return
    }
  }
})


app.post('/newObjectData', (req, res) => {
  const {ObjectData, idecur} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };

    // find last item in object for increment user id
    let last_item;
    for(let key of userdb.objects) {
      last_item = key;
    }

    let UserStore = userdb.users.find((user) => {
      if(user.id == decryptCode(idecur)){ return user }
    })
    UserStore.objects.push(last_item.id + 1)
    
    ObjectData.id = last_item.id + 1
    var data = JSON.parse(data.toString());
    data.users.splice(UserStore.id-1, 1, UserStore)
    data.objects.push(ObjectData)


    // //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return err
      }
    });
    let message = 'ok'
    res.status(200).json({message})
  })
})

app.listen(8000, () => {
  console.log('Run Auth API Server')
})