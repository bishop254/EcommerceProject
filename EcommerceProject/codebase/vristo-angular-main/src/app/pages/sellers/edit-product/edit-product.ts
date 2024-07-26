import { Component, OnInit } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './edit-product.html',
    styleUrls: ['./edit-product.scss']
})
export class EditProductComponent implements OnInit {
    codeArr: any = [];

    public form!: FormGroup;

    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };
    selectedProduct: any;
    private productId: any;

    selectedImages!: FileUploadWithPreview;
    totalImagesUploads = 0;

    constructor(private http: HttpClient,
                public fb: FormBuilder,
                public router: Router,
                public activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {

        this.activatedRoute.params.subscribe((params) => {
            if (typeof params['id'] !== 'undefined') {
                this.productId = params['id']
            }
        })

        this.form = this.fb.group({
            category: [ ''],
            name: [ ''],
            price: [ ''],
            description: [ ''],
        });

        // multiple image upload
        new FileUploadWithPreview('mySecondImage', {
            images: {
                baseImage: '/assets/images/file-preview.svg',
                backgroundImage: '',
            },
            multiple: true,
        });

        this.fetchSelectedProduct();
    }

    updateProduct() {

        let payload = {
            "name": this.form.get('name')!.value,
            "price": this.form.get('price')!.value,
            "description": this.form.get('description')!.value,
            "category": this.form.get('category')!.value,
            "stock": "3",
            "seller": "Meriola Tech"
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.put(`http://102.23.120.135:4000/api/v1/admin/products/${this.productId}`, payload, httpOptions)
            .subscribe(response => {
                console.log('Post created:', response);
                this.router.navigate(['/sellers-account-settings-page'])

                // this.toastr.success('Post created successfully!');
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }

    private fetchSelectedProduct() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.get(`http://102.23.120.135:4000/api/v1/products/${this.productId}`, httpOptions)
            .subscribe(async (response: any) => {
                console.log('Post created:', response);
                this.selectedProduct = response.product;

                this.form.patchValue({
                    category: this.selectedProduct.category,
                    name: this.selectedProduct.name,
                    price: this.selectedProduct.price,
                    description: this.selectedProduct.description
                })

                for (const image of this.selectedProduct?.images) {

                    await this.createFileFromImageUrl(image?.url, image?.public_id)
                        .then((imageFile: any) => {
                            this.selectedImages?.cachedFileArray?.push(imageFile)
                        })
                }

            }, error => {
                console.error('Error:', error);
            });
    }

    async createFileFromImageUrl(imageUrl: any, fileName: any) {

        // Replace 'http://res.cloudinary.com/' with an empty string
        const trimmedImageUrl = imageUrl.replace(/^http:\/\/res.cloudinary.com\//, '');

        this.http.get(`/api/${trimmedImageUrl}`, { responseType: 'blob' })
            .subscribe((blob: Blob) => {
                return new File([blob], fileName);

            }, error => {
                console.error('Error fetching image:', error);
            });
    }
}
