# 🚀 Titan Terminal

## About Titan Exchange

**Titan Exchange** is a next-generation Meta DEX Aggregator built for the Solana ecosystem. Titan's mission is to help users achieve outperformance on their token swaps by always finding the best price across all available routes and aggregators—without any extra fees.

### Key Features

- **Meta Aggregation:** Titan aggregates multiple DEX aggregators and routes your swap to the best available quote, ensuring you always get the most value for your trade.
- **Unique Algorithm (Kairos):** Titan's proprietary algorithm, Kairos, fixes common problems in route finding and delivers better prices for users 80% of the time.
- **No Extra Fees:** Titan does not charge additional fees for swaps.
- **Analytics & Referrals:** The platform provides detailed analytics on your swap performance and supports a referral system.
- **Solana-Powered:** Leveraging Solana's low-latency, low-cost transactions for a seamless trading experience.

### Why Titan?

With the explosion of on-chain liquidity and DEX options, it's hard for users to know if they're getting the best deal. Titan solves this by:
- Searching all available routes and aggregators in real time.
- Using advanced algorithms to optimize for price and slippage.
- Providing a transparent, user-friendly interface.

### Learn More

- **Docs:** [https://titandex.gitbook.io/titan](https://titandex.gitbook.io/titan)
- **App:** [https://app.titandex.io/welcome](https://app.titandex.io/welcome)
- **Telegram:** [https://t.me/TitanDexSol](https://t.me/TitanDexSol)
- **Blog:** [https://titandex.io/blog/titan-intro](https://titandex.io/blog/titan-intro)

---

## ✨ Features

- **Titan-branded UI** with custom colors, logo, and hero section
- **Meta DEX Aggregator**: Find the best swap routes across Solana
- **Responsive Design**: Works beautifully on desktop and mobile
- **Customizable Navigation**: Docs and Telegram links
- **No unnecessary dependencies**: Clean Next.js + Tailwind CSS stack

---

## 🧑‍💻 Tech Stack

- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- TypeScript (optional, depending on your setup)

---

## 🚦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd titan_terminal_clone
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Customization

- **Colors & Branding:**
  - All colors are defined in `tailwind.config.js` under the `titan` palette.
  - Update the logo in `src/icons/TitanLogo.tsx` and hero image in `public/` as needed.
- **Navigation:**
  - Edit `src/components/AppHeader/HeaderLinks.tsx` for Docs/Telegram links.
- **Footer:**
  - Social links have been removed for a clean look. Add your own in `src/components/Footer/Footer.tsx` if needed.

---

## 📄 Project Structure

```
titan_terminal_clone/
├── src/
│   ├── components/      # UI components (Header, Footer, etc.)
│   ├── icons/           # SVG icon components (Titan, Telegram, etc.)
│   ├── pages/           # Next.js pages
│   └── styles/          # Global styles (Tailwind)
├── public/              # Static assets (images, favicon, etc.)
├── tailwind.config.js   # Tailwind CSS config
├── package.json         # Project metadata & scripts
└── ...
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📢 Links

- [Titan Docs](https://titandex.gitbook.io/titan)
- [Telegram](https://t.me/TitanDexSol)
- [Titan DEX App](https://app.titandex.io/welcome)

---

## 📝 License

MIT
