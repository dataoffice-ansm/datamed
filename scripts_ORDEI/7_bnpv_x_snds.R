# TITRE : Croisement base de travail SNDS x base de travail BNPV ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V1
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 09/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : Croisement de SNDS et bnpv pour substances actives. Cr�ation de tables en entr�e
# de la dataviz permettant de calculer les indicateurs
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : Croisement SNDS et BNPV (en codage Substance Codex)
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - snds2014_2018_sa_agg
# - spe_prod_sa_bnpv_sa_codex_agg
# - corresp_spe_prod_subs
# - effets
# - spe_prod_sa_bnpv_sa_codex
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - bnpv_open_medic1418_sa_codex.csv
# - bnpv_eff_soclong_sa_codex_open.csv
# - bnpv_eff_hlt_soclong_sa_codex_open.csv
# - bnpv_notif_sa_codex_open.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin origine bnpv
chemin_acces <- ""

# Chemin d'acc�s aux autres donn�es et dossier de sauvagarde
chemin_acces_input <- ""
chemin_acces_output <- ""


# 1. LIBRAIRIES ET FONCTIONS ----
library("dplyr")
library("readxl")


# 2. IMPORT DES DONNEES ET CROISEMENT ----
# 2.1 Import
snds2014_2018_sa_agg <- read.csv2(paste0(chemin_acces_input,"openmedic2014_2021_subs_agg.csv"), fileEncoding="latin1", colClasses = c("codeSubstance"="character"))
spe_prod_sa_bnpv_sa_codex_agg<-read.csv2(paste0(chemin_acces_input,"spe_prod_sa_bnpv_sa_codex_agg.csv"), colClasses = c("codeSubstance"="character"))

corresp_spe_prod_subs <- read.csv2(paste0(chemin_acces_input,"corresp_spe_prod_subs.csv"), colClasses = c("codeSubstance"="character"))
effets <- read.csv2(paste0(chemin_acces,"20221110 - Effets.csv"))
spe_prod_sa_bnpv_sa_codex <- read.csv2(paste0(chemin_acces_input,"spe_prod_sa_bnpv_sa_codex2.csv"), colClasses = c("codeSubstance"="character"))

sum(spe_prod_sa_bnpv_sa_codex_agg$n_cas) # 1297076

# Data management g�n�ral (renommer, s�lection variables)
spe_prod_sa_bnpv_sa_codex_agg <- spe_prod_sa_bnpv_sa_codex_agg[,-c(1)]
names(spe_prod_sa_bnpv_sa_codex_agg)[3]<-"ANNEE"
snds2014_2018_sa_agg<-snds2014_2018_sa_agg[,-c(1)]
names(snds2014_2018_sa_agg)[3] <- c("ANNEE")
names(snds2014_2018_sa_agg)[4] <- c("SEXE")

# Suppression des "0" en début du codeSubstance
corresp_spe_prod_subs$codeSubstance <- sub("^0+", "", corresp_spe_prod_subs$codeSubstance)
spe_prod_sa_bnpv_sa_codex$codeSubstance <- sub("^0+", "", spe_prod_sa_bnpv_sa_codex$codeSubstance)
spe_prod_sa_bnpv_sa_codex_agg$codeSubstance <- sub("^0+", "", spe_prod_sa_bnpv_sa_codex_agg$codeSubstance)


