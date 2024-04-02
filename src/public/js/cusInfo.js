var currentURL = window.location.href;
var urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
var queryParams = {};
for (var param of urlSearchParams.entries()) {
  queryParams[param[0]] = param[1];
}
document.addEventListener("DOMContentLoaded", function () {
  var cusInfoForm = document.getElementById("cusInfoForm");
  cusInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    nextButton();
  });
});
async function nextButton() {
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  // var errorFirstName = document.getElementById("errorFirstName");
  // var errorLastName = document.getElementById("errorLastName");
  // var errorEmail = document.getElementById("errorEmail");
  // var errorPhone = document.getElementById("errorPhone");
  var errorMessage = document.getElementById("errorMessage");
  var newCustButton = document.getElementById("newCustButton");

  var isFirstNameValid = !!firstName.value.trim();
  var isLastNameValid = !!lastName.value.trim();
  var isEmailValid = !!email.value.trim();
  var isPhoneValid = !!phone.value.trim();
  // errorFirstName.style.display = isFirstNameValid ? "none" : "block";
  // errorLastName.style.display = isLastNameValid ? "none" : "block";
  // errorEmail.style.display = isEmailValid ? "none" : "block";
  // errorPhone.style.display = isPhoneValid ? "none" : "block";
  var isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid;
  if (isFormValid) {
    const postData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phone.value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    };
    fetch(`${soapBoxURL}/customer`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("APIrequestsuccess:", data);
          queryParams["customerId"] = data.customerId;
          updatedQueryString = Object.entries(queryParams)
            .map((param) => param.join("="))
            .join("&");
          window.location.href = "/reason?" + updatedQueryString;
        } else {
          errorMessage.style.display = "block";
          errorMessage.innerText = `${data.msg}\nCustomer ID: ${data.customerId}`;
          console.error("APIrequestfailed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function handlePrevious() {
  window.location.href = "/?" + urlSearchParams;
}
