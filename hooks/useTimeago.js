import { useState, useEffect } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

// Esta funcion indicara cuando se escribio un tweet, ex: hace un 1 dia, hace 1 min, etc
const getDateDiffs = (timestamp) => {
  // tiempo de ahora en tiempo real
  const now = Date.now()
  // tiempo que ha pasado despues de un tweet
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      // redondeamos hacia abajo con math.floor, para que diga hace 2 segundos
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeago(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  // Esto actualizara la vista cada segundo para poder visualizar al momento cuanto tiempo paso despues de tu tweet
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 5000)

    return () => clearInterval(interval)
  }, [timestamp])
  // usamos la api del navegador para indicar en automatico el 'hace 1 dia'
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })

  const { value, unit } = timeago

  return rtf.format(value, unit)
}
