// Filtering list items by selected chekcboxes v2.0
// Sergey Chirva

<
script type = "text/javascript" >

SP.SOD.executeOrDelayUntilScriptLoaded('exportToWord', 'SP.ClientContext', 'sp.js');

<<<<<<< HEAD
function exportSelectedItems() {
  var ctx = new SP.ClientContext.get_current();
  var items = SP.ListOperation.Selection.getSelectedItems(ctx); // Reading list content.

  if (ctx != indefined && ctx != null) {
    var camlQuery = new SP.CamlQuery(); // Creating new empty CAML query.
    let camlQueryString = '';

    // Filling caml query by selected items IDs.

=======
function exportToWord() {
  var ctx = new SP.ClientContext.get_current();
  var selectedItems = SP.ListOperation.Selection.getSelectedItems(ctx);

  var camlQuery = new SP.CamlQuery(); // Create new empty CAML query string.

  // Creating CAML query according to a list selected items IDs.
  if (selectedItems.length > 0) {
    if (selectedItems.length == 1) {
      camlQuery += '<Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[0].id + '</Value></Eq></Where>';
    } else if (selectedItems.length == 2) {
      camlQuery += '<Where><Or><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[0].id + '</Value></Eq><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[1].id + '</Value></Eq></Or></Where>';
    } else {
      var i = 0;
      camlQuery += '<Where>';
      for (i = 0; i < selectedItems.length - 1; i++) {
        camlQuery += '<Or><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[i].id + '</Value></Eq>';
      }
      camlQuery += '<Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[i].id + '</Value></Eq>';
      for (i=0 ; i < selectedItems.length - 1; i++) {
        camlQuery += '</Or>';
      }
      camlQuery += '</Where>';
>>>>>>> c5505f4cbba777edd3b6145dce8ba8987cbe4cdb
  }
  } else {
    alert('Пожалуйста, выберете позиции из списка');
    return;
  }

  var xmlCamlQuery = new SP.CamlQuery();
  xmlCamlQuery.set_viewXml('<View><Query>' + camlQuery + '</Query></View>');
  console.log(xmlCamlQuery);

<<<<<<< HEAD

}

// Query failed funtion with error messages.
function onQueryFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
=======
>>>>>>> c5505f4cbba777edd3b6145dce8ba8987cbe4cdb
}

<
/script>