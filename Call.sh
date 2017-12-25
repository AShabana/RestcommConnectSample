sid="EnterYourSidHere"
token="EnterYourToken"
ip="EnterYourRCIP"
port=Port




#rcml="http://$ip:$port/restcomm/demos/hello-world.xml" # default rcml sample
rcml="http://$ip:3215/rcml" # our custom one at sample.rcml.service.js
callback="http://$ip:3215/update"  # Get call status update
to=201003325373 
restcomm="http://$sid:$token@$ip:$port/restcomm/2012-04-24/Accounts/$sid/Calls.json" # RestComm call api

curl --data-urlencode "To=$to" \
	 --data-urlencode "From=201003325373"\
	 --data-urlencode "Url=$rcml" \
	 --data-urlencode "Method=GET" \
	 --data-urlencode "StatusCallbackEvent=initiated" \
	 --data-urlencode "StatusCallbackEvent=ringing" \
	 --data-urlencode "StatusCallbackEvent=answered" \
	 --data-urlencode "StatusCallbackEvent=completed" \
	 --data-urlencode "StatusCallbackMethod=GET" \
	 --data-urlencode "StatusCallback=$callback" $restcomm
