var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
function exisCutomer() {
  queryParams["custType"] = "existingCustomer";
  updatedQueryString = Object.entries(queryParams)
    .map((param) => param.join("="))
    .join("&");
  window.location.href = "/customer?" + updatedQueryString;
}
function guest() {
  queryParams["custType"] = "guest";
  updatedQueryString = Object.entries(queryParams)
    .map((param) => param.join("="))
    .join("&");
  window.location.href = "/cusInfo?" + updatedQueryString;
}
