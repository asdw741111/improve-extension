/*
 * rollup配置
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:56:59
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2023-11-07 17:00:50
 * @FilePath    : /sentinel/config/rollup.config.js
 */
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"
import typescript from "@rollup/plugin-typescript"
import path from "path"
import replace from "@rollup/plugin-replace"
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars"
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin"

const isProduction = process.env.NODE_ENV === "production"
const projectRootDir = path.resolve(__dirname, "../")

const bigDep = ["xlsx", "sweetalert"]
const BUILD_MODE = process.env.BUILD_MODE // iife = 一个js  es = es模块
const isES = BUILD_MODE === "es"
export default (async () => ({
  input: "src/main.ts",
  plugins: [
    isES ? dynamicImportVars() : undefined,
    resolve(),
    commonjs(),
    replace({
      preventAssignment: false,
      values: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || ""),
        BUILD_MODE: JSON.stringify(process.env.BUILD_MODE || "")
      }
    }),
    typescript({sourceMap: true, outputToFilesystem: false,}),
    alias({
      entries: [
        { find: "@", replacement: path.resolve(projectRootDir, "src") },
      ],
    }),
    isProduction && (await import("rollup-plugin-terser")).terser({ compress: { drop_console: true }}),
    optimizeLodashImports(),
  ].filter((o) => o),
  preserveEntrySignatures: false,
  output: {
    name: "ps",
    format: BUILD_MODE, // https://www.rollupjs.com/guide/big-list-of-options
    globals: {
      // jquery: "$"
    },
    ...(isES ? {
      dir: "dist",
      manualChunks (id) {
        const bigOne = bigDep.find((o) => id.includes(o))
        if (bigOne) {
          return bigOne
        }
      }
    } : {
      file: "dist/bundle.js",
    }),
    entryFileNames: "bundle.js",
    sourcemap: true,
  },
  watch: {
    include: "src/**"
  },
  treeshake: true, // boolean | "smallest" | "safest" | "recommended"  , default true
}))()
