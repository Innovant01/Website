import React from "react";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <Logo width={"5rem"} height={"4rem"} />
      <p className={styles.copyright}>© All Rights Reserved.</p>
    </div>
  );
}

export default Footer;