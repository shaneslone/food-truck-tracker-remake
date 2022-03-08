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
let headerEl: HTMLElement;
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
  });

  describe("Header", () => {
    test("Header renders", () => {
      expect(headerEl).toBeVisible();
      expect(headerEl).toHaveTextContent(/join food truck tracker/i);
    });
  });
});
