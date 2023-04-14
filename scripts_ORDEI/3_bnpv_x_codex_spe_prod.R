# TITRE : CROISEMENT BASE DE TRAVAIL BNPV AVEC CODEX ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V7
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 06/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : variable MEDICAMENT en texte dans la base de travail bnpv, codes � r�cup�rer 
# pour aggr�gation
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : R�cup�rer le produit codex pour chaque sp�cialit�/produit de la bnpv. 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - bnpv_medicaments_clair.csv
# - corresp_spe_prod.csv
# - base_nom_med_ancien_actuel.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - spe_bnpv_spe_codex.csv = Cas BNPV cod�s en sp�cialit� pour lesquels la sp�cialit� a �t� retrouv� dans Codex
# - spe_bnpv_prod_codex.csv = Cas BNPV cod�s en sp�cialit� pour lesquels le produit a �t� retrouv� dans Codex
# - prod_bnpv_prod_codex.csv = Cas BNPV cod�s en produit pour lesquels le produit a �t� retrouv� dans Codex
# - spe_prod_bnpv_prod_codex.csv = Cas BNPV cod�s en sp�cialit�/produit pour lesquels le produit a �t� retrouv� dans Codex
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

# Fonction comptage de mots dans un string
nwords <- function(string, pseudo=F){
  ifelse( pseudo, 
          pattern <- "\\S+", 
          pattern <- "[[:alpha:]]+" 
  )
  str_count(string, pattern)
}

# 2. IMPORT DES DONNEES ----
base_nom_med_ancien_actuel <- read.csv2(paste0(chemin_acces,"base_nom_med_ancien_actuel.csv"), colClasses = c(rep("character",8)))
bnpv_medicaments_clair <- read.csv2(paste0(chemin_acces,"bnpv_medicaments_clair2.csv"), colClasses = "character")
corresp_spe_prod <- read.csv2(paste0(chemin_acces,"corresp_spe_prod.csv"))
base_nom_prod_ancien_actuel <- read.csv2(paste0(chemin_acces,"base_nom_prod_ancien_actuel.csv"))

corresp_spe_prod <- corresp_spe_prod[,-c(1,4)]


# 3. RETROUVER LES SPECIALITES DE LA BNPV DANS LA TABLE DE CORRESPONDANCE ----
# 3.1 Pr�paration de la base ----
# S�lection des cas avec m�dicament en sp�cialit� dans BNPV
bnpv_spe_clair <- bnpv_medicaments_clair[bnpv_medicaments_clair$TYPE=="Spécialité",] # 412 984
bnpv_spe_clair<- bnpv_spe_clair[apply(bnpv_spe_clair, 1, function(y) !all(is.na(y))),] # 412 984
length(unique(bnpv_spe_clair$MEDICAMENT)) # 10087

# Sp�cialit�s BNPV retrouv�s dans correspondance Codex
bnpv_spe_clair <- left_join(bnpv_spe_clair, corresp_spe_prod, by=c("MEDICAMENT"="SPECIALITE_CODEX"))
bnpv_spe_clair_retrouv_codex <- bnpv_spe_clair[!is.na(bnpv_spe_clair$PRODUIT_CODEX),] # 324152
bnpv_spe_clair_retrouv_codex$nomVU <- bnpv_spe_clair_retrouv_codex$MEDICAMENT


# Sp�cialit�s BNPV non retrouv�s dans correspondance Codex
nrow(bnpv_spe_clair[!bnpv_spe_clair$MEDICAMENT %in% corresp_spe_prod$SPECIALITE_CODEX,]) # 88832 obs
length(unique(bnpv_spe_clair$MEDICAMENT[!bnpv_spe_clair$MEDICAMENT %in% corresp_spe_prod$SPECIALITE_CODEX])) # 3087 m�dicaments
length(unique(bnpv_spe_clair$MEDICAMENT)) # 10087 sp� dans bnpv

bnpv_spe_clair_non_retrouv1 <- bnpv_spe_clair[!bnpv_spe_clair$MEDICAMENT %in% corresp_spe_prod$SPECIALITE_CODEX,]

# Liste des noms de sp�cialit� non retrouv�s
list_spe_non_retrouve1<-unique(bnpv_spe_clair$MEDICAMENT[!bnpv_spe_clair$MEDICAMENT %in% corresp_spe_prod$SPECIALITE_CODEX])
which(duplicated(list_spe_non_retrouve1)) # 0
list_spe_non_retrouve1 <- as.character(list_spe_non_retrouve1)

# 3.2 Utilisation des noms historiques des m�dicaments issue de Codex pour sp� non retrouv�s ----
# Voir si noms sp�cialit�s non retrouv�s pr�sents dans historique des noms
temp <- base_nom_med_ancien_actuel[base_nom_med_ancien_actuel$nomAncienVU %in% list_spe_non_retrouve1,]
# -> 1311 => il y a des dblns = nomAncien correspondant � 2 nouveaux noms
# si date_NOTIF > dateNom2 alors Sp� = Nom2, sinon Sp� = Nom1
# -> cr�ation de la table appropri�e
tab_ges_dbl_nomAnc_Nom2 <- temp %>% filter(doublons_nomAncienVU==1) %>%
  group_by(nomAncienVU) %>%
  mutate(DateNom2=max(as.Date(DateNom))) %>%
  filter(as.Date(DateNom)==DateNom2)  %>%
  mutate(Nom2=nomVU) %>%
  select(nomAncienVU, Nom2, DateNom2)

tab_ges_dbl_nomAnc_Nom1 <- temp %>% filter(doublons_nomAncienVU==1) %>%
  group_by(nomAncienVU) %>%
  mutate(DateNom1=min(as.Date(DateNom))) %>%
  filter(as.Date(DateNom)==DateNom1)  %>%
  mutate(Nom1=nomVU) %>%
  select(nomAncienVU, Nom1)

