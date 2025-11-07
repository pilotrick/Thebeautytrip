# Video Implementation Guide for The Beauty Trip

## 📹 Where to Get Stock Videos (Free)

### **1. Pexels Videos** ⭐ RECOMMENDED
**URL:** https://www.pexels.com/videos/

**Why:** Highest quality, best selection for luxury/wellness content, completely free with no attribution required.

**Search Terms:**
- "luxury spa wellness"
- "tropical resort dominican"
- "meditation wellness woman"
- "beauty treatment facial"
- "caribbean beach sunset"
- "dental clinic modern"
- "yoga wellness retreat"
- "massage therapy spa"
- "ocean view luxury"

**Download Tips:**
- Choose "Full HD" (1920x1080) for best quality
- Look for videos 10-30 seconds long
- Check the "Popular" filter for highest quality

---

### **2. Pixabay Videos**
**URL:** https://pixabay.com/videos/

**Why:** Good variety, completely free, decent quality

**Best For:**
- Nature scenes (beaches, sunsets, landscapes)
- Wellness activities (yoga, meditation)
- Abstract/ambient backgrounds

---

### **3. Coverr**
**URL:** https://coverr.co/

**Why:** Curated, cinematic clips perfect for hero sections

**Best For:**
- Hero background videos
- Destination highlights
- Ambient mood videos

**Note:** Smaller library but very high quality

---

### **4. Videvo**
**URL:** https://www.videvo.net/

**Why:** Mix of free and paid, good selection

**Filter:** Select "Free" to see only free content

---

## 🎬 Video Specifications

### **Optimal Formats:**
- **Container:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD) minimum
- **Frame Rate:** 24fps or 30fps
- **File Size:** Under 10MB for background videos, under 50MB for content videos

### **Compression Tools:**
If videos are too large:
- **HandBrake** (free, desktop): https://handbrake.fr/
- **CloudConvert** (online): https://cloudconvert.com/mp4-converter
- **FFmpeg** (command line): `ffmpeg -i input.mp4 -vcodec h264 -acodec aac output.mp4`

---

## 🏗️ Implementation Examples

### **EXAMPLE 1: Hero Background Video (HomePage)**

```tsx
import { VideoBackground } from './components/VideoBackground';

// In your HomePage.tsx, replace the hero section:
<VideoBackground
  videoUrl="/videos/hero-wellness-spa.mp4"
  posterUrl="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
  overlay="dark"
  overlayOpacity={0.5}
  className="min-h-screen"
>
  <div className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center">
    <h1 className="text-5xl md:text-7xl text-white mb-6">
      Stop Dreaming. Start Living the Journey.
    </h1>
    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12">
      Where World-Class Wellness Meets Pure, Unfiltered Escape
    </p>
    <button className="px-8 py-4 bg-[#B8985B] text-white rounded-full hover:bg-[#A17E4A] transition-colors">
      Claim Your Sanctuary
    </button>
  </div>
</VideoBackground>
```

**Recommended Pexels Videos:**
- Search: "luxury spa wellness"
- Search: "tropical resort pool"
- Search: "caribbean beach aerial"

---

### **EXAMPLE 2: Sanctuary Virtual Tours (Step4Recovery)**

```tsx
import { VideoPlayer } from './components/VideoPlayer';

// In your Step4Recovery.tsx, add video tours:
<div className="grid md:grid-cols-3 gap-8">
  <VideoPlayer
    videoUrl="/videos/radiance-villa-tour.mp4"
    posterUrl="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
    title="Radiance Villa"
    caption="Oceanfront serenity for your early recovery"
    aspectRatio="4/3"
  />
  
  <VideoPlayer
    videoUrl="/videos/polish-villa-tour.mp4"
    posterUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
    title="Polish Retreat"
    caption="Modern luxury meets tropical paradise"
    aspectRatio="4/3"
  />
  
  <VideoPlayer
    videoUrl="/videos/sanctuary-estate-tour.mp4"
    posterUrl="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80"
    title="Sanctuary Estate"
    caption="Ultimate privacy, ultimate transformation"
    aspectRatio="4/3"
  />
</div>
```

