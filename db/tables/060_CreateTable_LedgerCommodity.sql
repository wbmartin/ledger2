
CREATE TABLE DEFAULT_SCHEMA.ledger_commodity (
       client_id INTEGER NOT NULL
     , ledger_commodities_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
     , mnemonic VARCHAR(25)
     , full_name VARCHAR(255)
     , cusip CHAR(10)
     , fraction INT
     , quote_flag CHAR(10)
     , quote_source VARCHAR(255)
     , quote_tz VARCHAR(255)
     , PRIMARY KEY (ledger_commodities_id, client_id)
)WITH (
  OIDS=FALSE
);
commit;
