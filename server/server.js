'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const shortid = require('shortid');
const crypto = require("crypto");
const SECRET_KEY = '123456789'
const expiresIn = '1h'

const nodemailer = require('nodemailer');
const { type } = require('os');
const { reset } = require('nodemon');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
  let RoleStore = userdb.users.find((user) => {
    if(user.email == email){ return user }
  })
  let role = RoleStore.role
  res.status(200).json({access_token, role})
})

// START - АПИ ДЛЯ РЕГИСТРАЦИИ
app.post('/auth/registration', (req, res) => {
  const {username, telephone, email, password} = req.body
  
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
    
    // Get current users data
    var data = JSON.parse(data.toString());
    let new_user = {
      role: 'client',
      username: username,
      telephone: telephone,
      email: email,
      password: password
    }
    data.users.push(new_user)

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

app.get('/test', (req, res) => {
  let test = 'test'
  res.status(200).json({test})
})

app.listen(8000, () => {
  console.log('Run Auth API Server')
})