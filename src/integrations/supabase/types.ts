export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          email: string
          id: string
          is_resolved: boolean | null
          message: string
          name: string
          subject: string | null
          submitted_at: string
        }
        Insert: {
          email: string
          id?: string
          is_resolved?: boolean | null
          message: string
          name: string
          subject?: string | null
          submitted_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_resolved?: boolean | null
          message?: string
          name?: string
          subject?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      elections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          nominations_end: string | null
          nominations_start: string | null
          status: string
          title: string
          voting_end: string | null
          voting_start: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          nominations_end?: string | null
          nominations_start?: string | null
          status?: string
          title: string
          voting_end?: string | null
          voting_start?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          nominations_end?: string | null
          nominations_start?: string | null
          status?: string
          title?: string
          voting_end?: string | null
          voting_start?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          status: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          status?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          location: string | null
          max_attendees: number | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          location?: string | null
          max_attendees?: number | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          location?: string | null
          max_attendees?: number | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          media_type: string | null
          title: string | null
          uploaded_by: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          media_type?: string | null
          title?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          media_type?: string | null
          title?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gallery_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_tiers: {
        Row: {
          benefits: string[] | null
          created_at: string
          description: string | null
          fee: number | null
          id: string
          name: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          fee?: number | null
          id?: string
          name: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          fee?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          membership_number: string | null
          start_date: string | null
          status: string
          tier_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          membership_number?: string | null
          start_date?: string | null
          status?: string
          tier_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          membership_number?: string | null
          start_date?: string | null
          status?: string
          tier_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "membership_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          created_at: string
          election_id: string
          id: string
          nominator_id: string
          nominee_id: string
          position: string
          statement: string | null
          status: string
        }
        Insert: {
          created_at?: string
          election_id: string
          id?: string
          nominator_id: string
          nominee_id: string
          position: string
          statement?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          election_id?: string
          id?: string
          nominator_id?: string
          nominee_id?: string
          position?: string
          statement?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominations_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          membership_status: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          membership_status?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          membership_status?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          election_id: string
          id: string
          nomination_id: string
          voted_at: string
          voter_id: string
        }
        Insert: {
          election_id: string
          id?: string
          nomination_id: string
          voted_at?: string
          voter_id: string
        }
        Update: {
          election_id?: string
          id?: string
          nomination_id?: string
          voted_at?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_nomination_id_fkey"
            columns: ["nomination_id"]
            isOneToOne: false
            referencedRelation: "nominations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_mod: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
