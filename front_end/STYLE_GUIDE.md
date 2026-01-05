# CourseHaven - Visual Style Guide

## 🎨 Color Palette

### Primary Colors
```
Orange Red (Primary CTA):     #FF4500 (orangered)
Dark Blue (Background):       rgba(25, 25, 112, 0.9)
Black (Dark Background):      rgba(0, 0, 0, 0.95)
White (Text):                 #ffffff
Light Gray (Secondary Text):  #d0d0d0
Silver (Tertiary Text):       silver / #c0c0c0
```

### Status Colors
```
Success (Owned Badge):        rgba(76, 175, 80, 0.2) / #81c784
Error (Messages):             rgba(255, 68, 68, 0.15) / #ff9999
Warning:                      #FF6B35 (hover state)
```

---

## 🔤 Typography

### Font Family
```
Primary: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
```

### Font Sizes (Examples)
```
H1 (Main heading):    2-3vw (varies by context)
H2 (Section):         2.2vw
H3 (Card title):      1.1vw
Body Text:            1vw
Small Text:           0.95vw
Label Text:           0.9vw
```

### Font Weights
```
Regular:              400
Medium:               500
Semi-Bold:            600
Bold:                 700
Extra Bold:           800 (not used but available)
```

---

## 📐 Spacing System

### Viewport-Based Units
```
1vw = 1% of viewport width
1vh = 1% of viewport height

Examples:
- Large padding: 3vh, 3vw
- Medium padding: 2vh, 2vw
- Small padding: 1.2vh, 1.5vw
- Extra small: 0.5vh, 0.8vw
```

### Common Gaps
```
Large gap:     4vh (between major sections)
Medium gap:    2vh (between items)
Small gap:     1.2vh (within components)
Tiny gap:      0.5vh (between inline items)
```

---

## 🔘 Button Styles

### Primary Button
```css
background-color: orangered (#FF4500)
color: white
border: none
padding: 1.2vh 2vw
border-radius: 0.5vw
font-weight: 600
transition: all 0.3s ease

On hover:
- background-color: #ff6b35 (lighter orange)
- transform: translateY(-2px)
- box-shadow: 0 0.5vw 1.2vw rgba(255, 69, 0, 0.3)
```

### Secondary Button
```css
background-color: transparent
color: white
border: 2px solid white
padding: 1.2vh 2vw
border-radius: 0.5vw
font-weight: 600
transition: all 0.3s ease

On hover:
- background-color: white
- color: black
- transform: translateY(-2px)
```

### Tertiary Button (Text only)
```css
background-color: transparent
color: orangered
border: 1px solid orangered
padding: 0.8vh 1.5vw
border-radius: 0.5vw
font-weight: 600
transition: all 0.3s ease

On hover:
- background-color: orangered
- color: black
```

---

## 📝 Form Elements

### Input Fields
```css
padding: 1.1vh 1.2vw
border-radius: 0.5vw
border: 1px solid rgba(255, 255, 255, 0.2)
background-color: rgba(44, 58, 80, 0.95)
color: white
font-size: 1vw

On focus:
- border-color: orangered
- background-color: rgba(60, 70, 90, 0.95)
- box-shadow: 0 0 0.5vw rgba(255, 69, 0, 0.3)
```

### Placeholder Text
```css
color: rgba(255, 255, 255, 0.5)
opacity: 0.5
```

### Labels
```css
color: #d0d0d0
font-size: 1vw
font-weight: 600
margin-bottom: 0.8vh
```

---

## 🎯 Card Styles

### Course Card
```css
background-color: rgba(20, 20, 40, 0.9)
border: 1px solid rgba(255, 69, 0, 0.2)
border-radius: 0.8vw
padding: 1.5vw
transition: all 0.3s ease
box-shadow: none

On hover:
- border-color: orangered
- background-color: rgba(30, 30, 50, 0.95)
- box-shadow: 0 0.5vw 1.5vw rgba(255, 69, 0, 0.3)
- transform: translateY(-5px)
```

### Card Image
```css
width: 100%
height: 15vw (for course cards)
object-fit: cover
object-position: center
border-radius: 0.4vw
```

---

## 🎨 Navigation Elements

### Sidebar
```css
Width: 20-22vw (desktop)
background-color: rgba(0, 0, 0, 0.8)
border-right: 2px solid rgba(255, 69, 0, 0.2)
padding: 2vh 1.5vw
```

