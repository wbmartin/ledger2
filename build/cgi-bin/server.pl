#! /usr/bin/perl
package SERVER;
use CGI qw/:standard :cgi-lib/;
use DBI; use UTL; use JSON;
use strict;
my $debug=1;
Main:{
  my ($dbh, $json, ,$params);
  $params = &UTL::getParams();
  &UTL::dbConnect(\$dbh);
  $json = &UTL::buildJSONResult($dbh, $params, &buildResourceActionDef($params));
  &UTL::returnResultToClient($json);
  $dbh->disconnect()
}#End Main
################################################################

  sub buildResourceActionDef{
    my $params = shift;
    my $resource = uc($params->{spwfResource});
    my $action = uc($params->{spwfAction});
    my ($rad, @stdSelectParamFields,@allFields,@paramFields);
    #Standard ARGS passed to each fucntion  ('CHECK_AUTH', user_id, session_id) passed to all
    @stdSelectParamFields= ('where_clause','orderby_clause', 'rowlimit','startrow');
    print STDERR "searching for $resource $action\n" if($debug);
    if ($resource eq "SECURITY_USER" ){
      @allFields = ('security_user_id', 'user_id','password_enc', 'last_update', 'security_profile_id', 'session_id', 'session_expire_dt' , 'active_yn', 'email_addr');
      if($action eq "AUTHENTICATE") {
        $rad ={  rf=>[ 'user_id', 'session_id'], pf=>['password'], proc=>"initsession" };
      } elsif($action eq "INSERT"){
        @paramFields =( 'edit_user_id','password_enc', 'security_profile_id',  'active_yn', 'email_addr');
        $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_user_iq"};
  }elsif($action eq "SELECT"){
    @paramFields=@stdSelectParamFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_user_sq"};
  }elsif($action eq "UPDATE"){
    @paramFields=('security_user_id', 'edit_user_id', 'last_update', 'security_profile_id',   'active_yn', 'email_addr');
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_user_uq"};
  }elsif($action eq "DELETE"){
    @paramFields=('security_user_id','last_update');
    $rad = { rf=>['security_user_dq'], pf=>\@paramFields, proc=>"security_user_dq"};
}elsif($action eq "DELETEW"){
  @paramFields=('where_clause');
  $rad = { rf=>['security_user_dqw'], pf=>\@paramFields, proc=>"security_user_dqw"};
  }elsif($action eq "ONE_TIME"){
    @paramFields=('password_reset_code');
    $rad = { rf=>['user_id','session_id'], pf=>\@paramFields, proc=>"initsession_onetime"};
}

#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  } elsif($resource eq "SYS_CODE" ){
    @paramFields = @allFields = ('sys_code_id', 'code_type', 'key', 'value', 'last_update', 'notes');
    if($action eq "SELECT"){
      $rad = { rf=>\@allFields, pf=>\@stdSelectParamFields, proc=>"sys_code_sq"};
}elsif($action eq "INSERT"){
  &UTL::removeArrayElement(\@paramFields, 'last_update');
&UTL::removeArrayElement(\@paramFields, 'sys_code_id');
      $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"sys_code_iq" };
}elsif($action eq "UPDATE"){
  $rad= { rf=>\@allFields, pf=>\@paramFields, proc=>"sys_code_uq" };
    }elsif($action eq "DELETE"){
      $rad =   { rf=>[], pf=>['sys_code_id','last_update'], proc=>"sys_code_dq" };
    }
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  } elsif($resource eq "CROSS_TABLE_CACHE" ){
    @allFields = ('tp', 'lbl', 'val' );
    @paramFields =();
    if($action eq "SELECT"){
      $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"cross_table_cache_sq"};
}
}  elsif($resource eq "SECURITY_PROFILE" ){
  @allFields = ('security_profile_id', 'profile_name', 'last_update' );
  if($action eq "INSERT"){
    @paramFields =@allFields;
    &UTL::removeArrayElement(\@paramFields, 'security_profile_id');
  &UTL::removeArrayElement(\@paramFields, 'last_update');
$rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_iq"};
  }elsif($action eq "SELECT"){
    @paramFields=@stdSelectParamFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_sq"};
  }elsif($action eq "UPDATE"){
    @paramFields=@allFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_uq"};
  }elsif($action eq "DELETE"){
    @paramFields=('security_profile_id','last_update');
    $rad = { rf=>['security_profile_dq'], pf=>\@paramFields, proc=>"security_profile_dq"};
}
} elsif($resource eq "SECURITY_PRIVILEGE" ){
  @allFields = ('security_privilege_id', 'priv_name','description', 'last_update' );
  if($action eq "INSERT"){
    @paramFields =@allFields;
    &UTL::removeArrayElement(\@paramFields, 'security_privilege_id');
  &UTL::removeArrayElement(\@paramFields, 'last_update');
$rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_privilege_iq"};
  }elsif($action eq "SELECT"){
    @paramFields=@stdSelectParamFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_privilege_sq"};
  }elsif($action eq "UPDATE"){
    @paramFields=@allFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_privilege_uq"};
  }elsif($action eq "DELETE"){
    @paramFields=('security_privilege_id','last_update');
    $rad = { rf=>['security_privilege_dq'], pf=>\@paramFields, proc=>"security_privilege_dq"};
}
} elsif($resource eq "SECURITY_PROFILE_GRANT" ){
  @allFields = ('security_privilege_id', 'security_profile_id', 'last_update' );
  if($action eq "INSERT"){
    @paramFields =@allFields;
    &UTL::removeArrayElement(\@paramFields, 'last_update');
  $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_grant_iq"};
  }elsif($action eq "SELECT"){
    @paramFields=@stdSelectParamFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_grant_sq"};
  }elsif($action eq "UPDATE"){
    @paramFields=@allFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"security_profile_grant_uq"};
  }elsif($action eq "DELETE"){
    @paramFields=('security_profile_grant_id','last_update');
    $rad = { rf=>['security_profile_grant_dq'], pf=>\@paramFields, proc=>"security_profile_grant_dq"};
}elsif($action eq "DELETEW"){
  @paramFields=('where_clause');
  $rad = { rf=>['security_profile_grant_dqw'], pf=>\@paramFields, proc=>"security_profile_grant_dqw"};
  }
} elsif($resource eq "SECURITY_CHANGE_PASSWORD" ){
  @allFields = ('user_to_update', 'new_pasword'  );
  if($action eq "CHANGE"){
    @paramFields =@allFields;
    $rad = { rf=>['change_password'], pf=>\@paramFields, proc=>"change_password"};
}
} elsif($resource eq "SUPPORT_REQUEST" ){
  @allFields = ('support_request_id', 'summary', 'detailed_description', 'log_details', 'solution_description', 'last_update'  );
  if($action eq "INSERT"){
    @paramFields =@allFields;
    &UTL::removeArrayElement(\@paramFields, 'last_update');
  &UTL::removeArrayElement(\@paramFields, 'support_request_id');
$rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"support_request_iq"};
  }elsif($action eq "SELECT"){
    @paramFields=@stdSelectParamFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"support_request_sq"};
  }elsif($action eq "UPDATE"){
    @paramFields=@allFields;
    $rad = { rf=>\@allFields, pf=>\@paramFields, proc=>"support_request_uq"};
  }elsif($action eq "DELETE"){
    @paramFields=('support_request_id','last_update');
    $rad = { rf=>['support_request'], pf=>\@paramFields, proc=>"support_request_dq"};
}elsif($action eq "DELETEW"){
  @paramFields=('where_clause');
  $rad = { rf=>['support_request_dqw'], pf=>\@paramFields, proc=>"support_request_dqw"};
  }

} elsif($resource eq "KEEP_ALIVE" ){
  @paramFields=();
  $rad = { rf=>['keepalive'], pf=>\@paramFields, proc=>"keepalive"};

} else {print STDERR "Not Found: $resource $action" if $debug; return;}
return $rad;
}


