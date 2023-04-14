# TITRE : PREPARATION BASE DE TRAVAIL CODEX ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V5
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 08/03/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : Les bases de donn?es Codex ont ?t? envoy?es par Claudine Milstein. Elle a r?alis? une 
# extraction en excluant du p?rim?tre les sp?cialit?s ayant c?ss? d'?tre commercialis?es avant 2005.
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : Constitution des bases de travail Codex contenant les infos d?taill?s sur les pr?sentations
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - HDH_ClasseATC
# - HDH_Composants
# - HDH_DicoEvntPresentation
# - HDH_HistoNomsVU
# - HDH_Nature
# - HDH_NomsSubstance
# - HDH_PresentationEvnt
# - HDH_Presentations
# - HDH_Produit
# - HDH_Produit-Histo
# - HDH_VU
# - HDH_VUClassesATC
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - sa_codex_variants.csv
# - corresp_cip13_spe_prod.csv
# - corresp_cis_spe_prod.csv
# - corresp_spe_prod.csv
# - corresp_cip13_spe_prod_subs.csv
# - corresp_spe_prod_subs.csv
# - base_nom_med_ancien_actuel.csv
# - base_nom_prod_ancien_actuel.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc?s aux donn?es 
chemin_acces <- ""

# Chemin vers le dossier de sauvegarde souhait?
chemin_save_sortie <- ""



# 1. LIBRAIRIES ET FONCTIONS ----
library("dplyr")
library("readxl")

# Fonction pour isoler les doublons
duplicated2 <- function(x){ 
  if (sum(dup <- duplicated(x))==0) 
    return(dup) 
  if (class(x) %in% c("data.frame","matrix")) 
    duplicated(rbind(x[dup,],x))[-(1:sum(dup))] 
  else duplicated(c(x[dup],x))[-(1:sum(dup))] 
}

# 2. IMPORT DES DONNEES ----
ClasseATC <- read_excel(paste0(chemin_acces,"dbo_ClasseATC.xlsx"))
Composants <- read_excel(paste0(chemin_acces,"dbo_Composants.xlsx"))
DicoEvntPresentation <- read_excel(paste0(chemin_acces,"dbo_DicoEvntPresentation.xlsx"))
HistoNomsVU <- read_excel(paste0(chemin_acces,"dbo_HistoNomsVU.xlsx"))
Nature <- read_excel(paste0(chemin_acces,"dbo_Nature.xlsx"))
PresentationEvnt <- read_excel(paste0(chemin_acces,"dbo_PresentationEvnts.xlsx"))
Presentations <- read_excel(paste0(chemin_acces,"dbo_Presentations.xlsx"))
Produit <- read_excel(paste0(chemin_acces,"dbo_Produit.xlsx"))
Produit_histo <-read_excel(paste0(chemin_acces,"HDH_Produit-Histo.xlsx"))
VU <- read_excel(paste0(chemin_acces,"dbo_VU.xlsx"))
VUClassesATC <- read_excel(paste0(chemin_acces,"dbo_VUClassesATC.xlsx"))
NomsSubstance <- read_excel(paste0(chemin_acces,"dbo_NomsSubstance.xlsx"))

# 3. SELECTION DES VARIABLES, PRETRAITEMENTS ET FILTRAGES ----
# 3.1 PRESENTATIONS ----
# Description
unique(Presentations$codeCIP13) # 91321 codes CIP uniques vs. 98228 lignes dans la base
Presentations[duplicated2(Presentations$codeCIP13),] # 7075 CIP13 apparaissant au moins 2 fois (dont bcp de NA)
Presentations[is.na(Presentations$codeCIP13),] # /!\ 6741 codes CIP13 manquants

# Selection des variables
Presentations2 <- Presentations %>% select(codeVU, numPresentation, nomPresentation, codeCIP13, codeCIP)

# 3.2 VU ----
# Description
unique(VU$codeCIS) # 19692 codes CIS uniques et 19692 lignes dans la base = OK
VU[duplicated2(VU$codeCIS),] # 0 doublons 

# Selection des variables
VU2 <- VU %>% select(codeVU, codeCIS, codeProduit, nomVU)

