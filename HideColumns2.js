// Hide ExpireDays field v2.0.
// By Sergey Chirva

(function() {
    var hidectx = {};
    hidectx.Templates = {};
    hidectx.OnPostRender = hideFeilds;

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(hidectx);
})();

function hideFeilds(hidectx) {
    var fieldsNames = ["ExpireDays","_x0417__x0430__x043a__x0440__x04"]; // Names of fields to be hidden.
    
    fieldsNames.forEach(function(name) { 
        
        console.log(name); 
        
        var header = document.querySelectorAll("[name=" + name + "]")[0].parentNode;
        
        console.log(header);
        
        var index = [].slice.call(header.parentNode.children).indexOf(header) + 1;
        header.style.display = "none";
        for (var i = 0, cells = document.querySelectorAll("td:nth-child(" + index + ")"); i < cells.length; i++) {
            cells[i].style.display = "none";
        }
    });
}
