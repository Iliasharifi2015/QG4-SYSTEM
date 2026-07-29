const express = require("express");
const router = express.Router();

const {
  createCode,
  verifyCode
} = require("../services/verificationStore");

const {
  sendVerificationCode
} = require("../services/rubika");

router.post("/request", async (req, res) => {
  try {
    const rubikaId = String(req.body.rubikaId || "").trim();

    if (!rubikaId) {
      return res.status(400).json({
        success: false,
        message: "Rubika ID is required."
      });
    }

    const code = createCode(rubikaId);

    const result = await sendVerificationCode(
      rubikaId,
      code
    );

    if (!result.sent) {
      return res.status(503).json({
        success: false,
        message: result.message
      });
    }

    return res.json({
      success: true,
      message: "Verification code sent."
    });
  } catch (error) {
    console.error("Verification request error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not send verification code."
    });
  }
});

router.post("/verify", (req, res) => {
  const rubikaId = String(req.body.rubikaId || "").trim();
  const code = String(req.body.code || "").trim();

  if (!rubikaId || !code) {
    return res.status(400).json({
      success: false,
      message: "Rubika ID and code are required."
    });
  }

  const result = verifyCode(rubikaId, code);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification code.",
      reason: result.reason
    });
  }

  return res.json({
    success: true,
    message: "Verification successful."
  });
});

module.exports = router;
