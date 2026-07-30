const express = require("express");
const router = express.Router();

router.post("/webhook", async (req, res) => {

    console.log("===== RUBIKA UPDATE =====");
    console.log(JSON.stringify(req.body, null, 2));

    res.json({
        success: true
    });

});

async function getUpdates(limit = 10) {
    try {
        const { data } = await api.post("/getUpdates", {
            limit
        });

        return data;
    } catch (err) {
        console.error("Rubika Error:", err.response?.data || err.message);
        throw err;
    }
}

module.exports = {
    sendMessage,
    getUpdates
};