tab_ges_dbl_nomAnc <- left_join(tab_ges_dbl_nomAnc_Nom1, tab_ges_dbl_nomAnc_Nom2, by="nomAncienVU")
tab_ges_dbl_nomAnc$AnneeNom2<-substr(tab_ges_dbl_nomAnc$DateNom2,1,4)


# Affectation des nouveaux noms sans dblns d'anciens noms
table_nouv_nom_sans_dblns <- temp %>% filter(doublons_nomAncienVU==0) %>%
  select(nomAncienVU, nomVU)
bnpv_spe_clair_non_retrouv1 <- left_join(bnpv_spe_clair_non_retrouv1, table_nouv_nom_sans_dblns, by=c("MEDICAMENT"="nomAncienVU"))

# Gestion des doublons de nomAncien
# -> si annee notif > AnneeNom2 => Nom2 sinon Nom1
bnpv_spe_clair_non_retrouv1 <- left_join(bnpv_spe_clair_non_retrouv1, tab_ges_dbl_nomAnc, by=c("MEDICAMENT"="nomAncienVU"))

# affectation Nom2
bnpv_spe_clair_non_retrouv1$nomVU <-
  ifelse(!is.na(bnpv_spe_clair_non_retrouv1$Nom2) & is.na(bnpv_spe_clair_non_retrouv1$nomVU) & bnpv_spe_clair_non_retrouv1$ANNEE_NOTIF > bnpv_spe_clair_non_retrouv1$AnneeNom2,
         as.character(bnpv_spe_clair_non_retrouv1$Nom2), as.character(bnpv_spe_clair_non_retrouv1$nomVU))

# affectation Nom1
bnpv_spe_clair_non_retrouv1$nomVU <-
  ifelse(!is.na(bnpv_spe_clair_non_retrouv1$Nom2) & is.na(bnpv_spe_clair_non_retrouv1$nomVU) & bnpv_spe_clair_non_retrouv1$ANNEE_NOTIF <= bnpv_spe_clair_non_retrouv1$AnneeNom2,
         as.character(bnpv_spe_clair_non_retrouv1$Nom1), as.character(bnpv_spe_clair_non_retrouv1$nomVU))

# Gr�ce � l'historique des noms des m�dicaments
length(na.omit(bnpv_spe_clair_non_retrouv1$nomVU)) # 53227 cas avec medicaments retrouv�s
length(na.omit(bnpv_spe_clair_non_retrouv1$nomVU))/length(bnpv_spe_clair_non_retrouv1$nomVU) # soit 60% des cas sans sp�cialit�s

length(na.omit(unique(bnpv_spe_clair_non_retrouv1$nomVU))) # 1281 sp�cialit�s retrouv�s
length(na.omit(unique(bnpv_spe_clair_non_retrouv1$nomVU)))/length(na.omit(unique(bnpv_spe_clair_non_retrouv1$MEDICAMENT))) # soit 41% des sp� non retrouv�s intialement

bnpv_spe_clair_retrouv_hist <- bnpv_spe_clair_non_retrouv1[!is.na(bnpv_spe_clair_non_retrouv1$nomVU),] # 53227
length(na.omit(unique(bnpv_spe_clair_retrouv_hist$MEDICAMENT))) # 1303

# 3.3 Utilisation de l'analyse textuelle pour faire le matchage avec les noms dans Codex ----
bnpv_spe_clair_non_retrouv2 <- bnpv_spe_clair_non_retrouv1[is.na(bnpv_spe_clair_non_retrouv1$nomVU),]
nrow(bnpv_spe_clair_non_retrouv2) # 35605 
length(unique(bnpv_spe_clair_non_retrouv2$MEDICAMENT)) # 1784

# Tentative de regroupement par analyse textuelle
# Liste des sp�cialit�s non retrouv�s apr�s les �tapes pr�c�dentes : list_spe_non_retrouve_txt
list_spe_non_retrouve_txt<-unique(bnpv_spe_clair_non_retrouv2$MEDICAMENT)
list_spe_non_retrouve_txt <- as.character(list_spe_non_retrouve_txt) # 1784
list_spe_non_retrouve_txt<-as.data.frame(list_spe_non_retrouve_txt)

# Liste des sp�cialit�s pr�sentes dans codex
list_spe_corresp <- as.data.frame(as.character(corresp_spe_prod$SPECIALITE_CODEX))

# Sp�cialit�s non retrouv�s 
data_spe_non_retrouve_txt<-list_spe_non_retrouve_txt
names(data_spe_non_retrouve_txt)<-c("MEDICAMENT")
# Stockage du premier mot du nom de sp�cialit�
data_spe_non_retrouve_txt$WORD1_MED <- word(data_spe_non_retrouve_txt$MEDICAMENT, 1) # 1er mot
data_spe_non_retrouve_txt$WORD1_MED <- gsub(",","",data_spe_non_retrouve_txt$WORD1_MED) # enlever ,
# Retraitement du nom de sp�cialit� (enlever caract�res sp�ciaux, etc.)
data_spe_non_retrouve_txt$MEDICAMENT_TRT <- gsub("-","",as.character(data_spe_non_retrouve_txt$MEDICAMENT)) # enlever - (bloque pour extraction chiffre sinon)
data_spe_non_retrouve_txt$MEDICAMENT_TRT <- gsub("\\.(?!\\d)","",as.character(data_spe_non_retrouve_txt$MEDICAMENT_TRT), perl=TRUE) # enlever les . dans le nom sauf si marque de d�cimale (bloque pour extraction chiffre sinon)
data_spe_non_retrouve_txt$MEDICAMENT_TRT <- gsub("\\.",",",as.character(data_spe_non_retrouve_txt$MEDICAMENT_TRT)) # remplacer la marque d�cimale . par ,
# Stockage du premier chiffre apparaissant dans le nom de sp�cialit�
data_spe_non_retrouve_txt$CHIFFRE1_MED <- parse_number(as.character(data_spe_non_retrouve_txt$MEDICAMENT_TRT), locale = locale(decimal_mark = ",")) # extraction premier chiffre

