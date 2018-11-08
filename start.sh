#!/bin/bash

giterror=0

fixgiterror()
{
	git stash
}

fixgiterroragain()
{
	{
		cp ./resources/dotgit.tar.gz dotgit.tar.gz
		rm -rf .git
		tar -xzvf dotgit.tar.gz
		rm -f dotgit.tar.gz	
	}||{
		wget https://raw.githubusercontent.com/upandeltd/kcs_forwarder/dev/resources/dotgit.tar.gz -O dotgit.tar.gz
		rm -rf .git
		tar -xzvf dotgit.tar.gz
		rm -f dotgit.tar.gz
	}
}

gitpull()
{
	#
	if [ $giterror = 2 ];then
		return 1
	fi
	failedtopull=0
	{
	if [ $ENVIRONMENT = 'dev' ]; then
		{ # try
	    	git pull origin devfeb
		} || { # catch
			failedtopull=1
		}
	else
		{ # try
	    	#git pull origin
	    	git fetch --all
	    	git reset --hard origin/master
	    	#git pull origin master
		} || { # catch
			failedtopull=1
		}
	fi
	}||{

		fixgiterroragain
		git fetch --all
	    git reset --hard origin/master
	}
	if [ $failedtopull = 1 ] && [ $giterror = 0 ];then
		giterror=1
		fixgiterror
		gitpull
	else
		if [ $failedtopull = 1 ] && [ $giterror = 1 ];then
		giterror=2
		fixgiterroragain
		gitpull
		yarn install	#assume modules are also broken
		fi
	fi
}

# setdate()
# {
# 	date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d' ' -f5-8)Z"
# }

#we do not need to run this over and over in single device
#but we do need to run it in new devices...
updatemodules()
{
	#yarn add  node-html-encoder
	#yarn add string_decoder
	yarn install
}


main()
{
	#cd /root/kcs_forwarder/

	#ENVIRONMENT_VARIABLES
	##create env file is not exists
	if [ ! -f ./.env ]; then
		cp ./.env.example ./.env
		echo "Created Env file."
	fi
	set -a # export all variables created next
	source .env
	set +a # stop exporting
	
	rm -f sed*
	gitpull
	#setdate
	updatemodules	#yarn should not install modules that are already present
	node index.js
}

#Entry point
main
