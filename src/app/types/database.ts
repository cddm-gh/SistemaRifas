export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
    public: {
        Tables: {
            draws: {
                Row: {
                    created_at: string;
                    description: string;
                    draw_date: string;
                    draw_image: string | null;
                    id: string;
                    name: string;
                    status: string;
                    ticket_price: number;
                    total_tickets: number;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    description: string;
                    draw_date: string;
                    draw_image?: string | null;
                    id?: string;
                    name: string;
                    status?: string;
                    ticket_price: number;
                    total_tickets: number;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    description?: string;
                    draw_date?: string;
                    draw_image?: string | null;
                    id?: string;
                    name?: string;
                    status?: string;
                    ticket_price?: number;
                    total_tickets?: number;
                    updated_at?: string;
                };
                Relationships: [];
            };
            prizes: {
                Row: {
                    created_at: string;
                    description: string;
                    draw_id: string;
                    id: string;
                    image: string | null;
                    place: number;
                };
                Insert: {
                    created_at?: string;
                    description: string;
                    draw_id?: string;
                    id?: string;
                    image?: string | null;
                    place?: number;
                };
                Update: {
                    created_at?: string;
                    description?: string;
                    draw_id?: string;
                    id?: string;
                    image?: string | null;
                    place?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'prizes_draw_id_fkey';
                        columns: ['draw_id'];
                        isOneToOne: false;
                        referencedRelation: 'draws';
                        referencedColumns: ['id'];
                    },
                ];
            };
            users: {
                Row: {
                    avatar_url: string | null;
                    email: string;
                    id: string;
                    name: string;
                    phone: string;
                    user_type: Database['public']['Enums']['user_type_enum'];
                };
                Insert: {
                    avatar_url?: string | null;
                    email: string;
                    id: string;
                    name: string;
                    phone: string;
                    user_type: Database['public']['Enums']['user_type_enum'];
                };
                Update: {
                    avatar_url?: string | null;
                    email?: string;
                    id?: string;
                    name?: string;
                    phone?: string;
                    user_type?: Database['public']['Enums']['user_type_enum'];
                };
                Relationships: [
                    {
                        foreignKeyName: 'users_id_fkey';
                        columns: ['id'];
                        isOneToOne: true;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            user_type_enum: 'admin' | 'client' | 'seller';
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
