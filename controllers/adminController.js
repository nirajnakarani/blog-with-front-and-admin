// ----- model -----

const admin = require("../models/admin");


// ----- node mailer -----

const nodemailer = require("nodemailer")


// ----- path -----

var path = require("path");


// ----- fs -----

var fs = require("fs");


// ----- dashboard -----

module.exports.dashboard = async (req, res) => {

  return res.render("dashboard");

}


// ----- view admin -----

module.exports.view_admin = async (req, res) => {
  try {

    // search

    var search = '';
    if (req.query.search) {
      search = req.query.search
    }


    // page 
    if (req.query.page) {
      page = req.query.page
    }
    else {
      page = 0
    }

    var perPage = 2;


    // searching data

    var adminData = await admin.find({
      $or: [
        { "name": { $regex: ".*" + search + ".*", $options: "i" } },
        { "email": { $regex: ".*" + search + ".*", $options: "i" } }
      ]
    })
      .limit(perPage)
      .skip(perPage * page)


    var totalDocument = await admin.find({
      $or: [
        { "name": { $regex: ".*" + search + ".*", $options: "i" } },
        { "email": { $regex: ".*" + search + ".*", $options: "i" } }
      ]
    }).countDocuments();


    if (adminData) {
      return res.render("view_admin", {
        "adminData": adminData,
        "search": search,
        "totalDocument": Math.ceil(totalDocument / perPage),
        "currentPage": page
      });
    }
    else {
      console.log("data not found");
      return res.redirect("back")
    }

  }

  catch (err) {
    console.log(err);
    return res.redirect("back")
  }
}


// ----- add admin page -----

module.exports.add_admin = async (req, res) => {

  return res.render("add_admin")

}


// ----- add admin form -----

