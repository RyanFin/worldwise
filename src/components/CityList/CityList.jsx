import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
// import CityItem from "../CityItem/CityItem";
import PropTypes from "prop-types";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";

function CityList({ cities, isLoading }) {
  // Define prop types using PropTypes
  CityList.propTypes = {
    // Example props
    cities: PropTypes.array,
    isLoading: PropTypes.bool,
    // Add more prop types as needed
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
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