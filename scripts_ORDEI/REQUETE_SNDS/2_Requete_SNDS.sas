/**************************************************************************************/
/* TITRE : Estimation du nbre de personnes avec un délivrance par Subtance et année ***/
/* VERSION : 0.6 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 03/05/2022 ******************************************************************/
/* OBJECTIF : Pour chaque substance, on récupère la liste de codes CIP. Ensuite, pour */
/* chaque code CIP et chaque année, on va récupérer les prestations exécutés l'année  */
/* regardée. Ensuite, on compile tous les bénéficiaires par substance et année de *****/
/* de manière unique et on fait le décompte par strate (âge/sexe) *********************/
/* BASES EN ENTREE : ******************************************************************/
/* - libordei.BASE_REQUET_CIP_SUBS ****************************************************/
/* - oravue.ER_PHA_F ******************************************************************/
/* - oravue.ER_PRS_F ******************************************************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.aggdcir_s_num&num_subst_min._&num_subst_max._&Annee. ********************/
/**************************************************************************************/

/************************************************/
/* 1. PARAMETRES A RENSEIGNER PAR L'UTILISATEUR */
/************************************************/
/* Table contenant la base de requête (pgm 1_base_requet_cip.sas) */
%let table_cip_subs = libordei.BASE_REQUET_CIP_SUBS;

/* Numéros de substances entre lesquelles requêter dans &table_cip_subs*/ 
/* limiter les requêtes à des pas de 5 à 10 substances max */
%let num_subst_min = 1;
%let num_subst_max = 10;

/* Année d'exécution de soins recherché */
%let Annee = 2018;

/****************/
/* 2. PROGRAMME */
/****************/
options nosource;

/* 1. IMPORT BASE_REQUET - correspondance CIP - substance */
data BASE_REQUET_CIP_SUBS; set &table_cip_subs; run;

/* 2. MACRO OUTIL : Destruction des tables dans orauser  */
%MACRO KILL_TAB_ORAUSER (table) ;
%if %sysfunc(exist(ORAUSER.&table)) %then %do;
  PROC DELETE DATA=ORAUSER.&table; RUN;%end;
%mend;

/* 3. MACRO OUTIL : fonction des cles de jointure du DCIR  */
%macro CLE_TEC (g,d);
&g..DCT_ORD_NUM=&d..DCT_ORD_NUM and
&g..FLX_DIS_DTD=&d..FLX_DIS_DTD and
&g..FLX_EMT_NUM=&d..FLX_EMT_NUM and
&g..FLX_EMT_ORD=&d..FLX_EMT_ORD and
&g..FLX_EMT_TYP=&d..FLX_EMT_TYP and
&g..FLX_TRT_DTD=&d..FLX_TRT_DTD and
&g..ORG_CLE_NUM=&d..ORG_CLE_NUM and
&g..PRS_ORD_NUM=&d..PRS_ORD_NUM and 
&g..REM_TYP_AFF=&d..REM_TYP_AFF
%mend;

/* 4. MACRO OUTIL : Recherche et complation des conso par CIP et an_exe */
%MACRO CREA_table(i, MM, annee, an_exe);

/* Création de la macro-variable mois */
%let liste = JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC ;
%let mois =  %scan (&liste, &MM) ;	
/* Création des macro-variables date_deb, date_fin et flx_deb */
%if &MM = 10 or &MM = 11 or &MM = 12 %then %do ; %let ZM = &MM ; %end;
%else %do ; %let ZM = 0&MM ; %end;
/* création intervalle entre date début et fin de soins */
%let deb_exe = %sysfunc (mdy(01,01,&an_exe));
%let fin_exe = %sysfunc (mdy(12,31,&an_exe));
%let date_deb = %sysfunc (putn(&deb_exe, date9.));
%let date_fin = %sysfunc (putn(&fin_exe, date9.));
/* Création de la date de flux à regarder : premier du mois */
%let deb_flx = %sysfunc(mdy(&ZM , 01 ,&annee )) ; 
%let flx_deb = %sysfunc(putn(&deb_flx, date9.));


/* Requête */
/* Note : on n'utilise pas oracle car se met en timeout trop rapidement */
proc sql noprint;
create table consdcir_&nomcip._&mois.&annee. (compress=yes) as select
distinct a.BEN_NIR_PSA, 
a.BEN_NAI_ANN, 
a.BEN_SEX_COD,
c.CODECIP13,
c.SUBSTANCE_CODEX_UNIQUE

/* distinction suivant 2013 ou non */
%if &annee < 2013 %then %do; from oravue.ER_PRS_F_&annee. a, oravue.ER_PHA_F_&annee. b, orauser.cip_rech_&s_min._&s_max. c %end;
%else %do; from oravue.ER_PRS_F a, oravue.ER_PHA_F b, orauser.cip_rech_&s_min._&s_max. c %end;

where b.PHA_PRS_C13 = c.PHA_CIP_C13
and (%CLE_TEC(a,b))
and   b.FLX_DIS_DTD = "&FLX_DEB:0:0:0"dt
and   a.EXE_SOI_DTD between "&DATE_DEB:0:0:0"dt
					  and   "&DATE_FIN:0:0:0"dt 
; quit; 

%if &MM = 1 AND &annee=&an_exe
%then %do; 
data consdcir_&nomcip._&an_exe.; set consdcir_&nomcip._&mois.&annee.; run; 
%end ;
%else %do; 
data consdcir_&nomcip._&an_exe.; set consdcir_&nomcip._&an_exe. consdcir_&nomcip._&mois.&annee.; run ;
proc sort data=consdcir_&nomcip._&an_exe. nodupkey; by BEN_NIR_PSA ; run;
%end ;

