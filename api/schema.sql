-- psql -U <username> -d <database_name>

DROP TRIGGER IF EXISTS trigger_delete_game_card_if_any_null ON game_card;
DROP FUNCTION IF EXISTS delete_game_card_if_any_null;

DROP TRIGGER IF EXISTS trigger_delete_game_overrides_if_any_null ON game_overrides;
DROP FUNCTION IF EXISTS delete_game_overrides_if_any_null;

DROP TRIGGER IF EXISTS trigger_set_is_over ON game;
DROP FUNCTION IF EXISTS set_is_over_on_winner;

DROP TRIGGER IF EXISTS trigger_delete_game_if_no_players ON game;
DROP FUNCTION IF EXISTS delete_game_if_no_players;

DROP TRIGGER IF EXISTS set_img_url_null_on_artist_delete ON card;
DROP FUNCTION IF EXISTS update_img_url_when_artist_id_null;

DROP TABLE IF EXISTS game_overrides CASCADE;
DROP TABLE IF EXISTS game_card CASCADE;
DROP TABLE IF EXISTS game CASCADE;
DROP TABLE IF EXISTS card_zone CASCADE;
DROP TABLE IF EXISTS override CASCADE;
DROP TABLE IF EXISTS location CASCADE;
DROP TABLE IF EXISTS card CASCADE;
DROP TABLE IF EXISTS size CASCADE;
DROP TABLE IF EXISTS family CASCADE;
DROP TABLE IF EXISTS animal_class CASCADE;
DROP TABLE IF EXISTS artist CASCADE;
DROP TABLE IF EXISTS user_color CASCADE;
DROP TABLE IF EXISTS md_user CASCADE;

-- Upgrade by using indexes for game_id, winner_id, player_turn_id, other_player_id ...

CREATE TABLE user_color (
  id SERIAL PRIMARY KEY,
  hex_value VARCHAR(7) NOT NULL,
  CONSTRAINT valid_hex CHECK (hex_value ~ '^#[0-9A-F]{6}$')
);

CREATE TABLE md_user (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  notifications BOOLEAN NOT NULL DEFAULT FALSE,
  user_color_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_color_id) REFERENCES user_color(id) ON DELETE SET NULL
);

CREATE TABLE artist (
  id SERIAL PRIMARY KEY,
  artist_name TEXT NOT NULL
);

CREATE TABLE animal_class (
  id SERIAL PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL
);

CREATE TABLE family (
  id SERIAL PRIMARY KEY,
  family_name VARCHAR(50) NOT NULL
);

CREATE TABLE size (
  id SERIAL PRIMARY KEY,
  size_display VARCHAR(50) NOT NULL
);

CREATE TABLE card (
  id SERIAL PRIMARY KEY,
  card_name VARCHAR(50) NOT NULL,
  animal_class_id INTEGER NOT NULL,
  family_id INTEGER NOT NULL,
  size_id INTEGER NOT NULL,
  air_value TEXT,
  land_value INTEGER,
  water_value INTEGER,
  text_box TEXT,
  img_url TEXT,
  artist_id INTEGER,
  FOREIGN KEY (animal_class_id) REFERENCES animal_class(id),
  FOREIGN KEY (family_id) REFERENCES family(id),
  FOREIGN KEY (size_id) REFERENCES size(id),
  FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE SET NULL,
  CONSTRAINT artist_required_if_img_url CHECK (
    (img_url IS NOT NULL AND artist_id IS NOT NULL) OR img_url IS NULL
  )
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  location_name TEXT NOT NULL
);

CREATE TABLE card_zone (
  id SERIAL PRIMARY KEY,
  card_zone_value TEXT,
  player_ids_hand INTEGER,
  FOREIGN KEY (player_ids_hand) REFERENCES md_user(id) ON DELETE SET NULL
);

CREATE TABLE override (
  id SERIAL PRIMARY KEY,
  override_value TEXT NOT NULL
);

CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  winner_id INTEGER,
  is_over BOOLEAN NOT NULL DEFAULT FALSE,
  join_code VARCHAR(5),
  players_turn_id INTEGER,
  other_player_id INTEGER,
  FOREIGN KEY (players_turn_id) REFERENCES md_user(id) ON DELETE SET NULL,
  FOREIGN KEY (other_player_id) REFERENCES md_user(id) ON DELETE SET NULL,
  FOREIGN KEY (winner_id) REFERENCES md_user(id) ON DELETE SET NULL
);

CREATE TABLE game_card (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  card_id INTEGER NOT NULL,
  card_zone_id INTEGER NOT NULL,
  FOREIGN KEY (game_id) REFERENCES game(id),
  FOREIGN KEY (card_id) REFERENCES card(id),
  FOREIGN KEY (card_zone_id) REFERENCES card_zone(id)
);

