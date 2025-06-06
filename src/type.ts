export interface IItem {
    _id: string;
    itemName: string;
    price: string;
    img: string[];
    description: string;
    type: string;
    sold: number;
    remaining: number;
    evaluate: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IListItem {
    totalItems: number;
    items: IItem[];
}

export interface ICartItem {
    itemID: IItem;
    quantity: number; 
}

export interface IUser {
    _id: string;
    username: string,
    avatar: string,
    phone: string,
    address: string,
    place: string,
    email: string,
    password: string,
    favourites: IItem[],
    cart: ICartItem[],
    role: string
}

export interface IOrder {
    _id: string
    userID: string
    username: string,
    phoneNumber: string,
    address: string,
    orders: ICartItem[],
    totalPrice: number,
    status: string,
    createdAt: Date;
    updatedAt?: Date;
}