import Todo from "../models/todo.model.js";


export const createTodo = async (req, res) => {
    try {
      const { title } = req.body;
      const todo = new Todo({
        user: req.user._id,
        title,
      });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const updateTodo =  async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
