import styles from "./CityItem.module.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// function isWindowsAndChromiumBased() {
//   // Check if the OS is Windows
//   const isWindows = navigator.platform.indexOf("Win") > -1;

//   // Check if the browser is Chromium-based
//   // Note: This checks for Chrome/Chromium, but also matches Edge and Opera
//   const isChromium =
//     window.chrome !== null && typeof window.chrome !== "undefined";

//   return isWindows && isChromium;
// }

// console.log(isWindowsAndChromiumBased());

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, iso, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={`fi fi-${iso}`}></span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.name}>({formatDate(date)})</time>

      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
