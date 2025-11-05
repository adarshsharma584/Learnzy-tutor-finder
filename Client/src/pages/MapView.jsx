import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
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

function MapView() {
  // Hardcoded user location (Bangalore)
  const [userLocation] = useState([12.9716, 77.5946]);
  const [route, setRoute] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);

  // Hardcoded tuition centers
  const tuitions = [
    {
      _id: 1,
      name: "Excel Mathematics Academy",
      teacher: "Dr. Sarah Wilson",
      subjects: ["Mathematics", "Physics"],
      rating: 4.8,
      students: 45,
      location: {
        coordinates: [77.5917, 12.9789],
        address: "Malleswaram, Bangalore",
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
        coordinates: [77.5977, 12.9679],
        address: "Jayanagar, Bangalore",
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
        coordinates: [77.5876, 12.975],
        address: "Basavanagudi, Bangalore",
      },
    },
  ];

  const getRoute = async (lat, lng) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${lng},${lat}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      const coords = res.data.routes[0].geometry.coordinates.map((point) => [
        point[1],
        point[0],
      ]);
      setRoute(coords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const customIcon = (type) => {
    const colors = {
      user: "bg-blue-500",
      tuition: "bg-purple-500",
    };

    return L.divIcon({
      className: "custom-icon",
      html: `<div class="${
        colors[type]
      } w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                ${type === "user" ? "📍" : "🎓"}
              </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      {/* Title and Stats */}
      <div className="bg-white p-4 shadow-md mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Nearby Tuition Centers
        </h1>
        <p className="text-gray-600">Your Location: Bangalore, Karnataka</p>
        <p className="text-gray-600">
          {tuitions.length} centers found in your area
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-80px)]">
        {/* Tuition Centers List */}
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
                    t.location.coordinates[1],
                    t.location.coordinates[0]
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

        {/* Map */}
        <div className="md:col-span-2 rounded-lg overflow-hidden shadow-md">
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={userLocation} icon={customIcon("user")}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">Your Location</p>
                  <p className="text-sm text-gray-600">Bangalore, Karnataka</p>
                </div>
              </Popup>
            </Marker>

            {tuitions.map((t) => (
              <Marker
                key={t._id}
                position={[
                  t.location.coordinates[1],
                  t.location.coordinates[0],
                ]}
                icon={customIcon("tuition")}
                eventHandlers={{
                  click: () => {
                    setSelectedTuition(t._id);
                    getRoute(
                      t.location.coordinates[1],
                      t.location.coordinates[0]
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
        </div>
      </div>
    </div>
  );
}

export default MapView;
