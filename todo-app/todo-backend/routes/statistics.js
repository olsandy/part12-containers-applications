const express = require('express')
const router = express.Router()

const configs = require('../util/config')
const redis = require('../redis')

/* GET index data. */
router.get('/', async (req, res) => {
  const count = await redis.getAsync('addedTodos')
  res.send({ addedTodos: count })
})

module.exports = router
