// Filtering list items by selected chekcboxes v2.1
// Sergey Chirva

<script type = "text/javascript" >

SP.SOD.executeOrDelayUntilScriptLoaded('sp.js', 'SP.ClientContext', exportToWord);

function exportToWord() {
  var ctx = new SP.ClientContext.get_current();
  var selectedItems = SP.ListOperation.Selection.getSelectedItems(ctx);
  var selectedList = SP.ListOperation.Selection.getSelectedList();
  var list = SP.ClientContext.get_current().get_web().get_lists().getbyId(selectedList);
  var fieldsArray = ['ID', '_x041e__x043f__x0438__x0441__x04', 'egrsi'];
  var camlQuery = new SP.CamlQuery(); // Create new empty CAML query string.

  // Creating CAML query according to a list selected items IDs.
  if (selectedItems.length > 0) {
    var camlQueryString = "<View><ViewFields>";
    camlQueryString += "<View>" + "<Query>" + "<Where>" + "<In>" + "<FieldRef Name='ID' />" + "<Values>";

    for (var i=0; i < selectedItems.length; i++) {
      camlQueryString += "<Value Type='Integer'>" + selectedItems[i].id + "</Value>";
    }

    camlQueryString += "</Values>" + "</In>" + "</Where>" + "</Query>" + "</View>";

    var strColumnsInclude = 'Include(';
    for (var i = 0; i < fieldsArray.length - 1; i++) {
      strColumnsInclude += fieldsArray[i] + ', ';
    }
    strColumnsInclude += fieldsArray[i] + ')';

   console.log(strColumnsInclude);

    var xmlCamlQuery = new SP.CamlQuery();
    xmlCamlQuery.set_viewXml(camlQueryString);
    // console.log(xmlCamlQuery);

  } else {
    alert('Пожалуйста, выберете позиции из списка');
    return;
  }

  this.collListItem = list.getItems(xmlCamlQuery);
//  ctx.load(collListItem, 'Include(Id, Title, egrsi'); // Put names of the needed list fields.
  ctx.load(collListItem, strColumnsInclude); // Put names of the needed list fields.
  ctx.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {
  var listItemEnumerator = collListItem.getEnumerator();
  var printHTML = '<html>\n<head>\n<title>Список оборудования для сдачи на поверку</title>\n</head>\n<body>\n<div style="text-align: center;"><img src="/sites/chir0508/images/cpc_logo.gif" style="float:left;">\n<h5 style="color:red; -webkit-margin-after: 0;">Акционерное Общество</h5><h4 style="color:blue; -webkit-margin-before: 0;">"Каспийский Трубопроводный Консорциум - Р"</h4>\n</div>\n';

  while (listItemEnumerator.moveNext()) {
    var currentItem = listItemEnumerator.get_current();
    printHTML += '_x041e__x043f__x0438__x0441__x04' + 'egrsi' + '\n';
  }
  printHTML += '\n</body>\n</html>';
  // Pasing te HTML code to MS Word file.
  htmlToWord(printHTML);
}

function onQueryFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

// Export to MS Word document.
function htmlToWord(html) {
  var iframe = document.getElementById(htmlDownloadFrame);
  iframe = iframe.contentWindow || iframe.contentDocument;
  iframe.document.open("text/html", "replace");
  iframe.document.write(html);
  iframe.document.close();
  iframe.focus();
  iframe.document.execCommand('SaveAs', true, 'Word.doc');
}

</script>
