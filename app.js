const express = require('express');
const app = express();
const hitAllahabadHC = require('./services/externalhitsalHC');

const port = 3000;





app.get('/health', async (req, res) => {
    try {
        const data = await hitAllahabadHC();
        console.log("Data:", data);
        res.json(data);
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});