# Pr�paration des variables pour stockage des mesures de similarit� des cha�nes de caract�res
data_spe_non_retrouve_txt$nomVU <- "XXXX"
data_spe_non_retrouve_txt$sim_osa <- NA
data_spe_non_retrouve_txt$sim_lcs <- NA
data_spe_non_retrouve_txt$sim_qgram <- NA
data_spe_non_retrouve_txt$sim_cosine <- NA
data_spe_non_retrouve_txt$sim_jaro <- NA
data_spe_non_retrouve_txt$sim_jaccard <- NA
#Pr�paration variable pour stockage de la situation observ�
data_spe_non_retrouve_txt$desc_retrouv <- "XXXX"

# Traitements similaires qu'au dessus sur les noms de sp�cialit� dans Codex
data_spe_corresp <- as.data.frame(list_spe_corresp)
names(data_spe_corresp)<-c("nomVU")
data_spe_corresp$WORD1 <- word(data_spe_corresp$nomVU, 1)
data_spe_corresp$WORD1 <- gsub(",","",data_spe_corresp$WORD1)
data_spe_corresp$nomVU_TRT <- gsub("-","",as.character(data_spe_corresp$nomVU))
data_spe_corresp$nomVU_TRT <- gsub("\\.(?!\\d)","",as.character(data_spe_corresp$nomVU_TRT), perl=TRUE)
data_spe_corresp$nomVU_TRT <- gsub("\\.",",",as.character(data_spe_corresp$nomVU_TRT))
data_spe_corresp$CHIFFRE1 <- parse_number(as.character(data_spe_corresp$nomVU_TRT), locale = locale(decimal_mark = ","))


# 3.4 Cr�ation des boucles d'affectation ---- 
# Limitation du p�rim�tre de recherche dans les tables -> on prend les match sur le premier mot en commun dans un premier temps
data_spe_corresp_use <- data_spe_corresp[data_spe_corresp$WORD1 %in% data_spe_non_retrouve_txt$WORD1_MED,] # 6538
data_spe_non_retrouve_txt_use <- data_spe_non_retrouve_txt[data_spe_non_retrouve_txt$WORD1_MED %in% data_spe_corresp$WORD1,] # 1501

for (i in 1 : nrow(data_spe_non_retrouve_txt_use)) {
  # -> S�lection sur le premier mot / chiffre (ou absence de chiffre) en commun
  med_rech_temp <- data_spe_non_retrouve_txt_use[i,]
  med_cor1_temp <- data_spe_corresp_use[data_spe_corresp_use$WORD1 %in% med_rech_temp$WORD1_MED &
                                          data_spe_corresp_use$CHIFFRE1 %in% med_rech_temp$CHIFFRE1_MED,]
  
# Etape 1 : Match sur les mots en majuscule + chiffre. Si plusieurs correspondances, affectation de 
# celle avec la similarit� la plus �lev�e (Levensthein)
  
  
  # -> M�mes mots en majuscule
  n_words_mot_rech <- nwords(as.character(med_rech_temp$MEDICAMENT), pseudo = T)
  mot_maj_rech_temp<-str_extract_all(word(med_rech_temp$MEDICAMENT,1,n_words_mot_rech), "\\b[A-Z]+\\b")
  mot_maj_rech_temp<-as.data.frame(mot_maj_rech_temp)
  names(mot_maj_rech_temp)<-c("MOTS_MAJ")
  
  if (nrow(med_cor1_temp)==0){
    data_spe_non_retrouve_txt_use$nomVU[i]<-NA
    data_spe_non_retrouve_txt_use$desc_retrouv[i]<-"Pas de corresp �tape 1"
    
  } else {
    
    for (j in 1 : nrow(med_cor1_temp)) {
      n_words_mot_corj <- nwords(as.character(med_cor1_temp$nomVU[j]), pseudo = T)
      mot_maj_cor_temp<-str_extract_all(word(as.character(med_cor1_temp$nomVU[j]),1,n_words_mot_corj), "\\b[A-Z]+\\b")
      mot_maj_cor_temp<-as.data.frame(mot_maj_cor_temp)
      names(mot_maj_cor_temp)<-c("MOTS_MAJ")
      med_cor1_temp$overlap[j]<-nrow(intersect(mot_maj_rech_temp,mot_maj_cor_temp))/max(nrow(mot_maj_cor_temp),nrow(mot_maj_rech_temp))
    }
    
    med_cor1_temp <- med_cor1_temp[med_cor1_temp$overlap==1,]
    
    if (nrow(med_cor1_temp)==0) {
      data_spe_non_retrouve_txt_use$nomVU[i]<-NA
      data_spe_non_retrouve_txt_use$sim_osa[i] <- NA
      data_spe_non_retrouve_txt_use$sim_lcs[i] <- NA
      data_spe_non_retrouve_txt_use$sim_qgram[i] <- NA
      data_spe_non_retrouve_txt_use$sim_cosine[i] <- NA
      data_spe_non_retrouve_txt_use$sim_jaro[i] <- NA
      data_spe_non_retrouve_txt_use$sim_jaccard[i] <- NA
      
      data_spe_non_retrouve_txt_use$desc_retrouv[i]<-"Pas de corresp �tape 1"
    } else if (nrow(med_cor1_temp)==1) {
      data_spe_non_retrouve_txt_use$nomVU[i] <- as.character(med_cor1_temp$nomVU[1])
      data_spe_non_retrouve_txt_use$sim_osa[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]))
      data_spe_non_retrouve_txt_use$sim_lcs[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]), method = "lcs")
      data_spe_non_retrouve_txt_use$sim_qgram[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]), method = "qgram")
      data_spe_non_retrouve_txt_use$sim_cosine[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]), method = "cosine")
      data_spe_non_retrouve_txt_use$sim_jaro[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]), method = "jw", p=0)
      data_spe_non_retrouve_txt_use$sim_jaccard[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i]), method = "jaccard")
      
      
      data_spe_non_retrouve_txt_use$desc_retrouv[i]<-"Corresp unique �tape 1"
    } else {
      med_cor1_temp$MEDICAMENT <- as.character(data_spe_non_retrouve_txt_use$MEDICAMENT[i])
      med_cor1_temp$similarit <- stringsim(as.character(med_cor1_temp$nomVU), as.character(med_cor1_temp$MEDICAMENT))
      med_cor1_temp <- med_cor1_temp[med_cor1_temp$similarit==max(med_cor1_temp$similarit),]
      data_spe_non_retrouve_txt_use$nomVU[i]<-as.character(med_cor1_temp$nomVU[1])
      data_spe_non_retrouve_txt_use$sim_osa[i] <- med_cor1_temp$similarit[1]
      data_spe_non_retrouve_txt_use$sim_lcs[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(med_cor1_temp$MEDICAMENT[1]), method = "lcs")
      data_spe_non_retrouve_txt_use$sim_qgram[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(med_cor1_temp$MEDICAMENT[1]), method = "qgram")
      data_spe_non_retrouve_txt_use$sim_cosine[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(med_cor1_temp$MEDICAMENT[1]), method = "cosine")
      data_spe_non_retrouve_txt_use$sim_jaro[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(med_cor1_temp$MEDICAMENT[1]), method = "jw", p=0)
      data_spe_non_retrouve_txt_use$sim_jaccard[i] <- stringsim(as.character(med_cor1_temp$nomVU[1]), as.character(med_cor1_temp$MEDICAMENT[1]), method = "jaccard")
      data_spe_non_retrouve_txt_use$desc_retrouv[i]<-"Corresp multiple �tape 1 - v�rifier"
      
    }
  }
  
  
}

