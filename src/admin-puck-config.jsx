import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminDepartment from './components/admin-department';
import AdminGrid from './components/admin-grid';
import AdminProfile from './components/admin-profile';

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            alignment: {
              type: 'select', label: 'Vị trí khối kính',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            },
            align: {
              type: 'select', label: 'Căn lề chữ',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        background: {
          type: 'gradient',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right'
        },
        layout: { alignment: 'center', align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Department: {
      label: 'Phòng ban / Lưới thẻ',
      fields: {
        background: {
          type: 'object', label: 'Nền khu vực',
          objectFields: {
            type: {
              type: 'select', label: 'Kiểu nền',
              options: [
                { label: 'Không nền (Trong suốt)', value: 'transparent' },
                { label: 'Màu đơn sắc', value: 'color' },
                { label: 'Màu Gradient', value: 'gradient' },
                { label: 'Hình ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền (Hex/RGB)' },
            gradientFrom: { type: 'text', label: 'Màu bắt đầu' },
            gradientTo: { type: 'text', label: 'Màu kết thúc' },
            gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'Đường dẫn ảnh' }
          }
        },
        cards: {
          type: 'array', label: 'Danh sách thẻ',
          arrayFields: {
            icon: { type: 'text', label: 'Đường dẫn (URL) Icon' },
            name: { type: 'text', label: 'Tên hiển thị' },
            link: { type: 'text', label: 'Đường dẫn khi click' },
            buttonText: { type: 'text', label: 'Chữ trên nút' },
            buttonRadius: { 
              type: 'select', label: 'Bo góc nút',
              options: [
                { label: 'Không bo (Vuông)', value: 'none' },
                { label: 'Bo nhẹ (sm)', value: 'sm' },
                { label: 'Bo vừa (md)', value: 'md' },
                { label: 'Bo nhiều (lg)', value: 'lg' },
                { label: 'Bo tròn (full)', value: 'full' }
              ]
            }
          },
          getItemSummary: (item) => item.name || 'Thẻ'
        }
      },
      defaultProps: {
        background: { type: 'transparent', color: '#f3f4f6', gradientFrom: '#e0e7ff', gradientTo: '#f3e8ff', gradientDirection: 'to right' },
        cards: [
          { name: 'Phòng Kỹ thuật', link: '#', icon: 'https://via.placeholder.com/64', buttonText: 'Xem chi tiết', buttonRadius: 'full' }
        ]
      },
      render: (props) => <AdminDepartment {...props} />
    },

    Grid: {
      label: 'Lưới (Grid)',
      fields: {
        columns: {
          type: 'number', label: 'Số cột (1-4)', min: 1, max: 4, default: 2
        }
      },
      defaultProps: { columns: 2 },
      render: (props) => <AdminGrid {...props} />
    },

    Profile: {
      label: 'Hồ sơ thành viên',
      fields: {
        avatar: { type: 'text', label: 'URL Avatar' },
        name: { type: 'text', label: 'Tên' },
        role: { type: 'text', label: 'Vai trò' },
        isPresident: { 
          type: 'radio', 
          label: 'Nổi bật / Chủ tịch', 
          options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] 
        }
      },
      defaultProps: {
        avatar: 'https://via.placeholder.com/150',
        name: 'Nguyễn Văn A',
        role: 'Thành viên',
        isPresident: false
      },
      render: (props) => <AdminProfile {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image', 'Profile'] },
    { title: 'Layout', components: ['Section', 'Grid', 'Department'] },
    { title: 'Nâng cao', components: ['Hero'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
