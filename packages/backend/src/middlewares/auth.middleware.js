const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const verify = promisify(jwt.verify)

const publicRoutes = [
  '/api/user',
  '/api/auth'
]

async function authMiddleware (req, res, next) {
  const { authorization } = req.headers

  if (publicRoutes.includes(req.originalUrl)) {
    return next()
  }

  if (!authorization) {
    return res.status(401).send({ message: 'Authorization not found' })
  }

  const [, token] = authorization.split(' ')

  try {
    const value = await verify(token, process.env.JWT_SECRET_KEY)
    req.loggedUser = value
    next()
  } catch (error) {
    return res.status(401).send({ message: error.message })
  }
}

module.exports = authMiddleware
