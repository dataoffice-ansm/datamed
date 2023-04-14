/**************************************************************************************/
/* TITRE : Ciblage des femmes ayant accouché dans le SNDS pour une année donnée *******/
/* VERSION : 0.3 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 03/05/2022 ******************************************************************/
/* OBJECTIF : A partir de codes CIM10 prédifinies, repérer les femmes enceintes (ayant*/
/* accouchées une année donnée) dans le PMSI MCO. On retenient ensuite les pseudonymes*/ 
/* de ces femmes et on essaye d'estimer les périodes des différents trimestres à partir  */
/*de l'âge gestationnel et l'éventuelle date d'accouchement (diagnostic hopsitalier)****/
/* BASES EN ENTREE : ******************************************************************/
/* - Liste codes CIM10 ****************************************************************/
/* - oravue.T_MCOxxB ******************************************************************/
/* - oravue.T_MCOxxC ******************************************************************/
/* - oravue.T_MCOxxD ******************************************************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.ciblage_grossesse20&an._V2 **********************************************/
/**************************************************************************************/



%let &an=18; /* année à renseigner par l'utilisateur (sur 2 digits) */



/* Codes CIM10 ciblés */

Z37	Résultat de l’accouchement
Z39.0 Soins et examens immédiatement après l'accouchement
O80	Accouchement unique et spontané
O81	Accouchement unique par forceps et ventouse
O82	Accouchement unique par césarienne
O83	Autres accouchements uniques avec assistance
O84	Accouchements multiples
003	Fausse couche
060	Enfant prématuré  
Z371 Naissance unique, enfant mort-né
Z32 Examen et test de grossesse
Z321 Grossesse confirmée [Examen diagnostic de grossesse confirmée) grossesse confirmée] 
O48 Grossesse prolongée [Grossesse prolongée]
Z33 Grossesse constatée fortuitement [Etat grossesse normale]
O009 Grossesse extra-utérine, sans précision
O309 Grossesse multiple, sans précision 
Z33 Grossesse constatée fortuitement 
Z320 Grossesse non confirmée 
O302 Grossesse multiple : quadruplés 
O301 Grossesse multiple : triplés 
O0453 Interruption médicale de grossesse [IMG] [ITG] pour association de causes foetale et maternelle, complet ou sans précision, compliqué d'une infection de l'appareil génital et des organes pelviens
O312 Poursuite de la grossesse après mort intra-utérine d'un ou plusieurs foetus
O0422 Interruption médicale de grossesse [IMG] [ITG] pour cause maternelle, incomplet, compliqué d'une embolie
O311 Poursuite de la grossesse après avortement d'un ou plusieurs foetus
Z34	Surveillance d'une grossesse normale, sans précision
O209 Hémorragie du début de la grossesse, sans précision
P95+1 Mort foetale in utero en dehors d'une interruption médicale de grossesse
*/

%MACRO KILL_TAB_ORAUSER (table) ;
%if %sysfunc(exist(ORAUSER.&table)) %then %do;
  PROC DELETE DATA=ORAUSER.&table; RUN;%end;
%mend;


data CIM10;
input CIM10 $;
cards;
Z37
Z390
O80
O81
O82
O83
O84
003
060
Z371
Z32
Z321
O48
Z33
O009
O309
Z33
Z320
O302
O301
O0453
O312
O0422
O311
Z34
O209
P95+1
;
run;

data CIM10; set CIM10; longueur = length(CIM10); run;

%KILL_TAB_ORAUSER (CIM10);
data orauser.CIM10; set CIM10; run;


