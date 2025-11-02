-- Conexión Real - Database Schema
-- Compatible with Vercel Postgres and Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    age INTEGER CHECK (age >= 18 AND age <= 100),
    city TEXT,
    country TEXT,
    avatar_url TEXT,
    cover_photo_url TEXT,
    presentation_video_url TEXT,
    energy_emotion TEXT CHECK (energy_emotion IN (
        'alegre', 'calma', 'pasión', 'esperanza', 'energética',
        'reflexiva', 'aventurera', 'romántica', 'optimista', 'misteriosa',
        'amigable', 'creativa', 'independiente', 'comprensiva', 'entusiasta'
    )),
    purpose_of_life TEXT CHECK (purpose_of_life IN (
        'Encontrar el amor verdadero', 'Construir una familia',
        'Crear amistades duraderas', 'Desarrollarme personalmente',
        'Encontrar mi propósito', 'Viajar y explorar',
        'Conseguir estabilidad financiera', 'Tener una carrera exitosa',
        'Tener aventuras emocionantes', 'Crear algo significativo',
        'Encontrar equilibrio trabajo-vida', 'Ser feliz y positivo',
        'Encontrar mi media naranja', 'Conectar con personas afines',
        'Vivir experiencias únicas'
    )),
    what_seeking TEXT,
    what_inspires TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    beats_balance INTEGER DEFAULT 0,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'away', 'in_date', 'offline')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User photos table
CREATE TABLE public.user_photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table
CREATE TABLE public.conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    participants UUID[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'audio', 'gift')),
    media_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message reactions table
CREATE TABLE public.message_reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN ('love', 'joy', 'empathy', 'wow', 'sad', 'angry')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(message_id, user_id, reaction_type)
);

-- Affinities table (mutual connections)
CREATE TABLE public.affinities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user1_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    similarity_score DECIMAL(3,2) DEFAULT 0.50 CHECK (similarity_score >= 0 AND similarity_score <= 1),
    common_interests TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user1_id, user2_id)
);

-- Gifts catalog table
CREATE TABLE public.gifts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL CHECK (price >= 0),
    animation_url TEXT,
    icon TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gift transactions table
CREATE TABLE public.gift_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    gift_id UUID REFERENCES public.gifts(id) ON DELETE CASCADE,
    beats_spent INTEGER NOT NULL CHECK (beats_spent >= 0),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Beats transactions table
CREATE TABLE public.beats_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'spent', 'earned', 'refund')),
    description TEXT,
    payment_provider TEXT,
    payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('speed_dating', 'chat_room', 'live_stream', 'workshop')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    price INTEGER DEFAULT 0 CHECK (price >= 0),
    is_free BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event participants table
CREATE TABLE public.event_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    left_at TIMESTAMPTZ,
    UNIQUE(event_id, user_id)
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('message', 'affinity', 'gift', 'event', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User settings table
CREATE TABLE public.user_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE UNIQUE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    sound_enabled BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT TRUE,
    language TEXT DEFAULT 'es' CHECK (language IN ('es', 'en', 'pt')),
    privacy_level TEXT DEFAULT 'public' CHECK (privacy_level IN ('public', 'friends', 'private')),
    auto_accept_affinities BOOLEAN DEFAULT FALSE,
    show_online_status BOOLEAN DEFAULT TRUE,
    allow_video_calls BOOLEAN DEFAULT TRUE,
    max_distance_km INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin settings table
CREATE TABLE public.admin_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL
);

-- User badges/gamification table
CREATE TABLE public.user_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    badge_type TEXT NOT NULL CHECK (badge_type IN ('early_adopter', 'popular', 'helpful', 'verified', 'premium', 'streak')),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_type)
);

-- AI tracking table (for recommendations)
CREATE TABLE public.ai_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('view', 'message', 'like', 'affinity', 'gift')),
    target_user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    session_duration INTEGER, -- in seconds
    page_url TEXT,
    referrer TEXT,
    device_info TEXT,
    ai_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default gifts
