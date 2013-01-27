\set ECHO all
\i db/securitySchema/000_preSecuritySchema.sql
\i db/securitySchema/001_CreateSecurityProfile.sql
\i db/securitySchema/002_CreateSecurityUser.sql
\i db/securitySchema/003_CreateSecurityPrivilege.sql
\i db/securitySchema/004_CreateSecurityProfileGrant.sql

\i db/securitySchema/005_CreateVw_ProfileGrant.sql
\i db/securitySchema/006_CreateVw_UserGrant.sql

\i db/securitySchema/010_CreateSP_InitSession.sql
\i db/securitySchema/011_CreateSP_IsSessionValid.sql
\i db/securitySchema/012_CreateSP_IsUserAuthorized.sql
\i db/ssecuritySchema/020_CreateProc_CRUD_SecurityProfile.sql
\i db/securitySchema/030_CreateProc_CRUD_SecurityPrivilege.sql 
\i db/securitySchema/040_CreateProc_CRUD_security_profile_grant.sql
\i db/securitySchema/050_CreateProc_CRUD_security_user.sql
\i db/securitySchema/060_CreateProc_ChangePassword.sql
\i db/securitySchema/070_CreateProc_PasswordReset.sql

