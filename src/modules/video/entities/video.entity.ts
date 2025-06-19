import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('IE_Video')
export class IE_Video {
  @PrimaryGeneratedColumn()
  id_video: number;

  @Column()
  date: Date;

  @Column()
  season: string;

  @Column()
  stage: string;

  @Column()
  area: string;

  @Column()
  article: string;

  @Column()
  video_name: string;

  @Column()
  video_path: string;

  @Column()
  created_by: string;

  @Column()
  created_at: Date;
}
