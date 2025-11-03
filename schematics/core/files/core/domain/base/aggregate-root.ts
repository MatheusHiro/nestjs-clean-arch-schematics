import { BaseEntity } from './base.entity';
import { DomainEvent } from '../events/domain-event';

/**
 * Aggregate Root
 * Entry point for accessing an aggregate
 * Responsible for maintaining invariants and publishing domain events
 * 
 * Type Parameter TProps: The properties that define this aggregate
 */
export abstract class AggregateRoot<TProps extends Record<string, unknown>> extends BaseEntity<TProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): ReadonlyArray<DomainEvent> {
    return Object.freeze([...this._domainEvents]);
  }

  /**
   * Add a domain event to be published
   */
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  /**
   * Clear all domain events (typically called after publishing)
   */
  public clearEvents(): void {
    this._domainEvents = [];
  }

  /**
   * Check if aggregate has unpublished domain events
   */
  public hasUnpublishedEvents(): boolean {
    return this._domainEvents.length > 0;
  }
}
