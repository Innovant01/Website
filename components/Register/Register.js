import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './register.module.css'


const Register = () => {

  const initialState = { firstName: '', lastName: '', email: '', password: '', cf_password: '', err: '', success: '' }
  const [userData, setUserData] = useState(initialState)
  const { firstName, lastName, email, password, cf_password, err, success } = userData
  var message = ''

  const router = useRouter()

  const handleChangeInput = e => {
    const { name, firstName, lastName, value } = e.target
    setUserData({ ...userData, [name]: value, [firstName]: value, [lastName]: value, err: '', success: '' })

  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(password))
      return setUserData({ ...userData, err: "Please fill in all fields.", success: '' })

    if (!isEmail(email))
      return setUserData({ ...userData, err: "Invalid emails.", success: '' })

    if (isLength(password))
      return setUserData({ ...userData, err: "Password must be at least 6 characters.", success: '' })

    if (!isMatch(password, cf_password))
      return setUserData({ ...userData, err: "Password did not match.", success: '' })

    try {
      const res = await axios.post("http://localhost:4000/user/register", {
        firstName, lastName, email, password
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setUserData({ ...userData, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg &&
        setUserData({ ...userData, err: err.response.data.msg, success: '' })
    }

  }
  const isEmpty = value => {
    if (!value) return true
    return false
  }

  const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const isLength = password => {
    if (password.length < 6) return true
    return false
  }

  const isMatch = (password, cf_password) => {
    if (password === cf_password) return true
    return false
  }
  const showErrMsg = (message) => {
    return <div className="errMsg">{message}</div>
  }
  const showSuccessMsg = (message) => {
    return <div className="successMsg">{message}</div>
  }
  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__container__name}>
            <div className="form-group">
              <input type="text" className={`${styles.input} ${styles.input__name}`} id="firstName"
               name="firstName" placeholder="First Name *" value={firstName} onChange={handleChangeInput} />
            </div>

            <div className="form-group">
              <input type="text" className={`${styles.input} ${styles.input__name}`} id="lastName"
               name="lastName" placeholder="Last Name *" value={lastName} onChange={handleChangeInput} />
            </div>
          </div>

          <div className={styles.input__container}>
            <input type="email" className={styles.input} id="exampleInputEmail1" aria-describedby="emailHelp"
             name="email" placeholder="E-mail *" value={email} onChange={handleChangeInput} />
          </div>


          <div className={styles.input__container}>
            <input type="password" className={styles.input} id="exampleInputPassword1"
             name="password" placeholder="Passwword *" value={password} onChange={handleChangeInput} />
          </div>

          <div className={styles.input__container}>
            <input type="password" className={styles.input} id="exampleInputPassword2"
              name="cf_password" placeholder="Repeat Password *" value={cf_password} onChange={handleChangeInput} />
          </div>
          {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
          <div className={`${styles.input__container} ${styles.btn__style}`}>
            <button type="submit" className={styles.submit__btn}>Submit</button>
            
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register