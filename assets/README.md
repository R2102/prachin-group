# Assets Folder Structure

This folder contains all static assets for the Parchin Group website.

## 📁 Folder Structure

```
assets/
├── images/
│   ├── sliders/          # Slider/Hero images
│   ├── products/         # Product images and photos
│   ├── company/          # Company logos, team photos, office images
│   └── icons/            # Custom icons and graphics
└── README.md             # This file
```

## 🖼️ Image Guidelines

### **Sliders Folder** (`images/sliders/`)
- **Purpose**: Hero slider images and banner images
- **Recommended Size**: 1920x1080px or 16:9 aspect ratio
- **Format**: JPG, PNG, WebP
- **Optimization**: Compress for web (max 500KB per image)

### **Products Folder** (`images/products/`)
- **Purpose**: Product photos, packaging images, technical diagrams
- **Recommended Size**: 800x600px or 4:3 aspect ratio
- **Format**: JPG, PNG, WebP
- **Optimization**: High quality for product showcase

### **Company Folder** (`images/company/`)
- **Purpose**: Company logos, team photos, office buildings, certificates
- **Recommended Size**: Varies by use case
- **Format**: PNG for logos, JPG for photos
- **Optimization**: Maintain quality for professional appearance

### **Icons Folder** (`images/icons/`)
- **Purpose**: Custom icons, favicons, UI graphics
- **Recommended Size**: 16x16px to 512x512px (SVG preferred)
- **Format**: SVG, PNG, ICO
- **Optimization**: SVG for scalability, PNG for specific sizes

## 📝 Naming Convention

Use descriptive, lowercase names with hyphens:
- `hero-innovation.jpg`
- `product-croscarmellose-sodium.png`
- `company-logo-parchin-group.svg`
- `icon-arrow-right.svg`

## 🔧 Usage in Code

### **HTML Example:**
```html
<img src="assets/images/sliders/hero-innovation.jpg" alt="Innovation Hero">
<img src="assets/images/products/croscarmellose-sodium.png" alt="Croscarmellose Sodium">
<img src="assets/images/company/logo-parchin-group.svg" alt="Parchin Group Logo">
```

### **CSS Example:**
```css
.hero-bg {
    background-image: url('../assets/images/sliders/hero-innovation.jpg');
}
```

## 📋 Best Practices

1. **Optimize Images**: Compress all images for web use
2. **Use Alt Text**: Always include descriptive alt attributes
3. **Responsive Images**: Provide multiple sizes for different devices
4. **Lazy Loading**: Implement lazy loading for better performance
5. **WebP Format**: Use WebP with fallbacks for better compression

## 🚀 Performance Tips

- Keep image file sizes under 500KB for sliders
- Use WebP format when possible
- Implement proper caching headers
- Consider using a CDN for production
- Optimize images for the specific use case

## 📞 Support

For questions about assets or image optimization, contact the development team. 