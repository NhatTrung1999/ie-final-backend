import { IE_Video } from 'src/modules/video/entities/video.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('IE_TableCT')
export class IE_TableCT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_video: number;

  @Column()
  no: string;

  @Column()
  progress_stage_part_name: string;
  @Column()
  type: string;

  @Column({
    type: 'nvarchar',
    transformer: {
      to: (value: number[]) => JSON.stringify(value || []),
      from: (value: string) => {
        try {
          return value ? JSON.parse(value) : [];
        } catch (e) {
          return [];
        }
      },
    },
  })
  cts: number[];

  @Column()
  average: number;

  @Column()
  confirm: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => IE_Video, (video) => video.tablects)
  @JoinColumn({ name: 'id_video' })
  video: IE_Video;
}
