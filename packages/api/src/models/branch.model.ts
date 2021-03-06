import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Graph } from "./graph.model";
import { User } from "./user.model";

@Entity()
@Unique("graph_owner_index", ["graph", "owner"])
export class Branch {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Graph, (graph) => graph.branches, { onDelete: "CASCADE" })
  graph!: Graph;

  @ManyToOne(() => User, { eager: true })
  owner!: User;

  @Column("text", { array: true })
  expressions!: string[];
}