**Recommended Pexels Videos:**
- Search: "luxury villa interior"
- Search: "hotel room ocean view"
- Search: "modern apartment tour"

---

### **EXAMPLE 3: Testimonial Videos**

```tsx
import { VideoPlayer } from './components/VideoPlayer';

// Add to HomePage or TransformationPortal:
<section className="py-24 px-6 bg-white">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-4xl md:text-5xl text-center mb-16 text-[#111111]">
      Transformation Stories
    </h2>
    
    <div className="grid md:grid-cols-2 gap-12">
      <VideoPlayer
        videoUrl="/videos/testimonial-sarah.mp4"
        posterUrl="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
        title="Sarah's Journey"
        caption="From hesitation to absolute confidence in 7 days"
        aspectRatio="16/9"
      />
      
      <VideoPlayer
        videoUrl="/videos/testimonial-maria.mp4"
        posterUrl="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80"
        title="Maria's Transformation"
        caption="The smile she always dreamed of, finally hers"
        aspectRatio="16/9"
      />
    </div>
  </div>
</section>
```

**Temporary Stock Videos:**
- Search: "woman smiling portrait"
- Search: "beauty treatment happy"
- Use as placeholders until real testimonials

---

### **EXAMPLE 4: Tour Trip Destination Highlights**

```tsx
import { VideoBackground } from './components/VideoBackground';

// In TourTrips.tsx for each tour:
<VideoBackground
  videoUrl="/videos/dominican-republic-aerial.mp4"
  posterUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80"
  overlay="dark"
  overlayOpacity={0.3}
  className="py-32"
>
  <div className="container mx-auto px-6 text-center max-w-4xl">
    <h2 className="text-4xl md:text-5xl text-white mb-8">
      Caribbean Radiance Retreat
    </h2>
    <p className="text-xl text-white/90 leading-relaxed">
      7 days. World-class treatments. Unforgettable transformation.
    </p>
  </div>
</VideoBackground>
```

**Recommended Pexels Videos:**
- Search: "dominican republic beach"
- Search: "caribbean aerial drone"
- Search: "tropical island paradise"

---

## 📁 File Organization

Create a `/public/videos` folder structure:

```
public/
└── videos/
    ├── hero/
    │   ├── wellness-spa-hero.mp4
    │   └── tropical-resort-hero.mp4
    ├── sanctuaries/
    │   ├── radiance-villa.mp4
    │   ├── polish-retreat.mp4
    │   └── sanctuary-estate.mp4
    ├── testimonials/
    │   ├── testimonial-1.mp4
    │   └── testimonial-2.mp4
    ├── tours/
    │   ├── caribbean-radiance.mp4
    │   └── santo-domingo-glow.mp4
    └── procedures/
        ├── dental-veneers.mp4
        └── aesthetic-treatments.mp4
```

Then reference videos like:
```tsx
videoUrl="/videos/hero/wellness-spa-hero.mp4"
```

---

## ⚡ Performance Best Practices

### **1. Video Compression**
- Keep hero videos under 10MB
- Keep content videos under 50MB
- Use H.264 codec for best browser compatibility

### **2. Lazy Loading**
```tsx
// Videos below the fold should lazy load
<VideoPlayer
  videoUrl="/videos/sanctuary.mp4"
  // Browser will lazy load automatically
/>
```

### **3. Poster Images**
Always provide poster images (fallback thumbnails):
```tsx
posterUrl="https://images.unsplash.com/photo-xxx"
```

### **4. Mobile Optimization**
```tsx
// Different videos for mobile vs desktop
const videoUrl = window.innerWidth < 768 
  ? "/videos/hero-mobile.mp4"  // Smaller file
  : "/videos/hero-desktop.mp4"; // Full quality
```

---

## 🎨 Video Overlay Options

