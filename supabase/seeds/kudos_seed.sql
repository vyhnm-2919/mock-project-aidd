-- ============================================================
-- Sun* Kudos - Seed Data for Development
-- ============================================================

-- Departments
INSERT INTO departments (code, name) VALUES
  ('CEVC10', 'Creative Engineering Vietnam - Unit 10'),
  ('CEVC20', 'Creative Engineering Vietnam - Unit 20'),
  ('DTVC01', 'Digital Transformation Vietnam'),
  ('BDVC01', 'Business Development Vietnam'),
  ('HRVC01', 'Human Resources Vietnam'),
  ('QAVC01', 'Quality Assurance Vietnam')
ON CONFLICT (code) DO NOTHING;

-- Hashtags
INSERT INTO hashtags (name) VALUES
  ('Dedicated'),
  ('Inspiring'),
  ('Creative'),
  ('TeamPlayer'),
  ('ProblemSolver'),
  ('Leadership'),
  ('Innovation'),
  ('Mentoring'),
  ('GoingExtraMile'),
  ('RootFurther')
ON CONFLICT (name) DO NOTHING;
