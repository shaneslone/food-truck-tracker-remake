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
import * as mockApi from "../services/ApiServices";

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
      const mockDoLogin = jest
        .spyOn(mockApi, "doLogin")
        .mockReturnValueOnce(Promise.resolve("dog"));
      userEvent.type(usernameEl, "admin");
      userEvent.type(passwordEl, "wrongpassword");
      expect(usernameEl).toHaveValue("admin");
      expect(passwordEl).toHaveValue("wrongpassword");
      loginBtn = await findByTestId("login-btn");
      expect(loginBtn).not.toBeDisabled();
      userEvent.click(loginBtn);
      expect(mockDoLogin).toHaveBeenCalledTimes(1);
      expect(mockDoLogin).toHaveBeenCalledWith({
        username: "admin",
        password: "wrongpassword",
      });
      expect(mockDoLogin).toHaveReturnedWith("dog");
      const error = await findByTestId("login-alert");
      expect(error).toBeVisible();
    });
  });
});
