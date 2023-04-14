# TITRE : CROISEMENT BASE DE TRAVAIL BNPV AVEC CODEX - SUBSTANCE ACTIVE ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V7
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 06/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : variable MEDICAMENT en clair dans la base de travail bnpv, codes substance � r�cup�rer 
# pour aggr�gation
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : R�cup�rer la substance active (SA) pour chaque sp�cialit�/produit/substance de la BNPV 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - bnpv_medicaments_clair.csv
# - spe_prod_bnpv_prod_codex.csv
# - corresp_spe_prod_subs.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - spe_prod_sa_bnpv_sa_codex.csv
# - spe_prod_sa_bnpv_sa_codex_agg.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc�s aux donn�es 
chemin_acces <- ""

# Chemin vers le dossier de sauvegarde souhait�
chemin_save_sortie <- ""


# 1. LIBRAIRIES ET FONCTIONS ----
library("readxl")
library("dplyr")
library("stringr")
library("readr")
library("stringdist")

# 2. IMPORT DES DONNEES ET TRAITEMENTS ----
bnpv_medicaments_clair <- read.csv2(paste0(chemin_acces,"bnpv_medicaments_clair2.csv"), colClasses = "character")
spe_prod_bnpv_prod_codex <- read.csv2(paste0(chemin_acces,"spe_prod_bnpv_prod_codex2.csv"), colClasses = "character")
corresp_spe_prod_subs <- read.csv2(paste0(chemin_acces,"corresp_spe_prod_subs.csv"), colClasses = c("codeSubstance"="character"))
sa_codex_variants <- read.csv2(paste0(chemin_acces,"sa_codex_variants.csv"), colClasses = c("codeSubstance"="character", "codeNomSubstance"="character"))

# 3. RETROUVER LES SA DES CAS BNPV DONT LE PRODUIT A ETE RETROUVE DANS CODEX ----
# 98.5% des obs apr�s nettoyage et cod�s en pdt ou sp� dont pdt codex a �t� retrouv�

