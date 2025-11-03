import { DomainEvent } from './domain-event';

/**
 * Domain Event Handler Interface
 * Implementations handle specific domain events
 * 
 * Type Parameter TEvent: The specific domain event this handler processes
 */
export interface DomainEventHandler<TEvent extends DomainEvent> {
  /**
   * Handle a domain event
   */
  handle(event: TEvent): Promise<void> | void;
}
