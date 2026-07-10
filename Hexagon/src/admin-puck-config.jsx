import React from 'react';
import { BACKGROUND_TYPES, GRADIENT_DIRECTIONS } from './constants/puck-constants';
import HexagonHeader from './components/HexagonHeader';
import FlexSection from './components/FlexSection';
import AboutSection from './components/AboutSection';
import ServicesGrid from './components/ServicesGrid';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';

export function createConfig(onLangChange) {
  return {
    categories: {
      'Khối Header/Menu': {
        components: ['HexagonHeader']
      },
      'Khối Nội dung/Giới thiệu': {
        components: ['FlexSection', 'AboutSection']
      },
      'Khối Tính năng/Dịch vụ': {
        components: ['ServicesGrid']
      },
      'Khối Tin tức/Sự kiện': {
        components: ['NewsSection']
      },
      'Khối Biểu mẫu/Liên hệ': {
        components: ['ContactSection']
      }
    },
    components: {
      HexagonHeader: {
        fields: {
          title: { type: 'text' },
          logo: { type: 'text' },
          lang: {
            type: 'select',
            options: [
              { label: 'Tiếng Việt', value: 'vi' },
              { label: 'English', value: 'en' }
            ]
          },
          links: {
            type: 'array',
            arrayFields: {
              label: { type: 'text' },
              url: { type: 'text' }
            }
          }
        },
        defaultProps: {
          title: 'HEXAGON',
          logo: 'https://beta.hexagon.xyz/assets/images/logo-hhc.png',
          lang: 'vi',
          links: [
            { label: 'Trang chủ', url: '#trang-chu' },
            { label: 'Giới thiệu', url: '#gioi-thieu' },
            { label: 'Dịch vụ', url: '#dich-vu' },
            { label: 'Hỗ trợ', url: 'https://support.hexagon.xyz/' },
            { label: 'Liên hệ', url: '#lien-he' }
          ]
        },
        render: ({ title, logo, lang, links }) => (
          <HexagonHeader
            title={title}
            logo={logo}
            lang={lang}
            links={links}
            onLangChange={onLangChange}
          />
        )
      },
      FlexSection: {
        fields: {
          title: { type: 'text' },
          content: { type: 'textarea' },
          animate: { type: 'radio', options: [{ label: 'Bật', value: true }, { label: 'Tắt', value: false }] },
          background: { type: 'select', options: BACKGROUND_TYPES },
          gradientDirection: { type: 'select', options: GRADIENT_DIRECTIONS },
          imageUrl: { type: 'text' },
          buttons: {
            type: 'array',
            arrayFields: {
              label: { type: 'text' },
              url: { type: 'text' },
              bgColor: { type: 'text' },
              textColor: { type: 'text' }
            }
          }
        },
        defaultProps: {
          title: 'HEXAGON Solutions',
          content: 'Hexagon kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm, AI đến an ninh mạng, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
          animate: true,
          background: 'gradient',
          gradientDirection: 'to bottom right',
          imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp',
          buttons: [
            { label: 'Khám phá Dịch vụ', url: '#dich-vu', bgColor: 'linear-gradient(to right,#ff9902,#f2d337)', textColor: '#ffffff' },
            { label: 'Liên hệ Tư vấn', url: '#lien-he', bgColor: 'rgba(255,255,255,0.1)', textColor: '#ffffff' }
          ]
        },
        render: ({ title, content, animate, background, gradientDirection, imageUrl, buttons }) => (
          <FlexSection title={title} content={content} animate={animate} background={background} gradientDirection={gradientDirection} imageUrl={imageUrl} buttons={buttons} />
        )
      },
      AboutSection: {
        fields: {
          title: { type: 'text' },
          description: { type: 'textarea' },
          quote: { type: 'textarea' },
          quoteAuthor: { type: 'text' },
          imageUrl: { type: 'text' },
          cards: {
            type: 'array',
            arrayFields: {
              title: { type: 'text' },
              description: { type: 'textarea' }
            }
          }
        },
        defaultProps: {
          title: 'Về Hexagon',
          description: 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
          quote: 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^',
          quoteAuthor: 'HEXAGON CULTURE',
          imageUrl: 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
          cards: [
            { title: 'Sứ mệnh', description: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.' },
            { title: 'Tầm nhìn', description: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.' },
            { title: 'Giá trị cốt lõi', description: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.' },
            { title: 'Nền tảng', description: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.' }
          ]
        },
        render: ({ title, description, quote, quoteAuthor, imageUrl, cards }) => (
          <AboutSection title={title} description={description} quote={quote} quoteAuthor={quoteAuthor} imageUrl={imageUrl} cards={cards} />
        )
      },
      ServicesGrid: {
        fields: {
          title: { type: 'text' },
          subtitle: { type: 'textarea' },
          items: {
            type: 'array',
            arrayFields: {
              title: { type: 'text' },
              imageUrl: { type: 'text' }
            }
          }
        },
        defaultProps: {
          title: 'Lĩnh vực hoạt động',
          subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
          items: [
            { title: 'Giải pháp công nghệ', imageUrl: 'https://placehold.co/400x400/transparent/FFF?text=Technology' },
            { title: 'Giải pháp thi công & lắp đặt', imageUrl: 'https://placehold.co/400x400/transparent/FFF?text=Construction' },
            { title: 'Cung cấp thiết bị CNTT', imageUrl: 'https://placehold.co/400x400/transparent/FFF?text=IT+Devices' },
            { title: 'Dịch vụ Công nghệ thông tin', imageUrl: 'https://placehold.co/400x400/transparent/FFF?text=IT+Services' }
          ]
        },
        render: ({ title, subtitle, items }) => (
          <ServicesGrid title={title} subtitle={subtitle} items={items} />
        )
      },
      NewsSection: {
        fields: {
          title: { type: 'text' },
          subtitle: { type: 'textarea' },
          buttonText: { type: 'text' },
          buttonLink: { type: 'text' },
          items: {
            type: 'array',
            arrayFields: {
              title: { type: 'text' },
              excerpt: { type: 'textarea' },
              date: { type: 'text' },
              imageUrl: { type: 'text' },
              link: { type: 'text' }
            }
          }
        },
        defaultProps: {
          title: 'Tin tức',
          subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
          buttonText: 'Xem tất cả bài viết >',
          buttonLink: '#',
          items: [
            { title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25', excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25...', date: '26 thg 6, 2026', imageUrl: 'https://placehold.co/600x400/1A6B49/FFF?text=Tin+1', link: '#' },
            { title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa CNTT...', date: '26 thg 6, 2026', imageUrl: 'https://placehold.co/600x400/1A6B49/FFF?text=Tin+2', link: '#' },
            { title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai...', date: '26 thg 6, 2026', imageUrl: 'https://placehold.co/600x400/1A6B49/FFF?text=Tin+3', link: '#' }
          ]
        },
        render: ({ title, subtitle, items, buttonText, buttonLink }) => (
          <NewsSection title={title} subtitle={subtitle} items={items} buttonText={buttonText} buttonLink={buttonLink} />
        )
      },
      ContactSection: {
        fields: {
          title: { type: 'text' },
          subtitle: { type: 'textarea' },
          address: { type: 'text' },
          email: { type: 'text' },
          phone: { type: 'text' },
          mapUrl: { type: 'text' },
          socials: {
            type: 'array',
            arrayFields: {
              label: { type: 'text' },
              url: { type: 'text' }
            }
          }
        },
        defaultProps: {
          title: 'Liên hệ với chúng tôi',
          subtitle: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
          address: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
          email: 'info@hexagon.xyz',
          phone: '096 446 0333',
          mapUrl: 'https://maps.google.com/maps?width=600&height=400&hl=en&q=615%20%C3%82u%20C%C6%A1&t=p&z=14&ie=UTF8&iwloc=B&output=embed',
          socials: [
            { label: 'Facebook', url: '#' },
            { label: 'LinkedIn', url: '#' },
            { label: 'YouTube', url: '#' },
            { label: 'Zalo', url: '#' }
          ]
        },
        render: ({ title, subtitle, address, email, phone, socials, mapUrl }) => (
          <ContactSection title={title} subtitle={subtitle} address={address} email={email} phone={phone} socials={socials} mapUrl={mapUrl} />
        )
      }
    }
  };
}
