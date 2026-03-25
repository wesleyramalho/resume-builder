export type FieldType = "summary" | "experience" | "project" | "education";

export type WorkerRequest =
  | { type: "init" }
  | { type: "improve"; id: string; text: string; fieldType: FieldType };

export type WorkerResponse =
  | { type: "init-progress"; progress: number }
  | { type: "init-complete" }
  | { type: "init-error"; error: string }
  | { type: "result"; id: string; improved: string }
  | { type: "error"; id: string; error: string };
