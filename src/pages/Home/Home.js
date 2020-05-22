import React from 'react'
import BasicLayout from '../../layout/BasicLayout'

import './Home.scss'

export default function Home(props) {
    const { setRefresCheckLogin } = props
    return (
        <BasicLayout className="home" setRefresCheckLogin={setRefresCheckLogin}>
            <h2>Estamos en la HOME</h2>
        </BasicLayout>
    )
}
