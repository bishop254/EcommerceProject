import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadWithPreview } from 'file-upload-with-preview';

@Component({
    moduleId: module.id,
    templateUrl: './signup-docs.html',
    styleUrls: ['./signup-docs.scss']
})

export class SignupDocsComponent implements OnInit {


    selectedImages!: FileUploadWithPreview;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        // multiple image upload
        this.selectedImages = new FileUploadWithPreview('mySecondImage', {
            images: {
                baseImage: '/assets/images/file-preview.svg',
                backgroundImage: '',
            },
            multiple: true,
        });
    }


    uploadImages() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.put(`http://102.23.120.135:4000/api/v1/admin/products/${'6618c5290a2b37fbb4f3d693'}/upload_images`,
            this.selectedImages.cachedFileArray, httpOptions)
            .subscribe(response => {
                console.log('Images Uploaded', response);
                // this.router.navigate(['
                // /sellers-account-settings-page'])

            }, error => {
                console.error('Error:', error);
            });


    }
}
