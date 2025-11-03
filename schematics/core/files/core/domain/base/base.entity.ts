/**
 * Base Entity
 * All entities should extend this class
 * Entities are identified by their unique ID, not by their attributes
 * 
 * Type Parameter TProps: The properties that define this entity (excluding id)
 */
export abstract class BaseEntity<TProps extends Record<string, unknown>> {
  protected readonly _id: string;
  protected props: TProps;

  constructor(props: TProps, id?: string) {
    this._id = id ?? this.generateId();
    this.props = props;
  }

  /**
   * Entities are compared by their ID, not their properties
   */
  public equals(entity?: BaseEntity<TProps>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    if (!(entity instanceof BaseEntity)) {
      return false;
    }

    return this._id === entity._id;
  }

  get id(): string {
    return this._id;
  }

  /**
   * Generate a unique ID
   * Override this method to use your preferred ID generation strategy
   */
  protected generateId(): string {
    // Simple implementation - replace with UUID, etc.
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get a shallow copy of the entity's properties
   */
  public getProps(): Readonly<TProps> {
    return Object.freeze({ ...this.props });
  }
}
