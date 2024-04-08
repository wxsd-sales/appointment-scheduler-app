const currentURL = window.location.href;
const urlSearchParams = new URLSearchParams(currentURL.split('?')[1]);
const queryParams = Array.from(urlSearchParams.entries()).reduce((params, [key, value]) => {
  params[key] = value;
  return params;
}, {});

async function nextButton() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const errorMessage = document.getElementById('errorMessage');

  const isFirstNameValid = !!firstName.value.trim();
  const isLastNameValid = !!lastName.value.trim();
  const isEmailValid = !!email.value.trim();
  const isPhoneValid = !!phone.value.trim();
  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid;
  if (isFormValid) {
    const postData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phone.value,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    console.log('body:', requestOptions.body);
    fetch(`/create-customer`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('APIrequestsuccess:', data);
          queryParams.customerId = data.customerId;
          const updatedQueryString = Object.entries(queryParams)
            .map((param) => param.join('='))
            .join('&');
          window.location.href = `/reason?${updatedQueryString}`;
        } else {
          errorMessage.style.display = 'block';
          errorMessage.innerText = `${data.msg}\nCustomer ID: ${data.customerId}`;
          console.error('APIrequestfailed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
function handlePrevious() {
  window.location.href = `/?${urlSearchParams}`;
}
document.addEventListener('DOMContentLoaded', () => {
  const cusInfoForm = document.getElementById('cusInfoForm');
  cusInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    nextButton();
  });
});
