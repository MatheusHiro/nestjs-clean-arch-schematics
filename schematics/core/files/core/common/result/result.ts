/**
 * Result<T, E>
 * Represents the result of an operation that can succeed or fail
 * Success contains a value of type T
 * Failure contains an error of type E
 * 
 * Type Parameters:
 * - T: The type of the success value
 * - E: The type of the error (defaults to string)
 */
export class Result<T, E = string> {
  private readonly _isSuccess: boolean;
  private readonly _error?: E;
  private readonly _value?: T;

  private constructor(isSuccess: boolean, error?: E, value?: T) {
    this._isSuccess = isSuccess;
    this._error = error;
    this._value = value;

    // Freeze to make immutable
    Object.freeze(this);
  }

  /**
   * Create a successful result
   */
  public static ok<U>(value: U): Result<U, never> {
    return new Result<U, never>(true, undefined, value);
  }

  /**
   * Create a failed result
   */
  public static fail<F>(error: F): Result<never, F> {
    return new Result<never, F>(false, error);
  }

  /**
   * Combine multiple results
   * Returns success only if all results are successful
   */
  public static combine<R extends Result<unknown, unknown>[]>(
    ...results: R
  ): Result<void, unknown> {
    for (const result of results) {
      if (result.isFailure) {
        return Result.fail(result.error);
      }
    }
    return Result.ok(undefined);
  }

  /**
   * Check if the result is a success
   */
  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  /**
   * Check if the result is a failure
   */
  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  /**
   * Get the success value
   * Throws if result is a failure
   */
  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot get value from a failed result');
    }
    return this._value as T;
  }

  /**
   * Get the error
   * Returns undefined if result is a success
   */
  public get error(): E | undefined {
    return this._error;
  }

  /**
   * Get the value or a default if failed
   */
  public getValueOrDefault(defaultValue: T): T {
    return this._isSuccess ? (this._value as T) : defaultValue;
  }

  /**
   * Map the success value to a new value
   */
  public map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isFailure) {
      return Result.fail(this._error as E);
    }
    return Result.ok(fn(this._value as T));
  }

  /**
   * Flat map (chain) operations
   */
  public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isFailure) {
      return Result.fail(this._error as E);
    }
    return fn(this._value as T);
  }

  /**
   * Execute a function if result is successful
   */
  public onSuccess(fn: (value: T) => void): Result<T, E> {
    if (this.isSuccess) {
      fn(this._value as T);
    }
    return this;
  }

  /**
   * Execute a function if result is a failure
   */
  public onFailure(fn: (error: E) => void): Result<T, E> {
    if (this.isFailure) {
      fn(this._error as E);
    }
    return this;
  }
}

