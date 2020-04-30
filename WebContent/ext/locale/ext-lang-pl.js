/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-09-18 17:18:59 (940c324ac822b840618a3a8b2b4b873f83a1a9b1)
*/
/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * Polish Translations
 * updated to 2.2 by Condor (8 Aug 2008)
 */
Ext.onReady(function () {

    if (Ext.data && Ext.data.Types) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '$',
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.pl.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.pl.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: '{0} wybranych linii'
});

Ext.define("Ext.locale.pl.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Zamknij tę kartę"
});

Ext.define("Ext.locale.pl.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: 'Wartość w tym polu jest nieprawidłowa'
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.pl.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: 'Ładowanie ...'
});

Ext.define("Ext.locale.pl.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Today",
    minText: "This date is before the minimum date",
    maxText: "This date is after the maximum date",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Next Month (Control+Right)',
    prevText: 'Previous Month (Control+Left)',
    monthYearText: 'Choose a month (Control+Up/Down to move years)',
    todayTip: "{0} (Spacebar)",
    format: "d.m.y",
    startDay: 0
});

Ext.define("Ext.locale.pl.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: 'Anuluj'
});

Ext.define("Ext.locale.pl.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: 'Strona',
    afterPageText: 'z {0}',
    firstText: 'Pierwsza strona',
    prevText: 'Poprzednia strona',
    nextText: 'Następna strona',
    lastText: 'Ostatnia strona',
    refreshText: 'Odśwież',
    displayMsg: 'Rekordy są wyświetlane od {0} do {1}, łącznie {2}',
    emptyMsg: 'Brak danych do wyświetlenia'
});

Ext.define("Ext.locale.pl.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: 'Minimalna długość tego pola to {0}',
    maxLengthText: 'Maksymalna długość tego pola to {0}',
    blankText: 'To pole jest wymagane',
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.pl.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: 'Wartość w tym polu nie może być mniejsza niż {0}',
    maxText: 'Wartość w tym polu nie może być większa niż {0}',
    nanText: '{0} nie jest liczbą',
    negativeText: 'Wartość nie może być ujemna'
});

Ext.define("Ext.locale.pl.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: 'Niedostępny',
    disabledDatesText: 'Niedostępny',
    minText: 'Wybierz późniejszą datę w tym polu {0}',
    maxText: 'Wybierz wcześniejszą datę w tym polu {0}',
    invalidText: '{0} nie jest prawidłową datą - data musi być w formacie {1}',
    format: 'd.m.y',
    altFormats: 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d'
});

Ext.define("Ext.locale.pl.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: 'Ładowanie ...'
    });
});

Ext.define("Ext.locale.pl.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'To pole musi zawierać adres e-mail w formacie user@example.com ',
    urlText: 'To pole musi zawierać adres URL w formacie "http:/' + '/www.example.com"',
    alphaText: 'To pole musi zawierać tylko litery łacińskie i znak podkreślenia _ ',
    alphanumText: 'To pole powinno zawierać tylko litery łacińskie, cyfry i znak podkreślenia _ '
});

Ext.define("Ext.locale.pl.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function () {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.pl.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: 'Proszę czekać ...'
});

Ext.define("Ext.locale.pl.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: 'Sortuj rosnąco',
    sortDescText: 'Sortuj malejąco',
    lockText: 'Kolumna szpilki...',
    unlockText: 'Odepnij kolumnę',
    columnsText: 'Kolumny'
});

Ext.define("Ext.locale.pl.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Pusty)',
    groupByText: 'Grupuj według tego pola',
    showGroupsText: 'Wyświetl według grupy'
});

Ext.define("Ext.locale.pl.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: 'Nazwa',
    valueText: 'Wartość',
    dateFormat: "d.m.Y",
    trueText: "true",
    falseText: "false"
});

Ext.define("Ext.locale.pl.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("Ext.locale.pl.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("Ext.locale.pl.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'd.m.Y'
});

Ext.define("Ext.locale.pl.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "The time in this field must be equal to or after {0}",
    maxText: "The time in this field must be equal to or before {0}",
    invalidText: "{0} is not a valid time",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.pl.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "You must select at least one item in this group"
});

Ext.define("Ext.locale.pl.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "You must select one item in this group"
});

Ext.define("Ext.locale.pl.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: 'Anuluj',
        yes: "Tak",
        no: 'Nie',
    }
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.pl.Component", {
    override: "Ext.Component",
    titleDelMsgBox: 'Usuń rekord?',
    textDelMsgBox: 'Wpis zostanie usunięty ',
    titleEditWindow: 'Edytuj post',
    titleAddWindow: 'Dodaj rekord',
});

//////////////////////////////////
// TK Portal lacale costants  ////
/////////////////////////////////

Ext.define("TK.locale.pl.view.Viewport", {
    override: "TK.view.Viewport",
    headerPortal: 'Портал ОАО «ТрансКонтейнер»',
    headerUser: 'Użytkownik',
    headerLangLbl: 'Wybór języka'
});

Ext.define("TK.locale.pl.view.MenuTree", {
    override: "TK.view.MenuTree",
    title: 'Menu',
    treeUsers: 'Users',
    treeGroups: 'Groups',
    treeProjects: 'Projects',
    treeLogs: 'Logs',
    btnStat: 'Statistics',
    btnPrnTmpl: "Print templates",
    treeDirs: 'Handbooks',
    treeInstr: 'User guide',
    treeChangePw: 'Password change',
    treeExit: 'Exit',
    epd: 'EPD',
    smgs: 'SMGS',
    invoicelist: 'Invoice',
    aviso: 'Templates SMGS for CKP',
    cimsmgs: 'CIM/SMGS',
    aviso1: 'Templates SMGS for agents',
    slovnakl: 'Slovak waybill',
    smgs2: 'SMGS2',
    aviso2: 'Templates SMGS2',
    gu29k: 'GU-29k',
    doplist: 'Extra sheet',
    filesmgs: 'Graphics SMGS',
    filegu29k: 'Graphics GU',
    fileaviso: 'Graphics Templates SMGS',
    fileinvoice: 'Graphics Invoice',
    filecimsmgs: 'Graphics CIM/SMGS',
    avisogu29k: 'Templates GU for CKP',
    cim: 'CIM',
    avisocim: 'Templates CIM',
    files: 'Other documents',
    cmr: 'CMR',
    fileavisogu29k: 'Graphics Templates GU',
    gu27v: 'GU-27v',
    avisogu29k1: 'Templates GU for agents',
    avisocimsmgs: 'Templates CIM/SMGS',
    ved: 'Wagon and transfer list',

    btnKontYards  :"Terminal kontenerowy",
    btnKontYard    :'Przechowywanie / umieszczanie kontenerów',
    btnKont         :'Lista kontenerów',
    btnKontPoezdIn    :'Przyjazd pociągu',
    btnKontPoezdOut    :'Odjazd pociągu',
    btnKontReports    :'Raporty',
    kyreport1: 'Raport 1',
    kyreport2: 'Raport 2',
    kyreport3: 'Raport 3',
    kyreport4: 'Raport 4',
    kyreport5: 'Raport 5',
    kyreport6: 'Raport 6'
});

Ext.define("TK.locale.pl.stat.List", {
    override: "TK.view.stat.List",
    title: 'Statystyka'
});

Ext.define("TK.locale.pl.view.DocsList", {
    override: "TK.view.DocsList",

    btnStat: 'Statystyki',
    btnRestore: 'Przywróć',
    btnDestroy: 'Zniszcz',
    btnPrint: 'Drukuj PDF',
    btnPrintView: 'Wyświetl PDF',
    btnCreate: 'Utwórz',
    btnCopy: 'Kopia',
    btnCopyAviso: 'Kopiuj do szablonu',
    btnCopySelect: 'Kopiuj, wybierz ...',
    btnCopy2ArchSel: 'Skopiuj zaznaczenie do archiwum',
    btnCopy2ArchTrN: 'Skopiuj do archiwum według numeru pociągu',
    btnCopy2RouteSel:'Kopiuj / przenieś zaznaczenie na kierunek',
    btnCopy2RouteTrN: 'Kopiuj / przenieś na kierunek według numeru pociągu',
    btnEdit: 'Edytuj',
    btnDelete: 'Usuń',
    btnArchive: 'Archiwum',
    btnMakeSmgs: 'Utworzyć SMGS',
    btnMakeSmgsXls: 'Utworzyć na podstawie XLS plika',
    btnMakeCimSmgs: 'Aby utworzyć  CIM / SMGS',
    btnAppend2Smgs: 'Dodaj do SMGS',
    btnAppend2CimSmgs: 'Dodaj do CIM / SMGS',
    btnMakeGU: 'Aby utworzyć GU',
    btnDownload: 'Pobierz',
    btnHistory: 'Historia',
    btnBindPrint: 'dołącz wydruk',
    btnSelectPrint: 'Wybierz szablon',
    btnExch: 'Wymiana',
    btnExchTBC: 'ТБЦ',
    btnExchBCh1: 'Otwórz / zamknij do edycji',
    btnExchBCh: 'BCH',
    btnExchFTS: 'ФТС',
    btnExchBTLC: 'BTLC',
    btnExchTdgFTS: 'ТДГ',
    btnReports: 'Raporty',
    btnView: 'Zobacz',
    btnSpecs:'Specyfikacja',
    btnInvoiceImport:'Import faktury',

    btnCont: 'Przesyłka kontenerowa',
    btnVag: 'wagonowa',
    btnContsList: 'Wykaz kontenerów / wagonów',
    btnSmgs: 'SMGS',

    btnDopList: 'Dodatkowy list',
    btnUploadCSDocs9: 'Doc. wyślij',
    btnUploadPogruzList: 'Lista załaunkowa',
    btnUploadPogruzListPoezd: 'Lista załadunkowa dla pociągu',
    btnContsList1: 'Wykaz',

    btnPlusDocs: '+ Dokumenty',
    btnPlusSmgsInv: '+ Smgs i faktury',
    btnPlusInv: '+ Faktury',

    lableDeleted: 'Usunięto?',

    headerID: 'ID',
    headerProject: 'Projekt',
    headerRoute: 'Trasa',
    headerDoc: 'Dokument',
    headerCreation: 'Utworzenie',
    headerDateTime: 'Data i czas',
    headerUser: 'Użytkownik',
    headerSenderName: 'Nazwa  <br/> odbiorcy',
    headerReceiverName: 'Nazwa <br/> nadawcy',
    headerContNum: 'Numer <br/>kontenera',
    headerDescr: 'Opis',
    headerVagNum: 'Numer <br/>wagona',
    headerInv: 'Faktury',
    headerNPoezd: '№<br/> pociągi ',
    headerFileName: 'Nazwa pliku',
    headerContentType: 'Typ <br/> siedzącego',
    headerSizeByte: 'Rozmiar, bajt',

    warnTitle: 'Ostrzeżenie',
    warnMsg: 'Wybierz wiersz z tabeli danych',

    txtForApproval: 'Do zatwierdzenia',
    txtApproved: 'Uzgodnione',
    txtWork: 'Praca',
    txtNotApproved: 'NIE uzgodniono',
    txtBlocked: 'Zablokowane',
    headerStatus: 'Status',
    headerName: 'nazwa <br/> instrukcji',
    headerInstrNum: '№ instrukcji',
    headerGNG: 'NHM',
    headerComments: 'Uwagi',

    statusBlocked: 'Zablokowane',
    status4Approval: 'Do zatwierdzenia',
    statusAgreed: 'Uzgodnione',
    statusNotAgreed: 'Nie uzgodniono',

    avisoXsmgs:'Połączyć szablon i dokumenty',
    groupPrint:'Wydruk grupowy',
    groupEdit: 'Edycja grupowa',

    saveGridSettings:'Zapisz ustawienia',
    clearGridSettings:'Unieważnić ustawienia'
});

Ext.define("TK.locale.pl.view.avisocim.AvisoCimList", {
    override: "TK.view.avisocim.AvisoCimList",
    title: 'Dziennik  instrukcji CIM'
});

Ext.define("TK.locale.pl.view.aviso2.AvisoSmgs2List", {
    override: "TK.view.aviso2.AvisoSmgs2List",
    title: 'Dziennik   instrukcji  SMGS2'
});

Ext.define("TK.locale.pl.view.aviso.List", {
    override: "TK.view.aviso.List",

    title: 'SMGS template register'
});

Ext.define("TK.locale.pl.view.avisocimsmgs.AvisoCimSmgsList", {
    override: "TK.view.avisocimsmgs.AvisoCimSmgsList",

    title: 'Dziennik   instrukcjiCIM / SMGS',
});

Ext.define("TK.locale.pl.view.avisogu29k.List", {
    override: "TK.view.avisogu29k.List",

    title: 'Dziennik instrukcji GU',
});

Ext.define("TK.locale.pl.view.cim.CimList", {
    override: "TK.view.cim.CimList",

    headerCim: 'CIM',
    title: 'Dziennik CIM',
    menuTrSearch: 'Filtracja pociągu'
});

Ext.define("TK.locale.pl.view.cimsmgs.CimSmgsList", {
    override: "TK.view.cimsmgs.CimSmgsList",

    title: 'Dziennik CIM / SMGS',
    headerCimsmgs: 'Numer przesyłki',
    headerVagVed: 'List wagonówy',
    headerDateTransp: 'Data wysyłki',
    headerExchBch: 'Iftmin',
    menuTrSearch: 'Filtracja pociągu'
});

Ext.define("TK.locale.pl.view.cmr.List", {
    override: "TK.view.cmr.List",

    headerDateTransp: 'Data Trans',
    headerCMR: 'CMR',
    title: 'Dziennik CPM',
});

Ext.define("TK.locale.pl.view.slovnakl.List", {
    override: "TK.view.slovnakl.List",

    headerSlov: 'Slovak bill',
    title: 'Slovak bill'
});

Ext.define("TK.locale.pl.view.epd.List", {
    override: "TK.view.epd.List",

    title: 'Dziennik EPD',
});

Ext.define("TK.locale.pl.view.gu27v.List", {
    override: "TK.view.gu27v.List",

    headerGu27v: 'ГУ-27в',
    headerDateTransp: 'Data Trans',
    headerAvisoNum: 'Aviso No.',
    title: 'GU register'
});

Ext.define("TK.locale.pl.view.gu29k.List", {
    override: "TK.view.gu29k.List",

    headerGu29k: 'ГУ-29к',
    headerDateTransp: 'Data Trans',
    headerAvisoNum: 'Aviso No.',
    title: 'GU register'
});

Ext.define("TK.locale.pl.view.invoice.List", {
    override: "TK.view.invoice.List",
    
    title: 'Dziennik faktur',
    headerNum: '№ faktury',
    headerNumOtpr: '№ przesyłki',
    headerNumCont: '№ kontenera',
    headerDateOtpr: 'Data wysyłki',
});

Ext.define("TK.locale.pl.view.smgs.List", {
    override: "TK.view.smgs.List",
    title: 'Dziennik SMGS',
    headerSmgs: 'SMGS',
    headerExchTBC: 'ТБЦ',
    headerExchBch: 'Iftmin',
    headerAvisoNum: 'Aviso No.'
});

Ext.define("TK.locale.pl.view.smgs2.Smgs2List", {
    override: "TK.view.smgs2.Smgs2List",
    title: 'Dziennik SMGS',
    headerSmgs: 'SMGS',
    headerExchTBC: 'ТБЦ',
    headerExchBch: 'Iftmin',
    headerAvisoNum: 'Aviso No.',
    headerVagVed: 'Wykaz wagonowy',
    titleVagVed: 'Wykaz',
    menuTrSearch: 'Filtracja pociągu'
});

Ext.define("TK.locale.pl.view.file.List", {
    override: "TK.view.file.List",
    title: 'Dziennik grafiki',
    headerNumOtpr: '№ przesyłki',
    headerNumCont: '№ kontenera',
    headerDateOtpr: 'Data wysyłki'
});

