#!/bin/bash
# (File name: uninstaller-linux.sh)

## This shell script uninstalls MoeCalc.
## Please run following command for MoeCalc uninstallation.
## sudo ./uninstaller-linux.sh
##
## This script is performing following:
## * Delete  moecalc.desktop and /opt/MoeCalc directory.
## * Delete /usr/bin/moecalc.

rm ~/.local/share/applications/moecalc.desktop
rm -rf /opt/MoeCalc
rm /usr/bin/moecalc
