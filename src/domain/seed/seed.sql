DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS coins;
DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS coins_to_wallet;

CREATE TABLE IF NOT EXISTS public.clients (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING NOT NULL,
  email CHARACTER VARYING NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.coins (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    current_price integer NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wallets (
  id SERIAL PRIMARY KEY,
  coin_id integer,
  balance integer NOT NULL DEFAULT 0,
  client_id integer NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS public.coins_to_wallet (
  id SERIAL PRIMARY KEY,
  coin_id integer,
  wallet_id integer,
  coin_quantity integer,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS public.offers (
  id SERIAL PRIMARY KEY,
  gift_counter_id integer NOT NULL,
  client_id integer NOT NULL,
  wallet_Id integer NOT NULL,
  coin_name CHARACTER VARYING NOT NULL,
  coin_quantity integer NOT NULL,
  total_offer_value integer NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS public.client_favorites_offers (
  id SERIAL PRIMARY KEY,
  client_id integer NOT NULL,
  offer_id integer NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);



--Create Clients
INSERT INTO public.clients (name, email) VALUES ('John Doe', 'johndoe@gmail.com');
INSERT INTO public.clients (name, email) VALUES ('Jane Doe', 'janedoe@gmail.com');

--Create Coins
INSERT INTO public.coins (name, current_price) VALUES ('Bitcoin', 100);
INSERT INTO public.coins (name, current_price) VALUES ('Ethereum', 200);
INSERT INTO public.coins (name, current_price) VALUES ('Litecoin', 300);

--Create Wallets
INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (1, 1000, 1);
INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (2, 2000, 1);
INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (3, 3000, 1);

INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (1, 1000, 2);
INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (2, 2000, 2);
INSERT INTO public.wallets (coin_id, balance, client_id) VALUES (3, 3000, 2);

INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (1, 1, 10);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (2, 1, 20);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (3, 1, 30);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (1, 2, 10);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (2, 2, 20);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, coin_quantity) VALUES (3, 2, 30);

