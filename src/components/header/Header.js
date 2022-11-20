import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import './Header.css'

const Header = () => {
    const auth = useContext(AuthContext);
  return (
    <>
    <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light px-5">
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-box me-4  text-danger" viewBox="0 0 16 16 " >
          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
          </svg>
        <NavLink className="navbar-brand text-success" to="/home">
          <div className='fs-4'>Hotels Crud</div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse " id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger bg-danger text-info rounded" : "nav-link text-white"
              }
                 to="/home">
                <div className='ps-1 pe-1 fs-5'>Home</div>
              </NavLink>
            </li>
            {auth.isLoggedin() ? (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
                } 
                  to="/countries">
                    <div className='ps-1 pe-1 fs-5'>Countries</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
              } 
                  to="/hotels">
                    <div className='ps-1 pe-1 fs-5'>Hotels</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
              } 
                  to="/orders">
                    <div className='ps-1 pe-1 fs-5'>Orders</div>
                  </NavLink>
                </li>
              </>
            ) : (
              " "
            )}
          </ul>
          {!auth.isLoggedin() ? (
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
              } 
                   to="/login">
                  <div className='ps-1 pe-1 fs-5'>Login</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
              } 
                  to="/register">
                  <div className='ps-1 pe-1 fs-5'>Register</div>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <span className="nav-link mx-4 text-primary fw-bold fst-italic fs-5">{`Hello ${
                  auth.getUser().name
                }`}</span>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                  isActive ? "nav-link active bg-danger text-info rounded" : "nav-link text-white"
                }
                  to="/login"
                  onClick={() => auth.logout()}
                >
                  <div className='ps-1 pe-1 fs-5'>Logout</div>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;