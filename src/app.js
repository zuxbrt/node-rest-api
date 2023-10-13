const express = require('express');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 1234;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT);
});

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});