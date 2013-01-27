
CREATE TABLE DEFAULT_SCHEMA.ledger_budget_amount (
       client_id INTEGER NOT NULL
     , ledger_budget_amount_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE
     , ledger_budget_id INTEGER
     , ledger_account_id INTEGER
     , period_num INTEGER
     , amount_num INT8
     , amount_denom INT8
     , PRIMARY KEY (client_id, ledger_budget_amount_id)
     , CONSTRAINT FK_ledger_budget_amount_1 FOREIGN KEY (client_id, ledger_budget_id)
                  REFERENCES DEFAULT_SCHEMA.ledger_budget (client_id, ledger_budget_id)
     , CONSTRAINT FK_ledger_budget_amount_2 FOREIGN KEY (client_id, ledger_account_id)
                  REFERENCES DEFAULT_SCHEMA.ledger_account (client_id, ledger_account_id)
)WITH (
  OIDS=FALSE
);
commit;
