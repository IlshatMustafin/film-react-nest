import { FilmDto } from './films.dto';

export class FilmListResponseDto {
  total: number;
  items: FilmDto[];
}