### Sidebar Link
```css
display: flex
align-items: center
gap: 1vw
padding: 1.2vh 1.2vw
color: #b0b0b0
text-decoration: none
border-radius: 0.5vw
transition: all 0.3s ease
font-size: 1vw
font-weight: 500

On hover:
- background-color: rgba(255, 69, 0, 0.1)
- color: orangered
- padding-left: 1.5vw
```

### Active Link
```css
background-color: rgba(255, 69, 0, 0.2)
color: orangered
border-left: 3px solid orangered
```

### Navbar
```css
padding: 2vh 7vw
display: flex
justify-content: space-between
background-color: rgba(0, 0, 0, 0.8)
border-bottom: 2px solid orangered
box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.5)
```

---

## 📊 Grid Layouts

### Courses Grid
```css
display: grid
grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr))
gap: 2vw
```

### Admin Cards
```css
display: grid
grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr))
gap: 2vw
```

### Responsive Adjustments
```
Desktop (>1024px):   repeat(3-4, 1fr)
Tablet (768px):      repeat(2-3, 1fr)
Mobile (<768px):     repeat(1-2, 1fr)
Extra small (<480px): 1fr (single column)
```

---

## 🌈 Hover & Interactive States

### Card Hover Effect
```
Transform: translateY(-5px)
Shadow: 0 0.5vw 1.5vw rgba(255, 69, 0, 0.3)
Border: orangered
Background: slightly lighter
Transition: 0.3s ease
```

### Button Hover Effect
```
Background: darker shade
Transform: translateY(-2px)
Shadow: 0 0.5vw 1.2vw rgba(255, 69, 0, 0.3)
Transition: 0.3s ease
```

### Input Focus Effect
```
Border: orangered
Shadow: 0 0 0.5vw rgba(255, 69, 0, 0.3)
Background: slightly lighter
Transition: 0.3s ease
```

---

## ✨ Special Styles

### Error Message
```css
background-color: rgba(255, 68, 68, 0.15)
color: #ff9999
padding: 1.2vh 1.5vw
border-radius: 0.5vw
border-left: 3px solid #ff4444
animation: slideDown 0.3s ease
```

### Badge (Owned)
```css
background-color: rgba(76, 175, 80, 0.2)
color: #81c784
padding: 0.5vh 1vw
border-radius: 0.3vw
font-size: 0.9vw
font-weight: 600
```

### Image Preview Container
```css
background-color: rgba(44, 58, 80, 0.5)
padding: 1.5vh
border-radius: 0.5vw
border: 1px solid rgba(255, 69, 0, 0.2)
```

---

## 🎬 Animations

### Slide Down
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-0.5vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 0.3s ease
```

### General Transitions
```css
transition: all 0.3s ease
(Used on: buttons, cards, links, inputs)
```

---

## 📱 Responsive Breakpoints

### Desktop
```css
>1024px:
- Full sidebars (20-22vw)
- Multi-column grids (3-4 columns)
- Large fonts and spacing
- All content visible
```

### Tablet
```css
768px - 1024px:
- Adjusted sidebars (25vw)
- 2-3 column grids
- Reduced font sizes
- Some spacing adjustments
```

### Mobile
```css
<768px:
- Sidebar text hidden (icons only)
- Single-double column grids
- Smaller fonts
- Optimized spacing
```

### Extra Small
```css
<480px:
- Sidebar moved above content
- Full-width single column
- Minimal padding
- Touch-optimized buttons
```

---

## 🎨 Design System Summary

| Element | Style | Hover | Notes |
|---------|-------|-------|-------|
| Primary Button | Orangered bg | Lighter orange + lift | Main CTAs |
| Secondary Button | Transparent + border | Fill with white | Alternative action |
| Input | Dark blue-gray bg | Orangered glow | Form fields |
| Card | Dark semi-transparent | Lift + glow | Content containers |
| Badge | Green tint | - | Status indicators |
| Error Message | Red tint + border | - | Feedback |
| Sidebar Link | Gray text | Orangered + lift | Navigation |
| Active Link | Orange bg + border | - | Current page |

---

## 🚀 Usage Tips

1. **Consistency**: Use these colors and styles across all new features
2. **Spacing**: Use vw/vh units to maintain scaling
3. **Transitions**: Always use 0.3s ease for interactive elements
4. **Colors**: Stick to the primary color palette
5. **Hover States**: Implement hover effects on all interactive elements
6. **Accessibility**: Maintain good contrast ratios
7. **Responsive**: Test on multiple breakpoints
8. **Typography**: Use consistent font sizes and weights

---

This style guide ensures consistency throughout the CourseHaven application and makes it easy to maintain and extend!
