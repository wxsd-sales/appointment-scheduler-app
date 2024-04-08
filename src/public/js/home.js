const currentURL = window.location.href;
const urlSearchParams = new URLSearchParams(currentURL.split('?')[1]);
const queryParams = Array.from(urlSearchParams.entries()).reduce((params, [key, value]) => {
  params[key] = value;
  return params;
}, {});

document.addEventListener('DOMContentLoaded', () => {
  const exisCutomer = document.getElementById('exisCutomer');
  const guest = document.getElementById('guest');

  if (exisCutomer) {
    exisCutomer.addEventListener('click', () => {
      queryParams.custType = 'existingCustomer';
      const updatedQueryString = new URLSearchParams(queryParams).toString();
      window.location.href = `/customer?${updatedQueryString}`;
    });
  }
  if (guest) {
    guest.addEventListener('click', () => {
      queryParams.custType = 'guest';
      const updatedQueryString = new URLSearchParams(queryParams).toString();
      window.location.href = `/cusInfo?${updatedQueryString}`;
    });
  }
});
