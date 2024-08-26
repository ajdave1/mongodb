const users = require("./user.model");
const bycrpt = require("bcryptjs");
let routes = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { username, fullname, occupation, age, password, email } = req.body;
      if (!occupation || !username || !age || !fullname || !password) {
        return res
          .status(400)
          .json({ msg: "One or more inputs field are empty" });
      }
      if (occupation !== "teacher" && occupation !== "farmer") {
        return res
          .status(400)
          .json({ msg: "Occupation can be either Teacher or Farmer" });
      }
      if (age < 18) {
        return res.status(400).json({ msg: "age cant be less than 18" });
      }
      if (password < 8) {
        return res
          .status(400)
          .json({ msg: "password cant be less than 8 characters " });
      }
      const user = await users.findOne({ username });

      if (user) {
        return res.json({ msg: "user already exist!" });
      }
      const passHash = await bycrpt.hash(password, 12);
      const newuser = {
        fullname,
        username,
        age,
        occupation,
        password: passHash,
        email,
      };
      let Userregistering = new users(newuser);
      await Userregistering.save();
      res.send(" Registration successful ");
    } catch (err) {
      console.log(err);
    }
  });
  app.post("/register-with-email", async (req, res) => {
    console.log(req.param);
    const { email, password } = req.body;
    const User = await users.findOne({ email });
    if (User) {
      return res.status(400).json({ message: "user already exist" });
    }
    const creating = new users({ email, password });
    await creating.save();
    res.status(201).json({ message: "Account created successfully" });
  });
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Inputs can not be empty" });
    }
    const user = await users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User does not exist" });
    }
    const upassword = await bycrpt.compare(password, user.password);
    if (!upassword)
      return res.status(400).json({
        status: "fail",
        message: "password incorrect",
      });

    res.status(200).json({
      status: "success",
      name: user.fullname,
      username: user.username,
      occupation: user.occupation,
    });
  });
  app.post("/logout/:id?", async (req, res) => {
    try {
      const userID = req.params.id;
      await users.updateOne({ _id: userID }, { status: "inactive" });
      res.status(200).json({ msg: ` logged out ` });
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/delete", async (req, res) => {
    const { username } = req.body;
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(400).json({
        msg: "user not fouond!",
      });
    }

    await users.deleteOne(user);
    res.status(205).json({
      msg: "user deleted",
    });
  });
};

module.exports = routes;
