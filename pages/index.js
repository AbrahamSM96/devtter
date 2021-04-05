import { useState, useEffect } from 'react'
import Head from 'next/head'
import { colors } from '../styles/theme'
import GitHub from '../components/Icons/GitHub'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'

import { loginWithGitHub, onAuthStateChanged } from '../firebase/client'
import Avatar from '../components/Avatar'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        const { avatar, username, url } = user
        setUser(user)
        console.log(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Head>
        <title>Devtter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          <img src="/corgi.png" alt="logo" />
          <h1>Devtter</h1>
          <h2>Talk about development 👨🏻‍💻</h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill={'#fff'} width={32} height={24} />
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <Avatar avatar={user.avatar} username={user.username} />
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>
        {`
          img {
            width: 120px;
            image-rendering: pixelated;
          }

          div {
            margin-top: 16px;
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }
          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 0;
          }
          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0px;
          }
        `}
      </style>
    </div>
  )
}