Ext.define("TK.locale.pl.view.logs.List", {
    override: "TK.view.logs.List",
    title: 'Login portalu',
    headerDate: 'Data',
    headerUser: 'Użytkownik',
    headerHost: 'Host',
    headerAgent: 'Środowisko wykonawcze',
    headerLog: 'Login',
    headerThread: 'Przepływ',
    headerFile: 'Plik',
    headerMethod: 'Metoda',
    btnFilter: 'Filtr'
});

Ext.define("TK.locale.pl.view.project.List", {
    override: "TK.view.project.List",
    title: 'Lista projektów',
    headerName: 'Nazwa',
    headerGroups: 'Grupy',
    headerRoutes: 'Trasy',
    btnCreate: 'Utwórz',
    btnEdit: 'Edytuj',
    btnDelete: 'Usuń',
    delMsg1: 'Usuń ...',
    delMsg2: 'Czy na pewno chcesz usunąć bieżący projekt?'
});

Ext.define("TK.locale.pl.view.printtmpl.List", {
    override: "TK.view.printtmpl.List",
    title: 'Printing templates',
    headerName: 'Nazwa',
    headerRoutes: 'Routes',
    headerDefault: 'Default?',
    headerBlank: 'With blank?',

    btnBindToRoute: 'Bind to route',
    btnBindToBlank: 'Bind to blank',
    btnBlanks: 'Blanks'
});

Ext.define("TK.locale.pl.view.printtmpl.Form", {
    override: "TK.view.printtmpl.Form",
    title: 'szablon wydruku',
    btnSave: 'Zapisz',
    btnSaveExit: 'Zapisz i wyjdź',
    btnClose: 'Zamknij',

    fieldLabelName: 'Nazwa',
    fieldLabelDef: 'Domyślne',
    fieldLabelPageSize: 'Rozmiar papieru, mm',
    fieldLabelWidth: 'szerokość',
    fieldLabelHeight: 'Wysokość',
    fieldLabelFont: 'Czcionka, domyślnie dla całego dokumentu',
    fieldLabelFontName: 'Nazwa',
    fieldLabelFontSize: 'Rozmiar',
    fieldLabelFontSpace: 'Odstępy między wierszami',
    fieldLabelSyncXY: 'Synchronizuj zmiany w X lub Y',
    fieldLabelMoveHor: 'Przenieś wszystko w poziomie, mm',
    fieldLabelMoveVert: 'Przenieś wszystko pionowo, mm',
    titleData: 'Dane'
});

Ext.define("TK.locale.pl.view.user.List", {
    override: "TK.view.user.List",
    title: 'Lista użytkowników',
    headerUn: 'Zaloguj się',
    headerName: 'Imię',
    headerGroup: 'Grupa',
    headerGroups: 'Dodatki. grupy ',
    headerPrivileg: 'Przywileje',
    headerLocked: 'Wyłączone?',
    headerSu: 'Admin?',
    headerEmail: 'E-mail',
    headerLang: 'Język<br>interfejsu',
    btnCreate: 'Utwórz',
    btnEdit: 'Edytuj',
    btnCopy: 'Kopiuj',
    btnRefresh: 'Odśwież',

    textYes: 'tak',
    textNo: 'nie',
    btnGrFilter:'Filtr grupy',
    btnResetGrFilter:'Zresetuj filtr grupy'
});

Ext.define("TK.locale.pl.view.user.ListGroups", {
    override: "TK.view.user.ListGroups",
    title: 'Lista użytkowników',
    headerName: 'Imię',
    headerDescr: 'Opis',
    btnSelect: 'Wybierz',
    btnAdd: 'Dodaj',
    btnEdit: 'Edytuj',
    btnRefresh: 'Odśwież',
    btnClose: 'Zamknij'
});

Ext.define("TK.locale.pl.view.user.ListPrivs", {
    override: "TK.view.user.ListPrivs",
    title: 'Lista użytkowników',
    headerName: 'Imię',
    headerDescr: 'Opis',
    btnSelect: 'Wybierz',
    btnRefresh: 'Odśwież',
    btnClose: 'Zamknij'
});

Ext.define("TK.locale.pl.view.user.Form", {
    override: "TK.view.user.Form",
    title: 'Redaktor',
    labelLogin: 'Login<span class="x-required">*</span>',
    labelLogin1: 'Zaloguj się',
    labelPass: 'Hasło <span class = "x-required">*</span>',
    labelPass1: 'Weryfikacja hasła <span class = "x-required">*</span>',
    labelPass2: 'Nowe hasło',
    labelFIO: 'nazwisko',
    labelEmail: 'E-mail',
    labelLocked: 'Wyłączone?',
    labelSu: 'Admin?',
    labelGroup: 'Grupa<span class="x-required">*</span>',
    labelGroups: 'Dodatki. grupy ',
    labelPrivs: 'Przywileje',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij',
    vTypeLabelPass: 'Hasła nie pasują, to pole może zawierać tylko litery, cyfry i _',
    vTypeLabelLogin: 'Użytkownik z tym loginem już istnieje, to pole może zawierać tylko litery, cyfry i _'
});

Ext.define("TK.locale.pl.view.user.FormGroups", {
    override: "TK.view.user.FormGroups",
    title: 'Redaktor',
    vTypeLabelGr: 'Grupa o tej samej nazwie już istnieje; to pole może zawierać tylko litery, cyfry i _',
    labelName: 'nazwa <span class="x-required">*</span>',
    labelName1: 'Imię',
    labelDescr: 'Opis',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij'
});

Ext.define("TK.locale.pl.view.project.Form", {
    override: "TK.view.project.Form",
    title: 'Projekt Edycja',
    btnSave: 'Zapisz',
    btnSaveExit: 'Zapisz i wyjdź',
    btnClose: 'Zamknij',
    btnSelect: 'Wybierz',
    labelProjectName: 'Nazwa',
    labelGroups: 'Grupy',
    labelRoutes: 'Trasy',
    labelSelected: 'Wybrane',
    labelAvailable: 'Dostępne',
    headerName: 'Nazwa',
    headerDescr: 'Opis',
    saveMsg: 'Dane są zapisywane ...'
});

Ext.define("TK.locale.pl.view.edit.DetailGrid", {
    override: "TK.view.edit.DetailGrid",
    btnAdd: 'Dodaj',
    btnDelete: 'Usuń',
    btnCopy: 'Kopiuj',
    btnOk: 'Ok',
    btnCheckTnved:'Sprawdzic TNVED',
    btnImportXlsCargo:'Importuj ładunek z XLS',
    btnTranslate:'Przekładać',

    headerName: 'Nazwa',
    headerRoutesGr: 'Grupy',
    headerRoutesDocs: 'Dokumenty',
    headerRoutesCodeTbc: 'Код ТБЦ',
    headerRoutesCodeCustoms: 'Kod celny',
    headerRoutesEmailMask: 'Email, mask',
    headerRoutesForDeleted: 'Do zatwierdzenia',
    headerContNum: 'Numer',
    headerContSize: 'Rozmiar',
    headerContVid: 'Rodzaj',
    headerContNum1: 'Numer',
    headerContSize1: 'Rozmiar',
    headerContVid1: 'Rodzaj',
    headerCodeTNVED: 'kod TN WED',
    headerPack: 'Opakowanie',
    headerPackVid: 'Rodzaj',
    headerPackKod: 'Kod',
    headerGoodsDescr: 'opis ladunku RU',
    headerGoodsDescrEn: 'opis ladunku EN',
    headerPackage: 'Rodzaj opakowania',
    headerPackNum: 'liczba miejsc pakowania',
    headerBrutto: 'brutto (kg)',
    headerNetto: 'netto (kg)',
    headerQuantity: 'ilość',
    headerProdUnit: 'Jednostka miary produktu ',
    headerProdPrice: 'cena jednostkowa',
    headerTotalValue: 'koszt całkowity',
    headerType: 'typ',
    headerTotal: 'Razem',

    titleColumn: 'Kolumna',
    titleDesc: 'Opis',
    titleCoordLeft: 'Współrzędne lewego <br/>dolnego rogu , mm',
    titleCoordRight: 'Współrzędne prawego<br/>górnego rogu, mm',
    titleColumnFont: 'Czcionka dla konkretnej kolumny',
    titleColumnFontName: 'Nazwa',
    titleColumnFontSize: 'Rozmiar',
    titleColumnFontBold: 'pogrubiony?',
    titleColumnFontUpper: 'Wielkie litery',
    titleColumnFontSpace: 'Odstępy między wierszami',
    titleRotate: 'Obróć',
    titleBorder: 'Granica?',
    titleStroke: 'Podkreślenie?',
    titlePage: 'Strona',
    titlePrint: 'Drukuj?',
    titleTable: 'Tabela?',
    titlePhrases: 'frazy /zwroty'
});

Ext.define("TK.locale.pl.view.edit.DetailPanel", {
    override: "TK.view.edit.DetailPanel",
    errorTitle: 'Błąd',
    errorMsgValid: 'Sprawdź poprawność pól',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij',
    labelSender: 'Nadawca',
    labelName: 'Nazwa',
    labelName1: 'Nazwa ',
    labelNameEu: 'Nazwa (EU)',
    labelNameRu: 'Nazwa (RU)',
    labelNameCh: 'Nazwa (Chiny)',
    labelDate: 'Data',
    labelTotal: 'Ilość',
    labelCountry: 'Kraj',
    labelCountryRu: 'Kraj (ros)',
    labelCountryCode: 'Kod kraju',
    labelZip: 'Indeks',
    labelCity: 'Miasto',
    labelCityRu: 'Miasto (Rus)',
    labelAdress: 'Adres',
    labelAdressRu: 'Adres (rus)',
    labelOptInfo: 'dodatkowe informacje',
    labelSenderCod: 'Kod nadawcy',
    labelReceiverCod: 'Kod odbiorcy',
    labelReceiver: 'Odbiorca',
});

Ext.define("TK.locale.pl.view.edit.DetailTabPanel", {
    override: "TK.view.edit.DetailTabPanel",
    btnAdd: 'Dodaj',
    btnDelete: 'Usuń'
});

Ext.define("TK.locale.pl.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",
    
    labelName1: 'Nazwa ',
    labelWagons: 'Wagony',
    labelWagonNum: '№ wagonu',
    labelWagonsTonnage: 'Max. ładunek, t',
    labelWagonsTara: 'Tara, t',
    labelWagonsAxes: 'Osie',
    labelConts: 'Kontener',
    labelSize: 'Rozmiar',
    labelSizeMm: 'Rozmiar (mm)',
    labelTaraCont: 'Tara, waga',
    labelNotes: 'Tekst przed № kontenera',
    labelCategory: 'Kategoria',
    labelContNum: '№ kontenera',
    labelDescr: 'Opis',
    labelVid: 'Rodzaj',
    labelCargo: 'Ładunek',
    labelNetto: 'netto',
    labelTara: 'Tara',
    labelBrutto: 'brutto',
    labelCodeGng: 'Kod NHM',
    labelNameRuGng: 'Nazwa (rus)',
    labelNameChGng: 'Nazwa (Chiny)',
    labelCodeEtsng: 'Kod ET WNP',
    labelNameEtsng: 'Nazwa ',
    labelMassa: 'Msza, kg',
    labelMesta: 'Miejsca',
    labelPack: 'opakowanie (ros)',
    labelPackForeign: 'Opakowanie',

    labelWagonsGiven: 'Wagon dostarczony',
    labelWagonsOwner: 'Właściciel wagonu',
    labelWagonsKind: 'Rod Wagonu ',

    labelContSize: 'Rozmiar',
    labelMaxLoad: 'ładowność, t',

    labelNameRu: 'Nazwa (rus)',
    labelName: 'Nazwa ',
    labelCode: 'Kod',
    labelOON: 'Un',
    labelClass: 'Klasa',
    labelZnak: 'Znaki',
    labelGrUpak: 'Grupa pakująca',
    labelAvKart: '№ karty awaryjnej',
    labelStamp: 'Stempel',
    labelDopInf: 'dodatkowe informacje'
});


Ext.define("TK.locale.pl.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Kod celny',
    labelTextRu: 'Tekst (ros)',
    labelText: 'Tekst',
    labelDocNum: 'Nr dokumentu',
    labelDate: 'Data',
    labelTotal: 'Ilość'
});

Ext.define("TK.locale.pl.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plomba',
    labelTotal: 'Ilość'
});

Ext.define("TK.locale.pl.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",
    labelOtprName: 'Nazwa',
    labelOtprNameRu: 'Nazwa  Rus',
    labelCountry: 'Kraj',
    labelCountryRu: 'Kraj(ros)',
    labelCountryCode: 'Kod kraju',
    labelEmail: 'E-mail',
    labelPhone: 'Telefon',
    labelFax: 'Faks',
    labelCity: 'Miasto',
    labelCityRu: 'Miasto, Rus',
    labelAdress: 'Adres',
    labelAdressRu: 'Adres, Rus',
    labelZip: 'Indeks',
    labelVat: 'VAT',
    labelSenRecCode: 'Kod nadawcy / odbiorcy',
    labelCliCode: 'Kod klienta',
    labelNNcode: 'Kod INN',
    labelDopInfo: 'Dodatkowe informacje',
    labelOKPO: 'Kod OKPO',

    closeBtn: 'Zamknij',
    saveBtn: 'Zapisz'
});

Ext.define("TK.locale.pl.view.DocsForm", {
    override: "TK.view.DocsForm",

    btnSave: 'Zapisz',
    btnSaveExit: 'Zapisz i wyjdź',
    btnSavePrint: 'Zapisz i wydrukuj PDF',
    btnClose: 'Zamknij',
    btnSign: 'Podpisz ECP',
    btnChange: 'Zmień',
    btnChangePlomb: 'Zmień plomby',
    btnChangeWagen: 'Zmień wagon',
    btnChangeCont: 'Zmień kontener',
    btnChangeGr: 'Zmień ladunek',
    btnCopyEpd: 'Kopiuj z EPD',
    btnDopList: 'Dodatkowy list',
    btnContsList: 'Wykaz kontenerów / wagonów',
    btnCopy20: 'Kopia w rub.20',
    btnTbcReady: 'ТБЦ готов',
    btnTbcNotReady: 'ТБЦ отмена',
    btnBchReady: 'Iftmin jest gotowy',
    btnBchNotReady: 'Iftmin anuluj',
    btnFtsReady: 'ФТС готов',
    btnFtsNotReady: 'ФТС отмена',

    labelNotes: 'Tekst przed № kontenera',

    labelPayers: 'Płatnicy',
    labelNumDate: 'Numer i data umowy',
    labelBukvKod: 'kod administracji kolejowej ',
    labelBukvKodRu: 'kod administracji kolejowej (rus) ',
    labelPayerName: 'Nazwa płatnika',
    labelPayerNameRu: 'Nazwa płatnika (rus)',
    labelThrough: 'Metoda płatności (przez co)',
    labelPrim: 'Notatki',
    labelPayerKod1: 'Kod płatnika',
    labelPayerKod2: 'Subkod kodu płatnika',
    labelPayerKod3: 'Subkod subkodu płatnika',
    labelPayerKod4: 'Rezerwa dla dodania kodu ',
    labelPayment: 'Metoda płatności',
    labelPaymentRu: 'Metoda płatności (rus)',

    labelConts: 'Kontener',
    labelSize: 'Rozmiar',
    labelSizeMm: 'Rozmiar (mm)',
    labelNotesVag: 'Tekst przed № Wagona ',
    labelCategory: 'Kategoria',
    labelContNum: '№ kontenera',
    labelDescr: 'Opis',
    labelVid: 'Rodzaj',

    labelCargo: 'Ładunek',
    labelCode: 'Kod',
    labelNetto: 'netto',
    labelTara: 'Tara',
    labelBrutto: 'brutto',
    labelCodeGng: 'Kod NHM',
    labelNameRuGng: 'Nazwa (rus)',
    labelNameChGng: 'Nazwa (Chiny)',
    labelCodeEtsng: 'Kod ET WNP',
    labelNameEtsng: 'Nazwa ',
    labelMassa: 'Msza, kg',
    labelMesta: 'Miejsca',
    labelPack: 'opakowanie (ros)',
    labelPackForeign: 'Opakowanie',

    labelCodeStn: 'Kod stacji',
    labelText3: 'Skrócona nazwa kolei',
    labelText4: 'Kod administracyjny',
    labelBorderStn: 'Stacje graniczne',
    labelCodeDoc: 'Kod dokumentu',
    labelText: 'Tekst',
    labelTextEu: 'Tekst EU',
    labelTextRu: 'Tekst (ros)',
    labelSenderDocs: 'Dokumenty dołączone przez nadawcę',
    labelCustomsCode: 'Kod celny',
    labelDocNum: 'Nr dokumentu',
    labelCommercTerms: 'Warunki handlowe',
    labelPogrStn: 'stacje graniczne',

    labelWagons: 'Wagony',
    labelWagonNum: '№ wagonu',
    labelWagonsTonnage: 'Max. ładunek, t',
    labelWagonsTara: 'Tara, t',
    labelWagonsAxes: 'Osie',

    labelZayavSenderPayers: 'Oswiadczenia nadawcy/ płatnik',
    labelZayavSender: 'Oswiadczenia nadawcy',
    labelSenderNotes: 'Szczególne oświadczenia nadawcy',
    labelFile: 'Plik',
    labelFileSearch: 'Przeglądaj ...',
    labelWagenNum: 'Numer pociągu',
    labelTeplatename: 'Nazwa instrukcji',
    labelDocSort: 'Numer sekwencji',
    labelDocSummary: 'Podsumowanie',

    labelTGNL: 'Код ТГНЛ:',
    labelOKPO: 'Kod OKPO',
    labelINN: 'Kod INN',

    labelVagKontGruz: 'Wagon/ kontener / ładunek',
    btnPrintView: 'Wyświetl PDF',

    labelDate: 'Data',
    labelCodyDo: 'Kody są ważne do',
    labelVsegoSmgs: 'Razem  SMGS',
    labelCarrier: 'Przewoźnik',
    labelFrom: 'Stacja z',
    labelTo: 'Stacja do',
    labelStationFrom: 'Stacja z (kod)',
    labelStationTo: 'Stacja do (kod)',
    titleCarriers: 'Перевозчики',
    btnVed: 'List',
    btnVag: 'Wagon',
    btnCont: 'Kontener'
});