/* MACRO : Récupération des séjours identifiés par le CIM10 */
%macro CIM10_MCO(annee);
/* Requête pour DGN_PAL */
proc sql;
	%connectora;
	create table cim10_pal_mco_&annee as select * from connection to oracle(
	select 
	a.NIR_ANO_17 as NIR_ANO_17_PAL,
	a.EXE_SOI_DTF as EXE_SOI_DTF_PAL,
	a.EXE_SOI_DTD as EXE_SOI_DTD_PAL,
	a.ETA_NUM,
	a.RSA_NUM,
	b.AGE_ANN as AGE_ANN_PAL,
	b.AGE_GES as AGE_GES_PAL,
	b.COD_SEX as COD_SEX_PAL,
	b.DGN_PAL
		from T_MCO&annee.C a, T_MCO&annee.B b, CIM10 c

		where trim(c.CIM10) = substr(trim(b.DGN_PAL),1,c.longueur)
		and a.ETA_NUM = b.ETA_NUM
		and a.RSA_NUM = b.RSA_NUM
		  
	);
	disconnect from oracle ;
	quit ;

/* Requête pour DGN_REL */
proc sql;
	%connectora;
	create table cim10_rel_mco_&annee as select * from connection to oracle(
	select 
	a.NIR_ANO_17 as NIR_ANO_17_REL,
	a.EXE_SOI_DTF as EXE_SOI_DTF_REL,
	a.EXE_SOI_DTD as EXE_SOI_DTD_REL,
	a.ETA_NUM,
	a.RSA_NUM,
	b.AGE_ANN as AGE_ANN_REL,
	b.AGE_GES as AGE_GES_REL,
	b.COD_SEX as COD_SEX_REL,
	b.DGN_REL
		from T_MCO&annee.C a, T_MCO&annee.B b, CIM10 c

		where trim(c.CIM10) = substr(trim(b.DGN_REL),1,c.longueur)
		and a.ETA_NUM = b.ETA_NUM
		and a.RSA_NUM = b.RSA_NUM
		  
	);
	disconnect from oracle ;
	quit ;

/* Requête pour ASS_DGN */
proc sql;
	%connectora;
	create table cim10_ass_mco_&annee as select * from connection to oracle(
	select 
	a.NIR_ANO_17 as NIR_ANO_17_ASS,
	a.EXE_SOI_DTF as EXE_SOI_DTF_ASS,
	a.EXE_SOI_DTD as EXE_SOI_DTD_ASS,
	a.ETA_NUM,
	a.RSA_NUM,
	b.AGE_ANN as AGE_ANN_ASS,
	b.AGE_GES as AGE_GES_ASS,
	b.COD_SEX as COD_SEX_ASS,
	d.ASS_DGN
		from T_MCO&annee.C a, T_MCO&annee.B b, CIM10 c, T_MCO&annee.D d

		where trim(c.CIM10) = substr(trim(d.ASS_DGN),1,c.longueur)
		and a.ETA_NUM = b.ETA_NUM
		and a.RSA_NUM = b.RSA_NUM
		and d.ETA_NUM = b.ETA_NUM
		and d.RSA_NUM = b.RSA_NUM
		  
	);
	disconnect from oracle ;
	quit ;

%mend CIM10_MCO;

%CIM10_MCO(&an);

%macro nb_lignes(table);
proc sql;
	select 
	count(*) as nb_lignes
	from &table;
quit;
%mend nb_lignes;
%nb_lignes(cim10_pal_mco_&an);
%nb_lignes(cim10_rel_mco_&an);
%nb_lignes(cim10_ass_mco_&an);


/* CONSTITUTION TABLE DES PSEUDONYMES */
/* Suppression des des double séjours (retenir date du dernier séjour) */
proc sql;
create table cim10_pal_mco_&an._db as
select *
from cim10_pal_mco_&an
group by NIR_ANO_17_PAL
having EXE_SOI_DTF_PAL = max(EXE_SOI_DTF_PAL);
quit;
%nb_lignes(cim10_pal_mco_&an);
%nb_lignes(cim10_pal_mco_&an._db);

proc sql;
create table cim10_rel_mco_&an_db as
select *
from cim10_rel_mco_&an
group by NIR_ANO_17_REL
having EXE_SOI_DTF_REL = max(EXE_SOI_DTF_REL);
quit;
%nb_lignes(cim10_rel_mco_&an);
%nb_lignes(cim10_rel_mco_&an._db);

