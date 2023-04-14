/**************************************************************************************/
/* TITRE : Compilation des données SNDS extraites et préparation pour export **********/
/* VERSION : 0.2 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 05/05/2022 ******************************************************************/
/* OBJECTIF : Regrouper l'ensemble des extractions par année et préparation de ********/
/* de l'export en remplaçant les strates < 11 par NA **********************************/
/* BASES EN ENTREE : ******************************************************************/
/* - Ensemble des tables libordei.aggdcir_s_num&num_subst_min._&num_subst_max._&Annee.*/
/* pour l'année en question ***********************************************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.AGG_DCIR_SUBST_&Annee ***************************************************/
/* - AGG_DCIR_SUBST_&Annee._exp (à exporter du portail) *******************************/
/**************************************************************************************/


%let Annee=2018; /* année à renseigner par l'utilisateur */

/* Get table names in Libordei */
proc sql ;
create table table_names as
select libname, memname from sashelp.vtable
where libname in ('LIBORDEI');
quit;

/* keep the tables AGGDCIR_S from Annee*/
data table_names ; set table_names; 
WHERE substr(memname,length(memname)-3,4)="&Annee"
AND substr(memname,1,9)="AGGDCIR_S";
run;

data table_names; set table_names;
memname2 = cat("libordei.",memname); run;


/* Export to excel */

/* compilation données */
data AGG_DCIR_SUBST_&Annee; 
set 

/* XXXXXX*/
/* Complete with table list from excel export */

; run;

/* Check - frequencies should be =< 6 */
proc freq data=AGG_DCIR_SUBST_&Annee ; table codeSubstance; run;

/* Save table */
data libordei.AGG_DCIR_SUBST_&Annee; set AGG_DCIR_SUBST_&Annee; run;


/* Replace counts < 11 by NA for export */
data AGG_DCIR_SUBST_&Annee._exp; set AGG_DCIR_SUBST_&Annee;
IF COUNT<11 THEN COUNT=.; run;

/* -> Export to excel and save in CSV */


