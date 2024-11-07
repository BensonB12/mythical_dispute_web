CREATE TABLE md_user (
  id SERIAL PRIMARY KEY,
  username text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO md_user (
  username
) VALUES
('GabrielsHydra')