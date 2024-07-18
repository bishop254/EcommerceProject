import { Component } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';
import { CartService } from '../../../service/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    moduleId: module.id,
    templateUrl: './order-summary.html',
    styleUrls: ['./order-summary.scss']
})
export class OrderSummaryComponent {
    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    cartItems!: any[];
    subTotal!: number;

    constructor(
        private cartService: CartService,
        private http: HttpClient,
                ) {}

    ngOnInit() {

        this.fetchCartItems();

    }
    buyItem(){
        console.log('Buying an item...');
    }

    private fetchCartItems() {
        this.cartItems = this.cartService.getItems();
        console.log("this.cartItems");
        console.log(this.cartItems);

        this.subTotal = this.cartItems.reduce((acc, item) => acc + item.price, 0);
    }

    checkout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        let model = {
            "shippingInfo": {
                "address": "Nairobi",
                "city": "Zimmerman",
                "phoneNo": "254708453901",
                "zipCode": "20298",
                "country": "United States"
            },
            "orderItems": [
                {
                    "product": "6617c612ec8a26242122db59",
                    "name": "Google Pixel",
                    "price": 490,
                    "image": "http://res.cloudinary.com/dwvqz8njr/image/upload/v1712834854/shopit/products/nu7zqpcwpx54sizbrhyw.png",
                    "stock": 13,
                    "quantity": 1
                }
            ],
            "itemsPrice": "490.00",
            "shippingAmount": 0,
            "taxAmount": 73.5,
            "totalAmount": "563.50"
        }

        return this.http.post(`http://localhost:4000/api/v1/payment/checkout_session`, model, httpOptions)
            .subscribe((response: any) => {
                return true;
            }, (error: any) => {
                console.error('Error:', error);
                return false;
            });
    }

    viewPurchaseContract() {
        const pdfUrl = '/assets/documents/purchase_agreement.pdf';
        window.open(pdfUrl, '_blank');
    }
}
