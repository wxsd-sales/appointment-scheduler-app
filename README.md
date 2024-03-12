# Appointment Scheduler App

This app schedules appointments for existing or new customers and creates a JDS events for the agents to track.

For existing customers it promts for thier customer ID and validates it. For new customers, it asks for the customer details and creates a new customer ID. On creating or validating the customer ID, it allows the customer to select the reason for thier visit and select a date and time for thier appointment. On submit, it sends a confirmation ID using which the customers can retrieve the appointment when they are in the store or bank or health care center.

## Overview

The app manages customer interactions by validating existing customer IDs and creating new ones. It also integrates appointment scheduling, allowing customers to select their visit reason and preferred date/time, providing a convenient confirmation ID for future reference. Once the appointmnet is scheduled, it creates a JDS event allowing the agents to track customer events from start. This app can be used standalone or be embedded in your application using an iframe.

## Flow Diagram

<img width="770" alt="image" src="https://github.com/wxsd-sales/appointment-scheduler-app/assets/85897512/17213cff-0e9c-4674-869c-5005742853cd">


## Setup

### Prerequisites & Dependencies:

- Node 18

### Installation Steps:

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/appointment-scheduler-app.git && cd appointment-scheduler-app
   ```

2. Rename the example environment file from `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
3. Configure the environment file with the soap box `ACCESS_TOKEN` and save.

   ```env
    ACCESS_TOKEN=<SOAPBOX_ACCESS_TOKEN>
    SOAPBOX_URL="https://soapbox.wbx.ninja/jds"
   ```

4. Install project:
   ```
   npm install
   ```
5. Start the server:

   ```
   npm start
   ```

6. Add customColor and logo URL parameters and navigate using your browser to the link below:
   ```
   http://localhost:3000/?customcolor=000000&logo=<YOUR_LOGO_URL>
   ```

### Use as an iframe

To use as an iframe embed this link in your app

```
<iframe src="https://appointment-scheduler.wbx.ninja/?customColor=d71d28&logo=<YOUR_LOGO_URL>"></iframe>
```

## Demo

<!-- Insert link to the website below (if deployed). -->

Check out our live demo, available [here](https://appointment-scheduler.wbx.ninja/?customColor=d71d28&logo=<YOUR_LOGO_URL>)!

<!-- Keep the following statement -->

\*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).

## License

<!-- MAKE SURE an MIT license is included in your Repository. If another license is needed, verify with management. This is for legal reasons.-->

<!-- Keep the following statement -->

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.

## Disclaimer

<!-- Keep the following here -->

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.

## Questions

Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=RepoName) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team.
