import Link from "next/link";

export default async function SuspenseOverviewPage() {
  const timeout = 4000;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(timeout);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a2a] sticky top-0 bg-[#0f0f0f] z-10">
        <div>
          <h1 className="text-white font-bold text-xl">
            ⚡ Suspense Boundaries: React vs Next.js
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
        {/* Intro */}
        <section>
          <p className="text-zinc-400 text-lg leading-relaxed">
            A{" "}
            <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-[#a5f3fc] text-base">
              &lt;Suspense&gt;
            </code>{" "}
            boundary is a React component that{" "}
            <strong className="text-white">
              catches children that are not ready yet
            </strong>{" "}
            and shows a fallback UI (spinner, skeleton) until they finish
            loading. Think of it as a{" "}
            <strong className="text-white">
              try/catch — but for loading states
            </strong>
            , not errors.
          </p>
          <pre className="mt-6 bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`<Suspense fallback={<LoadingSpinner />}>
  <SlowComponent />
</Suspense>`}
          </pre>
        </section>

        {/* React Core */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            React Suspense (Core)
          </h2>

          <h3 className="text-lg font-semibold text-white mb-3">
            What triggers Suspense?
          </h3>
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Trigger
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Supported?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {[
                  ["React.lazy() — code splitting", "✅ Yes"],
                  ["use() hook with a Promise", "✅ Yes"],
                  ["Suspense-enabled frameworks (Relay)", "✅ Yes"],
                  ["useEffect data fetching", "❌ No"],
                  ["Event handler fetching", "❌ No"],
                ].map(([trigger, supported]) => (
                  <tr
                    key={trigger}
                    className="bg-[#141414] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-[#a5f3fc] text-xs">
                      {trigger}
                    </td>
                    <td className="px-5 py-3">{supported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            Basic Example
          </h3>
          <pre className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`import { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}`}
          </pre>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            Nested Boundaries — Progressive Loading
          </h3>
          <pre className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`function ArtistPage() {
  return (
    <Suspense fallback={<PageSpinner />}>          // outer
      <Biography />
      <Suspense fallback={<AlbumsSkeleton />}>    // inner
        <Albums />
      </Suspense>
    </Suspense>
  );
}`}
          </pre>
          <ol className="mt-4 space-y-2 text-sm text-zinc-400 list-decimal list-inside">
            <li>
              User sees{" "}
              <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                &lt;PageSpinner /&gt;
              </code>
            </li>
            <li>
              <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                &lt;Biography /&gt;
              </code>{" "}
              loads → user sees it immediately
            </li>
            <li>
              <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                &lt;Albums /&gt;
              </code>{" "}
              still loading → user sees{" "}
              <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                &lt;AlbumsSkeleton /&gt;
              </code>
            </li>
            <li>Albums done → full page visible</li>
          </ol>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            Using use() with Suspense (React 19+)
          </h3>
          <pre className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`// Parent passes promise — does NOT await it
function Page() {
  const postsPromise = getPosts();
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <Posts promise={postsPromise} />
    </Suspense>
  );
}

// Child consumes it — this triggers Suspense
'use client';
import { use } from 'react';

function Posts({ promise }) {
  const posts = use(promise); // suspends until resolved
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`}
          </pre>
        </section>

        {/* Next.js */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            Next.js Suspense (App Router)
          </h2>
          <p className="text-zinc-400 mb-6">
            Next.js builds on top of React Suspense and adds its own conventions
            and SSR streaming capabilities.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">
            Method 1: loading.tsx — Automatic Suspense
          </h3>
          <p className="text-zinc-400 text-sm mb-3">
            Drop a{" "}
            <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
              loading.tsx
            </code>{" "}
            next to your{" "}
            <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
              page.tsx
            </code>
            . Next.js auto-wraps your page in a Suspense boundary.
          </p>
          <pre className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`app/
  dashboard/
    loading.tsx     ← auto Suspense fallback
    page.tsx        ← async Server Component
    layout.tsx

// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchDashboardData(); // loading.tsx shows meanwhile
  return <Dashboard data={data} />;
}`}
          </pre>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            Method 2: Manual &lt;Suspense&gt; — Granular Streaming
          </h3>
          <pre className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 text-[#a5f3fc] text-sm overflow-x-auto">
            {`// app/dashboard/page.tsx
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>
      <h1>Dashboard</h1>

      {/* Each streams independently */}
      <Suspense fallback={<CardsSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<CardsSkeleton />}>
        <LatestInvoices />
      </Suspense>
    </main>
  );
}