Ext.define("TK.locale.pl.view.aviso.Form", {
    override: "TK.view.aviso.Form",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelCodyDo: 'Kody są ważne do',
    labelVsegoSmgs: 'Razem  SMGS',
    labelZakazNum: 'Numer zamówienia'
});

Ext.define("TK.locale.pl.view.aviso2.AvisoSmgs2Form", {
    override: "TK.view.aviso2.AvisoSmgs2Form",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelCodyDo: 'Kody są ważne do',
    labelVsegoSmgs: 'Razem  SMGS',
    labelZakazNum: 'Numer zamówienia'
});

Ext.define("TK.locale.pl.view.aviso.Form1", {
    override: "TK.view.aviso.Form1",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelCodyDo: 'Kody są ważne do',
    labelVsegoSmgs: 'Razem  SMGS',
    labelZakazNum: 'Numer zamówienia'
});

Ext.define("TK.locale.pl.view.avisocimsmgs.AvisoCimSmgsForm", {
    override: "TK.view.avisocimsmgs.AvisoCimSmgsForm",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelCodyDo: 'Kody są ważne do',
    labelVsegoSmgs: 'Razem CIM / SMGS',
    labelZakazNum: 'Numer zamówienia'
});

Ext.define("TK.locale.pl.view.avisogu29k.Form", {
    override: "TK.view.avisogu29k.Form",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelVsegoGU: 'TOTAL GU',
    labelZakazNum: 'Numer zamówienia',
    labelSender1: 'Nadawca',
    labelReceiver1: 'Odbiorca',
    labelStnSender: 'Stacja nadania',
    labelStnReceiver: 'Stacja przeznaczenia',
    labelPayers1: 'Płatnik',
    labelCodesTill: 'Kody są ważne do',
    labelGU: 'ГУ',
    labelGU29: 'ГУ29к',
    labelGU27: 'ГУ27в'
});

Ext.define("TK.locale.pl.view.avisogu29k.Form1", {
    override: "TK.view.avisogu29k.Form1",

    btnForAgree: 'Do zatwierdzenia',
    btnAgreed: 'Uzgodnione',
    btnNotAgreed: 'NIE uzgodniono',

    labelVsegoGU: 'TOTAL GU',
    labelZakazNum: 'Numer zamówienia',
    labelSender1: 'Nadawca',
    labelReceiver1: 'Odbiorca',
    labelStnSender: 'Stacja nadania',
    labelStnReceiver: 'Stacja przeznaczenia',
    labelPayers1: 'Płatnik',
    labelCodesTill: 'Kody są ważne do',
    labelGU: 'ГУ',
    labelGU29: 'ГУ29к',
    labelGU27: 'ГУ27в'
});

Ext.define("TK.locale.pl.view.cim.CimForm", {
    override: "TK.view.cim.CimForm",

    labelWagonOtpr: '№ przesyłki',
    labelContPrivate: 'Własny ("P)'
});

Ext.define("TK.locale.pl.view.slovnakl.Form", {
    override: "TK.view.slovnakl.Form",

    labelWagonOtpr: '№ przesyłki'
});

Ext.define("TK.locale.pl.view.cimsmgs.CimSmgsForm", {
    override: "TK.view.cimsmgs.CimSmgsForm",
    labelDopList: 'Dodatkowy list'
});

Ext.define("TK.locale.pl.view.cmr.Form", {
    override: "TK.view.cmr.Form"
});

Ext.define("TK.locale.pl.view.epd.Form", {
    override: "TK.view.epd.Form",

    labelSenderName: 'Nazwa nadawcy',
    labelSenderAdress: 'Adres nadawcy',
    labelReceiverName: 'Nazwa odbiorcy',
    labelReceiverAdress: 'Adres odbiorcy',
    labelStnSenderName: 'Nazwa stacji nadaia',
    labelStnSenderCode: 'Kod stacji nadaia',
    labelStnReceiverName: 'Nazwa stacji przeznaczenia',
    labelStnReceiverCode: 'Kod stacji przeznaczenia'
});

Ext.define("TK.locale.pl.view.file.Form", {
    override: "TK.view.file.Form",

    labelGeneralInfo: 'Informacje ogólne',
    labelDownloadFile: 'Pobierz plik'
});

Ext.define("TK.locale.pl.view.gu27v.Form", {
    override: "TK.view.gu27v.Form"
});

Ext.define("TK.locale.pl.view.gu29k.Form", {
    override: "TK.view.gu29k.Form"
});

Ext.define("TK.locale.pl.view.invoice.Form", {
    override: "TK.view.invoice.Form",

    labelType: 'Typ',
    labelOtprNum: '№ przesyłki',
    labelContractNum: '№ umowy',
    labelContractDate: 'Data umowy',
    labelSellerName: 'Nazwa sprzedawcy',
    labelSenderName: 'Nazwa nadawcy',
    labelSellerAdress: 'Adres sprzedawcy',
    labelSenderAdress: 'Adres nadawcy',
    labelSenderCountry: 'Kraj nadawcy, kod',
    labelSenderZip: 'Nadawca kodu pocztowego',
    labelSenderCity: 'Miasto nadawcy',
    labelBuyerName: 'Nazwa klienta',
    labelReceiverName: 'Nazwa odbiorcy',
    labelReceiverCountry: 'Kraj odbiorcy, kod',
    labelReceiverZip: 'Kod pocztowy odbiorcy',
    labelReceiverCity: 'Miasto odbiorcy',
    labelBuyerAdress: 'Adres kupującego',
    labelReceiverAdress: 'Adres odbiorcy',
    labelDeliveryCode: 'Kod dostawy',
    labelDeliveryPlace: 'Punkt dostawy',
    labelCurrency: 'Waluta faktury',
    labelNote: 'Uwaga',

    lableCombo1: 'Faktura',
    lableCombo2: 'Faktura',
    lableCombo3: 'Załącznik do faktury',
    lableCombo4: 'Lista towarowa',
    lableCombo5: 'Manifest',
    deatailTitle:'Dodatkowa informacja',
    btnShowDetails:'Pokaż dodatkowe informacje',
    btnHideDetails:'Ukryj dodatkowe informacje'
});

Ext.define("TK.locale.pl.view.nsi.EditList", {
    override: "TK.view.nsi.EditList",

    btnAdd: 'Dodaj',
    btnDelete: 'Usuń',
    btnEdit: 'Edytuj'
});

Ext.define("TK.locale.pl.view.nsi.ListDir", {
    override: "TK.view.nsi.ListDir",

    title: 'Lista katalogów',
    btnView: 'Zobacz',
    btnUploadDir: 'Pobierz książkę referencyjną',
    btnExportDir: 'Eksportuj do Excela',
    headerName: 'Nazwa',
    warnTitle: 'Ostrzeżenie',
    warnMsg: 'Wybierz wiersz z tabeli danych',

    nsiSta: 'Katalog stacji kolejowych',
    nsiCountries: 'Katalog krajów',
    nsiGng: 'Podręcznik kodów NHM',
    nsiEtsng: 'Podręcznik kodów ET CIS',
    nsiCurrency: 'Wykaz walut',
    nsiTnved: 'Podręcznik kodów TNVED',
    nsiDeliv: 'Katalog warunków dostawy',
    nsiUpak: 'Podręcznik rodzajów opakowań',
    nsiOtpr: 'Katalog osób prawnych (nadawców / odbiorców)',
    nsiPlat: 'Katalog płatników przez koleje (spedytorzy)',
    nsiManagement: 'Katalog administracji kolei',
    nsiCountriesGd: 'Katalog krajów kolejowych',
    nsiDocG23: 'Katalog typów dokumentów',
    nsiVeterin: 'Podręcznik towarów weterynaryjnych',
    nsiKarantin: 'Podręcznik ładunków kwarantanny',
    nsiDangCode: 'Podręcznik towarów niebezpiecznych',
    gruzyLink: 'Wykaz towarów podlegających gwarancji finansowej dla tranzytu'
});

Ext.define("TK.locale.pl.view.smgs.Form", {
    override: "TK.view.smgs.Form",

    labelWagonNum: '№ wagonu (gr.27)',
    labelWagonsTonnage: 'Max. ładunek (gr.28), t',
    labelWagonsTara: 'Tara (gr.30), t',
    labelWagonsAxes: 'Osie (rub.29)',
    labelContNum: 'Numer (gr.9; 19)',
    labelSize: 'Rozmiar (gr.9)',
    labelVid: 'Rodzaj (col.18)'
});

Ext.define("TK.locale.pl.view.stat.Form", {
    override: "TK.view.stat.Form",

    lableDate: 'Data utworzenia',
    lableDate1: 'z',
    lableDate2: 'wg/przez',
    lableZakazNum: 'Numer zamówienia',
    lableStatus: 'Status',
    lableUser: 'Użytkownik',
    lableCountrySender: 'Kraj nadania ładunku',
    lableCountryRceiver: 'Kraj przeznaczenia',
    lableDeleted: 'Usunięte?',
    lableStnPogr: 'Przejście graniczne',
    lableStnSender: 'Stacja nadania',
    lableStnReciver: 'Stacja przeznaczenia',
    lableSender: 'Nadawca',
    lableReceiver: 'Odbiorca',
    lableCargoName: 'Nazwa ladunku',
    lableContSize: 'typ rodzaj kontenera',
    lablePayer: 'Płatnik opłat i usług',
    lableKontNum: '№kontenera',

    btnFind: 'Znajdź',
    btnClose: 'Zamknij',
    btnReset: 'Reset , + C880:C934',
    lableCombo1: 'Instrukcja dla uzgodnionia',
    lableCombo2: 'Instrukcja jest uzgodniona',
    lableCombo3: 'Instrukcja NIE jest zatwierdzona',
    lableCombo4: 'Instrukcja jest zablokowana',
    lableCombo5: 'Wydrukowano'
});

Ext.define("TK.locale.pl.controller.exchange.Senders", {
    override: "TK.controller.exchange.Senders",

    maskMsg: 'Zamów dane ...',
    showTitle: 'Uwaga',
    showMsg1: 'Wysłane!',
    showMsg2: 'Błąd!',
    showMsg3: 'Zapisano!',
    errorMsg: 'Uwaga! Błąd ... ',
    waitMsg: 'Pobieranie pliku ...',
    waitMsg1: 'Dane są zapisywane ...',

    btnSave: 'Zapisz',
    btnExport: 'Eksport do FCS',
    btnClose: 'Zamknij',

    titleFTS: 'Wymiana z FCS',

    labelWagenNum: 'Numer pociągu',
    labelWagenNums: 'Numer pociągu',
    labelWagenInd: 'Indeks pociągu',
    labelPPVInd: 'Numer PPW',
    labelInputDate: 'Data przyjazdu'
});

Ext.define("TK.locale.pl.controller.exchange.Agreements", {
    override: "TK.controller.exchange.Agreements",

    maskMsg: 'Zamów dane ...',
    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.Docs", {
    override: "TK.controller.Docs",

    titleCopy2Aviso: 'Копия в шаблон',
    titleList: 'Dziennik',
    titleEdit: 'Edycja.',
    titleCopy: 'Kopia',
    titletPrint: 'Drukuj',
    titletStat: 'Statystyka',
    titleReports: 'Raporty',
    titleHistory: 'Historia dokumentu',
    titleUpload: 'Ładowanie instrukcji w formacie XML',
    titleFTS: 'Wymiana z FCS',
    titleContList: 'Wprowadź numer pociągu (-ów)',

    lableSettings: 'Ustawienia',
    lableFace: 'Przód',
    lableBack: 'Obrót',
    lableTraneNum: 'Pociąg (numer)',
    labelSelectFile: 'Wybierz plik do przesłania ...',
    labelFile: 'Plik',
    labelUn: 'Zaloguj się',
    labelUnName: 'imię nazwisko',
    labelUnEmail: 'E-mail',
    labelUnGroup: 'Grupa',
    labelGU: 'ГУ',
    labelGU29: 'ГУ29к',
    labelGU27: 'ГУ27в',
    labelWagenNum: 'Numer pociągu',
    labelWagenNums: 'Numer pociągu',
    labelWagenInd: 'Indeks pociągu',
    labelPPVInd: 'Numer PPW',
    labelInputDate: 'Data przyjazdu',

    msgCopy2Arch:'Skopiuj wpisy do archiwum',

    btnPrint: 'Drukuj',
    btnFind: 'Znajdź',
    btnSearch: 'Szukaj ...',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij',
    btnExport: 'Eksport do FCS',
    btnContList: 'Wykaz',
    btnSmgs: 'list przewozowy',

    delTitle: 'Usuń ...',
    delMsg: 'Czy na pewno chcesz usunąć ..?',
    maskMsg: 'Zamów dane ...',
    showTitle: 'Uwaga',
    showMsg1: 'Wysłane!',
    showMsg2: 'Błąd!',
    showMsg3: 'Zapisano!',
    errorMsg: 'Uwaga! Błąd ... ',
    waitMsg: 'Pobieranie pliku ...',
    waitMsg1: 'Dane są zapisywane ...',

    titlePrint: 'Ustawienia drukowania',
    labelBlank: 'Z pustym miejscem?',
    textPrint: 'Drukuj',

    headerData: 'Data utworzenia',
    headerMsg: 'Wiadomość',
    headerWho: 'Kto?',

    titleDocsCopy: 'Lista dokumentów do skopiowania',
    headerName: 'Nazwa',
    btnCopy: 'Kopiuj',
    all: 'Whole document',
    smgs2_1: '1|Sender|1',
    smgs2_2: '2|Departure station|2',
    smgs2_3: '3|Consignor`s application|3',
    smgs2_4: '4|Consignee|4',
    smgs2_5: '5|Destination station|5',
    smgs2_6: '6|Borders stations|6',
    smgs2_7: '7|Wagon|7-12',
    smgs2_8: '8|Cargo|15-18',
    smgs2_9: '9|Cargo, additional information|15доп.',
    smgs2_10: '10|Container|15',
    smgs2_11: '11|Plombs|19',
    smgs2_12: '12|Carriers|22',
    smgs2_13: '13|Payments for carrier charges|23',
    smgs2_14: '14|Documents attached by consignor|24',
    smgs2_15: '15|Data not intended for the carrier: delivery contact number|25',
    smgs2_16: '16|Remarks for customers and administrative procedures|28',

    successMsgTitle: 'Operacja zakończona powodzeniem',
    processed:'Przetworzone',
    docs: 'dokumentów'
});

