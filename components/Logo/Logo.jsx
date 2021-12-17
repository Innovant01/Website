import React from "react";
import styles from "./Logo.module.css";

function Logo({ width, height }) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.arrow} ${styles.left}`}
        style={{ width: width, height: height }}
      ></div>
      <div
        className={`${styles.arrow} ${styles.right}`}
        style={{ width: width, height: height }}
      ></div>
    </div>
  );
}

export default Logo;