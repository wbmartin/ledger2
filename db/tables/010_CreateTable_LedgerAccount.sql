
CREATE TABLE DEFAULT_SCHEMA.ledger_account (
       client_id INTEGER NOT NULL
     , ledger_account_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
     , name VARCHAR(255) NOT NULL
     , account_type VARCHAR(25) NOT NULL
     , ledger_commodity_id INTEGER
     , parent_account_id INTEGER
     , code VARCHAR(255)
     , description VARCHAR(255)
     , PRIMARY KEY (client_id, ledger_account_id)
);

commit;
