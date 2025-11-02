# 🏗️ NestJS Clean Architecture Schematics

[![npm version](https://img.shields.io/npm/v/@nestjs-clean-arch/schematics.svg)](https://www.npmjs.com/package/nestjs-clean-arch-schematics)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful NestJS schematic package that generates Clean Architecture modules with proper layer separation. Instantly scaffold well-structured modules following best practices for maintainable, testable, and scalable applications.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Generated Structure](#-generated-structure)
- [Configuration Options](#-configuration-options)
- [Examples](#-examples)
- [Integration with NestJS CLI](#-integration-with-nestjs-cli)
- [Architecture Overview](#-architecture-overview)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🏛️ **Clean Architecture**: Generates modules with proper separation of concerns
- 🚀 **Quick Setup**: Create complete modules in seconds
- 🎯 **Flexible**: Skip any layer you don't need
- 📦 **CRUD Ready**: Includes complete CRUD operations out of the box
- 🔧 **Customizable**: Easily adapt generated code to your needs
- 💉 **Dependency Injection**: Proper DI setup with repository pattern
- 🧪 **Testable**: Each layer can be tested independently
- 📝 **Well Documented**: Generated code includes helpful comments
- 🎨 **TypeScript First**: Full TypeScript support with proper typing

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g @nestjs-clean-arch/schematics
```

### Local Installation

```bash
npm install --save-dev @nestjs-clean-arch/schematics
```

### Using npx (No Installation Required)

```bash
npx @nestjs-clean-arch/schematics <module-name> [options]
```

## 🚀 Quick Start

Generate your first Clean Architecture module:

```bash
# If installed globally
nestjs-clean user

# If installed locally
npx nestjs-clean user

# Or use npx without installation
npx @nestjs-clean-arch/schematics user
```

This creates a complete user module with all layers in `src/modules/user/`.

## 💻 Usage

### Basic Command

```bash
nestjs-clean <module-name> [options]
```

### With Options

```bash
# Generate without gateway layer
nestjs-clean product --skip-gateway

# Custom path
nestjs-clean payment --path=src/features

# Minimal structure (folders only)
nestjs-clean order --minimal

# Skip multiple layers
nestjs-clean auth --sc --sr --sg
```

## 📁 Generated Structure

A complete module generates the following structure:

```
src/modules/<module-name>/
├── presentation/
│   ├── controllers/
│   │   └── <module-name>.controller.ts    # REST API endpoints
│   └── dtos/
│       ├── create-<module-name>.dto.ts     # Create validation DTO
│       └── update-<module-name>.dto.ts     # Update validation DTO
├── domain/
│   ├── entities/
│   │   └── <module-name>.entity.ts         # Business entity
│   └── interfaces/
│       └── <module-name>.repository.interface.ts  # Repository contract
├── application/
│   └── services/
│       └── <module-name>.service.ts        # Business logic
├── infrastructure/
│   ├── repositories/
│   │   └── <module-name>.repository.ts     # Data access implementation
│   └── gateways/
│       └── <module-name>.gateway.ts        # External integrations
└── <module-name>.module.ts                 # NestJS module configuration
```

## ⚙️ Configuration Options

### Arguments

| Argument | Description            | Required |
| -------- | ---------------------- | -------- |
| `<name>` | The name of the module | Yes      |

### Options

| Option              | Alias  | Description                             | Default       |
| ------------------- | ------ | --------------------------------------- | ------------- |
| `--path=<path>`     | -      | Path where module will be generated     | `src/modules` |
| `--flat`            | -      | Generate without creating module folder | `false`       |
| `--skip-controller` | `--sc` | Skip controller generation              | `false`       |
| `--skip-service`    | `--ss` | Skip service generation                 | `false`       |
| `--skip-repository` | `--sr` | Skip repository generation              | `false`       |
| `--skip-entity`     | `--se` | Skip entity generation                  | `false`       |
| `--skip-gateway`    | `--sg` | Skip gateway generation                 | `false`       |
| `--skip-dtos`       | `--sd` | Skip DTOs generation                    | `false`       |
| `--minimal`         | `-m`   | Generate minimal structure              | `false`       |
| `--crud`            | -      | Enable/disable CRUD operations          | `true`        |
| `--help`            | `-h`   | Display help message                    | -             |

## 📚 Examples

### Example 1: Complete User Module

```bash
nestjs-clean user
```

Generates a complete user module with all layers.

### Example 2: Product Without Gateway

```bash
nestjs-clean product --sg
```

Useful when you don't need external service integrations.

### Example 3: Minimal Order Module

```bash
nestjs-clean order --minimal
```

Creates only the folder structure without any files.

### Example 4: Custom Path

```bash
nestjs-clean payment --path=src/features
```

Generates the module in `src/features/payment/`.

### Example 5: API-Only Module

```bash
nestjs-clean auth --sr --sg --se
```

Creates only controller, service, and DTOs for API-only modules.

### Example 6: Domain-Only Module

```bash
nestjs-clean notification --sc --sd
```

Useful for background services without HTTP endpoints.

## 🔗 Integration with NestJS CLI

You can integrate this schematic with the NestJS CLI by adding it to your `nest-cli.json`:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  },
  "generateOptions": {
    "spec": false
  }
}
```

Then add a script to your `package.json`:

```json
{
  "scripts": {
    "generate:clean": "nestjs-clean",
    "g:clean": "nestjs-clean"
  }
}
```

Now you can use:

```bash
npm run g:clean user
```

## 🏛️ Architecture Overview

### Layer Responsibilities

#### 🎨 Presentation Layer

- **Controllers**: Handle HTTP requests/responses
- **DTOs**: Validate and transform input/output data
- **Purpose**: External interface for your application

#### 💼 Domain Layer

- **Entities**: Core business models with domain logic
- **Interfaces**: Repository contracts (dependency inversion)
- **Purpose**: Heart of your business logic, framework-agnostic

#### ⚙️ Application Layer

- **Services**: Orchestrate business logic and use cases
- **Purpose**: Application-specific business rules

#### 🔧 Infrastructure Layer

- **Repositories**: Data persistence implementations
- **Gateways**: External service integrations (APIs, queues, etc.)
- **Purpose**: Technical implementations and external dependencies

### Benefits of This Architecture

✅ **Separation of Concerns**: Each layer has a clear responsibility  
✅ **Testability**: Easy to unit test each layer independently  
✅ **Maintainability**: Changes in one layer don't affect others  
✅ **Flexibility**: Easy to swap implementations (e.g., database)  
✅ **Scalability**: Structure supports growth naturally  
✅ **SOLID Principles**: Built-in dependency inversion and single responsibility

## 🔄 Next Steps After Generation

1. **Import the Module**

   ```typescript
   // app.module.ts
   import { UserModule } from './modules/user/user.module';

   @Module({
     imports: [UserModule],
   })
   export class AppModule {}
   ```

2. **Customize the Entity**

   ```typescript
   // Add your domain-specific fields
   export class User {
     id: string;
     email: string; // Add this
     username: string; // Add this
     createdAt: Date;
     updatedAt: Date;
   }
   ```

3. **Update DTOs**

   ```typescript
   // Add validation for your fields
   export class CreateUserDto {
     @IsEmail()
     email: string;

     @IsString()
     @MinLength(3)
     username: string;
   }
   ```

4. **Implement Repository**

   ```typescript
   // Replace in-memory storage with real database
   constructor(
     @InjectRepository(UserEntity)
     private repo: Repository<UserEntity>
   ) {}
   ```

5. **Add Business Logic**
   ```typescript
   // Implement your use cases in the service
   async findByEmail(email: string): Promise<User> {
     return this.userRepository.findByEmail(email);
   }
   ```

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/MatheusHiro/nestjs-clean-arch-schematics.git

# Install dependencies
cd nestjs-clean-arch-schematics
npm install

# Build
npm run build

# Test locally
npm link
nestjs-clean test-module
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**MatheusHiro**

- GitHub: [@MatheusHiro](https://github.com/MatheusHiro)

## 🙏 Acknowledgments

- Inspired by Clean Architecture principles by Robert C. Martin
- Built for the NestJS community
- Thanks to all contributors

## 📞 Support

- 📫 Issues: [GitHub Issues](https://github.com/MatheusHiro/nestjs-clean-arch-schematics/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/MatheusHiro/nestjs-clean-arch-schematics/discussions)

---

⭐ If this project helped you, please consider giving it a star on GitHub!

**Happy Coding!** 🚀
