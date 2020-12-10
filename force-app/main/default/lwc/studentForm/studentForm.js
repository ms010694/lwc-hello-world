import { LightningElement, api, track } from 'lwc';
import createContact from '@salesforce/apex/studentFormCtrl.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class StudentForm extends LightningElement {
    name="";
    phone="";
    address="";
    message = "";
    @track contactid;
    createContactHandler(event){
        this.name = this.template.querySelector('[data-id^="handleStdName"]').value;
        this.phone = this.template.querySelector('[data-id^="handlePhone"]').value;
        this.address = this.template.querySelector('[data-id^="handleAddress"]').value;
        console.log('Name : '+this.name);
        console.log('phone : '+this.phone);
        console.log('addres : '+this.address);
        
        createContact({name : this.name, phone : this.phone, address : this.address})
            .then(result => {
                this.contactid=result;
                const evt = new ShowToastEvent({
                    title: 'Contact Created',
                    message: 'Contact Id :' + this.contactid,
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                this.error = error;
            });
    }
}