function includeHTML() {
  /** @var {string} file*/
  let file="";
  /** @var { XMLHttpRequest } xhttp */
  let xhttp;

  /*loop through a collection of all HTML elements:*/

  /** @var {HTMLElement[]} elmnts  */
  const elmnts = [...document.querySelectorAll("*")]
  for(const elmnt of elmnts){

    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("w3-include-html");
    const removeContainer = elmnt.getAttribute("w3-remove-container") == "true" ? true : false;
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) elmnt.insertAdjacentHTML( removeContainer ? "afterend" : "beforeend",this.responseText);
          if (this.status == 404) elmnt.insertAdjacentHTML( removeContainer ? "afterend" : "beforeend","페이지를 찾지 못했습니다.");
          if(removeContainer) elmnt.parentElement.removeChild(elmnt);
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }

}