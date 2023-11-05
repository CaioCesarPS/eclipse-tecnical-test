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
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wallets (
  id SERIAL PRIMARY KEY,
  coin_id integer,
  client_id integer NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES public.clients(id),
  CONSTRAINT fk_coin FOREIGN KEY (coin_id) REFERENCES public.coins(id)
);

CREATE TABLE IF NOT EXISTS public.coins_to_wallet (
  id SERIAL PRIMARY KEY,
  coin_id integer,
  wallet_id integer,
  balance integer,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallets(id),
  CONSTRAINT fk_coin FOREIGN KEY (coin_id) REFERENCES public.coins(id)
);

CREATE TABLE IF NOT EXISTS public.offers (
  id SERIAL PRIMARY KEY,
  gift_counter_id integer NOT NULL,
  client_id integer NOT NULL,
  wallet_Id integer NOT NULL,
  coin_name CHARACTER VARYING NOT NULL,
  value integer NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallets(id)
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
INSERT INTO public.coins (name) VALUES ('Bitcoin');
INSERT INTO public.coins (name) VALUES ('Ethereum');
INSERT INTO public.coins (name) VALUES ('Litecoin');

--Create Wallets
INSERT INTO public.wallets (coin_id, client_id) VALUES (1, 1);
INSERT INTO public.wallets (coin_id, client_id) VALUES (2, 1);
INSERT INTO public.wallets (coin_id, client_id) VALUES (3, 1);

INSERT INTO public.wallets (coin_id, client_id) VALUES (1, 2);
INSERT INTO public.wallets (coin_id, client_id) VALUES (2, 2);
INSERT INTO public.wallets (coin_id, client_id) VALUES (3, 2);

INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (1, 1, 100);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (2, 1, 100);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (3, 1, 100);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (1, 2, 100);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (2, 2, 100);
INSERT INTO public.coins_to_wallet (coin_id, wallet_id, balance) VALUES (3, 2, 100);

