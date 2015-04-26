#!/bin/bash
# (File name: installer-linux.sh)

## This shell script installs MoeCalc.
## Please run following command for MoeCalc installation.
## sudo ./installer-linux.sh
##
## This script is performing following:
## * Copy moecalc.desktop and this directory.
## * If 'moecalc' word is exsiting ~/.profile, append PATH config.
##
## After run this script, login again. You can find MoeCalc app in DASH.

cp ./moecalc.desktop ~/.local/share/applications/

mkdir -p /opt/MoeCalc
cp -r ./* /opt/MoeCalc/

if grep -iq 'moecalc' ~/.profile; then
  exit
else
  echo 'export PATH=$PATH:/opt/MoeCalc' >> ~/.profile
fi
