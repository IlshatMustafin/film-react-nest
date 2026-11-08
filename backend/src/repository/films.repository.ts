import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedule'] });
  }

  async findByFilmId(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findScheduleById(scheduleId: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({ where: { id: scheduleId } });
  }

  async saveSchedule(schedule: Schedule): Promise<Schedule> {
    return this.scheduleRepository.save(schedule);
  }
}
