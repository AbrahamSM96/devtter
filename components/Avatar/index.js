import React from 'react'

export default function Avatar({ avatar, username }) {
  return (
    <>
      <div>
        <img src={avatar} />
        <strong>{username}</strong>
      </div>
    </>
  )
}
