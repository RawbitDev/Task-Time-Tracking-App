import { IsDefined, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Label } from './label.entity';
import { Tracking } from './tracking.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsDefined()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Tracking, (tracking: Tracking) => tracking.task, {
    cascade: true,
  })
  trackings: Tracking[];

  @ManyToMany(() => Label, (label: Label) => label.tasks, {
    cascade: true,
  })
  @JoinTable({
    inverseJoinColumns: [{ name: 'labelId' }],
    joinColumns: [{ name: 'taskId' }],
    name: 'tasks_labels',
  })
  labels: Label[];
}
