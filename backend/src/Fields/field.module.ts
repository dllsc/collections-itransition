
import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import FieldController from './field.controller';

@Module({
  imports: [],
  controllers: [FieldController],
  providers: [FieldService],
})
export default class FieldModule {}
