import {
  Rule,
  Tree,
  apply,
  url,
  template,
  mergeWith,
  move,
  filter,
  SchematicsException,
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';

interface CleanModuleOptions {
  name: string;
  path?: string;
  flat?: boolean;
  skipController?: boolean;
  skipService?: boolean;
  skipRepository?: boolean;
  skipEntity?: boolean;
  skipGateway?: boolean;
  skipDtos?: boolean;
  crud?: boolean;
  minimal?: boolean;
  // Aliases
  sc?: boolean;
  ss?: boolean;
  sr?: boolean;
  se?: boolean;
  sg?: boolean;
  sd?: boolean;
  m?: boolean;
  help?: boolean;
}

function showHelp() {
  const helpMessage = `
╭─────────────────────────────────────────────────────────────────────╮
│                                                                     │
│  🏗️  Clean Architecture Module Generator for NestJS                │
│                                                                     │
╰─────────────────────────────────────────────────────────────────────╯

USAGE:
  nestjs-clean generate <name> [options]
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
  --help                       Show this help message

EXAMPLES:
  # Generate a complete user module
  nestjs-clean generate user

  # Generate without gateway
  nestjs-clean generate product --skip-gateway
  nestjs-clean generate product --sg

  # Generate minimal structure
  nestjs-clean generate order --minimal

  # Skip multiple layers
  nestjs-clean generate auth --sc --sg --sd

  # Custom path
  nestjs-clean generate payment --path=src/features

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
`;
  
  console.log(helpMessage);
}

export function cleanModule(options: CleanModuleOptions): Rule {
  return (tree: Tree) => {
    // Show help if requested
    if (options.help) {
      showHelp();
      return tree;
    }

    // Validate required name
    if (!options.name) {
      showHelp();
      throw new SchematicsException('\n❌ Error: Module name is required!\n');
    }

    const name = strings.dasherize(options.name);
    const path = options.path || 'src/modules';
    
    const modulePath = options.flat
      ? normalize(`${path}`)
      : normalize(`${path}/${name}`);

    // Handle aliases
    if (options.sc) options.skipController = true;
    if (options.ss) options.skipService = true;
    if (options.sr) options.skipRepository = true;
    if (options.se) options.skipEntity = true;
    if (options.sg) options.skipGateway = true;
    if (options.sd) options.skipDtos = true;
    if (options.m) options.minimal = true;

    if (options.minimal) {
      options.skipController = true;
      options.skipService = true;
      options.skipRepository = true;
      options.skipEntity = true;
      options.skipGateway = true;
      options.skipDtos = true;
    }

    // Build filter function to skip specific files
    const filterFiles = filter((filePath) => {
      // Normalize path for consistent checking (convert backslashes to forward slashes)
      const normalizedPath = filePath.replace(/\\/g, '/');
      
      // Skip controller files
      if (options.skipController && (normalizedPath.includes('presentation/controllers/') || normalizedPath.includes('/presentation/controllers/'))) {
        return false;
      }
      
      // Skip service files (but not use cases)
      if (options.skipService && (normalizedPath.includes('application/services/') || normalizedPath.includes('/application/services/'))) {
        return false;
      }

      // Skip use cases if service is skipped
      if (options.skipService && (normalizedPath.includes('application/use-cases/') || normalizedPath.includes('/application/use-cases/'))) {
        return false;
      }

      // Skip mappers if service is skipped
      if (options.skipService && (normalizedPath.includes('application/mappers/') || normalizedPath.includes('/application/mappers/'))) {
        return false;
      }
      
      // Skip repository files
      if (options.skipRepository && (normalizedPath.includes('infrastructure/repositories/') || normalizedPath.includes('/infrastructure/repositories/'))) {
        return false;
      }

      // Skip ORM entities if repository is skipped
      if (options.skipRepository && (normalizedPath.includes('infrastructure/persistence/') || normalizedPath.includes('/infrastructure/persistence/'))) {
        return false;
      }
      
      // Skip entity files
      if (options.skipEntity && (normalizedPath.includes('domain/entities/') || normalizedPath.includes('/domain/entities/'))) {
        return false;
      }

      // Skip domain exceptions if entity is skipped (exceptions are domain-related)
      if (options.skipEntity && (normalizedPath.includes('domain/exceptions/') || normalizedPath.includes('/domain/exceptions/'))) {
        return false;
      }
      
      // Skip gateway files
      if (options.skipGateway && (normalizedPath.includes('infrastructure/gateways/') || normalizedPath.includes('/infrastructure/gateways/'))) {
        return false;
      }
      
      // Skip DTO files
      if (options.skipDtos && (normalizedPath.includes('presentation/dtos/') || normalizedPath.includes('/presentation/dtos/'))) {
        return false;
      }

      // Skip repository interface if repository is skipped
      if (options.skipRepository && (normalizedPath.includes('domain/interfaces/') || normalizedPath.includes('/domain/interfaces/'))) {
        return false;
      }

      return true;
    });

    // Apply templates
    const templateSource = apply(url('./files'), [
      filterFiles,
      template({
        ...strings,
        name,
        skipController: options.skipController,
        skipService: options.skipService,
        skipRepository: options.skipRepository,
        skipEntity: options.skipEntity,
        skipGateway: options.skipGateway,
        skipDtos: options.skipDtos,
      }),
      move(modulePath),
    ]);

    // Generate summary
    const generatedFiles: string[] = [];
    const skippedLayers: string[] = [];

    if (!options.skipController) generatedFiles.push('  ✅ Controller (REST endpoints)');
    else skippedLayers.push('  ⊘ Controller');

    if (!options.skipService) {
      generatedFiles.push('  ✅ Service (orchestration)');
      generatedFiles.push('  ✅ Use Cases (business logic)');
      generatedFiles.push('  ✅ Mappers (entity translation)');
    } else {
      skippedLayers.push('  ⊘ Service & Use Cases');
    }

    if (!options.skipEntity) generatedFiles.push('  ✅ Domain Entity');
    else skippedLayers.push('  ⊘ Domain Entity');

    if (!options.skipRepository) {
      generatedFiles.push('  ✅ Repository interface & implementation');
      generatedFiles.push('  ✅ ORM Entity (persistence model)');
    } else {
      skippedLayers.push('  ⊘ Repository & ORM Entity');
    }

    if (!options.skipGateway) generatedFiles.push('  ✅ Gateway (external integrations)');
    else skippedLayers.push('  ⊘ Gateway');

    if (!options.skipDtos) generatedFiles.push('  ✅ DTOs (Create/Update)');
    else skippedLayers.push('  ⊘ DTOs');

    console.log(`
✅ Clean Architecture module "${name}" created successfully!

📦 Module: ${strings.classify(name)}Module
📂 Location: ${modulePath}/

${generatedFiles.length > 0 ? '✨ Generated:\n' + generatedFiles.join('\n') : ''}
${skippedLayers.length > 0 ? '\n⊘ Skipped:\n' + skippedLayers.join('\n') : ''}

Structure:
📁 ${modulePath}/
  ${!options.skipController ? '├── presentation/controllers/' : ''}
  ${!options.skipDtos ? '├── presentation/dtos/' : ''}
  ${!options.skipEntity ? '├── domain/entities/' : ''}
  ${!options.skipRepository ? '├── domain/interfaces/' : ''}
  ${!options.skipService ? '├── application/services/' : ''}
  ${!options.skipService ? '├── application/use-cases/' : ''}
  ${!options.skipService ? '├── application/mappers/' : ''}
  ${!options.skipRepository ? '├── infrastructure/repositories/' : ''}
  ${!options.skipRepository ? '├── infrastructure/persistence/' : ''}
  ${!options.skipGateway ? '├── infrastructure/gateways/' : ''}
  └── ${name}.module.ts

Next steps:
1. Import ${strings.classify(name)}Module in your app.module.ts
2. Customize the generated files for your use case
${!options.skipEntity ? '3. Add your specific fields to the entity' : ''}
${!options.skipRepository ? '4. Implement database integration in the repository' : ''}
${!options.skipService ? '5. Add custom business logic to the service' : ''}

💡 Tip: Run 'nestjs-clean --help' to see all available options
`);

    return mergeWith(templateSource);
  };
}

