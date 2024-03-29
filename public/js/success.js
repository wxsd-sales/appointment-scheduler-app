var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById(
    "confId"
  ).innerHTML = `Confirmation ID: ${queryParams.confirmationId}`;
  document.getElementById(
    "custId"
  ).innerHTML = `Customer ID: ${queryParams.customerId}`;
  backLink.href =
    "/?customColor=" + queryParams.customColor + "&logo=" + queryParams.logo;
});
