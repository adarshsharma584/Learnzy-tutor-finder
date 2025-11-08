import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "../Map.css";
import { FaLocationDot } from "react-icons/fa6";
import { renderToStaticMarkup } from "react-dom/server";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// stable default location
const DEFAULT_LOCATION = [12.9716, 77.5946];

function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [tuitions, setTuitions] = useState([]);
  const [route, setRoute] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState(null);
  useEffect(() => {
    // helper functions scoped inside effect
    const generateNearbyLocation = (baseLat, baseLng, radius = 0.02) => {
      const randomOffset = () => (Math.random() - 0.5) * radius;
      return [baseLat + randomOffset(), baseLng + randomOffset()];
    };

    
      


   
    const createNearbyTuitions = (baseLat, baseLng) => {
      const data = [
        {
          _id: 1,
          name: "Excel Mathematics Academy",
          teacher: "Dr. Sarah Wilson",
          subjects: ["Mathematics", "Physics"],
          rating: 4.8,
          students: 45,
          location: {
            coordinates: generateNearbyLocation(baseLat, baseLng),
            address: "Near you",
          },
        },
        {
          _id: 2,
          name: "Science Success Center",
          teacher: "Prof. Raj Kumar",
          subjects: ["Chemistry", "Biology"],
          rating: 4.9,
          students: 38,
          location: {
            coordinates: generateNearbyLocation(baseLat, baseLng),
            address: "Near you",
          },
        },
        {
          _id: 3,
          name: "Language Learning Hub",
          teacher: "Ms. Priya Sharma",
          subjects: ["English", "History"],
          rating: 4.7,
          students: 32,
          location: {
            coordinates: generateNearbyLocation(baseLat, baseLng),
            address: "Near you",
          },
        },
      ];
      setTuitions(data);
    };

    // request actual user location
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported, using fallback location.");
      setUserLocation(DEFAULT_LOCATION);
      createNearbyTuitions(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        createNearbyTuitions(coords[0], coords[1]);
        setIsLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        // fallback
        setUserLocation(DEFAULT_LOCATION);
        createNearbyTuitions(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);
async function getAddress(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();
  console.log("Fetched address data:", data);
  console.log("Address:", data.display_name);
  return data.display_name;
}

useEffect(() => {
  const fetchAddress = async () => {
    if (userLocation) {
      const address = await getAddress(userLocation[0], userLocation[1]);
      setUserAddress(address);
      console.log("User Address:", address);
    }
  };
  fetchAddress();
}, [userLocation]);
  const getRoute = async (lat, lng) => {
    try {
      if (!userLocation) return;
      // OSRM expects lon,lat order
      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${lng},${lat}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      const coords = res.data.routes[0].geometry.coordinates.map((p) => [
        p[1],
        p[0],
      ]);
      setRoute(coords);
    } catch (e) {
      console.error("Route error", e);
    }
  };

  const customIcon = (type) => {
    const color = type === "user" ? "#ff0033" : "#0077ff"; // red for user, blue for tuitions
    const markup = renderToStaticMarkup(
      <div style={{ fontSize: "22px", color }}>
        {/* icon color */}
        <FaLocationDot />
      </div>
    );
    return L.divIcon({
      className: "custom-icon",
      html: markup,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white p-4 shadow-md mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Nearby Tuition Centers
        </h1>
        {userLocation ? (
          <p className="text-gray-600">
            Your Location: {userAddress}
          </p>
        ) : (
          <p className="text-gray-600">Locating you...</p>
        )}
        <p className="text-gray-600">
          {tuitions.length} centers found in your area
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-80px)]">
        <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto">
          <div className="space-y-4">
            {tuitions.map((t) => (
              <div
                key={t._id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTuition === t._id
                    ? "border-purple-500 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => {
                  setSelectedTuition(t._id);
                  getRoute(
                    t.location.coordinates[0],
                    t.location.coordinates[1]
                  );
                }}
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {t.name}
                </h3>
                <p className="text-gray-600 mt-1">{t.teacher}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Subjects: {t.subjects.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">{t.location.address}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-purple-600">⭐ {t.rating}</span>
                    <span className="text-gray-500 text-sm">
                      {t.students} students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="md:col-span-2 rounded-lg overflow-hidden shadow-md"
          style={{ minHeight: "500px" }}
        >
          {isLoading || !userLocation ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* user marker (red) */}
              <Marker position={userLocation} icon={customIcon("user")}>
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">Your Location</p>
                    <p className="text-sm text-gray-600">
                      {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>

              {/* tuition markers (blue) */}
              {tuitions.map((t) => (
                <Marker
                  key={t._id}
                  position={[
                    t.location.coordinates[0],
                    t.location.coordinates[1],
                  ]}
                  icon={customIcon("tuition")}
                  eventHandlers={{
                    click: () => {
                      setSelectedTuition(t._id);
                      getRoute(
                        t.location.coordinates[0],
                        t.location.coordinates[1]
                      );
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.teacher}</p>
                      <p className="text-sm">Rating: ⭐ {t.rating}</p>
                      <p className="text-sm text-gray-500">
                        {t.students} students
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {route.length > 0 && (
                <Polyline
                  positions={route}
                  color="#8B5CF6"
                  weight={4}
                  opacity={0.6}
                />
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapView;
