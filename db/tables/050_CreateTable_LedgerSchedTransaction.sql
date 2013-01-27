
CREATE TABLE DEFAULT_SCHEMA.ledger_sched_transaction (
       client_id INTEGER NOT NULL
     , ledger_schedule_transaction_id SERIAL NOT NULL
     , last_update TIMESTAMP(3) WITHOUT TIME ZONE
     , name VARCHAR(25)
     , start_date DATE
     , last_occur_date DATE
     , num_occur INTEGER
     , rem_occur INTEGER
     , auto_create BOOLEAN
     , auto_notify INTEGER
     , adv_creation_days INTEGER
     , adv_notify_days INTEGER
     , instance_count INTEGER
     , PRIMARY KEY (client_id, ledger_schedule_transaction_id)
)WITH (
  OIDS=FALSE
);
commit;
