import { createReducer } from "@reduxjs/toolkit";

const loadCartData = () => {
    const cartData = localStorage.getItem("cartData");
    return cartData ? JSON.parse(cartData) : {
        cartitems: [],
        subTotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    };
};
const saveCartData = (state) => {
    localStorage.setItem("cartData", JSON.stringify(state));
};


export const cartReducer = createReducer(
    loadCartData(),
    {
        addtocart: (state, action) => {
            const items = action.payload;
            const isitemexist = state.cartitems.find((i) => i.id === items.id);

            if (isitemexist) {
                state.cartitems.forEach(i => {
                    if (i.id === items.id) {
                        i.quantity += 1;
                    }
                })
            }
            else {
                state.cartitems.push(items);
            }
            saveCartData(state);
        },
        decrement: (state, action) => {
            const item = state.cartitems.find((i) => i.id === action.payload);
            if (item.quantity > 1) {
                state.cartitems.forEach((i) => {
                    if (i.id === item.id) { i.quantity -= 1; }
                })
            }
            saveCartData(state);
        },
        deletefromcart: (state, action) => {
            state.cartitems = state.cartitems.filter(i => i.id !== action.payload);
            saveCartData(state);
        },
        calculate: (state) => {
            let sum = 0;
            state.cartitems.forEach(i => (
                sum += i.quantity * i.price
            ));
            state.subTotal = sum;
            if (state.cartitems.length === 0) {
                state.shipping = 0;
            } else {
                state.shipping = state.subTotal > 6000 ? 0 : 50;
            }
            state.tax = +(state.subTotal * 0.18).toFixed();
            state.total = state.subTotal + state.shipping + state.tax;
            saveCartData(state);
        }
    })
