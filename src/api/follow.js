import { API_HOST } from '../utils/constants'
import { getTokenApi } from './auth'

export function checkFollowApi(idUser){
    const url = `${API_HOST}/consultaRelacion?id=${idUser}`

    const params = {
        headers: {
            // "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(resp => {
        return resp.json()
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export function followUserApi(idUser){
    const url = `${API_HOST}/altaRelacion?id=${idUser}`

    const params = {
        method: "POST",
        headers: {
            // "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(resp => {
        return resp.json()
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export function unfollowUserApi(idUser){
    const url = `${API_HOST}/bajaRelacion?id=${idUser}`

    const params = {
        method: "DELETE",
        headers: {
            // "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(resp => {
        return resp.json()
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export function getFollowsApi(paramsURL) {
    const url = `${API_HOST}/listaUsuarios?${paramsURL}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(res => {
        return res.json()
    }).then(resp => {
        return resp
    }).catch(err => {
        return err
    })
}