proc sql;
create table cim10_ass_mco_&an._db as
select *
from cim10_ass_mco_&an
group by NIR_ANO_17_ASS
having EXE_SOI_DTF_ASS = max(EXE_SOI_DTF_ASS);
quit;
%nb_lignes(cim10_ass_mco_&an);
%nb_lignes(cim10_ass_mco_&an._db);


/* retenir une ligne par pseudonyme / séjour unique*/
proc sort data=cim10_pal_mco_&an._db nodupkey; by NIR_ANO_17_PAL ; run;
proc sort data=cim10_rel_mco_&an._db nodupkey; by NIR_ANO_17_REL ; run;
proc sort data=cim10_ass_mco_&an._db nodupkey; by NIR_ANO_17_ASS ; run;

proc sort data=cim10_pal_mco_&an._db nodupkey; by ETA_NUM RSA_NUM ; run;
proc sort data=cim10_rel_mco_&an._db nodupkey; by ETA_NUM RSA_NUM ; run;
proc sort data=cim10_ass_mco_&an._db nodupkey; by ETA_NUM RSA_NUM ; run;

/* jointures */
proc sql;
create table cim10_pal_rel_mco_&an._db as select a.*, b.*
from cim10_pal_mco_&an._db a full join cim10_rel_mco_&an._db b
on a.ETA_NUM = b.ETA_NUM
and a.RSA_NUM = b.RSA_NUM;
quit; run;

proc sql;
create table cim10_pal_rel_ass_mco_&an._db as select a.*, b.*
from cim10_pal_rel_mco_&an._db a full join cim10_ass_mco_&an._db b
on a.ETA_NUM = b.ETA_NUM
and a.RSA_NUM = b.RSA_NUM;
quit; run;

%nb_lignes(cim10_pal_rel_ass_mco_&an._db);



data cim10_pal_rel_ass_mco_&an._db ; set cim10_pal_rel_ass_mco_&an._db ;
IF NIR_ANO_17_PAL NE "" THEN NIR_ANO_17 = NIR_ANO_17_PAL ;
ELSE IF NIR_ANO_17_REL NE "" THEN  NIR_ANO_17 = NIR_ANO_17_REL ;
ELSE NIR_ANO_17 = NIR_ANO_17_ASS; 

IF EXE_SOI_DTF_PAL NE . THEN EXE_SOI_DTF = EXE_SOI_DTF_PAL ;
ELSE IF EXE_SOI_DTF_REL NE . THEN  EXE_SOI_DTF = EXE_SOI_DTF_REL ;
ELSE EXE_SOI_DTF = EXE_SOI_DTF_ASS;
format EXE_SOI_DTF datetime20.;

IF EXE_SOI_DTD_PAL NE . THEN EXE_SOI_DTD = EXE_SOI_DTD_PAL ;
ELSE IF EXE_SOI_DTD_REL NE . THEN  EXE_SOI_DTD = EXE_SOI_DTD_REL ;
ELSE EXE_SOI_DTD = EXE_SOI_DTD_ASS;
format EXE_SOI_DTD datetime20.;

IF AGE_ANN_PAL NE . THEN AGE_ANN = AGE_ANN_PAL ;
ELSE IF AGE_ANN_REL NE . THEN  AGE_ANN = AGE_ANN_REL ;
ELSE AGE_ANN = AGE_ANN_ASS; 

IF COD_SEX_PAL NE . THEN COD_SEX = COD_SEX_PAL ;
ELSE IF COD_SEX_REL NE . THEN  COD_SEX = COD_SEX_REL ;
ELSE COD_SEX = COD_SEX_ASS; 

IF AGE_GES_PAL NE . THEN AGE_GES = AGE_GES_PAL ;
ELSE IF AGE_GES_REL NE . THEN  AGE_GES = AGE_GES_REL ;
ELSE AGE_GES = AGE_GES_ASS; 
run;


