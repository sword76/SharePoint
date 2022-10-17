// List View Conditional Formating - Индикация сроков завершения договора.
// by Sergey Chirva

(function() {
  // Create an object for output render with list contex information.
  var dateContext = {};
  dateContext.Templates = {};
  // Apply the rendering for a "Дата поверки" and "CalibrationNeeded" fuilds on the List View.
  dateContext.Templates.Fields = {
    '_x0414__x0430__x0442__x0430__x00' : { 'View': dateFormat }
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(dateContext); 
})();

// Function for rendering logic to the current view and add warning mark.
function dateFormat(ctx) {

    var today = new Date();
    console.log(today);

    if (ctx != null && ctx.CurrentItem != null) {
      var contractDate = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
      console.log(contractDate);

      var contractClosed = ctx.CurrentItem['_x0417__x0430__x043a__x0440__x04'];
      console.log(contractClosed);
      
      var daysLeft = ctx.CurrentItem['ExpireDays'];
      console.log(daysLeft);

    if (contractDate != '') {
      if (contractClosed == 'Да' || contractClosed == 'Yes') {
        return "<span><font style='padding: 1px 4px; border-radius: 5px; color: white; font-weight: bold; display: inline-block; background-color: grey;'>" + contractDate + "</font></span>";			
      }
      if (daysLeft <= 182) {
        return "<span><font style='padding: 1px 4px; border-radius: 5px; color: white; font-weight: bold; display: inline-block; background-color: red;'>" + contractDate + "</font></span>";			
      }
      else if (daysLeft <= 364) {
        return "<span><font style='padding: 1px 4px; border-radius: 5px; color: white; font-weight: bold; display: inline-block; background-color: goldenrod;'>" + contractDate + "</font></span>";			
      }

      return contractDate;
    }
  }
}