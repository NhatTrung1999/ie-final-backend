import { IE_HistoryPlayback } from 'src/modules/history-playback/entities/history-playback.entity';
import { IE_Video } from 'src/modules/video/entities/video.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('IE_TableCT')
export class IE_TableCT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_video: number;

  @Column({ nullable: true })
  no: string;

  @Column({ nullable: true })
  progress_stage_part_name: string;

  @Column({ nullable: true })
  area: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  nva: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  va: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  machine_type: string;

  @Column({ nullable: true })
  confirm: string;

  @Column({ nullable: true })
  video_path: string;

  @Column({ type: 'bit', nullable: true })
  is_save: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @OneToOne(() => IE_Video, (video) => video.tablect)
  @JoinColumn({ name: 'id_video' })
  video: IE_Video;

  @OneToMany(
    () => IE_HistoryPlayback,
    (historyPlayback) => historyPlayback.tablect,
  )
  historyPlaybacks: IE_HistoryPlayback[];
}

@Entity('IE_Department')
export class IE_Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  department: string;

  @Column({ type: 'smalldatetime', nullable: true })
  created_at: Date;
}

@Entity('IE_Department_MachineType')
export class IE_Department_MachineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  department: string;

  @Column({ type: 'nvarchar', nullable: true })
  machine_type_en: string;

  @Column({ type: 'nvarchar', nullable: true })
  machine_type_cn: string;

  @Column({ type: 'nvarchar', nullable: true })
  machine_type_vn: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  created_by: string;

  @Column({ type: 'smalldatetime', nullable: true })
  created_at: Date;
}
