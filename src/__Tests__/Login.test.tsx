import { render } from "@testing-library/react";
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

describe("Login Tests", () => {
  const component = render(mockLogin());
  const getByTestId = component.getByTestId;
  const usernameEl = getByTestId("username");
  const passwordEl = getByTestId("password");
  const submitBtn = getByTestId("submit-btn");

  describe("Username Field", () => {
    test("Username field renders", () => {
      expect(usernameEl).toBeInTheDocument;
    });

    test("Username field has correct placeholder text", () => {
      expect(usernameEl).toHaveAttribute("placeholder", expect.stringMatching(/enter username/i));
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
  });

  describe("Submit Button", () => {
    test("Submit button renders", () => {
      expect(submitBtn).toBeInTheDocument;
    });
  });
});
