# TITRE : Statistiques descriptives pour la page Indicateurs globaux ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V2
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 10/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - openmedic2014_2021_subs_agg
# - 20200702 - Cas BNPV 2009-2018 - 4 Onglets.xlsx
# - spe_prod_sa_bnpv_sa_codex2.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - Statistiques descriptives
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc�s aux autres donn�es et dossier de sauvagarde
# chemin_acces <- ""
chemin_or_bnpv <- ""

# Chemin d'acc�s aux autres donn�es et dossier de sauvagarde
chemin_acces_input <- ""
chemin_acces_output <- ""

# 1. LIBRAIRIES ET FONCTIONS ----
library("dplyr")
library("readxl")
library("ggplot2")
library("lubridate")

# 2. IMPORT DES DONNEES ET CROISEMENT ----
# 2.1 Import
effets <- read.csv2(paste0(chemin_or_bnpv,"20230216 - Effets.csv"))
bnpv_medicaments_clair <- read.csv2(paste0(chemin_acces_input,"bnpv_medicaments_clair2.csv"), colClasses = "character")

effets$EFFET_SOC  <- gsub("Nervous system disorders", "Affections du système nerveux", effets$EFFET_SOC)
effets$EFFET_SOC  <- gsub("Injury, poisoning and procedural complications", "Lésions, intoxications et complications d'interventions", effets$EFFET_SOC)
effets$EFFET_SOC  <- gsub("Cardiac disorders", "Affections cardiaques", effets$EFFET_SOC)
effets$EFFET_SOC  <- gsub("Endocrine disorders", "Affections endocriniennes", effets$EFFET_SOC)
effets$EFFET_SOC  <- gsub("Psychiatric disorders", "Affections psychiatriques", effets$EFFET_SOC)
effets$EFFET_SOC  <- gsub("Eye disorders", "Affections oculaires", effets$EFFET_SOC)

# cas retenus pour ordei
table(bnpv_medicaments_clair["ANNEE_NOTIF"])
cas_retenus <- bnpv_medicaments_clair
nrow(cas_retenus) #696626
global_se_nb_evol <- table(cas_retenus["ANNEE_NOTIF"])
write.csv2(global_se_nb_evol, paste0(chemin_acces_output,"global_se_nb_evol.csv"))

cas_retenus$AGE2 <- 60
cas_retenus$AGE2[cas_retenus$AGE_CAT %in% c(0,10)]<-0
cas_retenus$AGE2[cas_retenus$AGE_CAT %in% c(20,30,40,50)]<-20

# comptage d'un seul cas (si plusieurs substances d�clar�s)
cas_retenus_fin <- cas_retenus %>%
  distinct(CAS, AER_ID, VER, .keep_all = TRUE)

# 3. STATISTIQUES GLOBALES ----

# nbre de cas total
cas_total <- nrow(cas_retenus_fin)
cas_total

# r�partition sexe
# Suppression des SEXE = NA
nrow(cas_retenus_fin) 
cas_retenus_fin2 <- cas_retenus_fin[(cas_retenus_fin$SEXE) != "" ,]
cas_total2 <- nrow(cas_retenus_fin2)
n_sexe <- table(cas_retenus_fin2$SEXE)
pct_sexe <- (table(cas_retenus_fin2$SEXE)/cas_total2)*100
global_se_sex <- cbind(n_sexe, pct_sexe)
# global_se_sex$pct_sexe<-as.numeric(gsub(",",".",global_se_sex$pct_sexe))
global_se_sex
write.csv2(global_se_sex, paste0(chemin_acces_output,"global_se_sex.csv"))

# r�partition �ge
n_age <- table(cas_retenus_fin$AGE2)
names(n_age)[1] <- c("0-19 ans")
names(n_age)[2] <- c("20-59 ans")
names(n_age)[3] <- c("60 ans et plus")
pct_age <- (table(cas_retenus_fin$AGE2)/cas_total)*100
names(pct_age)[1] <- c("0-19 ans")
names(pct_age)[2] <- c("20-59 ans")
names(pct_age)[3] <- c("60 ans et plus")
global_se_age <- cbind(n_age, pct_age)
global_se_age
write.csv2(global_se_age, paste0(chemin_acces_output,"global_se_age.csv"))

# r�partion GRAVE
n_grave <- table(cas_retenus_fin$GRAVE)
pct_grave <- (table(cas_retenus_fin$GRAVE)/cas_total)*100
global_se_grave <- cbind(n_grave, pct_grave)
global_se_grave
write.csv2(global_se_grave, paste0(chemin_acces_output,"global_se_grave.csv"))

