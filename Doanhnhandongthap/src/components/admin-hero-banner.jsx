import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CSS được inject inline – hỗ trợ Responsive hoàn hảo
// ─────────────────────────────────────────────────────────────────────────────
const heroStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-anim-1 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.1s; opacity: 0; }
  .hero-anim-2 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.3s; opacity: 0; }
  .hero-anim-3 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.5s; opacity: 0; }
  .hero-anim-4 { animation: fadeSlideUp 0.8s ease forwards; animation-delay: 0.7s; opacity: 0; }

  .hero-card {
    background: rgba(255, 255, 255, 0.19);
    border-top-left-radius: 16px;
    border-top-right-radius: 60px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 60px;
    outline: 1px rgba(255, 255, 255, 0.32) solid;
    outline-offset: -1px;
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    padding: 32px 24px;
    width: 100%;
    max-width: 620px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    font-family: 'Be Vietnam Pro', sans-serif;
  }

  @media (min-width: 640px) {
    .hero-card {
      border-top-right-radius: 100px;
      border-bottom-left-radius: 100px;
      padding: 48px 40px;
      gap: 32px;
    }
  }

  .hero-cta-btn-demo {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    color: #ffffff;
    border: none;
    padding: 16px 28px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 0 24px;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(0, 114, 255, 0.35);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Be Vietnam Pro', sans-serif;
    text-decoration: none;
    display: inline-block;
  }
  
  @media (min-width: 640px) {
    .hero-cta-btn-demo {
      padding: 20px 36px;
      font-size: 15px;
      border-radius: 0 30px;
    }
  }

  .hero-cta-btn-demo:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 114, 255, 0.55);
    color: #ffffff;
  }

  .hero-cta-btn-outline {
    background: rgba(255,255,255,0.12);
    color: #ffffff;
    border: 1.5px solid rgba(255,255,255,0.45);
    padding: 14px 26px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 0 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Be Vietnam Pro', sans-serif;
    text-decoration: none;
    display: inline-block;
    backdrop-filter: blur(6px);
  }

  @media (min-width: 640px) {
    .hero-cta-btn-outline {
      padding: 18px 32px;
      font-size: 15px;
      border-radius: 0 30px;
    }
  }

  .hero-cta-btn-outline:hover {
    background: rgba(255,255,255,0.22);
    transform: translateY(-3px);
    color: #ffffff;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Organism – AdminHeroBanner  (khớp chính xác demo)
// ─────────────────────────────────────────────────────────────────────────────
export const AdminHeroBanner = ({
  backgroundImage,
  eyebrowText,
  headline,
  headlineHighlight,
  description,
  primaryBtnLabel,
  primaryBtnUrl,
  showSecondaryBtn,
  secondaryBtnLabel,
  secondaryBtnUrl,
  showBottomFade,
  bottomFadeColor,
}) => {
  return (
    <section
      style={{
        minHeight:           '100vh',
        position:            'relative',
        backgroundImage:     `url('${backgroundImage}'), linear-gradient(0deg, #a8dfff 0%, #cdeeff 25%, #66aaff 60%, #3399ff 100%)`,
        backgroundBlendMode: 'screen',
        backgroundSize:      'cover',
        backgroundPosition:  'center',
        display:             'flex',
        alignItems:          'center',
        paddingTop:          '80px',
        paddingBottom:       '80px',
        overflow:            'hidden',
      }}
    >
      <style>{heroStyles}</style>

      {/* Overlay gradient trái-phải */}
      <div
        style={{
          content:    "''",
          position:   'absolute',
          top:        0,
          left:       0,
          width:      '100%',
          height:     '100%',
          background: 'linear-gradient(90deg, rgba(4,30,60,0.55) 20%, rgba(4,30,60,0.3) 60%, rgba(4,30,60,0.1) 100%)',
          zIndex:     1,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade wave */}
      {showBottomFade && (
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '160px',
            background: `linear-gradient(to bottom, transparent, ${bottomFadeColor || '#a8dfff'})`,
            zIndex:     2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position:     'relative',
          zIndex:       3,
          width:        '100%',
          maxWidth:     '1300px',
          margin:       '0 auto',
          display:      'flex',
          justifyContent: 'flex-start',
        }}
        className="px-4 sm:px-6 md:px-8"
      >
        {/* Glassmorphism card – khớp chính xác demo */}
        <div className="hero-card">
          {/* Text block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>

            {/* Eyebrow */}
            {eyebrowText && (
              <p
                className="hero-anim-1"
                style={{
                  fontSize:      '14px',
                  fontWeight:    500,
                  color:         'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {eyebrowText}
              </p>
            )}

            {/* Headline – gradient trắng → vàng + text-shadow, khớp demo */}
            <h1
              className="hero-anim-2"
              style={{
                fontSize:   'clamp(32px, 6vw, 68px)',
                fontWeight: 800,
                lineHeight: 1.15,
                background: 'linear-gradient(135deg, #ffffff 40%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                textShadow: '0 0 12px rgba(255, 215, 0, 0.45)',
              }}
            >
              {headline}
              {headlineHighlight && (
                <span style={{ display: 'block' }}>{headlineHighlight}</span>
              )}
            </h1>

            {/* Description */}
            {description && (
              <p
                className="hero-anim-3"
                style={{
                  fontSize:   '14px',
                  color:      'rgba(255, 255, 255, 0.85)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* CTA buttons */}
          <div className="hero-anim-4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {primaryBtnLabel && (
              <a href={primaryBtnUrl || '#'} className="hero-cta-btn-demo">
                {primaryBtnLabel}
              </a>
            )}
            {showSecondaryBtn && secondaryBtnLabel && (
              <a href={secondaryBtnUrl || '#'} className="hero-cta-btn-outline">
                {secondaryBtnLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Props
// ─────────────────────────────────────────────────────────────────────────────
AdminHeroBanner.defaultProps = {
  backgroundImage:  'https://webdemo.hexagon.xyz/medias/hieuunghero.webp',
  eyebrowText:      'Lan tỏa giá trị đất',
  headline:         'Sen Hồng',
  headlineHighlight: '',
  description:
    'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, thúc đẩy giá trị kinh doanh và lan toả nghĩa tình quê hương.',
  primaryBtnLabel:    'Tham gia cộng đồng',
  primaryBtnUrl:      '#lien-he',
  showSecondaryBtn:   false,
  secondaryBtnLabel:  'Tìm hiểu thêm',
  secondaryBtnUrl:    '/gioi-thieu',
  showBottomFade:     true,
  bottomFadeColor:    '#a8dfff',
};

// ─────────────────────────────────────────────────────────────────────────────
// Puck Field Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const adminHeroBannerFields = {
  backgroundImage: {
    type: 'text',
    label: 'URL ảnh nền hero',
  },
  eyebrowText: {
    type: 'text',
    label: 'Dòng tagline nhỏ (trên tiêu đề)',
  },
  headline: {
    type: 'text',
    label: 'Tiêu đề chính (gradient trắng–vàng)',
  },
  headlineHighlight: {
    type: 'text',
    label: 'Dòng tiêu đề phụ (xuống dòng mới)',
  },
  description: {
    type: 'textarea',
    label: 'Mô tả',
  },
  primaryBtnLabel: {
    type: 'text',
    label: 'Nút CTA chính – Nhãn',
  },
  primaryBtnUrl: {
    type: 'text',
    label: 'Nút CTA chính – URL',
  },
  showSecondaryBtn: {
    type: 'radio',
    label: 'Hiện nút phụ',
    options: [
      { label: 'Có',    value: true  },
      { label: 'Không', value: false },
    ],
  },
  secondaryBtnLabel: {
    type: 'text',
    label: 'Nút phụ – Nhãn',
  },
  secondaryBtnUrl: {
    type: 'text',
    label: 'Nút phụ – URL',
  },
  showBottomFade: {
    type: 'radio',
    label: 'Hiện gradient mờ dưới cùng',
    options: [
      { label: 'Có',    value: true  },
      { label: 'Không', value: false },
    ],
  },
  bottomFadeColor: {
    type: 'text',
    label: 'Màu gradient dưới cùng (hex)',
  },
};
