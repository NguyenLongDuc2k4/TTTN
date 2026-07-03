import React from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
// Đảm bảo đường dẫn này trỏ đúng đến file admin-puck-config.jsx của bạn
import { config } from "./admin-puck-config";

// Dữ liệu ban đầu (lúc mới vào trang là trống trơn)
const initialData = {
  content: [],
  root: {},
};

export default function App() {
  const onPublish = (data) => {
    console.log("Dữ liệu trang web đã lưu:", JSON.stringify(data, null, 2));
    alert("Đã lưu dữ liệu! Hãy kiểm tra Console (F12) để xem kết quả.");
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={initialData}
        onPublish={onPublish}
      />
    </div>
  );
}