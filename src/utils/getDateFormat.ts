
const getDateFormat = (time, mode = 0) => {
  if (time <= 0) return "end"
  const total = time / 1000
  const days = Math.floor(total / 86400)
  const hours = Math.floor(total % 86400 / 3600)
  const minutes = Math.floor(total % 86400 % 3600 / 60)
  const seconds = Math.floor(total % 86400 % 3600 % 60)
  let formattedTime
  if (mode === 0)
    formattedTime = days ? days + ' Days' : hours ? hours + ' hours' : minutes ? minutes + ' minutes' : seconds + ' seconds ago'
  else if (mode === 1)
    formattedTime = days ? days + ' Days' : hours + ':' + minutes
  return formattedTime
}

export default getDateFormat