const users = require("./user.model");
const bycrpt = require("bcryptjs");
let routes = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { username, fullname, occupation, age, password } = req.body;
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
      };
      let Userregistering = new users(newuser);
      await Userregistering.save();
      res.send(" Registration successful ");
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = routes;
