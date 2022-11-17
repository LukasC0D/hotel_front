import React, { useContext } from 'react'
import { AuthContext } from "./AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {!auth.isLoggedin() ? (
          <>
          <h3 className='text-center pt-5 text-info'>
            <div>Welcome to hotels, please log in.</div>
          </h3>        
          </>
          ) : (
          auth.getRole() === 2 ? (
            <>
          <h1 className='text-center pt-5 text-success'>
            <div>Welcome back Boss!!!</div>
          </h1>
            </>
          ) : (
          <h1 className='text-center pt-5 text-primary'>
            <div>Welcome dear Client.</div>
          </h1>
          )
        )
      }
    </>
  )
}

export default Home;