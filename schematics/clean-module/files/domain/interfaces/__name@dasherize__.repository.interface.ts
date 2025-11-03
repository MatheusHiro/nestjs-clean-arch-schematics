import { <%= classify(name) %>OrmEntity } from '../../infrastructure/persistence/<%= dasherize(name) %>.orm-entity';

export const <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN = Symbol('<%= classify(name) %>Repository');

/**
 * <%= classify(name) %> Repository Interface (Port)
 * Defines the contract for data access operations
 * Works with ORM entities - NOT domain entities
 * Domain entities are handled by use cases using mappers
 * 
 * Following Clean Architecture: Domain layer defines the interface, Infrastructure implements it
 */
export interface <%= classify(name) %>Repository {
  /**
   * Find all <%= camelize(name) %>s
   * @returns Array of ORM entities (empty array if none found, never throws)
   */
  findAll(): Promise<<%= classify(name) %>OrmEntity[]>;

  /**
   * Find <%= camelize(name) %> by ID
   * @param id - The <%= camelize(name) %> identifier
   * @returns ORM entity or null if not found (never throws)
   */
  findById(id: string): Promise<<%= classify(name) %>OrmEntity | null>;

  /**
   * Create a new <%= camelize(name) %>
   * @param data - Partial ORM entity data
   * @returns Created ORM entity
   */
  create(data: Partial<<%= classify(name) %>OrmEntity>): Promise<<%= classify(name) %>OrmEntity>;

  /**
   * Update an existing <%= camelize(name) %>
   * @param id - The <%= camelize(name) %> identifier
   * @param data - Partial ORM entity data to update
   * @returns Updated ORM entity or null if not found (never throws)
   */
  update(id: string, data: Partial<<%= classify(name) %>OrmEntity>): Promise<<%= classify(name) %>OrmEntity | null>;

  /**
   * Delete a <%= camelize(name) %>
   * @param id - The <%= camelize(name) %> identifier
   * @returns void (silent operation, never throws even if not found)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if <%= camelize(name) %> exists
   * @param id - The <%= camelize(name) %> identifier
   * @returns true if exists, false otherwise (never throws)
   */
  exists(id: string): Promise<boolean>;
}
