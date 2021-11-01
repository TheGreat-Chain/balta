#!/bin/bash

# Garde les copies de côté pour pouvoir 
# les remontrer aux étudiants en générant pdf avec
# genererPDFcopie.sh
# Utilisation : ./garderCopies.sh

auto-multiple-choice annote --projet ./ --data ./data --fich-noms students-list.csv

