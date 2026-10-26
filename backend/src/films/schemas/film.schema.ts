import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class ScheduleItem {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleItemSchema = SchemaFactory.createForClass(ScheduleItem);

@Schema({ collection: 'films' })
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleItemSchema], default: [] })
  schedule: ScheduleItem[];
}

export type FilmDocument = HydratedDocument<Film>;
export const FilmSchema = SchemaFactory.createForClass(Film);
