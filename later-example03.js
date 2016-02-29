var later = require('later');

  // Se disparará cada 1 minutos
  var textSched = later.parse.text('every 5 seconds');

  /*// execute logTime one time on the next occurrence of the text schedule
  var timer = later.setTimeout(logTime, textSched);*/

  // execute logTime for each successive occurrence of the text schedule
  var timer2 = later.setInterval(logTime, textSched);

  // function to execute
  function logTime() {
    console.log(new Date());
  }

  /*// clear the interval timer when you are done
  timer2.clear();*/