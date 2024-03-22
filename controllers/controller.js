
const { User, Profile, Course, Category, sequelize } = require("../models/index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");//ambil nodemailer


class Controller {
   static async registerForm(req, res) {
      try {
         res.render("registerPage");
      } catch (error) {
         res.send(error);
      }
   }

   static async registerPost(req, res) {
      try {
         const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
               user: "yustindelvin",
               pass: "edap rqsu dxjm llvx",
            },
         });

         await transporter.sendMail({
            from: "yustin.delvin", 
            to: "n99332681@gmail.com", 
            subject: "Hello", 
            text: "Thank you for registering",
         });
         const { email, password, role } = req.body;
         await User.create({ email, password, role });
         res.redirect("/login");
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }

   static async loginForm(req, res) {
      try {
         const {error} = req.query
         res.render("loginPage", {error});
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }

   static async postLogin(req, res) {
      const { email, password } = req.body;

      try {
         const user = await User.findOne({
            where: { email: email },
         });

         if (user) {
            const validPassword = bcrypt.compareSync(password, user.password);
            req.session.userId = user.id
            req.session.email = user.email
            req.session.role = user.role
            // console.log(user.email)

            if (validPassword) {
               return res.redirect("/");
            } else {
               const error = "Invalid Password";
               return res.redirect(`/login/?error=${error}`);
            }
         } else {
            const error = "Invalid Username or Password";
            return res.redirect(`/login/?error=${error}`);
         }
      } catch (error) {
         console.log(error);
         return res.send(error);
      }
   }

   static async profile(req, res) {
      try {
        
         if (!req.session.email) {
            return res.redirect('/login');
         }
   
         const userProfile = await Profile.findAll();
   
         if (!userProfile) {
            return res.status(404).send('User profile not found');
         }
   
         res.render("userProfile", { userProfile });
      } catch (error) {
         res.send(error);
      }
   }

   static async course(req, res) {

    const { search } = req.query;
    const option = {
        includes: { Category ,}
        };

    if (search) {
        option.where = {
            [Op.or]: [
                {
                    name: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
            ],
        };
    }
    try {
      const course = await Course.findAll(option);
      res.render("Course", { course });
    // res.send(course)
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteCourse(req, res) {

    try {
       let id = req.params.id;
       console.log(id);
       await Course.destroy({
          where: {
             id: id,
          },
       });
       res.redirect("/course");
    } catch (error) {
       res.send(error);
    }
 }

 static async editCourse(req, res) {


    try {
      let id = req.params.id;
      let course = await Course.findByPk(id);
      res.render("editCourse", { course });
    } catch (err) {
      res.send(err);
    }
  }

  static async postEditCourse(req, res) {
   
    let{id} = req.params
    try {
      let { name, description, duration} = req.body;
      await Course.update(
        {name, description, duration}, {
          where: {
            id,
          }
        }
      );
      res.redirect("/course");
    } catch (err) {
      res.send(err);
    }
}

static getLogout(req, res) {
   delete req.session.email
   res.redirect('/login')
}

}

module.exports = Controller;
