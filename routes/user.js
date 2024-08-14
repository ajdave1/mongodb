const users = require("./user.model");

let routes = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { username, fullname, occupation, age } = req.body;
      if (!occupation || !username || !age || !fullname) {
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

      const user = await users.findOne({ username });
      console.log(user, "ffjdkfjk");
      if (user) {
        return res.json({ msg: "user already exist!" });
      }

      const newuser = {
        fullname,
        username,
        age,
        occupation,
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
