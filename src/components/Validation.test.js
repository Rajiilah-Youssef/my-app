import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Validation from "./Validation";

beforeAll(() => {
  window.alert = jest.fn();
});

/*** Render all inputs ***/ 
test("renders all input fields", () => {
  render(<Validation />);
  
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});

/*** Empty submit shows validation errors ***/ 
test("shows validation errors when submitting empty form", async () => {
  render(<Validation />);
  const user = userEvent.setup();

  const submitButton = screen.getByRole("button", { name: /Validation/i });
  await user.click(submitButton);

  expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
});

/*** Invalid email ***/ 
test("shows error for invalid email", async () => {
  render(<Validation />);
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/Email/i);
  await user.type(emailInput, "invalid-email");

  const submitButton = screen.getByRole("button", { name: /Validation/i });
  await user.click(submitButton);

  expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
});

/*** Invalid phone number ***/ 
test("shows error for invalid phone number", async () => {
  render(<Validation />);
  const user = userEvent.setup();

  const phoneInput = screen.getByLabelText(/Phone Number/i);
  await user.type(phoneInput, "123abc");

  const submitButton = screen.getByRole("button", { name: /Validation/i });
  await user.click(submitButton);

  expect(screen.getByText(/Phone Number must be 10 digits/i)).toBeInTheDocument();
});

/*** Successful submission ***/ 
test("allows typing and submits form correctly", async () => {
  render(<Validation />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/First Name/i), "Youssef");
  await user.type(screen.getByLabelText(/Last Name/i), "RAJI ILAH");
  await user.type(screen.getByLabelText(/Phone Number/i), "0612345678");
  await user.type(screen.getByLabelText(/Email/i), "Youssef@example.com");

  const submitButton = screen.getByRole("button", { name: /Validation/i });
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining("Youssef")
  );
  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining("RAJI ILAH")
  );
  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining("0612345678")
  );
  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining("Youssef@example.com")
  );
});

/*** Reset button functionality ***/
test("resets the form correctly", async () => {
  render(<Validation />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/First Name/i), "Youssef");
  await user.type(screen.getByLabelText(/Email/i), "Youssef@example.com");

  const resetButton = screen.getByRole("button", { name: /Reset/i });
  await user.click(resetButton);

  // Inputs should be empty
  expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
  expect(screen.getByLabelText(/Email/i)).toHaveValue("");

  // Errors should be cleared
  expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
});