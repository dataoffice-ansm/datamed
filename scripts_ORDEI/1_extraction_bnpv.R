# TITRE : PREPARATION BASE DE TRAVAIL BNPV ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V6
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 03/05/2021
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : Les bases de donn�es BNPV ont �t� envoy�es par Khodor. Il s'agit de l'extraction Excel
# 20200702 - Cas BNPV 2009-2018 - 4 Onglets
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : Constitution des bases de travail BNPV contenant les donn�es des cas par m�dicament n�toy�
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# Fichier Excel 20200702 - Cas BNPV 2009-2018 - 4 Onglets.xlsx, avec les onglets :
# - Cas - Patients
# - Effets
# - M�dicaments
# - Notificateur
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - bnpv_medicaments_clair.csv 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc�s aux donn�es 
chemin_acces <- ""

# Chemin vers le dossier de sauvegarde souhait�
chemin_save_sortie <- ""

# PROGRAMME  ----
# 1. LIBRAIRIES ET FONCTIONS  ----
library("dplyr")
library("readxl")
library("stringr")

# 2. IMPORT DES DONNEES ----

cas_patients <- read.csv2(paste0(chemin_acces,"20230216 - Cas-Patients.csv"), quote = "", check.names=FALSE)
effets <- read.csv2(paste0(chemin_acces,"20230216 - Effets.csv"))
medicaments <- read.csv2(paste0(chemin_acces,"20230216 - Médicaments.csv"))

# 3. DESCRIPTION DES TABLES ----
# 3.1 Cas - Patients ----
summary(cas_patients)
apply(cas_patients, 2, function(col)(sum(is.na(col))/length(col))*100) # compl�tude

# 3.2 Effets ----
summary(effets)
apply(effets, 2, function(col)(sum(is.na(col))/length(col))*100) # compl�tude

# 3.3 M�dicaments ----
summary(medicaments)
apply(medicaments, 2, function(col)(sum(is.na(col))/length(col))*100) # compl�tude

# 3.4 Notificateurs ----
summary(notificateurs)
apply(notificateurs, 2, function(col)(sum(is.na(col))/length(col))*100) # compl�tude

# 4. SELECTION DES VARIABLES, RECODAGES ET FILTRAGES ----

# 4.1 Effets ----
# Description : Diff�rents formats de la date de d�but (DATE_DEB) 
table(nchar(effets$DATE_DEB))/length(effets$DATE_DEB)*100 # 6=//YYYY, 8=/MM/YYYY 10=JJ/MM/YY
length(effets$DATE_DEB[is.na(effets$DATE_DEB)])/length(effets$DATE_DEB)*100 # DATE_DEB=NA

# 4.2 Cas - Patients ----
# s�lection variables
cas_patients2 <- cas_patients %>% select(AER_ID, CAS, VER, NOTIF, SEXE, AGE, U_AGE, DATE_NAISS, TYP_NOTIF, TYP_EFFET, GRAVE, DECES, PRO_V, HOSPI, INCAP, ANO_C, AUTRE)
table(nchar(cas_patients2$NOTIF))/length(cas_patients2$NOTIF)*100 # 10=JJ/MM/YY => 100%
# format AGE, description et correction ages aberrants
cas_patients2$AGE<-as.numeric(gsub(",",".",cas_patients2$AGE))
quantile(cas_patients2$AGE, na.rm=T) # -> valeur abberante (702 ans)
cas_patients2$AGE[cas_patients2$AGE>125]<-NA

nrow(cas_patients2[is.na(cas_patients2$AGE),]) # 12386

# Cr�ation de la variable AGE2 :
# - Si AGE en ann�es -> AGE2=round(AGE) car il y a des chiffres � virgule
# - Si AGE en mois -> AGE2=round(AGE/12) en ann�es
# - Si AGE en semaines -> AGE2=0
# - Si AGE absent -> AGE2 = ann�e(NOTIF) - ann�e(DATE_NAISS)
cas_patients2$AGE2<-as.numeric(round(as.numeric(cas_patients2$AGE)))
cas_patients2$AGE2[cas_patients2$U_AGE %in% c("MOIS")]<-round(cas_patients2$AGE2[cas_patients2$U_AGE %in% c("MOIS")]/12)
cas_patients2$AGE2[cas_patients2$U_AGE %in% c("SEMAINES")]<-0
cas_patients2$AGE2[cas_patients2$U_AGE %in% c("HEURES")]<-0
cas_patients2$AGE2[cas_patients2$U_AGE %in% c("JOURS")]<-0
nrow(cas_patients2[is.na(cas_patients2$AGE2),]) # 12 380 lignes avec �ge manquant

# calcul de l'�ge � partir de la date de notif et la date de naissance pour les manquants 
cas_patients2$AGE2[is.na(cas_patients2$AGE2)] <- as.numeric(str_sub(cas_patients2$NOTIF[is.na(cas_patients2$AGE2)],start=-4)) - as.numeric(str_sub(cas_patients2$DATE_NAISS[is.na(cas_patients2$AGE2)],start=-4))

# valeurs ab�rantes g�n�r�es (date de naissance < 1990 + date_naiss > date_notif)
cas_patients2$AGE2[cas_patients2$AGE2>125 | cas_patients2$AGE2<0]<-NA
nrow(cas_patients2[is.na(cas_patients2$AGE2),]) # 4 656 lignes avec �ge manquant (non r�cup�rable)
quantile(cas_patients2$AGE2, na.rm=TRUE)

