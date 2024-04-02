var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
document.addEventListener("DOMContentLoaded", function () {
  var firstForm = document.getElementById("firstForm");
  firstForm.addEventListener("submit", (e) => {
    e.preventDefault();

    nextButton();
  });
});
async function nextButton() {
  var customerId = document.getElementById("customerId");
  var errorMessage = document.getElementById("errorMessage");

  if (customerId.validity.valueMissing || isNaN(customerId.value)) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";

    await fetch(`${soapBoxURL}/customer?id=${customerId.value}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("APIrequestsuccess:", data);
          queryParams["customerId"] = customerId.value;
          updatedQueryString = Object.entries(queryParams)
            .map((param) => param.join("="))
            .join("&");
          window.location.href = "/reason?" + updatedQueryString;
        } else {
          errorMessage.style.display = "block";
          console.error("APIrequestfailed:", data.errorMessage);
        }
      })
      .catch((error) => {
        errorMessage.style.display = "block";
        console.error("ErrormakingAPIrequest:", error);
      });
  }
}
function handlePrevious() {
  window.location.href = "/?" + urlSearchParams;
}
