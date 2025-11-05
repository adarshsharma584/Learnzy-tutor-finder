import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { fetchAllTuitions } from "../redux/thunk/tuitionThunk.js";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

function MapView() {
    const dispatch = useDispatch();
    const { tuitions } = useSelector((state) => state.tuition);
    
    const [userLocation, setUserLocation] = useState(null);
    const [route, setRoute] = useState([]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
      dispatch(fetchAllTuitions());
    }, [dispatch]);

    const getRoute = async (lat, lng) => {
      if (!userLocation) return;

      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${lng},${lat}?overview=full&geometries=geojson`;

      const res = await axios.get(url);

      const coords = res.data.routes[0].geometry.coordinates.map((point) => [
        point[1],
        point[0],
      ]);

      setRoute(coords);
    };

    return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />

      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {tuitions.map((t) => (
        <Marker
          key={t._id}
          position={[t.location.coordinates[1], t.location.coordinates[0]]}
          eventHandlers={{
            click: () =>
              getRoute(
                t.location.coordinates[1],
                t.location.coordinates[0]
              ),
          }}
        >
          <Popup>{t.name}</Popup>
        </Marker>
      ))}

      {route.length > 0 && <Polyline positions={route} />}
    </MapContainer>
  );
}

export default MapView;