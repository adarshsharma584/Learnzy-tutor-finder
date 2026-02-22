const serializeAddress = (address) => {
  if (!address || typeof address !== "object") return null;

  return {
    id: address._id,
    streetAddress: address.streetAddress,
    city: address.city,
    pinCode: address.pinCode,
    state: address.state,
    country: address.country,
    lat: address.lat,
    lng: address.lng,
  };
};

const serializeUser = (userDoc) => {
  if (!userDoc) return null;

  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    profilePhoto: user.profilePhoto,
    address:
      user.address && typeof user.address === "object" && user.address._id
        ? serializeAddress(user.address)
        : user.address || null,
  };
};

export { serializeUser, serializeAddress };