CREATE TABLE game_overrides (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  card_id INTEGER NOT NULL,
  override_id INTEGER NOT NULL,
  actual_value TEXT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES game(id),
  FOREIGN KEY (card_id) REFERENCES card(id),
  FOREIGN KEY (override_id) REFERENCES override(id)
);

-- If either the card, game, or card_zone is null, delete the row
CREATE FUNCTION delete_game_card_if_any_null()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.game_id IS NULL OR NEW.card_id IS NULL OR NEW.card_zone_id IS NULL THEN
    DELETE FROM game_card WHERE id = OLD.id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger the above function if someone deletes the game, card, or card_zone
CREATE TRIGGER trigger_delete_game_card_if_any_null
AFTER UPDATE ON game_card
FOR EACH ROW
WHEN (NEW.game_id IS DISTINCT FROM OLD.game_id
      OR NEW.card_id IS DISTINCT FROM OLD.card_id
      OR NEW.card_zone_id IS DISTINCT FROM OLD.card_zone_id)
EXECUTE FUNCTION delete_game_card_if_any_null();

-- If either the card, game, or override is null, delete the row
CREATE FUNCTION delete_game_overrides_if_any_null()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.game_id IS NULL OR NEW.card_id IS NULL OR NEW.override_id IS NULL THEN
    DELETE FROM game_overrides WHERE id = OLD.id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger the above function if someone deletes the game, card, or override
CREATE TRIGGER trigger_delete_game_overrides_if_any_null
AFTER UPDATE ON game_overrides
FOR EACH ROW
WHEN (NEW.game_id IS DISTINCT FROM OLD.game_id
      OR NEW.card_id IS DISTINCT FROM OLD.card_id
      OR NEW.override_id IS DISTINCT FROM OLD.override_id)
EXECUTE FUNCTION delete_game_overrides_if_any_null();

-- If there is a winner, the game is over
CREATE FUNCTION set_is_over_on_winner()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.winner_id IS NOT NULL AND OLD.winner_id IS NULL THEN
    NEW.is_over := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql; -- I don't know if I need these or not...

-- Trigger the above function if the winner_id is changed
CREATE TRIGGER trigger_set_is_over
BEFORE UPDATE OF winner_id ON game
FOR EACH ROW
EXECUTE FUNCTION set_is_over_on_winner();

-- Delete the game when both players drop
CREATE FUNCTION delete_game_if_no_players()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.players_turn_id IS NULL AND NEW.other_player_id IS NULL THEN
    DELETE FROM game WHERE id = OLD.id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger the above function if either player drops
CREATE TRIGGER trigger_delete_game_if_no_players
BEFORE UPDATE ON game
FOR EACH ROW
WHEN (NEW.players_turn_id IS NULL AND NEW.other_player_id IS NULL)
EXECUTE FUNCTION delete_game_if_no_players();

-- Delete img url if the artist is deleted
CREATE FUNCTION update_img_url_when_artist_id_null()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.artist_id IS NULL THEN
    NEW.img_url := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger the above function when the artist is deleted, or the artist is removed from the card
CREATE TRIGGER set_img_url_null_on_artist_delete
AFTER UPDATE OF artist_id ON card
FOR EACH ROW
WHEN (OLD.artist_id IS DISTINCT FROM NEW.artist_id AND NEW.artist_id IS NULL)
EXECUTE FUNCTION update_img_url_when_artist_id_null();

INSERT INTO user_color (hex_value) VALUES ('#41EAD4');

-- Set the teal to be the default
DO $$
DECLARE
    color_id INTEGER;
BEGIN
    SELECT id INTO color_id
    FROM user_color
    WHERE hex_value = '#41EAD4';

    EXECUTE 'ALTER TABLE md_user ALTER COLUMN user_color_id SET DEFAULT ' || color_id;
END;
$$;

INSERT INTO md_user (username) VALUES ('benson');

INSERT INTO artist (artist_name) VALUES 
  ('Benson Bird'), 
  ('Saytress'), 
  ('GraphicMama-team'), 
  ('JohannaIris'), 
  ('MostafaElTurkey36');

INSERT INTO animal_class (class_name) VALUES 
  ('All'),
  ('Any'),
  ('Mythical'),
  ('Mammal'), 
  ('Bird'), 
  ('Fish'),
  ('Reptile'),
  ('Amphibian'),
  ('Plant');

