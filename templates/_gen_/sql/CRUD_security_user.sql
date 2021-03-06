
-- Function: security_user_sq(text, text, text, text, text, integer, integer)
-- DROP FUNCTION security_user_sq(text, text, text, text, text, integer, integer);

CREATE OR REPLACE FUNCTION security_user_sq(alreadyAuth_ text, securityuserid_ text, sessionid_ text, whereClause_ text, orderByClause_ text, rowLimit_ integer, rowOffset_ integer)
  RETURNS SETOF security_user AS
$BODY$
  Declare
   Begin
    if alreadyAuth_ <>'ALREADY_AUTH' then
    	perform isSessionValid( securityuserId_,sessionId_) ;
    	perform isUserAuthorized( securityuserId_, 'SELECT_SECURITY_USER' );
    end if;
    return query execute 'select * from security_user ' ||  buildSQLClauses(whereClause_,orderByClause_,rowLimit_,rowOffset_);  
  End;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100
  ROWS 1000;
--ALTER FUNCTION security_user_sq(text,  text, text, text, text, integer, integer) OWNER TO postgres;
--GRANT EXECUTE ON FUNCTION security_user_sq(text, text, text, text, text, integer, integer) TO GROUP golfscore;
--select * from security_user_sq('ALREADY_AUTH',  'test', 'test', '','',-1,-1);
--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+


-- Function: security_user_bypk(text, text, text ,integer)
-- DROP FUNCTION security_user_pybk(text, text, text,integer);
--CREATE OR REPLACE FUNCTION security_user_bypk(alreadyAuth_ text,  securityuserid_ text, sessionid_ text 
--,securityUserId_ integer)
--  RETURNS security_user AS
--$BODY$
--  Declare
--    result security_user;
--  Begin
--    if alreadyAuth_ <>'ALREADY_AUTH' then
--    	perform isSessionValid( securityuserId_,sessionId_) ;
--    	perform isUserAuthorized( securityuserId_, 'SELECT_SECURITY_USER' );
--    end if;
--security_user_id, user_id, last_update, updated_by, password_enc, security_profile_id, session_id, session_expire_dt, active_yn, email_addr, pwd_reset_cd
--     select * into result from security_user where security_user_id=securityUserId_;
--     return result;
--  End;
--$BODY$
--  LANGUAGE 'plpgsql' VOLATILE
--  COST 100;
--ALTER FUNCTION security_user_bypk(text,  text, text,integer) OWNER TO postgres;
--GRANT EXECUTE ON FUNCTION security_user_bypk(text,  text, text,integer) TO GROUP golfscore;


--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+



-- Function:  security_user_iq(text, text, text ,text,text,integer,text,timestamp,character,text,text)
-- DROP FUNCTION security_user_iq( text, text, text,text,text,integer,text,timestamp,character,text,text);
create or replace function security_user_iq(alreadyauth_ text, securityuserid_ text, sessionid_ text,userId_ text,passwordEnc_ text,securityProfileId_ integer,sessionId_ text,sessionExpireDt_ timestamp,activeYn_ character,emailAddr_ text,pwdResetCd_ text)
  returns security_user as
$body$
  declare
    newrow security_user;
  begin
    if alreadyauth_ <>'ALREADY_AUTH' then	
    	perform issessionvalid( securityuserid_,sessionid_) ;
    	perform isuserauthorized( securityuserid_,'INSERT_SECURITY_USER' );
    end if;


    insert into security_user( user_id,last_update,updated_by,password_enc,security_profile_id,session_id,session_expire_dt,active_yn,email_addr,pwd_reset_cd)  values ( userId_, now(), securityuserid_,passwordEnc_,securityProfileId_,sessionId_,sessionExpireDt_,activeYn_,emailAddr_,pwdResetCd_) 
	returning * into newrow;
      return newrow;
  end;
$body$
  language 'plpgsql' volatile
  cost 100;
--alter function security_user_iq(text,  text, text ,text,text,integer,text,timestamp,character,text,text) owner to postgres;
--GRANT EXECUTE ON FUNCTION security_user_iq(text,  text, text ,text,text,integer,text,timestamp,character,text,text) TO GROUP golfscore;

--select * from security_user_iq('ALREADY_AUTH', 'test', 'test' , 'text', 'text', 'text' ,1, 'text', 'text', 'text', 'text', 'text' );
--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+


