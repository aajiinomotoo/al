# E-Jeep Tracking App - Design Guidelines

## Design Approach
**Reference-Based Design**: Follow the exact visual style, color scheme, and layout from the provided reference images. This is a functional, utility-focused application where consistency with the reference design is paramount.

## Core Design Principles
- **Functional Clarity**: Map-first interface prioritizing live tracking visibility
- **Split-Panel Layout**: Interactive map + informational white panel
- **Responsive Adaptation**: Desktop dual-panel, mobile stacked/overlay approach
- **Data Visualization**: Clean, scannable tables with hover-to-highlight interactions

## Typography
- Use clean, modern sans-serif fonts for maximum readability
- Establish hierarchy: Headers (medium-large), Table data (small-medium), Labels (small)
- Maintain consistent font weights across similar elements
- Ensure text remains legible on both map backgrounds and white panel

## Layout System

### Desktop Layout
- **Split-screen design**: Interactive map occupies majority of viewport, white panel fixed on right side
- **White panel**: Fixed width sidebar containing controls and data tables
- **Map area**: Fills remaining viewport space, contains station pins, route lines, and active e-jeep indicators
- **Panel positioning**: Top-right icons for Routes/Running E-jeeps navigation

### Mobile Layout  
- **Stacked layout**: Map on top, white panel below or as overlay
- **Touch-optimized**: Larger tap targets for mobile interactions
- **Scrollable content**: Panel content scrolls independently from map

### Spacing
Primary spacing units: Tailwind's 2, 4, 6, and 8 (0.5rem, 1rem, 1.5rem, 2rem)
- Panel padding: p-4 to p-6
- Table row spacing: py-2 to py-3
- Icon spacing: 4 to 6 units between elements
- Section gaps: gap-4 to gap-6

## Component Library

### Navigation Controls
- **Icon Buttons**: Road icon (Routes page) and Bus icon (Running E-jeeps page)
- **Position**: Upper right of white panel
- **Interaction**: Lightening transparency on hover with 3s transition
- **Active State**: Visual indicator showing current view

### Interactive Map
- **Base**: Leaflet.js or Mapbox GL JS integration
- **Zoom Controls**: Custom styled to match design, restricted zoom-out to keep building labels visible
- **Markers**: Two pin types for Line A and Line B stations
- **Route Visualization**: Polylines for both routes, highlightable on tap/click
- **Live E-jeep Markers**: Dynamic markers showing current e-jeep positions

### Data Table (Running E-jeeps)
- **Columns**: Line | Recent Stop | Next Stop | ETA
- **Row Structure**: Each row = one e-jeep
- **Hover/Click State**: Row highlight + corresponding map marker highlight + route trace
- **Scroll Behavior**: Vertical scroll within white panel, rows don't stack
- **Visual Treatment**: Follow exact color scheme from reference images

### Routes Display
- **Format**: List or card-based route information
- **Content**: Line A and Line B with all stations in order
- **Scroll**: Vertical scrolling through routes within panel

## Interaction Patterns

### Desktop Interactions
- **Hover**: Button transparency reduction (3s transition), table row highlighting
- **Click**: Toggle between Routes/Running E-jeeps views
- **Table Row Hover**: Simultaneous highlight of row + map marker + route path

### Mobile Interactions  
- **Tap**: All click interactions converted to tap
- **Table Row Tap**: Same highlighting behavior as desktop hover
- **Map**: Touch-optimized pan and zoom

## Map-Specific Requirements

### Station Pins
**Line A Stations** (7 stops in order):
1. AGS E-Jeep Station
2. Gate 2.5 E-Jeep Station
3. Leong Hall E-Jeep Station
4. Xavier Hall E-Jeep Station
5. Cervini Hall E-Jeep Station
6. Old Comms Building E-Jeep Station
7. Loyola House of Studies E-Jeep Station

**Line B Stations** (7 stops in order):
1. Arete E-Jeep Station
2. Xavier Hall E-Jeep Station
3. Cervini Hall E-Jeep Station
4. Ateneo Junior High School E-Jeep Station
5. Ateneo Senior High School FLC E-Jeep Station
6. Bellarmine Hall E-Jeep Station
7. Social Development Complex E-Jeep Station

### Route Visualization
- **Line A Route**: Distinct color polyline connecting Line A stations
- **Line B Route**: Distinct color polyline connecting Line B stations
- **Highlight State**: Route becomes prominent when corresponding e-jeep row selected
- **Building Labels**: Must remain visible at minimum zoom level

## Visual Hierarchy
1. **Primary Focus**: Live map with e-jeep positions
2. **Secondary**: Running e-jeeps table data
3. **Tertiary**: Navigation controls and routes information

## Accessibility
- Sufficient contrast between text and backgrounds
- Touch targets minimum 44x44px on mobile
- Keyboard navigation support for table rows
- Clear focus states for interactive elements

## Performance Considerations
- Optimize for less than 100 files as specified
- Prioritize map functionality implementation first
- Efficient real-time data updates for e-jeep positions
- Smooth animations limited to essential transitions only