import { IE_TableCT } from 'src/modules/tablect/entities/tablect.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('IE_HistoryPlayback')
export class IE_HistoryPlayback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_historyplayback: string;

  @Column()
  id_tablect: number;

  @Column({ nullable: true })
  start_time: number;

  @Column({ nullable: true })
  end_time: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  created_at: Date;

  @ManyToOne(() => IE_TableCT, (tablect) => tablect.historyPlaybacks)
  @JoinColumn({ name: 'id_tablect', referencedColumnName: 'id_video' })
  tablect: IE_TableCT;
}
