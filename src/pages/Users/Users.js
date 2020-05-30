import React, { useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap'
import queryString from 'query-string'
import { isEmpty } from 'lodash'
import { useDebouncedCallback } from 'use-debounce'
import { getFollowsApi } from '../../api/follow'
import ListUsers from '../../components/ListUsers'

import BasicLayout from '../../layout/BasicLayout'

import './Users.scss'

export default withRouter(Users)

function Users(props) {
    const { setRefresCheckLogin, location, history } = props
    const [users, setUsers] = useState(null)
    const params = useUserQuery(location)
    const [typeUser, setTypeUser] = useState(params.type || "follow")
    const [btnLoading, setBtnLoading] = useState(false)
    
    // esta función es para que tome un tiempo en esperar que el usuario escriba para hacer que funcione
    const [onSearch] = useDebouncedCallback(value => {
        setUsers(null)
        setBtnLoading(false)
        history.push({ 
            search: queryString.stringify({ ...params, search: value, page: 1 })
        })
    }, 200)
    
    // TODO: error al ingresar en el enlace un valor mayor a 1 en pagina
    useEffect(() => {
        getFollowsApi(queryString.stringify(params)).then(res => {
            if(params.page == 1 ) {
                if(isEmpty(res)){
                    setUsers([])
                } else {
                    setUsers(res)
                }
            } else {
                if(!res){
                    setBtnLoading(0)
                } else {
                    setUsers([...users, ...res])
                    setBtnLoading(false)
                }
            }
            
        }).catch(() => {
            setUsers([])
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const onChangeType = type => {
        setUsers(null);
        setBtnLoading(false)
        if(type === "new"){
            setTypeUser("new")
        } else {
            setTypeUser("follow")
        }
        history.push({
            search: queryString.stringify({type: type, page: 1, search: ""}),
        })
    }

    const moreData = () => {
       setBtnLoading(true)
       const newPage = parseInt(params.page) + 1

       history.push({
           search: queryString.stringify({ ... params, page: newPage}),
       });
    }

    return (
        <BasicLayout className="users" title="Usuarios" setRefresCheckLogin={setRefresCheckLogin}>
            <div className="users__title">
                <h2>Usuarios</h2> 
                <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder="Busca un usuario.." />
                </div>

                <ButtonGroup className="users__options">
                    <Button className={typeUser === 'follow' && 'active'} onClick={() =>onChangeType("follow") } >Siguiendo</Button>
                    <Button className={typeUser === 'new' && 'active'} onClick={() =>onChangeType("new") }>Nuevos</Button>
                </ButtonGroup>
                {/* el error es que user queda en null y por eso no pasa de aqui */}
            {!users ? (
                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando Usuarios
                </div>
            ) : (
                <>
                <ListUsers users={users} />
                { !isEmpty(users) ? <Button onClick={moreData} className="load-more">
                    {!btnLoading ? (
                        btnLoading !== 0 && 'Cargar más usuarios'
                     ) : (
                         <Spinner
                         as="span"
                         animation="grow"
                         size="sm"
                         role="status"
                         aria-hidden="true"
                         />
                     )}
                </Button> : "" }
                </>
            )}

        </BasicLayout>
    )
}

// queryString sirve para pasar un string a arreglo y visebersa 
function useUserQuery(location){
    const {page = 1, type="follow", search } = queryString.parse(location.search)
    return { page, type, search };
}