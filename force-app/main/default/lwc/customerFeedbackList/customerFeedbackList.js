import { LightningElement, track } from 'lwc';
import getFeedbacklist from '@salesforce/apex/CustomerFeedbackListApexController.getFeedbacklist';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    { label: 'Contact Name', fieldName: 'Contact__r.Name', type :'text'},
    { label: 'Email', fieldName: 'Contact__r.Email', type: 'email' },
    { label: 'Feedback number', fieldName: 'Name', type :'text'},
    { label: 'Comment', fieldName: 'Comment__c', type: 'text' }
];

export default class CustomerFeedbackList extends LightningElement {
    @track Feedbacklist=[];
    @track data=[];
    @track columns = columns;
    connectedCallback() {
        
        getFeedbacklist()
        .then(result => {
            this.Feedbacklist=result;
            this.data=result;
            alert(this.Feedbacklist[0].Contact__r.Name+':'+this.Feedbacklist[0].Contact__r.Email);
          /*for(i=0;i<Feedbacklist.length;i++){
              data.push({name : this.Feedbacklist[i].contactname,email : this.Feedbacklist[i].contactemail});
            }*/
            
            const evt = new ShowToastEvent({
                title: 'Feedback',
                message: 'Success',
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