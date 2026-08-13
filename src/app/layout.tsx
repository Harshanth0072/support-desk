import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupportDesk | Internal IT Ticket System",
  description: "Modern internal IT support ticket management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                SD
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">SupportDesk</h1>
                <p className="text-xs text-slate-500">Internal IT Support</p>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Porsche Centre Oman · IT Ops
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
