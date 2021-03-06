import * as React from 'react'

function Home(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 10.5l9-9 9 9" />
        <path d="M3.5 8.5v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </g>
    </svg>
  )
}

export default Home
