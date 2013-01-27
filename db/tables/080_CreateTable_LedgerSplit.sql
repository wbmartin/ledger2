
CREATE TABLE DEFAULT_SCHEMA.ledger_split (
       client_id INTEGER NOT NULL
     , ledger_split_id SERIAL NOT NULL
     , ledger_transaction_id INTEGER NOT NULL
     , ledger_account_id INTEGER NOT NULL
     , memo TEXT
     , action VARCHAR(255)
     , reconcile_state CHAR(1)
     , reconcile_date TIMESTAMP(3) WITHOUT TIME ZONE
     , value_num INTEGER NOT NULL
     , value_denom INTEGER NOT NULL
     , quantity_num INTEGER NOT NULL
     , quantity_denom CHAR(10) NOT NULL
     , ledger_lot_id CHAR(10)
     , PRIMARY KEY (client_id, ledger_split_id)
     , CONSTRAINT FK_ledger_split_1 FOREIGN KEY (client_id, ledger_transaction_id)
                  REFERENCES DEFAULT_SCHEMA.ledger_transaction (client_id, ledger_transaction_id) ON DELETE CASCADE
     , CONSTRAINT FK_ledger_split_2 FOREIGN KEY (client_id, ledger_account_id)
                  REFERENCES DEFAULT_SCHEMA.ledger_account (client_id, ledger_account_id)
)WITH (
  OIDS=FALSE
);
commit;
