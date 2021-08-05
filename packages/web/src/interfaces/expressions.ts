export type ChangeType = "added" | "removed";

export interface Expression {
  latex: string;
}

export interface ExpressionChange extends Expression {
  id?: string; // used to reduce re-renders in changes list
  changeType: ChangeType;
}
