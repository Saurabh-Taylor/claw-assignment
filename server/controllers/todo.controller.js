import Todo from '../models/todo.model.js';


// Get all todos for the logged-in user
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    if(todos.length<1){
      return res.status(404).json({ 
        message: "you Havent got any todos , Create One" 
      });
    }
    return res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description
    });

    res.status(201).json({
      success: true,
      data: todo
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate({ _id: id },{title , description , completed});

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to update it"
      });
    }

    return res.status(200).json({
      success: true,
      message:"Todo Updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to delete it"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};