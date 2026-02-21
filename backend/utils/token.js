const extractAccessToken = (req) => {
  const tokenFromCookie = req.cookies?.accessToken;
  const authHeader = req.header("Authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : undefined;

  const token = tokenFromCookie || tokenFromHeader;
  if (!token || token === "undefined" || token === "null") return null;

  return token;
};

export { extractAccessToken };