nrow(data_spe_non_retrouve_txt_use[!is.na(data_spe_non_retrouve_txt_use$nomVU),]) # 497 retrouv�s

# /!\-> Il reste qlqs erreurs d'attribution sur l'affectation des pr�sentations (mais ok pour le produit)

# Ajout des nomVU retrouv�s dans bnpv_spe_clair_non_retrouv2
bnpv_spe_clair_non_retrouv2 <- bnpv_spe_clair_non_retrouv2[,-which(names(bnpv_spe_clair_non_retrouv2) %in% c("PRODUIT_CODEX","nomVU","Nom1","Nom2","DateNom2","AnneeNom2"))]
base_temps_join <- na.omit(data_spe_non_retrouve_txt_use[,c(1,5)])
bnpv_spe_clair_non_retrouv2 <- left_join(bnpv_spe_clair_non_retrouv2, base_temps_join, by="MEDICAMENT")

length(na.omit(bnpv_spe_clair_non_retrouv2$nomVU)) # 16517 cas avec m�dicament retrouv�
nrow(bnpv_spe_clair_non_retrouv2[is.na(bnpv_spe_clair_non_retrouv2$nomVU),]) # 19088 sans m�dicament retrouv�

bnpv_spe_clair_retrouv_txt <- bnpv_spe_clair_non_retrouv2[!is.na(bnpv_spe_clair_non_retrouv2$nomVU),]

bnpv_spe_clair_non_retrouv3 <- bnpv_spe_clair_non_retrouv2[is.na(bnpv_spe_clair_non_retrouv2$nomVU),]

# 3.5 Match unique sur premier mot ----
med_non_retrouv <- data_spe_non_retrouve_txt_use[is.na(data_spe_non_retrouve_txt_use$nomVU),]
# -> ensemble des "Pas de corresp �tape 1" (non retrouv�s en �tape 1)

# Etape 2 : Match unique sur le premier mot en majuscules

# Liste des m�dicaments dont premier mot n'appara�t qu'une fois pour ceux non retrouv�s
med_non_retrouv1 <- med_non_retrouv %>%
  group_by(WORD1_MED) %>%
  filter(n() == 1)

# Liste des m�dicaments dont premier mot n'appara�t qu'une fois pour corresp
data_spe_corresp1 <- data_spe_corresp %>%
  group_by(WORD1) %>%
  filter(n() == 1)

# Jointure - pour garder ceux avec match unique sur premier mot
med_join <- left_join(med_non_retrouv1, data_spe_corresp1, by=c("WORD1_MED"="WORD1"))

med_join_keep <- med_join[!is.na(med_join$nomVU.y),c(1,13)]
names(med_join_keep)[2]<- "nomVU"
med_join_keep <- med_join_keep %>% mutate_all(as.character)
# qlqs erreurs sur la forme mais �a marche plut�t bien

bnpv_spe_clair_retrouv3 <- left_join(bnpv_spe_clair_non_retrouv3[,!(names(bnpv_spe_clair_non_retrouv3) %in% c("nomVU"))], med_join_keep, by=c("MEDICAMENT"))
bnpv_spe_clair_word <- bnpv_spe_clair_retrouv3[!is.na(bnpv_spe_clair_retrouv3$nomVU),]
nrow(bnpv_spe_clair_word) # 3594
length(unique(bnpv_spe_clair_word$MEDICAMENT)) # 98

bnpv_spe_clair_non_retrouv4 <- bnpv_spe_clair_retrouv3[is.na(bnpv_spe_clair_retrouv3$nomVU),]
nrow(bnpv_spe_clair_non_retrouv4) # 15494
length(unique(bnpv_spe_clair_non_retrouv4$MEDICAMENT)) # 1189

# 3.6 Compilation des donn�es ----
# Nettoyage variables
names(bnpv_spe_clair_retrouv_codex)
names(bnpv_spe_clair_retrouv_hist)
names(bnpv_spe_clair_retrouv_txt)
names(bnpv_spe_clair_word)

