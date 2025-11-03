/**
 * Domain Event
 * Represents something that happened in the domain that domain experts care about
 * 
 * Type Parameter TPayload: The data carried by this event
 */
export abstract class DomainEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  public readonly occurredAt: Date;
  public readonly eventName: string;
  public readonly payload: Readonly<TPayload>;

  constructor(eventName: string, payload: TPayload) {
    this.occurredAt = new Date();
    this.eventName = eventName;
    this.payload = Object.freeze(payload);
  }

  /**
   * Get the aggregate ID that this event relates to
   */
  public abstract getAggregateId(): string;
}

