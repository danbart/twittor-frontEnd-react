import React, { useState, useEffect} from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {toast} from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import BasicLayout from '../../layout/BasicLayout'
import BannerAvatar from '../../components/User/BannerAvatar'
import InfoUser from '../../components/User/InfoUser'
import { getUserApi } from '../../api/user'

import './user.scss'

function User(props) {
    const { match } = props
    const { params } = match
    const loggedUser = useAuth()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserApi(params.id).then(res  => {
            if(!res) toast.error("El usuario que has visitado no existe")
            setUser(res)
        }).catch(()=>{
            toast.error("El usuario que has visitado no existe")
        })
    }, [params])

    return (
        <BasicLayout className="user">
            <div className="user__tittle">
            <h2>{user?`${user.Nombre} ${user.Apellido}`:"Este usuario no existe"} </h2>
            </div>
            <BannerAvatar user={user}  loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className="user__tweets">Lista de Tweets</div>
        </BasicLayout>
    )
}

export default withRouter(User)
