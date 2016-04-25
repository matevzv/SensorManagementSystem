#Proxy CoAP<->HTTP

##Server info:
IP 194.249.231.18
<http://e6hermes.ijs.si>, <http://e6-hermes.ijs.si>

----------------------------------------------------------------------------------------------------------------------

##Proxy usage (beta):
http://e6hermes.ij.si/coap/ version / method / url + / payload + / format output

**version** - coap version which you use (_08, _12, _13)..  
**method** - get / put / post / delete (request method)  
**url** - for url format write whole coap url with ipv6 and handler which you prefer. Just  
instead slash in url write back slash  
Example : coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\test\path  
For discovering - coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\.well-known\core  
**payload** - include text as payload, used with put | post | delete (use percent-encoding for non-ASCII characters)  

Additional option which is not necessarily is format output if you like to have json format, at the end after url write json.  

----------------------------------------------------------------------------------------------------------------------

##Examples:
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\test\path/json  
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\test\path  
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\.well-known\core  
http://e6hermes.ijs.si/coap/_13/put/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\test\led/status=1  

----------------------------------------------------------------------------------------------------------------------

##Node in office N403:
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\temperature\1\data + /json  
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\temperature\1\metadata + /json  
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\humidity\1\data + /json  
http://e6hermes.ijs.si/coap/_13/get/coap:\\{2001:1470:ff80:e61:212:4b00:6:7670}\humidity\1\metadata + /json  

<https://github.com/markushx/coap-cheatsheet/blob/master/coap-cheatsheet.pdf?raw=true>

----------------------------------------------------------------------------------------------------------------------

##CoAP libraries:
version( 03,07/08,10,12,13)
libcoap C <http://sourceforge.net/projects/libcoap/>  
Californium Java <https://github.com/mkovatsc/Californium>  

version (03)
Coapy Python <http://sourceforge.net/projects/coapy/>

*not tested*
python <https://github.com/okoye/COAP>  
node.js module <https://github.com/errordeveloper/node-coap>  
android sampling <https://github.com/afaquejam/android-coap-sampling>  
android coap client <https://github.com/afaquejam/androidcoapclient>  
C# .NET <https://github.com/smeshlink/CoAP.NET>
