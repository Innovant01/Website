import React from "react";
import Logo from "../Logo/Logo";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.log__container}>
        <Logo width={"5rem"} height={"4rem"} />
      </div>
    </div>
  );
}

export default Home;