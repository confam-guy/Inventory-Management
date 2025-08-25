import React from 'react'

const ProjectCard = ({ logo, name, designer, amount }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
    <div className="flex items-center space-x-3">
      <img src={logo} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{designer}</p>
      </div>
    </div>
    <span className="font-bold text-gray-800">${amount}</span>
  </div>
);
export default ProjectCard;