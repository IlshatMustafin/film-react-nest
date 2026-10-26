import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { ListResponseDto } from '../common/dto/list-response.dto';
import { FilmDto } from './dto/films.dto';
import { ScheduleItemDto } from './dto/schedule-item.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<ListResponseDto<FilmDto>> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(id: string): Promise<ListResponseDto<ScheduleItemDto>> {
    const film = await this.filmsRepository.findByFilmId(id);

    if (!film) {
      return { total: 0, items: [] };
    }

    return { total: film.schedule.length, items: film.schedule };
  }
}
