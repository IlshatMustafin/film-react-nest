import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const mockOrderService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get(OrderService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('должен передавать DTO в orderService.create и возвращать созданный заказ', async () => {
      const dto: CreateOrderDto = {
        email: 'user@example.com',
        phone: '+79991234567',
        tickets: [
          {
            film: 'film-1',
            session: 'session-1',
            daytime: '2026-11-28T18:00:00+03:00',
            row: 2,
            seat: 5,
            price: 350,
          },
        ],
      };

      const mockResponse = {
        total: 1,
        items: [
          {
            ...dto.tickets[0],
            id: 'ticket-1',
          },
        ],
      };

      orderService.create.mockResolvedValue(mockResponse as never);

      const result = await controller.create(dto);

      expect(orderService.create).toHaveBeenCalledTimes(1);
      expect(orderService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });
});
