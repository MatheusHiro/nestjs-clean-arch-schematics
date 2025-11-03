import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Create<%= classify(name) %>Dto } from '../../presentation/dtos/create-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';
import { <%= classify(name) %>AlreadyExistsException, Invalid<%= classify(name) %>Exception } from '../../domain/exceptions/<%= dasherize(name) %>.exception';

/**
 * Use Case: Create a new <%= classify(name) %>
 * 
 * Responsibilities:
 * - Validate business rules
 * - Create domain entity
 * - Map domain entity to ORM entity
 * - Persist through repository
 * - Map ORM entity back to domain entity
 * - Throw domain exceptions when rules are violated
 */
@Injectable()
export class Create<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(dto: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // TODO: Add business logic validation
    // Example: Check if <%= camelize(name) %> already exists
    // const exists = await this.repository.exists(someIdentifier);
    // if (exists) {
    //   throw new <%= classify(name) %>AlreadyExistsException(someIdentifier);
    // }

    // Create domain entity (domain validation happens here)
    let <%= camelize(name) %>Domain: <%= classify(name) %>;
    try {
      <%= camelize(name) %>Domain = <%= classify(name) %>.create({
        // TODO: Map DTO to domain entity properties
        // Example: name: dto.name,
      });
    } catch (error) {
      // Re-throw domain exceptions
      if (error instanceof Error) {
        throw new Invalid<%= classify(name) %>Exception(error.message);
      }
      throw error;
    }

    // Map domain entity to ORM entity for persistence
    const <%= camelize(name) %>Orm = <%= classify(name) %>Mapper.toOrm(<%= camelize(name) %>Domain);

    // Persist through repository (works with ORM entities)
    const created<%= classify(name) %>Orm = await this.repository.create(<%= camelize(name) %>Orm);

    // Map ORM entity back to domain entity
    return <%= classify(name) %>Mapper.toDomain(created<%= classify(name) %>Orm);
  }
}
