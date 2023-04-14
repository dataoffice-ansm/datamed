# TITRE : CROISEMENT OPEN MEDIC AVEC CODEX ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V4
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 06/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : Open Medic (nbre de conso par �ge/sexe/ann�e) cod� par code CIP13 -> vers CIS
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : Passer Open Medic au niveau cis. Attention : on r�alise la somme des consommants 
# au niveau CIP pour un m�me cis. Par cons�quent, un consommant sera comptabilis� autant
# de fois par cis que le nombre de CIP diff�rents correspondants qui lui ont �t� d�livr�s.
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - NB_2014_cip13_age_sexe.csv
# - NB_2015_cip13_age_sexe.csv
# - NB_2016_cip13_age_sexe.csv
# - NB_2017_cip13_age_sexe.csv
# - NB_2018_cip13_age_sexe.csv
# - corresp_cip13_spe_prod_subs.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - open_medic2014_2021_cis_agg.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc�s aux donn�es Open medic
chemin_acces_open_med <- ""

# Chemin d'acc�s aux autres donn�es
chemin_acces <- ""

# Chemin vers le dossier de sauvegarde souhait�
chemin_save_sortie <- ""



# 1. LIBRAIRIES ET FONCTIONS ----
library("dplyr")


# 2. IMPORT ET MISE EN FORME DES DONNEES ----
# 2.1 Import des donn�es
# Import Open Medic de 2014 � 2018
# for (i in 2014:2018){
for (i in 2014:2021){
  nom_table <- paste0("open_medic",i)
  nom_table_import <- paste0("NB_", i, "_cip13_age_sexe.csv")
  table_importe <- read.csv2(paste0(chemin_acces_open_med,nom_table_import), colClasses = c("CIP13"="character"))
  table_importe$annee <- i
  assign(nom_table, table_importe)
}
# /!\ Il n'y a que 4 classes d'�ge : 0, 20, 60, 99

# Import corresp 
corresp_cip13_spe_prod_subs <- read.csv2(paste0(chemin_acces,"corresp_cip13_spe_prod_subs.csv"),colClasses = c("codeCIP13"="character", "codeSubstance"="character"))
corresp_cip13_spe_prod_subs<-corresp_cip13_spe_prod_subs[,-c(1)]

# 2.2 Compilation des donn�es Open Medic
names(open_medic2018)<-c( "CIP13","l_cip13","AGE","sexe","nbc","REM","BSE","BOITES","annee")
names(open_medic2019)<-c( "CIP13","l_cip13","AGE","sexe","nbc","REM","BSE","BOITES","annee")
names(open_medic2020)<-c( "CIP13","l_cip13","AGE","sexe","nbc","REM","BSE","BOITES","annee")
names(open_medic2021)<-c( "CIP13","l_cip13","AGE","sexe","nbc","REM","BSE","BOITES","annee")
open_medic2014_2021 <- rbind(open_medic2014[,-c(5:7)], open_medic2015[,-c(5:7)],
                             open_medic2016[,-c(2,6:8)], open_medic2017[,-c(2,6:8)],
                             open_medic2018[,-c(2,6:8)], open_medic2019[,-c(2,6:8)],
                             open_medic2020[,-c(2,6:8)], open_medic2021[,-c(2,6:8)])

nrow(open_medic2014_2021) #328754
nrow(open_medic2014)+nrow(open_medic2015)+nrow(open_medic2016)+nrow(open_medic2017)+nrow(open_medic2018)+nrow(open_medic2019)+nrow(open_medic2020)+nrow(open_medic2021)
# 328754 : OK
sum(open_medic2014_2021$nbc) # 3336724097

# Suppression �ge inconnu
# open_medic2014_2021b <- open_medic2014_2021[open_medic2014_2021$AGE!=99,]
# nrow(open_medic2014_2021b) #281689
# sum(open_medic2014_2021b$nbc) # 3329987613

# Suppression sexe inconnu
# open_medic2014_2021b <- open_medic2014_2021b[open_medic2014_2021b$sexe!=9,]
# nrow(open_medic2014_2021b) #276069
# sum(open_medic2014_2021b$nbc) # 3329915625

open_medic2014_2021$CIP13<-as.character(open_medic2014_2021$CIP13)


# 2.3 Base correspondance CIP13-SUBSTANCE_CODEX_UNIQUE
corresp_cip13_subs <- corresp_cip13_spe_prod_subs %>%
  select(codeCIP13, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  group_by(codeCIP13, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  distinct()

corresp_cip13_subs$codeCIP13<-as.character(corresp_cip13_subs$codeCIP13)

# 2.4 Base correspondance CIP13-CIS
corresp_cip13_cis <- corresp_cip13_spe_prod_subs %>%
  select(codeCIP13, codeCIS, "SPECIALITE_CODEX"=nomVU) %>%
  group_by(codeCIP13, codeCIS, SPECIALITE_CODEX) %>% distinct()

nrow(corresp_cip13_cis) # 91487
length(unique(corresp_cip13_cis$codeCIP13)) # 91320

nrow(corresp_cip13_cis[duplicated(corresp_cip13_cis$codeCIP13),])
# 167 codes CIP associ�s � au moins 2 codes CIS diff�rents -> tant pis
# Arr�t de commercialisation et remis sur le march�


# 3. AFFECTATION CODE CIS A OPEN MEDIC ----
open_medic2014_2021_cis <- left_join(open_medic2014_2021, corresp_cip13_cis, by=c("CIP13"="codeCIP13"))

length(unique(open_medic2014_2021_cis$CIP13[is.na(open_medic2014_2021_cis$codeCIS)])) # 70 codes cip non retrouv�s
nrow(open_medic2014_2021_cis[is.na(open_medic2014_2021_cis$codeCIS),]) # correspondant � 467 obs
sum(open_medic2014_2021_cis$nbc[is.na(open_medic2014_2021_cis$codeCIS)]) # 524462 nbc

# suppression des lignes o� cis non retrouv�
open_medic2014_2021_cis2 <- open_medic2014_2021_cis[!is.na(open_medic2014_2021_cis$codeCIS),]
nrow(open_medic2014_2021_cis2) # 276334
sum(open_medic2014_2021_cis2$nbc) # 3337259072

# Aggr�ger par cis (sans ann�e)
open_medic2014_2021_cis_agg <- open_medic2014_2021_cis2 %>%
  group_by(codeCIS, sexe, AGE) %>%
  summarise(n_conso_14_21=sum(nbc))

# calcul nbc par an
open_medic2014_2021_cis_agg$n_conso_an <- round(open_medic2014_2021_cis_agg$n_conso_14_21/8)

open_medic2014_2021_cis_agg$AGE <- factor(open_medic2014_2021_cis_agg$AGE, levels=c("0", "20", "60", "99"),
                                   labels=c("0-19 ans", "20-59 ans", "60 ans et plus", "Age inconnu"))

# open_medic2014_2021_cis_agg$SEXE <- factor(open_medic2014_2021_cis_agg$sexe, levels=c("1","2"),
#                                             labels=c("Hommes", "Femmes"))

# Export
write.csv2(open_medic2014_2021_cis_agg, paste0(chemin_save_sortie,"open_medic2014_2021_cis_agg.csv"), quote = TRUE)

# aggr�gation par CIS
open_medic2014_2021_cis_agg_glob <- open_medic2014_2021_cis_agg %>%
  group_by(codeCIS) %>%
  summarise(n_conso_an=sum(n_conso_14_21)/8)

quantile(round(open_medic2014_2021_cis_agg_glob$n_conso_an), probs = seq(0,1,0.1))
