import {
  Matcher,
  MatcherOptions,
  render,
  waitFor,
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
import * as mockApi from "../services/ApiServices";
import { Credentials } from "../types";

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

const { doLogin } = mockApi;

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
    test("Login button renders", () => {
      expect(loginBtn).toBeInTheDocument;
      expect(loginBtn).toBeDisabled();
    });

    test("Submiting invalid login credintials rendors error", async () => {
      jest
        .spyOn(mockApi, "doLogin")
        .mockImplementation((credintials: Credentials) => {
          const { username, password } = credintials;
          if (username === "admin" && password === "password")
            return Promise.resolve("testtoken");
          else return Promise.reject("invalid login");
        });
      userEvent.type(usernameEl, "admin");
      userEvent.type(passwordEl, "password2");
      expect(usernameEl).toHaveValue("admin");
      expect(passwordEl).toHaveValue("password2");
      loginBtn = await findByTestId("login-btn");
      expect(loginBtn).not.toBeDisabled();
      userEvent.click(loginBtn);
      expect(doLogin).toHaveBeenCalledTimes(1);
      expect(doLogin).toHaveBeenCalledWith({
        username: "admin",
        password: "password2",
      });
      expect(doLogin).toHaveReturnedWith(Promise.resolve("testtoken2"));
      const error = await findByTestId("login-alert");
      expect(error).toBeInTheDocument();
    });
  });
});
