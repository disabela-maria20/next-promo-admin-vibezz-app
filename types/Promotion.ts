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
  banner_base64: string | null;
  terms_pdf_base64: string | null;
  winner_name: string | null;
}
