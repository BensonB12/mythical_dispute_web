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
  FOREIGN KEY user_color_id REFERENCES user_color(id) ON DELETE SET NULL
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
  text_box INTEGER,
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
  FOREIGN KEY player_ids_hand REFERENCES md_user(id) ON DELETE SET NULL
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
  FOREIGN KEY players_turn_id REFERENCES md_user(id) ON DELETE SET NULL,
  FOREIGN KEY other_player_id REFERENCES md_user(id) ON DELETE SET NULL,
  FOREIGN KEY winner_id REFERENCES md_user(id) ON DELETE SET NULL
);

CREATE TABLE game_card (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  card_id INTEGER NOT NULL,
  card_zone_id INTEGER NOT NULL,
  FOREIGN KEY game_id REFERENCES game(id),
  FOREIGN KEY card_id REFERENCES card(id),
  FOREIGN KEY card_zone_id REFERENCES card_zone(id)
);

CREATE TABLE game_overrides (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  card_id INTEGER NOT NULL,
  override_id INTEGER NOT NULL,
  actual_value TEXT NOT NULL,
  FOREIGN KEY game_id REFERENCES game(id),
  FOREIGN KEY card_id REFERENCES card(id),
  FOREIGN KEY override_id REFERENCES override(id)
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

-- INSERT INTO user_color (id, hex_value) VALUES (-1, "#41EAD4");
-- INSERT INTO md_user (username, user_color_id) VALUES ("benson", -1);
-- INSERT INTO artist (artist_name) VALUES ("Benson Bird", "Saytress", "GraphicMama-team", "JohannaIris", "MostafaEITurkey36");
-- INSERT INTO animal_class (class_name) VALUES ("");
-- INSERT INTO family_class (family_name) VALUES ("");
-- INSERT INTO size (size_display) VALUES ("small"), ("medium"), ("large"), ("any"), ("all");
-- INSERT INTO card (class_name, animal_class_id, family_id, size_id, air_value, land_value, water_value, text_box, img_url, artist_id) VALUES ("");
-- INSERT INTO location (location_name) VALUES ("Air"), ("Land"), ("Water");
-- INSERT INTO card_zone (card_zone_value) VALUES ("deck", "pile1", "pile2", "pile3");
