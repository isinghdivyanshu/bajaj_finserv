const express = require("express");
const bfhlRoutes = require("./routes/bfhlRoute");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
	const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bajaj Finserv Task</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f2f5;
            }
            .card {
                background-color: #ffffff;
                padding: 40px 50px;
                border-radius: 12px;
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
                text-align: center;
                border: 1px solid #e0e0e0;
            }
            .card h1 {
                margin: 0 0 10px 0;
                font-size: 24px;
                color: #333;
            }
            .card h2 {
                margin: 0 0 20px 0;
                font-size: 20px;
                color: #555;
                font-weight: 500;
            }
            .card p {
                margin: 10px 0;
                font-size: 18px;
                color: #444;
            }
            .card .label {
                font-weight: 600;
                color: #000;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Divyanshu Singh</h1>
            <h2>22BCE0660</h2>
            <p><span class="label">Task for:</span> Bajaj Finserv</p>
        </div>
    </body>
    </html>
    `;
	res.setHeader("Content-Type", "text/html");
	res.status(200).send(htmlResponse);
});

app.use("/", bfhlRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
