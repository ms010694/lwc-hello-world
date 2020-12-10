public with sharing class SaveCustomerFeedbackFormDetails {
  
    @AuraEnabled
    public static void saveFeedbackDetails(String firstname,String middlename,String lastname,String email, Date dob,String comment){
        try {
            
            List<Contact> conlist=[Select id,FirstName,MiddleName,LastName,Birthdate,email from Contact where email=:email];
            if(conlist.size()>0){
                 customer_feedback__c custfeedback=new customer_feedback__c();
                 custfeedback.Contact__c=conlist[0].id;
                 custfeedback.comment__c=comment;
                 insert custfeedback;
            }
            else{
                Contact conobj=new Contact();
                conobj.FirstName=firstname;
               if(!String.isBlank(middlename)){
                    conobj.MiddleName=middlename;
               }
                conobj.LastName=lastname;
                System.debug('DOB==> '+ dob);
               if(dob != null){
                   conobj.birthdate=dob;
               }
              
                conobj.email=email;
                insert conobj;
                customer_feedback__c custfeedback=new customer_feedback__c();
                custfeedback.Contact__c=conobj.id;
                custfeedback.comment__c=comment;
                insert custfeedback;
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
