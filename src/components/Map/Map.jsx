import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../../contexts/CitiesContext";

export default function Map() {
  /* eslint-disable-next-line no-unused-vars */
  const navigate = useNavigate();
  const { cities } = useCities();
  // eslint-disable-next-line no-unused-vars
  const [mapPosition, setMapPosition] = useState([40, 0]);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const mapLat = searchParams.get("lat"); // get value from URL
  // eslint-disable-next-line no-unused-vars
  const mapLng = searchParams.get("lng");

  const startingLat = 51.500833;
  const startingLng = -0.141944;

  console.log([mapLat, mapLng]);
  console.log(mapPosition);

  return (
    // navigate to 'form' url on click
    // <div className={styles.mapContainer} onClick={() => navigate("form")}>
    <div className={styles.mapContainer}>
      <MapContainer
        center={[
          // if null set a default starter city
          mapLat === null ? startingLat : mapLat,
          mapLng === null ? startingLng : mapLng,
        ]}
        // center={[mapLat, mapLng]}
        // center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
