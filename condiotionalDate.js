// List View Conditional Formating - Индикация просроченной даты поверки.
// Sergey Chirva

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

// Funсtion for rendering logic to the current view and add warning mark.
function dateFormat(ctx) {
  if (ctx != null && ctx.CurrentItem != null) {
    var calibrationDate = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    var calibrationNeeded = ctx.CurrentItem['CalibrationNeeded'];
	
	console.log(calibrationDate + ' ' + calibrationNeeded);
	
	if (calibrationDate != '') {
		if (calibrationNeeded == 'Yes') {
			return calibrationDate + "<img src='/sites/chir0508/images/warning.gif' hspace='2' alt='Требуется провести поверку прибора'>";			
		}
		return calibrationDate;
	}
  }
}
