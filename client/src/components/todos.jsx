import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import Navbar from "./Navbar";
import { AddNewTodo } from "./index";

const Todos = () => {

  const queryClient = useQueryClient();
  const [editingTodo, setEditingTodo] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { data: todos, isLoading, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axiosInstance.get('/todos');
      if (response.status !== 200) {
        throw new Error('Failed to fetch todos');
      }
      return response.data;
    },
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
    // refetchOnMount: true,
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const response = await axiosInstance.put(`/todos/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const response = await axiosInstance.post('/todos', newTodo);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todos"]);
      setIsAddModalOpen(false);
      setLocalError(null);
    }
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/todos/${id}`);
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data, deletedId) => {
      queryClient.setQueryData(["todos"], (oldData) => ({
        ...oldData,
        data: oldData.data.filter(todo => todo._id !== deletedId)
      }));
      queryClient.invalidateQueries(["todos"]);
    }
  });

  const handleCompletedChange = (id, completed) => {
    updateTodoMutation.mutate({ id, completed: !completed });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    
    updateTodoMutation.mutate({ 
      id: editingTodo._id, 
      title, 
      description 
    });
    
    setEditingTodo(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    
    addTodoMutation.mutate({ title, description });
  };

  const handleDelete = (id) => {
      deleteTodoMutation.mutate(id);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  
  if (localError) { 
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="alert alert-error w-1/4 mb-4">
          {localError}
        </div>
      </div>
    )
  }

  const allTodos = todos?.data || [];

  return (
    <div>
      <div> <Navbar/>  </div>     
      <div className="flex items-center mt-8 justify-center flex-col p-4 min-h-[80vh]">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
        {allTodos.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">You don't have any todos yet.</p>
            {/* <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(true)}>Add Your First Todo</button> */}
          </div>
        ) : (
          <div className="space-y-4">
            {allTodos.map((todo) => {
              const { _id: id, title, description, completed } = todo;
              return (
                <div key={id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={completed}
                        onChange={() => handleCompletedChange(id, completed)}
                      />
                      <div className={`flex-1 ${completed ? 'line-through text-gray-500' : ''}`}>
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                      </div>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditingTodo(todo)}>Edit</button>
                      <button className="btn btn-ghost btn-sm text-red-500" onClick={() => handleDelete(id)}>Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        <input type="checkbox" id="edit-modal" className="modal-toggle" checked={!!editingTodo} onChange={() => setEditingTodo(null)} />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Todo</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" name="title" placeholder="Title" className="input input-bordered" defaultValue={editingTodo?.title} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea name="description" className="textarea textarea-bordered" placeholder="Description" defaultValue={editingTodo?.description}></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setEditingTodo(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Add Todo Button */}
        <button className="btn btn-secondary mt-4 w-[20%]" onClick={() => setIsAddModalOpen(true)}>Add a Todo</button>

        {/* Add NEW TODO Container */}
        <input type="checkbox" id="add-modal" className="modal-toggle" checked={isAddModalOpen} onChange={() => setIsAddModalOpen(false)} />
        <AddNewTodo handleAddSubmit={handleAddSubmit} setIsAddModalOpen={setIsAddModalOpen} />
      </div>
    </div>
  );
};

export default Todos;