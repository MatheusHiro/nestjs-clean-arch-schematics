/**
 * Base Mapper Interface
 * Maps between different representations of entities
 * (Domain Entity <-> Persistence/ORM Entity <-> DTO)
 * 
 * Type Parameters:
 * - TDomain: Domain entity type
 * - TPersistence: Persistence/ORM entity type
 * - TDto: Data Transfer Object type (optional)
 */
export interface BaseMapper<TDomain, TPersistence, TDto = Record<string, unknown>> {
  /**
   * Map from persistence model to domain entity
   */
  toDomain(persistence: TPersistence): TDomain;

  /**
   * Map from domain entity to persistence model
   */
  toPersistence(domain: TDomain): TPersistence;

  /**
   * Map from DTO to domain entity (optional - for create/update operations)
   */
  dtoToDomain?(dto: TDto): TDomain | Partial<TDomain>;

  /**
   * Map from domain entity to DTO (optional - for responses)
   */
  domainToDto?(domain: TDomain): TDto;
}
