const toNumberOrNull = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const toTrimmed = (value) => (typeof value === "string" ? value.trim() : "");

const normalizeAddressFields = (address = {}) => ({
  streetAddress: toTrimmed(address.streetAddress || address.houseNumber),
  city: toTrimmed(address.city),
  state: toTrimmed(address.state),
  country: toTrimmed(address.country),
  pinCode: toTrimmed(address.pinCode || address.zipCode || address.zip),
});

const hasCoordinates = (address = {}) => {
  const lat = toNumberOrNull(address.lat ?? address.location?.latitude);
  const lng = toNumberOrNull(address.lng ?? address.long ?? address.location?.longitude);
  return lat !== null && lng !== null;
};

const buildSearchQuery = (address = {}) => {
  const { streetAddress, city, state, country, pinCode } = normalizeAddressFields(address);
  const parts = [streetAddress, city, state, pinCode, country].filter(Boolean);
  return parts.join(", ");
};

const geocodeWithNominatim = async (query) => {
  if (!query) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");

  const userAgent = process.env.GEOCODING_USER_AGENT || "learnzy-backend/1.0";
  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const first = data[0];
  const lat = toNumberOrNull(first.lat);
  const lng = toNumberOrNull(first.lon);
  if (lat === null || lng === null) return null;

  return { lat, lng };
};

const resolveAddressPayload = async (address = {}) => {
  const normalized = normalizeAddressFields(address);

  const providedLat = toNumberOrNull(address.lat ?? address.location?.latitude);
  const providedLng = toNumberOrNull(address.lng ?? address.long ?? address.location?.longitude);
  if (providedLat !== null && providedLng !== null) {
    return {
      ...normalized,
      lat: providedLat,
      lng: providedLng,
    };
  }

  const geocodingEnabled = (process.env.GEOCODING_ENABLED || "true").toLowerCase() !== "false";
  if (!geocodingEnabled) {
    return { ...normalized, lat: 0, lng: 0 };
  }

  const query = buildSearchQuery(address);
  if (!query) {
    return { ...normalized, lat: 0, lng: 0 };
  }

  try {
    const result = await geocodeWithNominatim(query);
    if (result) {
      return {
        ...normalized,
        lat: result.lat,
        lng: result.lng,
      };
    }
  } catch (_error) {
    // Graceful fallback keeps API flow working even when geocoding is unavailable.
  }

  return { ...normalized, lat: 0, lng: 0 };
};

export { resolveAddressPayload, normalizeAddressFields, hasCoordinates };
