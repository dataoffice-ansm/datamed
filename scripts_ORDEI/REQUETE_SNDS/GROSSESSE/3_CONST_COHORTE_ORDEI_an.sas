/*****************************************************************************************/
/* TITRE : Constitution des cohortes de femmes enceintes pour les extractions ************/
/* VERSION : 0.2 *************************************************************************/
/* AUTEUR : Tim Vlaar ********************************************************************/
/* DATE : 03/05/2022 *********************************************************************/
/* OBJECTIF : A partir des femmes ciblées ayant accouché dans le programme ***************/
/* 2_CIBLAGE_GROSSESSE_TRIM_an, on consitue la cohorte d'extraction. Il y a besoin de ****/
/* prendre en considération l'année N et N+1 car des femmes ayant accouché en N+1 ********/
/* pouvaient être enceintes déjà l'année N. On définit par ailleurs les périodes *********/
/* d'exposition de ces femmes sur l'année considérée (ex : si accouché en N+1, la date de*/
/* fin d'expo est au 31 décembre de l'année N ********************************************/
/* BASES EN ENTREE : *********************************************************************/
/* - libordei.CIBLAGE_GROSSESSE&annee._V2 ************************************************/
/* - libordei.CIBLAGE_GROSSESSE&annee_bis._V2 ********************************************/
/* BASES EN SORTIE : *********************************************************************/
/* - libordei.COHORTE_GROSSESSE_ORDEI_&annee *********************************************/
/*****************************************************************************************/

%let annee=2018; /* à renseigner par l'utilisateur */
%let annee_bis = &annee + 1;


/* TABLE DE CIBLAGE FEMMES ORDEI 2018 */

/* On récupère les femmes ayant accouché en 2018 */
data CIBLAGE_GROSSESSE&annee._&annee._ORDEI ; set 
libordei.CIBLAGE_GROSSESSE&annee._V2 ;
ANNEE_CIBLAGE = &annee;
keep NIR_ANO_17 DATE_DEB_GROS DATE_FIN_GROS ANNEE_CIBLAGE AGE_ANN;
run;

/* On implémente la date de début d'exposition */
data CIBLAGE_GROSSESSE&annee._&annee._ORDEI; set CIBLAGE_GROSSESSE&annee._&annee._ORDEI;
format DATE_FIN_EXPO DATE_DEB_EXPO datetime.;
DATE_FIN_EXPO = DATE_FIN_GROS;
IF year(datepart(DATE_DEB_GROS))<&annee THEN DATE_DEB_EXPO = DHMS(MDY(1,1,&annee),HMS(0,0,0));
ELSE DATE_DEB_EXPO = DATE_DEB_GROS; run;


/* On récupère les femmes ayant accouché en 2019 */
data CIBLAGE_GROSSESSE&annee_bis._ORDEI ; set 
libordei.CIBLAGE_GROSSESSE&annee_bis._V2 ;
ANNEE_CIBLAGE = &annee_bis;
keep NIR_ANO_17 DATE_DEB_GROS DATE_FIN_GROS ANNEE_CIBLAGE AGE_ANN;
run;

/* 732 042 */


/* On garde uniquement les femmes dont la date de début de grossesse est en 2018 */
data CIBLAGE_GROSSESSE&annee._&annee_bis._ORDEI ; set CIBLAGE_GROSSESSE&annee_bis._ORDEI;
where year(datepart(DATE_DEB_GROS))<&annee_bis; run;

/* 544 660 */

/* On implémente la date de début d'exposition */
data CIBLAGE_GROSSESSE&annee._&annee_bis._ORDEI; set CIBLAGE_GROSSESSE&annee._&annee_bis._ORDEI;
format DATE_FIN_EXPO DATE_DEB_EXPO datetime.;
DATE_DEB_EXPO = DATE_DEB_GROS;
DATE_FIN_EXPO = DHMS(MDY(12,31,&annee),HMS(0,0,0)); 
run;


/* Compilation des tables */
data CIBLAGE_GROSSESSE_ORDEI_&annee ; 
set CIBLAGE_GROSSESSE&annee._&annee._ORDEI CIBLAGE_GROSSESSE&annee._&annee_bis._ORDEI;
run;

/* 1 282 868 */


/* voir s'il y a des doublons */
proc sort data=CIBLAGE_GROSSESSE_ORDEI_&annee nodupkey out=sans_dbls dupout=dbls; by NIR_ANO_17; run;
/* 19 142 -> possible enchaînement de grossesses */

proc sql;
create table compar as select
a.NIR_ANO_17,
a.DATE_DEB_GROS as DATE_DEB_GROS1,
a.DATE_FIN_GROS as DATE_FIN_GROS1,
b.DATE_DEB_GROS as DATE_DEB_GROS2,
b.DATE_FIN_GROS as DATE_FIN_GROS2
from CIBLAGE_GROSSESSE&annee._&annee._ORDEI a
inner join CIBLAGE_GROSSESSE&annee._&annee_bis._ORDEI b
on a.NIR_ANO_17 = b.NIR_ANO_17;
quit;
run;

/* 19 142 = ok */

data pb ; set compar; where DATE_FIN_GROS1>DATE_DEB_GROS2; run;
/* 1632 avec pb : grossesse 1 se termine avant début grossesse 2*/

/* calcul écart en mois entre date début 1 et date fin 2 */
data pb; set pb; ECART = (DATE_FIN_GROS2 - DATE_DEB_GROS1)/2592000; run;

/* si écart < 10 mois on considère date début 1 et date fin 2,
si >10 mois on considère uniquement date début1 et date fin 2 */
data ok pas_ok;
set pb; if ECART<10 then output ok;
else output pas_ok;
run;
/* 1196 pas_ok
436 ok */
   

/* 1 632 faible par rapport à 1 282 868 -> pas la peine de re-traiter */

data libordei.COHORTE_GROSSESSE_ORDEI_&annee; set CIBLAGE_GROSSESSE_ORDEI_&annee; run;

