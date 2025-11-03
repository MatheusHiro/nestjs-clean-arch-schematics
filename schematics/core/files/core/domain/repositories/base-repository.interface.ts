import { AggregateRoot } from '../base/aggregate-root';

/**
 * Base Repository Interface
 * Generic repository interface for aggregate roots
 * Repositories should not throw exceptions for not found cases - return null/empty instead
 * 
 * Type Parameter TAggregate: The aggregate root type this repository manages
 */
export interface BaseRepository<TAggregate extends AggregateRoot<Record<string, unknown>>> {
  /**
   * Find an aggregate by its unique identifier
   * @returns The aggregate or null if not found
   */
  findById(id: string): Promise<TAggregate | null>;

  /**
   * Find all aggregates
   * @returns Array of aggregates (empty if none found)
   */
  findAll(): Promise<TAggregate[]>;

  /**
   * Save (create or update) an aggregate
   * @returns The saved aggregate
   */
  save(aggregate: TAggregate): Promise<TAggregate>;

  /**
   * Delete an aggregate
   * Silent operation - doesn't throw if not found
   */
  delete(id: string): Promise<void>;

  /**
   * Check if an aggregate exists
   */
  exists(id: string): Promise<boolean>;
}
