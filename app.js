const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcryptjs')
const router = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'kepoo~',
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure:false,
      sameSite:true,
    }
}))

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));

app.use(router)


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
});