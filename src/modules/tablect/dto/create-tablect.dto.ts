// import {
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   IsArray,
//   IsOptional,
//   IsDate,
// } from 'class-validator';

export class CreateTablectDto {
  id_video: number;

  no: string;

  progress_stage_part_name: string;

  type: string;

  cts: number[];

  average: number;

  confirm: string;

  created_at: Date;
}
