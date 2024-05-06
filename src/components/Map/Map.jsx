import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    // navigate to 'form' url on click
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
}
