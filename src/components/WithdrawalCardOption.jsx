import React from 'react'

const WithdrawalCardOption = ({ type, lastDigits, selected, logo }) => (
  <div
    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition duration-200
      ${selected ? 'bg-blue-100 border-2 border-blue-500 shadow-md' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
  >
    <div className="flex items-center space-x-3">
      {logo && <img src={logo} alt={type} className="h-6 w-auto" />}
      <div>
        <h4 className="font-semibold text-gray-800">{type}</h4>
        <p className="text-sm text-gray-500">**** **** **** {lastDigits}</p>
      </div>
    </div>
    {selected && (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )}
  </div>
);

export default WithdrawalCardOption;