INSERT INTO public.gifts (name, description, price, icon) VALUES
    ('Rosa', 'Una hermosa rosa animada', 1, '🌹'),
    ('Estrella', 'Una estrella luminosa', 2, '✨'),
    ('Carta', 'Una carta emocional personalizada', 3, '💌'),
    ('Melodía', 'Una melodía personalizada', 5, '🎶'),
    ('Chocolate', 'Una caja de chocolates', 10, '🍫'),
    ('Flores', 'Un ramo de flores', 15, '🌸'),
    ('Anillo', 'Un anillo de compromiso', 50, '💍'),
    ('Viaje', 'Un viaje romántico', 100, '✈️');

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value, description) VALUES
    ('app_name', 'Conexión Real', 'Nombre de la aplicación'),
    ('maintenance_mode', 'false', 'Modo de mantenimiento'),
    ('registration_enabled', 'true', 'Permitir nuevos registros'),
    ('max_daily_hearts', '100', 'Máximo de Latidos por día'),
    ('free_hearts_amount', '50', 'Latidos gratuitos diarios'),
    ('referral_reward', '25', 'Recompensa por referido'),
    ('verification_fee', '5', 'Costo de verificación en Latidos'),
    ('min_age', '18', 'Edad mínima para registro'),
    ('max_age', '100', 'Edad máxima para registro'),
    ('default_location_radius', '50', 'Radio de búsqueda por defecto en km'),
    ('max_match_age_difference', '20', 'Diferencia máxima de edad para match'),
    ('ai_recommendation_enabled', 'true', 'Habilitar recomendaciones IA'),
    ('video_call_enabled', 'true', 'Habilitar videollamadas'),
    ('group_chat_enabled', 'true', 'Habilitar chats grupales'),
    ('premium_features_enabled', 'true', 'Habilitar características premium'),
    ('ads_enabled', 'false', 'Habilitar publicidad'),
    ('currency_symbol', '❤️', 'Símbolo de la moneda virtual'),
    ('theme_primary_color', '#D4AF37', 'Color primario del tema'),
    ('theme_accent_color', '#EAC15F', 'Color de acento del tema'),
    ('social_media_links', '{"facebook": "", "twitter": "", "instagram": "", "tiktok": ""}', 'Enlaces de redes sociales');

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_energy_emotion ON public.user_profiles(energy_emotion);
CREATE INDEX idx_user_profiles_purpose ON public.user_profiles(purpose_of_life);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
CREATE INDEX idx_user_profiles_last_seen ON public.user_profiles(last_seen);

CREATE INDEX idx_conversations_participants ON public.conversations USING GIN(participants);
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

CREATE INDEX idx_affinities_user1 ON public.affinities(user1_id);
CREATE INDEX idx_affinities_user2 ON public.affinities(user2_id);
CREATE INDEX idx_affinities_status ON public.affinities(status);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);

CREATE INDEX idx_ai_tracking_user ON public.ai_tracking(user_id);
CREATE INDEX idx_ai_tracking_interaction ON public.ai_tracking(interaction_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_affinities_updated_at BEFORE UPDATE ON public.affinities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON public.user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affinities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beats_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tracking ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view all profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User photos policies
CREATE POLICY "Users can view all photos" ON public.user_photos FOR SELECT USING (true);
CREATE POLICY "Users can manage own photos" ON public.user_photos FOR ALL USING (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = ANY(participants));
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = ANY(participants));

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON public.messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.conversations 
        WHERE conversations.id = messages.conversation_id 
        AND auth.uid() = ANY(conversations.participants)
    )
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
        SELECT 1 FROM public.conversations 
        WHERE conversations.id = messages.conversation_id 
        AND auth.uid() = ANY(conversations.participants)
    )
);