Match The Beauty Trip aesthetic with overlays:

### **Dark Overlay (Most Versatile)**
```tsx
<VideoBackground
  overlay="dark"
  overlayOpacity={0.4}  // 40% darkness
>
```
**Best For:** Text readability, hero sections

### **Blush Overlay (Brand Color)**
```tsx
<VideoBackground
  overlay="blush"
  overlayOpacity={0.2}  // Subtle pink tint
>
```
**Best For:** Feminine, luxury feel

### **Light Overlay**
```tsx
<VideoBackground
  overlay="light"
  overlayOpacity={0.3}  // Soft white veil
>
```
**Best For:** Dark videos, dreamy aesthetic

### **No Overlay**
```tsx
<VideoBackground
  overlay="none"
>
```
**Best For:** Let the video speak

---

## 🚀 Quick Start Checklist

- [ ] Go to Pexels Videos (https://www.pexels.com/videos/)
- [ ] Search for "luxury spa wellness"
- [ ] Download 3-5 videos (Full HD)
- [ ] Create `/public/videos` folder
- [ ] Add videos to folder
- [ ] Import VideoBackground component
- [ ] Replace hero section in HomePage.tsx
- [ ] Test on mobile and desktop
- [ ] Optimize file sizes if needed

---

## 🎯 Priority Implementation Plan

### **Phase 1: Hero Video** (Immediate Impact)
Replace HomePage hero with video background
- **File:** `HomePage.tsx`
- **Component:** `VideoBackground`
- **Video:** Pexels "luxury spa wellness" (under 10MB)

### **Phase 2: Sanctuary Tours** (High Value)
Add video tours to villa selection
- **File:** `Step4Recovery.tsx`
- **Component:** `VideoPlayer`
- **Videos:** 3 villa tours from Pexels

### **Phase 3: Testimonials** (Trust Building)
Add video testimonials section
- **File:** `HomePage.tsx` or `TransformationPortal.tsx`
- **Component:** `VideoPlayer`
- **Videos:** Stock videos as placeholders

### **Phase 4: Tour Trips** (Conversion Driver)
Add destination highlight videos
- **File:** `TourTrips.tsx`
- **Component:** `VideoBackground`
- **Videos:** Caribbean/Dominican Republic footage

---

## 💡 Pro Tips

1. **Start Simple:** Just add ONE hero background video first
2. **Test Performance:** Check load times on mobile
3. **Use Posters:** Always provide fallback images
4. **Compress Videos:** Smaller files = better UX
5. **Match Aesthetic:** Choose calm, luxury-focused clips
6. **Loop Seamlessly:** Look for videos that loop naturally

---

## 🆘 Troubleshooting

### **Video won't autoplay:**
- Add `muted` attribute (browsers block unmuted autoplay)
- Add `playsInline` for iOS

### **Video file too large:**
- Use HandBrake to compress
- Target: 10MB for backgrounds, 50MB for content

### **Video looks pixelated:**
- Download Full HD (1920x1080) minimum
- Check compression settings

### **Video doesn't loop smoothly:**
- Look for "seamless loop" videos on Pexels
- Or trim video to loop point

---

## 📊 Recommended Videos by Section

| Section | Search Term | Duration | Size |
|---------|-------------|----------|------|
| Hero | "luxury spa wellness" | 15-30s | <10MB |
| Sanctuary | "luxury villa interior" | 20-40s | <30MB |
| Testimonial | "woman smiling portrait" | 30-60s | <50MB |
| Tour Destination | "caribbean beach aerial" | 15-25s | <15MB |
| Procedure | "beauty treatment facial" | 20-30s | <25MB |

---

## 🎬 Next Steps

1. **Download your first video** from Pexels
2. **Add to `/public/videos` folder**
3. **Replace HomePage hero** with VideoBackground component
4. **Test and iterate**
5. **Gradually add more videos** to other sections

Remember: Start with ONE high-impact video (the hero), test it, then expand from there.
