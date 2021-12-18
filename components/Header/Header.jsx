import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";


import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const handleLogout = (evt) => {
    logout(() => {
      router.push("/");
    });
  };
  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={`${styles.arrow} ${styles.left__arrow}`}></div>
          <div className={`${styles.arrow} ${styles.right__arrow}`}></div>
        </div>

        <ul className={styles.navigation}>
          <li>Home</li>
          <li>About us</li>
          <li>contact us</li>
        </ul>
      </div>

      <div className={styles.right} onClick={handleLogout}>
       
        <Avatar sx={{ bgcolor: "white", color: "black" }}>Ar</Avatar>
      </div>
    </header>
  );
}

export default Header;