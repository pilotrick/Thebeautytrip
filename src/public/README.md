# 📂 Public Assets Folder

This folder contains all public static assets for The Beauty Trip platform.

## 📹 Video Folder Structure

```
public/
└── videos/
    ├── hero/              ← Horizontal hero videos (16:9)
    ├── testimonials/      ← Vertical testimonial videos (9:16)
    ├── tours/             ← Vertical destination videos (9:16)
    ├── procedures/        ← Vertical procedure videos (9:16)
    └── sanctuaries/       ← Horizontal villa tour videos (16:9)
```

## 🎬 Quick Start

### 1. Download Videos from Pexels

**For Hero (Horizontal):**
- URL: https://www.pexels.com/videos/
- Search: "luxury spa wellness"
- Filter: **Landscape orientation**
- Save to: `/public/videos/hero/hero-wellness.mp4`

**For Vertical Videos:**
- URL: https://www.pexels.com/videos/
- Search: "woman portrait vertical" or "spa facial phone"
- Filter: **Portrait orientation** ⚠️
- Save to: `/public/videos/testimonials/*.mp4`

### 2. Video Specifications

| Type | Aspect Ratio | Resolution | Orientation | Size |
|------|--------------|------------|-------------|------|
| Hero | 16:9 | 1920x1080 | Landscape | 5-20MB |
| Testimonials | 9:16 | 1080x1920 | **Portrait** | 5-30MB |
| Tours | 9:16 | 1080x1920 | **Portrait** | 5-30MB |
| Procedures | 9:16 | 1080x1920 | **Portrait** | 5-30MB |
| Sanctuaries | 16:9 | 1920x1080 | Landscape | 10-40MB |

### 3. Required Files (Priority Order)

**High Priority:**
- ✅ `/public/videos/hero/hero-wellness.mp4` - Main hero background
- ✅ `/public/videos/testimonials/sarah-transformation.mp4` - Client story

**Medium Priority:**
- ⏳ `/public/videos/tours/caribbean-radiance.mp4` - Destination tour
- ⏳ `/public/videos/procedures/botox-demonstration.mp4` - Procedure demo

**Optional:**
- ⏳ `/public/videos/sanctuaries/radiance-villa.mp4` - Villa tour

## ⚠️ IMPORTANT: Vertical vs Horizontal

**HORIZONTAL (16:9) - Landscape:**
```
┌──────────────────────┐
│                      │
│   1920 x 1080        │
│                      │
└──────────────────────┘
```
Use for: Hero backgrounds, Villa tours

**VERTICAL (9:16) - Portrait:**
```
┌──────────┐
│          │
│  1080    │
│    x     │
│  1920    │
│          │
│          │
└──────────┘
```
Use for: Testimonials, Tours, Procedures

## 🔧 Where Videos Appear

- **Hero video** → HomePage hero section (autoplay background)
- **Vertical videos** → HomePage "Real Transformations" carousel
- **Villa videos** → Step4Recovery virtual tours

## 📥 Free Video Sources

1. **Pexels** - https://www.pexels.com/videos/ (FREE, best option)
2. **Pixabay** - https://pixabay.com/videos/ (FREE)
3. **Coverr** - https://coverr.co/ (FREE, curated)

## ✅ After Adding Videos

1. Drop videos into respective folders
2. Hard refresh browser: **Cmd+Shift+R** or **Ctrl+Shift+R**
3. Videos will auto-load on HomePage!

---

📚 **Full Guides:**
- See `/VERTICAL_VIDEO_GUIDE.md` for complete vertical video setup
- See `/QUICK_VIDEO_GUIDE.md` for 2-minute quick start
- See `/COMPLETE_VIDEO_FOLDER_STRUCTURE.txt` for visual diagram
