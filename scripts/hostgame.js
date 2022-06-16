console.log('working');

var selector = document.getElementById("qset");
var custominp = document.getElementById("custominput");
var submit = document.getElementById("submit");
var hostform = document.getElementById("hostoptions");

selector.addEventListener("change", qsetChange);
hostform.addEventListener("submit", () => {
  
  var obstacles = hostform.elements['obstacles'].value;
  var qset = hostform.elements['qset'].value;
  var length = hostform.elements['boardlength'].value;
  var custom = qset === 'custom' ? hostform.elements['custom'].value : 'none'

  var max10 = ';max-age=10';
  
  console.log(length,obstacles,custom)

  document.cookie = "obint="+obstacles+max10;
  document.cookie = "qset="+qset+max10;
  document.cookie = "length="+length+max10;
  document.cookie = "custom="+custom+max10;
  
});

function qsetChange() {
  if(selector.value === "custom") {
    console.log('in loop',selector.value);
    custominp.disabled = false;
    submit.disabled = false;
    console.log('submit enabled')
  } else {
    console.log(selector.value);
    custominp.disabled = true;
    if(selector.value === 'pselect') {
      submit.disabled = true;
      console.log('submit disabled')
    } else {
      submit.disabled = false;
      console.log('submit enabled')
    }
  }
}

 