# 3.3 VUCLASSESATC ----
# Description
unique(VUClassesATC$codeVU) # 19691 vs. 19692
VUClassesATC$codeVU[!VU$codeVU %in% VUClassesATC$codeVU] # "67874804"

# Selection des variables
VUClassesATC2 <- VUClassesATC %>% select(codeVU, codeClasATC)

# 3.4 PRODUIT ----
# Selection des variables + suppression des doublons
Produit2 <- Produit %>% select(codeProduit, nomProduit) %>% distinct()

# 3.5 COMPOSANTS ----
# S?lection des variables
Composants2 <- Composants %>% select(codeVU, codeSubstance, codeNomSubstance, codeNature)

# 3.6 PRESENTATIONEVNT ----
# S?lection des variables
PresentationEvnt2 <- PresentationEvnt %>% select(codeVU, numPresentation, codeEvntPres, dateEvnt) 

# 3.7 HISTONOMS ----
HistoNomsVU2 <- HistoNomsVU %>% select(codeVU, nomAncienVU, dateCreation) %>%
  filter(!nomAncienVU %in% c("INCONNU (LIBRA)")) %>% # 11491
  mutate(Date=as.Date(dateCreation)) %>%
  filter(Date>=as.Date("2000-01-01")) %>% # 8602
  group_by(codeVU, nomAncienVU) %>%
  filter(Date==max(Date)) # 11353

# dblns codeVu?
verif2 <- HistoNomsVU2[duplicated(HistoNomsVU2$codeVU),] # 2110 codeVu avec plusieurs codeVu
# -> pas grave : correspondance de plusieurs anciens noms avec un seul nouveau nom

# dblns nomAncienVU?
verif <- HistoNomsVU2[duplicated(HistoNomsVU2$nomAncienVU),] # 99 nomAncienVU avec plusieurs codeVU
# -> plus probl?matique : c?d que nomAncienVU contribue ? Sp?cialit? 1 jusqu'? ann?e n puis Sp?cialit? 2 de n ? n + x par exemple
# => on cr??e un indicateur pour les dblns de nomAncienVu
HistoNomsVU2$doublons_nomAncienVU<-0
HistoNomsVU2$doublons_nomAncienVU[HistoNomsVU2$nomAncienVU %in%  verif$nomAncienVU] <- 1
HistoNomsVU2 <- HistoNomsVU2 %>% select(codeVU, nomAncienVU, "DateNom" = Date, doublons_nomAncienVU)


# 3.8 SUBSTANCE ACTIVES DANS CODEX ----
# S?lection variables
NomsSubstance2 <- NomsSubstance %>% select(codeNomSubstance, codeSubstance, nomSubstance)
nrow(NomsSubstance2) # 20536

# Enlever noms substances "(NE PAS UTILISER)"
NomsSubstance2 <- NomsSubstance2 %>%
  filter(substr(nomSubstance,1,17)!="(NE PAS UTILISER)")
nrow(NomsSubstance2) # 20498

# Objectif : une substance pouvant avoir plusieurs noms, on souhaite
# consituer une liste des noms substance uniques ? utiliser ? partir de la table NomSubstance2
# -> lorque qu'il y a une ligne codeSubstance==codeNomSubstance, on utilise le nomSubstance en question comme nom unique
substance_homogen_code <- NomsSubstance2 %>%
  filter(codeSubstance==codeNomSubstance) %>%
  group_by(codeSubstance, nomSubstance) %>%
  filter(row_number()==1) %>%
  select(-codeNomSubstance)

nrow(substance_homogen_code) # 5398
length(unique(substance_homogen_code$codeSubstance)) # 5398
length(unique(substance_homogen_code$nomSubstance)) # 5398

names(substance_homogen_code)[2]<-"SUBSTANCE_CODEX_UNIQUE"

# ajout ? NomsSubstance2
NomsSubstance2b <- left_join(NomsSubstance2, substance_homogen_code, by=c("codeSubstance"))

#-> travail sur les codes o? il y a pas de ligne codeNom==codeSubstance
Substance_active2_na <- NomsSubstance2b[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE),]
nrow(Substance_active2_na) # 141 concern?s

# Si une seule ligne codeNom-CodeSubstance on choisit ce nom-l?
count <- Substance_active2_na %>%
  group_by(codeSubstance) %>%
  summarise(n_choix=n())

