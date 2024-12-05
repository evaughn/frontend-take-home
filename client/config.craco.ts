import path from "node:path";

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".js", ".ts", ".js"],
  },
  devServer: {
    port: "8008",
    proxy: {
      context: ["/api"],
      target: "http://localhost:3002",
      pathRewrite: { "^/api": "" },
      secure: false,
    },
  },
};
