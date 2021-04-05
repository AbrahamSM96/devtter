export const addOpacityToColor = (color, opacity) => {
  const opacityHex = Math.round(opacity * 250).toString(16)
  return `${color}${opacityHex}`
}
