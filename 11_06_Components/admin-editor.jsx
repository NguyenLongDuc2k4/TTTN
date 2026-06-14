import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import puckConfig from '../admin-puck-config';

// Component bao bọc trình chỉnh sửa Puck
const AdminEditor = ({ initialData = {}, onPublish }) => {
  // Hàm xử lý mặc định khi ấn nút Publish nếu không được truyền từ props
  const handlePublish = async (data) => {
    if (onPublish) {
      await onPublish(data);
    } else {
      console.log('Dữ liệu đã được Publish:', data);
      alert('Dữ liệu đã được xuất ra Console. Nhấn F12 để xem chi tiết!');
    }
  };

  return (
    <div className="admin-puck-editor-wrapper">
      <Puck
        config={puckConfig}
        data={initialData}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default AdminEditor;
