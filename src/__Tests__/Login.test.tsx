import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Login from "../components/Login";
import reducers from "../store/reducers";

const mockLogin = () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
};

// jest.mock("../services/ApiServices");

describe("Login Tests", () => {
  // const component = render(mockLogin());
  // const getByTestId = component.getByTestId;
  // const findByTestId = component.findByTestId;
  // const usernameEl = getByTestId("username");
  // const passwordEl = getByTestId("password");
  // const loginBtn = getByTestId("login-btn");
  // const loginForm = getByTestId("login-form");
  // describe("Username Field", () => {
  //   test("Username field renders", () => {
  //     expect(usernameEl).toBeInTheDocument;
  //   });

  //   test("Username field has correct placeholder text", () => {
  //     expect(usernameEl).toHaveAttribute(
  //       "placeholder",
  //       expect.stringMatching(/enter username/i)
  //     );
  //   });

  //   test("Username field updates correctly", () => {
  //     fireEvent.change(usernameEl, { target: { value: "admin" } });
  //     expect(usernameEl).toHaveValue("admin");
  //   });
  // });

  // describe("Password Field", () => {
  //   test("Password field renders", () => {
  //     expect(passwordEl).toBeInTheDocument;
  //   });

  //   test("Password field has correct placeholder text", () => {
  //     expect(passwordEl).toHaveAttribute(
  //       "placeholder",
  //       expect.stringMatching(/enter password/i)
  //     );
  //   });

  //   test("Password field updates correctly", () => {
  //     fireEvent.change(passwordEl, { target: { value: "admin" } });
  //     expect(passwordEl).toHaveValue("admin");
  //   });
  // });

  describe("Login Button", () => {
    test("Login button renders", async () => {
      render(mockLogin());
      const usernameEl = screen.getByTestId("username");
      const passwordEl = screen.getByTestId("password");
      const testLoginForm = screen.getByTestId("login-form");
      // expect(loginBtn).toBeInTheDocument;
      // fireEvent.change(usernameEl, { target: { value: "admin" } });
      //  fireEvent.change(passwordEl, {target: {value: 'passwordx'}})
      // expect(testLoginForm).toHaveFormValues({
      //   password: 'password',
      // });
      // expect(passwordEl).toHaveValue('password')
      // userEvent.type(usernameEl, "admin");
      // userEvent.type(passwordEl, "dog");
      // expect(usernameEl).toHaveValue("admin");
      const testLoginBtn = await screen.findByTestId("login-btn");
      expect(testLoginBtn).not.toBeDisabled();
      fireEvent.click(testLoginBtn);
      // expect(usernameEl).toHaveValue("dog");
      // expect(passwordEl).toHaveValue("pig");
      const error = await screen.findByTestId("login-alert");
      expect(error).toBeInTheDocument();
    });
  });
});
