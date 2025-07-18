import { IE_TableCT } from 'src/modules/tablect/entities/tablect.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('IE_Video')
export class IE_Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'smalldatetime'})
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

  @Column({type: 'smalldatetime'})
  created_at: Date;

  @OneToOne(() => IE_TableCT, (tablect) => tablect.video, { cascade: true })
  tablect: IE_TableCT;
}
