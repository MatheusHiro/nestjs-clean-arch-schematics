/**
 * Base Use Case Interface
 * All use cases should implement this interface
 * Use cases encapsulate application-specific business rules
 * 
 * Type Parameters:
 * - TRequest: The input data for the use case
 * - TResponse: The output data from the use case
 */
export interface BaseUseCase<TRequest = void, TResponse = void> {
  /**
   * Execute the use case
   */
  execute(request: TRequest): Promise<TResponse>;
}
