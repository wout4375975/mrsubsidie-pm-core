import { describe, expect, it } from "vitest";
import * as pmCore from "./index";

describe("pm-core package root", () => {
  it("publiceert in versie 0.1.0 bewust nog geen publieke API", () => {
    expect(Object.keys(pmCore)).toEqual([]);
  });
});
