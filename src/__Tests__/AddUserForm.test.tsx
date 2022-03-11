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
import { useState } from "react";

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

const usePlaces = () => {
  const [value, setValue] = useState("");
  return {
    ready: true,
    value,
    suggestions: {
      status: "",
      data: [],
    },
    setValue,
  };
};

jest.mock("use-places-autocomplete", () => ({
  __esModule: true,
  default: usePlaces,
}));

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

    describe("Username Field", () => {
      test("Username field renders", () => {
        expect(usernameEl).toBeVisible();
      });

      test("Username field has correct placeholder value", () => {
        expect(usernameEl).toHaveAttribute(
          "placeholder",
          expect.stringMatching(/enter username/i)
        );
      });

      test("Username field updates correctly", async () => {
        userEvent.type(usernameEl, "Test");
        usernameEl = await findByTestId("username");
        expect(usernameEl).toHaveValue("Test");
      });
    });

    describe("Password Field", () => {
      test("Password field renders", () => {
        expect(passwordEl).toBeVisible();
      });

      test("Password field has correct placeholder value", () => {
        expect(passwordEl).toHaveAttribute(
          "placeholder",
          expect.stringMatching(/enter a password/i)
        );
      });

      test("Password field updates correctly", async () => {
        userEvent.type(passwordEl, "Test");
        passwordEl = await findByTestId("password");
        expect(passwordEl).toHaveValue("Test");
      });
    });

    describe("Email Field", () => {
      test("Email field renders", () => {
        expect(emailEl).toBeVisible();
      });

      test("Email field has correct placeholder value", () => {
        expect(emailEl).toHaveAttribute(
          "placeholder",
          expect.stringMatching(/enter your email/i)
        );
      });

      test("Email field updates correctly", async () => {
        userEvent.type(emailEl, "Test");
        emailEl = await findByTestId("email");
        expect(emailEl).toHaveValue("Test");
      });
    });

    describe("Current Location Field", () => {
      test("Current Location field renders", () => {
        expect(locationEl).toBeVisible();
      });

      test("Current Location field has correct placeholder value", () => {
        expect(locationEl).toHaveAttribute(
          "placeholder",
          expect.stringMatching(/current location/i)
        );
      });

      test("Current Location field updates correctly", async () => {
        userEvent.type(locationEl, "Test");
        locationEl = await findByTestId("currentLocation");
        expect(locationEl).toHaveValue("Test");
      });
    });

    describe("Diner Checkbox", () => {
      test("Diner checkbox renders", () => {
        expect(dinerEl).toBeVisible();
      });

      test("Diner checkbox updates correctly", async () => {
        expect(dinerEl).not.toBeChecked();
        userEvent.click(dinerEl);
        dinerEl = await findByTestId("diner");
        expect(dinerEl).toBeChecked();
      });
    });

    describe("Operator Checkbox", () => {
      test("Operator checkbox renders", () => {
        expect(operatorEl).toBeVisible();
      });

      test("Operator checkbox updates correctly", async () => {
        expect(operatorEl).not.toBeChecked();
        userEvent.click(operatorEl);
        operatorEl = await findByTestId("operator");
        expect(operatorEl).toBeChecked();
      });
    });
  });
});
