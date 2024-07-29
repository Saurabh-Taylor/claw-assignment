import React from 'react'

const AddNewTodo = ({setIsAddModalOpen , handleAddSubmit }) => {
  return (
    <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Todo</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea name="description" className="textarea textarea-bordered" placeholder="Description" required></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddNewTodo