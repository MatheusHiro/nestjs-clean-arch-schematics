/**
 * Either<L, R>
 * Represents a value that can be one of two types
 * Left conventionally represents an error/failure
 * Right conventionally represents a success value
 * 
 * Type Parameters:
 * - L: The type of the left (error) value
 * - R: The type of the right (success) value
 */
export class Either<L, R> {
  private readonly _isLeft: boolean;
  private readonly _left?: L;
  private readonly _right?: R;

  private constructor(isLeft: boolean, left?: L, right?: R) {
    this._isLeft = isLeft;
    this._left = left;
    this._right = right;

    // Freeze to make immutable
    Object.freeze(this);
  }

  /**
   * Create a Left (error) value
   */
  public static left<L, R = never>(value: L): Either<L, R> {
    return new Either<L, R>(true, value);
  }

  /**
   * Create a Right (success) value
   */
  public static right<R, L = never>(value: R): Either<L, R> {
    return new Either<L, R>(false, undefined, value);
  }

  /**
   * Check if this is a Left value
   */
  public get isLeft(): boolean {
    return this._isLeft;
  }

  /**
   * Check if this is a Right value
   */
  public get isRight(): boolean {
    return !this._isLeft;
  }

  /**
   * Get the Left value
   * Throws if this is a Right
   */
  public getLeft(): L {
    if (!this._isLeft) {
      throw new Error('Cannot get Left value from a Right');
    }
    return this._left as L;
  }

  /**
   * Get the Right value
   * Throws if this is a Left
   */
  public getRight(): R {
    if (this._isLeft) {
      throw new Error('Cannot get Right value from a Left');
    }
    return this._right as R;
  }

  /**
   * Get the value (Left or Right)
   */
  public get value(): L | R {
    return this._isLeft ? (this._left as L) : (this._right as R);
  }

  /**
   * Map the Right value
   */
  public map<T>(fn: (value: R) => T): Either<L, T> {
    if (this.isLeft) {
      return Either.left(this._left as L);
    }
    return Either.right(fn(this._right as R));
  }

  /**
   * Map the Left value
   */
  public mapLeft<T>(fn: (value: L) => T): Either<T, R> {
    if (this.isRight) {
      return Either.right(this._right as R);
    }
    return Either.left(fn(this._left as L));
  }

  /**
   * Flat map (chain) operations on Right
   */
  public flatMap<T>(fn: (value: R) => Either<L, T>): Either<L, T> {
    if (this.isLeft) {
      return Either.left(this._left as L);
    }
    return fn(this._right as R);
  }

  /**
   * Execute a function based on Left or Right
   */
  public fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T {
    return this.isLeft ? onLeft(this._left as L) : onRight(this._right as R);
  }

  /**
   * Execute a function if this is a Right
   */
  public onRight(fn: (value: R) => void): Either<L, R> {
    if (this.isRight) {
      fn(this._right as R);
    }
    return this;
  }

  /**
   * Execute a function if this is a Left
   */
  public onLeft(fn: (value: L) => void): Either<L, R> {
    if (this.isLeft) {
      fn(this._left as L);
    }
    return this;
  }
}

