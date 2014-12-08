var time1;

function getXMLHttpRequest() {
  if (window.XMLHttpRequest) {
      return new window.XMLHttpRequest;
  }
  else {
    try {
      return new ActiveXObject("MSXML2.XMLHTTP.3.0");
    }
    catch (e) {
      return null;
    }
  }
}

var oReq = getXMLHttpRequest();

function complete() {
  document.body.style.cursor = 'default';
  if (oReq.readyState == 4 /* complete */) {
    if (oReq.status == 200) {
      var d = new Date;
      var xml = oReq.responseText;
      var bytesLoaded = xml.length;
      var time = Math.round((d.getTime() - time1) / 10) / 100;
      var connSpeed = Math.round(bytesLoaded / time / 1024);

      window.document.getElementById("result").innerHTML = "Время: " + time + " с<br>" +
             "Получено байт: " + bytesLoaded + "<br>" +
             "Скорость: " + connSpeed + " КБайт/с";

//      var abc = getXMLHttpRequest();
    }
  }
}

function test() {
    var d = new Date;
    time1 = d.getTime();

    oReq = getXMLHttpRequest();
    if (oReq != null) {
        oReq.open("GET", "test.txt?a=" + time1, true);
        oReq.onreadystatechange = complete;
        oReq.send();
        document.body.style.cursor = 'progress';
    }
    else {
        alert('Невозможно создать объект XMLHttpRequest');
    }
}