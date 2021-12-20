const updateEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then((entry) => {
      res.json(entry[0]);
    })
    .catch((err) => res.status(400).json(err.detail));
};

module.exports = {
  updateEntries,
};
