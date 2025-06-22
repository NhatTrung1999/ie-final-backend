import { IE_TableCT } from 'src/modules/tablect/entities/tablect.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('IE_Video')
export class IE_Video {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => IE_TableCT, (tablect) => tablect.video)
  tablects: IE_TableCT[];
}
