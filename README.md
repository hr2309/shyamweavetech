# Shyam Weavetech Corporate Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

**Shyam Weavetech** is a premium, high-performance static corporate website built for a modern textile and yarn manufacturing company. Engineered with a focus on B2B engagement, it features an elegant aesthetic, seamless animations, and integrated serverless contact forms to drive global business inquiries.

---

## 🚀 Features

- **Premium UI/UX Design**: Uses a curated navy and gold color palette, glassmorphism elements, and professional typography (`Bodoni Moda` and `Jost`).
- **Fully Responsive**: Optimized layout that scales perfectly across desktops, tablets, and mobile devices.
- **Dark & Light Mode**: Built-in CSS variable-based theming allowing users to seamlessly toggle between dark and light modes.
- **Advanced Serverless Email System**: Powered by Google Apps Script, featuring beautifully formatted HTML templates for company notifications, automated customer confirmation emails, and dynamic `Reply-To` headers.
- **Real-Time Form Validation**: Robust client-side validation built into JavaScript ensuring strict phone number formatting (exactly 10 digits) and alphabet-only name inputs for data integrity.
- **Global WhatsApp Modals**: Dedicated General and Product-specific WhatsApp modals designed to capture precise requirements before seamlessly routing the user to the WhatsApp app.
- **Micro-Interactions & Animations**: Features smooth `IntersectionObserver` fade-ins, animated numerical counters, and custom top-center sliding toast notifications for success/error states.
- **Modern CSS Architecture**: Utilizes native CSS variables, flexbox, CSS Grid, and custom scrollbars.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript (ES6)
- **Typography**: [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) (Serif), [Jost](https://fonts.google.com/specimen/Jost) (Sans-serif)
- **Backend/API**: Google Apps Script (For email endpoints via the `fetch` API)

---

## 📂 Project Structure

```text
tempshyam/
├── css/
│   └── style.css            # Main stylesheet (Variables, Reset, Layout, Components)
├── js/
│   └── main.js              # Core interactivity (Modals, Observers, Theme, API calls)
├── images/                  # Project image assets
├── index.html               # Landing page
├── about.html               # About Us / Company Profile
├── products.html            # Products Showcase
├── infrastructure.html      # Manufacturing Unit Details
├── quality.html             # Quality Control & Certifications
├── careers.html             # Job Openings & Culture
├── contact.html             # Main Contact Form & Location
└── README.md                # Project documentation
```

---

## 💻 Local Setup & Installation

Since this project uses vanilla web technologies, no build tools or package managers (`npm`/`yarn`) are required to run it locally.

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd tempshyam
   ```
2. **Run a local server**:
   You can use any local web server to run the project. E.g., if you have Python installed:
   ```bash
   # Python 3.x
   python -m http.server 8000
   ```
   Or using Node.js `serve`:
   ```bash
   npx serve .
   ```
3. **View the site**:
   Open `http://localhost:8000` (or the port provided by your server) in your browser.

---

## ✉️ Email Configuration (Google Apps Script)

The website uses a robust serverless architecture via Google Apps Script to forward form submissions to your email. It includes **HTML Email Templates**, an **Auto-Reply feature** for the sender, and dynamic **Reply-To routing**.

To update or manage the endpoint:
1. Open the included `Google_Apps_Script_Code.js` file.
2. Copy its contents into your Google Apps Script dashboard (`script.google.com`).
3. Deploy it as a **New Version** Web App.
4. Copy the Web App URL.
5. Open `js/main.js` and locate the `scriptURL` variable inside the `initContactForm` and `initEmailModal` functions.
6. Replace the string with your newly deployed Google Apps Script URL.

```javascript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

---

## 🚀 Deployment

This project is a static site and can be deployed for free on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

### Deploying to Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: `Other`, Build Command: empty) and click **Deploy**.

---

## 📄 License

This project is proprietary and built specifically for Shyam Weavetech.
