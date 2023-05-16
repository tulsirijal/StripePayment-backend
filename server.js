const express = require("express");
const app = express();
require("dotenv").config();
const routes = require('./routes/routes')
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use('/',routes)
app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});

