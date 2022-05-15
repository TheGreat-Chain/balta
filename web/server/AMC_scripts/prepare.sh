#!/bin/bash

# Preparation du QCM à partir d'un fichier .tex.
# Utilisation : ./prepare.sh file.tex

$QCM = $1
auto-multiple-choice prepare --mode s --prefix ./ ./$QCM \
    --out-sujet DOC-subject.pdf \
    --out-corrige DOC-correction.pdf \
    --data ./data \
    --out-calage DOC-calage.xy

# DOC-subject.pdf is a file containing all copies.
# DOC-correction.pdf is a file with the correct answer checked so you can review the answers.
# DOC-calage.xy is the position file.