import React, { useState, useEffect } from 'react'
import AppLayout from 'components/AppLayout'
import styles from './styles.module.css'
import Devit from 'components/Devit'
import useUser from 'hooks/useUser'
import { fetchLatestDevits } from 'firebase/client'
import Create from 'icons/Create'
import Link from 'next/link'
import Home from 'icons/Home'
import Search from 'icons/Search'
import Head from 'next/head'
export default function HomePage() {
  const [timeline, setTimeLine] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeLine)
  }, [user])
  console.log(timeline)

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devtter</title>
        </Head>

        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                createAt={devit.createAt}
                userName={devit.userName}
                avatar={devit.avatar}
                content={devit.content}
                id={devit.id}
                userId={devit.userId}
                img={devit.img}
              />
            )
          })}
        </section>
        <nav className={styles.nav}>
          <Link href="/compose/tweet">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </AppLayout>
    </>
  )
}