# 3.1 Cr�ation de la table de passage Produit-SA Codex
prod_sa_codex <- corresp_spe_prod_subs %>% select(PRODUIT_CODEX, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  group_by(PRODUIT_CODEX, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  filter(row_number()==1) 

nrow(prod_sa_codex) # 15368 lignes Pdts
length(unique(prod_sa_codex$PRODUIT_CODEX)) # 9814 Pdts uniques

# 3.2 Affectation des SA � spe_prod_bnpv_prod_codex
spe_prod_bnpv_sa_codex <- left_join(spe_prod_bnpv_prod_codex, prod_sa_codex, by=c("PRODUIT_CODEX")) 
nrow(spe_prod_bnpv_sa_codex) # 1131437
nrow(spe_prod_bnpv_sa_codex[is.na(spe_prod_bnpv_sa_codex$SUBSTANCE_CODEX_UNIQUE),]) # 0

# Supprimer les cas ayant pris plusieurs m�dicaments correspondant au m�me SA
spe_prod_bnpv_sa_codex <- spe_prod_bnpv_sa_codex %>%
  group_by(AER_ID, CAS, VER, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  filter(row_number()==1)
nrow(spe_prod_bnpv_sa_codex) # 1121814

# 4. RETROUVER LES SA DES CAS BNPV DANS CODEX ----
# 4.1 S�lection des cas cod�s en SA
bnpv_sa_clair <- bnpv_medicaments_clair[bnpv_medicaments_clair$TYPE=="Substance",] # 180 216
length(unique(bnpv_sa_clair$MEDICAMENT)) # 2413

# 4.2 Mettre tous les noms de SA en conformit�
# majuscule pour bnpv 
bnpv_sa_clair$MEDICAMENT <- toupper(bnpv_sa_clair$MEDICAMENT)

# Enlever accents et doubles paranth�ses
bnpv_sa_clair$MEDICAMENT  <- gsub("É", "E", bnpv_sa_clair$MEDICAMENT)
bnpv_sa_clair$MEDICAMENT  <- gsub("È", "E", bnpv_sa_clair$MEDICAMENT)
bnpv_sa_clair$MEDICAMENT  <- gsub("À", "A", bnpv_sa_clair$MEDICAMENT)
bnpv_sa_clair$MEDICAMENT  <- gsub("Ï", "I", bnpv_sa_clair$MEDICAMENT)

bnpv_sa_clair$MEDICAMENT<- gsub("[(]{2}","(",bnpv_sa_clair$MEDICAMENT)
bnpv_sa_clair$MEDICAMENT<- gsub("[)]{2}",")",bnpv_sa_clair$MEDICAMENT)

# unicit� bnpv_sa_clair
length(unique(bnpv_sa_clair$MEDICAMENT)) # 2408

# 4.3 Liste Substances Codex avec variants
sa_codex_variants <- sa_codex_variants[,-c(1)]
nrow(sa_codex_variants) # 20498
length(unique(sa_codex_variants$SUBSTANCE_CODEX)) # 20473 
verif <- sa_codex_variants[duplicated(sa_codex_variants$SUBSTANCE_CODEX),] # -> il y a 25 doublons � enlever
sa_codex_variants <- sa_codex_variants %>%
  group_by(SUBSTANCE_CODEX) %>%
  filter(row_number()==1)
nrow(sa_codex_variants) # 20473 OK

# 4.4 SA directement retrouv�s dans CODEX
length(unique(bnpv_sa_clair$MEDICAMENT[bnpv_sa_clair$MEDICAMENT %in% sa_codex_variants$SUBSTANCE_CODEX])) # 1976
length(unique(bnpv_sa_clair$MEDICAMENT[bnpv_sa_clair$MEDICAMENT %in% sa_codex_variants$SUBSTANCE_CODEX]))/length(unique(bnpv_sa_clair$MEDICAMENT)) # 82% retrouv�s

bnpv_sa_clair_retrouv_sa <- left_join(bnpv_sa_clair, sa_codex_variants, by=c("MEDICAMENT"="SUBSTANCE_CODEX")) 
nrow(bnpv_sa_clair_retrouv_sa) # 180216 Ok

bnpv_sa_clair_non_retrouv_sa <- bnpv_sa_clair_retrouv_sa[is.na(bnpv_sa_clair_retrouv_sa$SUBSTANCE_CODEX_UNIQUE),] 
nrow(bnpv_sa_clair_non_retrouv_sa)# 9157 cas non retrouv�s

length(unique(bnpv_sa_clair_non_retrouv_sa$MEDICAMENT)) # 432

bnpv_sa_clair_retrouv_sa <- bnpv_sa_clair_retrouv_sa[!is.na(bnpv_sa_clair_retrouv_sa$SUBSTANCE_CODEX_UNIQUE),]
nrow(bnpv_sa_clair_retrouv_sa) # 171059
length(unique(bnpv_sa_clair_retrouv_sa$MEDICAMENT)) # 1976

# 4.5 Non retrouv�s : si MEDICAMENT compos� de 1 mot et match unique avec 1er mot substance codex -> retrouv�
# liste subs non retrouv� bnpv
liste_med_non_retrouv <- as.data.frame(unique(bnpv_sa_clair_non_retrouv_sa$MEDICAMENT))
names(liste_med_non_retrouv)<-"MEDICAMENT"
liste_med_non_retrouv$MEDICAMENT_MOT1 <- word(liste_med_non_retrouv$MEDICAMENT,1)

liste_med_non_retrouv_1mot <-  liste_med_non_retrouv[liste_med_non_retrouv$MEDICAMENT==liste_med_non_retrouv$MEDICAMENT_MOT1,]
nrow(liste_med_non_retrouv_1mot)
# 155 substances compos�s d'un seul mot

# liste subs codex
liste_sa_codex <- sa_codex_variants
liste_sa_codex$SUBSTANCE_CODEX_MOT1 <- word(liste_sa_codex$SUBSTANCE_CODEX,1)

# croisement avec corres
liste_med_non_retrouv_1mot_retrouv <- left_join(liste_med_non_retrouv_1mot, liste_sa_codex, by=c("MEDICAMENT"="SUBSTANCE_CODEX_MOT1"))
liste_med_non_retrouv_1mot_retrouv <- liste_med_non_retrouv_1mot_retrouv[!is.na(liste_med_non_retrouv_1mot_retrouv$SUBSTANCE_CODEX),]
length(unique(liste_med_non_retrouv_1mot_retrouv$MEDICAMENT)) # 65

# garder que les match uniques
liste_retenir <- liste_med_non_retrouv_1mot_retrouv %>%
  distinct(MEDICAMENT, SUBSTANCE_CODEX_UNIQUE, codeSubstance)%>%
  group_by(MEDICAMENT) %>%
  mutate(count=n()) %>%
  filter(count<2) %>%
  select(-count)

colnames(bnpv_sa_clair_non_retrouv_sa)
# ajout � bnpv clair
bnpv_sa_clair_non_retrouv_sa2 <- left_join(bnpv_sa_clair_non_retrouv_sa[,!(names(bnpv_sa_clair_non_retrouv_sa) %in% c("codeSubstance","SUBSTANCE_CODEX_UNIQUE"))], liste_retenir, by=c("MEDICAMENT"))
nrow(bnpv_sa_clair_non_retrouv_sa2)# 9157 OK
length(unique(bnpv_sa_clair_non_retrouv_sa2$MEDICAMENT)) # 432 OK

bnpv_sa_clair_retrouv_e1 <- bnpv_sa_clair_non_retrouv_sa2[!is.na(bnpv_sa_clair_non_retrouv_sa2$SUBSTANCE_CODEX),]
nrow(bnpv_sa_clair_retrouv_e1) # 4890
length(unique(bnpv_sa_clair_retrouv_e1$SUBSTANCE_CODEX_UNIQUE)) # 52
length(unique(bnpv_sa_clair_retrouv_e1$MEDICAMENT)) # 52

bnpv_sa_clair_non_retouv_e1 <- bnpv_sa_clair_non_retrouv_sa2[is.na(bnpv_sa_clair_non_retrouv_sa2$SUBSTANCE_CODEX),]
nrow(bnpv_sa_clair_non_retouv_e1) # 4267
length(unique(bnpv_sa_clair_non_retouv_e1$MEDICAMENT)) # 380

# nettoyage environnement
rm(list=setdiff(ls(), c("bnpv_medicaments_clair", "bnpv_sa_clair", "bnpv_sa_clair_non_retouv_e1","bnpv_sa_clair_retrouv_sa",
                "bnpv_sa_clair_retrouv_e1", "corresp_spe_prod_subs", "spe_prod_bnpv_sa_codex",
                "prod_sa_codex", "sa_codex_variants", "chemin_save_sortie")))


# 4.6 Non retrouv�s : si 1er mot MEDICAMENT match unique avec 1er mot substance codex -> retrouv�
# liste subs non retrouv� bnpv
liste_med_non_retrouv <- as.data.frame(unique(bnpv_sa_clair_non_retouv_e1$MEDICAMENT))
names(liste_med_non_retrouv)<-"MEDICAMENT"
liste_med_non_retrouv$MEDICAMENT_MOT1 <- word(liste_med_non_retrouv$MEDICAMENT,1)
nrow(liste_med_non_retrouv) #380

# liste subs codex - 1 er mot
liste_sa_codex <- sa_codex_variants
liste_sa_codex$SUBSTANCE_CODEX_MOT1 <- word(liste_sa_codex$SUBSTANCE_CODEX,1)

# croisement avec corres
liste_med_non_retrouv_1mot_retrouv <- inner_join(liste_med_non_retrouv, liste_sa_codex, by=c("MEDICAMENT_MOT1"="SUBSTANCE_CODEX_MOT1"))

# garder que les match uniques
liste_retenir <- liste_med_non_retrouv_1mot_retrouv %>%
  distinct(MEDICAMENT, MEDICAMENT_MOT1, SUBSTANCE_CODEX_UNIQUE, codeSubstance)%>%
  group_by(MEDICAMENT, MEDICAMENT_MOT1) %>%
  mutate(count=n()) %>%
  filter(count<2) %>%
  select(-count)

# enlever les erreurs
liste_retenir<-liste_retenir[!liste_retenir$MEDICAMENT_MOT1 %in% c("VACCIN", "JUS", "CHLORATE", "ELIXIR", "GRAINE"),]
liste_retenir<-liste_retenir[,-c(2)]
nrow(liste_retenir) # 57
liste_retenir$MEDICAMENT<- as.character(liste_retenir$MEDICAMENT)

# ajout � bnpv
names(bnpv_sa_clair_non_retouv_e1)
bnpv_sa_clair_non_retouv_e1_retrouv <- left_join(bnpv_sa_clair_non_retouv_e1[,!(names(bnpv_sa_clair_non_retouv_e1) %in% c("codeSubstance","SUBSTANCE_CODEX_UNIQUE"))], liste_retenir, by=c("MEDICAMENT"))
bnpv_sa_clair_retrouv_e2 <- bnpv_sa_clair_non_retouv_e1_retrouv[!is.na(bnpv_sa_clair_non_retouv_e1_retrouv$SUBSTANCE_CODEX_UNIQUE),]
nrow(bnpv_sa_clair_retrouv_e2) # 578
length(unique(bnpv_sa_clair_retrouv_e2$SUBSTANCE_CODEX_UNIQUE)) # 54
length(unique(bnpv_sa_clair_retrouv_e2$MEDICAMENT)) # 57

bnpv_sa_clair_non_retrouv_e2 <- bnpv_sa_clair_non_retouv_e1_retrouv[is.na(bnpv_sa_clair_non_retouv_e1_retrouv$SUBSTANCE_CODEX_UNIQUE),]
nrow(bnpv_sa_clair_non_retrouv_e2) # 3689
length(unique(bnpv_sa_clair_non_retrouv_e2$MEDICAMENT)) # 323

rm(list=setdiff(ls(), c("bnpv_medicaments_clair", "bnpv_sa_clair", "bnpv_sa_clair_retrouv_sa",
                        "bnpv_sa_clair_retrouv_e1", "corresp_spe_prod_subs", "spe_prod_bnpv_sa_codex",
                        "prod_sa_codex", "sa_codex_variants", "bnpv_sa_clair_non_retrouv_e2","bnpv_sa_clair_retrouv_e2",
                        "chemin_save_sortie")))

# 4.7 Non retrouv�s : retravailler les mots entre parenth�ses -> placer devant
liste_med_non_retrouv <- as.data.frame(unique(bnpv_sa_clair_non_retrouv_e2$MEDICAMENT))
names(liste_med_non_retrouv)<-"MEDICAMENT"

# remodalage des noms de m�dicaments cibl�s
liste_med_non_retrouv$mots_parenth <- sub("\\).*", "", sub(".*\\(", "", liste_med_non_retrouv$MEDICAMENT)) 
liste_med_non_retrouv$mots_parenth[liste_med_non_retrouv$mots_parenth==liste_med_non_retrouv$MEDICAMENT]<-""
liste_med_non_retrouv$medicament_sans_parenth <- gsub("[(]{1}","",liste_med_non_retrouv$MEDICAMENT) 
liste_med_non_retrouv$medicament_sans_parenth <- gsub("[)]{1}","",liste_med_non_retrouv$medicament_sans_parenth) 
liste_med_non_retrouv$medicament_sans_parenth[liste_med_non_retrouv$medicament_sans_parenth==liste_med_non_retrouv$MEDICAMENT]<-""

liste_med_non_retrouv$medicament_moins_parenth <- NA
for (i in 1:nrow(liste_med_non_retrouv)) {
liste_med_non_retrouv$medicament_moins_parenth[i] <- gsub(liste_med_non_retrouv$mots_parenth[i],"",liste_med_non_retrouv$medicament_sans_parenth[i])
}

liste_med_non_retrouv$MEDICAMENT_remod <- paste(liste_med_non_retrouv$mots_parenth, liste_med_non_retrouv$medicament_moins_parenth)
liste_med_non_retrouv$MEDICAMENT_remod<-gsub("D' ","D'",liste_med_non_retrouv$MEDICAMENT_remod)
liste_med_non_retrouv$MEDICAMENT_remod<-trimws(liste_med_non_retrouv$MEDICAMENT_remod)
liste_med_non_retrouv$MEDICAMENT_remod <- gsub("\\s+", " ", str_trim(liste_med_non_retrouv$MEDICAMENT_remod))
liste_med_non_retrouv <- liste_med_non_retrouv[,c(1,5)]

# ajout SUBSTANCE_CODEX retrouv�s
sa_codex_variants$SUBSTANCE_CODEX<-as.character(sa_codex_variants$SUBSTANCE_CODEX)
liste_med_non_retrouvb <- left_join(liste_med_non_retrouv, sa_codex_variants, by=c("MEDICAMENT_remod"="SUBSTANCE_CODEX"))

length(na.omit(liste_med_non_retrouvb$SUBSTANCE_CODEX_UNIQUE)) # 5 sa retrouv�es

list_ajout <- liste_med_non_retrouvb[!is.na(liste_med_non_retrouvb$SUBSTANCE_CODEX_UNIQUE),c(1,3,4)]

# ajout � bnpv
names(bnpv_sa_clair_non_retrouv_e2)
bnpv_sa_clair_non_retrouv_e2b <- left_join(bnpv_sa_clair_non_retrouv_e2[,!(names(bnpv_sa_clair_non_retrouv_e2) %in% c("codeSubstance","SUBSTANCE_CODEX_UNIQUE"))], list_ajout, by=c("MEDICAMENT"))

bnpv_sa_clair_retrouv_e3 <- bnpv_sa_clair_non_retrouv_e2b[!is.na(bnpv_sa_clair_non_retrouv_e2b$SUBSTANCE_CODEX_UNIQUE),]
nrow(bnpv_sa_clair_retrouv_e3) # 82 cas retrouv�s

bnpv_sa_clair_non_retrouv_e3 <- bnpv_sa_clair_non_retrouv_e2b[is.na(bnpv_sa_clair_non_retrouv_e2b$SUBSTANCE_CODEX_UNIQUE),]
nrow(bnpv_sa_clair_non_retrouv_e3) # 3607 cas non retrouv�s

length(unique(bnpv_sa_clair_non_retrouv_e3$MEDICAMENT))

list_sa_non_retrouv_bnpv_codex <- bnpv_sa_clair_non_retrouv_e3 %>%
  group_by(MEDICAMENT) %>%
  summarise(n_cas=n())


# 4.8 Compilation des SA retrouv�s pour les cas cod�s en SA
nrow(bnpv_sa_clair_retrouv_sa) # 171059
nrow(bnpv_sa_clair_retrouv_e1) # 4890
nrow(bnpv_sa_clair_retrouv_e2) # 578
nrow(bnpv_sa_clair_retrouv_e3) # 82

sa_bnpv_sa_codex <- bind_rows(bnpv_sa_clair_retrouv_sa, bnpv_sa_clair_retrouv_e1, bnpv_sa_clair_retrouv_e2, bnpv_sa_clair_retrouv_e3)
nrow(sa_bnpv_sa_codex) # 176609
length(unique(sa_bnpv_sa_codex$MEDICAMENT)) # 2090

sa_non_retrouv <- bnpv_sa_clair_non_retrouv_e3 %>%
  group_by(MEDICAMENT) %>%
  summarise(n_cas=n())

length(unique(sa_non_retrouv$MEDICAMENT)) # 318

# Export 
write.csv2(sa_bnpv_sa_codex, paste0(chemin_save_sortie,"sa_bnpv_sa_codex.csv"), quote=TRUE)

# Export 
write.csv2(sa_non_retrouv, paste0(chemin_save_sortie,"list_sa_non_retrouv_bnpv_codex.csv"))


# 5. COMPILATION ENSEMBLE DES CAS SOUS SA CODEX ----
# Compilation des tables produits
names(spe_prod_bnpv_sa_codex)
names(sa_bnpv_sa_codex)
bnpv_sa_codex <- bind_rows(spe_prod_bnpv_sa_codex[,!(names(spe_prod_bnpv_sa_codex) %in% c("X","PRODUIT_CODEX"))], sa_bnpv_sa_codex)
nrow(spe_prod_bnpv_sa_codex) # 1121814
nrow(sa_bnpv_sa_codex) # 176609
nrow(bnpv_sa_codex) # 1298423

# Supprimer les cas ayant pris plusieurs m�dicaments correspondant � la m�me substance
bnpv_sa_codex2 <- bnpv_sa_codex %>% select(-MEDICAMENT) %>%
  group_by(AER_ID, CAS, VER, SUBSTANCE_CODEX_UNIQUE) %>%
  filter(row_number()==1)

nrow(bnpv_sa_codex2) # 1297076

# Export de la base 
write.csv2(bnpv_sa_codex2, paste0(chemin_save_sortie,"spe_prod_sa_bnpv_sa_codex2.csv"), quote = TRUE, row.names=FALSE)

# Aggregation suivant ann�e notif, �ge d�c�nal, sexe, produit_codex
bnpv_sa_codex2_agg <- bnpv_sa_codex2 %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, ANNEE_NOTIF, SEXE, AGE_CAT) %>%
  summarise(n_cas=n())

nrow(bnpv_sa_codex2_agg) # 165222 strates
sum(bnpv_sa_codex2_agg$n_cas) # 1297076 ok

# Export
write.csv2(bnpv_sa_codex2_agg, paste0(chemin_save_sortie,"spe_prod_sa_bnpv_sa_codex_agg.csv"))




