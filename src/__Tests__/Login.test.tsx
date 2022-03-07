import {
  Matcher,
  MatcherOptions,
  render,
  waitForOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Login from "../components/Login";
import reducers from "../store/reducers";
const mockApi = require("../services/ApiServices");

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

jest.mock("../services/ApiServices");

let usernameEl: HTMLElement;
let passwordEl: HTMLElement;
let loginBtn: HTMLElement;
let headerEl: HTMLElement;
let formEl: HTMLElement;
let getByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement;
let findByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

describe("Login Tests", () => {
  beforeEach(() => {
    const componenet = render(mockLogin());
    getByTestId = componenet.getByTestId;
    findByTestId = componenet.findByTestId;
    usernameEl = getByTestId("username");
    passwordEl = getByTestId("password");
    loginBtn = getByTestId("login-btn");
    headerEl = getByTestId("header");
    formEl = getByTestId("login-form");
  });

  describe("Header", () => {
    test("Header renders", () => {
      expect(headerEl).toBeVisible();
    });

    test("Header has correct value", () => {
      expect(headerEl).toHaveTextContent(/food truck tracker/i);
    });
  });

  describe("Login Form", () => {
    test("Login form renders", () => {
      expect(formEl).toBeVisible();
    });

    test("Login form has correct input fields", () => {
      expect(formEl).toContainElement(usernameEl);
      expect(formEl).toContainElement(passwordEl);
    });
  });
  describe("Username Field", () => {
    test("Username field renders", () => {
      expect(usernameEl).toBeVisible();
    });

    test("Username field has correct placeholder text", () => {
      expect(usernameEl).toHaveAttribute(
        "placeholder",
        expect.stringMatching(/enter username/i)
      );
    });

    test("Username field updates correctly", () => {
      userEvent.type(usernameEl, "admin");
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
      userEvent.type(passwordEl, "password");
      expect(passwordEl).toHaveValue("password");
    });
  });

  describe("Login Button", () => {
    test("Login button renders", () => {
      expect(loginBtn).toBeInTheDocument;
      expect(loginBtn).toBeDisabled();
    });

    test("Submiting invalid login credintials rendors error", async () => {
      userEvent.type(usernameEl, "admin");
      userEvent.type(passwordEl, "wrongpassword");
      expect(usernameEl).toHaveValue("admin");
      expect(passwordEl).toHaveValue("wrongpassword");
      loginBtn = await findByTestId("login-btn");
      expect(loginBtn).not.toBeDisabled();
      userEvent.click(loginBtn);
      expect(mockApi.doLogin).toHaveBeenCalledTimes(1);
      expect(mockApi.doLogin).toHaveBeenCalledWith({
        username: "admin",
        password: "wrongpassword",
      });
      const error = await findByTestId("login-alert");
      expect(error).toBeVisible();
    });
  });
});
