import React, { useState, useEffect} from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {toast} from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import BasicLayout from '../../layout/BasicLayout'
import BannerAvatar from '../../components/User/BannerAvatar'
import InfoUser from '../../components/User/InfoUser'
import { getUserApi } from '../../api/user'
import { getUserTweetsApi } from '../../api/tweet'
import ListTweets from '../../components/ListTweets'

import './user.scss'

function User(props) {
    const { match, setRefresCheckLogin } = props
    const [user, setUser] = useState(null)
    const [tweets, setTweets] = useState(null)
    const { params } = match
    const loggedUser = useAuth()


    useEffect(() => {
        getUserApi(params.id).then(res  => {
            if(!res) toast.error("El usuario que has visitado no existe")
            setUser(res)
        }).catch(()=>{
            toast.error("El usuario que has visitado no existe")
        })
    }, [params])

    useEffect(() => {
        getUserTweetsApi(params.id,1).then(res => {
            setTweets(res)
        }).catch(() => {
            setTweets([])
        })
    }, [params])

    return (
        <BasicLayout className="user" setRefresCheckLogin={setRefresCheckLogin}>
            <div className="user__tittle">
            <h2>{user?`${user.Nombre} ${user.Apellido}`:"Este usuario no existe"} </h2>
            </div>
            <BannerAvatar user={user}  loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className="user__tweets">
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets} /> }
                
            </div>
        </BasicLayout>
    )
}

export default withRouter(User)
