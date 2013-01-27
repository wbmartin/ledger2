
CREATE TABLE DEFAULT_SCHEMA.ledger_budget (
       client_id INTEGER NOT NULL
     , ledger_budget_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE
     , name VARCHAR(25) NOT NULL
     , description VARCHAR(255)
     , PRIMARY KEY (client_id, ledger_budget_id)
)WITH (
  OIDS=FALSE
);
commit;
