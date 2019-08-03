// Filtering list items by selected chekcboxes v2.0
// Sergey Chirva

<
script type = "text/javascript" >

  SP.SOD.executeOrDelayUntilScriptLoaded('sp.js', 'SP.ClientContext', ShowSelectedItems);

function ShowSelectedItems() {
  var ctx = new SP.ClientContext.get_current();
  var items = SP.ListOperation.Selection.getSelectedItems(ctx);

  var mySelected = '';

  for (var i in items) {
    mySelected += items[i].id + '|';
  }

  console.log(mySelected);
}

<
/script>