bnpv_spe_clair_retrouv_codex <- bnpv_spe_clair_retrouv_codex[,!(names(bnpv_spe_clair_retrouv_codex) %in% c("PRODUIT_CODEX"))]
bnpv_spe_clair_retrouv_hist <- bnpv_spe_clair_retrouv_hist[,!(names(bnpv_spe_clair_retrouv_hist) %in% c("PRODUIT_CODEX", "Nom1", "Nom2", "DateNom2", "AnneeNom2"))]


# Compilation donn�es
bnpv_spe_clair_retrouv <- rbind(bnpv_spe_clair_retrouv_codex, bnpv_spe_clair_retrouv_hist, bnpv_spe_clair_retrouv_txt, bnpv_spe_clair_word)
nrow(bnpv_spe_clair_retrouv) # 397490
length(unique(bnpv_spe_clair_retrouv$MEDICAMENT)) # 8898

# Export de la base (sp�cialit�s retrouv�s dans Codex)
write.csv2(bnpv_spe_clair_retrouv, paste0(chemin_save_sortie,"spe_bnpv_spe_codex2.csv"), quote=TRUE)


# 4. RETROUVER LES PRODUITS DES SPECIALITES DE LA BNPV DANS LA TABLE DE CORRESPONDANCE ----
# 4.1 Pour les cas cod�s en sp�cialit� dont la sp�cialit� est retrouv� dans Codex
bnpv_spe_retrouv_prod <- bnpv_spe_clair_retrouv
bnpv_spe_retrouv_prod_retrouv <- left_join(bnpv_spe_retrouv_prod, corresp_spe_prod, by=c("nomVU"="SPECIALITE_CODEX") )
nrow(bnpv_spe_retrouv_prod_retrouv[!is.na(bnpv_spe_retrouv_prod_retrouv$PRODUIT_CODEX),]) # 397490 ok -> pdt retrouv� pour tous

# 4.2  Pour les cas cod�s en sp�cialit� dont la sp�cialit� n'a pas �t� retrouv� dans Codex
bnpv_spe_non_retrouv_prod <- bnpv_spe_clair_non_retrouv4

# Liste des produits dans codex
list_prod_corresp <- as.data.frame(unique(as.character(corresp_spe_prod$PRODUIT_CODEX)))
names(list_prod_corresp)<-"PRODUIT_CODEX"
list_prod_corresp$ind_codex<-1

# Etape 1 : Retrouver � partir du premier mot (ce dernier correspond souvent au produit)
# Extraction premier mot
bnpv_spe_non_retrouv_prod$WORD1_MED <- word(bnpv_spe_non_retrouv_prod$MEDICAMENT, 1)
bnpv_spe_non_retrouv_prod$WORD1_MED <- gsub(",","",bnpv_spe_non_retrouv_prod$WORD1_MED)

# Jointure
bnpv_spe_non_retrouv_prod <- left_join(bnpv_spe_non_retrouv_prod, list_prod_corresp, by=c("WORD1_MED"="PRODUIT_CODEX"))
bnpv_spe_non_retrouv_prod$PRODUIT_CODEX<-ifelse(bnpv_spe_non_retrouv_prod$ind_codex==1, bnpv_spe_non_retrouv_prod$WORD1_MED, NA)
bnpv_spe_non_retrouv_prod<-bnpv_spe_non_retrouv_prod[,!(names(bnpv_spe_non_retrouv_prod) %in% c("nomVU"))]

# Comptage
length(na.omit(bnpv_spe_non_retrouv_prod$PRODUIT_CODEX)) # 9688 cas : produits retrouv�s � partir du 1er mot
nrow(bnpv_spe_non_retrouv_prod[is.na(bnpv_spe_non_retrouv_prod$PRODUIT_CODEX),]) # 5806 cas : produit non retrouv�

# Tables des retrouv�s et non retrouv�s � l'issue de l'�tape 1
bnpv_spe_non_retrouv_prod_retrouv1 <- bnpv_spe_non_retrouv_prod[!is.na(bnpv_spe_non_retrouv_prod$PRODUIT_CODEX),]
bnpv_spe_non_retrouv_prod_non_retrouv1 <- bnpv_spe_non_retrouv_prod[is.na(bnpv_spe_non_retrouv_prod$PRODUIT_CODEX),]

# Etape 2 : Retrouver � partir du premier et second mot
bnpv_spe_non_retrouv_prod_non_retrouv1 <- bnpv_spe_non_retrouv_prod_non_retrouv1[,!(names(bnpv_spe_non_retrouv_prod) %in% c("WORD1_MED", "ind_codex"))]
bnpv_spe_non_retrouv_prod_non_retrouv1$WORD2_MED <- word(bnpv_spe_non_retrouv_prod_non_retrouv1$MEDICAMENT, 1, 2)
bnpv_spe_non_retrouv_prod_non_retrouv1$WORD2_MED <- gsub(",","",bnpv_spe_non_retrouv_prod_non_retrouv1$WORD2_MED)

# Jointure
bnpv_spe_non_retrouv_prod_non_retrouv1 <- left_join(bnpv_spe_non_retrouv_prod_non_retrouv1, list_prod_corresp, by=c("WORD2_MED"="PRODUIT_CODEX"))
bnpv_spe_non_retrouv_prod_non_retrouv1$PRODUIT_CODEX<-ifelse(bnpv_spe_non_retrouv_prod_non_retrouv1$ind_codex==1, bnpv_spe_non_retrouv_prod_non_retrouv1$WORD2_MED, NA)

# Comptage
length(na.omit(bnpv_spe_non_retrouv_prod_non_retrouv1$PRODUIT_CODEX)) # 686 cas : pdt retrouv� ap 1er et 2nd mot
nrow(bnpv_spe_non_retrouv_prod_non_retrouv1[is.na(bnpv_spe_non_retrouv_prod_non_retrouv1$PRODUIT_CODEX),]) # 5120 cas : pdt non retrouv�

