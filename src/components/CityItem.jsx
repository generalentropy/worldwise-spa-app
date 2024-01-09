import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

// function isWindowsAndChromiumBased() {
//   // Check if the OS is Windows
//   const isWindows = navigator.platform.indexOf("Win") > -1;

//   // Check if the browser is Chromium-based
//   // Note: This checks for Chrome/Chromium, but also matches Edge and Opera
//   const isChromium =
//     window.chrome !== null && typeof window.chrome !== "undefined";

//   return isWindows && isChromium;
// }

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, iso, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
    console.log(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={`fi fi-${iso}`}></span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.name}>({formatDate(date)})</time>

        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
