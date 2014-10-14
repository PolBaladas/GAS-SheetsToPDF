
function sheetToPdf() {
  var data = SpreadsheetApp.getActiveSheet().getRange("A2:B4").getValues();          //Get data range
  var row;
  
  var template_file = DriveApp.getFilesByName("Doc_template")
  while(template_file.hasNext()){
    template = template_file.next();                                                 //Find template
  }
  
  var templateCopyId = template.makeCopy().setName("Trains Timetable").getId();     //Make a copy of the template and get the ID of that copy.
  var doc = DocumentApp.openById(templateCopyId);                                   //Open the template copy doc with DocumentApp.
  var docBody = doc.getBody();
  
  for(i = 0; i<data.length; i+=1){
    row = data[i];
    
    
    docBody.replaceText("%t"+i+"%", row[0]);                                         //Replace the marks "%something%" with data.
    docBody.replaceText("%n"+i+"%", row[1]);
    
  }
  
  doc.saveAndClose();
  var file = doc.getAs('application/pdf').setName(doc.getName()+".pdf");             //Create the pdf file from the template copy.
  if(file!=null){DocsList.createFile(file)}
  DocsList.getFileById(doc.getId()).setTrashed(true);                                //Delete the template copy.

}