proc datasets lib=WORK nodetails nolist; DELETE consdcir_&nomcip._&mois.&annee.; run;

%mend;

/* 5. MACRO OUTIL : Itérations sur CREA_TABLE et compilation par substance et an_exe*/
%MACRO ITERE_FLX (an_exe) ;
%let s_min = &num_subst_min;
%let s_max = &num_subst_max;
%do s = &s_min %to &s_max ; /* pour chaque substance */

/* récupérer la liste des cip de la substance recherchée */
data tab_cip_subs_&s_min._&s_max. ; set BASE_REQUET_CIP_SUBS; where SUBST_NUM=&s; run;

/* compte nbre de codes cip -> stockage dans macro-variable nb_cip */
proc sql noprint;
select distinct count(*) into: nb_cip
from tab_cip_subs_&s_min._&s_max.;
quit;
%put &nb_cip;

/* stockage code substance */
proc sql noprint;
select distinct codeSubstance into: nomsubs
from tab_cip_subs_&s_min._&s_max.;
quit;
%put &nomsubs;

/* stockage num_subs */
proc sql noprint;
select distinct SUBST_NUM into: num_subs
from tab_cip_subs_&s_min._&s_max.;
quit;
%put &num_subs;

%KILL_TAB_ORAUSER (tab_cip_subs_&s_min._&s_max.);
data orauser.tab_cip_subs_&s_min._&s_max. ; set tab_cip_subs_&s_min._&s_max.; run;

%do i = 1 %to &nb_cip; /* pour chaque code cip contenant la substance */

/* table du cip recherché */
%KILL_TAB_ORAUSER (cip_rech_&s_min._&s_max.);
data cip_rech_&s_min._&s_max. ; set tab_cip_subs_&s_min._&s_max.; if _N_ in (&i) then output; run;
data orauser.cip_rech_&s_min._&s_max. ; set cip_rech_&s_min._&s_max.; run;

/* stockage nom cip */
proc sql noprint;
select codeCIP13 into: nomcip
from cip_rech_&s_min._&s_max.;
quit;
%put &nomcip;

/* aller chercher les délivrances l'année n traitées par l'AM l'année n */
%do m = 1 %to 12; /* mois sur lesquels requeter */
%do a = &an_exe %to &an_exe; /* année sur laquelle requeter */
%CREA_TABLE (&i, &m, &a, &an_exe);
%end;%end;

/* aller chercher les délivrances l'année n traitées par l'AM l'année n+1 */
%do m2 = 1 %to 6; /* regarder dans les 6 premiers mois de l'année n */
%do a2 = &an_exe+1 %to &an_exe+1; /* années sur laquelle requeter */
%CREA_TABLE (&i, &m2, &a2, &an_exe);
%end;%end;

/* Compilation par substance */
%if &i = 1 
%then %do; 
data consdcir_subs_&nomsubs._&an_exe. ; set consdcir_&nomcip._&an_exe.; run;
%end ;
%else %do; 
data consdcir_subs_&nomsubs._&an_exe. ; set consdcir_subs_&nomsubs._&an_exe. consdcir_&nomcip._&an_exe.; run;
%end;

proc sort data=consdcir_subs_&nomsubs._&an_exe. nodupkey; by BEN_NIR_PSA ; run;
proc datasets lib=WORK nodetails nolist; DELETE consdcir_&nomcip._&an_exe.; run;
%end;

/* Néttoyage de la table */
data c_consdcir_subs_&nomsubs._&an_exe. ; set consdcir_subs_&nomsubs._&an_exe. ;
where (BEN_SEX_COD = 1 OR BEN_SEX_COD = 2) AND BEN_NAI_ANN > "1900" AND BEN_NAI_ANN <= "&an_exe";
AGE=&an_exe - BEN_NAI_ANN;
IF AGE < 20 THEN CAT_AGE=0;
ELSE IF AGE <60 THEN CAT_AGE=20;
ELSE CAT_AGE=60;
run;

/* Aggrégation */
proc freq data=c_consdcir_subs_&nomsubs._&an_exe. ; table CAT_AGE*BEN_SEX_COD / out=aggdcir_subs_&nomsubs._&an_exe.; run;

data aggdcir_subs_&nomsubs._&an_exe.; set aggdcir_subs_&nomsubs._&an_exe.;
ANNEE = &an_exe;
codeSubstance = "&nomsubs";
SUBST_NUM = "&num_subs";
drop PERCENT;
run;

proc datasets lib=WORK nodetails nolist; DELETE c_consdcir_subs_&nomsubs._&an_exe. consdcir_subs_&nomsubs._&an_exe.; run;

/* Compilation des substances */
%if &s = &s_min
%then %do; 
data aggdcir_s_num&s_min._&s_max._&an_exe. ; set aggdcir_subs_&nomsubs._&an_exe.; run;
%end ;
%else %do; 
data aggdcir_s_num&s_min._&s_max._&an_exe. ; set aggdcir_s_num&s_min._&s_max._&an_exe. aggdcir_subs_&nomsubs._&an_exe.; run;
%end;
proc datasets lib=WORK nodetails nolist; DELETE aggdcir_subs_&nomsubs._&an_exe.; run;
%end;
data libordei.aggdcir_s_num&s_min._&s_max._&an_exe. ; set aggdcir_s_num&s_min._&s_max._&an_exe.; run;

%mend;

/* lancement du programme */
options obs=max;
%ITERE_FLX (&Annee);


