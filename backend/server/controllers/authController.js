const { sendCookie } = require("../helpers/cookieHandler");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../middlewares/errorHandler.js");

const registerController = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    role = role.trim();

    if (name == "" || email == "" || password == "" || role == "") {
      return next(new ErrorHandler("Empty Input Fields", 404));
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      return next(new ErrorHandler("Invalid Name Entered", 404));
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return next(new ErrorHandler("Invalid email entered", 404));
    } else if (password.length < 8) {
      return next(new ErrorHandler("Password too short", 404));
    } else {
      let user = await userModel.findOne({ email });

      if (user) {
        return next(
          new ErrorHandler("User with the provided email already exists", 404)
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      admin = await Admins.create({
        name,
        email,
        password: hashedPassword,
        verified: false,
        role,
      });

      sendAdminVerificationEmail(admin, res);
      res.status(201).json({
        success: true,
        message:
          "Registered Successfully! Please verify your email using the link sent to your inbox",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    console.log(email, password);

    if (email == "" || password == "") {
      return next(new ErrorHandler("Empty Credentials Supplied!", 404));
    }

    let allUsers = await userModel.find();
    //console.log(allUsers);

    let user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    // if (!user.verified) {
    //   return next(
    //     new ErrorHandler(
    //       "Email hasn't been verified yet. Check your inbox",
    //       404
    //     )
    //   );
    // } else {
    //   const isMatch = await bcrypt.compare(password, admin.password);

    //   if (!isMatch) {
    //     return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    //   }

    //   const adminData = Object.assign({}, admin.toObject());
    //   delete adminData.password;

    //   sendCookie(adminData, res, "Welcome back", 201);
    // }
    if (password !== user.password) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    const adminData = Object.assign({}, user.toObject());
    delete adminData.password;

    sendCookie(adminData, res, "Welcome back", 201);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerController, loginController };
