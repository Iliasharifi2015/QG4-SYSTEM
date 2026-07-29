const codes = new Map();

const TTL_SECONDS = Number(process.env.VERIFICATION_CODE_TTL_SECONDS || 300);

function createCode(rubikaId) {
  const code = String(Math.floor(100000 + Math.random() * 900000));

  codes.set(rubikaId, {
    code,
    expiresAt: Date.now() + TTL_SECONDS * 1000,
    used: false
  });

  return code;
}

function verifyCode(rubikaId, code) {
  const record = codes.get(rubikaId);

  if (!record) return { valid: false, reason: "CODE_NOT_FOUND" };
  if (record.used) return { valid: false, reason: "CODE_ALREADY_USED" };
  if (Date.now() > record.expiresAt) {
    codes.delete(rubikaId);
    return { valid: false, reason: "CODE_EXPIRED" };
  }

  if (record.code !== String(code)) {
    return { valid: false, reason: "INVALID_CODE" };
  }

  record.used = true;
  return { valid: true };
}

function removeCode(rubikaId) {
  codes.delete(rubikaId);
}

module.exports = {
  createCode,
  verifyCode,
  removeCode
};