# Tables des retrouv�s et non retrouv�s � l'issue de l'�tape 1 & 2
bnpv_spe_non_retrouv_prod_retrouv2 <- bnpv_spe_non_retrouv_prod_non_retrouv1[!is.na(bnpv_spe_non_retrouv_prod_non_retrouv1$PRODUIT_CODEX),]
bnpv_spe_non_retrouv_prod_non_retrouv2 <- bnpv_spe_non_retrouv_prod_non_retrouv1[is.na(bnpv_spe_non_retrouv_prod_non_retrouv1$PRODUIT_CODEX),]
colnames(bnpv_spe_non_retrouv_prod_non_retrouv2)

# Etape 3 : Retrouver � partir des 3 premiers mots
bnpv_spe_non_retrouv_prod_non_retrouv2 <- bnpv_spe_non_retrouv_prod_non_retrouv2[,!(names(bnpv_spe_non_retrouv_prod_non_retrouv2) %in% c("WORD2_MED","ind_codex"))]
bnpv_spe_non_retrouv_prod_non_retrouv2$WORD3_MED <- word(bnpv_spe_non_retrouv_prod_non_retrouv2$MEDICAMENT, 1, 3)
bnpv_spe_non_retrouv_prod_non_retrouv2$WORD3_MED <- gsub(",","",bnpv_spe_non_retrouv_prod_non_retrouv2$WORD3_MED)

# Jointure
bnpv_spe_non_retrouv_prod_non_retrouv2 <- left_join(bnpv_spe_non_retrouv_prod_non_retrouv2, list_prod_corresp, by=c("WORD3_MED"="PRODUIT_CODEX"))
bnpv_spe_non_retrouv_prod_non_retrouv2$PRODUIT_CODEX<-ifelse(bnpv_spe_non_retrouv_prod_non_retrouv2$ind_codex==1, bnpv_spe_non_retrouv_prod_non_retrouv2$WORD3_MED, NA)

# Comptage
length(na.omit(bnpv_spe_non_retrouv_prod_non_retrouv2$PRODUIT_CODEX)) # 754 cas : pdt retrouv� ap 3 premiers mots
nrow(bnpv_spe_non_retrouv_prod_non_retrouv2[is.na(bnpv_spe_non_retrouv_prod_non_retrouv2$PRODUIT_CODEX),]) # 4366 cas : pdt non retrouv�

# Tables des retrouv�s et non retrouv�s � l'issue de l'�tape 1 & 2 & 3
bnpv_spe_non_retrouv_prod_retrouv3 <- bnpv_spe_non_retrouv_prod_non_retrouv2[!is.na(bnpv_spe_non_retrouv_prod_non_retrouv2$PRODUIT_CODEX),]
bnpv_spe_non_retrouv_prod_non_retrouv3 <- bnpv_spe_non_retrouv_prod_non_retrouv2[is.na(bnpv_spe_non_retrouv_prod_non_retrouv2$PRODUIT_CODEX),]

# Etape 4 : Retrouver � partir des 4 premiers mots
colnames(bnpv_spe_non_retrouv_prod_non_retrouv3)
bnpv_spe_non_retrouv_prod_non_retrouv3 <- bnpv_spe_non_retrouv_prod_non_retrouv3[,!(names(bnpv_spe_non_retrouv_prod_non_retrouv3) %in% c("WORD3_MED","ind_codex"))]
bnpv_spe_non_retrouv_prod_non_retrouv3$WORD4_MED <- word(bnpv_spe_non_retrouv_prod_non_retrouv3$MEDICAMENT, 1, 4)
bnpv_spe_non_retrouv_prod_non_retrouv3$WORD4_MED <- gsub(",","",bnpv_spe_non_retrouv_prod_non_retrouv3$WORD4_MED)

# Jointure
bnpv_spe_non_retrouv_prod_non_retrouv3 <- left_join(bnpv_spe_non_retrouv_prod_non_retrouv3, list_prod_corresp, by=c("WORD4_MED"="PRODUIT_CODEX"))
bnpv_spe_non_retrouv_prod_non_retrouv3$PRODUIT_CODEX<-ifelse(bnpv_spe_non_retrouv_prod_non_retrouv3$ind_codex==1, bnpv_spe_non_retrouv_prod_non_retrouv3$WORD4_MED, NA)

# Comptage
length(na.omit(bnpv_spe_non_retrouv_prod_non_retrouv3$PRODUIT_CODEX)) # 107 cas : pdt retrouv� ap 3 premiers mots
nrow(bnpv_spe_non_retrouv_prod_non_retrouv3[is.na(bnpv_spe_non_retrouv_prod_non_retrouv3$PRODUIT_CODEX),]) # 4259 cas : pdt non retrouv�

# Tables des retrouv�s et non retrouv�s � l'issue de l'�tape 1 & 2 & 3
bnpv_spe_non_retrouv_prod_retrouv4 <- bnpv_spe_non_retrouv_prod_non_retrouv3[!is.na(bnpv_spe_non_retrouv_prod_non_retrouv3$PRODUIT_CODEX),]
bnpv_spe_non_retrouv_prod_non_retrouv4 <- bnpv_spe_non_retrouv_prod_non_retrouv3[is.na(bnpv_spe_non_retrouv_prod_non_retrouv3$PRODUIT_CODEX),]

# 4.3 Compilation de l'ensemble des cas o� produit retrouv�
names(bnpv_spe_retrouv_prod_retrouv)
names(bnpv_spe_non_retrouv_prod_retrouv1)
names(bnpv_spe_non_retrouv_prod_retrouv2)
names(bnpv_spe_non_retrouv_prod_retrouv3)
names(bnpv_spe_non_retrouv_prod_retrouv4)

