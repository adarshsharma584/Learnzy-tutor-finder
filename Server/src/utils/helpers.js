// import jwt from  "jsonwebtoken"

export const generateVerificationCode = function () {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
}

// ========== FOR FUTURE IF VERIFY VIA TOKEN/LINK ==========

// export const generateVerificationToken = function (userId) {
//   return jwt.sign(
//     { userId },
//     process.env.VERIFICATION_TOKEN_SECRET,
//     { expiresIn: process.env.VERIFICATION_TOKEN_EXPIRY}
//   )
// }

// export const verifyVerificationToken = function (verificationToken) {
//   try {
//     return jwt.verify(verificationToken, process.env.VERIFICATION_TOKEN_SECRET)
//   } catch (error) {
//     return null
//   }
// }