import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import Head from 'next/head'

import { addDevit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Avatar from 'components/Avatar'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet() {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  // Drag images
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    // si tenemos la imagen, cambiamos el estado de task
    if (task) {
      let onProgress = () => {}
      let onError = () => {}
      let onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then((imgURL) => {
          setImgURL(imgURL)
        })
      }

      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR(err))
      })
  }

  const isButtonsDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }
  const handleDragLeave = (event) => {
    event.preventDefault()

    setDrag(DRAG_IMAGE_STATES.NONE)
  }
  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    // mandamos la imagen a firebase
    const task = uploadImage(file)
    setTask(task)
  }

  return (
    <>
      <Head>
        <title>Crear un Devit / Devtter</title>
      </Head>
      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar src={user.avatar} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué esta pasando?"
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>X</button>
              <img src={imgURL} />
            </section>
          )}
          <Button disabled={isButtonsDisabled}>Devittear</Button>
        </form>
      </section>
      <style jsx>
        {`
          div {
            padding: 15px;
          }

          button {
            background: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 15px;
            right: 15px;
            border: 0;
            border-radius: 999px;
            color: #fff;
            font-size: 24px;
            width: 32px;
            height: 32px;
          }
          form {
            padding: 10px;
          }
          img {
            height: auto;
            border-radius: 10px;
            width: 100%;
          }
          .remove-img {
            position: relative;
          }
          .form-container {
            display: flex;
            align-items: flex-start;
          }
          .avatar-container {
            padding-top: 10px;
            padding-left: 10px;
          }
          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? '3px dashed #09f'
              : '3px solid transparent'};
            min-height: 200px;
            width: 100%;
            resize: none;
            font-size: 21px;
            padding: 15px;
            outline: 0;
          }
        `}
      </style>
    </>
  )
}