bnpv_spe_prod_codex <- rbind(bnpv_spe_retrouv_prod_retrouv[,!(names(bnpv_spe_retrouv_prod_retrouv) %in% c("nomVU"))],
                             bnpv_spe_non_retrouv_prod_retrouv1[,!(names(bnpv_spe_non_retrouv_prod_retrouv1) %in% c("WORD1_MED","ind_codex"))],
                             bnpv_spe_non_retrouv_prod_retrouv2[,!(names(bnpv_spe_non_retrouv_prod_retrouv2) %in% c("WORD2_MED","ind_codex"))],
                             bnpv_spe_non_retrouv_prod_retrouv3[,!(names(bnpv_spe_non_retrouv_prod_retrouv3) %in% c("WORD3_MED","ind_codex"))],
                             bnpv_spe_non_retrouv_prod_retrouv4[,!(names(bnpv_spe_non_retrouv_prod_retrouv4) %in% c("WORD4_MED","ind_codex"))])

nrow(bnpv_spe_prod_codex) # 408725


# Export de la base - sp�cialit�s remmen�s au produit
write.csv2(bnpv_spe_prod_codex, paste0(chemin_save_sortie,"spe_bnpv_prod_codex2.csv"), quote=TRUE)


# 5. RETROUVER LES PRODUITS DE LA BNPV DANS LA TABLE DE CORRESPONDANCE ----

# S�lection des produits dans BNPV
bnpv_prod_clair <- bnpv_medicaments_clair[bnpv_medicaments_clair$TYPE=="Produit",] # 429 200
bnpv_prod_clair<- bnpv_prod_clair[apply(bnpv_prod_clair, 1, function(y) !all(is.na(y))),] # 429 200
length(unique(bnpv_prod_clair$MEDICAMENT)) # 5641 Produits dans BNPV

# Base de correspondance codex pour noms de produit
prod_codex <- unique(as.character(corresp_spe_prod$PRODUIT_CODEX)) # 9813
length(prod_codex)

# 5.1 Produits directement retrouv�s ----
# produits trouv�s dans codex
bnpv_prod_retrouv_prod_codex <- bnpv_prod_clair[bnpv_prod_clair$MEDICAMENT %in% prod_codex,] # 417 160
nrow(bnpv_prod_retrouv_prod_codex)
bnpv_prod_retrouv_prod_codex$PRODUIT_CODEX <- bnpv_prod_retrouv_prod_codex$MEDICAMENT
length(unique(bnpv_prod_retrouv_prod_codex$PRODUIT_CODEX)) # 4498 Produits dans BNPV retrouv�s dans codex

# produits non trouv�s dans codex
bnpv_prod_non_retrouv_prod <- bnpv_prod_clair[!bnpv_prod_clair$MEDICAMENT %in% prod_codex,] 
nrow(bnpv_prod_non_retrouv_prod) # 12040
length(unique(bnpv_prod_non_retrouv_prod$MEDICAMENT)) # 1143 Produits dans BNPV non retrouv�s dans codex

# 5.2 Historique nom Produit ----
# (seulement pour produits dont ensemble des pr�sentations ont chang� pour le m�me nom Produit)
base_nom_prod_ancien_actuel2 <-  base_nom_prod_ancien_actuel[,c(3,5)]
bnpv_prod_histo <- left_join(bnpv_prod_non_retrouv_prod,base_nom_prod_ancien_actuel2, by=c("MEDICAMENT"="Anc_nomProduit"))
nrow(bnpv_prod_histo) # 12040
length(unique(bnpv_prod_histo$MEDICAMENT)) # 1143

bnpv_prod_retrouv_histo <- bnpv_prod_histo[!is.na(bnpv_prod_histo$nomProduit),]
bnpv_prod_retrouv_histo<-rename(bnpv_prod_retrouv_histo, PRODUIT_CODEX=nomProduit )
nrow(bnpv_prod_retrouv_histo) # 5030
length(unique(bnpv_prod_retrouv_histo$MEDICAMENT)) # 429

bnpv_prod_non_retrouv_prod <- bnpv_prod_histo[is.na(bnpv_prod_histo$nomProduit),]
bnpv_prod_non_retrouv_prod <- bnpv_prod_non_retrouv_prod[,!(names(bnpv_prod_non_retrouv_prod) %in% c("nomProduit"))]
nrow(bnpv_prod_non_retrouv_prod) # 7010
length(unique(bnpv_prod_non_retrouv_prod$MEDICAMENT)) # 714


# 5.3 Produits retrouv�s gr�ce aux cha�nes alphanum�riques en majuscule ----
# stocker les mots en alphanum�riques en majuscules (sans les chiffres seuls) dans variable MEDICAMENT_MAJ
bnpv_prod_non_retrouv_prod$MEDICAMENT_MAJ_CHIFFRE <- str_extract_all(bnpv_prod_non_retrouv_prod$MEDICAMENT, '[0-9]+[A-Z]+|[A-Z]+[0-9]+|[A-Z]+')
bnpv_prod_non_retrouv_prod$MEDICAMENT_MAJ_CHIFFRE <- as.character(bnpv_prod_non_retrouv_prod$MEDICAMENT_MAJ_CHIFFRE)
bnpv_prod_non_retrouv_prod$MEDICAMENT_MAJ_CHIFFRE[bnpv_prod_non_retrouv_prod$MEDICAMENT_MAJ_CHIFFRE=="character(0)"] <- NA

# idem pour table de corresp codex
prod_codex <- as.data.frame(prod_codex)
names(prod_codex)<-"PRODUIT_CODEX"
prod_codex$PRODUIT_MAJ_CHIFFRE <- str_extract_all(prod_codex$PRODUIT_CODEX, '[0-9]+[A-Z]+|[A-Z]+[0-9]+|[A-Z]+')
prod_codex$PRODUIT_MAJ_CHIFFRE <- as.character(prod_codex$PRODUIT_MAJ_CHIFFRE)

