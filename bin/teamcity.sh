#!/bin/bash
### Exit on any error
set -e

### Step helper functions
stepName=""
step_end(){
	echo "##teamcity[blockClosed name='${stepName}']"
}
step_start(){
	if [ "${stepName}" != '' ]
	then
		step_end
	fi
	stepName=`echo "-- $1 --"`
	echo "##teamcity[blockOpened name='${stepName}']"
}

### Check for something
check_for_text() {
step_start "check for $1"
count=`find test/ -name '*.js' -exec cat {} + | grep $1 | wc -l | sed 's/ //g'`
if [ "${count}" != '0' ]
then
	echo "Error: $1 found ${count}"
	find test/ nightly-test/ -name '*.js' -exec cat {} + | grep $1
	exit 1
fi
}

check_for_text "\.only"
check_for_text "\.skip"
check_for_text "xdescribe"
check_for_text "\sxit("

step_start "npm install"
npm install

step_start "tests"
npm test

step_start "report to coveralls"
npm run coveralls
