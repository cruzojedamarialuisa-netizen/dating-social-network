-- Super Admin Initialization Script
-- Run this after setting up the basic schema and creating the auth user
-- This script sets up the super admin user profile

-- Instructions:
-- 1. First create the auth user in Supabase Auth with:
--    Email: virtualnetwork22@gmail.com
--    Password: #Kalilinux22
-- 2. Replace 'SUPER_ADMIN_UUID' with the actual UUID from auth.users
-- 3. Run this script to create the super admin profile

-- SET SUPER ADMIN UUID (REPLACE WITH ACTUAL USER ID)
-- Find the user ID with: SELECT id, email FROM auth.users WHERE email = 'virtualnetwork22@gmail.com';

-- Example:
-- DO $$
-- DECLARE
--     super_admin_id UUID := 'YOUR_SUPER_ADMIN_UUID_HERE';
-- BEGIN
--     -- Create super admin profile if doesn't exist
--     INSERT INTO public.user_profiles (
--         id,
--         full_name,
--         age,
--         city,
--         country,
--         energy_emotion,
--         purpose_of_life,
--         what_seeking,
--         what_inspires,
--         is_verified,
--         is_premium,
--         beats_balance,
--         status
--     ) VALUES (
--         super_admin_id,
--         'Administrador Sistema',
--         30,
--         'Madrid',
--         'España',
--         'misteriosa',
--         'Crear un mundo más conectado',
--         'Facilitar conexiones genuinas entre personas',
--         'La tecnología al servicio del amor verdadero',
--         true,
--         true,
--         10000,
--         'available'
--     )
--     ON CONFLICT (id) DO UPDATE SET
--         full_name = EXCLUDED.full_name,
--         is_verified = EXCLUDED.is_verified,
--         is_premium = EXCLUDED.is_premium,
--         beats_balance = EXCLUDED.beats_balance;
--
--     -- Add verified badge
--     INSERT INTO public.user_badges (user_id, badge_type)
--     VALUES (super_admin_id, 'verified')
--     ON CONFLICT DO NOTHING;
--
--     -- Add super admin to admin_settings as the creator
--     UPDATE public.admin_settings SET updated_by = super_admin_id;
--
--     RAISE NOTICE 'Super admin configured successfully for user %', super_admin_id;
-- END $$;

-- Additional sample data for testing

-- Insert more sample users for testing (replace user_ids with actual auth user IDs)
-- These are example profiles to test the system

/*
DO $$
DECLARE
    user_id_1 UUID := gen_random_uuid();
    user_id_2 UUID := gen_random_uuid();
    user_id_3 UUID := gen_random_uuid();
BEGIN
    -- Sample User 1
    INSERT INTO public.user_profiles (
        id, full_name, age, city, country, energy_emotion, purpose_of_life,
        what_seeking, what_inspires, is_verified, is_premium, beats_balance
    ) VALUES (
        user_id_1, 'María González Test', 28, 'Madrid', 'España',
        'alegre', 'Encontrar el amor verdadero',
        'Busco una conexión auténtica y profunda',
        'La música, los viajes y las conversaciones interesantes',
        true, false, 150
    );

    -- Sample User 2
    INSERT INTO public.user_profiles (
        id, full_name, age, city, country, energy_emotion, purpose_of_life,
        what_seeking, what_inspires, is_verified, is_premium, beats_balance
    ) VALUES (
        user_id_2, 'Carlos Ruiz Test', 32, 'Barcelona', 'España',
        'reflexiva', 'Desarrollarme personalmente',
        'Personas con intereses similares',
        'La filosofía, el arte y la naturaleza',
        false, true, 420
    );

    -- Sample User 3
    INSERT INTO public.user_profiles (
        id, full_name, age, city, country, energy_emotion, purpose_of_life,
        what_seeking, what_inspires, is_verified, is_premium, beats_balance
    ) VALUES (
        user_id_3, 'Ana Martín Test', 25, 'Valencia', 'España',
        'romántica', 'Crear una familia',
        'Una relación seria y comprometida',
        'El cine, la literatura y los atardeceres',
        true, false, 85
    );

    RAISE NOTICE 'Sample users created: %, %, %', user_id_1, user_id_2, user_id_3;
END $$;
*/

-- View to check super admin setup
CREATE OR REPLACE VIEW super_admin_check AS
SELECT 
    u.id,
    u.email,
    p.full_name,
    p.is_verified,
    p.is_premium,
    p.beats_balance,
    p.status,
    ub.badge_type
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
LEFT JOIN public.user_badges ub ON u.id = ub.user_id
WHERE u.email = 'virtualnetwork22@gmail.com';

-- Function to verify super admin setup
CREATE OR REPLACE FUNCTION verify_super_admin_setup()
RETURNS TABLE(
    user_exists BOOLEAN,
    profile_exists BOOLEAN,
    verified_badge_exists BOOLEAN,
    beats_balance INTEGER,
    setup_complete BOOLEAN
) AS $$
DECLARE
    super_admin_user UUID;
BEGIN
    -- Get super admin user ID
    SELECT id INTO super_admin_user 
    FROM auth.users 
    WHERE email = 'virtualnetwork22@gmail.com';

    -- Check if user exists
    IF super_admin_user IS NULL THEN
        RETURN QUERY SELECT false, false, false, 0, false;
        RETURN;
    END IF;

    -- Check profile and badge existence
    RETURN QUERY
    SELECT 
        true as user_exists,
        EXISTS(SELECT 1 FROM public.user_profiles WHERE id = super_admin_user) as profile_exists,
        EXISTS(SELECT 1 FROM public.user_badges WHERE user_id = super_admin_user AND badge_type = 'verified') as verified_badge_exists,
        COALESCE((SELECT beats_balance FROM public.user_profiles WHERE id = super_admin_user), 0) as beats_balance,
        EXISTS(SELECT 1 FROM public.user_profiles WHERE id = super_admin_user AND is_verified = true AND is_premium = true) as setup_complete;
END;
$$ LANGUAGE plpgsql;

-- Success message
SELECT 'Super admin setup script loaded. Run verify_super_admin_setup() to check status.' as status;