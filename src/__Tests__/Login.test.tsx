import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Login from "../components/Login";
import reducers from "../store/reducers";
import { server } from "../dogs/Server";
import * as userActions from "../store/actions/users";



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

describe("Login Tests", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const component = render(mockLogin());
  const getByTestId = component.getByTestId;
  const usernameEl = getByTestId("username");
  const passwordEl = getByTestId("password");
  const loginBtn = getByTestId("login-btn");
  const loginForm = getByTestId("login-form");

  describe("Username Field", () => {
    test("Username field renders", () => {
      expect(usernameEl).toBeInTheDocument;
    });

    test("Username field has correct placeholder text", () => {
      expect(usernameEl).toHaveAttribute(
        "placeholder",
        expect.stringMatching(/enter username/i)
      );
    });

    test("Username field updates correctly", () => {
      fireEvent.change(usernameEl, { target: { value: "admin" } });
      expect(usernameEl).toHaveValue("admin");
    });
  });

  describe("Password Field", () => {
    test("Password field renders", () => {
      expect(passwordEl).toBeInTheDocument;
    });

    test("Password field has correct placeholder text", () => {
      expect(passwordEl).toHaveAttribute(
        "placeholder",
        expect.stringMatching(/enter password/i)
      );
    });

    test("Password field updates correctly", () => {
      fireEvent.change(passwordEl, { target: { value: "admin" } });
      expect(passwordEl).toHaveValue("admin");
    });
  });

  describe("Login Button", () => {
    test("Login button renders", async () => {
      expect(loginBtn).toBeInTheDocument;
      fireEvent.change(usernameEl, { target: { value: "admin" } });
      fireEvent.change(passwordEl, { target: { value: "admin" } });
      fireEvent.submit(loginForm);
      // fireEvent.click(loginBtn);
    });
  });
});
