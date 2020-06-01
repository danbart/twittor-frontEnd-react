import React, {useEffect, useState} from 'react'
import { Media, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_HOST } from '../../utils/constants'
import { getUserApi } from '../../api/user'
import AvatarNoFound from '../../assets/png/avatar-no-found.png'

export default function User(props) {
    const { user } = props
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getUserApi(user.id).then(res => {
            setUserInfo(res)
        })
    }, [user])

    return (
        <Media as={Link} to={`/${user.id}`} className="list-users__user" >
            <Image
                width={64}
                height={64}
                roundedCircle
                className="mr-3"
                src={userInfo?.Avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNoFound }
                alt={`${user.Nombre} ${user.Apellido}`}
            />
            <Media.Body>
                <h5>{user.Nombre} {user.Apellido}</h5>
                <p>{userInfo?.Biografia}</p>
            </Media.Body>
        </Media>
    )
}
