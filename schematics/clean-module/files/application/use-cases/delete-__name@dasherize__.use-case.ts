import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %>NotFoundException } from '../../domain/exceptions/<%= dasherize(name) %>.exception';

/**
 * Use Case: Delete a <%= classify(name) %>
 * 
 * Responsibilities:
 * - Check if <%= camelize(name) %> exists
 * - Validate if <%= camelize(name) %> can be deleted (business rules)
 * - Delete through repository
 * - Throw domain exception if not found or cannot be deleted
 */
@Injectable()
export class Delete<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if <%= camelize(name) %> exists
    const <%= camelize(name) %>Orm = await this.repository.findById(id);
    if (!<%= camelize(name) %>Orm) {
      throw new <%= classify(name) %>NotFoundException(id);
    }

    // TODO: Add business logic validation before deletion
    // Example: Check if <%= camelize(name) %> has dependencies that prevent deletion
    // if (hasBlockingDependencies) {
    //   throw new <%= classify(name) %>DomainException('Cannot delete: has dependencies');
    // }

    // Delete through repository
    await this.repository.delete(id);
  }
}
