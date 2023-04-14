# TITRE : CROISEMENT SNDS AVEC CODEX ----
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# VERSION : V1
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# DATE CREATION PROGRAMME : 06/05/2022
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# AUTEUR : Tim Vlaar
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# CONTEXTE : SNDS (nbre de conso par �ge/sexe/ann�e) cod� par code substance 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# OBJECTIF : V�rifier la concordance des substances trouv�s dans SNDS avec CODEX - ajout des infos
# Codex � la table finale et aggr�gation
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN ENTREE : 
# - AGG_DCIR_SUBST_2014.csv
# - AGG_DCIR_SUBST_2015.csv
# - AGG_DCIR_SUBST_2016.csv
# - AGG_DCIR_SUBST_2017.csv
# - AGG_DCIR_SUBST_2018.csv
# - corresp_cip13_spe_prod_subs.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# BASES EN SORTIE : 
# - snds2014_2018_sa_agg.csv
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# PARAMETRES UTILISATEUR  ----
# Chemin d'acc�s aux donn�es SNDS
chemin_acces_snds <- ""

# Chemin d'acc�s aux autres donn�es
chemin_acces <- ""

# Chemin vers le dossier de sauvegarde souhait�
chemin_save_sortie <- ""



# 1. LIBRAIRIES ET FONCTIONS ----
library("dplyr")


# 2. IMPORT ET MISE EN FORME DES DONNEES ----
# 2.1 Import des donn�es
# Import SNDS de 2014 � 2018
for (i in 2014:2018){
  nom_table <- paste0("AGG_DCIR_SUBST_",i)
  nom_table_import <- paste0("AGG_DCIR_SUBST_", i, ".csv")
  table_importe <- read.csv2(paste0(chemin_acces_snds,nom_table_import), colClasses = "character")
  table_importe$annee <- i
  assign(nom_table, table_importe)
}


# Import corresp 
corresp_cip13_spe_prod_subs <- read.csv2(paste0(chemin_acces,"corresp_cip13_spe_prod_subs.csv"),colClasses = c("codeCIP13"="character", "codeSubstance"="character"))
corresp_cip13_spe_prod_subs<-corresp_cip13_spe_prod_subs[,-c(1)]

# 2.2 Compilation des donn�es SNDS
snds2014_2018 <- rbind(AGG_DCIR_SUBST_2014, AGG_DCIR_SUBST_2015, AGG_DCIR_SUBST_2016, AGG_DCIR_SUBST_2017,
                       AGG_DCIR_SUBST_2018)

nrow(snds2014_2018) #44686
nrow(AGG_DCIR_SUBST_2014)+nrow(AGG_DCIR_SUBST_2015)+nrow(AGG_DCIR_SUBST_2016)+nrow(AGG_DCIR_SUBST_2017)+nrow(AGG_DCIR_SUBST_2018)
# 44686 : OK
snds2014_2018[snds2014_2018$COUNT=="",c(3)]<-0
snds2014_2018$COUNT<-as.numeric(snds2014_2018$COUNT)
sum(snds2014_2018$COUNT) # 3575438118


# 2.3 Base correspondance codeSusbstance-SUBSTANCE_CODEX_UNIQUE
corresp_codsubs_subs <- corresp_cip13_spe_prod_subs %>%
  select(SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance) %>%
  distinct()


# 3. AFFECTATION SUBSTANCE_CODEX_UNIQUE A DONNEES SNDS ----
snds2014_2018_subs <- left_join(snds2014_2018, corresp_codsubs_subs, by=c("codeSubstance"))
nrow(snds2014_2018_subs) # 44686
nrow(snds2014_2018) # 44686

nrow(snds2014_2018_subs[is.na(snds2014_2018_subs$SUBSTANCE_CODEX_UNIQUE),]) # 0 ok

# Renommer et retenir variables
snds2014_2018_subs<- snds2014_2018_subs[,-c(6,7)]
names(snds2014_2018_subs)<-c("AGE","sexe","nbc","annee", "codeSubstance","SUBSTANCE_CODEX_UNIQUE")

# Aggr�ger par substance (normalement pas besoin)
snds2014_2018_subs_agg <- snds2014_2018_subs %>%
  group_by(SUBSTANCE_CODEX_UNIQUE, codeSubstance, annee, sexe, AGE) %>%
  summarise(n_conso=sum(nbc)) # ok

# Export
write.csv2(snds2014_2018_subs_agg, paste0(chemin_save_sortie,"snds2014_2018_subs_agg.csv"), quote=TRUE)

