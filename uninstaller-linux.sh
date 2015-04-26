#!/bin/bash
# (File name: uninstaller-linux.sh)

## This shell script uninstalls MoeCalc.
## Please run following command for MoeCalc uninstallation.
## sudo ./uninstaller-linux.sh
##
## This script is performing following:
## * Delete  moecalc.desktop and /opt/MoeCalc directory.
## * Delete MoeCalc PATH config in ~/.profile.

rm ~/.local/share/applications/moecalc.desktop
rm -rf /opt/MoeCalc

sed -i '/export PATH=$PATH:\/opt\/MoeCalc/d' ~/.profile
