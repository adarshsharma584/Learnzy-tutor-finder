const isProduction = process.env.NODE_ENV === "production";

const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, authCookieOptions);
  res.cookie("refreshToken", refreshToken, authCookieOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", authCookieOptions);
  res.clearCookie("refreshToken", authCookieOptions);
};

export { authCookieOptions, setAuthCookies, clearAuthCookies };
