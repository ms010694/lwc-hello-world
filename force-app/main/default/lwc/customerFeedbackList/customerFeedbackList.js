import { LightningElement, api, track } from 'lwc';
import getFeedbacklist from '@salesforce/apex/CustomerFeedbackListApexController.getFeedbacklist';
import deleteRecord from '@salesforce/apex/CustomerFeedbackListApexController.deleteRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    { label: 'Contact Name', fieldName: 'cname', type :'text'},
    { label: 'Email', fieldName: 'cemail', type: 'email' },
    { label: 'Feedback number', fieldName: 'Name', type :'text'},
    { label: 'Comment', fieldName: 'Comment__c', type: 'text' }
];

export default class CustomerFeedbackList extends LightningElement {
    @track Feedbacklist=[];
    @track data=[];
    @track columns = columns;
    @track showlist=true;
    @track showform=false;
    @track firstname;
    connectedCallback() {
        
        getFeedbacklist()
        .then(result => {
            this.Feedbacklist=result;
           // this.data=result;
          //  alert(this.Feedbacklist[0].Contact__r.Name+':'+this.Feedbacklist[0].Contact__r.Email);
          for(let i=0;i<this.Feedbacklist.length;i++){
              //this.data.push({cname : this.Feedbacklist[i].Contact__r.Name,cemail : this.Feedbacklist[i].Contact__r.Email});
              //alert(this.Feedbacklist[i].Contact__r);
             // if(this.Feedbacklist.Contact__r){
                  this.Feedbacklist[i].cname=this.Feedbacklist[i].Contact__r.Name;
                  this.Feedbacklist[i].cemail=this.Feedbacklist[i].Contact__r.Email;
            //  }

            }
            this.data=this.Feedbacklist;
         /*   const evt = new ShowToastEvent({
                title: 'Feedback',
                message: 'Success',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);*/
        })
        .catch(error => {
            this.error = error;
        });  
    }
    handleedit(event){
        alert(event.target.name);
        this.showlist=false;
        this.showform=true;
        this.firstname=event.target.name;
        //this.template.querySelector('c-customer-feedback-form').handlechildedit();
    }
    handledelete(event){

        deleteRecord({feedid : event.target.name})
        .then(result => {
            this.connectedCallback();
            const evt = new ShowToastEvent({
                title: 'deleted Successfully',
                message: 'Success',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        })
        .catch(error => {

        })
        
    }
}