export interface User {
  userid: number;
  username: string;
  email: string;
  currentLocation: string;
  roles: Role[];
  ownedTrucks: any[];
  truckReviews: any[];
  menuItemReview: any[];
}

export interface Role {
  role: {
    roleid: number;
    name: string;
  };
}
