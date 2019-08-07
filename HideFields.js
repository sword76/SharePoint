(function() {

  function HideFields(ctx) {
    var fieldName = "FeildName"; // Put name of the feild here.
    var header = document.querySelectorAll("[displayname=" + fieldName + "]")[0].parentNode;
    var index = [].slice.call(header.parentNode.children).indexOf(header) + 1;
    header.style.display = "none";
    for (var i = 0, cells = document.querySelectorAll("td:nth-child(" + index + ")"); i < cells.length; i++) {
      cells[i].style.display = "none";
    }
  }

  function registerRenderer() {
    var ctxForm = {};
    ctxForm.Templates = {};
    ctxForm.OnPostRender = HideFields;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctxForm);
  }
  ExecuteOrDelayUntilScriptLoaded(registerRenderer, 'clienttemplates.js');

})();