import React, { useState } from 'react'
// boostrap
import { Container, Row, Col, Button } from 'react-bootstrap'
// iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUsers, faComment  } from '@fortawesome/free-solid-svg-icons'
// modals
import BasicModal from '../../components/Modal/BasicModal'
import SingUpForm from '../../components/SingUpForm'
import SingnInForm from '../../components/SingnInForm'
// img
import LogoTwittor from '../../assets/png/logo.png'
import LogoWhiteTwittor from '../../assets/png/logo-white.png'

// import stylos
import './SignInSignUp.scss'

export default function SignInSignUp(props) {
    const {setRefresCheckLogin} = props
    const [showModal, setShowModal]  = useState(false);
    const [contentModal, setContentModal ] = useState(null)

    const openModal = content => {
        setShowModal(true);
        setContentModal(content)
    }

    return (
        <>
        <Container className="sigin-signup" fluid>
            <Row>
                <LeftComponent />
                <RightComponent openModal={openModal} setShowModal={setShowModal} setRefresCheckLogin={setRefresCheckLogin} />
            </Row>
        </Container>
        <BasicModal 
        show={showModal}
        setShow={setShowModal}>
            {contentModal}
        </BasicModal>
        </>
    )
}


function LeftComponent(){
    return (
        <Col className="sigin-signup__left" xs={6}>
            <img src={LogoTwittor} alt="Twittor" />
            <div>
                <h2><FontAwesomeIcon icon={faSearch} /> Sigue lo que te interesa.</h2>
                <h2><FontAwesomeIcon icon={faUsers} /> Enterate de qué está hablando la gente. </h2>
                <h2><FontAwesomeIcon icon={faComment} /> Unete a la conversación</h2>
            </div>
        </Col>
    )
}

function RightComponent(props){
    const {openModal, setShowModal, setRefresCheckLogin} = props;
    return (
        <Col className="sigin-signup__right" xs={6}>
            <div>
                <img src={LogoWhiteTwittor} alt="Twittor" />
                <h2>Mira lo que esta pasando en el mundo en este momento</h2>
                <h3>Únete a twittor hoy mismo</h3>
                <Button variant="primary" onClick={()=> openModal(<SingUpForm setShowModal={setShowModal} />)}>Regístrate</Button>
                <Button variant="outline-primary" onClick={()=> openModal(<SingnInForm  setRefresCheckLogin={setRefresCheckLogin} />)}>Iniciar Sesión</Button>
            </div>
        </Col>
    )
}