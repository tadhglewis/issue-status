#!/usr/bin/env node

import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { input, select } from "@inquirer/prompts";
import { findUp } from "find-up";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");

const detectPackageManager = async (startDir) => {
  const pnpmLock = await findUp("pnpm-lock.yaml", { cwd: startDir });
  if (pnpmLock) {
    return "pnpm";
  }

  const npmLock = findUp("package-lock.json", { cwd: startDir });
  if (npmLock) {
    return "npm";
  }

  return "pnpm";
};

const packageManager = await detectPackageManager(process.cwd());

const writeConfig = async (
  templateName,
  variables,
  projectPath,
  projectName
) => {
  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });

  // Write config file
  const configPath = path.join(projectPath, "issue-status.config.ts");
  const templatePath = path.resolve(
    __dirname,
    "templates",
    `${templateName}.template.ts`
  );
  let template = fs.readFileSync(templatePath, "utf8");

  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  });

  fs.writeFileSync(configPath, template);

  // Write package.json
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageTemplatePath = path.resolve(
    __dirname,
    "templates",
    "package.json.template"
  );
  let packageTemplate = fs.readFileSync(packageTemplatePath, "utf8");

  // Get current package version
  const currentPackageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
  );

  packageTemplate = packageTemplate
    .replace("{{projectName}}", projectName)
    .replace("{{version}}", currentPackageJson.version);

  fs.writeFileSync(packageJsonPath, packageTemplate);

  console.log(`\n✅ Created project in ./${projectName}/`);
  console.log("✅ Created issue-status.config.ts");
  console.log("✅ Created package.json");

  // Install dependencies
  console.log("📦 Installing dependencies...");

  console.log(
    `ℹ️  Detected package manager: ${packageManager}. Using it to install dependencies.`
  );

  return new Promise((resolve, reject) => {
    const installProcess = spawn(packageManager, ["install"], {
      cwd: projectPath,
      stdio: "inherit",
    });

    installProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Dependencies installed successfully");
        resolve();
      } else {
        console.log(
          `❌ Failed to install dependencies (exit code: ${code}). Please check the logs above.`
        );
        reject(new Error(`${packageManager} install failed with code ${code}`));
      }
    });

    installProcess.on("error", (error) => {
      console.log(
        `❌ Failed to install dependencies using ${packageManager}:`,
        error.message
      );
      reject(error);
    });
  });
};

const initCommand = async () => {
  console.log("🚀 Welcome to Issue Status! Let's set up your status page.\n");

  const projectName = await input({
    message: "What's the name of your project directory?",
    default: "my-status-page",
    validate: (input) => {
      const trimmed = input.trim();
      if (trimmed.length === 0) return "Please enter a project name";
      if (!/^[a-zA-Z0-9-_]+$/.test(trimmed))
        return "Project name can only contain letters, numbers, hyphens, and underscores";
      return true;
    },
  });

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`❌ Directory "${projectName}" already exists`);
    process.exit(1);
  }

  const name = await input({
    message: "What's the name of your status page?",
    default: "My Status Page",
    validate: (input) => input.trim().length > 0 || "Please enter a name",
  });

  const description = await input({
    message: "Enter a description (optional):",
    default: "Status page for my services",
  });

  const provider = await select({
    message: "Choose a data provider:",
    choices: [
      {
        name: "Static - Simple static data (good for getting started)",
        value: "static",
      },
      {
        name: "GitHub - Use GitHub Issues as data source",
        value: "github",
      },
      {
        name: "Custom - Implement your own provider",
        value: "custom",
      },
    ],
    default: "static",
  });

  switch (provider) {
    case "static":
      await writeConfig(
        "static",
        { name, description },
        projectPath,
        projectName
      );

      console.log("\n📝 Next steps:");
      console.log(`1. cd ${projectName}`);
      console.log(
        "2. Customize your components and incidents in issue-status.config.ts"
      );
      console.log("3. npm run dev");
      break;

    case "github": {
      const owner = await input({
        message: "GitHub repository owner/organization:",
        validate: (input) =>
          input.trim().length > 0 || "Please enter the owner",
      });

      const repo = await input({
        message: "GitHub repository name:",
        validate: (input) =>
          input.trim().length > 0 || "Please enter the repository name",
      });

      await writeConfig(
        "github",
        {
          name,
          description,
          owner,
          repo,
        },
        projectPath,
        projectName
      );

      console.log("\n📝 Next steps:");
      console.log(`1. cd ${projectName}`);
      console.log("2. Set up GitHub Issues with the following labels:");
      console.log(
        "   - Components: Add issues with labels 'issue status' + 'component'"
      );
      console.log(
        "     Status labels: 'operational', 'degraded performance', 'partial outage', 'major outage'"
      );
      console.log(
        "   - Incidents: Add issues with labels 'issue status' + 'incident'"
      );
      console.log(
        "     Optional: Add 'maintenance' label for scheduled maintenance"
      );
      console.log("3. npm run dev");
      console.log(
        "4. See providers/github.ts for more details on the GitHub integration"
      );
      break;
    }

    case "custom":
      await writeConfig(
        "custom",
        { name, description },
        projectPath,
        projectName
      );

      console.log("\n📝 Next steps:");
      console.log(`1. cd ${projectName}`);
      console.log(
        "2. ⚠️  IMPORTANT: Complete the custom provider implementation in issue-status.config.ts"
      );
      console.log(
        "3. Implement the getComponents(), getIncidents(), and getHistoricalIncidents() methods"
      );
      console.log("4. See src/api/types.ts for the Provider interface details");
      console.log("5. npm run dev");
      break;
  }

  console.log("\n🚀 Happy monitoring!");
};

switch (command) {
  case "init":
    await initCommand();
    break;

  case "dev":
    spawn("npx", ["vite", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "build":
    spawn("npx", ["vite", "build", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "preview":
    spawn("npx", ["vite", "preview", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  default:
    console.log("Usage: issue-status <init|dev|build|preview>");
    process.exit(1);
}
