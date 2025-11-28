export interface Promotion {
  id: number;
  name: string;
  description: string;
  created_by_user: number;
  created_at: string;
  start_date: string;
  end_date: string;
  draw_completed: number;
  winners_quantity: number;
  banner: string | null;
  terms: string | null;
  winner_name: string | null;
}

export interface Field {
  id: number;
  field_name: string;
  name: string;
}
