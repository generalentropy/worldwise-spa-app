import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?`;

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [mapLat, mapLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const countryISO = country ? country.countryCode.toLowerCase() : "";

  useEffect(
    function () {
      async function getCountry() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();

          setCityName(data.city);
          setCountry(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      getCountry();
    },
    [mapLat, mapLng]
  );

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCountry(e.target.value)}
          value={isLoadingGeocoding ? "Loading..." : cityName}
        />

        <span className={`fi fi-${countryISO} ${styles.flag}`}></span>
        {/* <span className={styles.flag}>{emoji}</span> */}
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
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