-- Function:  security_user_uq(text, text, text ,integer,text,timestamp,text,integer,text,timestamp,character,text,text)
-- DROP FUNCTION security_user_uq(text, text, text ,integer,text,timestamp,text,integer,text,timestamp,character,text,text);

create or replace function security_user_uq(alreadyauth_ text,  securityuserid_ text, sessionid_ text , securityUserId_ integer, userId_ text, lastUpdate_ timestamp, passwordEnc_ text, securityProfileId_ integer, sessionId_ text, sessionExpireDt_ timestamp, activeYn_ character, emailAddr_ text, pwdResetCd_ text)
  returns security_user as
$body$
  declare
    updatedrow security_user;
  begin
    if alreadyauth_ <>'ALREADY_AUTH' then	
    	perform issessionvalid( securityuserid_,sessionid_) ;
    	perform isuserauthorized( securityuserid_, 'UPDATE_SECURITY_USER' );
    end if;
	update security_user set user_id= userId_ ,  last_update = now() , updated_by = securityuserid_,  password_enc= passwordEnc_ ,  security_profile_id= securityProfileId_ ,  session_id= sessionId_ ,  session_expire_dt= sessionExpireDt_ ,  active_yn= activeYn_ ,  email_addr= emailAddr_ ,  pwd_reset_cd= pwdResetCd_ 	where security_user_id=securityUserId_   and   last_update = lastUpdate_
	returning * into updatedrow;

	if found then
	  return updatedrow;
	else 
	  raise exception 'Update Failed for SECURITY_USER- The record may have been changed or deleted before the attempt.';
	end if;

  end;
$body$
  language 'plpgsql' volatile
  cost 100;
--alter function security_user_uq(text,  text, text ,integer,text,timestamp,text,integer,text,timestamp,character,text,text) owner to postgres;
--GRANT EXECUTE ON FUNCTION security_user_uq(text, text, text ,integer,text,timestamp,text,integer,text,timestamp,character,text,text) TO GROUP golfscore;

--select * from security_user_uq('ALREADY_AUTH', 'test', 'test', 'text', 'text' <last_update>, 'text', 'text' ,1, 'text', 'text', 'text', 'text' <security_user_id>);


--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
-- Function:  security_user_dq(text, text ,integer, timestamp)
-- DROP FUNCTION security_user_dq( text,  text ,integer, timestamp);

create or replace function security_user_dq(alreadyauth_ text,  userid_ text, sessionid_ text ,securityUserId_ integer, lastUpdate_ timestamp  )
  returns boolean as
$body$
  declare
    
  begin
    if alreadyauth_ <>'ALREADY_AUTH' then	
    	perform issessionvalid( userid_,sessionid_) ;
    	perform isuserauthorized(userid_,'DELETE_SECURITY_USER' );
    end if;
	delete from security_user where security_user_id=securityUserId_  and last_update = lastUpdate_;

	if found then
	  return true;
	else 
	  raise exception 'Delete Failed for SECURITY_USER- The record may have been changed or deleted before the attempt.';
	end if;
  end;
$body$
  language 'plpgsql' volatile
  cost 100;
--alter function security_user_dq(text, text, text,integer, timestamp) owner to postgres;
--GRANT EXECUTE ON FUNCTION security_user_dq(text,  text, text,integer, timestamp) TO GROUP golfscore;
--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

-- Function:  security_user_dqw(text, text, text)
-- DROP FUNCTION security_user_dqw( text,text,text);
create or replace function security_user_dqw(alreadyauth_ text,  userid_ text, sessionid_ text , whereClause_ text )
  returns boolean as
$body$
  declare
  rcnt int;  
  begin
    if alreadyauth_ <>'ALREADY_AUTH' then	
    	perform issessionvalid( userid_,sessionid_) ;
    	perform isuserauthorized(userid_,'DELETE_SECURITY_USER' );
    end if;
	execute  'delete from security_user ' ||  buildSQLClauses(whereClause_,'',0,0)  ;
	GET DIAGNOSTICS rcnt = ROW_COUNT;
	if rcnt>0 then
	  return true;
	else 
	  raise exception 'Delete Failed for SECURITY_USER- The record may have been changed or deleted before the attempt.';
	end if;
  end;
$body$
  language 'plpgsql' volatile
  cost 100;
--alter function security_user_dq(text, text, text,integer, timestamp) owner to postgres;
--GRANT EXECUTE ON FUNCTION security_user_dq(text,  text, text,integer, timestamp) TO GROUP golfscore;
--=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+