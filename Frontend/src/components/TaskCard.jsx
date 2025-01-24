import React from 'react';

export default function TaskCard({ task }) {
  // Determine priority color based on priority level
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

  return (
    <div className="bg-white border-2 border-black rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out">
      <div className={`${getPriorityClass(task.priority)} px-4 py-2 rounded-t-xl`}>
        <h3 className="text-xl font-bold tracking-tight">{task.title}</h3>
      </div>

      <div className="p-6">
        <p className="text-gray-800 mb-4 text-base leading-relaxed">{task.description}</p>

        <div className="space-y-3 border-t border-gray-200 pt-4">
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
