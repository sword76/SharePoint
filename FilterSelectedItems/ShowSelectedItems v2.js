// Filtering list items by selected chekcboxes v2.0
// Sergey Chirva

<
script type = "text/javascript" >

  SP.SOD.executeOrDelayUntilScriptLoaded('sp.js', 'SP.ClientContext', ShowSelectedItems);

function exportSelectedItems() {
  var ctx = new SP.ClientContext.get_current();
  var items = SP.ListOperation.Selection.getSelectedItems(ctx); // Reading list content.

  if (ctx != indefined && ctx != null) {
    var camlQuery = new SP.CamlQuery(); // Creating new empty CAML query.
    let camlQueryString = '';

    // Filling caml query by selected items IDs.

  }


}

// Query failed funtion with error messages.
function onQueryFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

<
/script>