# Package Summary

## 📦 nestjs-clean-arch-schematics

A standalone npm package for generating Clean Architecture modules in NestJS projects.

## Package Structure

```
nestjs-clean-arch-schematics/
├── bin/
│   └── nestjs-clean.js              # CLI executable
├── schematics/
│   ├── collection.json              # Schematic collection definition
│   ├── index.ts                     # Package exports
│   └── clean-module/
│       ├── index.ts                 # Main schematic logic
│       ├── schema.json              # CLI options schema
│       └── files/                   # Template files
│           ├── __name@dasherize__.module.ts
│           ├── application/
│           │   └── services/
│           ├── domain/
│           │   ├── entities/
│           │   └── interfaces/
│           ├── infrastructure/
│           │   ├── repositories/
│           │   └── gateways/
│           └── presentation/
│               ├── controllers/
│               └── dtos/
├── dist/                            # Compiled output (generated on build)
├── package.json                     # Package configuration
├── tsconfig.json                    # TypeScript configuration
├── .npmignore                       # Files to exclude from npm
├── .gitignore                       # Files to exclude from git
├── LICENSE                          # MIT License
├── README.md                        # Main documentation
├── QUICKSTART.md                    # Quick start guide
├── EXAMPLES.md                      # Usage examples
├── CONTRIBUTING.md                  # Contribution guidelines
├── PUBLISHING.md                    # Publishing guide
├── CHANGELOG.md                     # Version history
└── PACKAGE_SUMMARY.md               # This file
```

## How It Works

### 1. CLI Entry Point

`bin/nestjs-clean.js` is the executable that users run:

- Parses command-line arguments
- Shows help when needed
- Executes the Angular Devkit schematics

### 2. Schematic Collection

`schematics/collection.json` defines available schematics:

- Currently includes `clean-module` schematic
- Can be extended with more schematics in the future

### 3. Schematic Logic

`schematics/clean-module/index.ts` contains:

- Option parsing and validation
- File filtering based on skip options
- Template processing with EJS
- File generation and placement
- User feedback and summaries

### 4. Template Files

Files in `schematics/clean-module/files/` are templates:

- Use EJS syntax: `<%= variable %>`
- Special naming: `__name@dasherize__` becomes actual module name
- Processed by Angular Devkit during generation

### 5. Build Process

When built (`npm run build`):

1. TypeScript compiles `schematics/**/*.ts` to `dist/`
2. JSON schemas are copied to `dist/`
3. Template files are copied to `dist/clean-module/files/`
4. Result is ready for npm publishing

## Installation Methods

### For End Users

```bash
# Global installation
npm install -g nestjs-clean-arch-schematics

# Local installation
npm install --save-dev nestjs-clean-arch-schematics

# Use with npx (no installation)
npx nestjs-clean-arch-schematics <module-name>
```

### For Developers

```bash
# Clone and develop
git clone <repo-url>
cd nestjs-clean-arch-schematics
npm install
npm run build
npm link
```

## Usage

### Basic Usage

```bash
nestjs-clean <module-name> [options]
```

### Available Options

- `--path=<path>` - Custom generation path
- `--flat` - Generate without module folder
- `--skip-controller` or `--sc` - Skip controller
- `--skip-service` or `--ss` - Skip service
- `--skip-repository` or `--sr` - Skip repository
- `--skip-entity` or `--se` - Skip entity
- `--skip-gateway` or `--sg` - Skip gateway
- `--skip-dtos` or `--sd` - Skip DTOs
- `--minimal` or `-m` - Minimal structure
- `--help` - Show help

## Generated Module Structure

```
src/modules/<module-name>/
├── presentation/          # External interface
│   ├── controllers/      # HTTP endpoints
│   └── dtos/            # Data validation
├── domain/               # Business logic
│   ├── entities/        # Domain models
│   └── interfaces/      # Contracts
├── application/          # Use cases
│   └── services/        # Business orchestration
├── infrastructure/       # Technical details
│   ├── repositories/    # Data access
│   └── gateways/        # External services
└── <module-name>.module.ts  # NestJS module
```

## Key Features

### 1. Template Processing

Templates use EJS syntax:

- `<%= classify(name) %>` - PascalCase (UserModule)
- `<%= dasherize(name) %>` - kebab-case (user-module)
- `<%= camelize(name) %>` - camelCase (userModule)
- `<%= underscore(name) %>` - snake_case (user_module)

### 2. Conditional Generation

Skip options control which files are generated:

```typescript
<% if (!skipController) { %>
import { UserController } from './controllers/user.controller';
<% } %>
```

### 3. Path Normalization

Handles different path formats:

- Relative paths: `src/modules`
- Absolute paths: `/home/user/project/src/modules`
- Custom paths: `--path=src/features`

### 4. User Feedback

Provides clear output:

- Success messages
- Generated file list
- Skipped layers
- Next steps guidance

## Development Workflow

### Making Changes

1. **Modify Templates**

   - Edit files in `schematics/clean-module/files/`
   - Use EJS syntax for variables

2. **Update Logic**

   - Edit `schematics/clean-module/index.ts`
   - Update option handling or file generation

3. **Update Schema**

   - Edit `schematics/clean-module/schema.json`
   - Add new options or modify existing ones

4. **Build and Test**
   ```bash
   npm run build
   npm link
   nestjs-clean test-module
   ```

### Adding New Features

1. Add option to `schema.json`
2. Update TypeScript interface
3. Implement logic in schematic
4. Update documentation
5. Test thoroughly
6. Update CHANGELOG.md

## Publishing Process

1. **Prepare**

   ```bash
   npm run build
   npm run test  # If tests exist
   ```

2. **Version Bump**

   ```bash
   npm version [patch|minor|major]
   ```

3. **Publish**

   ```bash
   npm publish --access public
   ```

4. **Tag Release**

   ```bash
   git push origin main --tags
   ```

5. **Create GitHub Release**
   - Document changes
   - Upload artifacts if needed

## Maintenance

### Regular Tasks

- Monitor issues and PRs
- Update dependencies
- Fix bugs promptly
- Add new features based on feedback
- Keep documentation current
- Respond to community questions

### Security

- Run `npm audit` regularly
- Update dependencies for security patches
- Review and fix vulnerability reports

### Community

- Welcome contributions
- Provide clear contribution guidelines
- Be responsive to issues
- Foster positive community

## Dependencies

### Runtime Dependencies

- `@angular-devkit/core` - Core schematics utilities
- `@angular-devkit/schematics` - Schematic framework

### Development Dependencies

- `@angular-devkit/schematics-cli` - CLI tools
- `@types/node` - Node.js type definitions
- `typescript` - TypeScript compiler

### Peer Dependencies

- `@nestjs/common` - NestJS common module
- `@nestjs/core` - NestJS core module

## Versioning

Follows [Semantic Versioning](https://semver.org/):

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, backward compatible

## License

MIT License - Free to use, modify, and distribute

## Support

- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and discussions
- Documentation: README, EXAMPLES, QUICKSTART

## Future Enhancements

Potential future features:

- GraphQL resolver templates
- Microservice templates
- CQRS pattern support
- Event sourcing templates
- Testing templates
- Docker configuration
- CI/CD templates

## Credits

- Built with Angular Devkit Schematics
- Inspired by Clean Architecture principles
- Created for the NestJS community

---

For more information, see:

- [README.md](./README.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - Getting started
- [EXAMPLES.md](./EXAMPLES.md) - Usage examples
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [PUBLISHING.md](./PUBLISHING.md) - Publishing guide
