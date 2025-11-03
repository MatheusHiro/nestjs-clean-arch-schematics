import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Update<%= classify(name) %>Dto } from '../../presentation/dtos/update-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';
import { <%= classify(name) %>NotFoundException, Invalid<%= classify(name) %>Exception } from '../../domain/exceptions/<%= dasherize(name) %>.exception';

/**
 * Use Case: Update an existing <%= classify(name) %>
 * 
 * Responsibilities:
 * - Check if <%= camelize(name) %> exists
 * - Validate business rules
 * - Map DTO to ORM entity
 * - Update through repository
 * - Map result to domain entity
 * - Throw domain exceptions when rules are violated
 */
@Injectable()
export class Update<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string, dto: Update<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // Check if <%= camelize(name) %> exists
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new <%= classify(name) %>NotFoundException(id);
    }

    // TODO: Add business logic validation
    // Example: Check if update violates any domain rules

    // Map DTO to partial ORM entity
    const updateData = <%= classify(name) %>Mapper.toOrmPartial({
      // TODO: Map DTO fields
      // Example: ...(dto.name && { name: dto.name }),
    });

    // Update through repository (works with ORM entities)
    const updated<%= classify(name) %>Orm = await this.repository.update(id, updateData);
    
    // This shouldn't happen if exists() returned true, but handle it anyway
    if (!updated<%= classify(name) %>Orm) {
      throw new <%= classify(name) %>NotFoundException(id);
    }

    // Map ORM entity back to domain entity
    return <%= classify(name) %>Mapper.toDomain(updated<%= classify(name) %>Orm);
  }
}
