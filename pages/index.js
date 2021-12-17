import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Signin from '../pages/login'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Innovant</title>
      </Head>
   

      <Signin/>
      
    </div>
    
  )
}
