const { readdirSync } = require("fs");

const getDirectories = (source) => {
  const files = readdirSync(source, { withFileTypes: true });
  return files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

module.exports = () => {
  const packages = getDirectories("packages").map(
    (package) => `packages/${package}/package.json`
  );
  const apps = getDirectories("apps").map((app) => `apps/${app}/package.json`);

  return {
    bumpFiles: ["package.json", ...packages, ...apps],
  };
};
