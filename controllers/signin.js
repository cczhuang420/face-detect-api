const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  db.select("hash")
    .from("login")
    .where({ email: email })
    .then((data) => {
      bcrypt.compare(password, data[0].hash).then((result) => {
        if (result) {
          db.select("*")
            .from("users")
            .where({ email: email })
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) =>
              res.status(400).json(`unable to get the user ${err.detail}`)
            );
        } else {
          res
            .status(400)
            .json("The combination of email and password is incorrect.");
        }
      });
    })
    .catch((err) => res.status(400).json(`wrong credentials ${err.detail}`));
};

module.exports = {
  handleSignin,
};
