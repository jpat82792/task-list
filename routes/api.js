const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/hey', (req, res) => {
  res.send("No, good bye");
});

module.exports = router;
