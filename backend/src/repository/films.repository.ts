import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().select('-_id -__v').lean().exec() as Promise<
      Film[]
    >;
  }

  async findByFilmId(id: string): Promise<Film | null> {
    return this.filmModel
      .findOne({ id })
      .select('-_id -__v')
      .lean()
      .exec() as Promise<Film | null>;
  }

  async findDocumentByFilmId(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async save(film: FilmDocument): Promise<FilmDocument> {
    return film.save();
  }
}
