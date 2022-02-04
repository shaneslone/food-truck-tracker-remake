export interface Credentials {
  username: string;
  password: string;
}

export interface UserMin {
  username: string;
  password?: string;
  email: string;
  currentLocation: string;
  accountType?: 'DINER' | 'OPERATOR' | '';
}

export interface User extends UserMin {
  userid: number;
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

export interface TruckMin {
  name: string;
  imageOfTruck: string;
  cuisineType: string;
  currentLocation: string;
  departureTime: number;
}

export interface Truck extends TruckMin {
  truckId: number;
  dinerFavorites: DinerMin[];
  menu: MenuItem[];
  reviews: DinerReview[];
  customerRatingsAvg: number;
}

export interface MenuItemMin {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
}

export interface MenuItem extends MenuItemMin {
  menuId: number;
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
