const express = require("express");
const router = express.Router();
const {
    supabaseRequest
} = require("../config/supabase");
const { hashPassword, verifyPassword } = require("../services/password");

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

router.post("/register", async (req, res) => {
  try {
    const { username, password, rubikaId, verificationCode } = req.body;

    const normalizedUsername = normalizeUsername(username);
    const cleanRubikaId = String(rubikaId || "").trim();

    if (!isValidUsername(normalizedUsername)) {
      return res.status(400).json({
        success: false,
        message: "Username must be 3-20 characters and contain only letters, numbers or underscore."
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters."
      });
    }

    if (!cleanRubikaId || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Rubika ID and verification code are required."
      });
    }

const existing =
    await supabaseRequest(
        "users",
        {
            query:
                `?select=id&or=(username.eq.${encodeURIComponent(normalizedUsername)},rubika_id.eq.${encodeURIComponent(cleanRubikaId)})&limit=1`
        }
    );

    if (lookupError) throw lookupError;

    if (existing && existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Username or Rubika ID is already registered."
      });
    }

    // TODO: Verify the one-time code through the verification service
    // before creating the user.

    const passwordHash = await hashPassword(password);

const inserted =
    await supabaseRequest(
        "users",
        {
            method: "POST",

            body: {
                username:
                    normalizedUsername,

                password_hash:
                    passwordHash,

                rubika_id:
                    cleanRubikaId
            }
        }
    );

const data =
    inserted[0];

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: "QG4 account created successfully.",
      user: data
    });
  } catch (error) {
    console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not create account."
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required."
      });
    }

const users =
    await supabaseRequest(
        "users",
        {
            query:
                `?select=id,username,password_hash,rubika_id,avatar_url,bio,created_at&username=eq.${encodeURIComponent(normalizedUsername)}&limit=1`
        }
    );

const user =
    users[0] || null;

    if (error) throw error;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    const validPassword = await verifyPassword(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    delete user.password_hash;

    // TODO: Add a secure session/JWT system before production use.

    return res.json({
      success: true,
      message: "Login successful.",
      user
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not log in."
    });
  }
});

module.exports = router;

const rubika = require("../services/rubika");

router.get("/test-bot", async (req, res) => {

    try {

        await rubika.sendMessage(
            "CHAT_ID",
            "سلام از QG4 🚀"
        );

        res.json({
            success: true
        });

    } catch (e) {

        res.status(500).json({
            success: false,
            message: e.message
        });

    }

});
