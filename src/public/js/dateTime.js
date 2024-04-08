const currentURL = window.location.href;
const urlSearchParams = new URLSearchParams(currentURL.split('?')[1]);
const queryParams = Array.from(urlSearchParams.entries()).reduce((params, [key, value]) => {
  params[key] = value;
  return params;
}, {});
function handleSubmit() {
  const valueInput = document.getElementById('datetime');
  const dateTimeValue = valueInput.value;
  const errorMessage = document.getElementById('errorMessage');
  const unixTimestampSeconds = Math.floor(new Date(dateTimeValue).getTime() / 1000);
  if (valueInput.value === '') {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
    const respObject = Object.fromEntries(urlSearchParams);
    urlSearchParams.set('datetime', dateTimeValue);
    const postData = {
      customerId: respObject.customerId,
      timestamp: unixTimestampSeconds,
      title: respObject.reason,
      prettyDestination: respObject.reason,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    fetch(`/schedule-appointment`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('APIrequestsuccess:', data);
          window.location.href = `/success?customColor=${queryParams.customColor}&logo=${queryParams.logo}&confirmationId=${data.confirmationId}&customerId=${queryParams.customerId}`;
        } else {
          errorMessage.style.display = 'block';
          errorMessage.innerText = data.msg;
          console.error('APIrequestfailed:', data.msg);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
function handlePrevious() {
  window.location.href = `/reason?${urlSearchParams}`;
}
document.addEventListener('DOMContentLoaded', () => {
  const dateTimeForm = document.getElementById('dateTimeForm');
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);
  // eslint-disable-next-line no-undef
  flatpickr('#datetime', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    theme: 'dark',
    minDate: formattedDate,
  });
  dateTimeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    handleSubmit();
  });
  document.getElementsByClassName('numInput')[0].readOnly = true;
  document.getElementsByClassName('numInput')[1].readOnly = true;
  document.getElementsByClassName('numInput')[2].readOnly = true;
});
