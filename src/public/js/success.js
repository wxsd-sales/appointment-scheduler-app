const currentURL = window.location.href;
const urlSearchParams = new URLSearchParams(currentURL.split('?')[1]);
const queryParams = Array.from(urlSearchParams.entries()).reduce((params, [key, value]) => {
  params[key] = value;
  return params;
}, {});
document.addEventListener('DOMContentLoaded', () => {
  const backLink = document.getElementById('backLink');
  document.getElementById('confId').innerHTML = `Confirmation ID: ${queryParams.confirmationId}`;
  document.getElementById('custId').innerHTML = `Customer ID: ${queryParams.customerId}`;
  backLink.href = `/?customColor=${queryParams.customColor}&logo=${queryParams.logo}`;
});
