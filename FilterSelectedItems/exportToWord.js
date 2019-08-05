< script src = "//code.jquery.com/jquery-1.10.1.min.js" > < /script> <
  script >
  var tempTableId;
var tempTitle;
var row;
var rowData;
var context;
var selectedItems;
var selectedList;
var oList;
var oFieldCollection;
var collListItem;
var mainExportContainer;
var table;
var fieldEnumerator;
var oField;
var fieldsArray = ['ID', 'Title'];
//var fieldsArray = ['ID','Title','Male','Female','new_x0020_test']; //Insert the internal name of the column of your list.Note : ID column and Title is mandatory.Please uncomment the line.
var viewname;
var listColumns;

function exportSelectedItemsToWord() {
  this.context = SP.ClientContext.get_current();
  this.selectedItems = SP.ListOperation.Selection.getSelectedItems(context);
  this.selectedList = SP.ListOperation.Selection.getSelectedList();
  this.oList = SP.ClientContext.get_current().get_web().get_lists().getById(selectedList);
  // to get the selected item and the selected List.
  var camlQuery = new SP.CamlQuery();
  var stringCamlQuery = "<View><ViewFields>"
  stringCamlQuery = "<View>" + "<Query>" + "<Where>" + "<In>" + "<FieldRef Name='ID' />" + "<Values>";
  for (var i = 0; i < selectedItems.length; i++) {
    stringCamlQuery += "<Value Type='Integer'>" + selectedItems[i].id + "</Value>";
  }
  stringCamlQuery += "</Values>" + "</In>" + "</Where>" + "</Query>" + "</View>";
  var strColumnsInclude = 'Include(';
  for (var i = 0; i < fieldsArray.length - 1; i++) {
    strColumnsInclude += fieldsArray[i] + ', ';
  }
  strColumnsInclude += fieldsArray[i] + ')';
  camlQuery.set_viewXml(stringCamlQuery);
  this.collListItem = oList.getItems(camlQuery);
  context.load(this.collListItem, strColumnsInclude);
  context.executeQueryAsync(Function.createDelegate(this, this.onQueryexportSucceeded), Function.createDelegate(this, this.onQueryexportFailed));
}
//Creating a html table of the retrieved selected item.
function onQueryexportSucceeded() {
  var fieldName, fieldValue;
  $('#mainExportContainer').html('');
  mainExportContainer = $('<div></div>').attr('id', 'mainExportContainer').css('display', 'none');
  $("<h1 align='center'>List Item(s)</h2>").appendTo("#mainExportContainer"); // Heading of the Word document Page.
  itemEnumerator = this.collListItem.getEnumerator();
  var $table;
  while (itemEnumerator.moveNext()) {
    this.oListItem = itemEnumerator.get_current();
    tempTableId = 'listItem_' + this.oListItem.get_item('ID');
    tempTitle = this.oListItem.get_item('Title');
    $('<h2 align="center">' + tempTitle + '</h2>').appendTo('#mainExportContainer');
    $table = $('<table></table>');
    $table.attr('id', tempTableId);
    $("<thead><tr><td><b>Column Name</b></td><td><b>Column Value</b></td><tr></thead>").appendTo($table);
    //Creating Column Name and Column Value as a rows.
    var strValues;
    var j;
    for (var i = 0; i < fieldsArray.length; i++) {
      fieldName = fieldsArray[i];
      var tempfieldName = fieldName.replace(/\_[^_]*\_/g, ' ');
      row = $('<tr></tr>');
      rowData = $('<td></td>').addClass('fieldName').text(tempfieldName);
      row.append(rowData);
      fieldValue = this.oListItem.get_item(fieldName);
      if (fieldValue != null) {
        if (fieldValue.constructor.toString() == SP.FieldUserValue.toString()) {
          rowData = $('<td></td>').addClass('fieldValue').text(strip(fieldValue.get_lookupValue()));
        } else if (fieldValue.constructor.toString() == SP.FieldLookupValue.toString()) {
          rowData = $('<td></td>').addClass('fieldValue').text(strip(fieldValue.get_lookupValue()));
        } else if (fieldValue.constructor.toString() == "function Array() { [native code] }") {
          for (j = 0; j < fieldValue.length - 1; j++) {
            strValues += fieldValue[j] + ", ";
          }
          strValues += fieldValue[j];
          rowData = $('<td></td>').addClass('fieldValue').text(strip(strValues));
        } else {
          rowData = $('<td></td>').addClass('fieldValue').text(strip(fieldValue));
        }
      } else {
        rowData = $('<td></td>').addClass('fieldValue').text('');
      }
      row.append(rowData);
      $table.append(row);
    }
    $table.appendTo($('#mainExportContainer'));
    $('<br style="page-break-before: always">').appendTo($('#mainExportContainer'));
  }
  $("#mainExportContainer table tr td:first-child").css('background-color', 'grey');
  $("#mainExportContainer img").remove();
  var htmlData = '<html xmlns:office="urn:schemas-microsoft-com:office:office" xmlns:word="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><xml><word:WordDocument><word:View>Print</word:View><word:Zoom>90</word:Zoom><word:DoNotOptimizeForBrowser/></word:WordDocument></head><body>' + document.getElementById('mainExportContainer').innerHTML + "</body></html>";
  exportElementToWord(htmlData);
  //Passing the Html to microsoft uri to export it as Word file
}

function onQueryexportFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function exportElementToWord(html) {
  if (navigator.appName === "Microsoft Internet Explorer") {
    var iframe = document.getElementById('htmlDownloadFrame');
    iframe = iframe.contentWindow || iframe.contentDocument;
    iframe.document.open("text/html", "replace");
    iframe.document.write(html);
    iframe.document.close();
    iframe.focus();
    iframe.document.execCommand('SaveAs', true, 'Word.doc');
  } else {
    if (console && console.log) {
      console.log('Trying to call getCsvFileForIE with non IE browser.');
    }
  }
}

function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
} <
/script>

<
div id = "mainExportContainer"
style = "display: none;" > < /div> <iframe id="htmlDownloadFrame" style="display: none;"></iframe >
  <
  td > < input type = "button"
id = "btnSubmit"
value = "Export to word"
onclick = " exportSelectedItemsToWord()"
style = "
margin - left: 163 px;
margin - bottom: 14 px;
color: #fff;
background - color: #6496c8;
border: none;
border-radius: 15px;
box-shadow: 0 10px # 27496 d;
" /> </td>