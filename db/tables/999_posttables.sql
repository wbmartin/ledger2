--post tables
drop type if exists type_label_value cascade;
create  type type_label_value as (tp  varchar, lbl varchar, val varchar);
