import React, { useState } from 'react'
import {Row, Col, Form, Button, Spinner} from 'react-bootstrap'
import { values, size } from 'lodash'
import { toast } from 'react-toastify'

import { isEmailValid } from '../../utils/validations'
import { signUpApi } from '../../api/auth'

import './SingUpForm.scss'

export default function SingUpForm(props) {
    const { setShowModal } = props
    const [formData, setFormData] = useState(initialFormValue())
    const [signUoLoading, setSignUoLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        // esto cierra el modal cuando se envia el submit
        // setShowModal(false)
        
        let validCount = 0
        values(formData).some(value => {
            value && validCount ++
            return null
        })

        if(validCount !== size(formData)){
            toast.warning("Completa todos los campos del formulario")
        } else {
           if(!isEmailValid(formData.email)){
            toast.warning("Email invalido")
           } else if (formData.password !== formData.repeatPassword) {
            toast.warning("Las contraseñas tienen que ser iguales")
           } else if(size(formData.password) < 6 ){
            toast.warning("La contraseña tiene que tener al menos 6 caracteres")
           } else {
               setSignUoLoading(true);
            signUpApi(formData).then(res  => {
                if(res.code) {
                    toast.warning(res.message);
                } else {
                    toast.success("El registro ha sido correcto");
                    setShowModal(false);
                    setFormData(initialFormValue());
                }
            }).catch(()=> {
                toast.error("Error del servidor, intentelo mas tarde");
            }).finally(()=> {
                setSignUoLoading(false)
            });
           }
        }
    }

    // esta función solo sirve para formularios con inputs
    const onChange = e => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    //  Value={formData.nombre} onChange={e=>setFormData({...formData, nombre: e.target.value })}
    // onChange={e=>setFormData({...formData, apellido: e.target.value })} 
    return (
        <div className="sign-up-form">
            <h2>Crea tu Cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="Nombre" defaultValue={formData.nombre} name="nombre" />
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Apellido" defaultValue={formData.apellido} name="apellido" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo Electronico" defaultValue={formData.email} name="email" />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="password" placeholder="Contraseña" defaultValue={formData.password} name="password" />
                        </Col>
                        <Col>
                        <Form.Control type="password" placeholder="Repetir Contraseña" defaultValue={formData.repeatPassword} name="repeatPassword" />
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!signUoLoading ? false: true} >
                    {!signUoLoading ? "Registrarse" : <Spinner animation="border" /> }
                </Button>
            </Form>
            
        </div>
    )
}


function initialFormValue(){
    return {
        nombre: "",
        apellido: "",
        email:"",
        password: "",
        repeatPassword:""
    }
}