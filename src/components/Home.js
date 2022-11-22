import React, { useContext } from 'react'
import { AuthContext } from "./AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {!auth.isLoggedin() ? (
        <>
          <h3 className='text-center pt-5 text-info'>
            <div>Welcome To Hotel </div><br /><div> Please Log In First</div>
          </h3>
        </>
      ) : (
        auth.getRole() === 2 ? (
          <>
            <h1 className='text-center pt-5 text-success'>
              <div>Admin - Home Page</div>
            </h1>
          </>
        ) : (
          <h1 className='text-center pt-5 text-primary'>
            <div>Client - Home Page</div>
          </h1>
        )
      )
      }
    </>
  )
}

export default Home;