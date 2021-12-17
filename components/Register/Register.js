import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import "./register.module.css"


const Register = () => {
  
  const initialState = {firstName: '', lastName: '', email: '', password: '', cf_password: '' , err: '', success: ''}
  const [userData, setUserData] = useState(initialState)
  const { firstName,lastName, email, password, cf_password , err, success } = userData
  var message = ''

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, firstName , lastName, value} = e.target
    setUserData({...userData, [name]:value, [firstName]:value, [lastName]:value, err: '', success: ''})
    
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if(isEmpty(firstName)  || isEmpty(lastName)|| isEmpty(password))
                return setUserData({...userData, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUserData({...userData, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUserData({...userData, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUserData({...userData, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post("http://localhost:4000/user/register",{
                firstName , lastName, email, password
            }  , 
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            );

            setUserData({...userData, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUserData({...userData, err: err.response.data.msg, success: ''})
        }
    
  }
   const isEmpty = value => {
    if(!value) return true
    return false
}

 const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

 const isLength = password => {
    if(password.length < 6) return true
    return false
}

 const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}
  const showErrMsg = (message) => {
    return <div className="errMsg">{message}</div>
}
 const showSuccessMsg = (message) => {
    return <div className="successMsg">{message}</div>
}
    return(
      <div>
        <Head>
          <title>Register Page</title>
        </Head>
        <div className="container">
        <form   onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">firstName</label>
            <input type="text" className="form-control" id="firstName"
            name="firstName" value={firstName} onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">lastName</label>
            <input type="text" className="form-control" id="lastName"
            name="lastName" value={lastName} onChange={handleChangeInput} />
          </div>

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

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password} onChange={handleChangeInput} />
          </div>
          
          <button type="submit" className="btn btn-dark w-100">Register</button>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <p className="my-2">
            Already have an account? <Link href="/login"><a style={{color: 'crimson'}}>Login Now</a></Link>
          </p>
        </form>
      </div>
     </div>
    )
  }
  
  export default Register