# r�partion DECES
n_deces <- table(cas_retenus_fin$DECES)
pct_deces <- (table(cas_retenus_fin$DECES)/cas_total)*100

# r�partion PRO_V
n_prov <- table(cas_retenus_fin$PRO_V, useNA = "always")
pct_prov <- (table(cas_retenus_fin$PRO_V, useNA = "always")/cas_total)*100

# r�partion HOSPI
n_hospi <- table(cas_retenus_fin$HOSPI, useNA = "always")
pct_hospi <- (table(cas_retenus_fin$HOSPI, useNA = "always")/cas_total)*100

# r�partion INCAP
n_incap <- table(cas_retenus_fin$INCAP, useNA = "always")
pct_incap <- (table(cas_retenus_fin$INCAP, useNA = "always")/cas_total)*100

# r�partion ANO_C
n_anoc <- table(cas_retenus_fin$ANO_C, useNA = "always")
pct_anoc <- (table(cas_retenus_fin$ANO_C, useNA = "always")/cas_total)*100

# r�partion AUTRE
n_autre <- table(cas_retenus_fin$AUTRE, useNA = "always")
pct_autre <- (table(cas_retenus_fin$AUTRE, useNA = "always")/cas_total)*100

label_gravity <- c("décès", "pronostic vital", "hospitalistaion", "incapacité", "anomalie congénitale", "autre")
n_gravity <- c(n_deces["OUI"], n_prov["OUI"], n_hospi["OUI"], n_incap["OUI"], n_anoc["OUI"], n_autre["OUI"])
pct_gravity <- c(pct_deces["OUI"], pct_prov["OUI"], pct_hospi["OUI"], pct_incap["OUI"], pct_anoc["OUI"], pct_autre["OUI"])

global_se_gravity_type <- data.frame(label_gravity, n_gravity, pct_gravity)

write.csv2(global_se_gravity_type, paste0(chemin_acces_output,"global_se_gravity_type.csv"))

# reparition TYP_NOTIFICATEUR# Suppression des TYP_NOTIFICATEUR = NA2
cas_retenus_fin3 <- cas_retenus_fin[(cas_retenus_fin$TYP_NOTIF) != "" ,]
cas_total3 <- nrow(cas_retenus_fin3)
n_notif <- table(cas_retenus_fin3$TYP_NOTIF)
pct_notif <- (table(cas_retenus_fin3$TYP_NOTIF)/cas_total3)*100
gloabal_se_notifiers <- cbind(n_notif, pct_notif)
write.csv2(gloabal_se_notifiers, paste0(chemin_acces_output,"global_se_notifiers.csv"))

# r�partition SOC_LONG
#Jointure avec Effets
effets$AER_ID <- as.character(effets$AER_ID)
effets$VER <- as.character(effets$VER)
cas_retenus_effets <- left_join(cas_retenus_fin, effets, by=c("AER_ID", "CAS", "VER"))
nrow(cas_retenus_effets) # 568507

# Suppression des SOC_LONG = NA
cas_retenus_effets <- cas_retenus_effets[!is.na(cas_retenus_effets$EFFET_SOC),]
nrow(cas_retenus_effets) # 568507

# Supprimer les doublons de SOC_LONG pour un m�me cas
cas_retenus_effets_sdbls <- cas_retenus_effets %>%
  distinct(CAS, AER_ID, VER, EFFET_SOC, .keep_all = TRUE)

cas_retenus_effets_sdbls2 <- cas_retenus_effets_sdbls[(cas_retenus_effets_sdbls$EFFET_SOC) != "" ,]
cas_total4 <- nrow(cas_retenus_effets_sdbls2) # 456125

n_soc <- table(cas_retenus_effets_sdbls2$EFFET_SOC)
pct_soc <- (table(cas_retenus_effets_sdbls2$EFFET_SOC)/cas_total4)*100
global_se_soc <- cbind(n_soc, pct_soc)
write.csv2(global_se_soc, paste0(chemin_acces_output,"global_se_soc.csv"))


# Statistiques globales
table(nchar(cas_retenus_fin$NOTIF))/length(cas_retenus_fin$NOTIF)*100
cas_retenus_fin["annee_notif"] <- format(dmy(cas_retenus_fin$NOTIF), "%Y")
max_annee <- max(cas_retenus_fin$annee_notif)
min_annee <- min(cas_retenus_fin$annee_notif)
n_effets <- cas_total4
global_se <- rbind(cas_total, n_effets, max_annee, min_annee)
write.csv2(global_se, paste0(chemin_acces_output,"global_se.csv"))
