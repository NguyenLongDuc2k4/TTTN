import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useSelector } from 'react-redux';
import { RefreshCw, AlertTriangle } from 'lucide-react';

const UserManage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (userId === currentUser.id) {
      alert('Cảnh báo: Bạn không thể tự thay đổi vai trò của chính mình!');
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn thay đổi vai trò của thành viên này thành "${newRole}" không?`)) {
      try {
        await API.put(`/users/${userId}/role`, { role: newRole });
        alert('Cập nhật vai trò thành công!');
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Có lỗi xảy ra, có thể bạn không có quyền thực hiện hành động này.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Thẻ Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-sm text-slate-400 font-bold uppercase tracking-wider">Quản lý thành viên & Phân quyền</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/30">
          <AlertTriangle size={14} /> Chỉ SuperAdmin và Admin mới có quyền đổi vai trò
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang tìm danh sách thành viên...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Không có tài khoản nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-750 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Họ và tên</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Ngày tham gia</th>
                  <th className="py-4 px-6">Vai trò hiện tại</th>
                  <th className="py-4 px-6 text-center">Thay đổi quyền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                {users.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">{item.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-850 dark:text-white flex items-center gap-1.5">
                      {item.name}
                      {item.id === currentUser.id && (
                        <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded font-black uppercase">Bạn</span>
                      )}
                    </td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.role === 'SuperAdmin' ? 'bg-red-500/10 text-red-500' :
                        item.role === 'Admin' ? 'bg-amber-500/10 text-amber-500' :
                        item.role === 'Editor' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-350'
                      }`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={item.role}
                        disabled={item.id === currentUser.id}
                        onChange={(e) => handleRoleChange(item.id, e.target.value)}
                        className="mx-auto block text-xs font-semibold px-2 py-1 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300"
                      >
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManage;
