import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <AppFooter />
    </div>
  );
}

export default Sidebar;
