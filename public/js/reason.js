var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
const reasons = [
  "Open a new account",
  "Apply for a credit card",
  "Manage spending and saving",
  "Build credit and reduce debt",
  "Death of a loved one",
  "Questions or assistance with products and services",
  "Save for retirement",
];
document.addEventListener("DOMContentLoaded", function () {
  const reasonsContainer = document.getElementById("reasonsContainer");

  reasons.forEach((reason) => {
    const field = document.createElement("div");
    field.className = "field";

    const input = document.createElement("input");
    input.className = "is-checkradio is-info";
    input.type = "radio";
    input.name = "reason";
    input.id = reason.replace(/\s+/g, "");
    input.value = reason;

    const label = document.createElement("label");
    label.setAttribute("for", reason.replace(/\s+/g, ""));
    label.textContent = reason;

    field.appendChild(input);
    field.appendChild(label);

    reasonsContainer.appendChild(field);
  });
});

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
  if (queryParams.custType == "existingCustomer") {
    window.location.href = "/customer?" + urlSearchParams;
  } else {
    window.location.href = "/cusInfo?" + urlSearchParams;
  }
}