Ext.define("TK.locale.pl.controller.Ajax", {
    override: "TK.controller.Ajax",

    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.docs.Aviso", {
    override: "TK.controller.docs.Aviso",

    maskMsg: 'Zamów dane ...',
    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.docs.Avisogu29k", {
    override: "TK.controller.docs.Avisogu29k",

    maskMsg: 'Zamów dane ...',
    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.docs.Cim", {
    override: "TK.controller.docs.Cim",

    maskMsg: 'Zamów dane ...',
    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.docs.Cimsmgs", {
    override: "TK.controller.docs.Cimsmgs",

    titleOtpr: 'Handbook of consignors/consignees',
    headerOtprName: 'Nazwa',
    headerOtprName1: 'Name, RU',
    headerOtprEmail: 'E-mail',
    headerOtprPhone: 'Phone',
    headerOtprFax: 'Fax',
    headerOtprStrCode: 'Country code',
    headerOtprStr: 'Country',
    headerOtprStr1: 'Country, RU',
    headerOtprZip: 'Zip code',
    headerOtprCity: 'City',
    headerOtprCity1: 'City, RU',
    headerOtprAdress: 'Address',
    headerOtprAdress1: 'Address, RU',
    headerOtprVat: 'VAT',
    headerOtprSendCode: 'Consignor`s/consignee`s code',
    headerOtprClCode: 'Client`s code',
    headerINN: 'Code INN:',
    headerCountryCode: 'Country code',
    headerDopInfo: 'Additional Info',
    tooltipEdit: 'Edytuj',
    tooltipDel: 'Usuń'
});

Ext.define("TK.locale.pl.controller.docs.Cmr", {
    override: "TK.controller.docs.Cmr"
});

Ext.define("TK.locale.pl.controller.docs.Epd", {
    override: "TK.controller.docs.Epd"
});

Ext.define("TK.locale.pl.controller.docs.File", {
    override: "TK.controller.docs.File",

    waitMsg1: 'Dane są zapisywane ...',
    delTitle: 'Usuń ...',
    delMsg: 'Czy na pewno chcesz usunąć ..?',
    errorMsg: 'Uwaga! Błąd… '
});

Ext.define("TK.locale.pl.controller.docs.Gu27v", {
    override: "TK.controller.docs.Gu27v",

    titleEpd: 'Nie załadowano EPD',
    msgEpd: 'Aby pobrać, należy umieścić w zakładce EPD'
});

Ext.define("TK.locale.pl.controller.docs.Gu29k", {
    override: "TK.controller.docs.Gu29k",

    titleEpd: 'Nie załadowano EPD',
    msgEpd: 'Aby pobrać, należy umieścić w zakładce EPD'
});

Ext.define("TK.locale.pl.controller.docs.Invoice", {
    override: "TK.controller.docs.Invoice",

    titleEpd: 'Nie załadowano EPD',
    msgEpd: 'Aby pobrać, należy umieścić w zakładce EPD',
    titlePrint      :'Opcje drukowania',
    lblCodes        :'Kody',
    lblCodes6       :'6 symboli',
    lblCodes10      :'10 symboli',
    lblOptions      :'Opcje',
    lblTnved        :'TNVED',
    lblTnvedNzgr    :'TNVED+Nazwa',
    lblWithCost     :'Z kosztami',
    btnPrint        :'Wydrukować',
    msgTitleWarn    :'Ostrzeżenie',
    msgTxtSeveralDocs:'W dokumencie jest więcej niż jeden wypełniony dokument!<br>Możesz wygenerować specyfikację tylko wtedy, gdy wypełniony jest tylko jeden dokument!'
});

Ext.define("TK.locale.pl.controller.Logs", {
    override: "TK.controller.Logs",

    titleFilter: 'Filtr',
    lableDate: 'Data utworzenia',
    lableDate1: 'z',
    lableDate2: 'wg/przez',
    labelUser: 'Użytkownik',

    btnFind: 'Znajdź'
});

Ext.define("TK.locale.pl.controller.Menu", {
    override: "TK.controller.Menu",

    errorMsg: 'Uwaga! Błąd… ',
    warning:'Uwaga!',
    warnMsg:'Czy na pewno chcesz wyjść?<br>Niezapisane dane mogą zostać utracone!'
});

Ext.define("TK.locale.pl.controller.Project", {
    override: "TK.controller.Project",

    maskMsg: 'Zamów dane ...',
    errorMsg: 'Uwaga! Błąd ... ',
    showTitle: 'Uwaga! Usuwanie jest zabronione ... ',
    showMsg: 'Przed usunięciem projektu usuń wszystkie EPD z jego tras'
});

Ext.define("TK.locale.pl.controller.docs.Smgs", {
    override: "TK.controller.docs.Smgs",

    titleEpd: 'Nie załadowano EPD',
    titleDownldInv: 'Ładowanie faktur',
    msgEpd: 'Aby pobrać, należy umieścić w zakładce EPD',
    errorMsg: 'Uwaga! Błąd ... ',
    btnFind: 'Znajdź',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij'
});

Ext.define("TK.locale.pl.controller.Doc2Doc", {
    override: "TK.controller.Doc2Doc",

    titleDownldInv: 'Ładowanie faktur',
    errorMsg: 'Uwaga! Błąd...',
    btnClose: 'Zamknąć',
    btnSave: 'Zapisz',
    btnFind: 'Znaleźć',

    btnContList: 'Spis',
    btnSmgs: 'Dokument',
    titleContList: 'Wpisz numer(-y) pociągu(-ów[,])',
    labelWagenNums: 'Numer(-y) pociągu(-ów[,]):',
    titleFilterPer: 'Filtr pociągów',
    warnTitle: 'Ostrzeżenie',
    saveMgs: 'Zapisz dokument',
    successMsgTitle: 'Operacja zakończona powodzeniem',
    processed:'Przetworzone',
    docs: 'dokumentów',
    titleWarning:'Uwaga',
    msgSaveBeforeImport:'Zapisz dokument przed importem faktury'
});

Ext.define("TK.locale.pl.controller.User", {
    override: "TK.controller.User",

    maskMsg: 'Zamów dane...',
    errorMsg: 'Uwaga! Błąd...',
    waitMsg1: 'Zapisywanie danych w procesie...',
    titleNoUser: 'Uwaga',
    msgNoUser: 'Nie wybrano użytkownika'
});

Ext.define("TK.locale.pl.controller.Nsi", {
    override: "TK.controller.Nsi",
    titleUpload: 'Prześlij podręcznik',
    labelSelectFile: 'Wybierz plik do przesłania...',
    labelFile: 'Plik',
    btnSave: 'Zapisz',
    btnClose: 'Zamknij',
    btnSearch: 'Szukaj...',
    titleErrorWarning: 'Ostrzeżenie',
    warningFillErrors: 'Underlined fields are too long'
});

Ext.define("TK.locale.pl.controller.docs.PlombsTreeDetailController", {
    override: "TK.controller.docs.PlombsTreeDetailController",
    msgTitle: 'Ostrzeżenie',
    msgSplit: 'Split plomb strings with separators: , and ;<br>In records:<br>'
});

Ext.define("TK.locale.pl.view.nsi.List", {
    override: "TK.view.nsi.List",

    title1: 'Grupy',
    titleRoad: 'Podręcznik kolei',
    titleRoute: 'Katalog tras',
    titleProject: 'Katalog projektu',
    titleManagement: 'Katalog administracji kolei',
    titleSta: 'Katalog stacji kolejowych',
    titleCountries: 'Katalog krajów',
    titleCountriesZhd: 'Katalog krajów kolejowych',
    titleDangerous: 'Podręcznik towarów niebezpiecznych',
    titleKarantin: 'Podręcznik ładunków kwarantanny',
    titleVeterin: 'Podręcznik towarów weterynaryjnych',
    titleGng: 'Podręcznik kodów NHM',
    titleEtsng: 'Podręcznik kodów ET CIS',
    titleDocs: 'Katalog typów dokumentów',
    titlePlat: 'Katalog płatników przez koleje (spedytorzy)',
    titleOtpr: 'Katalog osób prawnych (nadawców / odbiorców)',
    titleDocs1: 'Podręcznik dokumentów',
    titleCurrency: 'Wykaz walut',
    titleTnved: 'Katalog TNVED',
    titleDeliv: 'Katalog warunków dostawy',
    titleUpak: 'Podręcznik rodzajów opakowań',

    headerName: 'Nazwa',
    headerProject: 'Projekt',
    headerRoute: 'Trasa',
    headerDescr: 'Opis',
    headerCode: 'Kod',
    headerNDog:'Numer kontaktu',
    headerPZ:'PZ',
    headerWZ:'WZ',
    headerDatDog:'Data kontaktu',
    headerGroups:'Grupy',
    headerCountryRu: 'Kraj(ros)',
    headerCountry: 'Kraj',
    headerCountryS: 'Kraj, skrócona nazwa',
    headerStn: 'Stacja (rus)',
    headerStn1: 'Stacja (chiński)',
    headerStn2: 'Stacja (ang)',
    headerZhD: 'Kolej',
    headerCodeAdm: 'Kod administracyjny',
    headerWay: 'Droga',
    headerWayCode: 'Kod kolei',
    headerCoedEdi: 'Kod UN / EDIFACT',
    headerCustCode: 'kod celny',
    headerName1: 'Nazwa  (rus)',
    headerName2: 'Nazwa (Chiny)',
    headerName3: 'Nazwa (inne)',
    headerPayerMeth: 'Metoda płatności',
    headerPayerCode: 'Kod płatnika',
    headerPayerCode1: 'Podkod kodu',
    headerPayerCode2: 'Subcode subcode',
    headerCountryCode: 'Kod kraju',
    headerCountryName: 'nazwa kraju',
    headerCity: 'Miasto',
    headerAddress: 'Adres',
    headerOtprZip: 'Indeks',
    headerDopInfo: 'dodatkowe informacje',

    carrierTitle: 'Katalog przewoźników',
    headerSt: 'Stacja',
    headerCar: 'Numer przewoźnika',
    headerCarName: 'Przewoźnik, nazwa',
    headerCarShort: 'Przewoźnik, krótka nazwa',

    ttipSave: 'Zapisz',
    ttipDel: 'Usuń',
    btnClose: 'Zamknij',
    tooltipEdit: 'Edytuj',
    tooltipDel: 'Usuń',

    zayavClientTitle        :'Zamówienia',
    zayavClientClmnNZayav   :'№ zamówienia',
    zayavClientClmnClient   :'Klient',
    zayavClientClmnDate     :'Data zamówienia',
    storeError              :'Ostrzeżenie! Błąd ładowania listy...'
});

Ext.define("TK.locale.pl.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: 'Ustawienia drukowania',
    labelBlank: 'Z pustym miejscem?',
    printAll:'Wydrukuj wszystkie strony',
    labelFiles:'Oddzielny plik dla każdego dokumentu',
    printFirst:'Wydrukuj tylko pierwsze strony',
    printForth:'Wydrukuj tylko czwarte strony',
    textPrint: 'Drukuj',
    textPages: 'Strony do wydruku',
    textPage: 'Strona',
    textPageBack: '(obrót)',
    printTitle: 'Print documents',
    printMsg: 'Document(-s) will be printed'
});

Ext.define("TK.locale.pl.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'dołącz wzór wydruku',
    titleSelectText: 'Wybierz szablon wydruku',
    columnText: 'Nazwa',
    btnBindText: 'dołącz',
    btnBindPrintText: 'Drukuj',
    btnClose: 'Zamknij',
    msgTitle: 'Ostrzeżenie',
    msgMsg: 'Wybierz wiersz z tabeli danych',
});

Ext.define("TK.locale.pl.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Wagon',
    titleCont: 'Kontener',
    titleCargo: 'Ładunek',
    titleDanCargo: 'Ładunek  niebezpieczny',

    btnDel: 'Usuń',
    btnClose: 'Zamknij',
    btnSave: 'Zapisz',
    btnVagText: '+ Wagon',
    btnContText: '+ Kontener',
    btnCargoText: '+ Ładunek',
    btnDanCargoText: 'towary niebezpieczne',
    btnDocText: '+ Dokument',
    btnPlombText: '+plomby',
    btnSearch: 'Szukaj',
    btnExpandAll: 'Rozwiń wszystko',
    btnCollapseAll: 'Zwiń wszystko',
    btnImportXLSvag: 'Wagon list import',
    btnImportXLSCont: 'Lista kontenerów import'
});

Ext.define("TK.locale.pl.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Dokumenty dołączone przez nadawcę'
});

Ext.define("TK.locale.pl.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Wagon / kontener / ładunek'
});

Ext.define("TK.locale.pl.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plombs'
});

/*Ext.define("Ext.locale.pl.form.field.Base", {
    override: "Ext.form.field.Base",

    kontNumText: 'Это поле должно содержать номер контейнера в формате ABCD1234567',
    vagNumText: 'Это поле должно содержать номер узкого(8 символов) или широкого(12 символов) вагона',
    vagNumUzkText: 'Это поле должно содержать номер узкого вагона в формате 123456789012',
    vagNumShirText: 'Это поле должно содержать номер узкого вагона в формате 12345678',
    vagNumLastDigitText: 'Неверная контрольная цифра',
    kontNumLastDigitText: 'Неверная контрольная цифра'
});*/

Ext.define("TK.locale.pl.Validators", {
    override: "TK.Validators",

    kontNumText: 'This field must have the container number in the format ABCD1234567',
    vagNumText: 'This field must have the number of the narrow(8 symbols) or the wide(12 symbols) wagon',
    vagNumUzkText: 'This field must have the number of the narrow wagon in the format 123456789012',
    vagNumShirText: 'This field must have the number of the wide wagon in the format 12345678',
    vagNumLastDigitText: 'Invalid key digit',
    kontNumLastDigitText: 'Invalid key digit',
    notXLS: 'Not a xls/xlsx file'
});

Ext.define("TK.locale.pl.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Kod celny',
    labelTextRu: 'Tekst (ros)',
    labelText: 'Tekst'
});

Ext.define("TK.locale.pl.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Menu',
    titleUpload: 'Prześlij',
    btnClose: 'Zamknij',
    btnSave: 'Zapisz',
    labelUpload: 'Pobierz',
    labelFile: 'Plik',
    downloadTpl:'Pobierz szablon'
});

Ext.define("TK.locale.pl.view.ved.List", {
    override: "TK.view.ved.List",
    btnCreate: 'Utwórz',
    btnEdit: 'Edytuj',
    btnDelete: 'Usuń',
    headerID: 'ID',
    headerCreation: 'Utworzenie',
    headerDateTime: 'Data i czas',
    headerUser: 'Użytkownik',
    headerVagVedNum: 'Numer wykazu wagonowego',
    headerPerVedNum: '№ Wykaz zdawczy',
    headerTraneNum: '№ pociągu',
    headerTraneName: 'Nazwa pociągu',
    headerVagCount: 'Liczba wagonow',
    title: 'Dziennik oświadczeń',
    btnPrint: 'Drukuj PDF',
    btnA4VagPrint: 'А4-Wykaz waganowy',
    btnA3VagPrint: 'А3-Wykaz waganowy',
    btnA4PerPrint: 'А4-Wykaz zdawczy',
    btnA3PerPrint: 'А3-Wykaz zdawczy',
    delMsg1: 'Usuwanie...',
    delMsg2: 'Czy na pewno chcesz usunąć bieżącą listę?',
    delErr1: 'Usuwanie ...',
    delErr2: 'Wystąpił błąd podczas usuwania listy'
});

