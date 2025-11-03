import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { <%= classify(name) %>OrmEntity } from '../../infrastructure/persistence/<%= dasherize(name) %>.orm-entity';

/**
 * <%= classify(name) %> Mapper
 * 
 * Responsibilities:
 * - Map between ORM entities (persistence) and Domain entities (business logic)
 * - Used ONLY by use cases in the application layer
 * - Repository does NOT use this mapper
 * 
 * Following Clean Architecture principles:
 * - Repository works with ORM entities
 * - Use cases translate ORM ↔ Domain using this mapper
 * - Domain entities remain pure and framework-agnostic
 */
export class <%= classify(name) %>Mapper {
  /**
   * Convert ORM Entity (persistence) to Domain Entity (business logic)
   * Used when retrieving data from repository
   */
  static toDomain(ormEntity: <%= classify(name) %>OrmEntity): <%= classify(name) %> {
    // TODO: Map ORM entity fields to domain entity
    return <%= classify(name) %>.create(
      {
        // TODO: Map your fields here
        // Example: name: ormEntity.name,
      },
      ormEntity.id
    );
  }

  /**
   * Convert Domain Entity to ORM Entity (for persistence)
   * Used when saving data through repository
   */
  static toOrm(domainEntity: <%= classify(name) %>): Partial<<%= classify(name) %>OrmEntity> {
    return {
      id: domainEntity.id,
      // TODO: Map domain entity properties to ORM entity
      // Example: name: domainEntity.name,
      // Note: createdAt/updatedAt handled by repository
    };
  }

  /**
   * Convert array of ORM entities to Domain entities
   */
  static toDomainList(ormEntities: <%= classify(name) %>OrmEntity[]): <%= classify(name) %>[] {
    return ormEntities.map(entity => this.toDomain(entity));
  }

  /**
   * Create partial ORM entity from domain data (for updates)
   */
  static toOrmPartial(data: Partial<{ /* TODO: Add domain fields */ }>): Partial<<%= classify(name) %>OrmEntity> {
    return {
      // TODO: Map partial domain data to ORM entity
      // Example: ...(data.name && { name: data.name }),
    };
  }
}
