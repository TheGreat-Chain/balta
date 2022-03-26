#!/bin/bash

# Génère un pdf de la copie des étudiants et de leurs réponses 
# dans le répertoire cr/corrections/pdf/

# Utilisation : ./genererPDFcopies.sh fichierSource

$QCM = $1
auto-multiple-choice regroupe --projet ./ --sujet DOC-subject.pdf --fich-noms students-list.csv --tex-src $QCM --compose