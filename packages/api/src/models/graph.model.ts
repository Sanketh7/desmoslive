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

  @ManyToOne(() => User, (user) => user.myGraphs)
  @JoinColumn()
  owner!: User;

  @ManyToMany(() => User, (user) => user.sharedGraphs)
  sharedWith!: User[];

  @OneToMany(() => Branch, (branch) => branch.graph)
  branches!: Branch[];
}
