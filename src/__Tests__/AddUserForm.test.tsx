import {
  Matcher,
  MatcherOptions,
  render,
  waitForOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { applyMiddleware, createStore } from "redux";
import reducers from "../store/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import UserForm from "../components/AddUserForm";

const mockAddUserForm = () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Router>
        <UserForm />
      </Router>
    </Provider>
  );
};

jest.mock("use-places-autocomplete", () => {
  return {
    __esModule: true,
    default: () => {
      return {
        ready: true,
        value: "",
        suggestions: {
          status: "",
          data: [],
        },
      };
    },
  };
});

let headerEl: HTMLElement;
let formEl: HTMLElement;
let usernameEl: HTMLElement;
let passwordEl: HTMLElement;
let emailEl: HTMLElement;
let locationEl: HTMLElement;
let dinerEl: HTMLElement;
let operatorEl: HTMLElement;
let submitBtn: HTMLElement;
let getByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement;
let findByTestId: (
  id: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

describe("AddUserForm Tests", () => {
  beforeEach(() => {
    const component = render(mockAddUserForm());
    getByTestId = component.getByTestId;
    findByTestId = component.findByTestId;
    headerEl = getByTestId("header");
    formEl = getByTestId("addUser-form");
    usernameEl = getByTestId("username");
    passwordEl = getByTestId("password");
    emailEl = getByTestId("email");
    locationEl = getByTestId("currentLocation");
    dinerEl = getByTestId("diner");
    operatorEl = getByTestId("operator");
    submitBtn = getByTestId("submit-btn");
  });

  describe("Header", () => {
    test("Header renders", () => {
      expect(headerEl).toBeVisible();
    });

    test("Header has correct value", () => {
      expect(headerEl).toHaveTextContent(/join food truck tracker/i);
    });
  });

  describe("New User form", () => {
    test("Add User form renders", () => {
      expect(formEl).toBeVisible();
    });

    test("Add User form has correct inputs", () => {
      const formInputs = [
        usernameEl,
        passwordEl,
        emailEl,
        locationEl,
        dinerEl,
        operatorEl,
      ];
      formInputs.forEach((input) => {
        expect(formEl).toContainElement(input);
      });
    });
  });
});
