# Interview Scheduler

The Intervew Scheduler is a single page app that allows viewing, adding, editing and cancelling appointments with interviewers. Interviewees have the choice of 5 interviewers to choose from. 

For each day, there are 5 interview slots to choose from with a total of 25 slots aailable for the week.
* Interviews can be booked between Monday and Friday.
* A user can switch between weekdays.
* A user can book an interview in an empty appointment slot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can cancel an existing interview.
* A user can edit the details of an existing interview.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
* When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
* The application makes API requests to load and persist data. We do not lose data after a browser refresh.

The app has the following dependencies.

* Axios
* React
* Webpack, Babel
* Sass
* Nodejs
* Express
* Postgresql
* Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Screenshots
!["Initial Screen"](https://github.com/rahulshial/scheduler/blob/master/docs/Initial%20screen.png)
!["Create New Appointment"](https://github.com/rahulshial/scheduler/blob/master/docs/Create%20New%20appointment.png)
!["Cancel Appointment"](https://github.com/rahulshial/scheduler/blob/master/docs/Delete%20Existing%20Appointment.png)
