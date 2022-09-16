export type eosIconsActionType =
  | { type: string }
  | { type: string; selection: string }
  | { type: string; search: string }
  | { type: string; search: string }
  | { type: string; data: string[] }
  | { type: string; action: string }
  | { type: string; category: string }
