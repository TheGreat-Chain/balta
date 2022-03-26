#!/bin/bash

# Extract the scoring from source .tex file.
# Utilisation : ./extractScoring.sh file.tex

$QCM = $1
auto-multiple-choice prepare --mode b --prefix ./ ./$QCM --data ./data/

