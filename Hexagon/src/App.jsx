import React, { useState, useCallback, useMemo } from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { createConfig } from './admin-puck-config';
import { usePages } from './hooks/usePages';
import DashboardPages from './components/DashboardPages';
import CreatePageModal from './components/CreatePageModal';
import Toast from './components/Toast';
import './index.css';

function App() {
  const {
    pages,
    currentPage,
    view,
    createPage,
    editPage,
    publishPage,
    deletePage,
    cloneToEn,
    goToDashboard,
    isSlugTaken,
    findTranslation
  } = usePages();

  // Toast state
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  // CreatePageModal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // --- Handlers ---

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCreatePage = useCallback((title, slug, lang) => {
    const result = createPage(title, slug, lang);
    if (result.success) {
      setIsCreateModalOpen(false);
      showToast(`Tạo trang "${title}" thành công! Đang mở trình chỉnh sửa...`, 'success');
    } else {
      // Errors are shown inside the modal
    }
  }, [createPage, showToast]);

  const handleEdit = useCallback((page) => {
    editPage(page);
  }, [editPage]);

  const handleClone = useCallback((page) => {
    const result = cloneToEn(page);
    if (result.success) {
      showToast(`Đã tạo bản dịch EN cho "${page.title}" thành công!`, 'success');
    } else {
      showToast(result.errors[0], 'error');
    }
  }, [cloneToEn, showToast]);

  const handleDelete = useCallback((id) => {
    const page = pages.find(p => p.id === id);
    if (window.confirm(`Bạn có chắc chắn muốn xóa trang "${page?.title}"?\nHành động này không thể hoàn tác.`)) {
      deletePage(id);
      showToast(`Đã xóa trang "${page?.title}".`, 'info');
    }
  }, [pages, deletePage, showToast]);

  const handlePublish = useCallback((data) => {
    const result = publishPage(data);
    if (result.success) {
      showToast(`Đã xuất bản trang "${result.page.title}" thành công!`, 'success');
    }
  }, [publishPage, showToast]);

  // Language switch: find the translation page and navigate to it
  const handleLangChange = useCallback((newLang) => {
    if (!currentPage) return;
    const translationPage = findTranslation(currentPage, newLang);
    if (translationPage && translationPage.id !== currentPage.id) {
      editPage(translationPage);
      showToast(`Đã chuyển sang phiên bản ${newLang === 'vi' ? 'Tiếng Việt' : 'English'}.`, 'info');
    } else if (!translationPage) {
      showToast(`Chưa có bản dịch ${newLang === 'vi' ? 'Tiếng Việt' : 'English'} cho trang này.`, 'warning');
    }
  }, [currentPage, findTranslation, editPage, showToast]);

  // Create Puck config with language switch callback
  const puckConfig = useMemo(() => createConfig(handleLangChange), [handleLangChange]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Toast notification */}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Create Page Modal */}
      <CreatePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePage}
        isSlugTaken={isSlugTaken}
      />

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <DashboardPages
          pages={pages}
          onCreate={handleOpenCreateModal}
          onEdit={handleEdit}
          onClone={handleClone}
          onDelete={handleDelete}
        />
      )}

      {/* Editor View */}
      {view === 'editor' && currentPage && (
        <div className="h-screen flex flex-col">
          <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm z-10">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                Chỉnh sửa: {currentPage.title}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  currentPage.lang === 'vi'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  {currentPage.lang === 'vi' ? '🇻🇳' : '🇬🇧'} {currentPage.lang.toUpperCase()}
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Slug: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/{currentPage.slug}</code>
                {currentPage.status === 'draft' && (
                  <span className="ml-2 text-amber-600 text-xs font-semibold">● Bản nháp</span>
                )}
              </p>
            </div>
            <button
              onClick={goToDashboard}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Trở về Dashboard
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Puck
              config={puckConfig}
              data={currentPage.puckData || { content: [], root: {} }}
              onPublish={handlePublish}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