# cr�ation corresp prod_subs
corresp_prod_subs <- corresp_spe_prod_subs %>%
  group_by(PRODUIT_CODEX, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  summarise(n_prod_subs=n()) %>%
  select(-n_prod_subs)

# 3. DATA-MANAGEMENT TABLES SUBSTANCES ----

# 3.1 Restriction aux SA de Open Medic au sein de la BNPV sur m�me p�riode
bnpv_sa_ret <- spe_prod_sa_bnpv_sa_codex_agg[spe_prod_sa_bnpv_sa_codex_agg$SUBSTANCE_CODEX_UNIQUE %in% unique(snds2014_2018_sa_agg$SUBSTANCE_CODEX_UNIQUE),]

# verif
nrow(spe_prod_sa_bnpv_sa_codex_agg) # 188578
nrow(bnpv_sa_ret) # 151460
length(unique(snds2014_2018_sa_agg$SUBSTANCE_CODEX_UNIQUE)) # 1800 
length(unique(snds2014_2018_sa_agg$SUBSTANCE_CODEX_UNIQUE)) # 1800
length(unique(bnpv_sa_ret$SUBSTANCE_CODEX_UNIQUE)) # 1718 

sum(bnpv_sa_ret$n_cas) # 1123193
sum(spe_prod_sa_bnpv_sa_codex_agg$n_cas) # 1297076

# cas entre 2014-2018
bnpv_sa_ret1418 <- bnpv_sa_ret %>% filter(ANNEE>2013 & ANNEE<2022) 

# 3.2 Recodage de l'�ge/sexe dans bnpv_prod_ret1418 (aucun �ge manquant dans le deux bases)
bnpv_sa_ret1418$AGE <- 60
bnpv_sa_ret1418$AGE[bnpv_sa_ret1418$AGE_CAT %in% c(0,10)]<-0
bnpv_sa_ret1418$AGE[bnpv_sa_ret1418$AGE_CAT %in% c(20,30,40,50)]<-20

# recodage sexe
bnpv_sa_ret1418$SEXE <- factor(bnpv_sa_ret1418$SEXE, levels=c("M","F"), labels=c("Hommes","Femmes"))
snds2014_2018_sa_agg$SEXE <- factor(snds2014_2018_sa_agg$SEXE, levels=c("1","2"), labels=c("Hommes","Femmes"))

# Aggr�gation par substance, �ge, sexe, ann�e
bnpv_sa_ret1418b <- bnpv_sa_ret1418 %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, ANNEE, SEXE, AGE) %>%
  summarise(n_cas=sum(n_cas))

# 3.3 Full join entre les deux tables
bnpv_snds1418_sa <- full_join(bnpv_sa_ret1418b, snds2014_2018_sa_agg,
                                    by=c("SUBSTANCE_CODEX_UNIQUE", "codeSubstance", "ANNEE", "SEXE", "AGE"))

# Insertion des strates manquantes
table_insert <- bnpv_sa_ret1418b %>%
  group_by(ANNEE, SEXE, AGE) %>%
  summarise(n_cas=sum(n_cas)) %>%
  select(-n_cas) %>%
  mutate(x=1)

sa_table <- snds2014_2018_sa_agg %>%
  distinct(SUBSTANCE_CODEX_UNIQUE, codeSubstance)

sa_table$x<-1

table_standard <- full_join(table_insert, sa_table, by="x")
table_standard <- table_standard[,-c(4)]

bnpv_snds1418_sa_b <- left_join(table_standard, bnpv_snds1418_sa,  by=c("ANNEE","SUBSTANCE_CODEX_UNIQUE","codeSubstance","SEXE", "AGE"))

table(bnpv_snds1418_sa_b$ANNEE, bnpv_snds1418_sa_b$AGE) # OK

# Remplacer les NA par 0
bnpv_snds1418_sa_b$n_cas[is.na(bnpv_snds1418_sa_b$n_cas)]<-0
bnpv_snds1418_sa_b$n_conso[is.na(bnpv_snds1418_sa_b$n_conso)]<-0

# Recodage de l'�ge en facteur
bnpv_snds1418_sa_b$AGE <- factor(bnpv_snds1418_sa_b$AGE, levels=c("0", "20", "60"),
                                       labels=c("0-19 ans", "20-59 ans", "60 ans et plus"))


# Export de la base 
write.csv2(bnpv_snds1418_sa_b, paste0(chemin_acces_output,"bnpv_openmedic1421_sa_codex.csv"))

sum(bnpv_snds1418_sa_b$n_cas) # 616156
sum(bnpv_snds1418_sa_b$n_conso) # 3575438118

# 4. DATA-MANAGEMENT TABLE SUBSTANCES-EFFETS ----
## EFFET_SOC ##
# 4.1 Restriction des cas aux sa retenus
cas_retenus <- spe_prod_sa_bnpv_sa_codex %>%
  filter(ANNEE_NOTIF>2013 & ANNEE_NOTIF <2022, # cas entre 2014-2018
         SUBSTANCE_CODEX_UNIQUE %in% bnpv_snds1418_sa_b$SUBSTANCE_CODEX_UNIQUE) # liste des SA retenues
nrow(cas_retenus) #696626

# Cat�gorisation �ge
cas_retenus$AGE <- 60
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(0,10)]<-0
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(20,30,40,50)]<-20

# 4.2 Jointure avec Effets
cas_retenus_effets <- left_join(cas_retenus, effets, by=c("AER_ID", "CAS", "VER"))
nrow(cas_retenus_effets) # 1510518

# Suppression des EFFET_SOC = NA
cas_retenus_effets <- cas_retenus_effets[!is.na(cas_retenus_effets$EFFET_SOC),]