-- Affinities policies
CREATE POLICY "Users can view own affinities" ON public.affinities FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
CREATE POLICY "Users can create affinities" ON public.affinities FOR INSERT WITH CHECK (auth.uid() = user1_id);
CREATE POLICY "Users can update own affinities" ON public.affinities FOR UPDATE USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- User settings policies
CREATE POLICY "Users can view own settings" ON public.user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own settings" ON public.user_settings FOR ALL USING (auth.uid() = user_id);

-- Gift transactions policies
CREATE POLICY "Users can view own gift transactions" ON public.gift_transactions FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send gifts" ON public.gift_transactions FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Beats transactions policies
CREATE POLICY "Users can view own beats transactions" ON public.beats_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert beats transactions" ON public.beats_transactions FOR INSERT WITH CHECK (true);

-- Message reactions policies
CREATE POLICY "Users can view all reactions" ON public.message_reactions FOR SELECT USING (true);
CREATE POLICY "Users can manage own reactions" ON public.message_reactions FOR ALL USING (auth.uid() = user_id);

-- User badges policies
CREATE POLICY "Users can view all badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can manage badges" ON public.user_badges FOR ALL USING (true);

-- AI tracking policies
CREATE POLICY "Users can view own tracking" ON public.ai_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tracking" ON public.ai_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert default super admin user
-- This user will be created automatically when the database is first set up
-- Email: virtualnetwork22@gmail.com
-- Password: #Kalilinux22
-- Role: Super Administrator

-- Insert sample admin user (replace with actual user ID after first login)
-- This will be handled by the application logic

-- Default Super Admin Setup Script (run this after creating the user in Supabase Auth)
-- The actual user creation is handled by Supabase Auth system
-- This script adds the user profile after authentication

-- Create function to check and setup super admin
CREATE OR REPLACE FUNCTION setup_super_admin()
RETURNS void AS $$
DECLARE
    super_admin_id UUID;
BEGIN
    -- This function will be called from the application after user authentication
    -- to setup the super admin profile
END;
$$ LANGUAGE plpgsql;

-- Views for easier querying
CREATE VIEW user_conversations AS
SELECT 
    c.*,
    COALESCE(u1.full_name, u2.full_name) as other_user_name,
    COALESCE(u1.avatar_url, u2.avatar_url) as other_user_avatar,
    u1.energy_emotion as other_user_energy
FROM conversations c
LEFT JOIN user_profiles u1 ON c.participants[1] = u1.id
LEFT JOIN user_profiles u2 ON c.participants[2] = u2.id;

CREATE VIEW affinity_matches AS
SELECT 
    a.*,
    up1.full_name as user1_name,
    up2.full_name as user2_name,
    up1.energy_emotion as user1_energy,
    up2.energy_emotion as user2_energy
FROM affinities a
JOIN user_profiles up1 ON a.user1_id = up1.id
JOIN user_profiles up2 ON a.user2_id = up2.id
WHERE a.status = 'accepted';

CREATE VIEW gift_statistics AS
SELECT 
    g.*,
    COUNT(gt.id) as times_sent,
    COALESCE(SUM(gt.beats_spent), 0) as total_beats_generated
FROM gifts g
LEFT JOIN gift_transactions gt ON g.id = gt.gift_id
GROUP BY g.id;

-- Comments for documentation
COMMENT ON TABLE public.user_profiles IS 'Extended user profiles with relationship data';
COMMENT ON TABLE public.conversations IS 'Chat conversations between users';
COMMENT ON TABLE public.messages IS 'Individual messages in conversations';
COMMENT ON TABLE public.affinities IS 'Mutual connection requests and matches';
COMMENT ON TABLE public.gifts IS 'Virtual gifts catalog';
COMMENT ON TABLE public.gift_transactions IS 'Gift sending transactions';
COMMENT ON TABLE public.beats_transactions IS 'Virtual currency transactions';
COMMENT ON TABLE public.notifications IS 'User notifications system';
COMMENT ON TABLE public.ai_tracking IS 'User behavior tracking for AI recommendations';

-- Success message
SELECT 'Conexión Real database schema created successfully!' as status;