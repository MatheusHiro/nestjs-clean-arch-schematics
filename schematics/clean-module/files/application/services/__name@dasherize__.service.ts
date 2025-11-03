import { Injectable } from '@nestjs/common';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Create<%= classify(name) %>Dto } from '../../presentation/dtos/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from '../../presentation/dtos/update-<%= dasherize(name) %>.dto';
import { Create<%= classify(name) %>UseCase } from '../use-cases/create-<%= dasherize(name) %>.use-case';
import { GetAll<%= classify(name) %>sUseCase } from '../use-cases/get-all-<%= dasherize(name) %>s.use-case';
import { Get<%= classify(name) %>ByIdUseCase } from '../use-cases/get-<%= dasherize(name) %>-by-id.use-case';
import { Update<%= classify(name) %>UseCase } from '../use-cases/update-<%= dasherize(name) %>.use-case';
import { Delete<%= classify(name) %>UseCase } from '../use-cases/delete-<%= dasherize(name) %>.use-case';

/**
 * Application Service
 * Responsibilities:
 * - Orchestrate use cases
 * - Provide a unified interface for the presentation layer
 * - Handle cross-cutting concerns (logging, caching, etc.)
 * 
 * Note: Business logic should be in use cases, not here
 */
@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    private readonly create<%= classify(name) %>UseCase: Create<%= classify(name) %>UseCase,
    private readonly getAll<%= classify(name) %>sUseCase: GetAll<%= classify(name) %>sUseCase,
    private readonly get<%= classify(name) %>ByIdUseCase: Get<%= classify(name) %>ByIdUseCase,
    private readonly update<%= classify(name) %>UseCase: Update<%= classify(name) %>UseCase,
    private readonly delete<%= classify(name) %>UseCase: Delete<%= classify(name) %>UseCase,
  ) {}

  /**
   * Get all <%= camelize(name) %>s
   */
  async findAll(): Promise<<%= classify(name) %>[]> {
    // TODO: Add cross-cutting concerns (logging, caching, etc.)
    return this.getAll<%= classify(name) %>sUseCase.execute();
  }

  /**
   * Get a <%= camelize(name) %> by ID
   * @throws NotFoundException if <%= camelize(name) %> not found
   */
  async findById(id: string): Promise<<%= classify(name) %>> {
    // TODO: Add cross-cutting concerns (logging, caching, etc.)
    return this.get<%= classify(name) %>ByIdUseCase.execute(id);
    }

  /**
   * Create a new <%= camelize(name) %>
   */
  async create(createDto: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // TODO: Add cross-cutting concerns (logging, events, etc.)
    return this.create<%= classify(name) %>UseCase.execute(createDto);
  }

  /**
   * Update an existing <%= camelize(name) %>
   * @throws NotFoundException if <%= camelize(name) %> not found
   */
  async update(id: string, updateDto: Update<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // TODO: Add cross-cutting concerns (logging, events, etc.)
    return this.update<%= classify(name) %>UseCase.execute(id, updateDto);
  }

  /**
   * Delete a <%= camelize(name) %>
   * @throws NotFoundException if <%= camelize(name) %> not found
   */
  async delete(id: string): Promise<void> {
    // TODO: Add cross-cutting concerns (logging, events, etc.)
    return this.delete<%= classify(name) %>UseCase.execute(id);
  }
}
