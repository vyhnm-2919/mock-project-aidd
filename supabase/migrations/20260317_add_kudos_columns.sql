-- Add danh_hieu and is_anonymous columns to kudos table
ALTER TABLE kudos ADD COLUMN IF NOT EXISTS danh_hieu TEXT;
ALTER TABLE kudos ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;
