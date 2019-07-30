// Filtering list items by selected chekcboxes v1.1
// Sergey Chirva

<
script type = "text/javascript" >

  function ShowSelectedItems(listTitle) {
    const context = new SP.ClientContext.get_current();
    const web = context.get_web().get_list().getByTitle(listTitle);

    if (context != indefined && context != null) {
      const list = web.getlist().getSelectedList();
      let camlQueryString = '';

      if (selectedItems.length > 0) {
        if (selectedItems.length == 1) {
          camlQueryString += '<Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[0].id + '</Value></Eq></Where>';
        } else if (selectedItems.length == 2) {
          camlQueryString += '<Where><Or><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[0].id + '</Value></Eq><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[1].id + '</Value></Eq></Or></Where>';
        } else {
          const i = 0;
          camlQueryString += '<Where>';
          for (i = 0; i < selectedItems.length - 1; i++) {
            camlQueryStr += '<Or><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[i].id + '</Value></Eq>';
          }
          camlQueryString += '<Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + selectedItems[i].id + '</Value></Eq>';
          for (i = 0; i < selectedItems.length - 1; i++) {
            camlQueryString += '</Or>';
          }
          camlQueryStr += '</Where>';
        }
      } else {
        alert('Пожалуйста, выберете позиции из списка.');
        return;
      };

      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml('<View><Query>' + camlQueryStr + '</Query></View>');

      consolelog(camlQuery);

      this.collListItem = list.getItems(camlQuery);
      context.load(collListItem, 'Include(Id, _x041a__x043e__x043c__x043f__x040, _x041e__x043f__x0438__x0441__x04');
      context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    };
  };

function onQuerySucceeded() {
  let listItemEnumerator = collListItem.getEnumerator();
  let PrintHTML = '<html>\n<head>\n<title>Список оборудования для сдачи на поверку</title>\n</head>\n<body>\n<div style="text-align: center;"><img src="/sites/chir0508/images/cpc_logo.gif" style="float:left;">\n<h5 style="color:red; -webkit-margin-after: 0;">Акционерное Общество</h5><h4 style="color:blue; -webkit-margin-before: 0;">"Каспийский Трубопроводный Консорциум - Р"</h4>\n<h2>Перечень оборудования, передаваемого на поверку в ФГУ "Краснодарский ЦСМ" по договору № 00-001926/С | R-PD-15-0043 от 15.12.15 г.:</h2></div>\n';

  while (listItemEnumerator.moveNext()) {
    var currentItem = listItemEnumerator.get_current();
    let i = 1;
    PrintHTML += i + currentItem.get_item('_x041a__x043e__x043c__x043f__x040' + ' ' + '_x041e__x043f__x0438__x0441__x04') + '\n';
    PrintHTML += '\n</body>\n</html>';

    //Open new window to print
    let PrintingWindow = window.open("", "PrintWebPart", "toolbar,width=1024,height=768,scrollbars,resizable,menubar");
    PrintingWindow.document.open();
    PrintingWindow.document.write(PrintHTML);
    PrintingWindow.document.close();
    PrintingWindow.focus();
    //Open Print Window
    //		PrintingWindow.print();
    //		PrintingWindow.close();
  }
};

function onQueryFailed() {
  alert('failed. Message:' + args.get_message())
};

<
/script>