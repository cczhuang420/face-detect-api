const getProfile = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .select("*")
    .where({ id: id })
    .returning("users")
    .then((user) => res.json(user[0]))
    .catch((err) => {
      res.json(err.detail);
    });
};

module.exports = { getProfile };
