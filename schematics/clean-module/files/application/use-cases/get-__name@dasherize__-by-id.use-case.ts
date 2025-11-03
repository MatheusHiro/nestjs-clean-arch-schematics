import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';
import { <%= classify(name) %>NotFoundException } from '../../domain/exceptions/<%= dasherize(name) %>.exception';

/**
 * Use Case: Get <%= classify(name) %> by ID
 * 
 * Responsibilities:
 * - Retrieve ORM entity from repository
 * - Throw domain exception if not found
 * - Map ORM entity to domain entity
 */
@Injectable()
export class Get<%= classify(name) %>ByIdUseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string): Promise<<%= classify(name) %>> {
    // Get ORM entity from repository (returns null if not found)
    const <%= camelize(name) %>Orm = await this.repository.findById(id);
    
    // Throw domain exception if not found
    if (!<%= camelize(name) %>Orm) {
      throw new <%= classify(name) %>NotFoundException(id);
    }

    // Map ORM entity to domain entity
    return <%= classify(name) %>Mapper.toDomain(<%= camelize(name) %>Orm);
  }
}
