
import Head from "next/head";
import Signin from "../components/Login/Login";
import { useRouter } from "next/router";
import styles from './'
import Stepper from "../components/Stepper/Stepper"


function login() {
  const router = useRouter();

 

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Stepper />
      <Signin/>
    </div>
  );
}

export default login;