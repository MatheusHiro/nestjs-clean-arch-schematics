# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-02

### Added
- **Core Module Generator**: New `nestjs-clean core` command to generate base classes for Clean Architecture and DDD
  - `BaseEntity<TProps>`: Strongly-typed base entity without persistence concerns (no createdAt/updatedAt)
  - `AggregateRoot<TProps>`: Base aggregate root with domain events support
  - `ValueObject<TProps>`: Immutable value object with private constructor pattern
  - `BaseRepository<T>`: Generic repository interface for aggregates
  - `DomainEvent<TPayload>`: Base class for domain events
  - `DomainEventHandler<TEvent>`: Interface for event handlers
  - `BaseUseCase<TRequest, TResponse>`: Interface for use cases
  - `BaseMapper<TDomain, TPersistence, TDto>`: Interface for entity mappers
  - `Result<T, E>`: Monad for type-safe error handling
  - `Either<L, R>`: Monad for branching logic

- **Use Cases**: Modules now generate individual use cases for each operation
  - `CreateXUseCase`: Handles creation logic with validation
  - `GetAllXsUseCase`: Retrieves all entities
  - `GetXByIdUseCase`: Retrieves single entity with not found handling
  - `UpdateXUseCase`: Updates existing entity
  - `DeleteXUseCase`: Deletes entity with validation

- **Entity Mappers**: Automatic mapper generation for entity translation
  - Maps between Domain Entity ↔ ORM Entity ↔ DTO
  - Proper layer separation following Clean Architecture

- **ORM Entities**: Separate persistence models in infrastructure layer
  - Domain entities remain pure, framework-agnostic
  - ORM entities handle database concerns

### Changed
- **Repository Pattern**: Repositories now return `null` or empty arrays instead of throwing exceptions
  - `findById()` returns `T | null`
  - `findAll()` returns `T[]` (empty if none found)
  - `update()` returns `T | null`
  - `delete()` is silent (no exception if not found)

- **Service Layer**: Services now orchestrate use cases instead of containing business logic
  - Business logic moved to use cases
  - Services handle cross-cutting concerns (logging, caching, etc.)

- **Module Structure**: Enhanced structure with better separation
  - `application/use-cases/`: Individual use cases
  - `application/mappers/`: Entity mappers
  - `infrastructure/persistence/`: ORM entities

- **Interface Naming**: Removed 'I' prefix convention
  - Use implementation suffix instead (e.g., `UserRepositoryImpl`)
  - Cleaner, more idiomatic TypeScript

### Improved
- **Type Safety**: All core classes use proper TypeScript generics (NO `any` or `unknown`)
- **Immutability**: Value objects and results are truly immutable
- **Domain Purity**: Domain layer has zero framework dependencies
- **Error Handling**: Use Result/Either monads for explicit error handling

### Fixed
- Fixed pnpm compatibility issues with schematics binary path
- Proper module dependencies for use cases and mappers

## [1.0.0] - 2025-11-02

### Added
- Initial release of NestJS Clean Architecture Schematics
- Clean module generator with full layer support
- Support for presentation, domain, application, and infrastructure layers
- CLI tool `nestjs-clean` for easy module generation
- Skip options for all layers (controller, service, repository, entity, gateway, DTOs)
- Minimal mode for folder-only generation
- Comprehensive documentation and examples
- TypeScript support with full type safety
- Template files for all layers:
  - Controller with CRUD endpoints
  - Service with business logic
  - Repository with interface and implementation
  - Entity with domain model
  - DTOs for create and update operations
  - Gateway for external integrations
  - Module configuration
- Help command with detailed usage information
- Support for custom paths
- Flat mode for generating without module folder
- Short aliases for common options (--sc, --ss, etc.)

### Features
- 🏛️ Clean Architecture pattern implementation
- 🚀 Quick module scaffolding
- 🎯 Flexible layer selection
- 📦 CRUD operations out of the box
- 🔧 Customizable templates
- 💉 Proper dependency injection setup
- 🧪 Testable architecture
- 📝 Well-documented generated code
- 🎨 TypeScript-first approach

### Documentation
- Comprehensive README.md
- Detailed EXAMPLES.md with real-world scenarios
- CONTRIBUTING.md for contributors
- MIT License

[1.0.0]: https://github.com/MatheusHiro/nestjs-clean-arch-schematics/releases/tag/v1.0.0

