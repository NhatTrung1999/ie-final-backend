import { IE_Video } from 'src/modules/video/entities/video.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('IE_TableCT')
export class IE_TableCT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_video: number;

  @Column()
  no: string;

  @Column()
  progress_stage_part_name: string;

  @Column({ type: 'nvarchar', length: 'max' })
  nva: string;

  @Column({ type: 'nvarchar', length: 'max' })
  va: string;

  @Column()
  confirm: string;

  @Column()
  created_by: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @OneToOne(() => IE_Video, (video) => video.tablect)
  @JoinColumn({ name: 'id_video' })
  video: IE_Video;
}
