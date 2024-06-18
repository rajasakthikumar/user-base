const express = require("express");
const router = express.Router();
const ToDo = require('../DB/todo');
router.use(express.json());


router.use((req,res,next) => {
    console.log("ToDo Router middleware")
    next();
})

router.get('/', async (req,res) => {
    let toDo = await ToDo.find()
    res.json(toDo)}
)

router.post('/', async(req,res) => {
    console.log(req.body.todo)
    let todo = req.body.todo
    let description = (req.body.description)
    await ToDo.create({
        toDo: todo,
        description: description
    }).then(console.log('Todo added successfully'))
    res.status(200).send(req.body)
})


router.patch('/completed/:id', async (req, res) => {
   
    try {
      const todoId = req.params.id;
      const todo = await ToDo.findByIdAndUpdate(todoId, { completed: true }, { new: true });
    
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;