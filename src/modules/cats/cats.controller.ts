import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { AuthGuard } from '@Guards/auth.guard';
import { TransformInterceptor } from '@Interceptors/transform.interceptor';
import { Auth } from '@Decorators/auth.decorator';
import { FindAllQueryDto } from '@Modules/cats/dto/find-all-query.dto';

@Controller('cats')
@UseGuards(AuthGuard)
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService<Cat>) {}

  @Post()
  @Auth('admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatDto: CatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('query', new DefaultValuePipe({ offset: 0, limit: 10 }))
    query: FindAllQueryDto,
  ): Cat[] {
    return this.catsService.findAll({
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      new DefaultValuePipe(1),
    )
    id: number,
  ) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateCatDto: CatDto,
  ) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return `This action removes a #${id} cat`;
  }
}