// async Server Component — owns its data
async function RevenueChart() {
  const revenue = await fetchRevenue();
  return <BarChart data={revenue} />;
}`}
          </pre>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            React vs Next.js — Side by Side
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Feature
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    React (Vanilla)
                  </th>
                  <th className="text-left px-5 py-3 text-zinc-300 font-semibold">
                    Next.js (App Router)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {[
                  ["Manual <Suspense> wrapping", "✅", "✅"],
                  ["loading.js auto-wrapping", "❌", "✅"],
                  ["SSR streaming to browser", "Requires setup", "✅ Built-in"],
                  ["Async Server Components", "❌ (client only)", "✅"],
                  ["use() hook support", "✅ React 19+", "✅"],
                  ["React.lazy()", "✅", "✅ (client only)"],
                  ["Layout protection", "❌", "✅"],
                ].map(([feature, react, nextjs]) => (
                  <tr
                    key={feature}
                    className="bg-[#141414] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="px-5 py-3 text-zinc-300">{feature}</td>
                    <td className="px-5 py-3 text-zinc-400">{react}</td>
                    <td className="px-5 py-3 text-zinc-400">{nextjs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1f0d] border border-[#166534] rounded-lg p-6">
              <h3 className="text-[#4ade80] font-semibold mb-4">✅ Do</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>
                  Move slow fetches into their own async Server Components
                </li>
                <li>
                  Use{" "}
                  <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                    loading.tsx
                  </code>{" "}
                  for full route segment loading states
                </li>
                <li>
                  Use manual{" "}
                  <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                    &lt;Suspense&gt;
                  </code>{" "}
                  for granular page control
                </li>
                <li>Give each boundary a meaningful skeleton</li>
              </ul>
            </div>
            <div className="bg-[#1f0d0d] border border-[#7f1d1d] rounded-lg p-6">
              <h3 className="text-[#f87171] font-semibold mb-4">❌ Avoid</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>
                  Awaiting multiple independent fetches sequentially at the page
                  level
                </li>
                <li>
                  Wrapping layouts in{" "}
                  <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                    &lt;Suspense&gt;
                  </code>
                </li>
                <li>
                  Skipping{" "}
                  <code className="text-[#a5f3fc] bg-[#1e1e1e] px-1 rounded">
                    loading.tsx
                  </code>{" "}
                  for slow page fetches
                </li>
                <li>Using a single global spinner for the whole page</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mental Model */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2a2a]">
            The Mental Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-[#f87171] font-semibold mb-4">
                Without Suspense
              </h3>
              <div className="font-mono text-sm space-y-1 text-zinc-400">
                <p>User hits page</p>
                <p>↓</p>
                <p className="text-red-400">Blank white screen</p>
                <p>↓</p>
                <p>Wait 2–3 seconds...</p>
                <p>↓</p>
                <p className="text-red-400">53% of users LEAVE</p>
              </div>
            </div>
            <div className="bg-[#0d1a0d] border border-[#166534] rounded-lg p-6">
              <h3 className="text-[#4ade80] font-semibold mb-4">
                With Suspense + Streaming
              </h3>
              <div className="font-mono text-sm space-y-1 text-zinc-400">
                <p>User hits page</p>
                <p>↓</p>
                <p className="text-green-400">Layout renders (&lt;200ms)</p>
                <p>↓</p>
                <p className="text-green-400">Skeleton shows immediately</p>
                <p>↓</p>
                <p className="text-green-400">Content streams in ✅</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-sm border-t border-[#2a2a2a]">
      Dev Series
      </footer>
    </div>
  );
}
