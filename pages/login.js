import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData


  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
        const res = await axios.post(
          "http://localhost:4000/user/login",
         userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(res) //check now
      } catch (e) {}
   
    
    
   
    localStorage.setItem('firstLogin', true)
  }

 

    return(
      <div>
        <Head>
          <title>Sign in Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email} onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput} />
          </div>
          
          <button type="submit" className="btn btn-dark w-100">Login</button>

          <p className="my-2">
            You don't have an account? <Link href="/register"><a style={{color: 'crimson'}}>Register Now</a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Signin