Ext.define("TK.locale.pl.controller.docs.Ved", {
    override: "TK.controller.docs.Ved",
    titleEdit: 'Edycja. ',
    waitMsg: 'Dane są zapisywane ...',
    btnSelect: 'Wybierz',
    btnClose: 'Zamknij',
    labelDocs: 'Wykaz listów przewozowych',
    headerNumClaim: 'Numer SMGS',
    headerVags: 'Numer wagonu',
    headerCreate: 'Data utworzenia',
    headerKont: '№ kontenera',
    headerTrain: 'Numer pociągu',
    headerNstn: 'Stacja przeznaczenia',
    headerRoute: 'Trasa',
    headerGng: 'NHM',
    filterText: 'Filtr',
    duplicateAll: 'Pomnóż wszystko',
    duplicateEmpty: 'Pomnóż puste',
    labelFilter: 'Filtr',
    filterHeader: 'Dane',
    userfiltr: 'Filtr',
    claerAll: 'Wyczyść wszystko',
});

Ext.define("TK.locale.pl.view.ved.Form", {
    override: "TK.view.ved.Form",
    title: 'Wykaz',
    fldLblNum: 'Wykaz №',
    fldLblDate: 'Data',
    fldLblTrain: 'Pociąg',
    fldLblTrainName: 'Nazwa pociągu',
    fldLblCarrOutName: 'Przewoźnik zdający',
    fldLblCarrInName: 'Otrzymujący przewoźnik',
    fldLblStnOut: 'stacje',
    fldLblStnIn: 'stacja',
    fldLblRoadOut: 'z kolei',
    fldLblRoadIn: 'W drodze',

});

Ext.define("TK.locale.pl.view.ved.VagsList", {
    override: "TK.view.ved.VagsList",
    title: 'Documents list',
    colTextIndex: '№',
    colTextNvag: 'Wagon<br>№',
    colTextOwner: 'Wagons<br>owner',
    colTextKind: 'Wagons<br>kind',
    colTextGp: 'Wagons<br>max load,m.t.',
    colTextAxes: 'Axes<br>count',
    colTextTara: 'Wagones<br>tara,m.t.',
    colTextPlomb: 'Plombs',
    colTextKpl: 'Ilość',
    colTextZnak: 'Signs',
    colTextNstoF: 'Sealing<br>station',
    colTextNum: 'Waybill №',
    colTextDatpp: 'Shipping<br>date',
    colTextKsto: 'Departure st.<br>code',
    colTextNsto: 'Departure<br>station',
    colTextKstn: 'Arrival st.<br>code',
    colTextNstn: 'Arrival<br>station',
    colTextKontNum: 'Container<br>№',
    colTextKontType: 'Container<br>type',
    colTextKontGp: 'Container<br>max load, t',
    colTextKontTara: 'Container<br>tara, kg',
    colTextPlaces: 'Places',
    colTextPack: 'Package',
    colTextGruz: 'Cargo code',
    colTextGruzName: 'Cargo<br>name',
    colTextMbrt: 'Cargo<br>weight',
    colTextPrim: 'Notatki',
    colTextPerVed: 'Transfer<br>list № ',
    btnAdd: 'Add',
    btnDelete: 'Usuń',
    btnLoad: 'Zamknij',
    btnCancelFilters: 'Cancel filters'
});

Ext.define("TK.locale.pl.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Lista tras',
    btnView: 'Pokaż dokumenty'
});

Ext.define("TK.locale.pl.view.pogruz.PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title: 'Pociągi',
    btnFind: 'Znajdź',
    btnFilter: 'Filtr',
    btnClose: 'Zamknij',
    btnReset: 'Reset',
    lableDate: 'Data c',
    lableDate1: 'Data według',
    train: 'Numer pociągu',
    count: 'Ilość',
    btnOk: 'Wybierz',
    btnCancel: 'Anuluj',
    errorMsg: 'Uwaga! Błąd ... ',
});

Ext.define("TK.locale.pl.view.pogruz.SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title: 'List przewozowy według numeru pociągu',
    btnClose: 'Zamknij',
    headerG694: '№<br/>waybill',
    headerAltered: 'Zmieniony',
    btnOk: 'Wybierz',
    btnCancel: 'Anuluj',
    headerContNum: '№ kontenera',
    headerVagNum: '№ wagona',
    headertNstn: 'Stacja<br/>docelowa'
});

Ext.define("TK.locale.pl.view.pogruz.Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title: 'Lista załaunkowa',
    headerWagN: '№ wagonu<br/><b>list</b>',
    headerKonN: '№ kontenera <br/><b>list</b>',
    headerKonNdb: '№ kontenera<br/><b>baza</b>',
    headerG694: 'Numer <br/>wysyłania<br/><b>List</b>',
    headerKlient: 'Właściciel<br/><b>arkusz</b>',
    headerFoot: 'Size foot<br/><b>list</b>',
    headerContSize: 'Rozmiar<br/><b>list </b>',
    headerPlomb: 'plomby<br/><b>list</b>',
    headerTara: 'Tara<br/>kontenera, kg<br/><b>listт</b>',
    headerMaxLoad: 'ładowność <br/>kont<br/><b>list</b>',
    headerTaraVag: 'Tara<br/>wagona, t<br/><b>list</b>',
    headerMaxLoadVag: 'ładowność <br/>wagona<br/><b>list</b>',
    headerKolOs: 'Osie<br/><b>list</b>',
    headerId: 'Id<br/><b>baza</b>',

    btnOk: 'Wybierz',
    btnCancel: 'Anuluj'
});

Ext.define("TK.locale.pl.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText: 'rekordów na stronie'
});

Ext.define("TK.locale.pl.view.edit.StationCatalogEdit", {
    override: "TK.view.edit.StationCatalogEdit",

    title: 'Station',
    btnSave: 'Zapisz',
    btnCancel: 'Anuluj',
    lblStaRu: 'Station(ru)',
    lblStaEn: 'Station(en)',
    lblStaCn: 'Station(cn)',
    lblStaNo: 'Code',
    lblMnamerus: 'Railroad',
    lblManagno: 'Administaration<br>code',
    lblCtryNam: 'Country name'
});

Ext.define("Ext.locale.pl.grid.plugin.RowEditing", {
    override: "Ext.grid.plugin.RowEditing",

    saveBtnText: 'Zapisz',
    cancelBtnText: 'Anuluj',
    errorsText: 'Error',
    dirtyText: 'You need to commit or cancel your changes',
    chEvery: 'Change all on ',
    chEmpty: 'Change empty on '
});

Ext.define("TK.locale.pl.view.components.g7vagsmgs2", {
    override: "TK.view.components.g7vagsmgs2",

    drophlp: 'Drop the record in the desired place'
});
Ext.define("TK.locale.pl.view.components.g19plombsmgs2", {
    override: "TK.view.components.g19plombsmgs2",

    totalCount: 'Total'
});
Ext.define("TK.locale.pl.view.edit.SelectCopy2AvisoElements", {
    override: "TK.view.edit.SelectCopy2AvisoElements",

    title: 'Create a template',
    headtext: 'Nazwa',
    headngraph: 'N item',
    choose: 'Wybierz',
    cancel: 'Anuluj'
});
Ext.define("TK.locale.pl.Utils", {
    override: "TK.Utils",

    processed:'Przetworzono dokumentów:',
    wrongAviso: 'Zły szablon!<br>Sprawdź, czy ilość wagonów / kontenerów / ładunku jest mniejsza lub równa 1',
    unProcDocs:'Shipping type is different from shipping type of the template<br>in the following documents:',
    successMsgTitle: 'Operacja zakończona powodzeniem',
    request:'Zapytanie...',
    dataErrorHdr:'Ostrzeżenie! Błąd sprawdzania danych',
    dataErrormsg:'Sprawdź pola pod kątem poprawności danych'
});
Ext.define("TK.locale.pl.view.edit.GroupEdit", {
    override: "TK.view.edit.GroupEdit",

    title:'Edycja grupowa',
    lookDoc:'Zobacz dokument',
    nvagHdr:'№ wagonu',
    sortHdr:'№ w<br>kolejności',
    klientNameHdr:"Właściciel<br>wagonu",
    vagOtmHdr:'Dostarczony<br>>wagon',
    grPodHdr:'Nośność,t',
    kolOsHdr:'Osie',
    taraVagHdr:'Kontener<br>wagonu,t',
    utiNHdr:'Kontener',
    utiTypeHdr:'Rozmiar',
    grPodKontHdr:'ładowność,t',
    taraKontHdr:'Tara<br>kontenera,kg',
    massaHdr:'Netto,kg',
    bruttoHdr:'Brutto,kg',
    kgvnHdr:'NHM',
    placesHdr:'Miejsca',
    rodHdr:'Opakowanie',
    g22Hdr:'Załadowany<br>przez',
    gs_48Hdr:'Metoda wyznaczania<br>masy',
    g694Hdr:'№ CIM/SMGS',
    g281Hdr:'Data <br>CIM/SMGS',
    npoezdHdr:'№ pociągu',
    plombsHdr:'Plomby',
    changeAll:'Zmień wszystko na ',
    changeEmpty:'Zmień puste na ',
    makeAllZeroes:'Zmień wszystko na 0',
    makeAllEmpty:'Zmień puste na ""',

    btnSave:'Zapisać',
    btnCancel:'Anuluj'
});
Ext.define("TK.locale.pl.view.edit.RouteSelect", {
    override: "TK.view.edit.RouteSelect",

    title:'Wybierz trasę docelową',
    btnChoose:'Wybierać',
    btnCancel:'Anuluj',
    labelCopy:'Kopiuj',
    labelMove:'Przenieś',
    showTitle: 'Ostrzeżenie',
    noRouteSelMsg:'Nie wybrano kierunku',
    sameRouteMsg:'Docelowy kierunek jest taki samy jak aktualny'
});

//--------------- контейнерная площадка
Ext.define("TK.locale.pl.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerNKont        :'№ pociągu',
    headerDateIn        :'Data przybycia',
    headerDateOut        :'Data odjazdu',
    headerSektor        :'Sektor',
    headerLoaded        :'Załadowano',
    headerStorageType        :'Typ składowania',
    headerXYZ        :'Współrzędne',
    title:'Plac kontenerowy'
});

Ext.define("TK.locale.pl.view.ky2.yard.YardList", {
    override:"TK.view.ky2.yard.YardList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerNKont        :'№ kontenera',
    headerDateIn        :'Data przybycia',
    headerDateOut        :'Data odjazdu',
    headerSector        :'Sektor',
    headerLoaded        :'Załadowano',
    headerStorageType        :'Typ składowania',
    headerXYZ        :'Współrzędne',
    headerTara         :'Tara,t',
    headerBrutto        :'Brutto,kg',
    headerMaxLoad       :'Max. ładunek,t',
    headerContSize      :'Rozmiar',
    headerTrNum     :'№ pociągu po przyjeździe',
    headerArrDate       :'Data przybycia',
    headerClient        :'Klient',
    title:'Plac kontenerowy',
    btnEditKont     : 'Edytuj kontener',
    btnKont         :'Kontener',
    btnCreateKont   :'Utworz kontener',
    btnSwitchClient :'Zmień klienta',
    btnClearFilter  :'Wyczyścić filtr',
    btnActions      :'Operacji',
    btnXLSsearch    :'XLS (szukanie)',
    btnXLSexport    :'XLS (export)',
    btnXLSrefresh   :'XLS (aktualizacja)',
    btnDelClient    :'Usuń kontener'
});

Ext.define("TK.locale.pl.controller.ky.Yard", {
    override:"TK.controller.ky.Yard",

    titleEdit:'Edytuj pozycję placa kontenerowej',
    titleCreate:'Utwórz pozycję placa kontenerowej',
    delTitle :'Kasowanie...',
    delMsg   :'Czy na pewno chcesz usunąć..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    headerName       :'Nazwa',
    headerDescr      :'Opis'
});

Ext.define("TK.locale.pl.controller.ky2.YardController", {
    override:"TK.controller.ky2.YardController",

    titleEdit:'Edytuj pozycję placa kontenerowej',
    titleCreate:'Utwórz pozycję placa kontenerowej',
    delTitle :'Kasowanie...',
    delMsg   :'Czy na pewno chcesz usunąć..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    headerName       :'Nazwa',
    headerDescr      :'Opis',
    titleCreateSector:'Utwórz sektor',
    titleEditSector  :'Edytuj sektor'
});

Ext.define("TK.locale.pl.view.ky.yard.Form", {
    override:"TK.view.ky.yard.Form",

    labelNKont:'№ kontenera',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Data przybycia',
    labelDate  :'data',
    labelTime  :'czas',
    labelDateOut  :'Wymiana',
    labelSector  :'Sektor',
    labelLoaded  :'Załadowano',
    labelStorageType  :'Typ składowania',
    labelStorageVACANT  :'Wolne stanowisko',
    labelStorageTEMPORALLY  :'Pozycja czasowa',
    labelStorageSTORAGE  :'Przechowywanie',
    labelPrzebieg  :'Przebieg(km)',
    labelNotes  :'Notatki',
    msgSearch  :'Wyszukiwanie...',
    msgNothingFound:'Nic nie znaleziono'
});

Ext.define("TK.locale.pl.view.ky2.yard.YardForm", {
    override:"TK.view.ky2.yard.YardForm",

    labelNKont:'№ kontenera',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Data przybycia',
    labelDate  :'date',
    labelTime  :'czas',
    labelDateOut  :'Wymiana',
    labelSector  :'Sektor',
    labelLoaded  :'Załadowano',
    labelStorageType  :'Typ składowania',
    labelStorageVACANT  :'Wolne stanowisko',
    labelStorageTEMPORALLY  :'Pozycja czasowa',
    labelStorageSTORAGE  :'Przechowywanie',
    labelPrzebieg  :'Przebieg(km)',
    labelNotes  :'Notatki',
    msgSearch  :'Wyszukiwanie...',
    msgNothingFound:'Nic nie znaleziono'
});

Ext.define("TK.locale.pl.view.ky.yard.Filter", {
    override:"TK.view.ky.yard.Filter",

    title: 'Filtr',
    btnFilter         :'Filtr',
    btnClear     :'Wyczyść',
    btnClose        :'Zamknij',
    labelNKont:'№ kontenera',
    labelDateIn  :'Data przybycia',
    labelDate  :'date',
    labelTime  :'czas',
    labelDateOut  :'Wymiana',
    labelDateFrom  :'od',
    labelDateTo  :'do',
    labelSector  :'Sektor',
    labelLoaded  :'Załadowano',
    labelNotLoaded:'Pusty',
    labelStorageType  :'Typ składowania',
    labelStorageVACANT  :'Wolne stanowisko',
    labelStorageTEMPORALLY  :'Pozycja czasowa',
    labelStorageSTORAGE  :'Przechowywanie',
    msgSearch  :'Wyszukiwanie...',
    msgNothingFound:'Nic nie znaleziono'
});

