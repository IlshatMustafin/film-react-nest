import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmListResponseDto } from './dto/film-list-response.dto';
import { FilmScheduleResponseDto } from './dto/film-schedule-response.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmListResponseDto> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(id: string): Promise<FilmScheduleResponseDto> {
    const film = await this.filmsRepository.findByFilmId(id);

    if (!film) {
      return { total: 0, items: [] };
    }

    return { total: film.schedule.length, items: film.schedule };
  }
}
