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
const expiresIn = '99999h'

const nodemailer = require('nodemailer');
const { type } = require('os');
const { reset } = require('nodemon');

const upload = require('express-fileupload');
const date = require('date-and-time');

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
function isAuthenticatedObjects(data, mode){
  if(mode == "check_user"){
    return userdb.objects.findIndex(object => object.email_employee === data.email && object.password === data.password) !== -1
  }else if(mode == "check_email"){
    return userdb.objects.findIndex(object => object.email_employee === data) !== -1
  }else {
    return userdb.reset_links.findIndex(link => link.reset_link === data) !== -1
  }
}

function getInitials( name, delimeter ) {
  if( name ) {
    let array = name.split( delimeter );
    switch ( array.length ) {
      case 1:
        return array[0].charAt(0).toUpperCase();
        break;
      default:
        return array[0].charAt(0).toUpperCase() + array[1].charAt(0).toUpperCase();
    }
  }
  return false;
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
app.use(upload())

app.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}, 'check_user') === false) {
    if(isAuthenticatedObjects({email, password}, 'check_user') === false){
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
  }

  let store_shortid = shortid.generate()
  const access_token = createToken({email, store_shortid})
  let UserStore = userdb.users.find((user) => {
    if(user.email == email){ return user }
  })
  let store_role
  let store_idecur

  if(UserStore){
  store_role = UserStore.role
    store_idecur = CryptoJS.AES.encrypt(UserStore.id.toString(), 'AeP-idecur_2020').toString();
  }else{
    let ObjectStore = userdb.objects.find((object) => {
      if(object.email_employee == email){ return object }
    })
    store_role = ObjectStore.role
    store_idecur = CryptoJS.AES.encrypt(ObjectStore.id.toString(), 'AeP-idecur_2020').toString();
  }
  
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
      note: "",
      objects: [],
      requests: []
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
      to: email.email, // list of receivers
      subject: 'Сброс пароля AEP', // Subject line
      html: '<h2> Здравствуйте, для восстановления пароля перейдите по ссылке ' + 'http://localhost:3000/account/reset?id=' + reset_code + '&email='+ email.email +'</h2>'
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        res.status(401).json({err})
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
    if(UserRole == 'executor'){
      let ObjectStore = userdb.objects.find((object) => {
        if(object.id == decryptCode(idecur)){ return object }
      })
      if(ObjectStore){
        if(ObjectStore.role == UserRole){
          res.status(200).json({ObjectStore})
        }else{
          const status = 401
          const message = 'Dont have access for this request'
          res.status(status).json({status, message})
          return
        }
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    }else{
      let UserStore = userdb.users.find((user) => {
        if(user.id == decryptCode(idecur)){ return user }
      })
      if(UserStore){
        if(UserStore.role == UserRole){
          res.status(200).json({UserStore})
        }else{
          const status = 401
          const message = 'Dont have access for this request'
          res.status(status).json({status, message})
          return
        }
      }else{
          const status = 401
          const message = 'Dont have access for this request'
          res.status(status).json({status, message})
          return
      }
    }
  }
})

app.post('/getClients', (req, res) => {
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
    if(UserStore.role == UserRole){
        let ClientsStore = [];
          for(let idx of userdb.users){
            if(idx.role != "admin"){
              ClientsStore.push(idx)
            }
          }          
            res.status(200).json({ClientsStore})
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
      }
  }
})

app.post('/getDataClientForAdmin', (req, res) => {
  const {PageRole, UserRole, idecur, ClientId} = req.body
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
        let ClientStore = userdb.users.find((user) => {
          if(user.id == ClientId){ return user }
        })
        res.status(200).json({ClientStore})
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    }else{
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }
})

