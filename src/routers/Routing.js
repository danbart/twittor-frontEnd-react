import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { map } from 'lodash'
  import configRouting from './configRouting'

export default function Routing(props) {
    const { setRefresCheckLogin } = props
    return (
        // todo se envuelve  en router
        <Router>
            {/* switch sirve para que solo me muestre una ruta exacta y no este buscando parecidos  */}
            <Switch>
                {/* navegamos el arreglo y mostramos cada ruta que creamos */}
                {map(configRouting, (route, i) => (
                    <Route key={i} path={route.path} exact={route.exact}>
                        <route.page setRefresCheckLogin={setRefresCheckLogin} />
                    </Route>
                ))}
            </Switch>
        </Router>
    )
}
