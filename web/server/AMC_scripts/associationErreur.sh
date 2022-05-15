#!/bin/bash

# Associe une copie à un étudiant.
# A utiliser si l'étudiant s'est trompé lorsqu'il a entré 
# son ID.

# Utilisation : ./associationErreur.sh numeroCopie idEtudiant

$numeroCopie = $1
$idEtudiant = $2

auto-multiple-choice association --data ./data --list
auto-multiple-choice association --data ./data --set --student $numeroCopie --id $idEtudiant

