/**************************************************************************************/
/* TITRE : Création de la base de requête contenant les susbtances et les codes CIP ***/
/* VERSION : 0.3 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 03/05/2022 ******************************************************************/
/* OBJECTIF : Création de la base de requête contenant la correspondance entre les    */
/* susbtances et les codes CIP sur lequel la requête SNDS va se faire. Insertion d'un */
/* compteur sur les substances pour paramétrer num_subst_min et num_subst_max dans le */
/* programme 2_Requete_SNDS.sas *******************************************************/
/* BASES EN ENTREE : ******************************************************************/
/* - libordei.BASE_REQUET_CIP_SUBS ****************************************************/
/* - oravue.IR_PHA_R *****************************/
/* - oravue.ER_PRS_F_&an_exe et oravue.ER_PRS_F_&an_exe+1 *****************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.aggdcir_subs_&nomsubs._&an_exe. *****************************************/
/**************************************************************************************/


/************************************************/
/* 1. PARAMETRES A RENSEIGNER PAR L'UTILISATEUR */
/************************************************/
/* Il faut importer la table list_cip_subs_codex issue de CODEX */
/* Ici on l'a renommé CIP_SUBSTANCE_CODEX et stocké dans libordei */
%let table_import = libordei.CIP_SUBSTANCE_CODEX;

/***************************************************************/
/* 2. CREATION DE LA BASE DE REQUETE PAR CODE CIP ET SUBSTANCE */
/***************************************************************/
/* 1. ATTRIBUER SUBSTANCE CODEX AUX CODES CIP PRESENTS DANS LE SNDS */
/* Liste des codes CIP présents dans le SNDS tirée du référentiel IR_PHA_R */
data list_cip_snds ; set oravue.IR_PHA_R (keep=PHA_CIP_C13);
ch_PHA_CIP_C13 = put(PHA_CIP_C13, $13.);
run; /* 26 880 */

proc sort data=list_cip_snds nodupkey; by PHA_CIP_C13; run; /* 26 880 */

/* Liste des codes CIP et leurs substances actives tirée de Codex */
data list_cip_subs_codex ; set &table_import; run; /* 125 839 */

proc sql; create table count as select 
count(distinct(SUBSTANCE_CODEX_UNIQUE)) as count_subs
from list_cip_subs_codex; quit; run; /* 3513 substances codex */

/* Jointure entre les deux tables */
proc sql;
create table list_cip_subs_snds as select a.*, b.* 
from list_cip_snds a 
left join list_cip_subs_codex b
on a.ch_PHA_CIP_C13 =b.codeCIP13;
quit; run;


/* 2. ETUDE DES CODES CIP NON RETROUVES */
proc summary data=list_cip_subs_snds print; run; /* 32895 lignes */

/* Description */
proc sql; create table count as select 
count(distinct(ch_PHA_CIP_C13)) as count_PHA_CIP_C13, /* 26880 codes CIP dans SNDS*/
count(distinct(codeCIP13)) as count_codeCIP13, /* 21743 codes CIP retrouvés dans Codex*/
count(distinct(SUBSTANCE_CODEX_UNIQUE)) as count_subs /* 2068 substances correspondantes*/
from list_cip_subs_snds;
quit; run;

proc sql; create table count as select count(distinct(ch_PHA_CIP_C13))
from list_cip_subs_snds where SUBSTANCE_CODEX_UNIQUE=""; quit; run; /* 5137 codes CIP non retrouvés dans Codex*/

data list_cip_non_retrouv ; set list_cip_subs_snds; 
where SUBSTANCE_CODEX_UNIQUE=""; keep pha_cip_c13; run; /* 5137 */

/* Ajout informations IR_PHA_R au CIP non retrouvés */
proc sql;
create table list_cip_non_retrouv2 as select a.*, b.*
from list_cip_non_retrouv a 
left join oravue.IR_PHA_R b
on a.PHA_CIP_C13=b.PHA_CIP_C13;
quit; run; /* 5137 */


/* 3. CONSTITUTION BASE REQUETE */
/* -> il s'agit d'une base comportant les codes CIP communs entre le SNDS et Codex */
/* Retenir codes CIP présents dans IR_PHA_R */
data base_requete ; set list_cip_subs_snds; where SUBSTANCE_CODEX_UNIQUE NE ""; 
drop PHA_CIP_C13; rename ch_PHA_CIP_C13=PHA_CIP_C13; run;

proc sort data=base_requete; by SUBSTANCE_CODEX_UNIQUE; run; /* 27 758 */

/* Création compteur codes CIP par substance */
data base_requete;
  set base_requete;
  CIP_NUM + 1;
  by SUBSTANCE_CODEX_UNIQUE;
  if first.SUBSTANCE_CODEX_UNIQUE then CIP_NUM = 1;
run;

/* Création compteur par substance */
data base_requete; set base_requete;
by SUBSTANCE_CODEX_UNIQUE;
retain SUBST_NUM 0;
if first.SUBSTANCE_CODEX_UNIQUE then SUBST_NUM=SUBST_NUM+1;
run;

/* Sauvegarde */
data libordei.BASE_REQUET_CIP_SUBS ; set base_requete; run;
data libordei.LIST_CIP_NON_RETROUV_SNDS ; set list_cip_non_retrouv2; run;