Ext.define("TK.locale.pl.view.ky2.yard.Filter", {
    override:"TK.view.ky2.yard.Filter",

    title: 'Filtr',
    btnFilter         :'Filtr',
    btnClear     :'Wyczyść',
    btnClose        :'Zamknij',
    labelNKont:'№ kontenera',
    labelDateIn  :'Data przybycia',
    labelDate  :'date',
    labelTime  :'czas',
    labelDateOut  :'Wymiana',
    labelDateFrom  :'od',
    labelDateTo  :'do',
    labelSector  :'Sektor',
    labelLoaded  :'Załadowano',
    labelNotLoaded:'Pusty',
    labelStorageType  :'Typ składowania',
    labelStorageVACANT  :'Wolne stanowisko',
    labelStorageTEMPORALLY  :'Pozycja czasowa',
    labelStorageSTORAGE  :'Przechowywanie',
    msgSearch  :'Wyszukiwanie...',
    msgNothingFound:'Nic nie znaleziono',
    labelArrivalFrom:'Przyjazd, od',
    labelArrivalTill:'Przyjazd, do',
    lblInternationalTrNum:'Międzynarodowy № pociągu',
    labelClient:'Klient',
    labelContainer:'Kontener'
});

Ext.define("TK.locale.pl.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    storage_0       :'Wolny',
    storage_1       :'Czasowy',
    storage_2       :'Przechowywanie'
});

Ext.define("TK.locale.pl.view.ky2.yard.List", {
    override:"TK.view.ky2.yard.List",

    storage_0       :'Wolny',
    storage_1       :'Czasowy',
    storage_2       :'Przechowywanie'
});

Ext.define("TK.locale.pl.view.ky.AbstractForm", {
    override:"TK.view.ky.AbstractForm",

    btnSave       :'Zapisz',
    btnCancel     :'Anuluj'
});

Ext.define("TK.locale.pl.view.ky2.AbstractForm", {
    override:"TK.view.ky2.AbstractForm",

    btnSave         :'Zapisz',
    btnSaveExit     :'Zapisz i wyjdź',
    btnClose        :'Zamknij',
    btnCancel       :'Anuluj',
    lblPosition     :'Pozycja',
    lblRow          :'Rząd',
    lblFloor        :'Piętro',
    lblSector       :'Sektor',
    lblName             :'Nazwa',
    lblDescription      :'Opis',
    lblUsrGroups        :'Grupy użytkowników'
});

Ext.define("TK.locale.pl.view.ky.BaseList", {
    override:"TK.view.ky.BaseList",

    btnEdit         :'Edytuj',
    btnDelete       :'Usuń',
    btnFilter       :'Filtr',
    warnTitle       :'Ostrzeżenie',
    warnMsg         :'Powinieneś wybrać wiersz z tabeli danych',
    btnVgCtGr       :'+Wagon/Kontener/Ładunek',
    btnFromCar      :'Samochodem',
    btnFromTrainByArr:'+ Z pociągu według przyjazdu',
    btnReports      :'Raporty'
});

Ext.define("TK.locale.pl.view.ky2.BaseList", {
    override:"TK.view.ky2.BaseList",

    btnEdit         :'Edytuj',
    btnDelete       :'Usuń',
    btnFilter       :'Filtr',
    warnTitle       :'Ostrzeżenie',
    warnMsg         :'Powinieneś wybrać wiersz z tabeli danych',
    btnVgCtGr       :'+Wagon/Kontener/Ładunek',
    btnVgCt         :'Kontener/Ładunek',
    btnDocs         :'Załączone dokumenty',
    btnFromCar      :'Samochodem',
    btnFromTrainByArr:'+ Z pociągu według przyjazdu',
    btnReports      :'Raporty',
    btnWide         :'Na szeroki',
    btnCreateFromOrder:'Twórz z zamówienia',
    btnCopy         :'Kopia',
    btnAddTrackByArr:'+ Samochód według wyjazdu',
    btnPrint        :'Wydrukować',
    btnSectors      :'Sektory',
    noData          :'Brak danych'
});

Ext.define("TK.locale.pl.view.ky.AbstractList", {
    override:"TK.view.ky.AbstractList",

    btnCreate   :'Utwórz',
    btnReport:'Raport'
});

Ext.define("TK.locale.pl.view.ky2.AbstractList", {
    override:"TK.view.ky2.AbstractList",

    btnCreate           :'Utwórz',
    warnTitle           :'Ostrzeżenie',
    warnMsg             :'Powinieneś wybrać wiersz z tabeli danych',
    btnReport           :'Raport',
    btnUniversalMap     :'Uniwersalna mapa',
    btnFilter           :'Filtr',
    noData              :'Brak danych',
    labelNWag           :'Numer wagonu',
    btnChoose           :'Wybierz',
    labelNOrder         :'Numer zamówienia',
    lblTrainNum         :'№ pociągu',
    loadingTxt          :'Wyszukiwanie',
    emptyText           :'Nic nie znaleziono',
    columnLblName       :'Nazwa',
    columnLblDescription:'Opis',
    columnLblGroups     :'Grupy',
    btnEdit             :'Edytować',
    btnDelete           :'Usunąć'
});

Ext.define("TK.locale.pl.view.ky.AbstractWindow", {
    override:"TK.view.ky.AbstractWindow",

    btnClose         :'Zamknij'
});

Ext.define("TK.locale.pl.view.ky2.AbstractWindow", {
    override:"TK.view.ky2.AbstractWindow",

    btnClose         :'Zamknij'
});

Ext.define("TK.locale.pl.view.ky.poezd.into.List", {
    override:"TK.view.ky.poezd.into.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerPoezdNum    :'№ pociągu',
    headerKoleya        :'Koleja',
    headerDateIn        :'Przyjazd',
    title               :'Lista pociągów według przyjazdu'
});

Ext.define("TK.locale.pl.view.ky2.poezd.BasePoezdList", {
    override:"TK.view.ky2.poezd.BasePoezdList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerPoezdNum    :'№ pociągu',
    headerPoezdNumM   :'Międzynarodowy № pociągu',
    headerKoleya      :'Koleja',
    headerVagCount    :'Ilość wagonów',
    freeSpace         :'',
    // title:'Список поездов по прибытию',
    btnCreate           :'Stwórz pociąg',
    btnEdit             :'Edytuj pociąg',
    btnCreateVags       :'Stwórz wagon',
    btnEditVags         :'Edytuj wagon'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateIn        :'Data przybycia',
    headerKontCount   :'Ilość nie  rozładowanych kontenerów',
    btnToPoezdOut   : 'W pociągu po odjeździe',
    btnToYard     : 'Na plac kontenerowy',
    btnOnTrack:'Samochodem',
    btnAddTrain:'+ Pociąg według wyjazdem',
    btnCreateFromOrder:'Twórz z zamówienia',
    title:'Lista pociągów według przyjazdu'
    // btnCreate   :'Создать поезд',
    // btnEdit     :'Редактировать поезд',
    // btnCreateVags   :'Создать вагоны',
    // btnEditVags     :'Редактировать вагоны'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateOut        :'Data odjazdu',
    headerKontCount :'Ilość załadowanego kontenerów',
    btnFromPoezdInto   : 'Z pociągu wedlug przyjazdu',
    btnFromYard     : 'Z placa kontenerowego',
    title:'Lista pociągów przy wyjeździe'
});

Ext.define("TK.locale.pl.view.ky.poezd.out.List", {
    override:"TK.view.ky.poezd.out.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerPoezdNum        :'№ pociągu',
    headerKoleya        :'Koleja',
    headerDateOut        :'Data odjazdu',
    title:'Lista pociągów przy wyjeździe'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.List", {
    override:"TK.view.ky2.poezd.out.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerPoezdNum        :'№ pociągu',
    headerKoleya        :'Koleja',
    headerDateOut        :'Data odjazdu',
    title:'Lista pociągów przy wyjeździe'
});

Ext.define("TK.locale.pl.view.ky.poezd.into.vagon.List", {
    override:"TK.view.ky.poezd.into.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Lista wagonów kolejowych'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.vagon.List", {
    override:"TK.view.ky2.poezd.into.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Lista wagonów kolejowych'
});

Ext.define("TK.locale.pl.view.ky.poezd.out.vagon.List", {
    override:"TK.view.ky.poezd.out.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Lista wagonów kolejowych'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.vagon.List", {
    override:"TK.view.ky2.poezd.out.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Lista wagonów kolejowych'
});

Ext.define("TK.locale.pl.view.ky.poezd.into.vagon.kont.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.List",

    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów wagonów'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.vagon.kont.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.List",

    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów wagonów'
});

Ext.define("TK.locale.pl.view.ky.poezd.out.vagon.kont.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.List",

    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów wagonów'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.vagon.kont.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.List",

    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów wagonów'
});

Ext.define("TK.locale.pl.view.ky.kontnotransp.List", {
    override:"TK.view.ky.kontnotransp.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów'
});

Ext.define("TK.locale.pl.view.ky2.kontnotransp.List", {
    override:"TK.view.ky2.kontnotransp.List",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerKontNum        :'№ kontenera',
    title:'Lista kontenerów'
});


