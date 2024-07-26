import { Component } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';


@Component({
    moduleId: module.id,
    templateUrl: './add-product.html',
    styleUrls: ['./add-product.scss']
})
export class AddProductComponent {
    codeArr: any = [];

    public form!: FormGroup;
    public modalRef!: NgbModalRef;

    activeTab = 1;


    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    selectedImages!: FileUploadWithPreview;
    totalImagesUploads = 0;

    constructor(private http: HttpClient,
                public fb: FormBuilder,
                private modalService: NgbModal,
                public router: Router,
    ) {}

    ngOnInit() {

        this.form = this.fb.group({
            category: [ ''],
            name: [ ''],
            price: [ ''],
            description: [ ''],
        });

        // multiple image upload
        this.selectedImages = new FileUploadWithPreview('mySecondImage', {
            images: {
                baseImage: '/assets/images/file-preview.svg',
                backgroundImage: '',
            },
            multiple: true,
        });

        // console.log('files.cachedFileArray')
        // console.log(this.selectedImages.)
    }

    createProduct() {
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

        return this.http.post('http://102.23.120.135:4000/api/v1/admin/products', payload, httpOptions)
            .subscribe(response => {
                console.log('Post created:', response);
                this.router.navigate(['/sellers-account-settings-page'])

                // this.toastr.success('Post created successfully!');
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }



    async uploadImages() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        console.log('this.selectedImages.cachedFileArray');
        console.log(this.selectedImages.cachedFileArray);


        let arrayOfbaseImgs: string[] = [];

        for (const item of this.selectedImages.cachedFileArray) {
            await this.convertToBase64(item)
                .then(base64Data => {
                    console.log("Base64 encoded data:");
                    console.log(base64Data);
                    // You can do further processing with the base64Data here
                    arrayOfbaseImgs.push(base64Data);
                })
                .catch(error => console.error("Error reading file:", error));
        }

        return this.http.put(`http://102.23.120.135:4000/api/v1/admin/products/${'6647632b59134682c116dc02'}/upload_images`,
            { images: arrayOfbaseImgs }, httpOptions)
            .subscribe(response => {
                console.log('Images Uploaded', response);
                // this.router.navigate(['/sellers-account-settings-page'])

            }, error => {
                console.error('Error:', error);
            });


    }

    getImagesCost() {

        this.totalImagesUploads = this.selectedImages?.cachedFileArray?.length;

        if (this.totalImagesUploads == 0) {
            return 0;
        }else if (this.totalImagesUploads <= 5) {
            return 5;
        } else {
            return Math.ceil(this.selectedImages?.cachedFileArray?.length / 5) * 5;
        }

    }

    setDeliveryOptions() {
        this.modalRef = this.modalService.open(ConfirmDialogComponent,
        {size: 'lg', backdrop: 'static'});
        this.modalRef.componentInstance.title = 'Set Delivery Options';
        this.modalRef.componentInstance.parentData = '';
        this.modalRef.result.then(
            (result: any) => {
                if (result === 'success') {
                }
            },
            (reason: any) => {
            }
        );
    }



    // Function to convert file to Base64
    isGrayedOut = true;

    convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
}
