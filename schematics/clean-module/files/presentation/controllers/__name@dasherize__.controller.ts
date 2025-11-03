import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { <%= classify(name) %>Service } from '../../application/services/<%= dasherize(name) %>.service';
import { Create<%= classify(name) %>Dto } from '../dtos/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from '../dtos/update-<%= dasherize(name) %>.dto';

/**
 * <%= classify(name) %> Controller
 * 
 * Responsibilities:
 * - Handle HTTP requests/responses
 * - Validate request DTOs (done by ValidationPipe)
 * - Return appropriate HTTP status codes
 * 
 * Exception Handling:
 * - Domain exceptions are thrown by use cases
 * - Convert to HTTP exceptions using a global exception filter/interceptor
 * - Example: Create a DomainExceptionFilter in your shared/core module
 * 
 * Recommended approach:
 * @Catch(<%= classify(name) %>DomainException)
 * export class DomainExceptionFilter implements ExceptionFilter {
 *   catch(exception: <%= classify(name) %>DomainException, host: ArgumentsHost) {
 *     // Convert domain exceptions to HTTP exceptions
 *   }
 * }
 */
@Controller('<%= dasherize(name) %>s')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.<%= camelize(name) %>Service.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.<%= camelize(name) %>Service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: Create<%= classify(name) %>Dto) {
    return await this.<%= camelize(name) %>Service.create(createDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDto: Update<%= classify(name) %>Dto,
  ) {
    return await this.<%= camelize(name) %>Service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.<%= camelize(name) %>Service.delete(id);
  }
}
