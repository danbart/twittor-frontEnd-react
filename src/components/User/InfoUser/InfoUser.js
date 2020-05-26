import React from 'react'
import moment from 'moment'
import localization from 'moment/locale/es'
import { Link, Location, DateBirth } from '../../../utils/Icons'

import './InfoUser.scss'

export default function InfoUser(props) {
    const { user } = props
    return (
        <div className="info-user">
            <h2 className="name">{user?.Nombre} {user?.Apellido}</h2>
            <p className="email">{user?.Email}</p>
            {user?.Biografia && (
                <div className="description">{user.Biografia}</div>
            )}
            <div className="more-info">
                {user?.Ubicacion &&(
                    <p><Location />{user.Ubicacion}</p>
                )}
                {user?.SitioWeb &&(
                    <a href={user.SitioWeb} alt={user.SitioWeb} target="_blank" rel="noopener noreferrer"><Link /> {user.SitioWeb}</a>
                )}
                {user?.FechaNacimiento &&(
                    <p><DateBirth />{moment(user.FechaNacimiento).locale("es", localization).format("LL")}</p>
                )}
            </div>
        </div>
    )
}
