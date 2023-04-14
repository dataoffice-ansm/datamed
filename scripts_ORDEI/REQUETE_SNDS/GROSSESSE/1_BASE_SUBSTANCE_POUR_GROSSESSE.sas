/**************************************************************************************/
/* TITRE : Création de la base de requête contenant les susbtances et les codes CIP ***/
/* pour les requêtes sur la grossesse (limité à 94 substances) ************************/
/* VERSION : 0.2 **********************************************************************/
/* AUTEUR : Tim Vlaar *****************************************************************/
/* DATE : 03/05/2022 ******************************************************************/
/* OBJECTIF : Création de la base de requête contenant la correspondance entre les ****/
/* susbtances et les codes CIP sur lequel la requête SNDS grossesse va se faire. ******/
/* Cette tables est un sous-ensemble de la table libordei.BASE_REQUET_CIP_SUBS ********/
/* restreinte aux substances pour lesquelles plus de 10 cas de grossesse sont observés*/
/* dans les données BNPV utilisées ****************************************************/
/* BASES EN ENTREE : ******************************************************************/
/* - libordei.BASE_REQUET_CIP_SUBS ****************************************************/
/* - Liste des substances à retenir ***************************************************/
/* BASES EN SORTIE : ******************************************************************/
/* - libordei.BASE_REQUET_CIP_SUBS_GROSS **********************************************/
/**************************************************************************************/

/* 94 substances pour lesquelles on a plus de 10 cas grossesse sur 2014-2018 */
/* provient du programme R analyse_cas_grossesse.R */

data liste_subs_grossesse;
input codeSubstance $;
cards;
00093
00196
00382
00420
00445
00461
00463
00489
00511
00726
00788
00842
00872
00907
00946
01040
01200
01261
01351
01358
01493
01525
01556
01637
01663
01807
02064
02077
02087
02092
02171
02197
02202
02229
02258
02345
02355
02533
02640
02825
02826
03107
03559
03969
03970
04403
04509
04773
05334
05562
05760
06088
07238
07560
08351
08846
10655
12999
13112
13709
16849
17723
17878
18265
20256
20890
21888
25252
25975
27380
28165
36376
37011
38607
39005
41060
44598
47784
52476
53415
60459
61112
70863
73622
74765
77742
78924
80114
80476
89901
95609
96835
97603
98322
; run;

/* Import de la base requete CIP-SUBS complète */
data BASE_REQUET_CIP_SUBS; set libordei.BASE_REQUET_CIP_SUBS;
drop SUBST_NUM CIP_NUM; run;

/* Sélection des 94 substances */
proc sql;
create table BASE_REQUET_CIP_SUBS_GROSS as select * from BASE_REQUET_CIP_SUBS
where codeSubstance in (select codeSubstance from liste_subs_grossesse); run;

/* Création compteur codes CIP par substance */
data BASE_REQUET_CIP_SUBS_GROSS;
  set BASE_REQUET_CIP_SUBS_GROSS;
  CIP_NUM + 1;
  by SUBSTANCE_CODEX_UNIQUE;
  if first.SUBSTANCE_CODEX_UNIQUE then CIP_NUM = 1;
run;

/* Création compteur par substance */
data BASE_REQUET_CIP_SUBS_GROSS; set BASE_REQUET_CIP_SUBS_GROSS;
by SUBSTANCE_CODEX_UNIQUE;
retain SUBST_NUM 0;
if first.SUBSTANCE_CODEX_UNIQUE then SUBST_NUM=SUBST_NUM+1;
run;

/* Sauvegarde */
data libordei.BASE_REQUET_CIP_SUBS_GROSS; set BASE_REQUET_CIP_SUBS_GROSS ; run;