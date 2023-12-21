import { nodeExternalsPlugin } from "esbuild-node-externals";
import { build } from "esbuild";
import fs from "fs"
import path from "path"

const getFiles = (dir, ext) => {
  const data = fs.readdirSync(dir, { withFileTypes: true, encoding: "utf-8",  })
  const files = []

  for (const file of data) {
    if (file.isDirectory()) files.push(...getFiles(path.join(dir, file.name), ext))
    else if (path.extname(file.name) === ext) files.push(path.join(dir, file.name))
  }

  return files
}

try {
  const files = getFiles("./src", ".ts")

  build({
    entryPoints: files,
    bundle: true, // include all dependencies in files
    minify: true, // make files smaller
    sourcemap: true, // generate source maps for debugging
    format: "esm",
    platform: "node",
    tsconfig: "tsconfig.json",
    plugins: [nodeExternalsPlugin()],
    outdir: "dist",
  })
}
catch (err) {
  console.log(err)
  process.exit(1)
}