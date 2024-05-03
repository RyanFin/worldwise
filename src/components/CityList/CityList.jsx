import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
// import CityItem from "../CityItem/CityItem";
import PropTypes from "prop-types";
import CityItem from "../CityItem/CityItem";

function CityList({ cities, isLoading }) {
  // Define prop types using PropTypes
  CityList.propTypes = {
    // Example props
    cities: PropTypes.array,
    isLoading: PropTypes.bool,
    // Add more prop types as needed
  };

  console.log(isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
