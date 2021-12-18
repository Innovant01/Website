import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './Login.module.css'

const Signin = () => {
    const initialState = { email: '', password: '', err: '', success: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password, err, success } = userData
    var message = ''

    const router = useRouter()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value, err: '', success: '' })

    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:4000/user/login", userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            setUserData({ ...userData, err: '', success: res.data.msg })
            message = res.data.msg
            localStorage.setItem('firstLogin', true)
            router.push('/Home')
        } catch (err) {
            err.response.data.msg &&
                setUserData({ ...userData, err: err.response.data.msg, success: '' })
            message = err.response.data.msg
        }


    }

    const showErrMsg = (message) => {
        return <div className="errMsg">{message}</div>
    }

    return (
        <div>
            <Head>
                <title>Sign in Page</title>
            </Head>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input__container}>
                        <input type="email" className={styles.input} id="exampleInputEmail1" aria-describedby="emailHelp"
                           name="email" placeholder="E-mail *" value={email} onChange={handleChangeInput} />
                    </div>
                    <div className="form-group">
                        <input type="password" className={styles.input} id="exampleInputPassword1"
                           name="password" placeholder="Paswword *" value={password} onChange={handleChangeInput} />
                    </div>
                    {err && showErrMsg(err)}
                <div className={`${styles.input__container} ${styles.btn__style}`}>
                    <button type="submit" className={styles.submit__btn} >Submit</button>
                    
                    
                </div>
          
        </form>
        </div>
         </div >
        
    )
}

export default Signin