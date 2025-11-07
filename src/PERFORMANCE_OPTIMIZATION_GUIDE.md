# Performance Optimization Guide
## The Beauty Trip - Conversion-Focused Performance Strategy

### 🚨 CRITICAL: Scroll Restoration (IMPLEMENTED)

**Problem:** Users landing mid-page miss CTAs → massive conversion drop-off

**Solution Implemented:**
1. ✅ Force scroll to top on initial page load (`App.tsx`)
2. ✅ Disable browser scroll restoration 
3. ✅ Scroll to top on all navigation changes
4. ✅ HomePage scroll restoration on mount
5. ✅ Created `/utils/scrollRestoration.ts` utility library

**Result:** Users ALWAYS see hero CTA first, maximizing conversion opportunities

---

## Performance Optimization Strategy

### When to Optimize

**Continuous Monitoring:**
- Check performance after every 5-10 component additions
- Run Lighthouse audits weekly during active development
- Monitor Core Web Vitals in production

**Immediate Optimization Needed If:**
- Lighthouse Performance score < 85
- First Contentful Paint (FCP) > 1.8s
- Largest Contentful Paint (LCP) > 2.5s
- Time to Interactive (TTI) > 3.8s
- Total Blocking Time (TBT) > 200ms
- Cumulative Layout Shift (CLS) > 0.1

---

## Current Optimizations in Place

### ✅ Scroll Performance
- `useScrollOptimized` hook - Throttled scroll listeners (16ms intervals)
- `useThrottle` hook - Prevents excessive re-renders
- `useReducedMotion` hook - Respects user accessibility preferences
- React.memo removed from components (was causing Figma devtools errors)
- Optimized `FloatingCTA` and `ScrollIndicator` components

### ✅ Video Performance
- YouTube embeds use native iframe (not heavy react-player)
- Lazy loading for below-fold videos
- Abort error fixes for video cleanup

### ✅ Component Optimization
- `ImprovedBeforeAfter` - Optimized image slider with proper cleanup
- `DynamicItinerary` - Reduced re-renders with proper dependencies
- Navigation - Sticky positioning with minimal re-renders

### ✅ Image Optimization
- Unsplash images served with optimized params (`?w=1920&q=80`)
- Lazy loading for below-fold images
- WebP format where possible

---

## Performance Optimization Checklist

### 🎯 High Priority (Do Now)

- [ ] **Code Splitting** - Split routes and heavy components
  ```tsx
  const HomePage = lazy(() => import('./components/HomePage'));
  const TransformationPortal = lazy(() => import('./components/TransformationPortal'));
  ```

- [ ] **Virtual Scrolling** - For long lists (activities catalog, pricing)
  ```tsx
  import { useVirtualizer } from '@tanstack/react-virtual';
  ```

- [ ] **Image Optimization** - Add next-gen formats
  ```tsx
  <picture>
    <source srcSet="image.webp" type="image/webp" />
    <source srcSet="image.jpg" type="image/jpeg" />
    <img src="image.jpg" alt="..." />
  </picture>
  ```

- [ ] **Bundle Analysis** - Check what's bloating the bundle
  ```bash
  npm run build -- --analyze
  ```

### 🔧 Medium Priority (Do Soon)

- [ ] **Preload Critical Resources**
  ```html
  <link rel="preload" href="/fonts/SpaceGrotesk.woff2" as="font" crossorigin>
  <link rel="preload" href="hero-video.mp4" as="video">
  ```

- [ ] **Optimize Third-Party Scripts**
  - Defer non-critical scripts
  - Use async loading where possible
  - Consider self-hosting fonts

- [ ] **Service Worker/PWA**
  - Cache static assets
  - Offline fallback
  - Faster subsequent loads

- [ ] **Database Query Optimization**
  - Add indexes to Supabase tables
  - Implement pagination for large datasets
  - Cache frequently accessed data

### 💡 Nice to Have (Future)

- [ ] **CDN for Static Assets** - Cloudflare or similar
- [ ] **Advanced Image Optimization** - Use service like Cloudinary
- [ ] **Prefetch Next Pages** - Anticipate user navigation
- [ ] **Web Workers** - Offload heavy computations
- [ ] **IntersectionObserver Refinement** - More granular loading

---

## Monitoring Tools

### Development
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-site.com --view

# Bundle size check
npm run build
ls -lh dist/
```

### Production
- Google PageSpeed Insights
- WebPageTest.org
- Chrome DevTools Performance panel
- Real User Monitoring (RUM) tools

---

## Performance Budget

### Target Metrics (Mobile 3G)
- **FCP:** < 1.5s
- **LCP:** < 2.0s  
- **TTI:** < 3.0s
- **TBT:** < 150ms
- **CLS:** < 0.1
- **Bundle Size:** < 500KB (gzipped)

### Current Status
✅ Scroll optimization complete
✅ Critical rendering path optimized
✅ Video loading optimized
⚠️ Bundle size needs monitoring as features grow

---

## Optimization Frequency Recommendation

### Active Development Phase (Adding Features)
- **Weekly:** Quick Lighthouse checks
- **Every 10 components:** Deep performance audit
- **Before major releases:** Full optimization pass

### Stable/Production Phase
- **Monthly:** Performance review
- **Quarterly:** Deep optimization sprint
- **After traffic spikes:** Analyze bottlenecks

---

## Red Flags - Optimize Immediately If:

1. **Bounce Rate > 60%** on homepage
2. **Time on page < 10 seconds** (users aren't seeing CTA)
3. **Mobile performance score < 70**
4. **Conversion rate drops > 15%** after updates
5. **Page load time > 4 seconds** on 4G

---

## Quick Wins Available Now

1. ✅ **DONE:** Scroll restoration → Ensures CTA visibility
2. **TODO:** Lazy load below-fold images
3. **TODO:** Code split routes
4. **TODO:** Minify and compress assets
5. **TODO:** Enable Gzip/Brotli compression on server

---

## Notes

- Performance optimization is **continuous**, not one-time
- **Measure first**, optimize second (don't guess)
- User experience > perfect metrics (smooth scrolling > blocking optimizations)
- **Conversion rate** is the ultimate performance metric

**Last Updated:** 2024-10-31
**Status:** Scroll restoration critical fix applied ✅
