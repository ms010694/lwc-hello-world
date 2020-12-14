import { LightningElement, api, track } from 'lwc';
import saveFeedbackDetails from '@salesforce/apex/SaveCustomerFeedbackFormDetails.saveFeedbackDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CustomerFeedbackForm extends LightningElement {

   @track firstname;
   @track middlename='';
   @track lastname;
   @track email;
   @track dob=null;
   @track comment;
   @api editfirstname='hi';
   @track showform=true;
   @track showlist=false;
   connectedCallback(){
       //this.showform=true;
       alert('child==>' + this.editfirstname);
      // alert(this.template.querySelector('[data-id^="firstname"]').value);

   }
   handleSave(event){
      this.firstname=this.template.querySelector('[data-id^="firstname"]').value;
      this.middlename=this.template.querySelector('[data-id^="middlename"]').value;
      this.lastname=this.template.querySelector('[data-id^="lastname"]').value;
      this.email=this.template.querySelector('[data-id^="email"]').value;
      this.dob=this.template.querySelector('[data-id^="dob"]').value;
      this.comment=this.template.querySelector('[data-id^="comment"]').value;
      //alert('Save'+this.firstname+':'+this.middlename+':'+this.lastname+':'+this.dob+''+this.comment);
      
      saveFeedbackDetails({firstname : this.firstname, middlename : this.middlename,lastname : this.lastname, email : this.email, dob : this.dob, comment : this.comment})
            .then(result => {
               // this.contactid=result;
               const evt = new ShowToastEvent({
                    title: 'Feedback Saved!',
                    message: 'SUCCESS',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                this.error = error;
            });
    }
    handleRefresh(event){
        this.template.querySelector('[data-id^="firstname"]').value='';
        this.template.querySelector('[data-id^="middlename"]').value='';
        this.template.querySelector('[data-id^="lastname"]').value='';
        this.template.querySelector('[data-id^="email"]').value='';
        this.template.querySelector('[data-id^="dob"]').value=null;
        this.template.querySelector('[data-id^="comment"]').value='';
    }
    handleback(event){
         this.showform=false;
         this.showlist=true;
    }
   }
