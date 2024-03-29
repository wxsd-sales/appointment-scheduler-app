document.addEventListener("DOMContentLoaded", function () {
  var navbarItem = document.getElementById("navbarItem");
  var currentURL = window.location.href;
  var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
  var queryParams = {};
  for (var param of urlSearchParams.entries()) {
    queryParams[param[0]] = param[1];
  }
  var coloredElements = document.getElementsByClassName("custom-red");
  for (var i = 0; i < coloredElements.length; i++) {
    coloredElements[i].style.backgroundColor = "#" + queryParams.customColor;
  }
  var logo = document.getElementById("logo");
  if (queryParams.logo) {
    logo.src = queryParams.logo;
  }
  navbarItem.href = "/?" + urlSearchParams;
});
