import React from 'react';

const AdminProfile = ({ name, role, avatar, isPresident = false }) => {
  return (
    <div className={`p-6 rounded-2xl flex flex-col items-center text-center transition-all ${isPresident ? 'bg-amber-50 border-2 border-amber-400 shadow-md' : 'bg-white border border-gray-200 shadow-sm'}`}>
      {avatar ? (
        <img 
          src={avatar} 
          alt={name} 
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border border-gray-100"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900">{name || 'Tên thành viên'}</h3>
      <p className={`text-sm mt-1 ${isPresident ? 'text-amber-700 font-semibold' : 'text-gray-500'}`}>
        {role || 'Vai trò'}
      </p>
    </div>
  );
};

export default AdminProfile;
