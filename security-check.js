#!/usr/bin/env node

// Security Dependency Checker for Endurance Project
// Checks for potentially compromised packages

const suspiciousPackages = {
  backslash: "0.2.1",
  chalk: "5.6.1",
  "chalk-template": "1.1.1",
  "color-convert": "3.1.1",
  "color-name": "2.0.1",
  "color-string": "2.1.1",
  "wrap-ansi": "9.0.1",
  "supports-hyperlinks": "4.1.1",
  "strip-ansi": "7.1.1",
  "slice-ansi": "7.1.1",
  "simple-swizzle": "0.2.3",
  "is-arrayish": "0.3.3",
  "error-ex": "1.3.3",
  "has-ansi": "6.0.1",
  "ansi-regex": "6.2.1",
  "ansi-styles": "6.2.2",
  "supports-color": "10.2.1",
  "proto-tinker-wc": "1.8.7",
  debug: "4.4.2",
};

import fs from "fs";
import path from "path";

console.log("🔍 SECURITY DEPENDENCY CHECKER - ENDURANCE PROJECT");
console.log("=".repeat(60));

try {
  // Read package-lock.json
  const lockFile = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  const packages = lockFile.packages || {};

  let foundSuspicious = [];
  let warnings = [];

  console.log("📦 Checking installed packages...\n");

  // Check each package in node_modules
  Object.keys(packages).forEach((packagePath) => {
    const pkg = packages[packagePath];
    if (!pkg.name) return;

    const packageName = pkg.name;
    const version = pkg.version;

    if (suspiciousPackages[packageName]) {
      const suspiciousVersion = suspiciousPackages[packageName];

      if (version === suspiciousVersion) {
        foundSuspicious.push({
          name: packageName,
          version: version,
          status: "🚨 EXACT MATCH - HIGH RISK",
          path: packagePath,
        });
      } else {
        warnings.push({
          name: packageName,
          version: version,
          suspiciousVersion: suspiciousVersion,
          status: "⚠️  Different version detected",
          path: packagePath,
        });
      }
    }
  });

  // Report findings
  if (foundSuspicious.length > 0) {
    console.log("🚨 CRITICAL SECURITY ALERT:");
    console.log(
      "The following packages match EXACTLY with compromised versions:"
    );
    console.log("-".repeat(80));
    foundSuspicious.forEach((pkg) => {
      console.log(`${pkg.status}`);
      console.log(`Package: ${pkg.name}@${pkg.version}`);
      console.log(`Path: ${pkg.path}`);
      console.log("");
    });
  }

  if (warnings.length > 0) {
    console.log("⚠️  PACKAGES TO MONITOR:");
    console.log(
      "These packages are similar to suspicious ones but different versions:"
    );
    console.log("-".repeat(80));
    warnings.forEach((pkg) => {
      console.log(`${pkg.status}`);
      console.log(
        `Package: ${pkg.name}@${pkg.version} (suspicious: ${pkg.suspiciousVersion})`
      );
      console.log(`Path: ${pkg.path}`);
      console.log("");
    });
  }

  if (foundSuspicious.length === 0 && warnings.length === 0) {
    console.log(
      "✅ GOOD NEWS: No exact matches with known compromised packages found!"
    );
    console.log("   Continue monitoring for security updates.");
  }

  // Generate summary
  console.log("\n📊 SUMMARY:");
  console.log(
    `Total suspicious packages checked: ${
      Object.keys(suspiciousPackages).length
    }`
  );
  console.log(`Exact matches found (HIGH RISK): ${foundSuspicious.length}`);
  console.log(`Similar packages to monitor: ${warnings.length}`);

  if (foundSuspicious.length > 0) {
    console.log("\n🔧 RECOMMENDED ACTIONS:");
    console.log("1. Immediately review and replace exact matches");
    console.log("2. Check if these are transitive dependencies");
    console.log("3. Update package-lock.json");
    console.log("4. Run npm audit for additional security check");
    console.log("5. Consider using npm ci for installations");
  }
} catch (error) {
  console.error("❌ Error reading package-lock.json:", error.message);
  console.log("Make sure you are in the project root directory.");
}
