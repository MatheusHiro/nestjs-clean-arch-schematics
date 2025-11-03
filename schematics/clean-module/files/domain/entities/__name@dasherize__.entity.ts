import { BaseEntity } from '../../../core';

interface <%= classify(name) %>Props {
  // TODO: Add your domain properties here
  // Example: name: string;
}

/**
 * <%= classify(name) %> Domain Entity
 * Represents the core business object in the domain layer
 * Pure domain logic - no framework dependencies
 */
export class <%= classify(name) %> extends BaseEntity<<%= classify(name) %>Props> {
  private constructor(props: <%= classify(name) %>Props, id?: string) {
    super(props, id);
  }

  /**
   * Factory method to create a new <%= classify(name) %>
   * Use this instead of constructor for creation with validation
   */
  public static create(props: <%= classify(name) %>Props, id?: string): <%= classify(name) %> {
    // TODO: Add domain validation here
    // Example: if (!props.name) throw new Invalid<%= classify(name) %>Exception('Name is required');
    
    return new <%= classify(name) %>(props, id);
  }

  // TODO: Add domain methods here
  // Example:
  // changeName(newName: string): void {
  //   if (!newName) throw new Invalid<%= classify(name) %>Exception('Name cannot be empty');
  //   this.props.name = newName;
  // }
  
  // Getters for accessing properties
  // Example:
  // get name(): string {
  //   return this.props.name;
  // }
}
