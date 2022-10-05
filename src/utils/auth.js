import { TOKEN_TIME, EXPRESS_TOKEN_TIME } from './constant'

export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}

export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

export const diffTokenTime = () => {
  const currentDate = Date.now()
  const tokenTime = getTokenTime()
  return currentDate - tokenTime > EXPRESS_TOKEN_TIME
}
