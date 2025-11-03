import {
  Rule,
  Tree,
  apply,
  url,
  template,
  mergeWith,
  move,
  SchematicsException,
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';

interface CoreModuleOptions {
  path?: string;
  help?: boolean;
}

function showHelp() {
  const helpMessage = `
╭─────────────────────────────────────────────────────────────────────╮
│                                                                     │
│  🏗️  Core Module Generator for Clean Architecture & DDD            │
│                                                                     │
╰─────────────────────────────────────────────────────────────────────╯

USAGE:
  nestjs-clean core [options]

OPTIONS:
  --path=<path>                Path where the core module will be generated
                               (default: src/core)
  --help                       Show this help message

DESCRIPTION:
  Generates a core module with strongly-typed base classes for Clean
  Architecture and Domain-Driven Design patterns.

  Includes:
  - Base Entity, Aggregate Root, Value Object
  - Repository Interface
  - Domain Events
  - Use Case Interface
  - Mapper Interface
  - Result and Either monads
  - Example value objects (UniqueEntityId, Email)

  All classes use proper TypeScript generics with NO 'any' or 'unknown' types.

EXAMPLES:
  # Generate core module in default location
  nestjs-clean core

  # Generate in custom location
  nestjs-clean core --path=src/shared/core

AFTER GENERATION:
  1. Import core classes in your domain entities
  2. Extend base classes for type safety
  3. Use Result/Either for error handling
  4. Implement repositories using IBaseRepository

For more information, see: https://github.com/MatheusHiro/nestjs-clean-arch-schematics
`;
  
  console.log(helpMessage);
}

export function core(options: CoreModuleOptions): Rule {
  return (tree: Tree) => {
    // Show help if requested
    if (options.help) {
      showHelp();
      return tree;
    }

    const path = options.path || 'src/core';
    const corePath = normalize(path);

    // Check if core module already exists
    if (tree.exists(`${corePath}/index.ts`)) {
      throw new SchematicsException(
        `\n❌ Error: Core module already exists at ${corePath}\n` +
        'Please remove it first or specify a different path with --path'
      );
    }

    // Apply templates
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
      }),
      move(corePath),
    ]);

    console.log(`
✅ Core module created successfully!

📦 Location: ${corePath}/

✨ Generated:
  ✅ BaseEntity (strongly-typed, no persistence concerns)
  ✅ AggregateRoot (with domain events)
  ✅ ValueObject (immutable, private constructor pattern)
  ✅ BaseRepository interface
  ✅ Domain Event system (DomainEvent, DomainEventHandler)
  ✅ BaseUseCase interface
  ✅ BaseMapper interface
  ✅ Result monad (for error handling)
  ✅ Either monad (for branching logic)

Structure:
📁 ${corePath}/
  ├── domain/
  │   ├── base/ (Entity, AggregateRoot, ValueObject)
  │   ├── repositories/ (BaseRepository)
  │   └── events/ (DomainEvent, DomainEventHandler)
  ├── application/
  │   ├── use-cases/ (BaseUseCase)
  │   └── mappers/ (BaseMapper)
  ├── common/
  │   └── result/ (Result, Either)
  └── index.ts (barrel exports)

Next steps:
1. Import base classes in your domain entities:
   import { BaseEntity, AggregateRoot, ValueObject } from './core';
2. Extend base classes with your domain types
3. Use Result/Either for type-safe error handling
4. Implement your own value objects using private constructor pattern

💡 All classes use proper TypeScript generics - NO 'any' or 'unknown' types!
💡 No 'I' prefixes - use implementation suffix (e.g., UserRepositoryImpl)

Example Entity:
  class User extends BaseEntity<UserProps> {
    // Your strongly-typed domain entity
  }

Example Value Object:
  class Email extends ValueObject<{ value: string }> {
    private constructor(props: { value: string }) {
      super(props);
    }
    
    static create(email: string): Result<Email, string> {
      // Validation logic
      return Result.ok(new Email({ value: email }));
    }
    
    get email(): string {
      return this.value.value;
    }
  }
`);

    return mergeWith(templateSource);
  };
}

