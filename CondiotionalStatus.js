// List View Conditional Formating - Статус оборудования
// Sergey Chirva

(function() {
  // Create an object for output render with list contex information.
  var statusContext = {};
  statusContext.Templates = {};
  // Apply the rendering for a "Статус оборудования" fuild on the List View
  statusContext.Templates.Fields = {
    '_x0421__x0442__x0430__x0442__x04': { 'View': statusFiledTemplate }
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(statusContext);

})();

// Funсtion for rendering logic to the current view.
function statusFiledTemplate(ctx) {
	if (ctx != null && ctx.CurrentItem !=null){
	  	var status = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
//		console.log(status);	
		  // Change HTML element with color according to field value.
		  switch (status) {
		    case 'Транзит':
		      return "<span style='color : orange'>" + status + "</span>";
		      break;
		    case 'На поверке':
		      return "<span style='color : brown'>" + status + "</span>";
		      break;
		    case 'В регионе':
		      return "<span style='color : green'>" + status + "</span>"; 
	  	  }
	}
}
