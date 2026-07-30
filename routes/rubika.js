const express = require("express");
const router = express.Router();

const rubika = require("../services/rubika");

router.get("/updates", async (req, res) => {
    try {

        const data = await rubika.getUpdates();

        res.json(data);

    } catch (e) {

        res.status(500).json({
            success: false,
            message: e.message
        });

    }
});

router.post("/send", async (req, res) => {
    try {

        const { chatId, text } = req.body;

        const data = await rubika.sendMessage(chatId, text);

        res.json(data);

    } catch (e) {

        res.status(500).json({
            success: false,
            message: e.message
        });

    }
});

module.exports = router;
