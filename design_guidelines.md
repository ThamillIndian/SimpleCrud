# Design Guidelines for Product Inventory CRUD Application

## Design Approach
**Utility-Focused Design System Approach**: Given this is a productivity tool for inventory management, I'm selecting **Material Design** principles for clean, functional interfaces with subtle visual feedback that enhances usability without distraction.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 239 68% 68% (modern blue)
- Background: 0 0% 98% (warm white)
- Surface: 0 0% 100% (pure white)
- Text Primary: 220 13% 18% (dark charcoal)
- Text Secondary: 220 9% 46% (medium gray)
- Border: 220 13% 91% (light gray)

**Dark Mode:**
- Primary: 239 84% 67% (brighter blue)
- Background: 222 84% 5% (very dark blue)
- Surface: 217 33% 17% (dark surface)
- Text Primary: 210 40% 98% (near white)
- Text Secondary: 215 20% 65% (light gray)
- Border: 217 33% 26% (dark border)

### Typography
- **Primary Font**: Inter (Google Fonts) - modern, highly legible
- **Headings**: 600 weight, sizes from text-xl to text-3xl
- **Body Text**: 400 weight, text-sm and text-base
- **UI Labels**: 500 weight, text-sm

### Layout System
**Tailwind Spacing Primitives**: Use units of 3, 4, 6, and 8 for consistent spacing
- Padding: p-3, p-4, p-6, p-8
- Margins: m-3, m-4, m-6, m-8
- Gaps: gap-3, gap-4, gap-6, gap-8

### Component Library

**Navigation & Layout:**
- Clean header with app title and minimal navigation
- Sidebar-free single-page layout for simplicity
- Consistent 8-unit padding on main content areas

**Data Display:**
- **Product Table**: Clean rows with subtle hover states, alternating row backgrounds in light mode only
- **Product Cards**: Optional grid view with rounded corners (rounded-lg) and subtle shadows
- **Status Indicators**: Subtle color coding for low stock warnings

**Forms & Inputs:**
- **Input Fields**: Clean borders, focused ring states, consistent height (h-10)
- **Buttons**: Primary (solid), Secondary (outline), Destructive (red) variants
- **Form Layouts**: Vertical stacking with consistent gap-4 spacing

**Modals & Overlays:**
- **Edit Modal**: Centered overlay with backdrop blur
- **Delete Confirmation**: Simple dialog with clear action buttons
- **Form Validation**: Subtle error states with red text and border highlights

**Interactive Elements:**
- **Add Product Button**: Prominent primary button, top-right placement
- **Action Buttons**: Small, icon-based edit/delete buttons in table rows
- **Search/Filter**: Clean input field with search icon

### Visual Hierarchy
- **Page Title**: text-2xl font-semibold
- **Section Headers**: text-lg font-medium
- **Table Headers**: text-sm font-medium uppercase tracking-wide
- **Product Names**: text-base font-medium
- **Metadata**: text-sm text-secondary

### Interaction Design
- **Hover States**: Subtle background color changes on interactive elements
- **Loading States**: Simple spinner for async operations
- **Success Feedback**: Brief toast notifications for successful operations
- **Error Handling**: Clear, contextual error messages

### Responsive Design
- **Desktop-First**: Optimized for inventory management workflows
- **Mobile Adaptation**: Stack table columns, collapsible sidebar if needed
- **Breakpoints**: Focus on md (768px) and lg (1024px) breakpoints

This design system prioritizes clarity, efficiency, and professional aesthetics suitable for business inventory management while maintaining modern web standards and accessibility.