import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';

/**
 * Use Case: Get all <%= classify(name) %>s
 * 
 * Responsibilities:
 * - Retrieve ORM entities from repository
 * - Map ORM entities to domain entities
 */
@Injectable()
export class GetAll<%= classify(name) %>sUseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(): Promise<<%= classify(name) %>[]> {
    // Get ORM entities from repository
    const <%= camelize(name) %>OrmList = await this.repository.findAll();

    // Map ORM entities to domain entities
    return <%= classify(name) %>Mapper.toDomainList(<%= camelize(name) %>OrmList);
  }
}