Ext.define("TK.locale.pl.view.ky.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky.BaseGruzList", {
    override:"TK.view.ky.BaseGruzList",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky2.BaseGruzList", {
    override:"TK.view.ky2.BaseGruzList",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.plomb.List",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.plomb.List",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky.BasePlombList", {
    override:"TK.view.ky.BasePlombList",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky2.BasePlombList", {
    override:"TK.view.ky2.BasePlombList",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.plomb.List",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.plomb.List",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky.kontnotransp.gruz.List", {
    override:"TK.view.ky.kontnotransp.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky2.kontnotransp.gruz.List", {
    override:"TK.view.ky2.kontnotransp.gruz.List",

    headerGruzCode        :'Cod',
    headerGruzName        :'Nazwa',
    title:'Lista ładunków kontenera'
});

Ext.define("TK.locale.pl.view.ky.kontnotransp.plomb.List", {
    override:"TK.view.ky.kontnotransp.plomb.List",

    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.view.ky2.kontnotransp.plomb.List", {
    override:"TK.view.ky2.kontnotransp.plomb.List",
    headerPlombKpl        :'Ilość',
    headerPlombZnak        :'Plombs',
    title:'Lista plomb kontenera'
});

Ext.define("TK.locale.pl.controller.ky.Poezd", {
    override:"TK.controller.ky.Poezd",

    titleCreate: 'Stwórz pociąg',
    titleEdit: 'Edytuj pociąg',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky2.PoezdController", {
    override:"TK.controller.ky2.PoezdController",

    titleCreate: 'Stwórz pociąg',
    titleCreateIntoWide: 'Stwórz pociąg t.1520 przy przyjazde',
    titleCreateOutWide: 'Stwórz pociąg t.1520 przy wyjeździe',
    titleCreateIntoNar: 'Stwórz pociąg t.1435 przy przyjazde',
    titleCreateOutNar: 'Stwórz pociąg t.1435 przy przyjazde',
    titleEdit: 'Edytuj pociąg',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    warningMsg:'Ostrzeżenie!',
    warningText:'Pociąg jest niezapisany....',
    uploadText:'Dane zostały przesłane',
    titleUpload: 'Przesyłanie XLS',
    labelSelectFile:'Wybierz plik do przesłania...',
    labelFile:'File',
    btnSearch:'Szukaj...',
    btnSave  :'Zapisz',
    btnClose :'Zamknij',
    titleConfirmation:'Potwierdzenie',
    msgTrainByDeparture:'Stwórzyć pociąg przy wyjeździe?',
    titleWarn:'Ostrzeżenie',
    msgInvalid:'Niepoprawna forma',
    errorTitle:'Błąd',
    noSelectionError:'Nic nie zostało wybrane'
});

Ext.define("TK.locale.pl.controller.ky2.PoezdZayavController", {
    override:"TK.controller.ky2.PoezdZayavController",

    titleCreate: 'Utwórz zamówienie',
    titleCreateOrderImport:'Utwórz zamówienie na import',
    titleCreateOrderExport:'Utwórz zamówienie na export',
    titleEdit: 'Edytuj  zamówienie',
    delTitle :'Kasowanie...',
    delOrderMsg:'Usunąć zamówienie?',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    warningMsg:'Ostrzeżenie!',
    warningText:'Request unsaved....',
    uploadText:'Dane zostały przesłane',
    titleUpload: 'Przesyłanie XLS',
    labelSelectFile:'Wybierz plik do przesłania\n...',
    labelFile:'File',
    btnSearch:'Szukaj...',
    btnSave  :'Zapisz',
    btnClose :'Zamknij',
    formInvalid:'Forma jest nieprawidłowa'
});

Ext.define("TK.locale.pl.controller.ky2.AvtoCtGrController", {
    override:"TK.controller.ky2.AvtoCtGrController",

    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    warningMsg:'Ostrzeżenie!',
    warningText:'Samochód niezapisany ....',
    uploadText:'Dane zostały przesłane',
    titleUpload: 'Przesyłanie XLS',
    labelSelectFile:'Wybierz plik do przesłania...',
    labelFile:'File',
    btnSearch:'Szukaj...',
    btnSave  :'Zapisz',
    btnClose :'Zamknij',
    titleCtGr:'Kontener/Ładunek'
});

Ext.define("TK.locale.pl.controller.ky.Vagon", {
    override:"TK.controller.ky.Vagon",

    titleCreate: 'Stwórz wagon',
    titleEdit: 'Edytuj wagon',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky2.Vagon", {
    override:"TK.controller.ky2.Vagon",

    titleCreate: 'Stwórz wagon',
    titleEdit: 'Edytuj wagon',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky.Gruz", {
    override:"TK.controller.ky.Gruz",

    titleCreate: 'Stwórz samochódgo',
    titleEdit: 'Edytuj samochódgo',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky2.Gruz", {
    override:"TK.controller.ky2.Gruz",

    titleCreate: 'Stwórz samochódgo',
    titleEdit: 'Edytuj samochódgo',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky.Kont", {
    override:"TK.controller.ky.Kont",

    titleCreate: 'Stwórz Kontener',
    titleEdit: 'Edytuj kontener',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky2.Kont", {
    override:"TK.controller.ky2.Kont",

    titleCreate: 'Stwórz Kontener',
    titleEdit: 'Edytuj kontener',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky.Plomb", {
    override:"TK.controller.ky.Plomb",

    titleCreate: 'Stwórz Pieczęć',
    titleEdit: 'Edytuj Pieczęć',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.controller.ky2.Plomb", {
    override:"TK.controller.ky2.Plomb",

    titleCreate: 'Create plombs',
    titleEdit: 'Edit plombs',
    delTitle :'Kasowanie...',
    delMsg   :'Usunąć zapis..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',

    headerPoezdNum        :'№ pociągu',
    headerKoleya        :'Koleja',
    headerDateIn        :'Data przybycia',

    title:'Lista pociągów według przyjazdu',

    btnCreate   :'Stwórz pociąg',
    btnEdit     :'Edytuj pociąg',
    btnCreateVags   :'Stwórz wagon',
    btnEditVags     :'Edytuj wagon'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',

    headerPoezdNum        :'№ pociągu',
    headerKoleya        :'Koleja',
    headerDateOut        :'Wyjazd',

    title:'Lista pociągów przy wyjeździe'
});

Ext.define("TK.locale.pl.view.ky2.poezd.BasePoezdForm", {
    override:"TK.view.ky2.poezd.BasePoezdForm",

    labelNppr         :'№ pociągu',
    labelNpprm        :'Międzynarodowy № pociągu',
    labelKoleya       :'Koleja',
    labelKoleyaWide   :'Szeroki',
    labelKoleyaNarow  :'Wąskie',
    labelClient       :'Klient',
    labelKstf         :'Kod stacji formacji',
    labelNstf         :'Nazwa stacji formacyjnej',
    labelAdmf         :'Administracja formacji',
    labelKstn         :'Kod stacji docelowej',
    labelNstn         :'Nazwa stacji docelowej',
    labelAdmn         :'Droga',
    labelArr            :'Przyjeźdz',
    labelDate           :'Data',
    labelTime           :'Czas',
    labelImport         :'Import',
    labelImportXLS      :'XLS (Karta załadunku)',
    labelXLSrefresh :'XLS (odświeżać)',
    labelPPV            :'BCh list wagony',
    labelImportFromOrder  :'+ import z zamówienia',
    labelVgCtGr     :'+Wagon/Kontener/Ładunek'
});

Ext.define("TK.locale.pl.view.ky2.avto.BaseAvtoList", {
    override:"TK.view.ky2.avto.BaseAvtoList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    headerAvtoNum      :'Samochód',
    headerAvtoTrail    :'№ przyczepa№',
    headerNKont        :'№ kontenera',
    headerDriverFam    :'Imię kierowcy',
    headerDep          :'Punkt wyjścia',
    headerDest         :'Punkt przybycia',
    title:'Lista samochodów po przyjeździe'
});

Ext.define("TK.locale.pl.view.ky2.BaseAvtoZayavsDir", {
    override:"TK.view.ky2.BaseAvtoZayavsDir",

    headerZayavNum     :'№ wnioska',
    headerAvtoNum      :'Samochód',
    headerAvtoTrail    :'№ przyczepa№',
    btnSelect          :'Wybierz'
});

Ext.define("TK.locale.pl.view.ky2.avto.into.AvtoList", {
    override:"TK.view.ky2.avto.into.AvtoList",

    headerDateIn       :'Przyjazd',
    btnToAvto          : "Samochodem w dniu wyjazdu",
    btnToPoezd         : "Pociągiem w dniu wyjazdu",
    btnToYard          : "Na plac kontenerowy",
    title              :'Lista samochodów według przybycia',
    headerKontCount    :'Ilość nie  rozładowanych kontenerów',
    headerPZWZ         :'№ PZ'
});

Ext.define("TK.locale.pl.view.ky2.avto.BaseAvtoZayavList", {
    override:"TK.view.ky2.avto.BaseAvtoZayavList",

    headerCreation    :'Utworzenie',
    headerDateTime    :'Data i czas',
    headerUser        :'Użytkownik',
    txtUnload         :'Rozładowanie',
    txtLoad           :'Ładowanie'
});

Ext.define("TK.locale.pl.view.ky2.into.AvtoZayavList", {
    override:"TK.view.ky2.avto.into.AvtoZayavList",

    title:'Lista wniosków o import'
});

Ext.define("TK.locale.pl.view.ky2.avto.out.AvtoZayavList", {
    override:"TK.view.ky2.avto.out.AvtoZayavList",

    title:'Lista wniosków o export'
});

Ext.define("TK.locale.pl.view.ky2.avto.out.AvtoList", {
    override:"TK.view.ky2.avto.out.AvtoList",

    headerDateOut      :'Data odjazdu',
    btnToAvto          : "Samochodem w dniu wyjazdu",
    btnToPoezd         : "Pociągiem w dniu wyjazdu",
    btnToYard          : "Na plac kontenerowy",
    title              :'Lista samochodów według przybycia',
    headerKontCount    :'Ilość nie  rozładowanych kontenerów',
    headerPZWZ         :'Numer WZ'
});

Ext.define("TK.locale.pl.controller.ky2.AvtoController", {
    override:"TK.controller.ky2.AvtoController",

    titleCreate: 'Stwórz samochód',
    titleEdit: 'Edytuj samochód',
    delTitle :'Kasowanie...',
    delMsg   :'Czy na pewno chcesz usunąć..?',
    maskMsg :'Żądanie danych...',
    errorMsg:'Ostrzeżenie! Błąd...',
    warningMsg:'Ostrzeżenie!',
    warningText:'Samochód jest niezapisany....',
    lblConfirmation:'Potwierdzenie',
    msgCreateCarByDeparture:'Stwórz samochód przy wyjeździe?',
    msgCarByDepartureConfirm:'Samochód przy wyjeździe został stworzony',
    msgDataLoaded:'Dane załadowane',
    titeltError:'Błąd',
    msgNothingSel:'Nic nie zostało wybrane',
    titleConfirm:'Potwierdzenie',
    msgCopyTruck:'Skopiować samochód?'
});

Ext.define("TK.locale.pl.controller.ky2.PoezdVgCtGrController", {
    override:"TK.controller.ky2.PoezdVgCtGrController",

    titleTree       : 'Wagon/Kontener/Ładunek',
    titleTreeVgCt   :'Wagon/Kontener'
});

Ext.define("TK.locale.pl.view.ky2.AbstractTreeForm", {
    override:"TK.view.ky2.AbstractTreeForm",

    btnSave       : 'Zapisz',
    btnSaveExit   : 'Zapisz i wyjdź',
    btnClose      : 'Zamknij',
    btnEditPoezd  : 'Edytuj pociąg',
    ttipEditOrder         :'Edytuj zamówienie',
    ttipEditTruck           :'Edytuj samochód',
    ttipByTruckDeparture    :'Samochodem przy wyjeździe',
    ttipByTruckArrival      :'Samochodem po przyjeździe',
    ttipByTrainDeparture    :'Pociągiem według wyjezda',
    ttipByTrainArrival      :'Pociągiem przy wyjściu',
    ttipOnCYard             :'Na placu kontenerowym',
    ttipHideWags            :'Ukryj wagony',
    ttipShowWags            :'Pokaż wagony',
    ttipHide                :'Ukryj',
    ttipShow                :'Pokaż',
    btnAddWag               :'+ wagon',
    btnAddCont              :'+ kontener',
    btnAddCorgo             :'+ Ładunek',
    btnAddPlomb             :'+ Plomba',
    titleWag                :'Wagon',
    labelArrival            :'Przyjazd',
    labelNvag               :'№ wagonu',
    labelNtrack             :'№ Koleji',
    labelTonnage            :'Max. ładunek, т',
    labelKolOs              :'Osi',
    labelTaraWag            :'Tara',
    labelOwner              :'Właśnik',
    titleCont               :'Kontener',
    labelNum                :'Numer',
    labelCont               :'Kontener',
    labalOtpr               :'CIM/SMGS №',
    labelNorder             :'№ Zamówienia',
    labelDeparture          :'Wyjazd',
    labelDate               :'Data',
    labelTime               :'Czas',
    labelEmtyWag            :'Pusty',
    labelBrutto             :'Brutto,kg',
    labelTara               :'Tara, kg',
    labelTotalBrutto        :'Całkowity brutto,kg',
    labelSize               :'Rozmiar',
    labelContSize           :'Typ',
    labelClient             :'Klient',
    labelNotes              :'Notatki',
    titleCargo              :'Ładunek',
    labelCodeGng            :'Kod NHM',
    labelNameGng            :'Nazwa NHM',
    labelPackage            :'Pakowanie',
    labelPlaces             :'Miejsca',
    labelMassa              :'Waga, kg',
    titlePlomb              :'Plomba',
    labelPlomb              :'Plomba',
    labelSealingStation     :'Stacja uszczelniająca',
    labelQuantity           :'Ilość',
    btnAct                  :'Akt',
    btnInterchange          :'INTERCHANGE',
    btnDelete               :'Usuń'
});
Ext.define("TK.locale.pl.ky2.AbstractBindTreeForm", {
    override:"TK.view.ky2.AbstractBindTreeForm",

    btnSave       : 'Zapisz',
    btnSaveExit   : 'Zapisz i wyjdź',
    btnClose      : 'Zamknij',
    btnEditPoezd  : 'Edytuj pociąg',
    btnVgCtGr     : '+Wagon/Kontener/Ładunek',
    ttipHideWags  :'Ukryj wagony',
    ttipShowWags  :'Pokaż wagony',
    ttipHide      :'Ukryj',
    ttipShow      :'Pokaż',
    labelMove     :'Przenieś',
    labelMoveAll  :'Przenieś wszystko',
    lblOrder      :'Zamówienie',
    btnRest             :'Reset',
    btnFiltr            :'Filtr'
});

Ext.define("TK.locale.pl.ky2.avto.AvtoBindTreeForm", {
    override:"TK.view.ky2.avto.AvtoBindTreeForm",

    btnSave       : 'Zapisz',
    btnSaveExit   : 'Zapisz i wyjdź',
    btnClose      : 'Zamknij',
    btnEdit       : 'Edytuj samochód',
    btnVgCtGr     : 'Kontener/Ładunek',
    ttipMove      :'Przenieś',
    lblOrder      :'Zamówienie',
    btnRest             :'Reset',
    btnFiltr            :'Filtr'
});

Ext.define("TK.locale.pl.view.ky2.poezd.zayav.PoezdZayavList", {
    override:"TK.view.ky2.poezd.zayav.PoezdZayavList",

    title:'Lista zamówień na pociąg'
});

Ext.define("TK.locale.pl.view.ky2.poezd.BasePoezdZayavList", {
    override:"TK.view.ky2.poezd.BasePoezdZayavList",

    headerOrderNum      :'№ zamówienia',
    headerTrainNum      :'№ pociągu',
    headerClient        :'Klient',
    headerOrderType     :'Typ zamówienia',
    headerWagonQuantity     :'Ilość wagonów',
    headerContainerQuantity     :'Ilość w kontenerze',
    headerCreation      :'Utworzenie',
    headerDateTime      :'Data i czas',
    headerUser          :'Użytkownik'
});

Ext.define("TK.locale.pl.view.ky2.avto.BaseAvtoZayavList", {
    override:"TK.view.ky2.avto.BaseAvtoZayavList",

    title: 'Lista zamówień samochodów',
    headerOrderNum      :'№ zamówienia',
    headerAvtoNum      :'№ samochodu',
    headerTrailerNum      :'№ przyczepy',
    headerDriver        :'Kierowca',
    headerClient        :'Klient',
    headerContainerNum     :'№ kontenera',
    headerOrderType     :'Typ zamówienia'
});

Ext.define("TK.locale.pl.view.ky2.client.ClientList", {
    override:"TK.view.ky2.client.ClientList",

    title: 'Klient',
    headerSector        :'Sektor',
    headerPlace         :'Umieszczenie',
    headerContainer     :'Kontener',
    headerTara          :'Tara',
    headerBrutto        :'Brutto,kg',
    headerContainerNum  :'№ kontenera',
    headerContSize      :'Rozmiar',
    headerTrainNbyArrival  :'№ pociągu<br/>po przyjeździe',
    hederArrDate        :'Data<br/>przybycia',
    headerClient        :'Klient',
    headerDaysInKP      :'Przechowywany<br/>(dni)'
});

Ext.define("TK.locale.pl.view.ky2.ReportParams", {
    override:"TK.view.ky2.ReportParams",

    title: 'Parametry raportu',
    labelDepArr        :'Przyjazdy/Odjazdy',
    labelFrom         :'od',
    labelTo             :'do',
    labelIntTrainNumber          :'Międzynarodowy № pociągu',
    loadintTxt          :'Szukaj',
    emptyText           :'Nic nie znaleziono',
    labelClient      :'Klient',
    labelVehicleByArr  :'Transport według przyjeździe',
    labelVehicleByDep  :'Transport według wyjazdu',
    buttonOk            :'Ok',
    buttonClear        :'Unieważnić',
    buttonClose      :'Zamknij',
    storeTxtAll         :'Wszystkie',
    storeTxtArrival     :'Przyjazd',
    storeTxtDeparture   :'Odjazd',
    storeTxtVagon       :'Wagon',
    storeTxtTruck       :'Samochód'
});

Ext.define("TK.locale.pl.view.edit.ClientEdit", {
    override:"TK.view.edit.ClientEdit",

    title          : 'Klient',
    btnSave        :'Zapisz',
    btnCancel      :'Zamknij',
    lblContractNum  :'Numer kontaktu',
    lblContractDate :'Data kontaktu',
    lblFullName     :'Pełne imię',
    lblShortName    :'Krótkie imię',
    lblClientCode   :'Kod klienta',
    lblDaysWoutPayment:'Dni bez płatności',
    lblUserGroups   :'Grupy użytkowników',
    lblPZ           :'PZ',
    lblWZ           :'WZ'
});

Ext.define("TK.locale.pl.view.ky2.avto.BaseAvtoForm", {
    override:"TK.view.ky2.avto.BaseAvtoForm",

    lblArrival          : 'Przybycie',
    lblDate             :'Data',
    lblTime             :'Czas',
    btnPrint            :'Drukuj',
    btnPZ               :'PZ',
    btnAddContGr        :'+Kontener/Ładunek',
    btnTrucksByDeparture:'+ Samochód według wyjazdu',
    btnImportFromOrder  :'+ import z zamówienia',
    lblTruckN           :'Numer samochodu',
    lblTrailerN         :'Numer przyczepy',
    lblDriverFullName   :'Imię i nazwisko kierowcy',
    lblDriversPasport   :'Paszport kierowcy',
    lblNotes            :'Notatki',
    btnWZ               :'WZ'
});

Ext.define("TK.locale.pl.controller.ky2.BindAvtoAndAvtoController", {
    override:"TK.controller.ky2.BindAvtoAndAvtoController",

    tittle1         : '№ Kontenera/Waga tary/Netto/Rozmiar/Max. ładunek',
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.PoezdIntoForPoezdOutDir", {
    override:"TK.view.ky2.poezd.into.PoezdIntoForPoezdOutDir",

    title       :'Lista wagonów kolejowych według wyjazdu'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.PoezdZayavsIntoDir", {
    override:"TK.view.ky2.poezd.into.PoezdZayavsIntoDir",

    title :'Lista zamówień według przyjeździe'
});

Ext.define("TK.locale.pl.view.ky2.poezd.zayav.Filter", {
    override:"TK.view.ky2.poezd.zayav.Filter",

    title               :'Filtr',
    labelFateFrom       :'Data, z',
    labelNOrder         :'№ zamówienia',
    labelClient         :'Klient',
    labelNTraint        :'№ pociągu',
    btnFilter           :'Filtr',
    btnClear            :'Unieważnić',
    btnClose            :'Zamknij'
});

Ext.define("TK.locale.pl.view.ky2.avto.FilterAvto", {
    override:"TK.view.ky2.avto.FilterAvto",

    title               :'Filtr',
    labelFateFrom       :'Data, z',
    labelNTruck         :'№ samochodu',
    labelNTrailer       :'№ przyczepy',
    labelDriverFam      :'Imię kierowcy',
    labelContainer      :'Kontener',
    btnFilter           :'Filtr',
    btnClear            :'Unieważnić',
    btnClose            :'Zamknij'
});

Ext.define("TK.locale.pl.view.ky2.avto.out.AvtoForm", {
    override:"TK.view.ky2.avto.out.AvtoForm",

    title               :'Samochod, wyjazd',
    lblDeparture        :'Wyjazd',
    lblDate             :'Data',
    lblTime             :'Czas'
});

Ext.define("TK.locale.pl.controller.ky2.BindPoezdAndPoezdController", {
    override:"TK.controller.ky2.BindPoezdAndPoezdController",

    titlForPoezd               :"Wagon №/Max. ładunek/Tara/Osi/Właśnik" + '<br/>' +
        "№ kontenera/Klient/Waga tary/Brutto/Rozmiar/Max. ładunek/Notatki"
});

Ext.define("TK.locale.pl.view.pl.avto.into.AvtoZayavsIntoDir", {
    override:"TK.view.ky2.avto.into.AvtoZayavsIntoDir",

    title: 'Lista aplikacji do rozładunku'
});

Ext.define("TK.locale.pl.view.ky2.InterchangeKont", {
    override:"TK.view.ky2.InterchangeKont",

    title               :'Wybierz uszkodzenie',
    lblMalfunction      :'Uszkodzenie',
    btnChoose           :'Wybierz',
    btnClose            :'Zamknij'
});

Ext.define("TK.locale.pl.view.ky2.FilesForm", {
    override:"TK.view.ky2.FilesForm",

    title               :'Lista dokumentów na samochod'
});

Ext.define("TK.locale.pl.view.ky2.poezd.out.PoezdForm", {
    override:"TK.view.ky2.poezd.out.PoezdForm",

    labelDep       :'Wyjazd',
    labelDate       :'Data',
    labelTime       :'Czas',
    labelImport     :'Import',
    labelImportFromOrder  :'+ import z zamówienia',
});

Ext.define("TK.locale.pl.controller.ky2.BindPoezdAndYardController", {
    override:"TK.controller.ky2.BindPoezdAndYardController",

    titleAddOnConYard       :'+ Na plac kontenerowy',
    labelTrNum              :'Pociąg № ',
    titleContYard           :'Plac kontenerowy ',
    titleCnumTypeBrTon      :'Kontener №/Klient/Waga Tary/Brutto/Rozmiar/Max. ładunek/Notatki',
    titleWarn               :'Ostrzeżenie',
    warnMsg                 :'Znaleziono duplikaty kontenerów, przenieść ich w każdym razie?',
    warnMsg2                :'Za mało wolnych miejsc w sektorze, aby przenieść wszystkie kontenery, kontynuować?',
    allertTitle             :'Satus',
    allertMsg               :'Złe wartości pól.'
});

Ext.define("TK.locale.pl.view.ky2.VagKontSearch", {
    override:"TK.view.ky2.VagKontSearch",

    emptyText               :'szukaj... '
});

Ext.define("TK.locale.pl..view.ky2.avto.out.Avto2YardBindTreeForm", {
    override:"TK.view.ky2.avto.out.Avto2YardBindTreeForm",

    lblOrder               :'Zamówienie'
});

Ext.define("TK.locale.pl..view.ky2.poezd.out.PoezdsIntoForPoezdOutDir", {
    override:"TK.view.ky2.poezd.out.PoezdsIntoForPoezdOutDir",

    title               :'Lista wagonów kolejowych według wyjazdu'
});

Ext.define("TK.locale.pl.view.ky2.yard.YardSectorList", {
    override:"TK.view.ky2.yard.YardSectorList",

    title               :'Sectors'
});

Ext.define("TK.locale.pl.view.ky2.poezd.BasePoezdZayavForm", {
    override:"TK.view.ky2.poezd.BasePoezdZayavForm",

    lblOrderNum         :'№ zamówienia',
    lblOrderType        :'Typ zamówienia',
    lblUnloading        :'Rozładowanie',
    lblLoading          :'Ładowanie',
    titleDesigned       :'Stworzony',
    lblDate             :'Data',
    lblTime             :'Czas',
    lblInternationalTrNum:'Międzynarodowy № pociągu',
    lblTrainNum         :'№ pociągu',
    lblClient           :'Klient',
    btnSaveExit         : 'Zapisz i wyjdź',
    btnVgCtGr           :'+Wagon/Kontener/Ładunek',
    btnImportFromXLS    :'Import z XLS',
    btnClose            : 'Zamknij'
});

Ext.define("TK.locale.pl.view.ky2.avto.BaseAvtoZayavForm", {
    override:"TK.view.ky2.avto.BaseAvtoZayavForm",

    lblOrderNum         :'№ zamówienia',
    lblOrderType        :'Typ zamówienia',
    lblUnloading        :'Rozładowanie',
    lblLoading          :'Ładowanie',
    titleDesigned       :'Stworzony',
    lblDate             :'Data',
    lblTime             :'Czas',
    lblClient           :'Klient',
    btnSaveExit         : 'Zapisz i wyjdź',
    btnCtGr           :'+ Kontener/Ładunek',
    btnImportFromXLS    :'Import z XLS',
    btnClose            : 'Zamknij',
    lblTruckNum         :'№ Samochoda',
    lblTrailerNum       :'№ Przyczepa',
    lblDriverFIO        :'Imię i nazwisko kierowcy',
    lblDriverPassport   :'Paszport kierowcy',
    lblNotes            :'Notatki'
});

Ext.define("TK.locale.pl.controller.ky2.AvtoZayavController", {
    override:"TK.controller.ky2.AvtoZayavController",

    titleCreateOrderforUnload       :'Utwórz zamówienie na rozładunek',
    titleCreateOrderforLoad         :'Utwórz zamówienie na załadunek',
    titleCreateOrder                :'Utwórz zamówienie',
    msgDelOrder                     :'Usunąć zamówienie?',
    titleEdit                       :'Edytować zamówienie '
});

Ext.define("TK.locale.pl.controller.ky2.AvtoZayavCtGrController", {
    override:"TK.controller.ky2.AvtoZayavCtGrController",

    titleContGr             :'Kontener/Ładunek',
    mgsCont                 :'Kontener ',
    mgsInOrder              :' znalezione w zamówienie № ',
    mgsFrom                 :' od ',
    btnContinue             :'Kontynuować',
    btnCancel               :'Anulować',
    titleError              :'Błąd...'
});

Ext.define("TK.locale.pl.view.ky2.avto.into.AvtoZayavForm", {
    override:"TK.view.ky2.avto.into.AvtoZayavForm",

    title               :'Zamówienie samochodu, import'
});

Ext.define("TK.locale.pl.view.ky2.avto.out.AvtoZayavForm", {
    override:"TK.view.ky2.avto.out.AvtoZayavForm",

    title               :'Samochód, wyjazd'
});

Ext.define("TK.locale.pl.view.ky2.poezd.into.PoezdZayavForm", {
    override:"TK.view.ky2.poezd.into.PoezdZayavForm",

    title               :'Samochód, wyjazd'
});

Ext.define("TK.locale.pl.view.ky2.poezd.PoezdsImportDir", {
    override:"TK.view.ky2.poezd.PoezdsImportDir",

    title               :'Lista pociągów do zaimportowania'
});

Ext.define("TK.locale.pl.view.ky2.BasePoezdsImportDir", {
    override:"TK.view.ky2.BasePoezdsImportDir",

    columnTrain         :'Pociąg',
    columnDate          :'Data',
    columnVed           :'List',
    columnVagQuantity   :'Ilość<br/>wagonów',
    coumnKontQuantity   :'Ilość<br/>kontenerów',
    btnFilter           :'Filtr',
    btnChoose           :'Wybierać'
});

Ext.define("TK.locale.pl.view.ky2.avto.DotpQuestionAvto", {
    override:"TK.view.ky2.avto.DotpQuestionAvto",

    title               :'Utwórz samochód według wyjazdu z określoną datą?',
    lblDeartureTime     :'Data odjazdu',
    txtYes              :'Tak',
    txtNo               :'Nie'
});

Ext.define("TK.locale.pl.view.ky2.ClientTrainAvtoFilter", {
    override:"TK.view.ky2.ClientTrainAvtoFilter",

    title               :'Filter Clients/Trains/Trucks',
    panelClients        :'Clients',
    clmnClient          :'Client',
    panelTrains        :'Train',
    clmnTrNum           :'Train №',
    btnFilter           :'Filter',
    btnCancel           :'Cancel',
    ckeckByTruck        :'Przybył samochodem'
});

Ext.define("TK.locale.pl.view.stamp.StampList", {
    override:"TK.view.stamp.StampList",

    title               :'pieczęći',
    hdrTrans           :'Grupa',
    hdrdescr           :'Opis',
    hdrCodePer         :'Kod przewoźnika',
    hdrAltered         :'Zmieniony',
    hdrDattr           :'Utworzono'
});

Ext.define("TK.locale.pl.view.stamp.StampForm", {
    override:"TK.view.stamp.StampForm",

    title               :'Pieczęć',
    mainTitle           :'Ogólne',
    hdrdescr           :'Opis',
    labelllx              :'X lewy dolny róg na pustym miejscu',
    labellly              :'Y lewy dolny róg na pustym miejscu',
    labelurx              :'Y prawy górny róg na pustym miejscu',
    labelury              :'Y prawy górny róg na pustym miejscu',
    labelCodePer         :'Kod przewoźnika',
    bordersTitle         :'Ramki',
    hdrBorder           :'Grubość',
    hdrColor            :'Kolor',
    hdrRadius           :'Promień',
    btnAdd              :'Dodaj',
    btnEdit             :'Edytować',
    btnDel              :'Usunąć',
    imgTitle            :'Zdjęcia',
    txtTitle            :'Teksty',
    hdrText             :'Tekst',
    hdrfontFamily       :'Czcionka',
    hdrFontSize         :'Rozmiar<br>czcionki',
    hdrLeading          :'Odstępy<br>między<br>wierszami',
    hdrBold             :'Pogrubienie',
    hdrItalic           :'Kursywa',
    hdrRotate           :'Obrócony',
    hdrTabular          :'Wcięcie',
    hdrUnderline        :'Podkreślone',
    hdrUppercase        :'Duże litery',
    hdrName             :'Nazwa',
    hdrMask             :'Maska',
    btnSaveExit         :'Zapisz i wyjdź',
    btnSave             :'Zapisz',
    btnPreView          :'Preview',
    btnExit             :'Zamknij'
});

Ext.define("TK.locale.pl.view.stamp.StampBorderForm", {
    override:"TK.view.stamp.StampBorderForm",

    title               :'Pieczęć',
    lblBorderThick      :'Grubość',
    labelrllx           :'Lewy dolny róg względem stempla X',
    labelrlly           :'Lewy dolny róg względem stempla Y',
    labelrurx           :'Prawy górny róg względem stempla X',
    labelrury           :'Prawy górny róg względem stempla Y',
    labelRadius         :'Promień',
    labelColor          :'Kolor',
    btnSave             :'Zapisz',
    btnExit             :'Zamknij'
});

Ext.define("TK.locale.pl.view.stamp.StampTxtForm", {
    override:"TK.view.stamp.StampTxtForm",

    title               :'Tekst',
    labelrllx           :'Lewy dolny róg względem stempla X',
    labelrlly           :'Lewy dolny róg względem stempla Y',
    labelrurx           :'Prawy górny róg względem stempla X',
    labelrury           :'Prawy górny róg względem stempla Y',
    labelFont           :'Czcionka',
    labelFontSize         :'Rozmiar czcionki',
    labelLeading          :'Odstępy między wierszami',
    labelRotate           :'Obrócony',
    labelColor          :'Kolor',
    labelBold             :'Pogrubienie',
    labelItalic           :'Kursywa',
    labelTabular          :'Wcięcie',
    labelUnderline        :'Podkreślone',
    labelUppercase        :'Duże litery',
    labelName             :'Nazwa',
    labelMask             :'Maska',
    btnSave             :'Zapisz',
    btnExit             :'Zamknij'
});

Ext.define("TK.locale.pl.view.stamp.StampPictureForm", {
    override:"TK.view.stamp.StampPictureForm",

    title               :'Zdjęcie',
    labelrllx           :'Lewy dolny róg względem stempla X',
    labelrlly           :'Lewy dolny róg względem stempla Y',
    labelrurx           :'Prawy górny róg względem stempla X',
    labelrury           :'Prawy górny róg względem stempla Y',
    labelDescr          :'Opis',
    labelImgFile        :'Plik graficzny',
    btnSave             :'Zapisz',
    btnExit             :'Zamknij'
});

Ext.define("TK.locale.pl.controller.print.PrintStamps", {
    override:"TK.controller.print.PrintStamps",

    delTitle: 'Usuń ...',
    delMsg: 'Czy na pewno chcesz usunąć ..?',
    uploadtitle          :'Załaduj zdjęcie jpeg,jpg,png 64k',
    labelPic            :'Zdjęcie',
    btnUpload           :'Załaduj',
    btnSelectPic        :'Wybierz zdjęcie'
});

Ext.define("TK.locale.pl.view.messanger.Messanger", {
    override:"TK.view.messanger.Messanger",

    title               :'Komunikator',
    labelMsg            :'Wiadomość',
    btnSend             :'Wysłać',
    btnRefresh          :'Odświeżać',
    btnClose            :'Zamknij',
    chkOnMail           :'Na pocztu',
    panelUsrs           :'Użytkownicy'
});

Ext.define("TK.locale.pl.controller.ky2.BindAvtoAndYardController", {
    override:"TK.controller.ky2.BindAvtoAndYardController",

    titleUploadXls      :'Przesyłać XLS',
    emtyTxtFile         :'Wybierz plik do przesłania...',
    labelFile           :'Plik',
    btnChoose           :'Wybierz...',
    btnUpload           :'Przesyłać',
    msgUploading        :'Przesyłanie',
    btnClose            :'Zamknij',
    titleWarn           :'Ostrzeżenie',
    msgCont1            :'Znaleziono kontenerów: ',
    msgCont2            :'<br>Nic nie znaleziono: ',
    msgNoContOnCar      :'Brak kontenera na samochodzie',
    msgContisOnyard     :'Kontener jest już na placu kontenerowym. Sektor ',
    msgAvtoByDepCreated :'Utworzono samochód przyjazdem',
    titleOnYard         :'+ na plac kontenerowy',
    titleyard           :'Plac kontenerowy '
});

Ext.define("TK.locale.pl.controller.ky2.YardCtGrController", {
    override:"TK.controller.ky2.YardCtGrController",

    titleWarn           :'Ostrzeżenie',
    msgNoFreePlaces     :'Sektor jest pełny',
    titleEditKont       :'Edytuj kontener',
    titleDel            :'Kasowanie...',
    msgDel              :'Czy na pewno chcesz usunąć ..?',
    errMsg1             :'Brak daty przyjazdu <br>',
    errMsg2             :'Brak czasu przyjazdu  <br>',
    errMsg3             :'Brak klienta  <br>',
    errMsg4             :'Brak numera kontenera ',
    msgNoKont           :'Brak kontenera',
    msgError            :'Błąd...',
    titleCreateKont     :'Utwórzenie kontenera'
});

Ext.define("TK.locale.pl.view.ky2.YardCtGrTreeForm", {
    override:"TK.view.ky2.YardCtGrTreeForm",

    title               :'Kontener',
    lblSector           :'Sektor',
    lblKontN            :'№ kontenera',
    lblOtprN            :'№ przesyłki',
    lblArrival          :'Przyjazd',
    lblDate             :'Data',
    lblTime             :'Czas',
    lblOrderN           :'№ zamówienia',
    lblDeparture        :'Odjazd',
    lblEmpty            :'Pusty',
    lblBrutto           :'Ładunek brutto,kg',
    lblMasTara          :'Tara, waga,kg',
    lblTotalBrutto      :'Całkowity brutto,kg',
    lblMaxWeight        :'Max. ładunek,t',
    lblSize             :'Rozmiar',
    lblType             :'Typ',
    lblClient           :'Klient',
    lblNotes            :'Notatki',
    lblCodeGng          :'Cod NHM',
    lblnameGng          :'Nazwa NHM',
    lblPackege          :'Rodzaj opakowania',
    lblPlaces           :'Miejsca',
    lblWeight           :'Waga',
    lblPlomb            :'Plomba',
    lblSealingStation   :'Stacja uszczelniająca',
    lblQuantity         :'Ilość',
    btnAddCargo         :'+ Ładunek',
    btnAddPlomb         :'+ Plomba',
    titleCargo          :'Ładunek'
});


Ext.define("TK.locale.pl.view.ky2.yard.ChangeClient", {
    override:"TK.view.ky2.yard.ChangeClient",

    title               :'Zmień klienta',
    lblDateFrom         :'Data, z',
    lbltimeFrom         :'Czas, do',
    lblClient           :'Klient',
    btnChangeCl         :'Zmień klienta',
    btnClose            :'Zamknij'
});

Ext.define("Ext.locale.pl.form.VTypes", {
    override:"Ext.form.VTypes",

    msgInvalidFsize     :'Rozmiar pliku powinien być mniejszy niż ',
    msgInvalidFType     :'Typ pliku powinien być w '
});

Ext.define("TK.locale.pl.view.ky2.client.Filter", {
    override:"TK.view.ky2.client.Filter",

    title                   :'Filtr',
    lblArrivalFrom          :'Przyjazd, od',
    lblArrivalTo            :'Przyjazd, do',
    lblContainer            :'Kontener',
    lblPlace                :'Umieszczenie',
    lblAll                  :'Wszystko',
    lblVagon                :'Vagon',
    lblTruck                :'Samochód',
    lblDaysQuantity         :'Ilość dni',
    btnFilter               :'Filtr',
    btnClear                :'Oczyścić',
    btnClose                :'Zamknij'
});
