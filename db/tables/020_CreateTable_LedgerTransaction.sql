
CREATE TABLE DEFAULT_SCHEMA.ledger_transaction (
       client_id INTEGER NOT NULL
     , ledger_transaction_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE
     , currency_id INTEGER
     , num INTEGER
     , post_date TIMESTAMP(3) WITHOUT TIME ZONE
     , enter_date TIMESTAMP(3) WITHOUT TIME ZONE
     , description VARCHAR(255)
     , PRIMARY KEY (client_id, ledger_transaction_id)
)
WITH (
  OIDS=FALSE
);
commit;
