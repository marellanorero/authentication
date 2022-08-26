import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/register">Registrar</Link>
              </li>
              {!store.token ?
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Entrar</Link>
              </li>
              :
              <li className="nav-item">
                <Link onClick={() => actions.logout()} className="nav-link active" aria-current="page" to="/login">Salir</Link>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar