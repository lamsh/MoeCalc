#!/bin/bash
# (File name: installer-linux.sh)

## This shell script installs MoeCalc.
## Please run following command for MoeCalc installation.
## sudo ./installer-linux.sh
##
## This script is performing following:
## * Copy moecalc.desktop and this directory.
## * Link /opt/MoeCalc/moecalc to /usr/bin/moecalc
##
## After run this script, you can find MoeCalc app in DASH or run MoeCalc by following command in terminal:
## moecalc

cp ./moecalc.desktop ~/.local/share/applications/
mkdir -p /opt/MoeCalc
cp -r ./* /opt/MoeCalc/
ln -s /opt/MoeCalc/moecalc /usr/bin/
