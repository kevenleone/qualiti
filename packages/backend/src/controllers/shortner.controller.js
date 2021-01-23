const { v4 } = require('uuid')

const ShortnerModel = require('../models/shortner.model')

class Shortner {
  async index (req, res) {
    try {
      const shortner = await ShortnerModel.find({
        created_by: req.loggedUser._id
      })
      res.send({ shortner })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  async store (req, res) {
    try {
      const loggedUser = req.loggedUser
      const { url } = req.body
      const [, hash] = v4().split('-')
      const shortner = await ShortnerModel.create({
        url,
        hash,
        created_by: loggedUser._id
      })
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

  async getOne (req, res) {
    try {
      const { id } = req.params
      const shortner = await ShortnerModel.findById(id)
      res.send({ shortner })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  async remove (req, res) {
    try {
      const { id } = req.params
      await ShortnerModel.findByIdAndDelete(id)
      res.send({ message: 'deleted' })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  async redirectTo (req, res) {
    try {
      const { hash } = req.params
      const shortner = await ShortnerModel.findOne({ hash })

      if (!shortner) {
        throw new Error('Hash Invalid')
      }

      shortner.hits++

      await shortner.save()

      res.redirect(shortner.url)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

module.exports = new Shortner()
