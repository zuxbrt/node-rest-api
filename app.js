const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

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