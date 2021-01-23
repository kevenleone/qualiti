const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const sign = promisify(jwt.sign)

const UserModel = require('../models/user.model')

class User {
  async store (req, res) {
    const body = req.body
    const user = await UserModel.create(body)
    res.send(user)
  }

  async login (req, res) {
    const { login, password } = req.body
    const user = await UserModel.findOne({ login }).lean()

    if (!user) {
      return res.status(400).send({ message: 'User Not Exist' })
    }

    if (user.password !== password) {
      return res.status(400).send({ message: 'Password Invalid' })
    }

    delete user.password

    const token = await sign(user, process.env.JWT_SECRET_KEY)

    res.send({ token })
  }
}

module.exports = new User()
