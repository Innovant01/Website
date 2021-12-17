
import Head from "next/head";
import Resgister from "../components/Register/Register";
import { useRouter } from "next/router";


function register() {
  const router = useRouter();

 

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <Resgister />
    </div>
  );
}

export default register;