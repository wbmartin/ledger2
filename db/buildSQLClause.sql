-- Function: buildsqlclauses(text, text, integer, integer)

-- DROP FUNCTION buildsqlclauses(text, text, integer, integer);

CREATE OR REPLACE FUNCTION buildsqlclauses(whereclause_ text, orderbyclause_ text, rowlimit_ integer, rowoffset_ integer)
  RETURNS text AS
$BODY$
  Declare
    whereClause text;
    orderByClause text;
    offsetStatement text;
    limitStatement text;
    aggregateClause text;
  Begin
    whereClause ='';
    orderByClause='';
    offsetStatement ='';
    limitStatement ='';
    if rowOffset_ >0 then
	offsetStatement =' offset ' || rowOffset_ ;
    end if;
    if rowLimit_ >0 then
	limitStatement =' limit '||rowLimit_;
    end if;
    if whereClause_ <>'' then
	whereClause = trim(leading whereClause_);
	whereClause = regexp_replace(whereClause, '^(where|WHERE)','');
        whereClause = ' where ' || whereClause;
    end if;
    if orderByClause_ <> '' then
	orderByClause = orderByClause_;
    end if;
	aggregateClause = whereClause || orderByclause || offsetStatement || limitStatement;
	aggregateClause = regexp_replace(aggregateClause, ';|/\*|\*/|dblink|pg_|\-\-|[[:space:]]user|user[[:space:]]|\&|\\g', '', 'gi');
	--; /* */ dblink pg_ -- user & \g
    return aggregateClause;

  End;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

