const { v4 } = require('uuid')
const ShortnerModel = require('../models/shortner.model')
class Shortner {
  async index (req, res) {
    try {
      const shortner = await ShortnerModel.find()
      res.send({ shortner })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  async store (req, res) {
    try {
      const { url } = req.body
      const [hash] = v4().split('-')
      const shortner = await ShortnerModel.create({ url, hash })
      res.send({ message: 'Created', shortner })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const { url } = req.body

      const shortner = await ShortnerModel.findById(id)

      if (!shortner) {
        throw new Error('Hash não encontrado')
      }

      shortner.url = url
      await shortner.save()

      res.send({ message: 'Updated', shortner })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  remove (req, res) {
    res.send({ message: 'Removeu!' })
  }

  getOne (req, res) {
    res.send({ message: 'Pegou o primeiro!' })
  }
}

module.exports = new Shortner()