INSERT INTO family (family_name) VALUES 
  ('All'),
  ('Any'),
  ('Whirlpool'), 
  ('Pegasus'), 
  ('Dragon'), 
  ('Phoenix'), 
  ('Bigfoot'), 
  ('Loch Ness'), 
  ('Humming Bird'), 
  ('Eagle'), 
  ('Parrot'), 
  ('Swan'),
  ('Hawk'),
  ('Wolf'),
  ('Squirrel'),
  ('Bat'),
  ('Cow'),
  ('Elephant'),
  ('Clownfish'),
  ('Swordfish'),
  ('Shark'),
  ('Sardine'),
  ('Moorish Idol'),
  ('Frog'),
  ('Crocodile'),
  ('Iguana'),
  ('Log');

INSERT INTO size (size_display) VALUES 
  ('all'),
  ('any'), 
  ('small'), 
  ('medium'), 
  ('large');

INSERT INTO location (location_name) VALUES 
  ('All'),
  ('Any'),
  ('Air'), 
  ('Land'), 
  ('Water');

INSERT INTO card_zone (card_zone_value) VALUES 
  ('deck'), 
  ('pile1'), 
  ('pile2'), 
  ('pile3');

-- all three location values
INSERT INTO card (card_name, animal_class_id, family_id, size_id, air_value, land_value, water_value, text_box, img_url, artist_id) 
VALUES ('Blackjack', (SELECT id FROM animal_class WHERE class_name = 'Mythical'), (SELECT id FROM family WHERE family_name = 'Pegasus'), (SELECT id FROM size WHERE size_display = 'medium'), 6, 2, 2, 'Double any amount of recruit friends you get', '/image/Blackjack.png', (SELECT id FROM artist WHERE artist_name = 'Saytress')),
('Charybdis', (SELECT id FROM animal_class WHERE class_name = 'Mythical'), (SELECT id FROM family WHERE family_name = 'Whirlpool'), (SELECT id FROM size WHERE size_display = 'large'), 1, NULL, 8, '*Eat & Recruiting* - do the same to the top of the deck', '/image/Charybdis.png', (SELECT id FROM artist WHERE artist_name = 'Benson Bird')),
('Phil', (SELECT id FROM animal_class WHERE class_name = 'Mythical'), (SELECT id FROM family WHERE family_name = 'Phoenix'), (SELECT id FROM size WHERE size_display = 'large'), 6, 1, 2, '*Eat* - Create a friendly ash token that has value zero in land, but the same text box', '/image/Phil.png', (SELECT id FROM artist WHERE artist_name = 'JohannaIris')),
('Zoom', (SELECT id FROM animal_class WHERE class_name = 'Bird'), (SELECT id FROM family WHERE family_name = 'Humming Bird'), (SELECT id FROM size WHERE size_display = 'medium'), 3, 2, NULL, NULL, '/image/Zoom.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Deanna', (SELECT id FROM animal_class WHERE class_name = 'Bird'), (SELECT id FROM family WHERE family_name = 'Parrot'), (SELECT id FROM size WHERE size_display = 'small'), 2, 2, NULL, '*Battle* - I gain a random enemy''s text box', '/image/Deanna.png', (SELECT id FROM artist WHERE artist_name = 'Saytress')),
('Draco', (SELECT id FROM animal_class WHERE class_name = 'Mythical'), (SELECT id FROM family WHERE family_name = 'Dragon'), (SELECT id FROM size WHERE size_display = 'large'), 8, 3, NULL, 'If I has a total higher value than your opposing''s *M* total value Double all your buffs', '/image/Draco.png', (SELECT id FROM artist WHERE artist_name = 'GraphicMama-team')),
('Ron', (SELECT id FROM animal_class WHERE class_name = 'Bird'), (SELECT id FROM family WHERE family_name = 'Swan'), (SELECT id FROM size WHERE size_display = 'medium'), 3, NULL, 2, '*Battle* - If your opponent has fifteen or more small recruits: I get *+2 in sky and water*', '/image/Ron.jpg', (SELECT id FROM artist WHERE artist_name = 'JohannaIris')),
('Tula', (SELECT id FROM animal_class WHERE class_name = 'Bird'), (SELECT id FROM family WHERE family_name = 'Hawk'), (SELECT id FROM size WHERE size_display = 'medium'), 2, 2, NULL, 'I show you enemy *S* recruit sizes', '/image/Tula.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Alpha', (SELECT id FROM animal_class WHERE class_name = 'Mammal'), (SELECT id FROM family WHERE family_name = 'Wolf'), (SELECT id FROM size WHERE size_display = 'medium'), NULL, 3, NULL, '*Recruit* - If I was the only card in the pile: *+3 in Land*', '/image/Alpha.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Bolt', (SELECT id FROM animal_class WHERE class_name = 'Mammal'), (SELECT id FROM family WHERE family_name = 'Squirrel'), (SELECT id FROM size WHERE size_display = 'small'), 2, 3, NULL, NULL, '/image/Bolt.jpg', (SELECT id FROM artist WHERE artist_name = 'JohannaIris')),
('Wayne', (SELECT id FROM animal_class WHERE class_name = 'Mammal'), (SELECT id FROM family WHERE family_name = 'Bat'), (SELECT id FROM size WHERE size_display = 'small'), 2, 1, NULL, '*Recruit* - If I was recruited off the top of the deck: Recruit four Bat friends', '/image/Wayne.jpg', (SELECT id FROM artist WHERE artist_name = 'JohannaIris')),
('Ellie', (SELECT id FROM animal_class WHERE class_name = 'Mammal'), (SELECT id FROM family WHERE family_name = 'Elephant'), (SELECT id FROM size WHERE size_display = 'medium'), NULL, 8, NULL, '*Location* - I get *-1 in land* for each large enemy in *D*', '/image/Ellie.png', (SELECT id FROM artist WHERE artist_name = 'GraphicMama-team')),
('Bessie', (SELECT id FROM animal_class WHERE class_name = 'Mammal'), (SELECT id FROM family WHERE family_name = 'Cow'), (SELECT id FROM size WHERE size_display = 'large'), NULL, 1, NULL, '*Eaten* - I give an additional *+2 in Land*', '/image/Bessie.png', (SELECT id FROM artist WHERE artist_name = 'Saytress')),
('Marlin', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Clownfish'), (SELECT id FROM size WHERE size_display = 'small'), NULL, 2, NULL, '*Recruit* - Recruit a Clown Fish friend', '/image/Marlin.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Gladius', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Swordfish'), (SELECT id FROM size WHERE size_display = 'large'), NULL, 3, NULL, '*Recruit* - You may recruit me into a location with a Human: I get *6 value* in that location', '/image/Gladius.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Bruce', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Shark'), (SELECT id FROM size WHERE size_display = 'large'), NULL, 3, NULL, '*Recruit* - Eat any amount of *F*: I get *+1 in water* for each recruit eaten', '/image/Bruce.png', (SELECT id FROM artist WHERE artist_name = 'GraphicMama-team')),
('Manny', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Shark'), (SELECT id FROM size WHERE size_display = 'large'), NULL, 2, NULL, '*Location* - I get *+1 in Water* for each *Large* recruit', '/image/Manny.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Aiden', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Sardine'), (SELECT id FROM size WHERE size_display = 'small'), NULL, 1, NULL, '*Recruit* - Recruit a Sardine friend of me for each sardine recruit', '/image/Aiden.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Gill', (SELECT id FROM animal_class WHERE class_name = 'Fish'), (SELECT id FROM family WHERE family_name = 'Moorish Idol'), (SELECT id FROM size WHERE size_display = 'small'), -2, NULL, NULL, '*Battle* - I get *+1 in water* for each enemy fish', '/image/Gill.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Annie', (SELECT id FROM animal_class WHERE class_name = 'Amphibian'), (SELECT id FROM family WHERE family_name = 'Frog'), (SELECT id FROM size WHERE size_display = 'small'), 8, NULL, NULL, '*Eaten* - *-2 in Land* instead. I get *-1 in Land* for each large recruit you have', '/image/Annie.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Emily', (SELECT id FROM animal_class WHERE class_name = 'Amphibian'), (SELECT id FROM family WHERE family_name = 'Frog'), (SELECT id FROM size WHERE size_display = 'small'), -6, -6, NULL, '*Recruit* - Take an extra turn after this one', '/image/Emily.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36')),
('Ally', (SELECT id FROM animal_class WHERE class_name = 'Reptile'), (SELECT id FROM family WHERE family_name = 'Crocodile'), (SELECT id FROM size WHERE size_display = 'medium'), 2, 3, NULL, NULL, '/image/Ally.png', (SELECT id FROM artist WHERE artist_name = 'GraphicMama-team')),
('Joe', (SELECT id FROM animal_class WHERE class_name = 'Reptile'), (SELECT id FROM family WHERE family_name = 'Iguana'), (SELECT id FROM size WHERE size_display = 'medium'), 2, 2, NULL, '*Recruit* - Recruit two Log friends', '/image/Joe.png', (SELECT id FROM artist WHERE artist_name = 'GraphicMama-team')),
('Logan', (SELECT id FROM animal_class WHERE class_name = 'Plant'), (SELECT id FROM family WHERE family_name = 'Log'), (SELECT id FROM size WHERE size_display = 'large'), 0, 0, NULL, NULL, '/image/Logan.png', (SELECT id FROM artist WHERE artist_name = 'MostafaElTurkey36'));