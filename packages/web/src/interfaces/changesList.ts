export type ChangeType = "added" | "removed" | "no change";

export interface Expression {
  latex: string;
}

export interface ExpressionChange extends Expression {
  changeType: ChangeType;
}
