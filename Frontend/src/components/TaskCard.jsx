import React from 'react';
import PropTypes from 'prop-types';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../services/taskService';

export default function TaskCard({ task, onDelete }) {
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-black text-white';
      case 'medium':
        return 'bg-gray-800 text-white';
      case 'low':
        return 'bg-gray-300 text-black';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tasks/${task._id}/edit`);
  };

   const handleDelete = async () => {
     const confirmDelete = window.confirm('Are you sure you want to delete this task?');
     if (confirmDelete) {
       try {
         console.log('Delete button clicked for task:', task._id);
         await deleteTask(task._id);
         onDelete(task._id); // Call the onDelete prop to update the task list
       } catch (error) {
         alert(error.message);
       }
     }
   };

  return (
    <div className="bg-white border-2 border-black rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out flex flex-col min-h-[200px] relative">
      <div
        className={`${getPriorityClass(
          task.priority,
        )} px-4 py-2 rounded-t-xl flex justify-between items-center`}>
        <h3 className="text-xl font-bold tracking-tight">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-1 hover:bg-black/20 rounded-full transition-colors duration-200"
            aria-label="Edit task">
            <Pencil size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent accidental duplicate calls
              handleDelete();
            }}
            className="p-1 hover:bg-black/20 rounded-full transition-colors duration-200"
            aria-label="Delete task">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-800 mb-4 text-base leading-relaxed flex-grow">{task.description}</p>

        <div className="space-y-3 border-t border-gray-200 pt-4 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Due Date</span>
            <span className="text-sm font-semibold text-black">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Priority</span>
            <span
              className={`text-sm font-semibold px-2 py-1 rounded ${getPriorityClass(
                task.priority,
              )}`}>
              {task.priority}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span className="text-sm font-semibold text-black">{task.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
