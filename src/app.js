const express = require('express');
const app = express();
const cors = require('cors');
// const db = require("./database/connection.js");

require('dotenv').config()

const PORT = process.env.PORT || 1234;

const corsOptions = {
    origin: 'http://localhost:' + PORT
}

app.use(cors(corsOptions));
app.use(express.json());                        // parse content-type: application/json
app.use(express.urlencoded({extended: true}))   // parse content-type: application/x-www-form-urlencoded

const db = require("./models");

const SHOULD_DROP_DABLES = true;
db.sequelize.sync({ force: SHOULD_DROP_DABLES})
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

require('./routes/tasks.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});