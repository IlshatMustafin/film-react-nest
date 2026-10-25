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

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    console.log('DTO RECEIVED:', JSON.stringify(dto, null, 2));

    const created: OrderItemDto[] = [];
    const filmCache = new Map<string, FilmDocument>();

    for (const ticket of dto.tickets) {
      let film = filmCache.get(ticket.film);

      if (!film) {
        const found = await this.filmsRepository.findDocumentByFilmId(
          ticket.film,
        );
        if (!found) {
          throw new BadRequestException(`Film ${ticket.film} not found`);
        }
        film = found;
        filmCache.set(ticket.film, film);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session) {
        throw new BadRequestException(`Session ${ticket.session} not found`);
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }

      if (
        created.some(
          (o) =>
            o.session === ticket.session && `${o.row}:${o.seat}` === seatKey,
        )
      ) {
        throw new BadRequestException(
          `Seat ${seatKey} is duplicated in request`,
        );
      }

      session.taken.push(seatKey);

      created.push({
        id: randomUUID(),
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    for (const film of filmCache.values()) {
      await this.filmsRepository.save(film);
    }

    return { total: created.length, items: created };
  }
}
