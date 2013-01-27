package UTL;
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
          print STDERR "\t$key => $value\n" ;#if ($key ne "password");
    	}

#	my $keywords = from_json($params->{"keywords"});
#	if($debug){ #print some debugging info    
#	print STDERR "Script running - Parameters received:\n";
#  	while ( my ($key, $value) = each(%{$keywords}) ) {
#          print STDERR "\t$key => $value\n" if ($key ne "password");
#    	}
#  }
#	$params = $keywords;
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


1;

