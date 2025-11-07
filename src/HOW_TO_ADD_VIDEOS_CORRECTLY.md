# ✅ HOW TO ADD VIDEOS (STEP-BY-STEP)

## ⚠️ IMPORTANT: The Error You're Getting

**"File is not supported"** means you're trying to drag the video into:
- ❌ The browser preview window
- ❌ The Figma Make interface
- ❌ Inside a text file

**YOU NEED TO ADD IT TO YOUR FILE SYSTEM, NOT THE BROWSER!**

---

## 🎯 THE RIGHT WAY (3 Simple Steps)

### Method 1: Using VS Code (RECOMMENDED)

#### Step 1: Download a Video
1. Go to: https://www.pexels.com/videos/
2. Search: **"luxury spa wellness"**
3. Click a **landscape/horizontal** video
4. Click **"Download"** → **"Free Download"**
5. The video downloads to your Downloads folder

#### Step 2: Find Your Project Folder in VS Code
1. Open **VS Code**
2. Look at the **EXPLORER** panel (left sidebar with file icon)
3. You should see your project files:
   ```
   public/
   ├── README.md
   └── videos/
       └── hero/
           └── DROP_VIDEO_HERE.txt
   ```

#### Step 3: Drag the Video into VS Code
1. Open your **Downloads folder** (in Finder/File Explorer)
2. Find the video you just downloaded (e.g., `pexels-video-3765146.mp4`)
3. **DRAG the video file** from Downloads
4. **DROP it into** the `public/videos/hero/` folder in VS Code's Explorer panel
5. **Right-click the video** → **Rename** → Type: `hero-wellness.mp4`

#### Step 4: Delete the Text File (Optional)
- Right-click `DROP_VIDEO_HERE.txt` → Delete

#### Step 5: Refresh Your Browser
- **Mac:** Press `Cmd + Shift + R`
- **Windows:** Press `Ctrl + Shift + R`

**DONE!** 🎉 Your video should now be playing!

---

### Method 2: Using Finder/File Explorer (ALTERNATIVE)

#### Step 1: Download a Video (Same as above)

#### Step 2: Navigate to Your Project Folder
**On Mac:**
1. Open **Finder**
2. Navigate to where you saved your Figma Make project
3. Open: `YourProjectName` → `public` → `videos` → `hero`

**On Windows:**
1. Open **File Explorer**
2. Navigate to where you saved your Figma Make project
3. Open: `YourProjectName` → `public` → `videos` → `hero`

#### Step 3: Copy the Video
1. Find your downloaded video in Downloads
2. **Copy** the video file
3. **Paste** it into the `hero` folder
4. **Rename** it to: `hero-wellness.mp4`

#### Step 4: Refresh Browser
- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + R`

---

## 🎬 What Your Folder Should Look Like After Adding Video

```
public/
└── videos/
    └── hero/
        ├── hero-wellness.mp4          ← ✅ YOUR VIDEO FILE
        └── DROP_VIDEO_HERE.txt        ← Delete this (optional)
```

---

## ❌ COMMON MISTAKES

### Mistake 1: Dragging into Browser Preview
**WRONG:** Dragging video into the live preview/website in your browser
**RIGHT:** Dragging video into VS Code file explorer or using Finder/File Explorer

### Mistake 2: Wrong Filename
**WRONG:** `pexels-video-3765146.mp4` or `spa-video.mp4`
**RIGHT:** `hero-wellness.mp4` (EXACT filename required!)

### Mistake 3: Wrong Folder
**WRONG:** Dropping in `public/` or `public/videos/`
**RIGHT:** Must be in `public/videos/hero/`

### Mistake 4: Wrong File Format
**WRONG:** `.mov`, `.avi`, `.wmv` formats
**RIGHT:** Must be `.mp4` format

---

## 🆘 Still Not Working?

### Check 1: Is the file in the right place?
In VS Code Explorer, navigate to:
```
public → videos → hero → hero-wellness.mp4
```

Can you see the file there? ✅ Good!
Can't see it? ❌ It's in the wrong place!

### Check 2: Is the filename EXACTLY correct?
The file MUST be named: **`hero-wellness.mp4`**
- ✅ `hero-wellness.mp4`
- ❌ `Hero-wellness.mp4` (capital H)
- ❌ `hero-wellness (1).mp4` (has number)
- ❌ `hero_wellness.mp4` (underscore instead of dash)

### Check 3: Is it an MP4 file?
- Right-click the video file
- Check properties/info
- File type should be: **MP4 Video**

If it's `.mov` or `.avi`, you need to convert it:
1. Go to: https://cloudconvert.com/mp4-converter
2. Upload your video
3. Convert to MP4
4. Download the MP4 version

### Check 4: Did you hard refresh?
Regular refresh won't work! You MUST hard refresh:
- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + R`

### Check 5: Check browser console
1. Open browser (where your app is running)
2. Press `F12` (opens Developer Tools)
3. Click **Console** tab
4. Look for errors like:
   - `404 Not Found: /videos/hero/hero-wellness.mp4`
   - This means the file is not in the right place!

---

## 📱 VERTICAL VIDEOS (For Testimonials)

Same process, but:
- **Folder:** `public/videos/testimonials/`
- **Filename:** `sarah-transformation.mp4`
- **Video Type:** **PORTRAIT** (vertical, like phone screen)
- **Where to Get:** Pexels → Filter by "Portrait" orientation

---

## 🎯 Quick Checklist

Before asking for help, verify:
- [ ] Video is in MP4 format
- [ ] Video is in correct folder: `public/videos/hero/`
- [ ] Filename is EXACTLY: `hero-wellness.mp4`
- [ ] You can see the file in VS Code Explorer
- [ ] You did a hard refresh: Cmd+Shift+R or Ctrl+Shift+R
- [ ] Video is landscape/horizontal (not vertical)

---

## 💡 Pro Tips

### Tip 1: See the Video File in VS Code
After adding the video, you should see it in VS Code Explorer:
```
hero/
├── hero-wellness.mp4          ← Your video (shows file size like "12.5 MB")
└── DROP_VIDEO_HERE.txt
```

### Tip 2: Video File Size
- **Recommended:** 5-20 MB
- **Maximum:** 50 MB
- Larger files will take longer to load

### Tip 3: Video Should Be Landscape
For hero videos:
- ✅ 1920x1080 (landscape, like TV)
- ✅ 16:9 aspect ratio
- ❌ NOT vertical/portrait videos

---

## ✅ Expected Result

Once you've correctly added `hero-wellness.mp4`:

1. **Hard refresh your browser**
2. **HomePage should show:**
   - Beautiful video background in the hero section
   - Video loops seamlessly
   - Overlay with your content on top

3. **No more:**
   - "CINEMATIC EXPERIENCE COMING SOON" badge
   - Static image placeholder

**Your video is LIVE!** 🎬✨

---

## 🚀 Next Steps After Hero Video Works

1. Add vertical testimonial videos:
   - Folder: `public/videos/testimonials/`
   - Filename: `sarah-transformation.mp4`
   - Type: Portrait (vertical)

2. Add more videos as needed:
   - Tours: `public/videos/tours/`
   - Procedures: `public/videos/procedures/`
   - Villas: `public/videos/sanctuaries/`

---

**Remember: You're NOT uploading to the browser. You're adding files to your project's file system!** 📂

Good luck! 🎉
