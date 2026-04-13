import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { BranchenFilterProvider, useBranchenFilter } from "../BranchenFilterContext";
import type { ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  return <BranchenFilterProvider>{children}</BranchenFilterProvider>;
}

describe("BranchenFilterContext", () => {
  it("has all 3 branchen active by default", () => {
    const { result } = renderHook(() => useBranchenFilter(), { wrapper });

    expect(result.current.isBrancheActive("curaviva")).toBe(true);
    expect(result.current.isBrancheActive("insos")).toBe(true);
    expect(result.current.isBrancheActive("youvita")).toBe(true);
    expect(result.current.activeBranchen.size).toBe(3);
  });

  it("toggleBranche deactivates a branche", () => {
    const { result } = renderHook(() => useBranchenFilter(), { wrapper });

    act(() => {
      result.current.toggleBranche("curaviva");
    });

    expect(result.current.isBrancheActive("curaviva")).toBe(false);
    expect(result.current.isBrancheActive("insos")).toBe(true);
    expect(result.current.isBrancheActive("youvita")).toBe(true);
  });

  it("isTrendVisible returns false when none of trend's branchen are active", () => {
    const { result } = renderHook(() => useBranchenFilter(), { wrapper });

    // Deactivate all branchen that the trend belongs to
    act(() => {
      result.current.toggleBranche("curaviva");
    });

    const trend = { branchenIds: ["curaviva"] };
    expect(result.current.isTrendVisible(trend)).toBe(false);
  });

  it("isTrendVisible returns true for multi-branche trend when at least 1 is active", () => {
    const { result } = renderHook(() => useBranchenFilter(), { wrapper });

    act(() => {
      result.current.toggleBranche("curaviva");
    });

    const trend = { branchenIds: ["curaviva", "insos"] };
    expect(result.current.isTrendVisible(trend)).toBe(true);
  });
});