# verif
length(unique(cas_retenus$AER_ID))  # 221000
length(unique(cas_retenus_effets$AER_ID)) # 221000
length(unique(cas_retenus_effets$SUBSTANCE_CODEX_UNIQUE)) # 1642

# 4.3 Supprimer les doublons de EFFET_SOC pour un m�me cas
cas_retenus_effets_sdbls <- cas_retenus_effets %>%
  group_by(AER_ID, CAS, VER,SUBSTANCE_CODEX_UNIQUE, codeSubstance, EFFET_SOC, AGE, SEXE) %>%
  distinct(AER_ID, CAS, VER,SUBSTANCE_CODEX_UNIQUE,codeSubstance,EFFET_SOC, AGE, SEXE)

nrow(cas_retenus_effets_sdbls) # 1218080

# 4.4 Aggr�gation par substance
bnpv_effets_sa_codex <- cas_retenus_effets_sdbls %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, EFFET_SOC, AGE, SEXE) %>%
  summarise(n_decla_eff=n())

nrow(bnpv_effets_sa_codex) # 105922
sum(bnpv_effets_sa_codex$n_decla_eff) # 1218080

# 4.5 Ajout du nbre de cas par substance
bnpv_cas_sa_codex <- cas_retenus %>% group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, AGE, SEXE) %>%
  summarise(n_cas=n())

nrow(cas_retenus) # 696626
sum(bnpv_cas_sa_codex$n_cas) # 696626

bnpv_effets_sa_codex2 <- left_join(bnpv_effets_sa_codex, bnpv_cas_sa_codex,
                                   by=c("AGE","SEXE","SUBSTANCE_CODEX_UNIQUE", "codeSubstance"))


# Export de la base 
write.csv2(bnpv_effets_sa_codex2, paste0(chemin_acces_output,"bnpv_eff_soclong_sa_codex_snds.csv"))

## HLT ##
# 4.7 Restriction des cas aux substances retenues
cas_retenus <- spe_prod_sa_bnpv_sa_codex %>%
  filter(ANNEE_NOTIF>2013 & ANNEE_NOTIF <2022, # cas entre 2014-2018
         SUBSTANCE_CODEX_UNIQUE %in% bnpv_snds1418_sa_b$SUBSTANCE_CODEX_UNIQUE) # liste des SA retenues
nrow(cas_retenus) #696626

# Cat�gorisation �ge
cas_retenus$AGE <- 60
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(0,10)]<-0
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(20,30,40,50)]<-20

# 4.8 Jointure avec Effets
cas_retenus_effets <- left_join(cas_retenus, effets, by=c("AER_ID", "CAS", "VER"))
nrow(cas_retenus_effets) # 1510518

# Suppression des HLT = NA ET EFFET_SOC = NA
cas_retenus_effets <- cas_retenus_effets[!is.na(cas_retenus_effets$EFFET_SOC),]
cas_retenus_effets <- cas_retenus_effets[!is.na(cas_retenus_effets$EFFET_HLT),]
nrow(cas_retenus_effets) # 1510518

# verif
length(unique(cas_retenus$AER_ID))  # 221000
length(unique(cas_retenus_effets$AER_ID)) # 221000
length(unique(cas_retenus_effets$SUBSTANCE_CODEX_UNIQUE)) # 1642

# 4.9 Supprimer les doublons de EFFET_HLT pour un m�me cas
cas_retenus_effets_sdbls <- cas_retenus_effets %>%
  group_by(AER_ID, CAS, VER,AGE, SEXE, SUBSTANCE_CODEX_UNIQUE, codeSubstance, EFFET_HLT, EFFET_SOC) %>%
  distinct(AER_ID, CAS, VER,AGE, SEXE,SUBSTANCE_CODEX_UNIQUE, codeSubstance, EFFET_HLT, EFFET_SOC)

nrow(cas_retenus_effets_sdbls) # 1449661

# 4.10 Aggr�gation par substance
bnpv_effets_sa_codex <- cas_retenus_effets_sdbls %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, AGE, SEXE, EFFET_HLT, EFFET_SOC) %>%
  summarise(n_decla_eff_hlt=n())

nrow(bnpv_effets_sa_codex) # 402559
sum(bnpv_effets_sa_codex$n_decla_eff_hlt) # 1449661


# Export de la base 
write.csv2(bnpv_effets_sa_codex, paste0(chemin_acces_output,"bnpv_eff_hlt_soclong_sa_codex_snds.csv"))