%nb_lignes(cim10_pal_rel_ass_mco_&an._db);
proc sort data=cim10_pal_rel_ass_mco_&an._db nodupkey; by NIR_ANO_17; run;
%nb_lignes(cim10_pal_rel_ass_mco_&an._db);


proc sql;
create table cim10_final_&an as select
NIR_ANO_17, EXE_SOI_DTF, EXE_SOI_DTD, AGE_ANN, AGE_GES, COD_SEX, DGN_PAL, DGN_REL, ASS_DGN
from cim10_pal_rel_ass_mco_&an._db; quit; run;
%nb_lignes(cim10_final_&an);

/* Nettoyage */
data cim10_final_&an; set cim10_final_&an;
WHERE COD_SEX = "2" AND AGE_ANN>14 AND AGE_ANN<50 AND AGE_GES NE .; run;
%nb_lignes(cim10_final_&an);

/* Trimestres de grossesse */
data CIBLAGE_GROSSESSE20&an; set cim10_final_&an; 
format DATE_DEB_GROS DATE_FIN_GROS DATE_DEB_T0 DATE_FIN_T0 DATE_DEB_T1 
DATE_FIN_T1 DATE_DEB_T2 DATE_FIN_T2 DATE_DEB_T3 DATE_FIN_T3 datetime.;
DATE_DEB_GROS = EXE_SOI_DTF - (AGE_GES*7*24*60*60); 
DATE_FIN_GROS = EXE_SOI_DTF;
DATE_DEB_T0 = DATE_DEB_GROS - (13*7*24*60*60);
DATE_FIN_T0 = DATE_DEB_GROS + (2*7*24*60*60);
DATE_DEB_T1 = DATE_FIN_T0 + (24*60*60);
DATE_FIN_T1 = DATE_DEB_GROS + (15*7*24*60*60);
DATE_DEB_T2 = DATE_FIN_T1 + (24*60*60);
DATE_FIN_T2 = DATE_DEB_GROS + (28*7*24*60*60);
DATE_DEB_T3 = DATE_FIN_T2 + (24*60*60);
DATE_FIN_T3 = DATE_FIN_GROS;
run;

/* Traiter les dates pour les grossesses non menées à terme */
data CIBLAGE_GROSSESSE20&an._db ; set CIBLAGE_GROSSESSE20&an;
IF DATE_FIN_T3 < DATE_DEB_T3 THEN DATE_FIN_T3=.;
IF DATE_FIN_GROS < DATE_FIN_T0 THEN DATE_FIN_T0=.;
IF DATE_FIN_GROS < DATE_DEB_T1 THEN DATE_DEB_T1=.;
IF DATE_FIN_GROS < DATE_FIN_T1 THEN DATE_FIN_T1=.;
IF DATE_FIN_GROS < DATE_DEB_T2 THEN DATE_DEB_T2=.;
IF DATE_FIN_GROS < DATE_FIN_T2 THEN DATE_FIN_T2=.;
IF DATE_FIN_GROS < DATE_DEB_T3 THEN DATE_DEB_T3=.;
run;

data CIBLAGE_GROSSESSE20&an._db2 ; set CIBLAGE_GROSSESSE20&an._db;
IF DATE_FIN_T3 =. AND DATE_DEB_T3 NE . THEN DATE_FIN_T3=DATE_FIN_GROS;
IF DATE_FIN_T2 =. AND DATE_DEB_T2 NE . THEN DATE_FIN_T2=DATE_FIN_GROS;
IF DATE_FIN_T1 =. AND DATE_DEB_T1 NE . THEN DATE_FIN_T1=DATE_FIN_GROS;
IF DATE_FIN_T0 =. AND DATE_DEB_T0 NE . THEN DATE_FIN_T0=DATE_FIN_GROS;
run;

/* Sauvegarde */
data libordei.ciblage_grossesse20&an._V2; set CIBLAGE_GROSSESSE20&an._db2; run;





