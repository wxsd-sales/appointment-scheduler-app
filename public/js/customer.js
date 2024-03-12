async function nextButton() {
  var customerId = document.getElementById("customerId");
  var errorMessage = document.getElementById("errorMessage");
  var currentURL = window.location.href;
  var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
  var queryParams = {};
  for (var param of urlSearchParams.entries()) {
    queryParams[param[0]] = param[1];
  }
  if (customerId.validity.valueMissing || isNaN(customerId.value)) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    try {
      const response = await fetch(
        `${soapBoxURL}/customer?id=${customerId.value}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
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
    } catch (error) {
      console.error("ErrormakingAPIrequest:", error);
    }
  }
}