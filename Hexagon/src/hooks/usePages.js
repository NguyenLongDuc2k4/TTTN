import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hexagon_pages';

const defaultPages = [
  {
    id: 'page-default-home',
    title: 'Trang chủ',
    slug: 'home',
    lang: 'vi',
    status: 'published',
    updatedAt: Date.now(),
    puckData: {
      content: [],
      root: {}
    }
  }
];

function loadPages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Không thể đọc dữ liệu từ localStorage:', e);
  }
  return defaultPages;
}

function savePages(pages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    console.warn('Không thể lưu dữ liệu vào localStorage:', e);
  }
}

const generateId = () => `page-${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;

export function usePages() {
  const [pages, setPages] = useState(() => loadPages());
  const [currentPage, setCurrentPage] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'editor'

  // Persist to localStorage whenever pages change
  useEffect(() => {
    savePages(pages);
  }, [pages]);

  // --- Validation helpers ---

  const isSlugTaken = useCallback((slug, excludeId = null) => {
    return pages.some(p => p.slug === slug && p.id !== excludeId);
  }, [pages]);

  const validatePage = useCallback((title, slug, excludeId = null) => {
    const errors = [];
    if (!title || title.trim() === '') {
      errors.push('Tiêu đề không được để trống.');
    }
    if (!slug || slug.trim() === '') {
      errors.push('Slug không được để trống.');
    } else if (isSlugTaken(slug, excludeId)) {
      errors.push(`Slug "/${slug}" đã tồn tại. Vui lòng chọn slug khác.`);
    }
    return errors;
  }, [isSlugTaken]);

  // --- CRUD operations ---

  const createPage = useCallback((title, slug, lang = 'vi') => {
    const errors = validatePage(title, slug);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const newPage = {
      id: generateId(),
      title: title.trim(),
      slug: slug.trim(),
      lang,
      status: 'draft',
      updatedAt: Date.now(),
      puckData: { content: [], root: {} }
    };

    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage);
    setView('editor');

    return { success: true, page: newPage };
  }, [validatePage]);

  const editPage = useCallback((page) => {
    setCurrentPage(page);
    setView('editor');
  }, []);

  const publishPage = useCallback((puckData) => {
    if (!currentPage) return { success: false, errors: ['Không có trang nào đang chỉnh sửa.'] };

    const updatedPage = {
      ...currentPage,
      puckData,
      status: 'published',
      updatedAt: Date.now()
    };

    setPages(prev => {
      const exists = prev.some(p => p.id === updatedPage.id);
      if (exists) {
        return prev.map(p => p.id === updatedPage.id ? updatedPage : p);
      }
      return [...prev, updatedPage];
    });

    setView('dashboard');
    setCurrentPage(null);

    return { success: true, page: updatedPage };
  }, [currentPage]);

  const deletePage = useCallback((id) => {
    setPages(prev => prev.filter(p => p.id !== id));
    return { success: true };
  }, []);

  const cloneToEn = useCallback((sourcePage) => {
    const enSlug = `${sourcePage.slug}-en`;

    // Check if EN version already exists
    if (isSlugTaken(enSlug)) {
      return { success: false, errors: [`Bản dịch EN với slug "/${enSlug}" đã tồn tại.`] };
    }

    const clonedData = JSON.parse(JSON.stringify(sourcePage.puckData));

    // Update lang fields inside puck content
    if (clonedData && clonedData.content) {
      clonedData.content = clonedData.content.map(item => {
        if (item.props && item.props.lang !== undefined) {
          return {
            ...item,
            props: { ...item.props, lang: 'en' }
          };
        }
        return item;
      });
    }

    const newPage = {
      id: generateId(),
      title: `${sourcePage.title} (EN)`,
      slug: enSlug,
      lang: 'en',
      status: 'draft',
      updatedAt: Date.now(),
      puckData: clonedData
    };

    setPages(prev => [...prev, newPage]);

    return { success: true, page: newPage };
  }, [isSlugTaken]);

  const goToDashboard = useCallback(() => {
    setView('dashboard');
    setCurrentPage(null);
  }, []);

  // Find the EN/VI counterpart of a page
  const findTranslation = useCallback((page, targetLang) => {
    if (page.lang === targetLang) return page;

    // If current is VI, look for slug-en
    if (page.lang === 'vi' && targetLang === 'en') {
      return pages.find(p => p.slug === `${page.slug}-en` && p.lang === 'en') || null;
    }
    // If current is EN, look for the base slug
    if (page.lang === 'en' && targetLang === 'vi') {
      const baseSlug = page.slug.replace(/-en$/, '');
      return pages.find(p => p.slug === baseSlug && p.lang === 'vi') || null;
    }
    return null;
  }, [pages]);

  return {
    pages,
    currentPage,
    view,
    createPage,
    editPage,
    publishPage,
    deletePage,
    cloneToEn,
    goToDashboard,
    validatePage,
    isSlugTaken,
    findTranslation
  };
}
