const serializeAddress = (address) => {
  if (!address || typeof address !== "object") return null;

  return {
    id: address._id,
    houseNumber: address.houseNumber,
    streetNumber: address.streetNumber,
    area: address.area,
    city: address.city,
    district: address.district,
    pinCode: address.pinCode,
    state: address.state,
    country: address.country,
    location: address.location,
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
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export { serializeUser, serializeAddress };