count <- count[count$n_choix==1,]
# affectation
NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE) & NomsSubstance2b$codeSubstance %in% count$codeSubstance] <- NomsSubstance2b$nomSubstance[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE) & NomsSubstance2b$codeSubstance %in% count$codeSubstance]

nrow(NomsSubstance2b) # 20498
length(na.omit(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE)) # 20366

# Si pas de ligne codeNom=codeSubstance et plusieurs correspondances codeSubstance-codeNom pour un m?me codeSubstance
# on choisit comme nom de substance unique celui ayant le codeNom le plus ?lev? (arbitraire)
Substance_active2_na <- NomsSubstance2b[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE),]
nrow(Substance_active2_na) # 132

temp <- Substance_active2_na %>%
  group_by(codeSubstance) %>%
  filter(as.numeric(codeNomSubstance)==max(as.numeric(codeNomSubstance)))

temp$SUBSTANCE_CODEX_UNIQUE<-temp$nomSubstance
temp <- temp[, c(2,4)]

# ajout
NomsSubstance2b <- left_join(NomsSubstance2b, temp, by=c("codeSubstance"))
NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE.x[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE.x)] <- NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE.y[is.na(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE.x)]
NomsSubstance2b<-NomsSubstance2b[,-c(5)]
names(NomsSubstance2b)[4]<-"SUBSTANCE_CODEX_UNIQUE"

nrow(NomsSubstance2b) # 20498 noms de substance
length(unique(NomsSubstance2b$SUBSTANCE_CODEX_UNIQUE)) # 5438 noms de substance unique

# Table sa_codex_variants = tables entre l'ensemble des noms de substances et leurs correspondances ? un nom unique
sa_codex_variants <- NomsSubstance2b
names(sa_codex_variants)[3]<-"SUBSTANCE_CODEX" 
nrow(sa_codex_variants) # 20498

