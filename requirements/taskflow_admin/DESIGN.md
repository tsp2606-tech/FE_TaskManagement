---
name: TaskFlow Admin
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
  status-todo-bg: '#F1F5F9'
  status-todo-text: '#475569'
  status-doing-bg: '#EEF2FF'
  status-doing-text: '#4338CA'
  status-done-bg: '#DCFCE7'
  status-done-text: '#15803D'
  priority-low-bg: '#F0FDF4'
  priority-low-text: '#166534'
  priority-medium-bg: '#EFF6FF'
  priority-medium-text: '#1E40AF'
  priority-high-bg: '#FEF2F2'
  priority-high-text: '#991B1B'
  warning-amber: '#D97706'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-margin: 24px
  gutter: 16px
  sidebar-width: 260px
  header-height: 64px
---

## Brand & Style

The design system is engineered for **TaskFlow Admin**, a productivity-centric environment where utility and speed of comprehension are paramount. The brand personality is professional, disciplined, and reliable, catering to individual power users and small teams who require a no-nonsense interface to manage complex workflows.

The chosen design style is **Minimalism with a Corporate Modern edge**. It avoids decorative flourishes in favor of high-density data presentation and clear functional signaling. The aesthetic relies on heavy whitespace to reduce cognitive load, precise alignment to imply order, and a "Card-on-Surface" architecture to create a structured hierarchy. The interface feels like a sophisticated tool—robust, predictable, and focused on the task at hand.

## Colors

This design system utilizes a refined, utility-first color palette. The primary color is a confident Blue (`#2563EB`), used for primary actions and brand presence. A secondary Slate Gray (`#64748B`) provides a neutral foundation for text and icons.

Functional colors are critical for scannability:
- **Status Workflow**: Follows a progression from neutral/cool to positive. "Doing" uses an Indigo tint to differentiate from the standard Blue primary.
- **Priority**: Uses a traditional traffic-light logic but with lowered saturation (muted backgrounds) to ensure that multiple badges on a screen do not cause visual vibration.
- **Surface Tones**: Backgrounds use a very subtle light gray (`#F8FAFC`) to allow white cards (`#FFFFFF`) to pop, creating a clear sense of depth without relying on heavy shadows.

## Typography

The typographic strategy balances modern character with technical precision. 

- **Hanken Grotesk** is used for headings to provide a clean, sharp, and contemporary feel. 
- **Inter** is the workhorse for body text and UI controls, chosen for its exceptional legibility in data-dense environments.
- **JetBrains Mono** is utilized sparingly for metadata, IDs, and timestamps, reinforcing the "Admin" and technical nature of the application.

Hierarchy is maintained through weight and scale. For mobile, headline sizes are aggressively reduced to maximize screen real estate for task content.

## Layout & Spacing

The design system employs a **Fluid-Fixed Hybrid Grid**. The Sidebar is fixed at `260px`, while the main content area expands to fill the remaining width, ensuring flexibility across various monitor sizes.

- **Spacing Rhythm**: Based on a 4px baseline. Most internal padding for cards and modals should use `16px` (base * 4) or `24px` (base * 6).
- **Kanban Layout**: Specifically uses a horizontal scrollable container on mobile and a 3-column distribution on desktop with `16px` gaps.
- **Tables**: Use a high-density approach with `12px` vertical padding for rows to maximize the number of visible tasks.
- **Breakpoints**: 
  - Mobile (<768px): Sidebar collapses to a hamburger menu. Margins reduce to `16px`.
  - Tablet (768px - 1024px): 2-column Kanban or List view preferred.
  - Desktop (>1024px): Full dashboard with 3-column Kanban or wide Data Table.

## Elevation & Depth

To maintain a clean, professional aesthetic, this design system uses **Tonal Layering** supplemented by **Low-Contrast Outlines**.

- **Level 0 (Background)**: `#F8FAFC`. Used for the main canvas.
- **Level 1 (Cards/Sidebar)**: `#FFFFFF`. Uses a `1px` border of `#E2E8F0`. No shadow is used for static cards to keep the UI flat and fast.
- **Level 2 (Hover/Active)**: Elements like Kanban cards show a very soft, diffused shadow (`0 4px 12px rgba(0,0,0,0.05)`) when hovered to indicate interactivity.
- **Level 3 (Modals/Dropdowns)**: These elevated components use a more pronounced shadow to separate them from the interface and include a backdrop blur (8px) to focus user attention.

## Shapes

The shape language is **Soft and Efficient**. A `0.25rem` (4px) corner radius is applied to small interactive elements like checkboxes and small buttons. Standard components like Cards, Modals, and Input Fields use a `0.5rem` (8px) radius. This provides a modern touch without appearing overly "bubbly" or consumer-oriented, maintaining the professional admin tone.

## Components

- **Buttons**: Primary buttons are solid Blue. Secondary buttons use a white background with a gray border. Icon buttons should be used for actions like "Edit" or "Delete" in table rows to save space.
- **Badges**: Status and Priority badges use "Subtle" styling—lightly tinted backgrounds with darker text for high contrast. They should have a slightly smaller font size (`12px`) and medium weight.
- **Data Tables**: Feature a fixed header. The "Title" column should be bolded. Row hover states are mandatory.
- **Kanban Cards**: Contain a Title, a truncated 2-line Description, a priority badge at the top right, and a "Next Action" arrow button at the bottom right.
- **Input Fields**: Use a standard `1px` border. The focus state must have a `2px` Blue outline. Use placeholder text sparingly; prefer clear labels.
- **Timeline**: In the task detail modal, the workflow timeline (`Todo -> Doing -> Done`) should use a connector line with circular nodes. Completed steps are filled green; the current step is outlined Blue.
- **Modals**: Centered for "Add/Edit" tasks; side-drawers for "Detail View" to allow users to reference the list behind it.