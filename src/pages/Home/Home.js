import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Button, Spinner } from 'react-bootstrap'

import ListTweets from '../../components/ListTweets'
import { getTweetsFollowersApi } from '../../api/tweet'

import './Home.scss'

export default function Home(props) {
    const { setRefresCheckLogin } = props
    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false)

    useEffect(() => {
        getTweetsFollowersApi(page).then(res => {
            if(!tweets && res) {
                setTweets(formatModel(res))
            } else {
                if(!res){
                    setLoadingTweets(0);
                } else {
                    const data = formatModel(res)
                    setTweets([...tweets, ...data])
                    setLoadingTweets(false)
                }
            }
        }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const moreData = () => {
        setLoadingTweets(true)
        setPage(page + 1 )
    }

    return (
        <BasicLayout className="home" setRefresCheckLogin={setRefresCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            { tweets && <ListTweets tweets={tweets} /> }
            <Button onClick={moreData} className="load-more"  >
                {!loadingTweets ? (
                    loadingTweets !==0 ? "Obtener mas Tweets" : " No Hay mas Tweest"
                ) : (
                    <Spinner 
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const tweetTemp= []
    tweets.forEach(tweet => {
        tweetTemp.push({
            _id: tweet._id,
            userid: tweet.userRelationId,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
        })
    });
    return tweetTemp
}

