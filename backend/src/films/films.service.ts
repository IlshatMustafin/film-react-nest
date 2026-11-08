import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { ListResponseDto } from '../common/dto/list-response.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { FilmDto } from './dto/films.dto';
import { ScheduleItemDto } from './dto/schedule-item.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<ListResponseDto<FilmDto>> {
    const items = await this.filmsRepository.findAll();
    return {
      total: items.length,
      items: items.map((film) => this.toFilmDto(film)),
    };
  }

  async findSchedule(id: string): Promise<ListResponseDto<ScheduleItemDto>> {
    const film = await this.filmsRepository.findByFilmId(id);

    if (!film) {
      return { total: 0, items: [] };
    }

    return {
      total: film.schedule.length,
      items: film.schedule.map((schedule) => this.toScheduleItemDto(schedule)),
    };
  }

  private toFilmDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags ? film.tags.split(',').filter(Boolean) : [],
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule
        ? film.schedule.map((s) => this.toScheduleItemDto(s))
        : [],
    };
  }

  private toScheduleItemDto(schedule: Schedule): ScheduleItemDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: String(schedule.hall),
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken ? schedule.taken.split(',').filter(Boolean) : [],
    };
  }
}
