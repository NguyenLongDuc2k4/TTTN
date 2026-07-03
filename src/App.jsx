import React, { useState } from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "./admin-puck-config";

// ─────────────────────────────────────────────────────────────────────────────
// Đưa vùng kéo thả của tất cả các trang về trắng tinh mặc định ban đầu
// ─────────────────────────────────────────────────────────────────────────────

const PAGES = [
  { key: "home",    label: "🏠 Trang chủ" },
  { key: "product", label: "🛍️ Sản phẩm"  },
  { key: "contact", label: "📬 Liên hệ"   },
];

const INITIAL_DATA = {
  home: {
    root: {},
    content: [], // Trắng tinh
  },
  product: {
    root: {},
    content: [], // Trắng tinh
  },
  contact: {
    root: {},
    content: [], // Trắng tinh
  },
};

const LS_KEY = (key) => `metik_page_${key}`;

function loadPage(key) {
  try {
    const raw = localStorage.getItem(LS_KEY(key));
    return raw ? JSON.parse(raw) : INITIAL_DATA[key];
  } catch {
    return INITIAL_DATA[key];
  }
}

function savePage(key, data) {
  try {
    localStorage.setItem(LS_KEY(key), JSON.stringify(data));
  } catch (e) {
    console.warn("localStorage full:", e);
  }
}

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [pageData, setPageData]     = useState(() => loadPage("home"));

  function handlePageChange(newKey) {
    setActivePage(newKey);
    setPageData(loadPage(newKey));
  }

  function onPublish(data) {
    savePage(activePage, data);
    setPageData(data);
    alert(
      `✅ Đã lưu trang "${PAGES.find((p) => p.key === activePage)?.label}"!\n` +
      "Dữ liệu được lưu trong localStorage. Xem Console (F12) để copy JSON."
    );
    console.log(
      `%c[Metik] Trang: ${activePage}`,
      "color:#f4851a;font-weight:bold"
    );
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Selector Bar */}
      <div
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             "8px",
          padding:         "8px 16px",
          background:      "var(--color-secondary, #48a842)",
          borderBottom:    "1px solid rgba(255,255,255,0.15)",
          flexShrink:      0,
          zIndex:          9999,
        }}
      >
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, marginRight: 4 }}>
          📄 Trang đang chỉnh:
        </span>

        {PAGES.map((page) => (
          <button
            key={page.key}
            onClick={() => handlePageChange(page.key)}
            style={{
              padding:      "5px 14px",
              borderRadius: "20px",
              border:       "1px solid rgba(255,255,255,0.35)",
              background:   activePage === page.key ? "#fff" : "transparent",
              color:        activePage === page.key ? "var(--color-secondary, #48a842)" : "#fff",
              fontWeight:   activePage === page.key ? 700 : 400,
              fontSize:     "13px",
              cursor:       "pointer",
              transition:   "all 0.2s",
            }}
          >
            {page.label}
          </button>
        ))}

        <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>
          Nhấn <strong style={{ color: "#fff" }}>Publish</strong> để lưu trang
        </span>
      </div>

      {/* Puck Editor */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Puck
          key={activePage}
          config={config}
          data={pageData}
          onPublish={onPublish}
        />
      </div>
    </div>
  );
}
