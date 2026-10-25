import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto | CreateOrderDto[]) {
    const orders = Array.isArray(dto) ? dto : [dto];
    return this.orderService.create(orders);
  }
}