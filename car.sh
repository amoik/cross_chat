#!/bin/bash

#ausführbar machen nicht vergessen! "chmod +x car.sh"

#pfad zur android-sdk(MUSS ANGEPASST WERDEN!)
export ANDROID_HOME=/home/anti88/Festplatte/ANDROID/sdk/

#FOLGENDE KOMMENTARE DIENEN ZUR HILFESTELLUNG BEI DER ERSTINSTALLATION

#installation von cordova per NPM(muss auf dem system installiert sein)
#sudo npm install -g cordova

#zum erstellen eines neuen projekts
#cordova create PROJEKTNAME com.DOMAIN.APP APPNAME
#cd APPNAME

#android zum projekt hinzufügen
#cordova platform add android

#IOS sollte vermute ich mal so aussehen:
#cordova platform add ios

#erstellt projekt für alle hinzugefügten plattformen
#cordova build

#startet app auf android
#cordova run android

#hinzufügen des kamera plugins
#cordova plugin add cordova-plugin-camera

#sollte der fehler [INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES] auftreten
#muss die app per hand von dem gerät entfernt werden

#ENDE DER HILFSKOMMENTARE



COLOR_ERROR='\033[0;31m'
COLOR_NONE='\033[0m'
COLOR_SUCCESS='\033[0;32m'
COLOR_WARNING='\033[1;33m'
COLOR_INFO='\033[1;33m'

cordova build android > build.log

if [ $? != 0 ]; then
	cat build.log
	printf "${COLOR_ERROR}Build schlug Fehl!${COLOR_NONE}\n"
	exit
fi
printf "${COLOR_SUCCESS}Build erfolgreich!${COLOR_NONE}\n"

cordova run android > run.log

if [ $? != 0 ]; then
	cat run.log
	printf "${COLOR_ERROR}Run schlug Fehl!${COLOR_NONE}\n"
	exit
fi
printf "${COLOR_SUCCESS}Run erfolgreich!${COLOR_NONE}\n"

