import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={`fi fi-${country.iso}`}></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
