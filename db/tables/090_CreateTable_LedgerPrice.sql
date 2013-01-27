
CREATE TABLE DEFAULT_SCHEMA.ledger_price (
       client_id INTEGER NOT NULL
     , ledger_price_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
     , ledger_commodity_id INTEGER NOT NULL
     , ledger_currency_id INTEGER NOT NULL
     , effective_date DATE NOT NULL
     , source VARCHAR(255)
     , type VARCHAR(255)
     , value_num INTEGER NOT NULL
     , value_denom INTEGER NOT NULL
     , ledger_commodities_id INTEGER NOT NULL
     , PRIMARY KEY (client_id, ledger_price_id)
     , CONSTRAINT FK_ledger_price_1 FOREIGN KEY (ledger_commodities_id, client_id)
                  REFERENCES DEFAULT_SCHEMA.ledger_commodity (ledger_commodities_id, client_id)
)WITH (
  OIDS=FALSE
);
commit;