# 5. DATA-MANAGEMENT TABLE SUBSTANCES-NOTIFICATEURS ----
# 5.1 Restriction des cas aux sa retenus
cas_retenus <- spe_prod_sa_bnpv_sa_codex %>%
  filter(ANNEE_NOTIF>2013 & ANNEE_NOTIF <2022, # cas entre 2014-2018
         SUBSTANCE_CODEX_UNIQUE %in% bnpv_snds1418_sa_b$SUBSTANCE_CODEX_UNIQUE) # liste des subs retenus
nrow(cas_retenus) #696626

# Cat�gorisation �ge
cas_retenus$AGE <- 60
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(0,10)]<-0
cas_retenus$AGE[cas_retenus$AGE_CAT %in% c(20,30,40,50)]<-20

# 5.2 Notificateurs par substance
notif_cas_sa <- cas_retenus %>%
  group_by(TYP_NOTIF, SUBSTANCE_CODEX_UNIQUE, codeSubstance, AGE, SEXE) %>%
  summarise(n_decla=n())

sum(notif_cas_sa$n_decla) # 696626

# 5.3 Ajout du nbre de cas par substance
bnpv_cas_sa_codex <- cas_retenus %>% group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, AGE, SEXE) %>%
  summarise(n_cas=n())

nrow(cas_retenus) # 696626
sum(bnpv_cas_sa_codex$n_cas) # 696626

bnpv_notif_sa_codex <- left_join(notif_cas_sa, bnpv_cas_sa_codex,
                                 by=c("AGE","SEXE","SUBSTANCE_CODEX_UNIQUE", "codeSubstance"))


# Calcul de la r�partition globale des types de notificateurs
bnpv_notif_tot <- bnpv_notif_sa_codex %>%
  group_by(TYP_NOTIF) %>%
  summarise(n_decla_tot=sum(n_decla))


# Export de la base 
write.csv2(bnpv_notif_sa_codex, paste0(chemin_acces_output,"bnpv_notif_sa_codex_snds.csv"))


# 6. DATA-MANAGEMENT TABLE SUBSTANCES-CAS GRAVE ---- 
# 6.1 Restriction des cas aux sa retenus
cas_retenus <- spe_prod_sa_bnpv_sa_codex %>%
  filter(ANNEE_NOTIF>2013 & ANNEE_NOTIF <2022, # cas entre 2014-2018
         SUBSTANCE_CODEX_UNIQUE %in% bnpv_snds1418_sa_b$SUBSTANCE_CODEX_UNIQUE) # liste des subs retenus
nrow(cas_retenus) #696626 

# Description
apply(cas_retenus[,c(9:14)],2,function(col)(table(as.factor(col), useNA = "a")))
apply(cas_retenus[,c(9:14)],2,function(col)((table(as.factor(col), useNA = "a")/696626))*100)

table(cas_retenus$GRAVE, cas_retenus$DECES, useNA="a")
table(cas_retenus$GRAVE, cas_retenus$PRO_V, useNA="a")
table(cas_retenus$GRAVE, cas_retenus$HOSPI, useNA="a")
table(cas_retenus$GRAVE, cas_retenus$INCAP, useNA="a")
table(cas_retenus$GRAVE, cas_retenus$ANO_C, useNA="a")


# 6.2 Cas grave oui/non par substance
grave_cas_sa <- cas_retenus %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, GRAVE) %>%
  summarise(n_cas14_18=n())

sum(grave_cas_sa$n_cas14_18) # 696626 OK
table(grave_cas_sa$GRAVE)

# 6.3 Ajout des strates � 0
grave_cas_sa$x <- 1

temp <- grave_cas_sa[c(1,2),c(3)]
temp$x <- 1

temp2 <- grave_cas_sa %>%
  distinct(SUBSTANCE_CODEX_UNIQUE, codeSubstance)
temp2$x <- 1


table_insert <- full_join(temp, temp2, by="x")
nrow(table_insert) # 4842
table_insert <- table_insert[,-c(2)]

grave_cas_sa_b <- left_join(table_insert, grave_cas_sa,  by=c("SUBSTANCE_CODEX_UNIQUE", "codeSubstance","GRAVE"))

nrow(grave_cas_sa_b) # 4842 OK

grave_cas_sa_b <- grave_cas_sa_b[,-c(5)]
grave_cas_sa_b$n_cas14_18[is.na(grave_cas_sa_b$n_cas14_18)]<-0
sum(grave_cas_sa_b$n_cas14_18) # 696626 OK

# Export de la base 
write.csv2(grave_cas_sa_b, paste0(chemin_acces_output,"bnpv_cas_grave_sa_codex_snds.csv"), row.names=FALSE)


