import React from 'react'
import Avatar from 'components/Avatar'
import styles from './styles.module.css'
import useTimeago from 'hooks/useTimeago'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Devit({
  avatar,
  userName,
  content,
  id,
  createAt,
  img
}) {
  const timeago = useTimeago(createAt)
  const createdAtFormated = useDateTimeFormat(createAt)
  const router = useRouter()

  const handleArticleClick = (event) => {
    event.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} className={styles.article} onClick={handleArticleClick}>
        <div className={styles.div}>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> * </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <time className={styles.time} dateTime={createdAtFormated}>
                {timeago}
              </time>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
}