module.exports.insertAdminData = async (req, res) => {
  try {
    var imgPath = "";
    if (req.file) {
      req.body.name = req.body.fname + " " + req.body.lname;
      req.body.isActive = true;
      req.body.createdDate = new Date().toLocaleString();
      req.body.updatedDate = new Date().toLocaleString();
      imgPath = admin.adminImgPath + "/" + req.file.filename;
      req.body.adminImg = imgPath;

      var insert = await admin.create(req.body);
      if (insert) {
        console.log("Admin Added");
        return res.redirect("/admin/view_admin");
      } else {
        console.log("admin not added");
        return res.redirect("back");
      }
    } else {
      console.log("file not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// ----- deactive -----

module.exports.setDeactive = async (req, res) => {
  try {
    var change = await admin.findByIdAndUpdate(req.query.id, {
      isActive: false
    });
    if (change) {
      console.log("deactivated...");
      return res.redirect("back");
    } else {
      console.log("not deactivated");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// ----- active -----

module.exports.setActive = async (req, res) => {
  try {
    var change = await admin.findByIdAndUpdate(req.query.id, {
      isActive: true
    });
    if (change) {
      console.log("activated...");
      return res.redirect("back");
    } else {
      console.log("not activated");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// ----- delete admin -----

module.exports.deleteAdmin = async (req, res) => {
  try {
    var oldData = await admin.findById(req.query.id);
    if (oldData) {
      if (oldData.adminImg) {
        var fullPath = path.join(__dirname, "..", oldData.adminImg);

        var deleteImg = await fs.unlinkSync(fullPath);

        var deleteRecord = await admin.findByIdAndDelete(req.query.id);
        if (deleteRecord) {
          console.log("record and img deleted ...");
          return res.redirect("back");
        } else {
          console.log("record not deleted ...");
          return res.redirect("back");
        }
      } else {
        var deleteRecord = await admin.findByIdAndDelete(req.query.id);
        if (deleteRecord) {
          console.log("record deleted 2 ...");
          return res.redirect("back");
        } else {
          console.log("record not deleted 2 ...");
          return res.redirect("back");
        }
      }
    } else {
      console.log("record not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// ----- delete many admin -----

module.exports.deleteMany = async (req, res) => {

  try {

    var abc = await admin.deleteMany({ _id: { $in: req.body.deleteAll } });
    if (abc) {
      return res.redirect("back")

    }
    else {
      console.log("data not delete");
      return res.redirect("back")
    }

  }
  catch (err) {
    console.log(err);
    return res.redirect("back")
  }

}


// ----- update admin page -----

module.exports.updateAdmin = async (req, res) => {

  var oldData = await admin.findById(req.query.id);
  return res.render("update_admin", {
    data: oldData,
    name: oldData.name.split(" "),
  });

}


// ----- updateAdminData -----

module.exports.updateAdminData = async (req, res) => {
  try {
    var oldData = await admin.findById(req.body.editId);

    if (oldData) {
      if (req.file) {
        if (oldData.adminImg) {
          var fullPath = path.join(__dirname, "..", oldData.adminImg);
          var deleteImg = await fs.unlinkSync(fullPath);

          req.body.name = req.body.fname + " " + req.body.lname;
          req.body.updatedDate = new Date().toLocaleString();
          req.body.adminImg = admin.adminImgPath + "/" + req.file.filename;
          var update = await admin.findByIdAndUpdate(req.body.editId, req.body);
          if (update) {
            console.log("update success");
            return res.redirect("/admin/view_admin");

          } else {
            console.log("update unsuccess");
            return res.redirect("back");
          }
        } else {
          console.log("old data img not found");
          return res.redirect("back");
        }
      }
      else {
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.adminImg = oldData.adminImg;
        req.body.updatedDate = new Date().toLocaleString();

        var update = await admin.findByIdAndUpdate(req.body.editId, req.body);
        if (update) {
          console.log("update success");
          return res.redirect("/admin/view_admin");
        }
        else {
          console.log("update unsuccess");
          return res.redirect("back");
        }
      }
    }
    else {
      console.log("update record not found");
      return res.redirect("back");
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// ----- login admin -----

module.exports.loginAdmin = async (req, res) => {
  // try {
  //   var adminData = await admin.findOne({ email: req.body.email });
  //   console.log(adminData)
  //   if (adminData) {

  //     if (adminData.password == req.body.password) {

  //       res.cookie("adminData", adminData);
  //       return res.redirect("/admin/dashboard");

  //     } else {

  //       console.log("Invalid Password");
  //       return res.redirect("back");
  //     }
  //   } else {
  //     console.log("Invalid Email");
  //     return res.redirect("back");
  //   }
  // } catch (err) {
  //   console.log(err);
  //   return res.redirect("back");
  // }

  return res.redirect("/admin/dashboard")
};


// ----- profile -----

module.exports.profile = async (req, res) => {
  return res.render("profileAdmin")
}


// ----- changePassword page -----

module.exports.changePassword = async (req, res) => {

  return res.render("change_pass")
}


// ----- changeAdminPassword -----

module.exports.changeAdminPassword = async (req, res) => {

  try {
    console.log(req.body)
    var adminSession = req.user;
    if (adminSession.password == req.body.cuPass) {

      if (req.body.cuPass != req.body.nPass) {

        if (req.body.nPass == req.body.coPass) {

          var allAdmin = await admin.findById(adminSession._id)

          if (allAdmin) {

            var editPass = await admin.findByIdAndUpdate(allAdmin.id, { password: req.body.nPass })

            if (editPass) {
              req.session.destroy()
              return res.redirect("/admin/")
            }
            else {
              console.log("Password Not Change")
            }
          }
          else {
            console.log("Data Not Found In Server")
          }

        }
        else {
          console.log("Confirm Password Not Match")
        }

      }
      else {
        console.log("Current Password And New Password Are Same")
      }


    }
    else {
      console.log("Current Password Not Match")
    }
    return res.redirect("back")


  }
  catch (err) {
    console.log(err);
    return res.redirect("back")
  }
}


// ----- check email and send mail -----

module.exports.checkEmail = async (req, res) => {

  try {

    var adminEmailData = await admin.findOne({ email: req.body.email })

    if (adminEmailData) {

      // setup our mail and pass 

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "nakaraniniraj87580@gmail.com",
          pass: "lagqsepgtzjcshka",
        },
      });


      // OTP Generation

      // var min = 100000;
      // var max = 999999

      // var number = Math.floor(Math.random() * (max - min + 1)) + min
      // console.log(number)

      const generateOTP = (length) => {
        let otp = ''

        for (let i = 0; i < length; i++) {
          otp += Math.floor(Math.random() * 10)
        }

        return otp
      }

      var OTP = generateOTP(6)


      // send mail with defined transport object

      const info = await transporter.sendMail({
        from: 'nakaraniniraj87580@gmail.com', // sender address
        to: adminEmailData.email, // list of receivers
        subject: "OTP ✔", // Subject line
        html: `<h1>OTP Is Here : ${OTP}</h1>`, // html body
      });


      if (info) {
        res.cookie("otp", OTP)
        res.cookie("email", adminEmailData.email)
        return res.redirect("/admin/otpPage")
      }
      else {
        return res.redirect("back")
      }

    }
    else {
      console.log("data not found");
      return res.redirect("back")
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect("back")
  }

}


// ----- otp check -----

module.exports.checkOTP = async (req, res) => {

  try {

    if (req.cookies.otp == req.body.otp) {
      return res.render("forgot/newPassPage")
    }
    else {
      console.log("otp is not match");
      return res.redirect("back")
    }

  } catch (err) {
    console.log(err);
    return res.redirect("back")
  }

}


// ----- check pass -----

module.exports.checkPass = async (req, res) => {

  try {

    if (req.body.nPass == req.body.cPass) {
      var email = req.cookies.email;
      console.log(email)

      if (email) {

        var adminData = await admin.findOne({ email: email });
        if (adminData) {

          var updatePass = await admin.findByIdAndUpdate(adminData.id, { password: req.body.nPass })

          if (updatePass) {

            res.clearCookie("otp");
            res.clearCookie("email");
            return res.redirect("/admin/")

          }
          else {
            console.log("password not found");
            return res.redirect("back")
          }
        }
        else {
          console.log("data not found");
          return res.redirect("back")
        }

      }
      else {
        console.log("cookie not found");
        return res.redirect("back")
      }

    }
    else {
      console.log("Both Pass are not match")
      return res.redirect("back")
    }

  }
  catch (err) {
    console.log(err);
    return res.redirect("back")
  }

}


// ----- log out admin -----

module.exports.logout = async (req, res) => {
  try {
    req.session.destroy();

    if (req.user) {
      return res.redirect("/admin/dashboard");
    }
    else {
      return res.redirect("/admin/");
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}

