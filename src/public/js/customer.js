const currentURL = window.location.href;
const urlSearchParams = new URLSearchParams(currentURL.split("?")[1]);
const queryParams = Array.from(urlSearchParams.entries()).reduce((params, [key, value]) => {
  params[key] = value;
  return params;
}, {});
async function nextButton() {
  const customerId = document.getElementById("customerId");
  const errorMessage = document.getElementById("errorMessage");

  if (customerId.validity.valueMissing || isNaN(customerId.value)) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    await fetch(`/get-customer/${customerId.value}`)
    .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("APIrequestsuccess:", data);
          queryParams.customerId = customerId.value;
           const updatedQueryString = Object.entries(queryParams)
            .map((param) => param.join("="))
            .join("&");
          window.location.href = `/reason?${updatedQueryString}`;
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
  window.location.href = `/?${urlSearchParams}`;
}
document.addEventListener("DOMContentLoaded", () => {
  const firstForm = document.getElementById("firstForm");
  firstForm.addEventListener("submit", (e) => {
    e.preventDefault();
    nextButton();
  });
});

