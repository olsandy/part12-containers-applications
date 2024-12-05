const express = require('express')
const ObjectId = require('mongoose').Types.ObjectId
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis')
const router = express.Router()

// ;(async () => {
//   const todoCount = await Todo.countDocuments()
//   await setAsync('addedTodos', todoCount)
//   console.log('todos reset to', todoCount)
// })()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  await setAsync('addedTodos', Number(await getAsync('addedTodos')) + 1)
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  if (ObjectId.isValid(id)) {
    req.todo = await Todo.findById(id)
    if (!req.todo) return res.sendStatus(404)
  } else {
    return res.sendStatus(404)
  }

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await setAsync('addedTodos', Number(await getAsync('addedTodos')) - 1)
  const deleted = await req.todo.delete()
  console.log('deleted:', deleted)
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.updateOne(
    { _id: req.todo.id },
    {
      text: req.body.text,
      done: req.body.done || false,
    }
  )
  res.sendStatus(200) // Implement this
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
