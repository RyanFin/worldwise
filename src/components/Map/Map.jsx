import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";

export default function Map() {
  /* eslint-disable-next-line no-unused-vars */
  const navigate = useNavigate();
  const { cities } = useCities();
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const mapLat = searchParams.get("lat"); // get value from URL
  // eslint-disable-next-line no-unused-vars
  const mapLng = searchParams.get("lng");

  // const values as these values are NOT changing anytime soon
  const startingLat = 51.500833;
  const startingLng = -0.141944;

  const [mapPosition, setMapPosition] = useState([startingLat, startingLng]);
  // const mapPos = [
  //   // if null set a default starter city
  //   mapLat === null ? startingLat : mapLat,
  //   mapLng === null ? startingLng : mapLng,
  // ];

  // useEffect is a synchronisation mechanism
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  return (
    // navigate to 'form' url on click
    // <div className={styles.mapContainer} onClick={() => navigate("form")}>
    <div className={styles.mapContainer}>
      <MapContainer
        // center={mapPos}
        // center={[mapLat, mapLng]}
        center={mapPosition}
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
        <ChangeCenter
          // Default values set
          // position={[mapLat || startingLat, mapLng || startingLng]}
          position={mapPosition}
        />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// separate component that will change the location of the map based on the passed in position value
function ChangeCenter({ position }) {
  ChangeCenter.propTypes = {
    position: PropTypes.array,
  };
  // get the current instance of the map being displayed
  const map = useMap();
  map.setView(position);

  return null;
}

// component will load the form details of the selected country
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
