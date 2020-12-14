public with sharing class CustomerFeedbackListApexController {
  
    @AuraEnabled
    public static List<Customer_Feedback__c> getFeedbacklist(){
      //  List<Wrapper> wrapperlist=new List<Wrapper>();
      List<Customer_Feedback__c> feedbacklist=new List<Customer_Feedback__c>();
        try {
            
            feedbacklist=[Select Id,Contact__r.Name,Contact__r.Email,Name,Comment__c from Customer_Feedback__c];
            if(feedbacklist.size()>0){
              /*  for(Customer_Feedback__c feedbackobj : feedbacklist){
                    Wrapper wrap=new Wrapper(feedbackobj.Contact__r.Name,feedbackobj.Contact__r.Email,feedbackobj.Name,feedbackobj.comment__c);
                    wrapperlist.add(wrap);
                }*/
                
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
       // System.debug(wrapperlist);
        return feedbacklist;
    }
  /*  Public class Wrapper{
        @AuraEnabled public String contactname;
        @AuraEnabled public String contactemail;
        @AuraEnabled public String feedbacknumber;
        @AuraEnabled public String feedbackcomment;
        public Wrapper(String contactname,String contactemail,String feedbacknumber,String feedbackcomment){
            this.contactname=contactname;
            this.contactemail=contactemail;
            this.feedbacknumber=feedbacknumber;
            this.feedbackcomment=feedbackcomment;
        }
    }*/
    @AuraEnabled
    public static void deleteRecord(String feedid){
        try {
            delete [Select id from Customer_Feedback__c where Id =:feedid];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
