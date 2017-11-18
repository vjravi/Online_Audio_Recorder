navigator.webkitGetUserMedia({"audio": true}, function(stream) {
console.log("Inside webkitGetUserMedia")
$("#shown").toggle();
$("#hidden").toggle();
}, function(err) {
if(err === PERMISSION_DENIED) {
}
});