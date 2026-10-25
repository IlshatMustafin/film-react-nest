import { OrderItemDto } from './order-item.dto';

export class OrderResponseDto {
  total: number;
  items: OrderItemDto[];
}
