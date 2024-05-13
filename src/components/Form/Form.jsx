// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

export function convertToEmoji(countryCode) {
  let codePoints = [0];
  if (countryCode !== undefined) {
    codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
  }
  return String.fromCodePoint(...codePoints);
}

function Form() {
  // custom hook that fetches the latitude and longitudinal values from the URL (URL state)
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  // use derived state to get emoji for the country
  const [emoji, setEmoji] = useState("");
  // Error state set to empty string by default
  const [geoCodingError, setGeocodingError] = useState("");

  // Spinner for form data when clicked
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  // base url for API
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  // to display data right when the form component mounts...
  // form component mounts after clicks on the map initiates the navigate hook to open the form and initiate the component
  // API call is a side effect, this is why the useEffect is being used to load when component mounts.
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          // reset the error
          setGeocodingError("");
          // fetch data using the API with parsed values
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          console.log(data);

          // throw an error if no country code is retrieved due to user not clicking on a coutnry
          if (!data.countryCode)
            throw new Error(
              "that doesn't seem to be a new city... Click somewhere else 😊."
            );
          //  || for default values / fallback values
          setCityName(data.city || data.locality || country || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
          console.log(err);
        } finally {
          // to load spinner
          setIsLoadingGeocoding(false);
        }
      }
      // run this function
      fetchCityData();
    },
    // load values in dependency array, so that the useEffect function will run anytime changes are made to these variables
    [lat, lng, country, setEmoji]
  );

  // Render the Spinner component in the time that the form 'is loading'
  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (geoCodingError) {
    // display error message if no city is clicked on the map
    return <Message message={geoCodingError} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* number shows the number of pages in the browsers history */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
