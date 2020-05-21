import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { values, size } from 'lodash'
import { toast } from 'react-toastify'
import { isEmailValid } from '../../utils/validations'
import { signInApi, setTokenApi } from '../../api/auth'

import './SingnInForm.scss'

export default function SingnInForm(props) {
    const { setRefresCheckLogin } = props

    const [formData, setFormData] = useState(initialFormValue)
    const [signInLoading, setSignInLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        let validCount = 0;
        values(formData).some(val=> {
            val &&  validCount++
            return null
        })

        if(size(formData) !== validCount){
            toast.warning('Completa todos los campos del formularios')
        } else {
            if(!isEmailValid(formData.email)){
                toast.warning('Email es invalido')
            } else {
                setSignInLoading(true)
                signInApi(formData).then(resp => {
                    if(resp.message){
                        toast.warning(resp.message)
                    } else {
                       setTokenApi(resp.Token)
                       setRefresCheckLogin(true)
                       toast.success('Logueado con exito')
                    }
                }).catch(() => {
                    toast.error('Error del servidor, intentelo más tarde')
                }).finally(()=>{
                    setSignInLoading(false)
                })
            }
        }
    };

    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    return (
        <div className="singn-in-form">
            <h2>Ingresar</h2>
            <Form onSubmit={onSubmit} onChange={onChange} >
                <Form.Group>
                    <Form.Control type="email" name="email" defaultValue={formData.email}  placeholder="Correo electronico" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" defaultValue={formData.password} placeholder="Contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!signInLoading?false:true}>
                    {!signInLoading ? 'Iniciar Sesión':<Spinner animation="border" />}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue(){
    return{
        email:"",
        password:""
    }
}
