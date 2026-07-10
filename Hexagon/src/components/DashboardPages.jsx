import React from 'react';

const DashboardPages = ({ pages, onEdit, onCreate, onClone, onDelete }) => {
  const viPages = pages.filter(p => p.lang === 'vi');
  const enPages = pages.filter(p => p.lang === 'en');
  const totalPages = pages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A6B49] to-[#2a9d6e] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quản lý Trang</h1>
                  <p className="text-gray-500 text-sm mt-0.5">Hexagon CMS — Dashboard Pages</p>
                </div>
              </div>
            </div>
            <button
              onClick={onCreate}
              className="bg-[#1A6B49] hover:bg-[#15583c] text-white px-5 py-2.5 rounded-xl shadow-sm font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Tạo Page Mới
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalPages}</p>
              <p className="text-gray-500 text-sm">Tổng số trang</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <span className="text-lg">🇻🇳</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{viPages.length}</p>
              <p className="text-gray-500 text-sm">Trang Tiếng Việt</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <span className="text-lg">🇬🇧</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{enPages.length}</p>
              <p className="text-gray-500 text-sm">Trang English</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-semibold">Tiêu đề</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Ngôn ngữ</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold">Cập nhật</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-700">Chưa có trang nào</p>
                      <p className="text-sm text-gray-500 mt-1">Bấm "Tạo Page Mới" để bắt đầu thiết kế.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pages.map((page) => {
                  const hasEnTranslation = pages.some(p => p.slug === `${page.slug}-en` && p.lang === 'en');
                  const isDraft = page.status === 'draft';

                  return (
                    <tr key={page.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{page.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono">/{page.slug}</code>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          page.lang === 'vi'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {page.lang === 'vi' ? '🇻🇳' : '🇬🇧'} {page.lang.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isDraft ? (
                          <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
                            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                            Bản nháp
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            Đã xuất bản
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {page.updatedAt ? new Date(page.updatedAt).toLocaleString('vi-VN') : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {page.lang === 'vi' && !hasEnTranslation && (
                            <button
                              onClick={() => onClone(page)}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                              title="Nhân bản nội dung sang Tiếng Anh"
                            >
                              + Bản dịch EN
                            </button>
                          )}
                          <button
                            onClick={() => onEdit(page)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => onDelete(page.id)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
