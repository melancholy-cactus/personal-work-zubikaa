function includeHTML() {
    var z, i, elmnt, file, xhttp;
    var attTemplate = "include";

    /*Прокрутка коллекции всех HTML-элементов:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*Поиск элементов с определенным атрибутом:*/
      file = elmnt.getAttribute(attTemplate);
      if (file) {
        /*HTTP-запрос со значение атрибута в качестве имени файла:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*Удаление атрибута и вызов функции повторно:*/
            elmnt.removeAttribute(attTemplate);
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /*Выход из функции:*/
        return;
      }
    }
  }
  includeHTML();
