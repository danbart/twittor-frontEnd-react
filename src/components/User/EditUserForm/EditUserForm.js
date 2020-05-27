import React, { useState, useCallback } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import { toast } from 'react-toastify'

import { useDropzone } from 'react-dropzone'
import { API_HOST } from '../../../utils/constants'
import { Camara } from '../../../utils/Icons'
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from '../../../api/user'

import './EditUserForm.scss'

export default function EditUserForm(props) {

    const { user, setShowModal } = props
    const [formData, setFormData] = useState(initialValue(user))
    const [bannerUrl, setBannerUrl] = useState(
        user?.Banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
    );
    const [bannerFile, setBannerFile] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(
        user?.Avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
    )
    const [avatarFile, setAvatarFile] = useState(null)
    const [login, setLogin] = useState(false)

    // el callback sirve para ejecutar la función al momento de cargar un archivo
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file))
        setBannerFile(file)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    })

    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    })

    // las reglas del dropzone el get input le envia lo necesario al input que esta dentro de root props
    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    })
    
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setLogin(true)
        
        if (bannerFile ) {
            await uploadBannerApi(bannerFile).catch(()=>{
                toast.error("Error al subir el nuevo banner")
            })
        }

        if (avatarFile ) {
            await uploadAvatarApi(avatarFile).catch(()=>{
                toast.error("Error al subir el nuevo avatar")
            })
        }
        
        await updateInfoApi(formData).then(() => {
            setShowModal(false)
            toast.success('Actualizado Correctamente')
        }).catch(() =>{
            toast.error('Error al actualizar los datos')
        })
        
        setLogin(false)
        window.location.reload();
    }
    return (
        <div className="edit-user-form">
            <div className="banner" style={{backgroundImage: `url('${bannerUrl}')`}}
                {...getRootBannerProps()}
            >
                <input {...getInputBannerProps()} />
                <Camara />
            </div>
            <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')`}}
            {...getRootAvatarProps()} >
                <input {...getInputAvatarProps()} />
                <Camara />
            </div>
            <Form onSubmit={onSubmit} >
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="Nombre" name="nombre" defaultValue={formData.Nombre} onChange={onChange}  />
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Apellido" name="apellido" defaultValue={formData.Apellido} onChange={onChange}  />
                        </Col>
                    </Row>
                </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" row="3" placeholder="Agrega tu Biograía" name="biografia" defaultValue={formData.Biografia} onChange={onChange}  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Sitio Web" name="sitioWeb" defaultValue={formData.SitioWeb} onChange={onChange}  />
                    </Form.Group>
                    <Form.Group>
                        <DatePicker placeholder="Fecha de Nacimiento"
                        locale={es} selected={new Date(formData.FechaNacimiento)} onChange={date => setFormData({...formData, FechaNacimiento: date})} />
                    </Form.Group>

                <Button className="btn-submit" disabled={login} variant="primary" type="submit">{login && <Spinner animation="border" size="sm" /> } Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValue(user){
    return {
        Nombre: user.Nombre || "",
        Apellido: user.Apellido || "",
        Biografia: user.Biografia || "",
        Ubicacion: user.Ubicacion || "",
        SitioWeb: user.SitioWeb || "",
        FechaNacimiento: user.FechaNacimiento || ""
    }
}

