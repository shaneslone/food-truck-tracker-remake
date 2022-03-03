import { rest } from "msw";
import { baseURL } from "../utils/axoisWithAuth";

export const handlers = [
  rest.post(`${baseURL}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { access_token: "accesstoken" } })
    );
  }),
  rest.get(`${baseURL}/users/getuserinfo`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          username: "test",
          email: "test@email.com",
          currentLocation: "",
          accountType: "DINER",
          userid: 1,
          roles: [],
          ownedTrucks: [],
          favoriteTrucks: [],
          truckReviews: [],
          menuItemReviews: [],
        },
      })
    );
  }),
];
