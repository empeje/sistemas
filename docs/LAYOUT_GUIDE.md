# Layout & Alignment Guide

## Overview

This guide documents the layout system and alignment strategies used throughout the Sistemas app, following Bootstrap 4 container standards for consistency with the main website.

---

## 1. Layout System

### Container System

The Sistemas app uses **Tailwind CSS** with custom breakpoints configured to match **Bootstrap 4's responsive container behavior**.

#### Bootstrap 4 Container Standards
- **≥ 992px (lg):** 960px max-width
- **≥ 1200px (xl):** 1140px max-width
- **Padding:** 15px left/right (consistent across all breakpoints)

#### Why Bootstrap Standards?

The main `website/` app uses Bootstrap 4, and Sistemas must match the same container widths for visual consistency across the entire enterprise brand. Users navigating between mpj.io (website) and Sistemas should experience identical layout alignment.

---

## 2. Tailwind Configuration

### Custom Breakpoints

Since Sistemas uses Tailwind CDN (not Bootstrap), we configured custom breakpoints in `index.html` to match Bootstrap 4:

```javascript
tailwind.config = {
  theme: {
    extend: {
      screens: {
        'lg': '992px',  // Bootstrap lg breakpoint
        'xl': '1200px', // Bootstrap xl breakpoint
      }
    }
  }
}
```

### Default Tailwind vs Bootstrap

| Breakpoint | Tailwind Default | Bootstrap 4 | Sistemas Config |
|------------|------------------|-------------|-----------------|
| `md:`      | 768px           | 768px       | 768px (default) |
| `lg:`      | **1024px**      | **992px**   | **992px** ✓     |
| `xl:`      | **1280px**      | **1200px**  | **1200px** ✓    |

By overriding `lg` and `xl`, we ensure Sistemas matches Bootstrap's behavior exactly.

---

## 3. Responsive Container Pattern

### Structure

All main content sections follow this pattern:

```jsx
<section className="w-full">
  <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px]">
    {/* Content */}
  </div>
</section>
```

### Breakdown

- `w-full` - Section spans full viewport width
- `max-w-[960px]` - Default max-width at ≥992px
- `xl:max-w-[1140px]` - Override to 1140px at ≥1200px
- `mx-auto` - Centers the container
- `px-[15px]` - Horizontal padding (matches Bootstrap)

---

## 4. Implemented Sections

### Navbar
```tsx
<nav className="w-full max-w-[960px] xl:max-w-[1140px] px-[15px] flex justify-end py-6">
  {/* Navigation links */}
</nav>
```
- **Location:** `components/Navbar.tsx`
- **Container:** Responsive (960px/1140px)
- **Alignment:** Right-aligned navigation items

---

