package UTL;
use CGI qw/:standard :cgi-lib/;
use strict;
use DBI;
use JSON;

my $debug=1;

sub buildDBInfo(){
  my($codeEnv,$prodServerPassword,$uatServerPassword,$DBInfo);
  $codeEnv="DEV";#1 for qa mode 0 for production
  $prodServerPassword="";#Changed on Server after publish
  $uatServerPassword="";#Changed on Server after publish
  if($codeEnv eq "PROD"){# set the evironment specific connection data
    $DBInfo ={dbname=>"concordc_ledger", user=>"concordc_ledger", password=>$prodServerPassword};
  }elsif($codeEnv eq "UAT"){
    $DBInfo ={dbname=>"concordc_ledgeruat", user=>"concordc_ledgeruat", password=>$uatServerPassword};
  }else{
    $DBInfo ={dbname=>"concordc_ledgerdev", user=>"concordc_ledgerdev", password=>"ledger"}; 
  }
  return $DBInfo;
}

sub getEmailPassword(){ return '567tyughj';}


sub parseParams(){
  my $params = shift;
  while ( my ($key, $value) = each($params) ) {
    print STDERR "\t$key => $value\n" if ($key ne "password");
  }
  return $params;
}

sub dbConnect{
  my ($dbh ) = @_;
  my $DBInfo= 	buildDBInfo();
  ${$dbh} = DBI->connect("DBI:Pg:dbname=$DBInfo->{dbname};host=localhost",
    $DBInfo->{user}, 
    $DBInfo->{password}, 
    {RaiseError => 0});
  return;
}

sub toCC{
  my($in) = shift;
  my($out)="";
  my(@parts) = split(/_/,$in);
  my($ndx)=0;
  $out = $parts[0];
  for( $ndx =1;$ndx<= $#parts;$ndx++){ $out .= ucfirst($parts[$ndx]); }
  return $out;
}

sub removeArrayElement(){
  my $arrayRef = shift;
  my $elementToRemove = shift;
  my $ndx=0;
  for( $ndx =0; $ndx <@$arrayRef; $ndx++){
    if (${$arrayRef}[$ndx] eq $elementToRemove){
      splice(@{$arrayRef}, $ndx, 1);
      last;
    }
  }
  return;
}

sub buildSQLColsList{
  my $colArrayRef = shift;
  my($SQLColsList);
  foreach(@$colArrayRef){
    $SQLColsList .= " $_,";
  }
  $SQLColsList =~ s/,$/ /;
  return $SQLColsList;
}

sub buildJSONResult{
  my ($dbh, $params, $raDef) = @_;
  my ($sql, @spFields, @stdFieldNames, $sth, $ndx);
  @stdFieldNames = ( 'user_id', 'session_id');
  @spFields = (@stdFieldNames,@{$raDef->{pf}});
  $sql = "SELECT " . &buildSQLColsList($raDef->{rf})  ." from $raDef->{proc}('CHECK_AUTH'," . ("?," x $#spFields) . "?) ;" ;
  print STDERR "SQL: $sql\n" if($debug);
  $sth = $dbh->prepare($sql);
  $ndx=1;
  foreach(@spFields){
    print STDERR "\tBinding Params $ndx $_ $params->{$_}\n " if ($debug && $_ ne "password");
    $sth->bind_param($ndx++,$params->{$_});
  }

   
  return &packageResults($sth, $params);
}

sub packageResults(){
  my $sth =shift;
  my $params = shift;
  my ($json, $json_text,$ndx, $rowRef ,  @rows, $rowCount);
  my ($keywords, @passThrus, $key,$value );

  if(ref($sth)){
    #if we have a successful connection and statement built, execute it, iterate over result set, package and return
    print STDERR "Connection Successful\n" if($debug);
    $sth->execute();
    if(!$sth->err){
      $rowCount = 0;# iterate through resultset
      while(my $ref = $sth->fetchrow_hashref()) {
        push(@rows, $ref);
        $rowCount++;
        #while ( my ($key, $value) = each(%$ref) ) {print STDERR "$key: $value"; }
      }
      #package it up in and print it
      $json->{"rows"} = \@rows;
    $json->{"rowCount"} = $rowCount;
  }else{
    $json->{"rowCount"} = 0;
    $json->{"errorMsg"} = $DBI::errstr;
  }
  if (uc($params->{'spwfAction'}) eq "DELETE"){
    while ( my ($key, $value) = each(%$params) ) {
      if($key ne 'last_update' && $key ne 'user_id' && $key ne 'session_id'){
        $json->{$key} = $value;
      }
    }
  }
  print STDERR "Pagination: " . $params->{'spwfPagination'};
  if (uc($params->{'spwfAction'}) eq "SELECT" && uc($params->{'spwfPagination'}) eq "TRUE"){
    $json->{"spwfTotalItemCount"} = 20;
  }
#tag on the original action and resource form the request
  $json->{"spwfAction"}= uc($params->{'spwfAction'});
  $json->{"spwfResource"}= uc($params->{'spwfResource'});
  $json->{"requestId"}=$params->{'requestId'};
#any variables the client sent that they wanted returned to the asynch success function
  if(exists $params->{'passThru'}){
    @passThrus = split(/;/,$params->{'passThru'});
    foreach(@passThrus){
      ($key,$value) = split(/~/,$_);
      $key ="PT_$key";
      $json->{$key} = $value;	
    }
  }
  print STDERR "Package Successful\n" if($debug);
}else{#if no successful connection or statement build issue, package the error
  $json->{"errorMsg"} =$sth;
}  
return $json;
}

sub getParams(){
  my $cgi = CGI->new;
  my $params = Vars;
  $params = &UTL::parseParams($params);# export form values ensures that you also get multi-value <select>s as separate values. too.
  if (!exists $params->{'user_id'}) {#get userid and session from cookie, unless login
    $params->{'user_id'} = $cgi->cookie('user_id');
    $params->{'session_id'} = $cgi->cookie('session_id');
  }
  return $params;
}

sub returnResultToClient($json){
  my $json = shift;
  my $jsonText =to_json($json);
  print header('application/json');
  print $jsonText;
  print STDERR "JSON Txt: $jsonText\n"  if($debug);
}


1;

