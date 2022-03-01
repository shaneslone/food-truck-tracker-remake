import { Matcher, MatcherOptions, render } from "@testing-library/react";
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
  let getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement;

  beforeEach(() => {
    const component = render(mockLogin());
    getByTestId = component.getByTestId;
  });

  describe("Username Field", () => {
    test("Username field renders", () => {
      const usernameEl = getByTestId("username");
      expect(usernameEl).toBeInTheDocument;
    });
  });

  describe("Password Field", () => {
    test("Password field renders", () => {
      const passwordEl = getByTestId("password");
      expect(passwordEl).toBeInTheDocument;
    });
  });

  describe("Submit Button", () => {
    test("Submit button renders", () => {
      const submitBtn = getByTestId("submit-btn");
      expect(submitBtn).toBeInTheDocument;
    });
  });
});
