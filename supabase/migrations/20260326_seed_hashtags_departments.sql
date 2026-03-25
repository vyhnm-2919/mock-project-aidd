-- Seed hashtags from Figma design
INSERT INTO hashtags (name) VALUES
  ('Dedicated'),
  ('Inspring')
ON CONFLICT (name) DO NOTHING;

-- Seed departments from Figma design
INSERT INTO departments (code, name) VALUES
  ('CEVC2', 'CEVC2'),
  ('CEVC3', 'CEVC3'),
  ('CEVC4', 'CEVC4'),
  ('CEVC1', 'CEVC1'),
  ('OPD', 'OPD'),
  ('Infra', 'Infra')
ON CONFLICT (code) DO NOTHING;
