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

  @Column({ type: 'smalldatetime', nullable: true })
  date: Date;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true })
  stage: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  article: string;

  @Column({ type: 'nvarchar', nullable: true })
  video_name: string;

  @Column({ nullable: true })
  video_path: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'smalldatetime' })
  created_at: Date;

  @OneToOne(() => IE_TableCT, (tablect) => tablect.video, { cascade: true })
  tablect: IE_TableCT;
}
