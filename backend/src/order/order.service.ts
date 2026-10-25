import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDocument } from '../films/schemas/film.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(dto: CreateOrderDto[]): Promise<OrderResponseDto> {
    const created: OrderItemDto[] = [];
    const filmCache = new Map<string, FilmDocument>();

    for (const item of dto) {
      let film = filmCache.get(item.film);

      if (!film) {
        const found = await this.filmsRepository.findDocumentByFilmId(
          item.film,
        );
        if (!found) {
          throw new BadRequestException(`Film ${item.film} not found`);
        }
        film = found;
        filmCache.set(item.film, film);
      }

      const session = film.schedule.find((s) => s.id === item.session);

      if (!session) {
        throw new BadRequestException(`Session ${item.session} not found`);
      }

      const seatKey = `${item.row}:${item.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }

      if (
        created.some(
          (o) => o.session === item.session && `${o.row}:${o.seat}` === seatKey,
        )
      ) {
        throw new BadRequestException(
          `Seat ${seatKey} is duplicated in request`,
        );
      }

      session.taken.push(seatKey);

      created.push({
        id: randomUUID(),
        film: item.film,
        session: item.session,
        daytime: item.daytime,
        row: item.row,
        seat: item.seat,
        price: item.price,
      });
    }

    for (const film of filmCache.values()) {
      await this.filmsRepository.save(film);
    }

    return { total: created.length, items: created };
  }
}
