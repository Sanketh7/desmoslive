export type ChangeType = "added" | "removed";

export interface Expression {
  latex: string;
}

export interface ExpressionChange extends Expression {
  changeType: ChangeType;
}