app.post('/createNewClient', (req, res) => {
  const {UserRole, idecur, clientData} = req.body
  for(let idc of userdb.users){
    if(clientData.email == idc.email){
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
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
    if(!last_item){
      last_item = {}
      last_item.id = 0
    }

    // create new object of new user
    var data = JSON.parse(data.toString());
    clientData.id = last_item.id+1;
    clientData.role = 'client';
    clientData.avatar_color = store_avatar_color; 
    clientData.objects = [];

    data.users.push(clientData)

    //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    });
    let message = 'ok'
    res.status(200).json({message})
  })

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
    if(UserStore.role == UserRole){
        let ObjectsStore = [];
        if(UserStore.role == 'admin'){
          for(let idc of userdb.users){
            let streObj = []
            for(let idco of idc.objects){
              for(let ido of userdb.objects){
                if(ido.id == idco){
                  ido.company_name = idc.company_name
                  streObj.push(ido)
                }
              }
            }
            if(streObj.length > 0){
              ObjectsStore.push(streObj)
            }
          }
          res.status(200).json({ObjectsStore})
        }else{
          for(let idx of UserStore.objects){
            ObjectsStore.push(userdb.objects.find((object) => {
              if(object.id == idx){ return object }
            }))
          }          
          res.status(200).json({ObjectsStore})
        }
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
      }
  }
})

