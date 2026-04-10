import Link from "next/link";

export default function IndustryDataPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a2a] sticky top-0 bg-[#0f0f0f] z-10">
        <div>
          <h1 className="text-white font-bold text-xl">
            📊 Why Suspense UI Matters — Industry Data
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">Dev Series</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 text-sm text-zinc-300 border border-zinc-700 rounded-md hover:bg-zinc-800 transition-colors"
        >
          ← Home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12 space-y-14">
        {/* Section 1 — Big Numbers */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            1. The Cost of Making Users Stare at Nothing
          </h2>
          <p className="text-zinc-400 mb-6">
            The most damning evidence from the giants of industry:
          </p>
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Company
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Finding
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {[
                  [
                    "Amazon",
                    "Every 100ms of added load time = 1% loss in sales (~$3.8B in today's revenue)",
                  ],
                  [
                    "Walmart",
                    "Every 1 second shaved off = 2% increase in conversions",
                  ],
                  ["Akamai", "A 100ms delay hurts conversion rates by 7%"],
                  [
                    "Google",
                    "Load time going from 1s → 3s = bounce rate increases 32%",
                  ],
                  [
                    "Google",
                    "Load time going from 1s → 7s = bounce rate increases 113%",
                  ],
                ].map(([company, finding]) => (
                  <tr
                    key={finding}
                    className="bg-[#141414] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="px-5 py-3 font-semibold text-[#a5f3fc] whitespace-nowrap">
                      {company}
                    </td>
                    <td className="px-5 py-3 text-zinc-300">{finding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-[#1a1a1a] border-l-4 border-violet-500 rounded-r-lg p-4 text-sm text-zinc-300">
            <strong className="text-white">The point:</strong> Users don&apos;t
            just abandon slow pages — they penalize you financially for every
            millisecond of blank screen. Suspense fallbacks give them{" "}
            <em>something</em> to look at while data loads.
          </div>
        </section>

        {/* Section 2 — 3 second cliff */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            2. The 3-Second Death Zone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                value: "53%",
                label: "of mobile visitors leave if load > 3s",
                color: "text-red-400",
              },
              {
                value: "22s",
                label: "average mobile page full load time",
                color: "text-yellow-400",
              },
              {
                value: "< 3s",
                label: "what users actually expect",
                color: "text-green-400",
              },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center"
              >
                <div className={`text-4xl font-bold mb-2 ${color}`}>
                  {value}
                </div>
                <div className="text-zinc-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#1a1a1a] border-l-4 border-red-500 rounded-r-lg p-4 text-sm text-zinc-300">
            <strong className="text-white">Suspense fixes this</strong> by
            letting your shell and layout render in milliseconds while data
            streams in — your user sees a page <em>instantly</em> instead of a
            blank screen for 22 seconds.
          </div>
        </section>

        {/* Section 3 — Skeleton vs Spinner */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            3. Skeleton Screens vs Spinners — Perceived Performance
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a] mb-6">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Loading Pattern
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Perceived Speed
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    User Happiness
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {[
                  ["Blank screen", "Slowest", "Worst", "bg-[#1f0d0d]"],
                  ["Spinner", "Baseline", "Neutral", "bg-[#141414]"],
                  [
                    "Skeleton screen",
                    "~30% faster perceived",
                    "Best ✅",
                    "bg-[#0d1a0d]",
                  ],
                ].map(([pattern, speed, happiness, bg]) => (
                  <tr
                    key={pattern}
                    className={`${bg} hover:brightness-110 transition-all`}
                  >
                    <td className="px-5 py-3 font-medium text-zinc-200">
                      {pattern}
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{speed}</td>
                    <td className="px-5 py-3 text-zinc-400">{happiness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300">
            {[
              "Users perceive skeleton screens as 30% faster than spinners — with identical actual load times",
              "Skeleton screens reduce abandonment by up to 30% vs blank screens (Nielsen Norman Group)",
              "Slow left-to-right wave animations are perceived as the fastest loading pattern of all",
              "Spinners cause uncertainty — users cannot estimate wait time, anxiety increases",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="text-green-400 mt-0.5 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 bg-[#1a1a1a] border-l-4 border-green-500 rounded-r-lg p-4 text-sm text-zinc-300">
            <strong className="text-white">The point:</strong> What you show{" "}
            <em>while loading</em> is just as important as how fast you actually
            load. A well-designed Suspense fallback makes your app <em>feel</em>{" "}
            fast even when it isn&apos;t.
          </div>
        </section>

        {/* Section 4 — Real World */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            4. Real-World Business Impact (2024–2025)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                company: "QuintoAndar",
                change: "Reduced INP by 80%",
                result: "+36% conversions",
                color: "border-green-700",
              },
              {
                company: "Desenio",
                change: "Platform performance overhaul",
                result: "-37% bounce rate\n+34% conversions",
                color: "border-blue-700",
              },
              {
                company: "Google CWV",
                change: "Meeting Core Web Vitals",
                result: "-24% abandonment",
                color: "border-violet-700",
              },
            ].map(({ company, change, result, color }) => (
              <div
                key={company}
                className={`bg-[#1a1a1a] border ${color} rounded-lg p-5`}
              >
                <div className="text-white font-bold text-base mb-1">
                  {company}
                </div>
                <div className="text-zinc-500 text-xs mb-3">{change}</div>
                <div className="text-green-400 font-semibold text-sm whitespace-pre-line">
                  {result}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Direct mapping */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            5. Why This Maps Directly to Suspense in Next.js
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1f0d0d] border border-[#7f1d1d] rounded-lg p-6 font-mono text-sm space-y-1">
              <p className="text-red-400 font-bold mb-3">Without Suspense</p>
              <p className="text-zinc-400">User hits page</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-red-400">Blank white screen</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-zinc-400">Wait 2–3 seconds...</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-red-400 font-bold">53% of users LEAVE ✗</p>
            </div>
            <div className="bg-[#0d1a0d] border border-[#166534] rounded-lg p-6 font-mono text-sm space-y-1">
              <p className="text-green-400 font-bold mb-3">
                With Suspense + Skeleton
              </p>
              <p className="text-zinc-400">User hits page</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-green-400">Layout renders (&lt;200ms)</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-green-400">Skeleton shows immediately</p>
              <p className="text-zinc-600">↓</p>
              <p className="text-green-400 font-bold">Content streams in ✅</p>
            </div>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Every{" "}
            <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1.5 py-0.5 rounded">
              &lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;
            </code>{" "}
            you wrap around a slow data component is preventing the 53%
            abandonment cliff, buying back the 7% conversion Akamai attributes
            to each 100ms of blank time, and giving users the perceived speed of
            a skeleton-driven UI.
          </p>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            Sources
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              [
                "Amazon: Every 100ms Cost 1% in Revenue",
                "https://www.conductor.com/academy/page-speed-resources/faq/amazon-page-speed-study/",
              ],
              [
                "Google: Mobile Page Speed Industry Benchmarks",
                "https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/",
              ],
              [
                "Google: Page Load Time vs Bounce Rate",
                "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks-load-time-vs-bounce/",
              ],
              [
                "Akamai: State of Online Retail Performance",
                "https://www.akamai.com/newsroom/press-release/akamai-releases-spring-2017-state-of-online-retail-performance-report",
              ],
              [
                "Nielsen Norman Group: Skeleton Screens 101",
                "https://www.nngroup.com/articles/skeleton-screens/",
              ],
              [
                "Skeleton Screens vs Spinners — UI Deploy",
                "https://ui-deploy.com/blog/skeleton-screens-vs-spinners-optimizing-perceived-performance",
              ],
              [
                "HubSpot: Page Load Time & Conversion Rate Statistics",
                "https://blog.hubspot.com/marketing/page-load-time-conversion-rates",
              ],
              [
                "Shopify: Website Load Time Statistics",
                "https://www.shopify.com/blog/website-load-time-statistics",
              ],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#93c5fd] hover:text-white transition-colors"
                >
                  → {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-sm border-t border-[#2a2a2a]">
        Master Luna&apos;s Village Dev Series — Prepared by Igor
      </footer>
    </div>
  );
}
