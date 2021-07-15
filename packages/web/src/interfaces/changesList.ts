export type ChangeType = "added" | "removed" | "no change";

export interface Change {
  type: ChangeType;
  latex: string;
}
