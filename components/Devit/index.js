import React from 'react'
import Avatar from 'components/Avatar'
import styles from './styles.module.css'
import useTimeago from 'hooks/useTimeago'

export default function Devit({
  avatar,
  userName,
  content,
  id,
  createAt,
  img
}) {
  const timeago = useTimeago(createAt)
  return (
    <div>
      <article key={id} className={styles.article}>
        <div className={styles.div}>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> * </span>
            <date className={styles.date}>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </div>
  )
}
