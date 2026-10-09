import { describe, expect, it } from "vitest";
import { badgeVariants } from "../src/ui/badge";
import { cn } from "../src/ui/utils";

describe("gedeelde UI-primitieven", () => {
  it("behoudt de Badge-varianten en de className-normalisatie", () => {
    expect(badgeVariants({ variant: "destructive" })).toContain(
      "bg-destructive"
    );
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
