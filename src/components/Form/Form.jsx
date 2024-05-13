// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";

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
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  // use derived state to get emoji for the country
  const [emoji, setEmoji] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  console.log(isLoadingGeocoding);

  // to display data right when the form component mounts...
  // form component mounts after clicks on the map initiates the navigate hook to open the form and initiate the component
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          //  || for default values / fallback values
          setCityName(data.city || data.locality || country || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng, country, setEmoji]
  );

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
