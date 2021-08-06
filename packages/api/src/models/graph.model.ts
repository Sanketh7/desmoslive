import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Branch } from "./branch.model";
import { User } from "./user.model";

@Entity()
@Unique("name_owner_index", ["name", "owner"])
export class Graph {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.myGraphs, { cascade: true, eager: true })
  @JoinColumn()
  owner!: User;

  @ManyToMany(() => User, (user) => user.sharedGraphs, { cascade: true })
  sharedWith!: User[];

  @OneToMany(() => Branch, (branch) => branch.graph, { cascade: true })
  branches!: Branch[];
}
