import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Repository } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %>OrmEntity } from '../persistence/<%= dasherize(name) %>.orm-entity';

/**
 * <%= classify(name) %> Repository Implementation
 * 
 * Responsibilities:
 * - Work ONLY with ORM entities (persistence layer)
 * - Handle database operations
 * - Return null/empty arrays instead of throwing exceptions
 * - NO mapping to domain entities (that's the use case's job)
 * - NO business logic (that's the domain's job)
 * 
 * Important: Repository does NOT know about domain entities or mappers
 */
@Injectable()
export class <%= classify(name) %>RepositoryImpl implements <%= classify(name) %>Repository {
  // TODO: Inject your database adapter (TypeORM, Prisma, Mongoose, etc.)
  // Example with TypeORM:
  // constructor(
  //   @InjectRepository(<%= classify(name) %>OrmEntity)
  //   private readonly ormRepository: Repository<<%= classify(name) %>OrmEntity>,
  // ) {}

  // In-memory storage for demo purposes - replace with real database
  private <%= camelize(name) %>OrmEntities: <%= classify(name) %>OrmEntity[] = [];

  /**
   * Find all <%= camelize(name) %>s
   * @returns Array of ORM entities (empty if none found, never throws)
   */
  async findAll(): Promise<<%= classify(name) %>OrmEntity[]> {
    // TODO: Replace with actual database query
    // Example: return await this.ormRepository.find();
    
    return [...this.<%= camelize(name) %>OrmEntities];
  }

  /**
   * Find <%= camelize(name) %> by ID
   * @returns ORM entity or null if not found (never throws)
   */
  async findById(id: string): Promise<<%= classify(name) %>OrmEntity | null> {
    // TODO: Replace with actual database query
    // Example: return await this.ormRepository.findOne({ where: { id } });
    
    const entity = this.<%= camelize(name) %>OrmEntities.find(e => e.id === id);
    return entity ?? null;
  }

  /**
   * Create a new <%= camelize(name) %>
   * @returns Created ORM entity
   */
  async create(data: Partial<<%= classify(name) %>OrmEntity>): Promise<<%= classify(name) %>OrmEntity> {
    // TODO: Replace with actual database operation
    // Example: return await this.ormRepository.save(data);
    
    const entity = new <%= classify(name) %>OrmEntity({
      ...data,
      id: Date.now().toString(), // TODO: Use proper ID generation (UUID, etc.)
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    this.<%= camelize(name) %>OrmEntities.push(entity);
    return entity;
  }

  /**
   * Update an existing <%= camelize(name) %>
   * @returns Updated ORM entity or null if not found (never throws)
   */
  async update(id: string, data: Partial<<%= classify(name) %>OrmEntity>): Promise<<%= classify(name) %>OrmEntity | null> {
    // TODO: Replace with actual database operation
    // Example:
    // await this.ormRepository.update(id, { ...data, updatedAt: new Date() });
    // return await this.ormRepository.findOne({ where: { id } });
    
    const index = this.<%= camelize(name) %>OrmEntities.findIndex(e => e.id === id);
    
    if (index === -1) {
      return null; // Not found - return null, don't throw
    }

    const updated = new <%= classify(name) %>OrmEntity({
      ...this.<%= camelize(name) %>OrmEntities[index],
      ...data,
      id, // Preserve ID
      updatedAt: new Date(),
    });
    
    this.<%= camelize(name) %>OrmEntities[index] = updated;
    return updated;
  }

  /**
   * Delete a <%= camelize(name) %>
   * Silent operation - doesn't throw if not found
   */
  async delete(id: string): Promise<void> {
    // TODO: Replace with actual database operation
    // Example: await this.ormRepository.delete(id);
    
    const index = this.<%= camelize(name) %>OrmEntities.findIndex(e => e.id === id);
    
    if (index !== -1) {
      this.<%= camelize(name) %>OrmEntities.splice(index, 1);
    }
    
    // Silent operation - no exception if not found
  }

  /**
   * Check if <%= camelize(name) %> exists
   */
  async exists(id: string): Promise<boolean> {
    // TODO: Replace with actual database query
    // Example: return await this.ormRepository.exist({ where: { id } });
    
    return this.<%= camelize(name) %>OrmEntities.some(e => e.id === id);
  }
}
