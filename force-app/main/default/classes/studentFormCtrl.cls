public with sharing class studentFormCtrl {
    @AuraEnabled
    public static String createContact(String name,Integer phone,String address){
        Contact conobj=new Contact();
        try {
            System.debug('Hello g');
            System.debug('Name ===> ' + name);
            System.debug('Phone ===> ' + phone);
            System.debug('Address ===> ' + address);
            
            conobj.LastName=name;
            insert conobj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return conobj.Id;
    }

}
