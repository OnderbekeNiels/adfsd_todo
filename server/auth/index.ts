import { getAuth } from 'firebase-admin/auth'

export const verifyToken = (token: string) => {
  return new Promise(function (resolve, reject) {
    getAuth()
      .verifyIdToken(token)
      .then(decodedToken => {
        resolve(decodedToken)
      })
      .catch(error => {
        reject(error)
      })
  })
}
