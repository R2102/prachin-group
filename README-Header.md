# Dynamic Header System for Parchin Group

This system allows you to use a consistent header across all pages of your website without duplicating code.

## 📁 Files Structure

```
prachin-group/
├── header.html          # Header HTML content
├── js/
│   └── header.js        # Header management script
├── products.html        # Example page using dynamic header
└── README-Header.md     # This file
```

## 🚀 How to Use

### 1. Add Header to Any Page

To add the dynamic header to any page, simply include the header script in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    
    <!-- Required CSS and Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 text-gray-700 antialiased">
    
    <!-- Header will be loaded here automatically -->
    
    <!-- Your page content -->
    <main class="pt-20">
        <!-- Add your content here -->
    </main>
    
    <!-- Load the dynamic header script -->
    <script src="js/header.js"></script>
</body>
</html>
```

### 2. Key Features

#### ✅ **Automatic Loading**
- Header loads automatically when page loads
- No manual HTML copying required
- Consistent across all pages

#### ✅ **Responsive Design**
- Mobile-friendly navigation
- Tablet and desktop optimized
- Smooth transitions and animations

#### ✅ **Products Dropdown**
- Full-width dropdown menu
- Hover-activated on desktop
- Click-activated on mobile
- Category switching functionality

#### ✅ **Navigation Links**
- All links automatically updated for current page
- Smooth scrolling to sections
- Active state management

## 🎯 Features Included

### Desktop Navigation
- **Logo**: Links to homepage
- **Navigation Links**: Home, About Us, Products, Certifications, Contact Us
- **Products Dropdown**: Hover to show full product catalog
- **Inquiry Button**: Call-to-action button

### Mobile Navigation
- **Hamburger Menu**: Collapsible mobile menu
- **Products Submenu**: Expandable products section
- **Touch-friendly**: Optimized for mobile devices

### Products Dropdown
- **Excipients**: All pharmaceutical excipients
- **Vitamins**: Vitamin supplements
- **Quick Links**: New products, popular items, certified products
- **View Full Catalog**: Link to products page

## 🔧 Customization

### Update Header Content
Edit `header.html` to modify:
- Logo text
- Navigation links
- Products list
- Contact information

### Update Styling
Modify the CSS in `js/header.js` to change:
- Colors and themes
- Typography
- Spacing and layout
- Animations

### Add New Pages
1. Create new HTML file
2. Include required CSS and fonts
3. Add `<script src="js/header.js"></script>`
4. Add your content in `<main class="pt-20">`

## 📱 Responsive Breakpoints

- **Mobile**: < 1024px (lg)
- **Desktop**: ≥ 1024px (lg)

## 🎨 Styling Classes

### Navigation
- `.nav-link`: Main navigation links
- `.cta-button`: Call-to-action button
- `.company-logo-text`: Logo styling

### Products Dropdown
- `.category-tab`: Category buttons
- `.category-content`: Content sections
- `.products-overlay`: Dropdown container

## 🔗 Navigation Links

The header automatically handles these navigation patterns:
- `index.html#section`: Homepage sections
- `products.html`: Products page
- `contact-us.html`: Contact page
- `#section`: Same page sections

## 🚀 Benefits

1. **Consistency**: Same header across all pages
2. **Maintainability**: Update once, applies everywhere
3. **Performance**: No code duplication
4. **SEO-friendly**: Proper navigation structure
5. **Accessibility**: Screen reader friendly
6. **Mobile-first**: Responsive design

## 📝 Example Usage

See `products.html` for a complete example of how to implement the dynamic header system.

## 🔄 Updates

When you need to update the header:
1. Edit `header.html` with your changes
2. All pages will automatically use the updated header
3. No need to update individual pages

---

**Note**: Make sure all pages are served from a web server (not file:// protocol) for the fetch API to work properly. 