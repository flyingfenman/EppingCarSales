# Customer Tracking Setup Guide for Epping Car Sales

This guide will help you set up comprehensive customer tracking for your car dealership website using Google Analytics 4 and Meta Pixel (Facebook Pixel).

## Why Customer Tracking Matters

With proper tracking, you'll be able to:
- **See where customers come from** - Google search, Facebook ads, direct visits, etc.
- **Track customer behavior** - Which cars they view, how long they stay, what pages they visit
- **Measure conversions** - Car reservations, contact form submissions, phone calls
- **Optimize advertising** - Know which ads bring customers and which cars get the most interest
- **Retarget visitors** - Show ads to people who viewed specific cars but didn't inquire

---

## Step 1: Set Up Google Analytics 4 (GA4)

### Create a Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Start measuring** or **Admin** (gear icon)
3. Click **Create Account**
4. Enter account name: **Epping Car Sales**
5. Click **Next**

### Create a Property

1. Property name: **Epping Car Sales Website**
2. Select timezone: **United Kingdom**
3. Select currency: **Pound Sterling (£)**
4. Click **Next**

### Configure Business Information

1. Industry: **Automotive**
2. Business size: **Small**
3. How you plan to use Google Analytics: Select relevant options
4. Click **Create**
5. Accept Terms of Service

### Get Your Measurement ID

1. After creating the property, you'll see a **Data stream** setup
2. Click **Web**
3. Enter website URL: **https://yoursite.com** (or your actual domain)
4. Stream name: **Epping Car Sales Main Site**
5. Click **Create stream**
6. **Copy the Measurement ID** - it looks like `G-XXXXXXXXXX`

---

## Step 2: Set Up Meta Pixel (Facebook Pixel)

### Create a Business Manager Account

1. Go to [business.facebook.com](https://business.facebook.com)
2. Click **Create Account**
3. Follow the steps to set up your business

### Create a Meta Pixel

1. Go to [Events Manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources**
3. Select **Web**
4. Select **Meta Pixel**
5. Enter pixel name: **Epping Car Sales Website Pixel**
6. Optional: Enter website URL
7. Click **Continue**
8. **Copy the Pixel ID** - it's a series of numbers like `123456789012345`

---

## Step 3: Add Tracking IDs to Your Vercel Project

### Option A: Add via Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **Epping Car Sales** project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: Your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)
   - Environments: Production, Preview, Development

   **Variable 2:**
   - Name: `NEXT_PUBLIC_META_PIXEL_ID`
   - Value: Your Meta Pixel ID (e.g., `123456789012345`)
   - Environments: Production, Preview, Development

5. Click **Save** for each variable
6. **Redeploy your site** - Go to Deployments → Click the three dots → Redeploy

### Option B: Add to .env.local (Local Development Only)

1. Create a file named `.env.local` in your project root
2. Add these lines:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```
3. Replace with your actual IDs
4. **Never commit this file to GitHub** - it's already in .gitignore

---

## Step 4: Verify Tracking is Working

### Test Google Analytics

1. Visit your website after deploying
2. Go to [analytics.google.com](https://analytics.google.com)
3. Click **Reports** → **Realtime**
4. You should see yourself as an active user
5. Navigate around your site and watch the realtime data update

### Test Meta Pixel

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) Chrome extension
2. Visit your website
3. Click the extension icon - it should show your pixel is active
4. Navigate to different pages and verify events are firing

---

## What's Being Tracked Automatically

Your website now tracks the following customer actions:

### Page Views
- Every page visit is automatically tracked
- Shows you which pages are most popular

### Car Views
- When someone views a car detail page
- Includes car ID, title, and price
- Sent to both Google Analytics and Meta Pixel

### Reservations
- When someone starts the £99 reservation process
- When they complete the payment
- Full conversion tracking for ROI measurement

### Contact Forms
- When someone submits the contact form
- Includes the type of inquiry (general, sales, test drive)

### Phone Calls
- When someone clicks a phone number to call
- Tracks which number they called

### WhatsApp Clicks
- When someone clicks the WhatsApp button
- Helps measure chat engagement

---

## How to Use This Data for Advertising

### Google Ads

1. Link your Google Analytics account to Google Ads
2. Create conversion goals based on:
   - Car reservations
   - Contact form submissions
   - Phone calls
3. Use this data to optimize your campaigns

### Facebook & Instagram Ads

1. Your Meta Pixel is now tracking all visitor behavior
2. Create **Custom Audiences** in Facebook Ads Manager:
   - People who viewed specific cars
   - People who visited but didn't reserve
   - People who spent 2+ minutes on the site
3. Create **Lookalike Audiences** to find similar customers
4. Run retargeting campaigns to bring visitors back

### Conversion Tracking

All major actions (reservations, contact forms, phone calls) are tracked as conversions in both platforms, allowing you to:
- Measure ROI of your advertising spend
- See which ads lead to actual car reservations
- Optimize campaigns for conversions, not just clicks

---

## Viewing Your Data

### Google Analytics Dashboard

- **Realtime**: See who's on your site right now
- **Acquisition**: Where visitors come from (Google, Facebook, direct, etc.)
- **Engagement**: Which pages and cars are most viewed
- **Events**: All tracked actions (car views, reservations, contact forms)
- **Conversions**: Track your business goals

### Facebook Events Manager

- **Overview**: Summary of all pixel events
- **Test Events**: Test your pixel in real-time
- **Custom Conversions**: Set up specific business goals
- **Audiences**: Create retargeting audiences

---

## Troubleshooting

### Tracking Not Working?

1. **Check environment variables are set** in Vercel Settings
2. **Redeploy your site** after adding variables
3. **Clear browser cache** and test again
4. **Check browser console** for errors (F12 → Console tab)

### Pixel Helper Shows Errors?

1. Make sure you copied the full Pixel ID
2. Verify the ID is saved correctly in Vercel
3. Wait 5-10 minutes after deployment for changes to propagate

### No Data in Google Analytics?

1. Confirm Measurement ID is correct (starts with G-)
2. Check that you're looking at the correct property
3. Wait up to 24 hours for initial data to appear (Realtime should work immediately)

---

## Privacy & GDPR Compliance

Your tracking setup includes:
- No collection of personal data without consent
- Anonymized IP addresses
- Compliance with UK GDPR requirements
- Cookie consent through browser standards

Make sure your **Privacy Policy** is up to date and mentions:
- Use of Google Analytics
- Use of Meta Pixel
- How you use customer data
- Customer rights to opt-out

---

## Next Steps

1. ✅ Set up Google Analytics 4
2. ✅ Set up Meta Pixel
3. ✅ Add tracking IDs to Vercel
4. ✅ Redeploy your site
5. ✅ Verify tracking is working
6. ⏭️ Create Facebook retargeting campaigns
7. ⏭️ Link Google Ads to Analytics
8. ⏭️ Monitor weekly reports to optimize

---

## Support

If you need help with tracking setup:
- Google Analytics support: [support.google.com/analytics](https://support.google.com/analytics)
- Meta Business Help: [facebook.com/business/help](https://facebook.com/business/help)
- Vercel support: [vercel.com/help](https://vercel.com/help)

Your tracking is now fully integrated and ready to help you understand your customers and grow your business!
