/**
 * Domain Exception for <%= classify(name) %>
 * Thrown when domain rules are violated
 */
export class <%= classify(name) %>DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = '<%= classify(name) %>DomainException';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * <%= classify(name) %> Not Found Exception
 * Thrown when a <%= camelize(name) %> is not found
 */
export class <%= classify(name) %>NotFoundException extends <%= classify(name) %>DomainException {
  constructor(id: string) {
    super(`<%= classify(name) %> with ID ${id} not found`);
    this.name = '<%= classify(name) %>NotFoundException';
  }
}

/**
 * <%= classify(name) %> Already Exists Exception
 * Thrown when attempting to create a <%= camelize(name) %> that already exists
 */
export class <%= classify(name) %>AlreadyExistsException extends <%= classify(name) %>DomainException {
  constructor(identifier: string) {
    super(`<%= classify(name) %> with identifier ${identifier} already exists`);
    this.name = '<%= classify(name) %>AlreadyExistsException';
  }
}

/**
 * Invalid <%= classify(name) %> Exception
 * Thrown when <%= camelize(name) %> data is invalid
 */
export class Invalid<%= classify(name) %>Exception extends <%= classify(name) %>DomainException {
  constructor(message: string) {
    super(`Invalid <%= camelize(name) %>: ${message}`);
    this.name = 'Invalid<%= classify(name) %>Exception';
  }
}

