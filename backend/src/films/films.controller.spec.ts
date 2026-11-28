import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const mockFilmsService = {
      findAll: jest.fn(),
      findSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get(FilmsService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('должен вызывать filmsService.findAll и возвращать список фильмов', async () => {
      const mockResult = {
        total: 1,
        items: [
          {
            id: 'film-1',
            rating: 8.5,
            director: 'Director',
            tags: ['Драма'],
            image: '/bg.jpg',
            cover: '/cover.jpg',
            title: 'Тестовый фильм',
            about: 'Описание',
            description: 'Полное описание',
          },
        ],
      };

      filmsService.findAll.mockResolvedValue(mockResult as never);

      const result = await controller.findAll();

      expect(filmsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findSchedule', () => {
    it('должен вызывать filmsService.findSchedule с переданным id и возвращать расписание', async () => {
      const filmId = 'film-123';
      const mockSchedule = {
        total: 1,
        items: [
          {
            id: 'session-1',
            daytime: '2026-11-28T18:00:00+03:00',
            hall: 1,
            rows: 5,
            seats: 10,
            price: 350,
            taken: [],
          },
        ],
      };

      filmsService.findSchedule.mockResolvedValue(mockSchedule as never);

      const result = await controller.findSchedule(filmId);

      expect(filmsService.findSchedule).toHaveBeenCalledTimes(1);
      expect(filmsService.findSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(mockSchedule);
    });
  });
});
