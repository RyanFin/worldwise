import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";

function CountryList({ cities, isLoading }) {
  // Define prop types using PropTypes
  CountryList.propTypes = {
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

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  );
}

export default CountryList;