# jointure sur MEDICAMENT_MAJ_CHIFFRE - PRODUIT_MAJ_CHIFFRE
bnpv_prod_non_retrouv_prod <- left_join(bnpv_prod_non_retrouv_prod, prod_codex, by=c("MEDICAMENT_MAJ_CHIFFRE"="PRODUIT_MAJ_CHIFFRE"))
length(na.omit(bnpv_prod_non_retrouv_prod$PRODUIT_CODEX)) # 1463 cas retrouv�s
nrow(bnpv_prod_non_retrouv_prod[!duplicated(bnpv_prod_non_retrouv_prod$MEDICAMENT) & !is.na(bnpv_prod_non_retrouv_prod$PRODUIT_CODEX),]) # 24 produits retrouv�s

# Produits retrouv�s
bnpv_prod_retrouv_prod2 <- bnpv_prod_non_retrouv_prod[!is.na(bnpv_prod_non_retrouv_prod$PRODUIT_CODEX),!(names(bnpv_prod_non_retrouv_prod) %in% c("MEDICAMENT_MAJ_CHIFFRE"))]
nrow(bnpv_prod_retrouv_prod2) # 1463
length(unique(bnpv_prod_retrouv_prod2$MEDICAMENT)) # 24
names(bnpv_prod_non_retrouv_prod)
# Produits non retrouv�s
bnpv_prod_non_retrouv_prod2 <- bnpv_prod_non_retrouv_prod[is.na(bnpv_prod_non_retrouv_prod$PRODUIT_CODEX),!(names(bnpv_prod_non_retrouv_prod) %in% c("MEDICAMENT_MAJ_CHIFFRE", "PRODUIT_CODEX"))]
nrow(bnpv_prod_non_retrouv_prod2) # 5547
length(unique(bnpv_prod_non_retrouv_prod2$MEDICAMENT)) # 690


# 5.4 Produits retrouv�s dans les produits codex compos�s d'un seul mot
# Essayer de retrouver les produits en un seul mot dans codex mais plusieurs mots dans bnpv
prod_codex_1mot <- prod_codex[prod_codex$PRODUIT_CODEX==prod_codex$PRODUIT_MAJ_CHIFFRE,] # 3963
nrow(prod_codex_1mot)
bnpv_prod_non_retrouv_prod2$MEDICAMENT_MOT1 <- word(bnpv_prod_non_retrouv_prod2$MEDICAMENT,1)

# jointure sur MEDICAMENT_MAJ - PRODUIT_MAJ
bnpv_prod_non_retrouv_prod2 <- left_join(bnpv_prod_non_retrouv_prod2, prod_codex_1mot, by=c("MEDICAMENT_MOT1"="PRODUIT_MAJ_CHIFFRE"))
length(na.omit(bnpv_prod_non_retrouv_prod2$PRODUIT_CODEX)) # 608 cas retrouv�s
nrow(bnpv_prod_non_retrouv_prod2[!duplicated(bnpv_prod_non_retrouv_prod2$MEDICAMENT) & !is.na(bnpv_prod_non_retrouv_prod2$PRODUIT_CODEX),]) # 36 produits retrouv�s

# Produits retrouv�s / non retrouv�s
bnpv_prod_retrouv_prod3 <- bnpv_prod_non_retrouv_prod2[!is.na(bnpv_prod_non_retrouv_prod2$PRODUIT_CODEX),!(names(bnpv_prod_non_retrouv_prod2) %in% c("MEDICAMENT_MOT1"))]
bnpv_prod_non_retrouv_prod3 <- bnpv_prod_non_retrouv_prod2[is.na(bnpv_prod_non_retrouv_prod2$PRODUIT_CODEX),!(names(bnpv_prod_non_retrouv_prod2) %in% c("MEDICAMENT_MOT1"))]
nrow(bnpv_prod_non_retrouv_prod3) # 4939 cas non retrouv�s
length(unique(bnpv_prod_non_retrouv_prod3$MEDICAMENT)) # 654 produits

list_prod_non_retrouv <- bnpv_prod_non_retrouv_prod3 %>%
  group_by(MEDICAMENT) %>%
  summarise(n_cas=n())

# Export list_prod_non_retrouv
write.csv2(list_prod_non_retrouv, paste0(chemin_save_sortie,"list_prod_non_retrouv_bnpv_codex.csv"))


# 5.5 Compilation ----
bnpv_prod_prod_codex <- rbind(bnpv_prod_retrouv_prod_codex,bnpv_prod_retrouv_histo,
                              bnpv_prod_retrouv_prod2,bnpv_prod_retrouv_prod3)

nrow(bnpv_prod_prod_codex) # 424261
length(unique(bnpv_prod_prod_codex$MEDICAMENT)) #4987

# Export de la base 
write.csv2(bnpv_prod_prod_codex, paste0(chemin_save_sortie,"prod_bnpv_prod_codex.csv"), quote=TRUE)


# 6. COMPILATION POUR LA BASE FINALE ----
# Compilation des tables produits
names(bnpv_spe_prod_codex)
names(bnpv_prod_prod_codex)

bnpv_produit_codex <- rbind(bnpv_spe_prod_codex, bnpv_prod_prod_codex)
nrow(bnpv_produit_codex) # 832986

# Supprimer les cas ayant pris plusieurs m�dicaments correspondant au m�me produit
bnpv_produit_codex <- bnpv_produit_codex %>%
  group_by(AER_ID, CAS, VER, PRODUIT_CODEX) %>%
  filter(row_number()==1)

nrow(bnpv_produit_codex) # 827657


# Export de la base : cas cod�s en sp�cialit�s et produits remmen�s � produit dans codex
write.csv2(bnpv_produit_codex, paste0(chemin_save_sortie,"spe_prod_bnpv_prod_codex2.csv"), quote=TRUE)



