require("esbuild").build({
    entryPoints: ["./src/client/client.ts"],
    outfile: "./public/js/client.js",
    bundle: true,
    loader: {".ts": "ts"}
  })
  .then(() => console.log("⚡ Done"))
  .catch(() => process.exit(1));