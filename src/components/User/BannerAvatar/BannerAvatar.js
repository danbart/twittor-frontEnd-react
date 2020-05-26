import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import ConfigModal from '../../Modal/ConfigModal'
import EditUserForm from '../../User/EditUserForm'
import AvatarNoFound from '../../../assets/png/avatar-no-found.png'
import { API_HOST } from '../../../utils/constants'

import './BannerAvatar.scss'

export default function BannerAvatar(props) {
    const { user, loggedUser } = props
    const [showModal, setShowModal] = useState(false)
    // el user?.Banner sirve para decirle al if que se ejecute si user existe 
    const bannerURL = user?.Banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null;
    const avatarURL = user?.Avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNoFound;
    
    return (
        <div className="banner-avatar" style={{backgroundImage: `url('${bannerURL}')`}}>
            <div className="avatar" style={{backgroundImage: `url('${avatarURL}')`}} />
            {user && (
                <div className="options">
                    {loggedUser._id === user.id && <Button onClick={() => setShowModal(true)}>Editar Perfiil</Button> }
                    {loggedUser._id !== user.id && <Button>Seguir</Button>}
                </div>
            )}

            <ConfigModal show={showModal} setShow={setShowModal} title="Editar Perfil" >
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    )
}