# cleaner au niveau des variables
cas_patients2 <- cas_patients2 %>% select(AER_ID, CAS, VER, NOTIF, "AGE"=AGE2, SEXE, TYP_NOTIF, TYP_EFFET, GRAVE, DECES, PRO_V, HOSPI, INCAP, ANO_C, AUTRE)

# v�rif TYP_NOTIF
table(cas_patients2$TYP_NOTIF)
nrow(cas_patients2[is.na(cas_patients2$TYP_NOTIF),]) # 1100 Nas -> codage en Inconnu
# recodage en notif inconnu
cas_patients2$TYP_NOTIF[is.na(cas_patients2$TYP_NOTIF)] <- "Inconnu"
table(cas_patients2$TYP_NOTIF)/nrow(cas_patients2)*100

# 4.3 M�dicaments ----
# s�lection variables
medicaments2 <- medicaments %>% select(AER_ID, CAS, VER, MEDICAMENT, TYPE)
table(medicaments2$TYPE)/nrow(medicaments2) # 42% Pdt, 40% Sp�, 18% Subs, <1% NA
length(unique(na.omit(medicaments2$MEDICAMENT)))  # 18 339 occurences diff�rentes


# 5 - JOINTURES / CONSITUTION DES BASES DE TRAVAIL ----
# 5.1 Entre notificateurs2 et cas_patients2 ----
cas_patients2$VER <- as.character(cas_patients2$VER)
cas_pat_not <- cas_patients2

# codage des classes d'�ge (classes de 10 ans)
cas_pat_not$AGE_CAT<-NA
cas_pat_not$AGE_CAT[cas_pat_not$AGE<10]<-0
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=10 & cas_pat_not$AGE<20]<-10
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=20 & cas_pat_not$AGE<30]<-20
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=30 & cas_pat_not$AGE<40]<-30
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=40 & cas_pat_not$AGE<50]<-40
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=50 & cas_pat_not$AGE<60]<-50
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=60 & cas_pat_not$AGE<70]<-60
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=70 & cas_pat_not$AGE<80]<-70
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=80 & cas_pat_not$AGE<90]<-80
cas_pat_not$AGE_CAT[cas_pat_not$AGE>=90]<-90

# 5.2 Entre cas_pat_not et medicaments2 ----
medicaments2$VER <- as.character(medicaments2$VER)
cas_pat_not_med <- left_join(cas_pat_not, medicaments2, by=c("AER_ID", "CAS", "VER")) 

# cleaner
nrow(cas_pat_not_med) # 1041960
# -> m�dicament manquant : 1041784
cas_pat_not_med2 <- cas_pat_not_med[!is.na(cas_pat_not_med$MEDICAMENT),]
nrow(cas_pat_not_med2) 
# -> Age manquant ou aberrant
cas_pat_not_med2 <- cas_pat_not_med2[!is.na(cas_pat_not_med2$AGE),] # 1034303
nrow(cas_pat_not_med2) 

# -> Sexe manquant
cas_pat_not_med2 <- cas_pat_not_med2[!is.na(cas_pat_not_med2$SEXE),] # 1031866
nrow(cas_pat_not_med2) 
levels(factor(cas_pat_not_med2$SEXE)) # ok

# suppression des cas non fran�ais ou survenues hors France (=> PAYS_SURVENUE / PAYS_CAS)
cas_pat_not_med2 <- cas_pat_not_med2[cas_pat_not_med2$PAYS_SURVENUE %in% c("France") & cas_pat_not_med2$PAYS_CAS %in% c("France"),] 
nrow(cas_pat_not_med2) # 1029987

# -> Enlever les doublons
cas_pat_not_med2 <- cas_pat_not_med2[!duplicated(cas_pat_not_med2[,c("AER_ID", "CAS", "VER", "MEDICAMENT")]),] # 
nrow(cas_pat_not_med2) # 1024530

# -> Enlever Type m�dicament manquant
cas_pat_not_med2 <- cas_pat_not_med2[(factor(cas_pat_not_med2$TYPE))!="NA",] 
nrow(cas_pat_not_med2) # 1024414

# -> Enlever NOTIF < 2009 ou > 2018
cas_pat_not_med2$ANNEE_NOTIF<-str_sub(cas_pat_not_med2$NOTIF,-4,-1)
# cas_pat_not_med2 <- cas_pat_not_med2[cas_pat_not_med2$ANNEE_NOTIF>=2009 & cas_pat_not_med2$ANNEE_NOTIF<=2018,] 
cas_pat_not_med2 <- cas_pat_not_med2[cas_pat_not_med2$ANNEE_NOTIF>=2014 & cas_pat_not_med2$ANNEE_NOTIF<=2023,] 
nrow(cas_pat_not_med2) # 1022400

# Descriptif, nbre de cas par granularit� m�dicament
table(cas_pat_not_med2$TYPE)

# Export de la base ----
write.csv2(cas_pat_not_med2, paste0(chemin_save_sortie,"bnpv_medicaments_clair2.csv"), row.names = FALSE, quote=TRUE)