# Retraitement du texte
# majuscules et sans accents et doubles parentheses
sa_codex_variants$SUBSTANCE_CODEX <- toupper(sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE <- toupper(sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)

sa_codex_variants$SUBSTANCE_CODEX  <- gsub("�", "E", sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX  <- gsub("�", "E", sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX  <- gsub("�", "A", sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX  <- gsub("�", "I", sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX<- gsub("[(]{2}","(",sa_codex_variants$SUBSTANCE_CODEX)
sa_codex_variants$SUBSTANCE_CODEX<- gsub("[)]{2}",")",sa_codex_variants$SUBSTANCE_CODEX)

sa_codex_variants$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "A", sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "I", sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE<- gsub("[(]{2}","(",sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)
sa_codex_variants$SUBSTANCE_CODEX_UNIQUE<- gsub("[)]{2}",")",sa_codex_variants$SUBSTANCE_CODEX_UNIQUE)

# Export de la table sa_codex_variants
write.csv2(sa_codex_variants, paste0(chemin_save_sortie,"sa_codex_variants.csv"), row.names = FALSE)

# Table sa_codex - code substance - nom substance unique
sa_codex_code_nom_unique <- NomsSubstance2b %>%
  group_by(codeSubstance, SUBSTANCE_CODEX_UNIQUE) %>%
  filter(row_number()==1) %>%
  select(-codeNomSubstance,-nomSubstance)

nrow(sa_codex_code_nom_unique) # 5438

# 3.9 CORRESPONDANCE SUBSTANCE ACTIVES UNQIUE - codeVU ----
Substance_active_codevu <- Composants2 %>% filter(codeNature==3) %>%
  group_by(codeVU, codeSubstance) %>%
  filter(row_number() == 1) %>%
  select(-codeNature, -codeNomSubstance) 

nrow(Substance_active_codevu) # 27222

# ajout nom unique
Substance_active_codevu <- left_join(Substance_active_codevu, sa_codex_code_nom_unique, by=c("codeSubstance"))
nrow(Substance_active_codevu) # 27222


# 4. JOINTURES ET CONSTITUTION DES BASES DE TRAVAIL ----
# 4.1 BASE DETAIL CIP SPE PRODUIT ----
# Jointure entre VU2, VUClassesATC2 et Produit2
join_vu <- left_join(VU2, VUClassesATC2, by="codeVU")
join_vu2 <- left_join(join_vu, Produit2, by="codeProduit")

# Jointure avec Presentations
base_detail_cip <- left_join(Presentations2, join_vu2, by="codeVU") # 98228

# supression des cip absents (hom?opathie + erreurs)
base_detail_cip<-base_detail_cip[!is.na(base_detail_cip$codeCIP13),] # 91487

# verif codes CIP13 uniques
#test <- base_detail_cip[duplicated(base_detail_cip$codeCIP13),] # 167 doublons correspondant ? des renotifications (? traiter)

# verif noms m?dicaments (nomVU) uniques
#test2 <- base_detail_cip[duplicated(base_detail_cip$nomVU),] # 73100 = noms avec plusieurs presentations diff?rentes

# Export de la base base_detail_cip
corresp_cip13_spe_prod <- base_detail_cip %>% select(codeCIP13, "SPECIALITE_C"=nomVU, codeCIS, codeProduit, "PRODUIT"=nomProduit, codeClasATC)
write.csv2(corresp_cip13_spe_prod, paste0(chemin_save_sortie,"corresp_cip13_spe_prod.csv"))

# 4.2 BASE DETAIL SPE PRODUIT ----
corresp_spe_prod<-corresp_cip13_spe_prod
names(corresp_spe_prod) <- c("codeCIP13","SPECIALITE_CODEX", "codeCIS",  "codeProduit",  "PRODUIT_CODEX",  "codeClasATC")

# Traitement correspondances
# Suppression des doublons 
corresp_spe_prod<-corresp_spe_prod[,-c(1)] # 91487
corresp_spe_prod<-corresp_spe_prod[!duplicated(corresp_spe_prod),] #18686

corresp_cis_spe_prod <- corresp_spe_prod %>%
  group_by(codeCIS, SPECIALITE_CODEX, PRODUIT_CODEX)%>%
  summarise(n_codes_cip_spe=n()) # 18388
nrow(corresp_cis_spe_prod) # 18686

# Export
write.csv2(corresp_cis_spe_prod, paste0(chemin_save_sortie,"corresp_cis_spe_prod.csv"), row.names = FALSE)
write.csv2(corresp_cis_spe_prod, paste0(chemin_save_sortie,"corresp_cis_spe_prod.csv_utf8.csv"), row.names = FALSE, fileEncoding = "UTF-8")


corresp_spe_prod <- corresp_spe_prod %>%
  group_by(SPECIALITE_CODEX, PRODUIT_CODEX)%>%
  summarise(n_codes_cip_spe=n()) # 18388
nrow(corresp_spe_prod)

length(unique(corresp_spe_prod$SPECIALITE_CODEX)) # 18387 : 1 sp? corresp ? 2 pdts
# -> recodage NOLITERAX (ancien) en BIPRETERAX dans les deux bases
corresp_spe_prod$PRODUIT_CODEX[corresp_spe_prod$PRODUIT_CODEX=="NOLITERAX"]<-"BIPRETERAX"

corresp_spe_prod <- corresp_spe_prod %>%
  group_by(SPECIALITE_CODEX, PRODUIT_CODEX)%>%
  summarise(n_codes_cip_spe=n()) # 18387 = ok
nrow(corresp_spe_prod)

# Distribution du nombre de codes cip par sp?cialit?
quantile(corresp_spe_prod$n_codes_cip_spe, probs = seq(0,1,0.1))

# Export
write.csv2(corresp_spe_prod, paste0(chemin_save_sortie,"corresp_spe_prod.csv"))

# 4.3 BASE DETAIL CIP SPE PRODUIT SUBSTANCE ACTIVE ----
corresp_cip13_spe_prod_subs <- left_join(base_detail_cip, Substance_active_codevu, by=c("codeVU")) 
corresp_cip13_spe_prod_subs <- corresp_cip13_spe_prod_subs[,-c(1:3)]

# nom substance en majuscules / enlever doubles paranth?ses
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE<-toupper(corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE<- gsub("[(]{2}","(",corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE<- gsub("[)]{2}",")",corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)

corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "A", corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "I", corresp_cip13_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)

nrow(corresp_cip13_spe_prod_subs) # 125998

# Suppression des doublons 
corresp_cip13_spe_prod_subs<-corresp_cip13_spe_prod_subs[!duplicated(corresp_cip13_spe_prod_subs),]
nrow(corresp_cip13_spe_prod_subs) # pas de dblns

# Export
write.csv2(corresp_cip13_spe_prod_subs, paste0(chemin_save_sortie,"corresp_cip13_spe_prod_subs.csv"))

# list_cip_subs_codex
list_cip_subs_codex <- corresp_cip13_spe_prod_subs %>%
  group_by(codeCIP13,	codeCIP,	codeSubstance,	SUBSTANCE_CODEX_UNIQUE) %>%
  distinct()

# Export
write.csv2(list_cip_subs_codex, paste0(chemin_save_sortie,"list_cip_subs_codex.csv"))


# 4.4 BASE DETAIL SPE PRODUIT SUBSTANCE ACTIVE ----
corresp_spe_prod_subs <- left_join(base_detail_cip, Substance_active_codevu, by=c("codeVU"))

# Suppression des doublons 
corresp_spe_prod_subs<-corresp_spe_prod_subs[!duplicated(corresp_spe_prod_subs),]


corresp_spe_prod_subs <- corresp_spe_prod_subs %>%
  select("SPECIALITE_CODEX"=nomVU, "PRODUIT_CODEX"=nomProduit, SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  group_by(SPECIALITE_CODEX, PRODUIT_CODEX, SUBSTANCE_CODEX_UNIQUE, codeSubstance)%>%
  distinct()

# Mettre en majuscules les noms de susbtances
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE <- toupper(corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE<- gsub("[(]{2}","(",corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE<- gsub("[)]{2}",")",corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)

corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "E", corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "A", corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)
corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE  <- gsub("�", "I", corresp_spe_prod_subs$SUBSTANCE_CODEX_UNIQUE)

nrow(corresp_spe_prod_subs) # 25872

# Export
write.csv2(corresp_spe_prod_subs, paste0(chemin_save_sortie,"corresp_spe_prod_subs.csv"))


# 5. CONSITUTION TABLES HISTORISES ----
# 5.1 BASE_NOM_ANCIEN_ACTUEL (presentations) ----
base_nom_med_ancien_actuel <- left_join(HistoNomsVU2, VU2, by="codeVU")

# Export de la base base_nom_med_ancien_actuel
write.csv2(base_nom_med_ancien_actuel, paste0(chemin_save_sortie,"base_nom_med_ancien_actuel.csv"))

# 5.2 BASE_NOM_ANCIEN_ACTUEL_PRODUIT (produits) ----
# Base anciens noms de produits
Produit_histo2 <- Produit_histo %>% select(codeProduit, nomProduit)

# anciennes pr?sentations des anciens noms produi
pres_prod_anc <- HistoNomsVU[HistoNomsVU$codeProduit %in% Produit_histo2$codeProduit,]
pres_prod_anc <- pres_prod_anc %>% select(codeVU, "Anc_codeProduit"=codeProduit)

# ajout ancien nom Produit
codeVU_prod_anc <- left_join(pres_prod_anc, Produit_histo2, by=c(Anc_codeProduit="codeProduit"))
names(codeVU_prod_anc)[3]<-"Anc_nomProduit"

# ajout nouveau code Produit
codeVU_prod_anc <- left_join(codeVU_prod_anc, VU2[,c(1,3)], by="codeVU")

# ajout nouveau nom Produit
codeVU_prod_anc <- left_join(codeVU_prod_anc, Produit2, by="codeProduit")

# suppression des doublons
nom_prod_anc_nouv <- codeVU_prod_anc %>%
  distinct(Anc_codeProduit, Anc_nomProduit, codeProduit, nomProduit)

# s?lectionner ceux avec correspondance unique seulement
nom_prod_anc_nouv2 <- nom_prod_anc_nouv %>%
  group_by(Anc_nomProduit) %>%
  mutate(count=n()) %>%
  filter(count==1) %>%
  select(-count, codeProduit, Anc_codeProduit)

# Export
write.csv2(nom_prod_anc_nouv2, paste0(chemin_save_sortie,"base_nom_prod_ancien_actuel.csv"))

