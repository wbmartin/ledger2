CREATE TABLE DEFAULT_SCHEMA.ledger_lot (
       client_id INTEGER NOT NULL
     , ledger_lot_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE
     , ledger_account_id INTEGER
     , is_closed INTEGER
     , PRIMARY KEY (client_id, ledger_lot_id)
)WITH (
  OIDS=FALSE
);
commit;
