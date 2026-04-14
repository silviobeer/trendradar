"use client";

import { useState, useEffect } from "react";
import type { Trend, Handlungsfeld, Megatrend, Branche } from "@trendradar/shared";
import { TrendRadar } from "@/components/radar/TrendRadar";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { MegatrendSidebar } from "@/components/sidebar/MegatrendSidebar";
import { NeusteEntwicklungen } from "@/components/sidebar/NeusteEntwicklungen";

interface HomeLayoutProps {
  trends: Trend[];
  neusteTrends: Trend[];
  handlungsfelder: Handlungsfeld[];
  branchen: Branche[];
  megatrends: Megatrend[];
}

export function HomeLayout({
  trends,
  neusteTrends,
  handlungsfelder,
  branchen,
  megatrends,
}: HomeLayoutProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLeftOpen(false);
        setRightOpen(false);
      }
    }
    if (leftOpen || rightOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [leftOpen, rightOpen]);

  return (
    <>
      <div className="h-dvh overflow-hidden bg-gray-50 grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] lg:grid-cols-[min-content_1fr_min-content]">
        {/* Row 1: Header */}
        <header className="lg:col-span-3 bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">ARTISET Trendradar</h1>
        </header>

        {/* Left sidebar — inline, desktop only */}
        <aside
          data-sidebar="left-inline"
          className="hidden lg:block w-full max-w-[160px] overflow-y-auto border-r border-gray-200 bg-white p-2"
        >
          <NeusteEntwicklungen trends={neusteTrends} />
        </aside>

        {/* Radar center + mobile toggle buttons */}
        <div className="relative flex items-center justify-center overflow-hidden p-4 h-full min-h-0">
          {/* Left toggle — mobile only */}
          <button
            data-testid="toggle-left-sidebar"
            aria-label="Neueste Entwicklungen einblenden"
            aria-expanded={leftOpen}
            onClick={() => setLeftOpen(true)}
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-md p-1.5 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <TrendRadar trends={trends} handlungsfelder={handlungsfelder} branchen={branchen} />

          {/* Right toggle — mobile only */}
          <button
            data-testid="toggle-right-sidebar"
            aria-label="Megatrends einblenden"
            aria-expanded={rightOpen}
            onClick={() => setRightOpen(true)}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-md p-1.5 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Right sidebar — inline, desktop only */}
        <aside
          data-sidebar="right-inline"
          className="hidden lg:block w-full max-w-[160px] overflow-y-auto border-l border-gray-200 bg-white p-2"
        >
          <MegatrendSidebar megatrends={megatrends} />
        </aside>

        {/* Row 3: BranchenFilter */}
        <div className="lg:col-span-3 border-t border-gray-200 bg-white px-4 py-2 flex justify-center items-center">
          <BranchenFilter branchen={branchen} />
        </div>
      </div>

      {/* Left overlay sidebar — mobile (outside grid, uses position: fixed) */}
      {leftOpen && (
        <>
          <div
            data-testid="overlay-backdrop-left"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setLeftOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLeftOpen(false); }}
            aria-label="Sidebar schliessen"
          />
          <aside
            data-testid="overlay-left-sidebar"
            className="fixed inset-y-0 left-0 z-50 w-[200px] bg-white shadow-lg p-4 overflow-y-auto"
          >
            <button
              data-action="close"
              aria-label="Sidebar schliessen"
              onClick={() => setLeftOpen(false)}
              className="mb-4 flex items-center justify-end w-full text-gray-500 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <NeusteEntwicklungen trends={neusteTrends} />
          </aside>
        </>
      )}

      {/* Right overlay sidebar — mobile (outside grid, uses position: fixed) */}
      {rightOpen && (
        <>
          <div
            data-testid="overlay-backdrop-right"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setRightOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setRightOpen(false); }}
            aria-label="Sidebar schliessen"
          />
          <aside
            data-testid="overlay-right-sidebar"
            className="fixed inset-y-0 right-0 z-50 w-[200px] bg-white shadow-lg p-4 overflow-y-auto"
          >
            <button
              data-action="close"
              aria-label="Sidebar schliessen"
              onClick={() => setRightOpen(false)}
              className="mb-4 flex items-center justify-end w-full text-gray-500 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <MegatrendSidebar megatrends={megatrends} />
          </aside>
        </>
      )}
    </>
  );
}
