import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Graph } from "./graph.model";

@Entity()
export class User {
  @PrimaryColumn()
  email!: string;

  @Column()
  name!: string;

  @OneToMany(() => Graph, (graph) => graph.owner)
  myGraphs!: Graph[];

  @ManyToMany(() => Graph, (graph) => graph.sharedWith)
  @JoinTable() // owner of relation
  sharedGraphs!: Graph[];
}
