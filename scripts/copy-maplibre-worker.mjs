/*
 * MapLibre spawns its worker by resolving the worker file relative to the
 * bundled chunk — a path Turbopack never emits, so the worker 404s and the map
 * renders no tiles at all. Serving the pair from public/ and pointing
 * setWorkerUrl at it is the supported fix. Copying on each build keeps the
 * files matched to the installed version, which a committed copy would not.
 */
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const dist = join(dirname(require.resolve("maplibre-gl/package.json")), "dist");
const out = join(process.cwd(), "public", "maplibre");

/* The worker imports the shared chunk relatively, so both have to land here. */
const files = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

await mkdir(out, { recursive: true });
await Promise.all(files.map((f) => copyFile(join(dist, f), join(out, f))));

console.log(`Copied ${files.length} MapLibre worker files to public/maplibre/`);
