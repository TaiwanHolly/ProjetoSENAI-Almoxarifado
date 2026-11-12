window.addEventListener('load', function() {
  // This is a ternary operator, which is just a shorthand way to 
  // do an if/else statement. This basically says, if the random number
  // is less than .5, assign "1" to the scenario variable.
  // if it is greater (or equal to), assign "2" to the variable. 
  var scenario = Math.floor(Math.random() * 6);
  var scenario2 = Math.floor(Math.random() * 3);

if ( scenario == 0 ){
	document.querySelector("#scrollingBG1").classList.add("scrollingBG1"); }
if ( scenario == 1 ){
	  document.querySelector("#scrollingBG1").classList.add("scrollingBGB1"); }
if ( scenario == 2 ){
	  document.querySelector("#scrollingBG1").classList.add("scrollingBGC1"); }
if ( scenario == 3 ){
	  document.querySelector("#scrollingBG1").classList.add("scrollingBGD1"); }
if ( scenario == 4 ){
	  document.querySelector("#scrollingBG1").classList.add("scrollingBGE1"); }
if ( scenario == 5 ){
	  document.querySelector("#scrollingBG1").classList.add("scrollingBGF1"); }
//

if ( scenario2 == 0 ){
	document.querySelector("#scrollingBG2").classList.add("scrollingBG2");
	document.querySelector("#scrollingBG3").classList.add("scrollingBG3"); }
if ( scenario2 == 1 ){
	  document.querySelector("#scrollingBG2").classList.add("scrollingBGB2");
	  document.querySelector("#scrollingBG3").classList.add("scrollingBGB3"); }
if ( scenario2 == 2 ){
	  document.querySelector("#scrollingBG2").classList.add("scrollingBGC2");
	  document.querySelector("#scrollingBG3").classList.add("scrollingBGC3"); }
	  
})