import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Footer />
    </div>
  );
}