app.post('/getDataObject', (req, res) => {
  const {PageRole, UserRole, idecur, ObjectId} = req.body
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
        let ObjectStore = userdb.objects.find((object) => {
          if(object.id == ObjectId){ return object }
        })
        let NameWhoMade;
        for(let idu of userdb.users){
          for(let iduo of idu.objects){
            if(iduo == ObjectStore.id){
              NameWhoMade = idu.username 
            }
          }
        }
        res.status(200).json({ObjectStore, NameWhoMade})
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

app.post('/createDataObject', (req, res) => {
  const {ObjectData, idecur} = req.body
  for(let ido of userdb.objects){
    if(ObjectData.email == ido.email_employee){
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    };

    // create color for avatar color css block 
    let letters = '0123456789ABCDEF';
    let store_avatar_color = '#';
    for (let i = 0; i < 6; i++) {
      store_avatar_color += letters[Math.floor(Math.random() * 16)];
    }

    // find last item in object for increment user id
    let last_item;
    for(let key of userdb.objects) {
      last_item = key;
    }

    let UserStore = userdb.users.find((user) => {
      if(user.id == decryptCode(idecur)){ return user }
    })

    if(UserStore.role == 'admin'){
      UserStore = userdb.users.find((user) => {
        if(user.id == ObjectData.client){ return user }
      })
    }else{
      if(!ObjectData.client){
        ObjectData.client = parseInt(decryptCode(idecur))
      }
    }

    if(last_item){
      UserStore.objects.push(last_item.id + 1);
      ObjectData.id = last_item.id + 1;
    }else{
      ObjectData.id = 1;
      UserStore.objects.push(1);
    }
    
    ObjectData.role = "executor";
    ObjectData.position = "";
    ObjectData.avatar_color = store_avatar_color;
    ObjectData.object = 1;
    ObjectData.requests = [];
    ObjectData.amount_requests = 0;
    var data = JSON.parse(data.toString());
    data.users.splice(UserStore.id-1, 1, UserStore);
    data.objects.push(ObjectData);

    // //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    });
    let message = 'ok'
    res.status(200).json({ObjectData})
  })
})

app.post('/changeObjectData', (req, res) => {
  const {ObjectData} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };
    let ObjectStore = userdb.objects.find((object) => {
      if(object.id == ObjectData.id){ return object }
    })
    // create new object of new user
    var data = JSON.parse(data.toString());
    data.objects.splice(ObjectStore.id-1, 1, ObjectData)

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

app.post('/deleteObject', (req, res) => {
  const {ObjectId, idecur} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };

    let UserStore;
    for(let object in userdb.objects){
      if(userdb.objects[object].id == ObjectId){
        for(let client of userdb.users){
          console.log(client)
          if(userdb.objects[object].client == client.id){
            client.objects.splice(client.objects.indexOf(ObjectId), 1)
            UserStore = client
          }
        }
      }
    }    
    // create new object of new user
    var data = JSON.parse(data.toString());
    
    data.users.splice(UserStore.id-1, 1, UserStore)
    let StoreObject
    for(let object in userdb.objects){
      if(userdb.objects[object].id == ObjectId){
        StoreObject = object
      } 
      for(let objRqsts of userdb.objects[object].requests){
        for(let rqst of userdb.requests){
          if(objRqsts == rqst.id){
            data.requests.splice(rqst.id, 1)
          }
        }
      }
    }
    data.objects.splice(StoreObject, 1)
    

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

app.post('/getCLientsForCreateObject', (req, res) => {
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
    let ClientsStore = []
    if(UserStore.role == UserRole){
        for(let user of userdb.users){
          if(user.role != 'admin'){
            let text = user.username;
            let value = user.id;
            ClientsStore.push({value, text}) 
          }
        }
        res.status(200).json({ClientsStore})
    }else{
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }
})


app.post('/getRequests', (req, res) => {
  
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
    let ObjectStore = userdb.objects.find((object) => {
      if(object.id == decryptCode(idecur)){ return object }
    })
    let RequestsStore = []
    if(UserStore){
        if(UserStore.role == "admin"){
          for(let idx of userdb.requests){
            RequestsStore.push(idx) 
          }
          for(let idr in RequestsStore){
            for(let ido of userdb.objects){
              if(RequestsStore[idr].object == ido.id){
                RequestsStore[idr].object_address = ido.address
              }
            }
          }
        }else {
          for(let idx of userdb.users){
            if(idx.id == decryptCode(idecur)){
              for(let idco of idx.objects){
                for(let ido of userdb.objects){
                  if(idco == ido.id){
                    for(let idor of ido.requests){
                      for(let idr of userdb.requests){
                        if(idor == idr.id){
                          RequestsStore.push(idr)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          for(let idr in RequestsStore){
            for(let ido of userdb.objects){
              if(RequestsStore[idr].object == ido.id){
                RequestsStore[idr].object_address = ido.address
              }
            }
          }
        }
        res.status(200).json({RequestsStore})
    }else{
      if(ObjectStore.role == UserRole){
        for(let idx of ObjectStore.requests){
          RequestsStore.push(userdb.requests.find((request) => {
            if(request.id == idx){ return request }
          }))
        }
        for(let idr in RequestsStore){
          for(let ido of userdb.objects){
            if(RequestsStore[idr].object == ido.id){
              RequestsStore[idr].object_address = ido.address
            }
          }
        }
        res.status(200).json({RequestsStore})
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    }
  }
})

app.post('/getDataRequest', (req, res) => {
  const {PageRole, UserRole, idecur, RequestId} = req.body
  if(PageRole != UserRole){
    const status = 401
    const message = 'Dont have access for this request'
    res.status(status).json({status, message})
    return
  }else{
    let UserStore = userdb.users.find((user) => {
      if(user.id == decryptCode(idecur)){ return user }
    })
    let ObjectStore = userdb.objects.find((object) => {
      if(object.id == decryptCode(idecur)){ return object }
    })
    if(UserStore.role == UserRole){
      let RequestStore = userdb.requests.find((request) => {
        if(request.id == RequestId){ return request }
      })
      let ObjectsStore = []
      let AddressStore = []
      if(UserStore.role == 'admin'){
        for(let ido of userdb.objects){
          ObjectsStore.push(ido)
        }
        for(let object of ObjectsStore){
          let text = object.address;
          let value = object.id;
          AddressStore.push({value, text}) 
        }
      }else{
        for(let idx of UserStore.objects){
          ObjectsStore.push(userdb.objects.find((object) => {
            if(object.id == idx){ return object.address }
          }))
        }
        for(let object of ObjectsStore){
          let text = object.address;
          let value = object.id;
          AddressStore.push({value, text}) 
        }
      }
      res.status(200).json({RequestStore, AddressStore})
    }else{
      if(ObjectStore.role == UserRole){
        let RequestStore = userdb.requests.find((request) => {
          if(request.id == RequestId){ return request }
        })
        let AddressStore = []
        let text = ObjectStore.address;
        let value = ObjectStore.id;
        AddressStore.push({value, text})
        res.status(200).json({AddressStore, RequestStore})
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    }
  }
})

app.post('/getRqstObjtsAndSrvs', (req, res) => {
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
    let ObjectStore = userdb.objects.find((object) => {
      if(object.id == decryptCode(idecur)){ return object }
    })
    if(UserStore.role == UserRole){
      let ObjectsStore = []
      let AddressStore = []
      if(UserStore.role == 'admin'){
        for(let ido of userdb.objects){
          ObjectsStore.push(ido)
        }
        for(let object of ObjectsStore){
          let text = object.address;
          let value = object.id;
          AddressStore.push({value, text}) 
        }
      }else{          
        for(let idx of UserStore.objects){
          ObjectsStore.push(userdb.objects.find((object) => {
            if(object.id == idx){ return object.address }
          }))
        }
        for(let object of ObjectsStore){
          let text = object.address;
          let value = object.id;
          
          AddressStore.push({value, text}) 
        }
      }

      res.status(200).json({AddressStore})
    }else{
      if(ObjectStore.role == UserRole){
        let AddressStore = []
        let text = ObjectStore.address;
        let value = ObjectStore.id;
        AddressStore.push({value, text});
        
        ObjectStore.who_made = ObjectStore.fullname_responsible;
        ObjectStore.fullname_employee = ObjectStore.fullname_responsible;
        ObjectStore.phone_number_employee = ObjectStore.phone_number_responsible;
        ObjectStore.object = 1
        res.status(200).json({AddressStore, ObjectStore})
      }else{
        const status = 401
        const message = 'Dont have access for this request'
        res.status(status).json({status, message})
        return
      }
    }

  }
})

app.post('/getCLientsForCreateRequest', (req, res) => {
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
    let ClientsStore = []
    if(UserStore.role == UserRole){
        for(let user of userdb.users){
          if(user.role != 'admin'){
            let text = user.username;
            let value = user.id;
            ClientsStore.push({value, text}) 
          }
        }
        res.status(200).json({ClientsStore})
    }else{
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }
})

app.post('/getClientData', (req, res) => {
  const {PageRole, UserRole, idecur, idClient} = req.body
  if(PageRole != UserRole){
    const status = 401
    const message = 'Dont have access for this request'
    res.status(status).json({status, message})
    return
  }else{
    let UserStore = userdb.users.find((user) => {
      if(user.id == idClient){ return user }
    })
    let ObjectsStore = []
      for(let iduo of UserStore.objects){
        for(let ido of userdb.objects){
          if(iduo == ido.id){
            let text = ido.address;
            let value = ido.id;
            ObjectsStore.push({value, text})             
          }
        }
      }
      res.status(200).json({ObjectsStore})
  }
})

app.post('/createDataRequest', (req, res) => {
  const {RequestData, UserRole, idecur} = req.body
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };

    let last_item;
    for(let key of userdb.requests) {
      last_item = key;
    }
    if(!last_item){
      last_item = {}
      last_item.id = 0
    }

    var data = JSON.parse(data.toString());
    // if(UserRole == "client"){
    //   let ObjectStore = userdb.objects.find((object) => {
    //     if(object.address == RequestData.addres){ return object }
    //   })
    //   ObjectStore.requests.push(last_item.id + 1);
    //   data.objects.splice(ObjectStore.id-1, 1, ObjectStore);
    //   let UserStore = userdb.users.find((user) => {
    //     if(user.id == decryptCode(idecur)){ return user }
    //   })
    //   UserStore.requests.push(last_item.id + 1);
    //   data.users.splice(UserStore.id-1, 1, UserStore);
    // }else{
    //   let ObjectStore = userdb.objects.find((object) => {
    //     if(object.id == decryptCode(idecur)){ return object }
    //   })
    //   ObjectStore.requests.push(last_item.id + 1);
    //   data.objects.splice(ObjectStore.id-1, 1, ObjectStore);
    // }

    let ObjectStore = userdb.objects.find((object) => {
      if(object.address == RequestData.address){ return object }
    })
    ObjectStore.requests.push(last_item.id + 1);
    ObjectStore.amount_requests = ObjectStore.amount_requests + 1;
    data.objects.splice(ObjectStore.id-1, 1, ObjectStore);
    

    // З-РК-А0-002
    let ObjectEmail;
    let ObjectId;
    for(let object of userdb.objects){
      if(object.id == RequestData.object){
        ObjectEmail = object.email_employee.split(' ');
        ObjectId = object.id
      }
    }
    RequestData.name = "З-" + getInitials(RequestData.fullname_responsible, " ") + '-' + ObjectEmail[0].charAt(0).toUpperCase() + '-' + (last_item.id + 1);
    RequestData.id = last_item.id + 1;
    let DateNow = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }).slice(0,-3); // 19.12.2019, 11:02:48
    // RequestData.date_creating = date.format(new Date, 'DD.MM.YYYY (HH:mm)', true);
    RequestData.date_creating = DateNow;
    // var currentTime = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }).slice(0,-3);
    // var now = new Date().toLocaleDateString();
    RequestData.status = 3;
    RequestData.note = '';
    if(RequestData.files == undefined){
      RequestData.files = []
    }
    data.requests.push(RequestData);


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

app.post('/changeRequestData', (req, res) => {
  const {RequestData} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };
    let RequestStore = userdb.requests.find((request) => {
      if(request.id == RequestData.id){ return request }
    })
    // create new object of new user
    var data = JSON.parse(data.toString());
    data.requests.splice(RequestStore.id-1, 1, RequestData)

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

app.post('/deleteRequest', (req, res) => {
  const {RequestId, UserRole, idecur} = req.body
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };

    var data = JSON.parse(data.toString());
    if(UserRole == "client"){
      let UserStore = userdb.users.find((user) => {
        if(user.id == decryptCode(idecur)){
          for(let request in user.requests){
            if(user.requests[request] == RequestId){
              user.requests.splice(request, 1)
            } 
          }
          return user 
        }
      })
      data.users.splice(UserStore.id-1, 1, UserStore)
    }else{
      let ObjectStore;
      for(let idr of userdb.requests){
        if(idr.id == RequestId){
          for(let ido of userdb.objects){
            if(ido.id == idr.object){
              for(let idor in ido.requests){
                if(idr.id == ido.requests[idor]){
                  ido.requests.splice(idor, 1);
                  ObjectStore = ido
                }
              }
            }
          }
        }
      }
      data.objects.splice(ObjectStore.id-1, 1, ObjectStore)
    }

    let StorRequest
    for(let request in userdb.requests){
      if(userdb.requests[request].id == RequestId){
        StorRequest = request
      } 
    }
    data.requests.splice(StorRequest , 1)
    
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

app.post('/uploadFile', (req, res) => {
  if(req.files){
    let file = req.files.file;
    let filename = file.name;
    let convert_file_type = file.mimetype.split("/")[0]
    if(file.size > 25728640){
      const status = 402
      const message = 'Файл слишком велик, загрузка была отменена.'
      res.status(status).json({status, message})
      return
    }else{
      file.mv('../client/static/files/' + filename, (err)=> {
      // file.mv('./upload_files/' + filename, (err)=> { 
        if(err){
          res.send(err)
        }else{
          fs.readFile("./db.json", (err, data) => {  
            if (err) {
              return err
            };
            var data = JSON.parse(data.toString());
            let RequestStore = userdb.requests.find((request) => {
              if(request.id == req.query.RequestId){ return request }
            })
            if(RequestStore){
              RequestStore.files.push(
                {
                  file_url: 'http://kvm3.krakhimov-it.m960m.vps.myjino.ru/files/' + filename,
                  file_type: convert_file_type
                }
              )
              data.requests.splice(RequestStore.id-1, 1, RequestStore)
              let newFilesReq = RequestStore.files 
              console.log(newFilesReq)
              res.send({newFilesReq})
            }else{
              let newFilesReq = []
              newFilesReq.push({
                  file_url: 'http://kvm3.krakhimov-it.m960m.vps.myjino.ru/files/' + filename,
                  file_type: convert_file_type
                })
              res.send({newFilesReq})
            }

            
            //Add new user
            fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
              if (err) {
                const status = 401
                const message = 'File nor added'
                res.status(status).json({status, message})
                return
              }
            });
          })
        }
      })
    }
  }
})

app.post('/deleteFile', (req, res) => {
  const {idImage, RequestId} = req.body
  
  fs.readFile("./db.json", (err, data) => {  
    if (err) {
      return err
    };
    let RequestStore = userdb.requests.find((request) => {
      if(request.id == RequestId){ return request }
    })
    if(RequestStore){
      for(let idr in RequestStore.files){
        if(idr == idImage){
          RequestStore.files.splice(idr, 1)
          // fs.unlink('../html/files/' + RequestStore.files, (err) => {
          //   if (err) {
          //     console.error(err)
          //     return
          //   }
          // })
        }
      }
    }
    var data = JSON.parse(data.toString());
    data.requests.splice(RequestStore.id-1, 1, RequestStore)

    // //Add new user
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return err
      }
    });
    let message = 'ok'
    let newFilesRequest = RequestStore.files 
    res.status(200).json({newFilesRequest})
  })
})


app.post('/getContractorData',  (req, res) =>{
  const {idecur} = req.body;
  
  // let UserStore = userdb.users.find((user) => {
  //   if(user.id == decryptCode(idecur)){ return user }
  // })
  
  // if(UserStore){
    let ContractorData = userdb.contractor
    res.status(200).json({ContractorData})
  // }else{
  //   const status = 401
  //   const message = 'Dont have access for this request'
  //   res.status(status).json({status, message})
  //   return
  // }
})

app.post('/changeContractorData',  (req, res) =>{
  const {idecur, PageRole, UserRole, ContractorData} = req.body;
  
  let UserStore = userdb.users.find((user) => {
    if(user.id == decryptCode(idecur)){ return user }
  })
  
  if(UserStore){
    if(UserStore.role == 'admin'){
      fs.readFile("./db.json", (err, data) => {  
        if (err) {
          const status = 401
          const message = 'Dont have access for this request'
          res.status(status).json({status, err})
          return
        };

        // create new object of new user
        var data = JSON.parse(data.toString());
        data.contractor = ContractorData
    
        // //Add new user
        fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401
            const message = 'Dont have access for this request'
            res.status(status).json({status, err})
            return
          }
        });
        let message = 'ok'
        res.status(200).json({message})
      })
    }else{
      const status = 401
      const message = 'Dont have access for this request'
      res.status(status).json({status, message})
      return
    }
  }else{
    const status = 401
    const message = 'Dont have access for this request'
    res.status(status).json({status, message})
    return
  }
})





app.get('/auth/getUsersId',  (req, res) =>{
 
    let user = userdb.users
    res.status(200).json({user})
  // }else{
  //   const status = 401
  //   const message = 'Dont have access for this request'
  //   res.status(status).json({status, message})
  //   return
  // }
})
app.listen(8000, () => {
  console.log('Run Auth API Server')
})