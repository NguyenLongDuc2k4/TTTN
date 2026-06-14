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
        contentBlock: {
          type: 'object', label: 'Cụm nội dung (Sen Hồng)',
          objectFields: {
            borderRadius: { type: 'text', label: 'Bo góc (VD: 16px 80px 16px 80px)', default: '16px 80px 16px 80px' },
            textColor: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
            titleSize: { type: 'text', label: 'Cỡ chữ Tiêu đề', default: '2.25rem' },
            subtitleSize: { type: 'text', label: 'Cỡ chữ Phụ đề', default: '1.125rem' }
          }
        },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            bgColor: { type: 'text', label: 'Màu nền nút', default: '#2563eb' },
            textColor: { type: 'text', label: 'Màu chữ nút', default: '#ffffff' },
            borderRadius: { type: 'text', label: 'Bo góc nút', default: '8px' }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại nền',
              options: [
                { label: 'Màu nền (trắng, đen...)', value: 'color' },
                { label: 'Hình ảnh/GIF (JPG, PNG, GIF)', value: 'image' },
                { label: 'Gradient', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            imageUrl: { type: 'text', label: 'URL ảnh/GIF nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to bottom right' }
          }
        },
        layout: {
          type: 'object', label: 'Vị trí Cụm nội dung',
          objectFields: {
            alignment: {
              type: 'select', label: 'Vị trí nguyên cụm',
              options: [
                { label: 'Bên trái', value: 'left' },
                { label: 'Nằm giữa', value: 'center' },
                { label: 'Bên phải', value: 'right' }
              ]
            },
            align: {
              type: 'select', label: 'Căn lề chữ bên trong',
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
        title: 'Sen Hồng',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        contentBlock: {
          borderRadius: '16px 80px 16px 80px',
          textColor: '#ffffff',
          titleSize: '4rem',
          subtitleSize: '1rem'
        },
        buttons: [
          { text: 'Tham gia cộng đồng', url: '#', bgColor: '#3b82f6', textColor: '#ffffff', borderRadius: '9999px' }
        ],
        background: {
          type: 'color',
          color: '#e5e7eb',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right',
          imageUrl: ''
        },
        layout: { alignment: 'left', align: 'left' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Department: {
      label: 'Phòng ban / Lưới thẻ',
      fields: {
        title: { type: 'text', label: 'Tiêu đề lớn', contentEditable: true },
        subtitle: { type: 'text', label: 'Phụ đề', contentEditable: true },
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
            name: { type: 'text', label: 'Tên hiển thị', contentEditable: true },
            link: { type: 'text', label: 'Đường dẫn khi click' },
            cardBorderRadius: { type: 'text', label: 'Bo góc Thẻ (vd: 64px 8px)', default: '64px 8px 64px 8px' },
            cardBgGradientFrom: { type: 'text', label: 'Màu nền thẻ (trên)', default: '#3b82f6' },
            cardBgGradientTo: { type: 'text', label: 'Màu nền thẻ (dưới)', default: '#1e3a8a' },
            buttonText: { type: 'text', label: 'Chữ trên nút' },
            buttonBorderRadius: { type: 'text', label: 'Bo góc Nút', default: '9999px' },
            buttonBgColor: { type: 'text', label: 'Màu nền nút', default: 'rgba(255,255,255,0.15)' },
            buttonTextColor: { type: 'text', label: 'Màu chữ nút', default: '#ffffff' }
          },
          getItemSummary: (item) => item.name || 'Thẻ phòng ban'
        }
      },
      defaultProps: {
        title: 'CÁC BAN CHUYÊN MÔN',
        subtitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        background: { type: 'gradient', color: '#f3f4f6', gradientFrom: '#fdf4ff', gradientTo: '#e0e7ff', gradientDirection: 'to bottom right' },
        cards: [
          { name: 'Ban Kinh tế - Đầu tư', link: '#', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', buttonText: 'Xem hoạt động ->', cardBorderRadius: '64px 8px 64px 8px', cardBgGradientFrom: '#3b82f6', cardBgGradientTo: '#1e3a8a', buttonBorderRadius: '9999px', buttonBgColor: 'rgba(255,255,255,0.15)', buttonTextColor: '#ffffff' },
          { name: 'Ban Văn hóa - Thể thao', link: '#', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', buttonText: 'Xem hoạt động ->', cardBorderRadius: '64px 8px 64px 8px', cardBgGradientFrom: '#3b82f6', cardBgGradientTo: '#1e3a8a', buttonBorderRadius: '9999px', buttonBgColor: 'rgba(255,255,255,0.15)', buttonTextColor: '#ffffff' },
          { name: 'Ban Xã hội - Cộng đồng', link: '#', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', buttonText: 'Xem hoạt động ->', cardBorderRadius: '64px 8px 64px 8px', cardBgGradientFrom: '#3b82f6', cardBgGradientTo: '#1e3a8a', buttonBorderRadius: '9999px', buttonBgColor: 'rgba(255,255,255,0.15)', buttonTextColor: '#ffffff' },
          { name: 'Ban Khởi nghiệp', link: '#', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', buttonText: 'Xem hoạt động ->', cardBorderRadius: '64px 8px 64px 8px', cardBgGradientFrom: '#3b82f6', cardBgGradientTo: '#1e3a8a', buttonBorderRadius: '9999px', buttonBgColor: 'rgba(255,255,255,0.15)', buttonTextColor: '#ffffff' },
          { name: 'Ban Giao thương quốc tế', link: '#', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', buttonText: 'Xem hoạt động ->', cardBorderRadius: '64px 8px 64px 8px', cardBgGradientFrom: '#3b82f6', cardBgGradientTo: '#1e3a8a', buttonBorderRadius: '9999px', buttonBgColor: 'rgba(255,255,255,0.15)', buttonTextColor: '#ffffff' }
        ]
      },
      render: (props) => <AdminDepartment {...props} />
    },

    Grid: {
      label: 'Lưới (Grid)',
      fields: {
        columns: {
          type: 'select', label: 'Số lượng cột',
          options: [
            { label: '1 Cột (Chiếm toàn dòng)', value: 1 },
            { label: '2 Cột (Chia đôi)', value: 2 },
            { label: '3 Cột (Chia ba)', value: 3 },
            { label: '4 Cột (Chia bốn)', value: 4 }
          ]
        }
      },
      defaultProps: { columns: 2 },
      render: (props) => <AdminGrid {...props} />
    },

    Profile: {
      label: 'Khối Thông tin & Tổ chức',
      fields: {
        background: {
          type: 'object', label: 'Nền khu vực',
          objectFields: {
            type: { type: 'select', label: 'Kiểu nền', options: [{ label: 'Không nền', value: 'transparent' }, { label: 'Màu đơn sắc', value: 'color' }, { label: 'Gradient', value: 'gradient' }, { label: 'Hình ảnh', value: 'image' }] },
            color: { type: 'text', label: 'Màu nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#fdf4ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#e0e7ff' },
            gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'Đường dẫn ảnh nền' }
          }
        },
        cards: {
          type: 'array', label: 'Danh sách Cục (Thẻ)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề thẻ', contentEditable: true },
            type: { 
              type: 'select', label: 'Loại nội dung', 
              options: [
                { label: 'Văn bản & Ảnh (Giới thiệu)', value: 'about' },
                { label: 'Danh sách Nhân sự', value: 'profiles' }
              ] 
            },
            description: { type: 'textarea', label: 'Đoạn văn bản (Loại Giới thiệu)' },
            bottomImage: { type: 'text', label: 'Ảnh góc dưới (Loại Giới thiệu)' },
            
            p1_avatar: { type: 'text', label: 'Ảnh NV 1' },
            p1_name: { type: 'text', label: 'Họ tên NV 1' },
            p1_clubRole: { type: 'text', label: 'Chức vụ CLB 1' },
            p1_entRole: { type: 'text', label: 'Chức vụ DN 1' },
            p1_entName: { type: 'text', label: 'Doanh nghiệp 1' },
            
            p2_avatar: { type: 'text', label: 'Ảnh NV 2' },
            p2_name: { type: 'text', label: 'Họ tên NV 2' },
            p2_clubRole: { type: 'text', label: 'Chức vụ CLB 2' },
            p2_entRole: { type: 'text', label: 'Chức vụ DN 2' },
            p2_entName: { type: 'text', label: 'Doanh nghiệp 2' },

            p3_avatar: { type: 'text', label: 'Ảnh NV 3' },
            p3_name: { type: 'text', label: 'Họ tên NV 3' },
            p3_clubRole: { type: 'text', label: 'Chức vụ CLB 3' },
            p3_entRole: { type: 'text', label: 'Chức vụ DN 3' },
            p3_entName: { type: 'text', label: 'Doanh nghiệp 3' },

            p4_avatar: { type: 'text', label: 'Ảnh NV 4' },
            p4_name: { type: 'text', label: 'Họ tên NV 4' },
            p4_clubRole: { type: 'text', label: 'Chức vụ CLB 4' },
            p4_entRole: { type: 'text', label: 'Chức vụ DN 4' },
            p4_entName: { type: 'text', label: 'Doanh nghiệp 4' },

            p5_avatar: { type: 'text', label: 'Ảnh NV 5' },
            p5_name: { type: 'text', label: 'Họ tên NV 5' },
            p5_clubRole: { type: 'text', label: 'Chức vụ CLB 5' },
            p5_entRole: { type: 'text', label: 'Chức vụ DN 5' },
            p5_entName: { type: 'text', label: 'Doanh nghiệp 5' },
          },
          getItemSummary: (item) => item.title || 'Thẻ'
        }
      },
      defaultProps: {
        background: { type: 'gradient', gradientFrom: '#fdf4ff', gradientTo: '#e0e7ff', gradientDirection: 'to bottom right' },
        cards: [
          {
            title: 'VỀ CÂU LẠC BỘ',
            type: 'about',
            description: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
            bottomImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png'
          },
          {
            title: 'CƠ CẤU TỔ CHỨC',
            type: 'profiles',
            p1_avatar: 'https://via.placeholder.com/64', p1_name: 'Trần Văn Khang', p1_clubRole: 'Ủy viên BCH', p1_entRole: 'Tổng Giám đốc', p1_entName: 'Công ty CP Logistics Đồng Tháp',
            p2_avatar: 'https://via.placeholder.com/64', p2_name: 'Đỗ Thu Trang', p2_clubRole: 'Thủ quỹ CLB', p2_entRole: 'Giám đốc Tài chính', p2_entName: 'Công ty TNHH Sen Việt',
            p3_avatar: 'https://via.placeholder.com/64', p3_name: 'Vũ Hoàng Long', p3_clubRole: 'Ủy viên BCH', p3_entRole: 'Giám đốc Điều hành', p3_entName: 'Công ty Công nghệ số Mekong',
            p4_name: '', p5_name: ''
          }
        ]
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
