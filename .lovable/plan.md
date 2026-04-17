
## Washmen Live Order — Redesign

A modernized take on the live order screen. Mobile-first, single page, washmen mint + deep purple identity preserved but with a cleaner hierarchy, an animated horizontal stepper, and quick actions front-and-center.

### Layout (top → bottom)

1. **Header**
   - Back chevron · "Order CUD137" (smaller, monospaced ID chip) · Support icon button
   - Soft mint gradient background that fades into the page

2. **Hero status card** (mint background, rounded-3xl)
   - Big bold current stage label: "Out for delivery"
   - Sub: "Today, Sat · Anytime during the day"
   - Subtle floating laundry-bag illustration on the right
   - **Animated horizontal stepper** below: 5 dots connected by a line
     - Completed dots filled deep-purple with check
     - Active dot pulses + animated gradient progress fill from previous dot
     - Future dots outlined/grey
     - Stage labels under each dot (Received · Collected · Processing · Delivery · Complete)
   - Tappable: tapping a completed dot reveals its timestamp in a small popover

3. **Quick actions row** (4 pill buttons, horizontal scroll on small screens)
   - Reschedule · Add instructions · Edit address · Contact support
   - Each: icon on top, label below, soft purple-tinted card, press animation (scale)

4. **Delivery details card**
   - "Delivery at door" with edit icon
   - Where / When rows, clean two-column layout
   - Map thumbnail strip at top of card (static styled SVG, no real map needed)

5. **Receipt summary card**
   - Items count · services chips (Wash & Fold, Iron) · total
   - "View full receipt" link with chevron

6. **Collapsible sections** (accordion, single-open)
   - Order Confirmations (Proof of Pickup, Items Received, Proof of Drop-off — each with status badge: done / pending)
   - Order Instructions
   - Services Selection

7. **Sticky bottom bar**
   - Primary "Track delivery" button (deep purple) + secondary ghost "Need help?"

### Visual system
- Palette: mint `#E8FBF6` surfaces, deep indigo `#1E1B4B` text/primary, lavender `#A78BFA` accents, off-white page bg
- Typography: large semibold headings, comfortable body, tabular numerals for times
- Cards: `rounded-2xl`, soft shadow, 1px hairline border
- Motion: stepper progress animates on mount, active dot pulses, cards fade-in stagger, button press scale-95
- All tokens defined in `index.css` + `tailwind.config.ts` (HSL semantic tokens, no hardcoded colors in components)

### Components to create
- `OrderHeader`
- `StatusHero` (with internal `HorizontalStepper`)
- `QuickActions`
- `DeliveryCard`
- `ReceiptCard`
- `OrderSections` (accordion)
- `BottomBar`

All wired into `src/pages/Index.tsx` with mock order data. Mobile-first, max-width container centered on desktop with a phone-frame feel.
