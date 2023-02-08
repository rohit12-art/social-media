const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const connection = require('./db/db');

app.use(require('./router/router'));

app.get("/", (req,res) => {
    res.send("welcome to home");
} )

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
