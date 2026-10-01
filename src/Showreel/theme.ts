import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter is bundled in public/fonts so renders work offline.
for (const weight of ["400", "600", "900"]) {
  loadFont({
    family: "Inter",
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const FONT = "Inter, Helvetica, Arial, sans-serif";

export const C = {
  ink: "#0E0E12",
  cream: "#F4EFE6",
  coral: "#FF5A36",
  yellow: "#FFC93C",
  cyan: "#3DDCFF",
  violet: "#7B5CFF",
  mint: "#3DFFA8",
};

export const PALETTE = [C.coral, C.yellow, C.cyan, C.violet, C.mint];
