/**************************************************************************************/
/* TITRE : Estimation du nbre de femmes enceintes avec un délivrance pendant leur *****/
/* grossesse par Subtance et année ****************************************************/
/* VERSION : 0.2 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 03/05/2022 ******************************************************************/
/* OBJECTIF : Pour chaque substance, on récupère la liste de codes CIP. Ensuite, pour */
/* chaque code CIP et chaque année, on va récupérer les prestations exécutés l'année  */
/* regardée sur la période d'exposition (période de grossesse pendant l'année) des ****/
/* femmes enceintes ciblés dans les programmes précédents. Ensuite, on compile les ****/
/* tables par substance et année ******************************************************/
/* BASES EN ENTREE : ******************************************************************/
/* - libordei.BASE_REQUET_CIP_SUBS_GROSS **********************************************/
/* - libordei.COHORTE_GROSSESSE_ORDEI_&annee_expo. *********************************/
/* - oravue.ER_PHA_F ******************************************************************/
/* - oravue.ER_PRS_F ******************************************************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.gross_dcir_s_num&s_min._&s_max._&annee_expo. *************************/
/**************************************************************************************/

/************************************************/
/* 1. PARAMETRES A RENSEIGNER PAR L'UTILISATEUR */
/************************************************/
/* Table contenant la base de requête pour les médicaments (pgm 1_BASE_SUBSTANCE_POUR_GROSSESSE) */
%let table_cip_subs = libordei.BASE_REQUET_CIP_SUBS_GROSS; run;

/* Numéros de substances entre lesquelles requêter dans &table_cip_subs*/ 
/* limiter les requêtes à des pas de 5 à 10 substances max */
%let num_subst_min = 1;
%let num_subst_max = 10;

/* Année recherché */
%let annee_expo = 2015; 

/* -> Il s'agit de l'année pour laquelle on souhaite avoir l'estimation.
Par exemple, si on renseigne 2015, on va avoir pour une substance donnée, le nombre de
femmes ayant eu une délivrance de médicament contenant cette substance sur leur période
de grossesse pendant l'année 2015. Pour rappel, si par ex la femme a accouché en 2016, alors
la fin de la période d'exposition est ici (pour l'année 2015) le 31/12/2015.
*/


/* IMPORT BASE_REQUET_GROSS - correspondance CIP - substance, 94 substances (> 10 cas bnpv) */
data BASE_REQUET_CIP_SUBS_GROSS; set &table_cip_subs ; run;

/* MACRO OUTIL : Destruction des tables dans orauser  */
%MACRO KILL_TAB_ORAUSER (table) ;
%if %sysfunc(exist(ORAUSER.&table)) %then %do;
  PROC DELETE DATA=ORAUSER.&table; RUN;%end;
%mend;


/* MACRO OUTIL : fonction des cles de jointure du DCIR  */
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


option compress=yes;
/* MACRO OUTIL : Recherche et complation des conso par CIP et an_exe */
%MACRO CREA_table(MM, annee, annee_expo);

/* Création de la macro-variable mois */
%let liste = JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC ;
%let mois =  %scan (&liste, &MM) ;	

/* Création des macro-variables date_deb, date_fin et flx_deb */
%if &MM = 10 or &MM = 11 or &MM = 12 %then %do ; %let ZM = &MM ; %end;
%else %do ; %let ZM = 0&MM ; %end;

/* Création de la date de flux à regarder : premier du mois */
%let deb_flx = %sysfunc(mdy(&ZM , 01 ,&annee )) ; 
%let flx_deb = %sysfunc ( intnx (month,&deb_flx,1 ) , ddmmyyn8.);


/* Requête */
proc sql noprint;
%connectora ;
create table consdcir_&nomcip._&mois.&annee. 
as select * from connection to Oracle (
select
distinct a.BEN_NIR_PSA,
a.EXE_SOI_DTD, 
b.PHA_PRS_C13,
c.NIR_ANO_17,
c.AGE_ANN,
c.DATE_DEB_EXPO,
c.DATE_FIN_EXPO,
d.CODECIP13,
d.SUBSTANCE_CODEX_UNIQUE

from ER_PRS_F a, ER_PHA_F b, COHORTE_GROSSESSE_ORDEI_&annee_expo. c, cip_rech_gross_&s_min._&s_max. d

where b.PHA_PRS_C13 = d.PHA_CIP_C13
and   b.FLX_DIS_DTD = to_date(%str(%'&FLX_DEB%'),'ddmmyyyy')
and (%CLE_TEC(a,b))
and a.BEN_NIR_PSA = c.NIR_ANO_17
and   a.EXE_SOI_DTD >= to_date(c.DATE_DEB_EXPO)
and   a.EXE_SOI_DTD <= to_date(c.DATE_FIN_EXPO) 
); 
disconnect from oracle ; 
quit; 


%if &MM = 1 AND &annee=&annee_expo
%then %do; 
data consdcir_&nomcip._&annee_expo.; set consdcir_&nomcip._&mois.&annee.; run; 
%end ;
%else %do; 
data consdcir_&nomcip._&annee_expo.; set consdcir_&nomcip._&annee_expo. consdcir_&nomcip._&mois.&annee.; run ;
proc sort data=consdcir_&nomcip._&annee_expo. nodupkey; by BEN_NIR_PSA ; run;
%end ;

data consdcir_&nomcip._&annee_expo.; set consdcir_&nomcip._&annee_expo.; run;

