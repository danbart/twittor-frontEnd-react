import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { map } from 'lodash'
import moment from 'moment'
import { getUserApi } from '../../api/user'
import AvatarNoFound from '../../assets/png/avatar-no-found.png'
import { API_HOST } from '../../utils/constants'
import { replaceURLWithHTMLLinks } from '../../utils/functions'

import './ListTweets.scss'

export default function ListTweets(props) {
    const { tweets } = props
    return (
        <div className="list-tweets">
            {map(tweets, (tweet, i) => (
                <Tweet key={i} tweet={tweet} />
            ))}
        </div>
    )
}

function Tweet(props) {
    const { tweet } = props

    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        getUserApi(tweet.userid).then(resp => {
            setUserInfo(resp)
            setAvatarUrl(
                resp?.Avatar ? `${API_HOST}/obtenerAvatar?id=${resp.id}`: AvatarNoFound
            )
        })
    }, [tweet])

    return (
        <div className="tweet">
            <Image className="avatar" src={avatarUrl} roundedCircle />
            <div>
                <div className="name">
                    {userInfo?.Nombre} {userInfo?.Apellido}
                    <span>{moment(tweet.fecha).calendar()}</span> 
                </div>
                {/* TODO: corregir que el ususario no injecte html */}
                {/* <div>{replaceURLWithHTMLLinks(tweet.mensaje)}</div> */}
                <div dangerouslySetInnerHTML={{__html: replaceURLWithHTMLLinks(tweet.mensaje)}} />
            </div>
        </div>
    )
}
