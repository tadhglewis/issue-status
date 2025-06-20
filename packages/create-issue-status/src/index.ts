import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import mri from "mri";
import * as prompts from "@clack/prompts";
import colors from "picocolors";

const { cyan, yellow, green, red, blue } = colors;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROVIDERS = [
  {
    name: "static",
    display: "Static",
    color: yellow,
  },
  {
    name: "github",
    display: "GitHub",
    color: green,
  },
  {
    name: "gitlab",
    display: "GitLab",
    color: red,
  },
  {
    name: "googlesheets",
    display: "Google Sheets",
    color: blue,
  },
  {
    name: "custom",
    display: "Custom",
    color: cyan,
  },
];

const TEMPLATES = PROVIDERS.map((p) => p.name);

const defaultTargetDir = "my-status-page";

const init = async () => {
  const argv = mri(process.argv.slice(2), {
    string: ["t", "template"],
    boolean: ["h", "help"],
    alias: { h: "help", t: "template" },
  });

  if (argv.help) {
    console.log(`
Usage: create-issue-status [OPTION]... [DIRECTORY]

Create a new Issue Status project.

Options:
  -t, --template NAME  use a specific template

Available templates:
${PROVIDERS.map((p) => `  ${p.color(p.name.padEnd(12))} ${p.display}`).join(
  "\n"
)}
`);
    process.exit(0);
  }

  const cwd = process.cwd();
  const args = argv._;

  let targetDir = formatTargetDir(args[0]);

  prompts.intro(cyan("create-issue-status"));

  let shouldOverwrite = false;
  let packageName: string | undefined;
  let provider: string;
  let statusPageName: string;
  let statusPageDescription: string;
  let githubOwner: string | undefined;
  let githubRepo: string | undefined;
  let gitlabProjectId: string | undefined;
  let googlesheetsUrl: string | undefined;

  if (!targetDir) {
    const projectName = await prompts.text({
      message: "Project name:",
      placeholder: defaultTargetDir,
      validate: (input) => {
        const trimmed = input.trim();
        if (trimmed.length === 0) return "Please enter a project name";
        if (!/^[a-zA-Z0-9-_]+$/.test(trimmed))
          return "Project name can only contain letters, numbers, hyphens, and underscores";
        return;
      },
    });

    if (prompts.isCancel(projectName)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    targetDir = formatTargetDir(projectName) || defaultTargetDir;
  }

  const getProjectName = (): string => {
    return targetDir === "." ? path.basename(path.resolve()) : targetDir!;
  };

  if (!canSkipEmptyDir(targetDir!) && !validForOverwrite(targetDir!)) {
    const dirForPrompt =
      targetDir === "."
        ? "Current directory"
        : `Target directory "${targetDir}"`;

    const overwriteResult = await prompts.confirm({
      message: `${dirForPrompt} is not empty. Remove existing files and continue?`,
    });

    if (prompts.isCancel(overwriteResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    shouldOverwrite = overwriteResult;

    if (!shouldOverwrite) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  if (!isValidPackageName(getProjectName()!)) {
    const packageNameResult = await prompts.text({
      message: "Package name:",
      placeholder: toValidPackageName(getProjectName()),
      validate: (dir) => {
        if (isValidPackageName(dir)) return;
        return "Invalid package.json name";
      },
    });

    if (prompts.isCancel(packageNameResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    packageName = packageNameResult;
  }

  provider = argv.template;
  if (!provider || !TEMPLATES.includes(provider)) {
    if (argv.template && !TEMPLATES.includes(argv.template)) {
      console.log(
        `❌ Invalid template "${
          argv.template
        }". Valid options: ${TEMPLATES.join(", ")}`
      );
      process.exit(1);
    }

    const providerResult = await prompts.select({
      message: "Select a provider:",
      options: PROVIDERS.map((provider) => ({
        value: provider.name,
        label: provider.color(provider.display || provider.name),
      })),
    });

    if (prompts.isCancel(providerResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    provider = providerResult as string;
  }

  const statusPageNameResult = await prompts.text({
    message: "Status page name:",
    placeholder: "My Status Page",
  });

  if (prompts.isCancel(statusPageNameResult)) {
    prompts.cancel("Operation cancelled.");
    process.exit(0);
  }

  statusPageName = statusPageNameResult;

  const statusPageDescriptionResult = await prompts.text({
    message: "Status page description:",
    placeholder: "Status page for my services",
  });

  if (prompts.isCancel(statusPageDescriptionResult)) {
    prompts.cancel("Operation cancelled.");
    process.exit(0);
  }

  statusPageDescription = statusPageDescriptionResult;

  if (provider === "github") {
    const githubOwnerResult = await prompts.text({
      message: "GitHub repository owner/organization:",
      validate: (input) => {
        if (input.trim().length > 0) return;
        return "Please enter the owner";
      },
    });

    if (prompts.isCancel(githubOwnerResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    githubOwner = githubOwnerResult;

    const githubRepoResult = await prompts.text({
      message: "GitHub repository name:",
      validate: (input) => {
        if (input.trim().length > 0) return;
        return "Please enter the repository name";
      },
    });

    if (prompts.isCancel(githubRepoResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    githubRepo = githubRepoResult;
  }

  if (provider === "gitlab") {
    const gitlabProjectIdResult = await prompts.text({
      message: "GitLab project ID or path (e.g., 'owner/repo' or project ID):",
      validate: (input) => {
        if (input.trim().length > 0) return;
        return "Please enter the project ID or path";
      },
    });

    if (prompts.isCancel(gitlabProjectIdResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    gitlabProjectId = gitlabProjectIdResult;
  }

  if (provider === "googlesheets") {
    const googlesheetsUrlResult = await prompts.text({
      message: "Google Sheets published CSV URL:",
      validate: (input) => {
        if (input.trim().length > 0) return;
        return "Please enter the published CSV URL";
      },
    });

    if (prompts.isCancel(googlesheetsUrlResult)) {
      prompts.cancel("Operation cancelled.");
      process.exit(0);
    }

    googlesheetsUrl = googlesheetsUrlResult;
  }

  const root = path.join(cwd, targetDir!);

  if (shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const template = provider || argv.template;

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.resolve(__dirname, "..", "template-" + template);
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter(
    (f) => f !== "package.json" && f !== "issue-status.config.ts"
  )) {
    write(file);
  }

  write(".gitignore");

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );
  pkg.name = packageName || getProjectName();
  write("package.json", JSON.stringify(pkg, null, 2) + "\n");

  let configContent = fs.readFileSync(
    path.join(templateDir, "issue-status.config.ts"),
    "utf-8"
  );

  configContent = configContent
    .replace(/My Status Page/g, statusPageName || "My Status Page")
    .replace(
      /Status page for my services/g,
      statusPageDescription || "Status page for my services"
    );

  if (template === "github" && githubOwner && githubRepo) {
    configContent = configContent
      .replace(/your-github-username/g, githubOwner)
      .replace(/your-repo-name/g, githubRepo);
  }

  if (template === "gitlab" && gitlabProjectId) {
    configContent = configContent.replace(/your-project-id/g, gitlabProjectId);
  }

  if (template === "googlesheets" && googlesheetsUrl) {
    configContent = configContent.replace(/your-sheet-url/g, googlesheetsUrl);
  }

  write("issue-status.config.ts", configContent);

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(
      `  cd ${
        path.relative(cwd, root).includes(" ")
          ? `"${path.relative(cwd, root)}"`
          : path.relative(cwd, root)
      }`
    );
  }
  console.log(`  ${pkgManager === "yarn" ? "yarn" : `${pkgManager} install`}`);
  console.log(
    `  ${pkgManager === "yarn" ? "yarn dev" : `${pkgManager} run dev`}`
  );

  console.log();

  prompts.outro("Project created successfully!");
};

const formatTargetDir = (targetDir: string | undefined) => {
  return targetDir?.trim().replace(/\/+$/g, "");
};

const copy = (src: string, dest: string) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
};

const isValidPackageName = (projectName: string) => {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  );
};

const toValidPackageName = (projectName: string) => {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
};

const copyDir = (srcDir: string, destDir: string) => {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
};

const emptyDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    const abs = path.resolve(dir, file);

    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
};

const pkgFromUserAgent = (userAgent: string | undefined) => {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
};

const canSkipEmptyDir = (dir: string): boolean => {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }

  return false;
};

const validForOverwrite = (dir: string): boolean => {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }

  return false;
};

init().catch((e) => {
  console.error(e);
});