proc datasets lib=WORK nodetails nolist; DELETE consdcir_&nomcip._&mois.&annee.; run;

%mend;


/* 4. MACRO OUTIL : Itérations sur CREA_TABLE et compilation par substance et annee_expo*/
%MACRO ITERE_FLX (annee_expo) ;

/* Import liste pseudonymes des femmes ayant été enceintes en ANNEE 
data COHORTE_GROSSESSE_ORDEI_&annee_expo.; set libordei.COHORTE_GROSSESSE_ORDEI_&annee_expo.; run;

%KILL_TAB_ORAUSER (COHORTE_GROSSESSE_ORDEI_&annee_expo.);
data orauser.COHORTE_GROSSESSE_ORDEI_&annee_expo. ; set COHORTE_GROSSESSE_ORDEI_&annee_expo.; run;
*/

%let s_min = &num_subst_min ;
%let s_max = &num_subst_max;
%do s = &s_min %to &s_max ; /* pour chaque substance */

/* récupérer la liste des cip de la substance recherchée */
data tab_cip_subs_&s_min._&s_max. ; set BASE_REQUET_CIP_SUBS_GROSS; where SUBST_NUM=&s; run;

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
%KILL_TAB_ORAUSER (cip_rech_gross_&s_min._&s_max.);
data cip_rech_gross_&s_min._&s_max. ; set tab_cip_subs_&s_min._&s_max.; if _N_ in (&i) then output; run;
data orauser.cip_rech_gross_&s_min._&s_max. ; set cip_rech_gross_&s_min._&s_max.; run;

/* stockage nom cip */
proc sql noprint;
select codeCIP13 into: nomcip
from cip_rech_gross_&s_min._&s_max.;
quit;
%put &nomcip;


/* aller chercher les délivrances l'année n traitées par l'AM l'année n */
%do m = 1 %to 12; /* mois sur lesquels requeter */
%do a = &annee_expo %to &annee_expo; /* année sur laquelle requeter */
%CREA_TABLE (&m, &a, &annee_expo);
%end;%end;

/* aller chercher les délivrances l'année n traitées par l'AM l'année n+1 */
%do m2 = 1 %to 6; /* regarder dans les 6 premiers mois de l'année n */
%do a2 = &annee_expo+1 %to &annee_expo+1; /* années sur laquelle requeter */
%CREA_TABLE (&m2, &a2, &annee_expo);
%end;%end;


/* Compilation par substance */
%if &i = 1 
%then %do; 
data consdcir_subs_&nomsubs._&annee_expo. ; set consdcir_&nomcip._&annee_expo.; run;
%end ;
%else %do; 
data consdcir_subs_&nomsubs._&annee_expo. ; set consdcir_subs_&nomsubs._&annee_expo. consdcir_&nomcip._&annee_expo.; run;
%end;

proc sort data=consdcir_subs_&nomsubs._&annee_expo. nodupkey; by BEN_NIR_PSA ; run;
proc datasets lib=WORK nodetails nolist; DELETE consdcir_&nomcip._&annee_expo.; run;


%end; 

/* Néttoyage de la table */
data c_consdcir_subs_&nomsubs._&annee_expo. ; set consdcir_subs_&nomsubs._&annee_expo. ;
where AGE_ANN > 14 AND AGE_ANN <= 50;
attrib AGE_CAT format=$10.;
IF AGE_ANN =. THEN AGE_CAT= "";
ELSE IF AGE_ANN < 18 THEN AGE_CAT = "<18";
ELSE IF AGE_ANN < 25 THEN AGE_CAT = "18-24";
ELSE IF AGE_ANN < 30 THEN AGE_CAT = "25-29";
ELSE IF AGE_ANN < 35 THEN AGE_CAT = "30-34";
ELSE IF AGE_ANN < 40 THEN AGE_CAT = "35-39";
ELSE IF AGE_ANN > 39 THEN AGE_CAT = "40+";
run;


/* Aggrégation */
proc freq data=c_consdcir_subs_&nomsubs._&annee_expo. ; table AGE_CAT / out=aggdcir_subs_&nomsubs._&annee_expo.; run;

data aggdcir_subs_&nomsubs._&annee_expo.; set aggdcir_subs_&nomsubs._&annee_expo.;
ANNEE = &annee_expo;
codeSubstance = "&nomsubs";
SUBST_NUM = "&num_subs";
drop PERCENT;
run;

proc datasets lib=WORK nodetails nolist; DELETE c_consdcir_subs_&nomsubs._&annee_expo. consdcir_subs_&nomsubs._&annee_expo.; run;

/* Compilation des substances */
%if &s = &s_min
%then %do; 
data aggdcir_s_num&s_min._&s_max._&annee_expo. ; set aggdcir_subs_&nomsubs._&annee_expo.; run;
%end ;
%else %do; 
data aggdcir_s_num&s_min._&s_max._&annee_expo. ; set aggdcir_s_num&s_min._&s_max._&annee_expo. aggdcir_subs_&nomsubs._&annee_expo.; run;
%end;


proc datasets lib=WORK nodetails nolist; DELETE aggdcir_subs_&nomsubs._&annee_expo.; run;


%end;

data libordei.gross_dcir_s_num&s_min._&s_max._&annee_expo. ; set aggdcir_s_num&s_min._&s_max._&annee_expo.; run;


%mend;
options obs=max;
%ITERE_FLX (&annee_expo);


