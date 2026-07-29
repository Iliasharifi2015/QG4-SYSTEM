/*
  Rubika integration placeholder.

  IMPORTANT:
  Keep RUBIKA_BOT_TOKEN only in .env / Render Environment Variables.
  Do not put the token in frontend JavaScript or GitHub.

  The exact Rubika bot API endpoint and payload can vary depending on
  the bot library/API you use. This service intentionally keeps the
  transport layer isolated so it can be replaced with the official/
  supported Rubika bot integration you choose.
*/

async function sendVerificationCode(rubikaId, code) {
  if (!process.env.RUBIKA_BOT_TOKEN) {
    throw new Error("RUBIKA_BOT_TOKEN is not configured.");
  }

  // TODO: Implement the Rubika bot API call here.
  // Do not log the token or verification code.
  console.log(`Verification request prepared for Rubika ID: ${rubikaId}`);

  return {
    sent: false,
    message: "Rubika transport is not configured yet."
  };
}

module.exports = {
  sendVerificationCode
};