### Hero Section
```tsx
<section className="hero-section flex items-center justify-center mb-10">
  <div className="max-w-[960px] xl:max-w-[1140px] w-full h-full flex flex-col md:flex-row items-stretch">
    {/* Hero content */}
  </div>
</section>
```
- **Location:** `components/Hero.tsx`
- **Container:** Responsive (960px/1140px)
- **Background:** Full-width dark (#040404)
- **Layout:** Two-column (architecture visual + text)

---

### Main Content
```tsx
<main className="w-full max-w-[960px] xl:max-w-[1140px] px-[15px] mb-20">
  <DesignSistemasSection />
  <ProblemGrid onSelectProblem={setSelectedProblem} />
</main>
```
- **Location:** `App.tsx`
- **Container:** Responsive (960px/1140px)
- **Content:** Design methodology + problem cards

---

### ConceptStrip
```tsx
<section className="as-seen-at-strip w-full mb-0 mt-20">
  <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px] text-center">
    {/* Core concepts */}
  </div>
</section>
```
- **Location:** `components/ConceptStrip.tsx`
- **Container:** Responsive (960px/1140px)
- **Background:** Full-width teal (#00917C)
- **Content:** Core mentorship focus keywords

---

### Footer
```tsx
<footer className="footer-bg w-full py-16">
  <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px] flex flex-col md:flex-row justify-between gap-12">
    {/* Footer columns */}
  </div>
</footer>
```
- **Location:** `components/Footer.tsx`
- **Container:** Responsive (960px/1140px)
- **Background:** Full-width grey (#e8e8e8)
- **Layout:** Three-column (copyright + navigation links)

---

## 5. Responsive Behavior

### Desktop (≥1200px)
- Container: **1140px** max-width
- Padding: 15px left/right
- Hero: Two-column layout
- Footer: Three-column layout

### Desktop Small (992px - 1199px)
- Container: **960px** max-width
- Padding: 15px left/right
- Hero: Two-column layout
- Footer: Three-column layout (may wrap)

### Tablet (768px - 991px)
- Container: 100% width (fluid)
- Padding: 15px left/right
- Hero: Stacks to single column at `md:` breakpoint
- Footer: May stack columns

### Mobile (<768px)
- Container: 100% width (fluid)
- Padding: 15px left/right
- Hero: Single column
- Footer: Single column (stacked)

---

## 6. Alignment Verification

### Visual Test

All content sections should align perfectly at their left edges:

1. **Open browser DevTools**
2. **Set viewport to 1200px width**
3. **Verify:** Navbar, Hero content, Main content, ConceptStrip content, Footer content all have the same left edge
4. **Set viewport to 992px width**
5. **Verify:** All sections still align (now at 960px width)

### Chrome DevTools Ruler

Use the "Select an element" tool and hover over each section's inner container. The computed width should match:
- At 1200px+ viewport: `1140px`
- At 992px-1199px viewport: `960px`

---

## 7. Common Pitfalls to Avoid

### ❌ DON'T: Use different max-widths
```tsx
// BAD: Inconsistent widths
<nav className="max-w-[1200px]">
<main className="max-w-[1140px]">
<footer className="max-w-[960px]">
```

### ✅ DO: Use consistent responsive pattern
```tsx
// GOOD: All sections use same pattern
<nav className="max-w-[960px] xl:max-w-[1140px]">
<main className="max-w-[960px] xl:max-w-[1140px]">
<footer className="max-w-[960px] xl:max-w-[1140px]">
```

---

### ❌ DON'T: Add padding to both outer and inner
```tsx
// BAD: Double padding
<section className="px-4">
  <div className="px-[15px]">
```

### ✅ DO: Add padding only to inner container
```tsx
// GOOD: Padding on inner only
<section className="w-full">
  <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px]">
```

---

### ❌ DON'T: Forget responsive breakpoint
```tsx
// BAD: Only one max-width
<div className="max-w-[1140px]">
```

### ✅ DO: Include both breakpoints
```tsx
// GOOD: Responsive at both breakpoints
<div className="max-w-[960px] xl:max-w-[1140px]">
```

---

## 8. Layout Best Practices

### When Creating New Sections

1. **Decide if full-width or not:**
   - Full-width: Hero banners, colored backgrounds (ConceptStrip, Footer)
   - Container-width: Regular page content (Main, Navbar)

2. **Use the pattern:**
   ```tsx
   {/* Full-width outer */}
   <section className="w-full bg-teal">
     {/* Constrained inner */}
     <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px]">
       {/* Content */}
     </div>
   </section>
   ```

3. **Test alignment:**
   - Compare with existing sections
   - Check at 992px viewport
   - Check at 1200px+ viewport
   - Verify mobile responsiveness

---

## 9. CSS Variables for Consistency

### Current Implementation

The app uses CSS custom properties for colors and spacing:

```css
:root {
  --color-primary: #00917c;
  --color-accent: #293c4b;
  --color-danger: #c15050;
  --color-blue: #28527a;
  --font-sans: "Trebuchet MS", "Source Sans Pro", "Lucida Grande", sans-serif;
}
```

### Container Variables (Future Enhancement)

Consider adding layout variables:

```css
:root {
  --container-lg: 960px;
  --container-xl: 1140px;
  --container-padding: 15px;
}
```

Then use with Tailwind arbitrary values:

```tsx
<div className="max-w-[var(--container-lg)] xl:max-w-[var(--container-xl)]">
```

---

## 10. Reference

### Related Documentation
- Main website layout system: `../website/docs/LAYOUT_GUIDE.md`
- Main website agents guide: `../website/AGENTS.md`

### External Resources
- [Bootstrap 4 Container Documentation](https://getbootstrap.com/docs/4.6/layout/overview/#containers)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind Configuration](https://tailwindcss.com/docs/configuration)

---

## Summary

### Key Principles
1. ✅ **Use responsive max-width** (`max-w-[960px] xl:max-w-[1140px]`) for all content sections
2. ✅ **Use 15px horizontal padding** consistently (`px-[15px]`)
3. ✅ **Full-width sections** break out with `w-full`, then constrain inner content
4. ✅ **Test alignment** at 992px and 1200px breakpoints
5. ✅ **Follow Bootstrap 4 container** patterns for brand consistency

### Checklist for New Sections
- [ ] Max-width uses responsive pattern: `max-w-[960px] xl:max-w-[1140px]`
- [ ] Horizontal padding is `px-[15px]`
- [ ] Full-width sections use `w-full` + inner container
- [ ] Tested at 992px viewport (should be 960px wide)
- [ ] Tested at 1200px+ viewport (should be 1140px wide)
- [ ] Aligns with existing sections (visual inspection)
- [ ] Mobile responsive (tested at <768px)

The layout system ensures perfect alignment across all sections and matches the main website's Bootstrap 4 container behavior! 📐✨
