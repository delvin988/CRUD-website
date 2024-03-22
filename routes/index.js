const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcryptjs')
const Controller = require('../controllers/controller')
const session = require('express-session')
const route = express.Router()



route.get('/register', Controller.registerForm)
route.post('/register', Controller.registerPost)

route.get('/login', Controller.loginForm)
route.post('/login', Controller.postLogin)
route.get('/logout', Controller.getLogout)

route.get("/", Controller.profile)
route.get("/course", Controller.course)
route.get("/course/delete/:id", Controller.deleteCourse)
route.get("/course/edit/:id", Controller.editCourse)
route.post("/course/edit/:id", Controller.postEditCourse)



module.exports = route