import { IsDefined, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  @IsDefined()
  @IsString()
  startTime: string;

  @Column({ nullable: true })
  endTime: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Task, (task: Task) => task.trackings, {
    onDelete: 'CASCADE',
  })
  task: Task;
}
