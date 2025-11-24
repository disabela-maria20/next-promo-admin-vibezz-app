export interface Promotion {
  id: number;
  name: string;
  description: string;
  created_by_user: number;
  created_at: string; // ISO Date
  start_date: string; // ISO Date
  end_date: string; // ISO Date
  draw_completed: number; // 0 ou 1 (ideal seria boolean)
  winners_quantity: number;
  banner: string | null;
  terms: string | null;
  winner_name: string | null;
}
