{
"translatorID":"77f998b6-eecd-432f-b7eb-9eaf23cf5960",
"translatorType":2,
"label":"Roam Metadata Export",
"creator":"Sebastian Pech (based on Lukas Kawerau)",
"target":"md",
"minVersion":"2.0",
"maxVersion":"",
"priority":200,
"configOptions": {
  "getCollections": "true",
  "dataMode": "rdf/xml"
},
"inRepository":false,
"lastUpdated":"2021-01-08 - 09:45"
}

function doExport() {
  var item;
  while (item = Zotero.nextItem()) {
  if (item.creators.length > 0) {
    var creatorsS = item.creators[0].lastName;
    if (item.creators.length > 2) {
      creatorsS += " et al.";
    } else if (item.creators.length == 2) {
      creatorsS += " & " + item.creators[1].lastName;
    }
  }

  var citationKey = (item.citationKey) ? "@"+item.citationKey : "(bib citkey missing)";
    Zotero.write('[[' + citationKey + ']]\n');

  if (item.creators.length > 0) {
    Zotero.write('  author:: ');
    for (author in item.creators) {
      if (item.creators[author].firstName !== undefined) {
        Zotero.write('[[' + item.creators[author].firstName + ' ' + item.creators[author].lastName + ']] ');
      } else {
        Zotero.write('[[' + item.creators[author].lastName + ']] ');
      }
    }
    Zotero.write('\n');
  }

    var titleS = (item.title) ? item.title : "(no title)";
    titleS = titleS.replace('<i>', '__')
    titleS = titleS.replace('</i>', '__')

    Zotero.write('  title:: ')
    Zotero.write(titleS + '\n')

    if(item.publicationTitle !== undefined) {
      Zotero.write('  publication:: ') 
      Zotero.write(item.publicationTitle + '\n')
    }
    
    var date = Zotero.Utilities.strToDate(item.date);
    var dateS = (date.year) ? date.year : item.date;   

    Zotero.write('  year:: ')
    Zotero.write(dateS + '\n')
    
  if (!(["book", "bookSection", "journalArticle"].includes(item.itemType))) {
    Zotero.write('  Access date:: ')
    Zotero.write(item.accessDate + '\n')
  }
    if (item.url !== undefined) {
      Zotero.write('  url:: [')
      Zotero.write(creatorsS)
      Zotero.write(' (' + dateS + '). ')
      titleS = titleS.replace(/__/g, "")
      Zotero.write(titleS + '.')
      if(item.publicationTitle !== undefined) {
        Zotero.write(' ' + item.publicationTitle)
      }
      Zotero.write('](' + item.url + ')\n')
    }


    var library_id = item.libraryID ? item.libraryID : 0;  
    var itemLink = 'zotero://select/items/' + library_id + '_' + item.key;

    Zotero.write('  Zotero link:: ')
    Zotero.write('[Zotero Link](' + itemLink + ')\n')

    // Zotero.write('  topics:: \n')
    
    Zotero.write('  tags:: #view-later\n')

    // Zotero.write('  citation graph:: {{[[query]]: {and: [[quote]] [[citing]] [['+citationKey+']] {not: [[query]]}}}}\n')
    

  }
}
