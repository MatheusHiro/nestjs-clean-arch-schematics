/**
 * Value Object
 * Immutable objects that are defined by their attributes, not by an identity
 * Two value objects with the same attributes are considered equal
 * 
 * Type Parameter TProps: The properties that define this value object
 */
export abstract class ValueObject<TProps extends Record<string, unknown>> {
  private readonly props: TProps;

  protected constructor(props: TProps) {
    this.props = Object.freeze(props);
  }

  /**
   * Value objects are compared by their attributes
   */
  public equals(vo?: ValueObject<TProps>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  /**
   * Get the value object's properties (read-only)
   */
  public get value(): Readonly<TProps> {
    return this.props;
  }
}
