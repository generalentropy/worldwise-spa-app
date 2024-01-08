import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const countryISO = country ? country.countryCode.toLowerCase() : "";

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;

      async function getCountry() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              `That doesn't seem to be a city. Click somewhere else.`
            );

          setCityName(data.city);
          setCountry(data);
        } catch (err) {
          console.log(err);
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      getCountry();
    },
    [mapLat, mapLng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: country.countryName,
      iso: countryISO,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCountry(e.target.value)}
          value={cityName}
        />

        <span className={`fi fi-${countryISO} ${styles.flag}`}></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
