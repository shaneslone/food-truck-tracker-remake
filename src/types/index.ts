export interface Credentials {
  username: string;
  password: string;
}

export interface UserMin {
  username: string;
  password: string;
  email: string;
  currentLocation: string;
  accountType: string;
}

export interface User {
  userid: number;
  username: string;
  email: string;
  currentLocation: string;
  roles: Role[];
  ownedTrucks: Truck[];
  favoriteTrucks: Truck[];
  truckReviews: TruckReview[];
  menuItemReview: MenuItemReview[];
}

export interface Role {
  role: {
    roleid: number;
    name: string;
  };
}

export interface Truck {
  truckId: number;
  name: string;
  imageOfTruck: string;
  cuisineType: string;
  currentLocation: string;
  depatureTime: string;
  dinerFavorites: DinerMin[];
  menu: MenuItem[];
  reviews: DinerReview[];
  customerRatingsAvg: number;
}

export interface MenuItem {
  menuId: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemPhotos: ItemPhoto[];
  customerRatings: DinerReview[];
  customerRatingsAvg: number;
}

export interface ItemPhoto {
  menuItemPhotoId: number;
  url: string;
}

export interface DinerReview {
  diner: {
    userid: number;
  };
  score: number;
}

export interface DinerMin {
  diner: {
    userid: number;
    username: string;
  };
}

export interface TruckReview {
  truck: {
    truckId: number;
  };
  score: number;
}

export interface MenuItemReview {
  menuItem: {
    menuItemId: number;
  };
  score: number;
}
