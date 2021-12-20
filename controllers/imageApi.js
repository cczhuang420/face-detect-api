const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "20b3509f60444a16b516fa3d2074a7d4",
});

const handleImageAPI = (req, res) => {
  const { input } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(`err image api call ${err.detail}`);
    });
};

module.exports = { handleImageAPI };
