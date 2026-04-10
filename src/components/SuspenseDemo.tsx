/**
 * ============================================================
 *  SUSPENSE BOUNDARIES DEMO COMPONENT
 *  Dev Series
 *
 *  This file demonstrates Suspense patterns for both:
 *    - Pure React (client-side, using React.lazy + use())
 *    - Next.js App Router (async Server Components + loading.js pattern)
 *
 *  Run this in a React 19+ or Next.js 14+ project.
 * ============================================================
 */

"use client";

import {
  Suspense,
  lazy,
  use,
  useState,
  startTransition,
  useTransition,
} from "react";

// ─────────────────────────────────────────────
// MOCK DATA FETCHERS
// (Simulates slow API calls with delays)
// ─────────────────────────────────────────────

function fakeFetch<T>(data: T, delayMs: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

const fetchUserProfile = () =>
  fakeFetch({ name: "Dr. Frankenstein", role: "Lead Architect" }, 1200);

const fetchRecentActivity = () =>
  fakeFetch(
    [
      { id: 1, action: "Deployed to production", time: "2 min ago" },
      { id: 2, action: "Merged PR #42", time: "15 min ago" },
      { id: 3, action: "Reviewed Suspense docs", time: "1 hr ago" },
    ],
    2500,
  );

const fetchMetrics = () =>
  fakeFetch({ uptime: "99.9%", requests: "1.2M", errors: "0.01%" }, 1800);

// ─────────────────────────────────────────────
// SKELETON COMPONENTS
// (Shown while real content loads)
// ─────────────────────────────────────────────

function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div style={styles.skeletonCard}>
      <div style={{ ...styles.skeletonLine, width: "60%", marginBottom: 12 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{ ...styles.skeletonLine, width: `${80 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// DEMO 1: React.lazy() — Code Splitting
// Simulates a heavy component loaded on demand
// ─────────────────────────────────────────────

// In a real app this would be: lazy(() => import('./HeavyChart'))
const LazyHeavyWidget = lazy(
  () =>
    new Promise<{ default: () => React.ReactElement }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: function HeavyWidget() {
              return (
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>📊 Heavy Widget</h3>
                  <p style={styles.muted}>
                    Loaded lazily via <code>React.lazy()</code> — code split,
                    only downloaded when needed!
                  </p>
                  <div style={styles.badge}>Bundle chunk loaded ✅</div>
                </div>
              );
            },
          }),
        2000,
      ),
    ),
);

// ─────────────────────────────────────────────
// DEMO 2: use() Hook — Promise Streaming
// Parent passes promise, child consumes with use()
// ─────────────────────────────────────────────

function UserProfile({
  promise,
}: {
  promise: Promise<{ name: string; role: string }>;
}) {
  const user = use(promise); // suspends until resolved
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>👤 User Profile</h3>
      <p>
        <strong>{user.name}</strong>
      </p>
      <p style={styles.muted}>{user.role}</p>
      <div style={styles.badge}>Loaded via use() ✅</div>
    </div>
  );
}

function RecentActivity({
  promise,
}: {
  promise: Promise<{ id: number; action: string; time: string }[]>;
}) {
  const activity = use(promise); // suspends until resolved
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>⚡ Recent Activity</h3>
      <ul style={styles.list}>
        {activity.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <span>{item.action}</span>
            <span style={styles.muted}>{item.time}</span>
          </li>
        ))}
      </ul>
      <div style={styles.badge}>Loaded via use() ✅</div>
    </div>
  );
}

function Metrics({
  promise,
}: {
  promise: Promise<{ uptime: string; requests: string; errors: string }>;
}) {
  const metrics = use(promise);
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>📈 System Metrics</h3>
      <div style={styles.metricsGrid}>
        <div style={styles.metricItem}>
          <div style={styles.metricValue}>{metrics.uptime}</div>
          <div style={styles.muted}>Uptime</div>
        </div>
        <div style={styles.metricItem}>
          <div style={styles.metricValue}>{metrics.requests}</div>
          <div style={styles.muted}>Requests</div>
        </div>
        <div style={styles.metricItem}>
          <div style={styles.metricValue}>{metrics.errors}</div>
          <div style={styles.muted}>Error Rate</div>
        </div>
      </div>
      <div style={styles.badge}>Loaded via use() ✅</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DEMO 3: Nested Boundaries — Progressive Loading
// Each section streams in independently
// ─────────────────────────────────────────────

function NestedSuspenseDemo() {
  // Promises created once — not inside render
  const [promises] = useState(() => ({
    profile: fetchUserProfile(),
    activity: fetchRecentActivity(),
    metrics: fetchMetrics(),
  }));

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>
        Demo 2 &amp; 3: Nested Boundaries + <code>use()</code> Hook
      </h2>
      <p style={styles.description}>
        Three independent Suspense boundaries. Each streams in as its own data
        resolves. Profile (~1.2s) → Metrics (~1.8s) → Activity (~2.5s).
      </p>

      <div style={styles.grid}>
        {/* Boundary 1 — fastest */}
        <Suspense fallback={<SkeletonCard lines={2} />}>
          <UserProfile promise={promises.profile} />
        </Suspense>

        {/* Boundary 2 — medium */}
        <Suspense fallback={<SkeletonCard lines={3} />}>
          <Metrics promise={promises.metrics} />
        </Suspense>

        {/* Boundary 3 — slowest, nested inside outer */}
        <Suspense fallback={<SkeletonCard lines={4} />}>
          <RecentActivity promise={promises.activity} />
        </Suspense>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DEMO 4: startTransition — No Jarring Fallbacks
// Keeps old content visible during navigation
// ─────────────────────────────────────────────

const PAGES = ["Home", "Reports", "Settings"] as const;
type Page = (typeof PAGES)[number];

function PageContent({ page }: { page: Page }) {
  const promise = fakeFetch(`Content for ${page} page loaded!`, 1500);
  const content = use(promise);
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{page}</h3>
      <p>{content as string}</p>
      <div style={styles.badge}>Rendered ✅</div>
    </div>
  );
}

function TransitionDemo() {
  const [page, setPage] = useState<Page>("Home");
  const [isPending, startTransitionHook] = useTransition();

  function navigate(to: Page) {
    startTransitionHook(() => setPage(to)); // no fallback flash!
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>
        Demo 4: <code>startTransition</code> — No Jarring Fallbacks
      </h2>
      <p style={styles.description}>
        Navigate between pages. Without <code>startTransition</code>, the old
        content would flash to a spinner. With it, the old content stays visible
        (slightly dimmed) until the new content is ready.
      </p>

      <div style={styles.navBar}>
        {PAGES.map((p) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            style={{
              ...styles.navButton,
              ...(page === p ? styles.navButtonActive : {}),
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {isPending && <div style={styles.pendingBar}>Loading {page}...</div>}

      <div style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}>
        <Suspense fallback={<SkeletonCard lines={2} />}>
          <PageContent key={page} page={page} />
        </Suspense>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// NEXT.JS PATTERN REFERENCE
// (Read-only reference — cannot run server code here,
//  but shows what the patterns look like)
// ─────────────────────────────────────────────

function NextJsPatternReference() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>
        Next.js App Router Patterns (Reference)
      </h2>
      <p style={styles.description}>
        In Next.js App Router, these are the two primary Suspense patterns:
      </p>

      <div style={styles.grid}>
        <div style={styles.codeCard}>
          <h3 style={styles.cardTitle}>Pattern 1: loading.tsx</h3>
          <p style={styles.muted}>
            Drop a <code>loading.tsx</code> next to <code>page.tsx</code>.
            Next.js auto-wraps the page in a Suspense boundary.
          </p>
          <pre style={styles.code}>{`// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/page.tsx
export default async function Page() {
  // loading.tsx shows while this awaits
  const data = await fetchDashboard();
  return <Dashboard data={data} />;
}`}</pre>
          <div style={styles.badge}>✅ Convention — zero config</div>
        </div>

        <div style={styles.codeCard}>
          <h3 style={styles.cardTitle}>Pattern 2: Manual Suspense</h3>
          <p style={styles.muted}>
            Wrap individual async Server Components for granular, independent
            streaming.
          </p>
          <pre style={styles.code}>{`// app/dashboard/page.tsx
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>
      <h1>Dashboard</h1>

      {/* streams independently */}
      <Suspense fallback={<Skeleton />}>
        <RevenueChart />
      </Suspense>

      {/* streams independently */}
      <Suspense fallback={<Skeleton />}>
        <LatestInvoices />
      </Suspense>
    </main>
  );
}

// async Server Component — owns its data
async function RevenueChart() {
  const data = await fetchRevenue();
  return <BarChart data={data} />;
}`}</pre>
          <div style={styles.badge}>✅ Granular streaming control</div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ROOT DEMO COMPONENT
// ─────────────────────────────────────────────

export default function SuspenseDemo() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.title}>⚡ Suspense Boundaries Demo</h1>
        <p style={styles.subtitle}>Dev Series — React &amp; Next.js</p>
      </header>

      {/* DEMO 1: React.lazy() */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Demo 1: <code>React.lazy()</code> — Code Splitting
        </h2>
        <p style={styles.description}>
          The component below is code-split and only downloaded when you click
          the button. Suspense shows a fallback while the chunk loads.
        </p>
        {!showLazy ? (
          <button style={styles.button} onClick={() => setShowLazy(true)}>
            Load Heavy Widget
          </button>
        ) : (
          <Suspense fallback={<SkeletonCard lines={2} />}>
            <LazyHeavyWidget />
          </Suspense>
        )}
      </section>

      {/* DEMO 2 & 3: use() + Nested Boundaries */}
      <NestedSuspenseDemo />

      {/* DEMO 4: startTransition */}
      <TransitionDemo />

      {/* NEXT.JS REFERENCE */}
      <NextJsPatternReference />
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    width: "100%",
    margin: "0 auto",
    padding: "24px 16px",
    backgroundColor: "#0f0f0f",
    color: "#e5e5e5",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: 48,
    padding: "32px 0",
    borderBottom: "1px solid #2a2a2a",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  section: {
    marginBottom: 48,
    padding: "24px",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    border: "1px solid #2a2a2a",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 0,
    marginBottom: 8,
    color: "#ffffff",
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 20,
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 20,
    border: "1px solid #333",
  },
  codeCard: {
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 20,
    border: "1px solid #333",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: "0 0 12px 0",
    color: "#ffffff",
  },
  muted: {
    color: "#888",
    fontSize: 13,
  },
  badge: {
    display: "inline-block",
    marginTop: 12,
    padding: "4px 10px",
    backgroundColor: "#1a3a2a",
    color: "#4ade80",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
  },
  code: {
    backgroundColor: "#111",
    borderRadius: 6,
    padding: 12,
    fontSize: 12,
    fontFamily: "monospace",
    overflowX: "auto",
    color: "#a5f3fc",
    margin: "12px 0",
    border: "1px solid #2a2a2a",
    whiteSpace: "pre",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #333",
    fontSize: 13,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginTop: 8,
  },
  metricItem: {
    textAlign: "center",
    padding: "8px 0",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#ffffff",
  },
  navBar: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: "#2a2a2a",
    color: "#e5e5e5",
    border: "1px solid #444",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  navButtonActive: {
    backgroundColor: "#1d4ed8",
    //borderColor: "#2563eb",
    color: "#ffffff",
  },
  pendingBar: {
    padding: "8px 12px",
    backgroundColor: "#1a2a3a",
    color: "#93c5fd",
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#7c3aed",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
  },
  skeletonCard: {
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 20,
    border: "1px solid #333",
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "#333",
    borderRadius: 4,
    marginBottom: 8,
    animation: "pulse 1.5s ease-in-out infinite",
  },
};
