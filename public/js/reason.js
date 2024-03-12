var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
function nextButton() {
  var errorMessage = document.getElementById("errorMessage");
  const radioButtons = document.querySelectorAll('input[name="reason"]');
  let isChecked = false;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      isChecked = true;
      queryParams["reason"] = radioButton.value;
      var updatedQueryString = Object.entries(queryParams)
        .map((param) => param.join("="))
        .join("&");
      window.location.href = "/dateTime?" + updatedQueryString;
    }
  });
  if (!isChecked) {
    errorMessage.style.display = "block";
  }
}
function prevButton() {
  var updatedQueryString = Object.entries(queryParams)
    .map((param) => param.join("="))
    .join("&");
  if (queryParams.custType == "existingCustomer") {
    window.location.href = "/customer?" + updatedQueryString;
  } else {
    window.location.href = "/cusInfo?" + updatedQueryString;
  }
}
