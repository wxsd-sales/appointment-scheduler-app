var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  flatpickr("#datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    theme: "dark",
    minDate: currentDate,
    minTime: "09:00",
    maxTime: "16:00",
  });
});
function handleSubmit() {
  var valueInput = document.getElementById("datetime");
  var dateTimeValue = valueInput.value;
  const unixTimestampSeconds = Math.floor(
    new Date(dateTimeValue).getTime() / 1000
  );
  if (valueInput.value === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    var respObject = Object.fromEntries(urlSearchParams);
    urlSearchParams.set("datetime", dateTimeValue);
    const postData = {
      customerId: respObject.customerId,
      timestamp: unixTimestampSeconds,
      command: "jds-dial",
      destination: "1111",
      title: respObject.reason,
      prettyDestination: respObject.reason,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    };
    fetch(`${soapBoxURL}/schedule`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("APIrequestsuccess:", data);
          var queryParams = {};
          for (var param of urlSearchParams.entries()) {
            queryParams[param[0]] = param[1];
          }
          window.location.href =
            "/success?customColor=" +
            queryParams.customColor +
            "&logo=" +
            queryParams.logo +
            "&confirmationId=" +
            data.confirmationId;
        } else {
          console.error("APIrequestfailed:", data.msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function handlePrevious() {
  window.location.href = "/reason?" + urlSearchParams;
}
var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
myModal._element.addEventListener("hidden.bs.modal", function () {
  var queryParams = {};
  for (var param of urlSearchParams.entries()) {
    queryParams[param[0]] = param[1];
  }
  window.location.href =
    "/?customColor=" + queryParams.customColor + "&logo=" + queryParams.logo;
});
