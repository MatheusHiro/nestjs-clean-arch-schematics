#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

// Get the directory where the package is installed
const packageDir = path.resolve(__dirname, "..");
const collectionPath = path.join(packageDir, "dist", "collection.json");

// Get command line arguments (skip node and script path)
const args = process.argv.slice(2);

// Show help if no arguments or --help flag
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
╭─────────────────────────────────────────────────────────────────────╮
│                                                                     │
│  🏗️  Clean Architecture Module Generator for NestJS                │
│                                                                     │
╰─────────────────────────────────────────────────────────────────────╯

USAGE:
  nestjs-clean <name> [options]
  npx nestjs-clean-arch-schematics <name> [options]

ARGUMENTS:
  <name>          The name of the module (required)

OPTIONS:
  --path=<path>                Path where the module will be generated
                               (default: src/modules)
  
  --flat                       Generate files in the path directory 
                               without creating a module folder

LAYER SKIP OPTIONS:
  --skip-controller, --sc      Skip generating the controller
  --skip-service, --ss         Skip generating the service
  --skip-repository, --sr      Skip generating the repository
  --skip-entity, --se          Skip generating the entity
  --skip-gateway, --sg         Skip generating the gateway
  --skip-dtos, --sd            Skip generating DTOs

OTHER OPTIONS:
  --minimal, -m                Generate minimal structure (only folders)
  --crud=false                 Disable CRUD operations (default: true)
  --help, -h                   Show this help message

EXAMPLES:
  # Generate a complete user module
  nestjs-clean user

  # Generate without gateway
  nestjs-clean product --skip-gateway
  nestjs-clean product --sg

  # Generate minimal structure
  nestjs-clean order --minimal

  # Skip multiple layers
  nestjs-clean auth --sc --sg --sd

  # Custom path
  nestjs-clean payment --path=src/features

GENERATED STRUCTURE:
  src/modules/<name>/
    ├── presentation/
    │   ├── controllers/      REST/GraphQL endpoints
    │   └── dtos/            Request/Response validation
    ├── domain/
    │   ├── entities/        Business entities
    │   └── interfaces/      Repository contracts
    ├── application/
    │   └── services/        Business logic orchestration
    ├── infrastructure/
    │   ├── repositories/    Data access implementations
    │   └── gateways/        External service integrations
    └── <name>.module.ts     NestJS module configuration

For more information, visit: https://github.com/MatheusHiro/nestjs-clean-arch-schematics
`);
  process.exit(0);
}

// Build the schematics command
// Use the schematics binary from our node_modules
const schematicsBin = path.join(
  packageDir,
  "node_modules",
  ".bin",
  "schematics"
);
const schematicsCmd = `"${schematicsBin}" ${collectionPath}:clean-module --dry-run=false ${args.join(
  " "
)}`;

try {
  // Execute the schematic
  execSync(schematicsCmd, { stdio: "inherit", cwd: process.cwd() });
} catch (error) {
  console.error("Error executing schematic:", error.message);
  process.exit(1);
}
