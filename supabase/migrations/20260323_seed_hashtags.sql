-- Seed the 13 hashtags from Figma design spec
INSERT INTO hashtags (name) VALUES
  ('High-perorming'),
  ('BE PROFESSIONAL'),
  ('BE OPTIMISTIC'),
  ('BE A TEAM'),
  ('THINK OUTSIDE THE BOX'),
  ('GET RISKY'),
  ('GO FAST'),
  ('WASSHOI'),
  ('Toàn diện'),
  ('Giỏi chuyên môn'),
  ('Hiệu suất cao'),
  ('Truyền cảm hứng'),
  ('Cống hiến')
ON CONFLICT (name) DO NOTHING;
