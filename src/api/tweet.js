import { API_HOST } from '../utils/constants'
import { getTokenApi } from './auth'

export function addTweetApi(mensaje){
    const url =  `${API_HOST}/tweet`

    const data = {
        mensaje
    }

    const params = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(res => {
        if ( res.status >=200 && res.status < 300 ){
            return { code: res.status, message: 'Tweet enviado' }            
        }
        return { code: 500, message: 'Error del servidor' }            
    }).catch(err => {
        return err
    })
}

export function getUserTweetsApi(idUser, page){
    const url =  `${API_HOST}/leoTweets?id=${idUser}&pagina=${page}`

    const params = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(res => {
        return res.json()          
    }).catch(err => {
        return err
    })
}