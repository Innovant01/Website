
import Head from "next/head";
import Resgister from "../components/Register/Register";
import { useRouter } from "next/router";
import Stepper from "../components/Stepper/Stepper"



function register() {
  const router = useRouter();

 

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <Stepper />
      <Resgister />
    </div>
  );
}

export default register;