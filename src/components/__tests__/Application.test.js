import React from "react";
import axios from "axios";

import { 
  render, 
  cleanup, 
  waitForElement, 
  getByText, 
  getAllByTestId, 
  prettyDOM,
  getByAltText,
  getByPlaceholderText,
  getByTestId,
  act,
  queryByText
  } from "@testing-library/react";

import { fireEvent } from "@testing-library/react/dist";
import Application from "components/Application";

afterEach(cleanup);

describe("Appointments", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // await act(() => Promise.resolve());
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }});
    
      // fireEvent.change(getByTestId(appointment, "student-name-input"), {target: {value: "Rahul Shial"}});
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, 'Save'));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    /** 1. Render the application */
    const { container } = render(<Application />);

    /** 2. Wait until the text 'Archie Cohen' is displayed */
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));

    /** 3. Click the 'Delete' button on the booked appointment */
    const appointment = getAllByTestId(container, "appointment")
    .find(appointment => queryByText(appointment, "Archie Cohen"));
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    /** 4. Check that the confirmation message is shown */
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    
    /** 5. Click the 'Confirm' button on the confirmation */
    fireEvent.click(getByText(appointment, 'Confirm'));

    // /** 6. Check that the element with the text "Deleting" is displayed. */
    expect(getByText(appointment, "Cancelling Appointment")).toBeInTheDocument();

    /** 7. Wait until the element with the "Add" button is displayed. */
    await waitForElement(() => getByAltText(appointment, "Add"));

    /** 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining" */

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    // await expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // console.log('Post Delete', prettyDOM(day));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      /** 1. Render the application */
      const { container } = render(<Application />);

      /** 2. Wait until the text 'Archie Cohen' is displayed */
      await waitForElement(() => getByText(container, "Archie Cohen"));
    
      /** 3. Click the 'Delete' button on the booked appointment */
      const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));
    
      /** 4. Click the "Edit" button on the booked appointment. */
      fireEvent.click(getByAltText(appointment, "Edit"));
    
      /** 5. Change student name */
      fireEvent.change(getByTestId(appointment, "student-name-input"), {target: {value: "Lydia Miller-Jones"}});

      fireEvent.click(getByText(appointment, 'Save'));
      
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

      const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
      // console.log(prettyDOM(day));
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }});
    
      // fireEvent.change(getByTestId(appointment, "student-name-input"), {target: {value: "Rahul Shial"}});
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, 'Save'));
    
    await waitForElement(() => getByText(appointment, "Could not save appointment"));
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
    
    fireEvent.click(getByAltText(appointment, "Close"));
    fireEvent.click(getByText(appointment, "Cancel"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
  });

  it("shows the delete error when failing to delete an appointment", async () => {

    axios.delete.mockRejectedValueOnce();  

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment")
    .find(appointment => queryByText(appointment, "Archie Cohen"));
      
    fireEvent.click(getByAltText(appointment, "Delete"));
      
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, 'Confirm'));

    await waitForElement(() => getByText(appointment, "Could not cancel appointment"));
    expect(getByText(appointment, "Could not cancel appointment")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    await waitForElement(() => getByText(appointment, "Archie Cohen"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    await expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // console.log('error check', prettyDOM(appointment));
  });
});