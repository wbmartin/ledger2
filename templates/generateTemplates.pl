#!/usr/bin/perl
use strict;
use Template;
use FindBin;
use  lib "$FindBin::Bin/";
use DBGen_Util;
use DBI;

Main:{
  my ($dbh, $key, $value, @templates,$templateName,  $outputPath, $tt, $var, %props, $key, $value,$templatePath);
  my %tables = ();
  my $absoluteSrcPath= $ARGV[0];
  my $genDate = localtime;
  print "Recieved Path: $absoluteSrcPath\n";
  #&DBGenUTIL::getProps(\%props, ("$absoluteSrcPath/template/include.properties"));
  %props =(dbgroup=>'golfscore');
$outputPath = "$absoluteSrcPath/_gen_";
$templatePath = "$absoluteSrcPath/_templates_/";
`rm -rf $outputPath/*`;
&DBGenUTIL::getConnection(\$dbh,'concordc_golfscoredev','concordc_golfscoredev','golfscore');
  &DBGenUTIL::getTables($dbh,\%tables);
my @appTemplates ;
&populateWebTemplates(\@appTemplates,"$absoluteSrcPath/_templates_/");
  $var = {tbl=>\%tables,props=>\%props, toCC=>\&DBGenUTIL::toCC, ucfirst =>\&DBGenUTIL::ucf, lcfirst =>\&DBGenUTIL::lcf, appTemplates=>\@appTemplates, getFileName =>\&DBGenUTIL::getFileName, genDate=>$genDate };
  &DBGenUTIL::grabTemplates($templatePath, \@templates);
print "\nif you're missing a table, be sure you've granted security.\n";
print "\nTables: ";
while(($key,$value) = each %tables){
  print "$key "
}
print "\n";
foreach(@templates){
  next if /swp/;
  $templateName = $_;
  print "Begin template: $templateName | ";
  $tt = Template->new(RELATIVE=>1,ABSOLUTE=>1, OUTPUT_PATH=>$outputPath, INCLUDE_PATH=>"$templatePath");
  $tt->process(("${templatePath}$templateName"),$var ) || die $tt->error(); 
  print "End template $templateName\n";
}
$dbh->disconnect();



}

sub populateWebTemplates{
  my ($pathArray, $path) = @_;
  my($dh1, $dh2,$folder, $file);
  opendir $dh1, $path;
  print "populating Templates from : $path\n";
  while($folder = readdir $dh1){
    next if ($folder =~ m/^\./);
    opendir $dh2, "$path/$folder";
    while($file = readdir $dh2){
      next if ($file =~ m/^\./);
      push(@$pathArray, ("${path}/${folder}/${file}"));
    }
    closedir $dh2;
  }
  closedir $dh1;
}

