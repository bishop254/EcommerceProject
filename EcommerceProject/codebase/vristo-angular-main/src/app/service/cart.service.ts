import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly cartKey = 'shopping_cart';
    items: any[] = [];

    constructor() {
        // Load cart data from local storage when the service is initialized
        const storedCart = localStorage.getItem(this.cartKey);
        if (storedCart) {
            this.items = JSON.parse(storedCart);
        }
    }

    private saveCart() {
        // Save cart data to local storage
        localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    }

    addToCart(product: any) {
        this.items.push(product);
        this.saveCart();
    }

    removeFromCart(index: number) {
        this.items.splice(index, 1);
        this.saveCart();
    }

    updateCartItem(index: number, quantity: number) {
        this.items[index].quantity = quantity;
        this.saveCart();
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        localStorage.removeItem(this.cartKey);
        return this.items;
    }
}
