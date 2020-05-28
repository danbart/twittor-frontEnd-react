import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { logoutApi } from '../../api/auth'
import LogoWhite from '../../assets/png/logo-white.png'
import useAuth from '../../hooks/useAuth'
import TweetModal from '../Modal/TweetModal'


import './LeftMenu.scss'

export default function LeftMenu(props) {
    const { setRefresCheckLogin } = props
    const [showModal, setShowModal] = useState(false)
    const user = useAuth();


    const logout = () => {
        logoutApi()
        setRefresCheckLogin(true)
    }
    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="Twittor" />

            <Link to="/"> <FontAwesomeIcon icon={faHome} /> Inicio</Link>
            <Link to="/users"> <FontAwesomeIcon icon={faUsers} /> Usuarios</Link>
            <Link to={`/${user?._id}`}> <FontAwesomeIcon icon={faUser} /> Perfil</Link>
            <Link onClick={logout} to=""> <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión</Link>

            <Button onClick={() => setShowModal(true) }>Twittoar</Button>

            <TweetModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
