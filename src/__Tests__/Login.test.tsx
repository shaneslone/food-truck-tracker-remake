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
import { doLogin } from "../services/ApiServices";

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

let usernameEl: HTMLElement;
let passwordEl: HTMLElement;
let loginBtn: HTMLElement;
let getByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement;
let findByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;
jest.mock("../services/ApiServices");

describe("Login Tests", () => {
  beforeEach(() => {
    const componenet = render(mockLogin());
    getByTestId = componenet.getByTestId;
    findByTestId = componenet.findByTestId;
    usernameEl = getByTestId("username");
    passwordEl = getByTestId("password");
    loginBtn = getByTestId("login-btn");
  });

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
    test("Login button renders", async () => {
      expect(loginBtn).toBeInTheDocument;
      expect(loginBtn).toBeDisabled();
      userEvent.type(usernameEl, "admin");
      userEvent.type(passwordEl, "password");
      expect(usernameEl).toHaveValue("admin");
      expect(passwordEl).toHaveValue("password");
      loginBtn = await findByTestId("login-btn");
      expect(loginBtn).not.toBeDisabled();
      userEvent.click(loginBtn);
      expect(doLogin).toHaveBeenCalledTimes(1);
      expect(doLogin).toHaveBeenCalledWith({
        username: "admin",
        password: "password",
      });
      const error = await findByTestId("login-alert");
      expect(error).toBeInTheDocument();
    });
  });
});
