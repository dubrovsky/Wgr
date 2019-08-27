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
 * Russian translation
 *
 * By ZooKeeper (utf-8 encoding)
 *
 * 6 November 2007
*/
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

        Ext.Date.shortMonthNames = ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[month];
        };



        Ext.Date.monthNumbers = {
            'Jan': 0,
            'Feb': 1,
            'März': 2,
            'Apr': 3,
            'Mai': 4,
            'Jun': 5,
            'Jul': 6,
            'Aug': 7,
            'Sept': 8,
            'Okt': 9,
            'Nov': 10,
            'Dez': 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }


    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: '.',
            currencySign: '\u0440\u0443\u0431',
            // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.de.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.de.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: '{0} ausgewählte Zeilen'
});

Ext.define("Ext.locale.de.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: 'Diesen Register schließen'
});

Ext.define("Ext.locale.de.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: 'Der Wert in diesem Feld ist falsch'
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.de.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: 'Ladevorgang...'
});

Ext.define("Ext.locale.de.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "heute",
    minText: "dieses Datum ist früher als das minimale Datum",
    maxText: "dieses Datum ist später des maximalen Datums",
    disabledDaysText: "nicht verfügbar",
    disabledDatesText: "nicht verfügbar",
    nextText: 'folgender Monat (Control+rechts)',
    prevText: 'vorhergehender Monat (Control+links)',
    monthYearText: ' Monatsauswahl( nach oben/nach unten zwecks Jahresauswahl)',
    todayTip: "{0} (Lehrzeichen)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.de.picker.Month", {
    override: "Ext.picker.Month",
    okText: '&#160;OK&#160;',
    cancelText: 'Abbrechen'
});

Ext.define("Ext.locale.de.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: 'Seite',
    afterPageText: 'aus{0}',
    firstText: 'Erste Seite',
    prevText: 'Vorhergehende Seite',
    nextText: 'Nächste Seite',
    lastText: 'Letzte Seite',
    refreshText: 'Aktualisieren',
    displayMsg: 'Die Einträge von {0} - {1} bis {2}',
    emptyMsg: 'Keine Daten für Anzeige '
});

Ext.define("Ext.locale.de.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: 'Mindestlänge dieses Feldes {0}',
    maxLengthText: 'Maximallänge dieses Feldes {0}',
    blankText: 'Dieses Feld ist auszufüllen ',
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.de.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: 'Der Wert in diesem Feld dart nicht geringer sein {0}',
    maxText: 'Der Wert in diesem Feld dart nicht gröβer sein {0}',
    nanText: '{0} ist keine Zahl',
    negativeText: 'Der Wert darf nicht negativ sein'
});

Ext.define("Ext.locale.de.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: 'Nicht verfügbar',
    disabledDatesText: 'Nicht verfügbar',
    minText: 'Ein späteres Datum in diesem Feld wählen {0}',
    maxText: 'Ein früheres Datum  in diesem Feld wählen {0}',
    invalidText: '{0} Falsches Datum - das Datum ist im Format {1} anzugeben',
    format: 'd.m.y',
    altFormats: 'd.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d'
});

Ext.define("Ext.locale.de.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: 'undefined',
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: 'Ladevorgang...'
    });
});

Ext.define("Ext.locale.de.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Dieses Feld hat die E-Mail Adresse im Format zu enthalten "user@example.com"',
    urlText: 'Dieses Feld hat eine URL im Format zu enthalten "http:/' + '/www.example.com"',
    alphaText: 'Dieses Feld hat nur lateinischen Buchstaben und einen Unterstrich zu  enthalten _',
    alphanumText: 'Dieses Feld hat nur lateinischen Buchstaben, Zahlen und einen Unterstrich zu enthalten _'
});

Ext.define("Ext.locale.de.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Bitte, die Adresse eingeben:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Halbfett (Ctrl+B)',
                text: 'Verwendung einer halbfetten Schrift in Bezug auf den markierten Text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Kursivschrift (Ctrl+I)',
                text: 'Verwendung einer Kursivschrift in Bezug auf den markierten Text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Unterstrichen (Ctrl+U)',
                text: 'Den markierten Text unterstreichen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Vergrößern',
                text: 'Schriftzeichen vergrößern.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Verkleinern',
                text: 'Schriftzeichen verkleinern.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Grundfarbe',
                text: 'Veränderung der Hintergrundfarbe für den markierten Text oder Absatz.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Textfarbe',
                text: ' Textfarbenveränderung.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Text am linken Rand ausrichten',
                text: ' Textausrichtung  am linken Rand.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Mittig ',
                text: 'Mittige Textausrichtung.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Text am rechten Rand ausrichten',
                text: 'Textausrichtung  am rechten  Rand.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Marker',
                text: 'Eine markierte Liste starten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Nummerierung',
                text: 'Eine nummerierte Liste starten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink  einfügen',
                text: 'Einen Link aus dem markierten Text herstellen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Quellcode',
                text: 'Auf den Quellcode umschalten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.de.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: 'Bitte warten...'
});

Ext.define("Ext.locale.de.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: 'Ansteigend sortieren',
    sortDescText: 'Absteigend sortieren',
    lockText: 'Spalte sichern',
    unlockText: 'Spalte freigeben',
    columnsText: 'Spalten'
});

Ext.define("Ext.locale.de.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Leer)',
    groupByText: 'Entsprechend diesem Feld gruppieren',
    showGroupsText: 'Den Gruppen nach anzeigen '
});

Ext.define("Ext.locale.de.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: 'Bezeichnung',
    valueText: 'Der Wert',
    dateFormat: 'd.m.Y',
    trueText: "true",
    falseText: "false"
});

Ext.define("Ext.locale.en.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("Ext.locale.en.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("Ext.locale.en.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'm/d/Y'
});

Ext.define("Ext.locale.en.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "The time in this field must be equal to or after {0}",
    maxText: "The time in this field must be equal to or before {0}",
    invalidText: "{0} is not a valid time",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.en.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "You must select at least one item in this group"
});

Ext.define("Ext.locale.en.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "You must select one item in this group"
});

Ext.define("Ext.locale.de.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: 'OK',
        cancel: 'Abbrechen',
        yes: 'Ja',
        no: 'Nein'
    }
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.de.Component", {
    override: "Ext.Component",
    titleDelMsgBox: 'Eintragung löschen?',
    textDelMsgBox: 'Der Eintragung wird gelöscht',
    titleEditWindow: 'Eintragung editieren',
    titleAddWindow: 'Ergänzung hinzufügen',
});

//////////////////////////////////
// TK Portal lacale costants  ////
/////////////////////////////////

Ext.define("TK.locale.de.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'Portal der TransContainer OAG',
    headerUser: 'Der Benutzer',
    headerLangLbl: 'Sprache wählen'
});

Ext.define("TK.locale.de.view.MenuTree", {
    override    :"TK.view.MenuTree",
    title       :'Menü',
    treeUsers   :'Die Benutzer',
    treeGroups  :'Groups',
    treeProjects:'Die Projekte',
    treeLogs    :'Logs',
    btnStat     :"Statistik",
    btnPrnTmpl  :"Druckvorlagen",
    treeDirs    :'Directorys',
    treeInstr   :'Anweisung',
    treeChangePw:'Password change',
    treeExit    :'Escape',
    epd         :'EPD',
    smgs	    :'SMGS',
    invoicelist :'Invoice',
    aviso	    :'Templates SMGS for CKP',
    cimsmgs	    :'CIM/SMGS',
    aviso1	    :'Templates SMGS for agents',
    slovnakl    :'Slovak waybill',
    smgs2	    :'SMGS2',
    aviso2	    :'Templates SMGS2',
    gu29k	    :'GU-29k',
    doplist	    :'Extra sheet',
    filesmgs    :'Graphics SMGS',
    filegu29k   :'Graphics GU',
    fileaviso   :'Graphics Templates SMGS',
    fileinvoice :'Graphics Invoice',
    filecimsmgs :'Graphics ЦИМ/СМГС',
    avisogu29k  :'Инструкция GU for CKP',
    cim         :'CIM',
    avisocim    :'Templates CIM',
    files       :'Other documents',
    cmr         :'CMR',
    fileavisogu29k:'Graphics Templates GU',
    gu27v       :'GU-27v',
    avisogu29k1 :'Templates GU for agents',
    avisocimsmgs:'Templates CIM/SMGS',
    ved         :'Wagon and transfer list',
    btnKontYards  :"Сontainers' yard",
    btnKontYard    :'Containers\' storage and location',
    btnKontPoezdIn    :'Train\'s arrival',
    btnKontPoezdOut    :'Train\'s departure',
    btnKontReports    :'Reports',

    kyreport1: 'Report 1',
    kyreport2: 'Report 2',
    kyreport3: 'Report 3',
    kyreport4: 'Report 4',
    kyreport5: 'Report 5',
    kyreport6: 'Report 6'
});

Ext.define("TK.locale.de.stat.List", {
    override    :"TK.view.stat.List",
    title       :'Statistik'
});

Ext.define("TK.locale.de.view.DocsList", {
    override:"TK.view.DocsList",

    btnStat: 'Statistik',
    btnRestore: 'Wiederherstellen',
    btnDestroy: 'Dauerhaft löschen',
    btnPrint: 'PDF-Ausdruck',
    btnPrintView: 'PDF- Durchsicht',
    btnCreate  :'Erstellen',
    btnCopy    :'Kopie',
    btnCopyAviso: 'Копировать в шаблон',
    btnCopySelect: 'Kopie, wählen...',
    btnEdit    :'Editieren',
    btnDelete  :'Löschen',
    btnMakeSmgs: 'SMGS erstellen',
    btnMakeCimSmgs: 'CIM/SMGS erstellen ',
    btnAppend2Smgs: 'In die SMGS einsetzen',
    btnAppend2CimSmgs: 'In die CIM/SMGS einsetzen',
    btnMakeGU  :'GU erstellen',
    btnDownload: 'Hochladen',
    btnHistory: 'Geschichte',
    btnBindPrint :'Ausdruck anbinden',
    btnSelectPrint :'Muster auswählen',
    btnExch    :'Austausch',
    btnExchTBC: 'TBC',
    btnExchBCh1:'Zum Editieren öffnen / schließen',
    btnExchBCh: 'BCH',
    btnExchFTS :'FTS',
    btnExchBTLC :'BTLC',
    btnExchTdgFTS:'TDG',
    btnReports :'Berichte',
    btnView    :'Durchsehen',

    btnCont: 'Konteiner',
    btnVag: 'Wagenweise',
    btnContsList: 'Wagen/Konteinerliste',
    btnSmgs: 'Smgs',

    btnDopList :'Zusatzblatt',
    btnUploadCSDocs9: 'Absender der Unterlagen.',
    btnUploadPogruzList: 'Beladungsliste',
    btnUploadPogruzListPoezd: 'Zugfrachtliste',
    btnContsList1 :'Liste',

    btnPlusDocs: '+ Unterlagen',
    btnPlusSmgsInv :'SMGS und Rechnungen',
    btnPlusInv :'+ Rechnungen',

    lableDeleted: 'Gelöschte?',

    headerID          :'ID',
    headerProject: 'Das Projekt',
    headerRoute          :'Route',
    headerDoc: 'Unterlage',
    headerCreation    :'Erstellung',
    headerDateTime    :'Datum und Zeit',
    headerUser: 'Der Benutzer',
    headerSenderName: 'Bezeichnung des Absenders <br/>',
    headerReceiverName: 'Empfängerbezeichnung <br/>',
    headerContNum: 'Konteinernummer <br/> ',
    headerDescr       :'Beschreibung',
    headerInv           :'Rechnungen',
    headerNPoezd: 'Zug<br/>nummer',
    headerVagNum: 'Wagennummer <br/>',
    headerFileName    :'Dateiname',
    headerContentType: 'Inhaltstyp<br/>',
    headerSizeByte    :'Größe, Byte',

    warnTitle:'Warnung',
    warnMsg: 'Eine Zeile aus der Datentabelle ist auszuwählen',

    txtForApproval: 'Zur Abstimmung ',
    txtApproved:'Vereinbart ',
    txtWork:'in Arbeit',
    txtNotApproved:'Nicht vereinbart',
    txtBlocked:'Gesperrt',
    headerStatus  :'Status',
    headerName: 'Bezeichnung der<br/>Anleitung',
    headerInstrNum: 'Einweisungsnummer',
    headerGNG: 'GNG',
    headerComments:'Bemerkungen',

    statusBlocked  :'Gesperrt',
    status4Approval: 'Zur Abstimmung ',
    statusAgreed: 'Vereinbart',
    statusNotAgreed:'Nicht vereinbart'
});

Ext.define("TK.locale.de.view.avisocim.AvisoCimList", {
    override      :"TK.view.avisocim.AvisoCimList",
    title: 'CIM-Anweisungsheft'
});

Ext.define("TK.locale.de.view.aviso2.AvisoSmgs2List", {
    override      :"TK.view.aviso2.AvisoSmgs2List",
    title: 'SMGS2 Anweisungsheft'
});

Ext.define("TK.locale.de.view.aviso.List", {
    override:"TK.view.aviso.List",

   title: 'SMGS template register'
});

Ext.define("TK.locale.de.view.avisocimsmgs.AvisoCimSmgsList", {
    override:"TK.view.avisocimsmgs.AvisoCimSmgsList",

    title: 'CIM/SMGS-Anweisungsheft',
});

Ext.define("TK.locale.de.view.avisogu29k.List", {
    override:"TK.view.avisogu29k.List",

    headerStatus  :'Status',
    headerInstrNum:'Anweisungsheft',
    headerGNG     :'NHM',

    statusBlocked  :'Gesperrt',
    status4Approval:'Zur Vereinbarung',
    statusAgreed   :'Vereinbart',
    statusNotAgreed:'Nicht vereinbart',

    title:'GU-Anweisungsheft'

});

Ext.define("TK.locale.de.view.cim.CimList", {
    override :"TK.view.cim.CimList",

    headerCim:'CIM',
    title: 'CIM-Heft',
    menuTrSearch  :'Filter train'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsList", {
    override        :"TK.view.cimsmgs.CimSmgsList",
    
    title: 'CIM/SMGS-Heft',
    headerCimsmgs: 'Versandnummer',
    headerDateTransp: 'Abfertigungsdatum',
    headerExchBch   :'Iftmin',
    menuTrSearch: 'Поиск поезда'
});

Ext.define("TK.locale.de.view.cmr.List", {
    override        :"TK.view.cmr.List",

    headerDateTransp: 'Beförderungsdatum.',
    headerCMR       :'CMR',
    title           :'CMR-Heft'
});

Ext.define("TK.locale.de.view.slovnakl.List", {
    override        :"TK.view.slovnakl.List",

    headerSlov       :'Slowakischer Frachtbrief',
    title           :'Heft slowakischer Frachtbriefe'
});

Ext.define("TK.locale.de.view.epd.List", {
    override:"TK.view.epd.List",
    
    title   :'EPD-Heft'
});

Ext.define("TK.locale.de.view.gu27v.List", {
    override        :"TK.view.gu27v.List",

    headerGu27v     :'GU-27v',
    headerDateTransp: 'Beförderungsdatum.',
    headerAvisoNum  :'Avisonummer',
    title           :'GU-Heft'
});

Ext.define("TK.locale.de.view.gu29k.List", {
    override        :"TK.view.gu29k.List",

    headerGu29k     :'GU-29k',
    headerDateTransp: 'Beförderungsdatum.',
    headerAvisoNum  :'Avisonummer',
    title           :'GU-Heft'
});

Ext.define("TK.locale.de.view.invoice.List", {
    override:"TK.view.invoice.List",

    title   :'Rechnungsheft',
    headerNum: 'Rechnungsnummer',
    headerNumOtpr: 'Versendungsnummer',
    headerNumCont: 'Konteinernummer',
    headerDateOtpr: 'Abfertigungsdatum'
});

Ext.define("TK.locale.de.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'SMGS-Heft',
    headerSmgs    :'SMGS',
    headerExchTBC :'TBC',
    headerExchBch :'Iftmin',
    headerAvisoNum:'Avisonummer'
});

Ext.define("TK.locale.de.view.smgs2.Smgs2List", {
    override      :"TK.view.smgs2.Smgs2List",
    title         :'SMGS-Heft',
    headerSmgs    :'SMGS',
    headerExchTBC :'TBC',
    headerExchBch :'Iftmin',
    headerAvisoNum:'Avisonummer',
    headerVagVed: 'Wagenliste',
    titleVagVed: 'Liste',
    menuTrSearch  :'Filter train'
});

Ext.define("TK.locale.de.view.file.List", {
    override:"TK.view.file.List",
    title   :'Graphikheft',
    headerNumOtpr: 'Versendungsnummer',
    headerNumCont: 'Konteinernummer',
    headerDateOtpr: 'Abfertigungsdatum'
});

Ext.define("TK.locale.de.view.logs.List", {
    override    :"TK.view.logs.List",
    title: 'Portallogin',
    headerDate  :'Datum',
    headerUser: 'Der Benutzer',
    headerHost  :'Host',
    headerAgent :'Ausführungsumfeld',
    headerLog   :'Log',
    headerThread: 'Strom',
    headerFile  :'Datei',
    headerMethod:'Verfahren',
    btnFilter   :'Filter'
});

Ext.define("TK.locale.de.view.project.List", {
    override    :"TK.view.project.List",
    title       :'Projektauflistung',
    headerName  :'Bezeichnung',
    headerGroups:'Gruppen',
    headerRoutes:'Routen',
    btnCreate   :'Erstellen',
    btnEdit     :'Editieren',
    btnDelete   :'Löschen ',
    delMsg1: 'Löschung...',
    delMsg2     :'Wollen Sie das laufende Projekt tatsächlich löschen?'
});

Ext.define("TK.locale.de.view.printtmpl.List", {
    override    :"TK.view.printtmpl.List",
    title       :'Druckvorlagenliste',
    headerName  :'Bezeichnung',
    headerRoutes:'Route',
    headerDefault:'Als Default-Wert?',
    headerBlank: 'Mit Formblatt?',

    btnBindToRoute: 'An die Route anbinden',
    btnBindToBlank: 'Am Formblatt anbinden',
    btnBlanks: 'Formblätter'
});

Ext.define("TK.locale.de.view.printtmpl.Form", {
    override    :"TK.view.printtmpl.Form",
    title       :'Druckvorlage',
    btnSave       :'Speichern',
    btnSaveExit   :'Speichern und EXIT',
    btnClose      :'Schließen',

    fieldLabelName: 'Bezeichnung',
    fieldLabelDef: 'Als Default-Wert',
    fieldLabelPageSize: 'Papierabmessungen, mm',
    fieldLabelWidth: 'Breite',
    fieldLabelHeight: 'Höhe',
    fieldLabelFont: 'Schrift als Default-Wert für die gesamte Unterlage',
    fieldLabelFontName: 'Bezeichnung',
    fieldLabelFontSize: 'Abmessung',
    fieldLabelFontSpace: 'Zeilenabstand',
    fieldLabelSyncXY: 'Die Veränderungen nach X oder Y  synchronisieren',
    fieldLabelMoveHor: 'Alles waagerecht verschieben, mm',
    fieldLabelMoveVert: 'Alles senkrecht verschieben, mm',
    titleData: 'Daten'
});

Ext.define("TK.locale.de.view.user.List", {
    override      :"TK.view.user.List",
    title         :'Benutzerliste',
    headerUn      :'Login',
    headerName    :'Name',
    headerGroup   :'Gruppe',
    headerGroups  :'Zusatzgruppen',
    headerPrivileg:'Vorrechte',
    headerLocked  :'Abgeschaltet?',
    headerSu      :'Verwalter?',
    headerEmail   :'E-mail',
    btnCreate     :'Erstellen',
    btnEdit: 'Editieren',
    btnCopy       :'Kopieren',
    btnRefresh    :'Aktualisieren',

    textYes: 'Ja',
    textNo: 'Nein'
});

Ext.define("TK.locale.de.view.user.ListGroups", {
    override   :"TK.view.user.ListGroups",
    title: 'Benutzerliste',
    headerName :'Name',
    headerDescr:'Beschreibung',
    btnSelect  :'Wählen',
    btnAdd     :'Ergänzen',
    btnEdit    :'Editieren',
    btnRefresh :'Aktualisieren',
    btnClose   :'Schließen'
});

Ext.define("TK.locale.de.view.user.ListPrivs", {
    override   :"TK.view.user.ListPrivs",
    title: 'Benutzerliste',
    headerName :'Name',
    headerDescr:'Beschreibung',
    btnSelect  :'Wählen',
    btnRefresh :'Aktualisieren',
    btnClose   :'Schließen'
});

Ext.define("TK.locale.de.view.user.Form", {
    override       :"TK.view.user.Form",
    title          :'Editor',
    labelLogin     :'Login<span class="x-required">*</span>',
    labelLogin1: 'Login',
    labelPass: 'Passwort<span class="x-required">*</span>',
    labelPass1     :'Passwortbestätigung<span class="x-required">*</span>',
    labelPass2: 'Neues Passwort',
    labelFIO       :'Name  (Nach-, Vor- und Vatersname)',
    labelEmail     :'E-mail',
    labelLocked    :'Abgeschaltet?',
    labelSu        :'Verwalter?',
    labelGroup     :'Gruppe<span class="x-required">*</span>',
    labelGroups    :'Zusatzgruppen',
    labelPrivs     :'Vorrechte',
    btnSave        :'Speichern',
    btnClose       :'Schließen',
    vTypeLabelPass :'Die Passwörter stimmen nicht überein, dieses Feld kann nur Buchstaben, Zahlen und _ enthalten',
    vTypeLabelLogin:'Ein Benutzer mit solchem Login existiert bereits, dieses Feld kann nur Buchstaben,  Zahlen und _ enthalten'
});

Ext.define("TK.locale.de.view.user.FormGroups", {
    override    :"TK.view.user.FormGroups",
    title       :'Editor',
    vTypeLabelGr: 'Eine Gruppe mit solchem Namen existiert bereits, dieses Feld darf nur Buchstaben,  Zahlen und _ enthalten',
    labelName   :'Name<span class="x-required">*</span>',
    labelName1: 'Name',
    labelDescr  :'Beschreibung',
    btnSave     :'Speichern',
    btnClose    :'Schließen'
});

Ext.define("TK.locale.de.view.project.Form", {
    override        :"TK.view.project.Form",
    title           :'Projekt editieren',
    btnSave         :'Speichern',
    btnSaveExit     :'Speichern und EXIT',
    btnClose        :'Schließen',
    btnSelect       :'Wählen',
    labelProjectName:'Bezeichnung',
    labelGroups     :'Gruppen',
    labelRoutes     :'Routen',
    labelSelected   :'Ausgewählte',
    labelAvailable  :'Verfügbar',
    headerName      :'Bezeichnung',
    headerDescr     :'Beschreibung',
    saveMsg: 'Daten werden gespeichert'
});

Ext.define("TK.locale.de.view.edit.DetailGrid", {
    override :"TK.view.edit.DetailGrid",
    btnAdd: 'Ergänzen',
    btnDelete: 'Löschen',
    btnCopy: 'Kopieren',
    btnOk    :'Ok',

    headerName         :'Bezeichnung',
    headerRoutesGr     :'Gruppen',
    headerRoutesDocs: 'Unterlagen',
    headerRoutesCodeTbc: 'TBC-Kode',
    headerRoutesCodeCustoms: 'Zollamtkode',
    headerRoutesEmailMask: 'E-mail, Maske',
    headerRoutesForDeleted: 'Für gelöschte?',
    headerContNum      :'Nummer',
    headerContSize: 'Abmessung',
    headerContVid: 'Art',
    headerContNum1     :'Nummer',
    headerContSize1: 'Abmessung',
    headerContVid1: 'Art',
    headerCodeTNVED    :'HS-Code',
    headerPack: 'Verpackung',
    headerPackVid: 'Art',
    headerPackKod: 'Kode',
    headerGoodsDescr   :'Warenbeschreibung',
    headerPackage      :'Verpackungsart',
    headerPackNum      :'Anzahl von Verpackungen/Kolli',
    headerBrutto: 'Brutto (kg)',
    headerNetto: 'Netto (kg)',
    headerQuantity     :'Anzahl',
    headerProdUnit     :'Warenmesseinheit',
    headerProdPrice    :'Wareneinheitspreis',
    headerTotalValue   :'Gesamtwert',
    headerType         :'Typ',
    headerTotal: 'Gesamt',

    titleColumn: 'Spalte',
    titleDesc: 'Beschreibung',
    titleCoordLeft: 'Koordinaten des  unteren linken Winkels, mm',
    titleCoordRight: 'Koordinaten des oberen rechten Winkels, mm',
    titleColumnFont: 'Schrift einer bestimmten Spalte',
    titleColumnFontName: 'Bezeichnung',
    titleColumnFontSize: 'Abmessung',
    titleColumnFontBold: 'Fett?',
    titleColumnFontUpper: ' Großbuchstaben?',
    titleColumnFontSpace: 'Zeilenabstand',
    titleRotate: 'Drehung',
    titleBorder: 'Grenze?',
    titleStroke: 'Unterstreichen?',
    titlePage: 'Seite',
    titlePrint: 'Ausdrucken?',
    titleTable: 'Tabelle?',
    titlePhrases: 'Sätze?'
});

Ext.define("TK.locale.de.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    errorTitle: 'Fehler',
    errorMsgValid: 'Richtigkeit der Felderausfüllung prüfen',
    btnSave :'Speichern',
    btnClose:'Schließen',
    labelSender     :'Der Absender',
    labelName       :'Bezeichnung',
    labelName1: 'Bezeichnung',
    labelNameEu     :'EU-Bezeichnung',
    labelNameRu: 'Bezeichnung (rus)',
    labelNameCh: 'Bezeichnung (China)',
    labelDate       :'Datum',
    labelTotal: 'Anzahl',
    labelCountry    :'Land',
    labelCountryRu: 'Land (rus)',
    labelCountryCode: 'Landeskode',
    labelZip        :'Index',
    labelCity       :'Stadt',
    labelCityRu: 'Stadt (rus)',
    labelAdress     :'Anschrift',
    labelAdressRu: 'Anschrift (rus)',
    labelOptInfo: 'Weitere Info',
    labelSenderCod: 'Absender Kode',
    labelReceiverCod: 'Empfängerkode',
    labelReceiver: 'Empfänger',
});

Ext.define("TK.locale.de.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'Ergänzen',
    btnDelete:'Löschen'
});

Ext.define("TK.locale.de.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",

    labelName1      :'Bezeichnung',
    labelWagons: 'Die Wagen',
    labelWagonNum     :'Wagennummer',
    labelWagonsTonnage: 'Tonnage, t',
    labelWagonsTara: 'Verpackung ,t',
    labelWagonsAxes   :'Achsen',
    labelConts: 'Die Konteiner',
    labelSize    :'Abmessung',
    labelSizeMm  :'Abmessung, mm',
    labelTaraCont: 'Verpackung, Gewicht',
    labelNotes: 'Text vor der Konteinernummer',
    labelCategory: 'Gattung',
    labelContNum: 'Konteinernummer',
    labelDescr   :'Beschreibung',
    labelVid: 'Art',
    labelCargo    :'Fracht',
    labelNetto    :'Netto',
    labelTara     :'Verpackung',
    labelBrutto   :'Brutto',
    labelCodeGng: 'GNG -Kode',
    labelNameRuGng: 'Bezeichnung (rus)',
    labelNameChGng:'Bezeichnung (China)',
    labelCodeEtsng: 'ET GUS-Kode',
    labelNameEtsng:'Bezeichnung',
    labelMassa    :'Gewicht, kg',
    labelMesta    :'Kollis',
    labelPack: 'Verpackung (rus)',
    labelPackForeign:'Verpackung',

    labelWagonsGiven: 'Der Wagen  ist berietgestellt',
    labelWagonsOwner: 'Wageninhaber',
    labelWagonsKind: 'Wagenart',

    labelContSize: 'Typabmessung',
    labelMaxLoad: 'Maximale Lastfähigkeit, t',

    labelNameRu: 'Bezeichnung (rus)',
    labelName: 'Bezeichnung',
    labelCode: 'Kode',
    labelOON: 'UN',
    labelClass: 'Klasse',
    labelZnak: 'Zeichen',
    labelGrUpak: 'Verpackungsgruppe',
    labelAvKart: 'Unfallmerkblattnummer',
    labelStamp: 'Stamp',
    labelDopInf: 'Weitere Info'
});


Ext.define("TK.locale.de.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Zollcode',
    labelTextRu: 'Text (rus)',
    labelText: 'Text',
    labelDocNum: 'Unterlagennummer',
    labelDate: 'Datum',
    labelTotal: 'Anzahl'
});

Ext.define("TK.locale.de.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plombe',
    labelTotal: 'Anzahl'
});

Ext.define("TK.locale.de.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",
    labelOtprName:'Bezeichnung',
    labelOtprNameRu: 'Bezeichnung (rus)',
    labelCountry:'Land',
    labelCountryRu:'Land (russ)',
    labelCountryCode: 'Landeskode',
    labelEmail:'E-mail',
    labelPhone:'Telefon',
    labelFax: 'Fax',
    labelCity:'Stadt',
    labelCityRu: 'Stadt (rus)',
    labelAdress:'Anschrift',
    labelAdressRu: 'Anschrift, rus',
    labelZip:'Index',
    labelVat:'VAT',
    labelSenRecCode: 'Absender / Empfänger-Kode',
    labelCliCode: 'Kundenkode',
    labelNNcode: 'StIdNr -Kode',
    labelDopInfo: 'Weitere Infos.',
    labelOKPO: 'OKPO-Kode',

    closeBtn:'Speichern',
    saveBtn:'Speichern'
});

Ext.define("TK.locale.de.view.DocsForm", {
    override      :"TK.view.DocsForm",

    btnSave       :'Speichern',
    btnSaveExit   :'Speichern und EXIT',
    btnSavePrint  :'Speichern und PDF-Ausdruck',
    btnClose      :'Schließen',
    btnSign: 'ECP unterschreiben',
    btnChange: 'Ӓndern',
    btnChangePlomb: 'Plomben  ändern',
    btnChangeWagen:'Wagen ändern',
    btnChangeCont: 'Konteiner ändern',
    btnChangeGr   :'Fracht ändern',
    btnCopyEpd    :'mit EPD kopieren',
    btnDopList :'Zusatzblatt',
    btnContsList: 'Wagen/Konteinerliste',
    btnCopy20: 'Kopie in der Spalte 20',
    btnTbcReady: 'TBC fertig',
    btnTbcNotReady: 'TBC abbrechen',
    btnBchReady: 'Iftmin ist beendet',
    btnBchNotReady: 'Iftmin- Abbruch',
    btnFtsReady: 'FTS fertig',
    btnFtsNotReady: 'FTS Abbruch',

    labelNotes: 'Text vor der Containernummer',

    labelPayers     :'Zahler',
    labelNumDate: 'Contract number and date',
    labelBukvKod: 'ABC-Kode der Eisenbahnverwaltung',
    labelBukvKodRu: 'ABC-Kode der Eisenbahnverwaltung (rus)',
    labelPayerName  :'Zahlerbezeichnung',
    labelPayerNameRu: 'Zahlerbezeichnung (rus)',
    labelThrough: 'Zahlungsart (Weise)',
    labelPrim       :'Anmerkungen',
    labelPayerKod1: 'Zahlerkode',
    labelPayerKod2: 'Unterkode der Zahlerkode',
    labelPayerKod3: 'Unterkode der Zahlerkode',
    labelPayerKod4: 'Reserv. für Zusatzkode',
    labelPayment    :'Zahlungsart',
    labelPaymentRu: 'Zahlungsart (rus)',

    labelConts: 'Die Konteiner',
    labelSize    :'Abmessung',
    labelSizeMm  :'Abmessung, mm',
    labelNotesVag: 'Text vor der Wagennummer',
    labelCategory: 'Gattung',
    labelContNum: 'Konteinernummer',
    labelDescr   :'Beschreibung',
    labelVid     :'Art',

    labelCargo    :'Fracht',
    labelCode: 'Kode',
    labelNetto    :'Netto',
    labelTara     :'Verpackung',
    labelBrutto   :'Brutto',
    labelCodeGng: 'GNG -Kode',
    labelNameRuGng: 'Bezeichnung (rus)',
    labelNameChGng: 'Bezeichnung (China)',
    labelCodeEtsng: 'ET GUS-Kode',
    labelNameEtsng: 'Bezeichnung',
    labelMassa    :'Gewicht, kg',
    labelMesta    :'Kollis',
    labelPack: 'Verpackung (rus)',
    labelPackForeign:'Verpackung',

    labelCodeStn: 'Stationskode',
    labelText3: 'Abkürzung der Eisenbahn',
    labelText4: 'Verwaltungskode',
    labelBorderStn   :'Grenzübergangsstationen',
    labelCodeDoc: 'Unterlagenkode',
    labelText        :'Text',
    labelTextEu      :'EU-Text',
    labelTextRu: 'Text (rus)',
    labelSenderDocs: 'Vom Absender beigefügten Unterlagen ',
    labelCustomsCode :'Zollcode',
    labelDocNum: 'Unterlagennummer',
    labelCommercTerms:'Geschäftsbedingungen',
    labelPogrStn: 'Ausfahrtsgrenzstationen',

    labelWagons: 'Die Wagen',
    labelWagonNum     :'Wagennummer',
    labelWagonsTonnage: 'Tonnage, t',
    labelWagonsTara: 'Verpackung,t',
    labelWagonsAxes   :'Achsen',

    labelZayavSenderPayers:'Absendererklärung/Zahler',
    labelZayavSender      :'Absendererklärung',
    labelSenderNotes      :'Besondere Absendererklärungen',
    labelFile             :'Datei',
    labelFileSearch       :'Übersicht',
    labelWagenNum: 'Zugnummer',
    labelTeplatename: 'Anleitungsbezeichnung',
    labelDocSort         :'Laufende Nummer',
    labelDocSummary         :'Kumulativ',

    labelTGNL: 'TGNL-Kode',
    labelOKPO: 'OKPO-Kode',
    labelINN: 'StIdNr -Kode',

    labelVagKontGruz: 'Wagen/Konteiner/Fracht',
    btnPrintView: 'PDF- Durchsicht',

    labelDate: 'Datum',
    labelCodyDo: 'Die Kodes gelten bis',
    labelVsegoSmgs: 'SMGS insgesamt',
    labelCarrier: 'Beförderer',
    labelFrom: 'Station von',
    labelTo: 'Station bis',
    labelStationFrom: 'Station von (Kode)',
    labelStationTo: 'Station bis(Kode)',
    titleCarriers      :'Carriers',
    btnVed          :'List',
    btnVag          :'Wagon',
    btnCont         :'Container'
});

Ext.define("TK.locale.de.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo: 'Die Kodes gelten bis',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum :'Bestellungsnummer'
});

Ext.define("TK.locale.de.view.aviso2.AvisoSmgs2Form", {
    override:"TK.view.aviso2.AvisoSmgs2Form",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo: 'Die Kodes gelten bis',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum: 'Bestellungsnummer'
});

Ext.define("TK.locale.de.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo: 'Die Kodes gelten bis',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum: 'Bestellungsnummer'
});

Ext.define("TK.locale.de.view.avisocimsmgs.AvisoCimSmgsForm", {
    override: "TK.view.avisocimsmgs.AvisoCimSmgsForm",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed: 'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo: 'Die Kodes gelten bis',
    labelVsegoSmgs: 'CIMSMGS insgesamt',
    labelZakazNum: 'Bestellungsnummer'
});

Ext.define("TK.locale.de.view.avisogu29k.Form", {
    override:"TK.view.avisogu29k.Form",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelVsegoGU    :'GU insgesamt',
    labelZakazNum: 'Bestellungsnummer',
    labelSender1: 'Der Absender',
    labelReceiver1  :'Empfänger',
    labelStnSender  :'Abfertigungsstation',
    labelStnReceiver:'Bestimmungsstation',
    labelPayers1    :'Zahler',
    labelCodesTill: 'Die Kodes gelten bis',
    labelGU         :'GU',
    labelGU29       :'GU29k',
    labelGU27       :'GU27v'
});

Ext.define("TK.locale.de.view.avisogu29k.Form1", {
    override:"TK.view.avisogu29k.Form1",

    btnForAgree: 'Zur Abstimmung ',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelVsegoGU    :'GU insgesamt',
    labelZakazNum: 'Bestellungsnummer',
    labelSender1: 'Der Absender',
    labelReceiver1  :'Empfänger',
    labelStnSender: 'Abfertigungsstation',
    labelStnReceiver:'Bestimmungsstation',
    labelPayers1    :'Zahler',
    labelCodesTill  :'Die Kodes gelten bis',
    labelGU         :'GU',
    labelGU29       :'GU29k',
    labelGU27       :'GU27v'
});

Ext.define("TK.locale.de.view.cim.CimForm", {
    override:"TK.view.cim.CimForm",

    labelWagonOtpr  :'Versendungsnummer',
    labelContPrivate: 'Eigener („P“)'
});

Ext.define("TK.locale.de.view.slovnakl.Form", {
    override:"TK.view.slovnakl.Form",

    labelWagonOtpr  :'Versendungsnummer'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsForm", {
    override:"TK.view.cimsmgs.CimSmgsForm",
    labelDopList: 'Zusatzblatt'
});

Ext.define("TK.locale.de.view.cmr.Form", {
    override:"TK.view.cmr.Form"
});

Ext.define("TK.locale.de.view.epd.Form", {
    override:"TK.view.epd.Form",

    labelSenderName    :'Frachtabsenderbezeichnung',
    labelSenderAdress  :'Frachtabsenderanschrift',
    labelReceiverName  :'Frachtempfängerbezeichnung',
    labelReceiverAdress:'Frachtempfängeranschrift',
    labelStnSenderName :'Abfertigungsstationbezeichnung',
    labelStnSenderCode: 'Kode der Abfertigungsstation',
    labelStnReceiverName :'Bestimmungsstationsbezeichnung',
    labelStnReceiverCode: 'Kode der Bestimmungsstation'
});

Ext.define("TK.locale.de.view.file.Form", {
    override:"TK.view.file.Form",

    labelGeneralInfo :'Allgemeine Informationen',
    labelDownloadFile:'Datei hochladen'
});

Ext.define("TK.locale.de.view.gu27v.Form", {
    override:"TK.view.gu27v.Form"
});

Ext.define("TK.locale.de.view.gu29k.Form", {
    override:"TK.view.gu29k.Form"
});

Ext.define("TK.locale.de.view.invoice.Form", {
    override:"TK.view.invoice.Form",

    labelType           :'Typ',
    labelOtprNum        :'Versendungsnummer',
    labelContractNum    :'Vertragsnummer',
    labelContractDate   :'Vertragsdatum',
    labelSellerName     :'Verkäuferbezeichnung',
    labelSenderName     :'Absenderbezeichnung',
    labelSellerAdress   :'Verkäuferanschrift',
    labelSenderAdress   :'Absenderanschrift',
    labelSenderCountry: 'Absenderland, Kode',
    labelSenderZip: 'Absenderpostkode',
    labelSenderCity     :'Absenderstadt',
    labelBuyerName      :'Käuferbezeichnung',
    labelReceiverName   :'Empfängerbezeichnung',
    labelReceiverCountry: 'Empfängerland, Kode',
    labelReceiverZip: 'Empfängerpostkode',
    labelReceiverCity   :'Empfängerstadt',
    labelBuyerAdress    :'Käuferanschrift',
    labelReceiverAdress :'Empfängeranschrift',
    labelDeliveryCode: 'Lieferbedingungskode',
    labelDeliveryPlace  :'Lieferungsort',
    labelCurrency       :'Rechnungswährung',
    labelNote           :'Anmerkung',

    lableCombo1: 'Rechnung',
    lableCombo2: 'Rechnung',
    lableCombo3: 'Rechnungsanlage',
    lableCombo4: 'Frachtliste',
    lableCombo5: 'Ladungsmanifest',
});

Ext.define("TK.locale.de.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd: 'Ergänzen',
    btnDelete: 'Löschen',
    btnEdit: 'Editieren'
});

Ext.define("TK.locale.de.view.nsi.ListDir", {
    override:"TK.view.nsi.ListDir",

    title       :'Directoryliste',
    btnView     :'Durchsicht',
    btnUploadDir:'Directory hochladen',
    btnExportDir:'Export in Excel',
    headerName  :'Bezeichnung',
    warnTitle:'Warnung',
    warnMsg  :'Eine Zeile aus der Datentabelle ist auszuwählen',

    nsiSta      :'Eisenbahnstationdirectory',
    nsiCountries:'Länderdirectory',
    nsiGng: 'NHM-Kode-Directory',
    nsiEtsng: 'ET SNG-Kode-Directory',
    nsiCurrency :'Währungsdirectory',
    nsiTnved    :'HS-Directory',
    nsiDeliv    :'Directory von Lieferbedingungen',
    nsiUpak     :'Directory von Verpackungsarten',
    nsiOtpr     :'Directory juristischer Personen (von Absendern/Empfängern)',
    nsiPlat     :'Zahlerdirectory in Bezug auf Eisenbahnen (Spediteure)',
    nsiManagement:'Directory der Eisenbahnverwaltungen',
    nsiCountriesGd:'Directory der Eisenbahnländer',
    nsiDocG23: 'Unterlagenartendirectory',
    nsiVeterin	:'Veterinärfrachtdirectory',
    nsiKarantin	:'Quarantänefrachtdirectory',
    nsiDangCode	:'Gefahrengutdirectory',
    gruzyLink: 'Frachtliste, die einer Finanzgarantie beim Transit benötigt'
});

Ext.define("TK.locale.de.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum: 'Wagennummer (Spalte 27)',
    labelWagonsTonnage: 'Tonnage(Spalte 28), t',
    labelWagonsTara: 'Verpackung (Spalte 30), t',
    labelWagonsAxes: 'Achsen (Spalte 29)',
    labelContNum: 'Nummer (Spalte 9; 19)',
    labelSize: 'Abmessung ( Spalte 9)',
    labelVid          :'Art (Gr.18)'
});

Ext.define("TK.locale.de.view.stat.Form", {
    override:"TK.view.stat.Form",

    lableDate          :'Erstellungsdatum',
    lableDate1         :' von ',
    lableDate2         :'bis',
    lableZakazNum: 'Bestellungsnummer',
    lableStatus        :'Status',
    lableUser: 'Der Benutzer',
    lableCountrySender :'Frachtabfertigungsland',
    lableCountryRceiver:'Bestimmungsland',
    lableDeleted: 'Gelöschte?',
    lableStnPogr       :'Grenzübergangsstation',
    lableStnSender     :'Abfertigungsstation',
    lableStnReciver    :'Bestimmungsstation',
    lableSender        :'Frachtabsender',
    lableReceiver      :'Frachtempfänger',
    lableCargoName     :'Frachtbezeichnung',
    lableContSize: 'Typ Abmessung vom Konteiner',
    lablePayer         :'Zahler für Tarif und Dienstleistungen',
    lableKontNum: 'Konteinernummer',

    btnFind :'Finden',
    btnClose:'Schließen',
    btnReset:'Zurücksetzen',
    lableCombo1: 'Anleitung zur Bestätigung durch einen Agenten',
    lableCombo2: 'Anleitung vom Agenten bestätig ',
    lableCombo3: 'Anleitung vom Agenten nicht bestätigt',
    lableCombo4: 'Anleitung gesperrt',
    lableCombo5: 'Ausgedruckt'
});

Ext.define("TK.locale.de.controller.exchange.Senders", {
    override:"TK.controller.exchange.Senders",

    maskMsg: 'Datenabruf...',
    showTitle:'Achtung',
    showMsg1 :'Gesendet!',
    showMsg2 :'Fehler!',
    showMsg3 :'Gespeichert!',
    errorMsg: 'Achtung! Fehler…',
    waitMsg: 'Datei.. wird hochgeladen',
    waitMsg1 :'Daten werden gespeichert',

    btnSave  :'Speichern',
    btnExport: 'Export in FTS',
    btnClose :'Schließen',

    titleFTS: 'Austausch mit FTS',

    labelWagenNum   :'Zugnummer',
    labelWagenNums: 'Nummer des Zuges (der Züge)',
    labelWagenInd   :'Zugindex',
    labelPPVInd: 'PPV-Nummer',
    labelInputDate: 'Ankunftsdatum'
});

Ext.define("TK.locale.de.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.Docs", {
    override:"TK.controller.Docs",

    titleCopy2Aviso: 'Copy to template',
    titleList   :'Heft',
    titleEdit   :'Editieren',
    titleCopy   :'Kopie',
    titletPrint :'Ausdruck',
    titletStat  :'Statistik',
    titleReports:'Berichte',
    titleHistory: 'Unterlagengeschichte',
    titleUpload :'Hochladen der Anleitung im XML-Format',
    titleFTS    :'Austausch mit FTS',
    titleContList: 'Nummer des Zuges (-Züge[,]ein)',

    lableSettings  :'Einstellung',
    lableFace      :'Vorderseite',
    lableBack      :'Rückseite',
    lableTraneNum  :'Zug (Nummer)',
    labelSelectFile: 'Dateiauswahl zum Hochladen',
    labelFile      :'Datei',
    labelUn        :'Login',
    labelUnName    :'Name, Vorname und Vatersname',
    labelUnEmail: 'E-mail',
    labelUnGroup   :'Gruppe',
    labelGU         :'GU',
    labelGU29       :'GU29k',
    labelGU27       :'GU27v',
    labelWagenNum: 'Zugnummer',
    labelWagenNums: 'Nummer des Zuges (der Züge)',
    labelWagenInd: 'Zugindex',
    labelPPVInd: 'PPV-Nummer',
    labelInputDate: 'Ankunftsdatum',

    btnPrint :'Ausdruck',
    btnFind  :'Finden',
    btnSearch: 'Übersicht',
    btnSave  :'Speichern',
    btnClose :'Schließen',
    btnExport: 'Export in FTS',
    btnContList  :'Liste',
    btnSmgs  :'Frachtbrief',

    delTitle: 'Löschung...',
    delMsg: 'Wollen Sie tatsächlich.. löschen?',
    maskMsg  :'Datenabruf...',
    showTitle:'Achtung',
    showMsg1 :'Gesendet!',
    showMsg2 :'Fehler!',
    showMsg3 :'Gespeichert!',
    errorMsg: 'Achtung! Fehler…',
    waitMsg: 'Datei.. wird hochgeladen',
    waitMsg1 :'Daten werden gespeichert',

    titlePrint: 'Druckeinstellung',
    labelBlank: 'Mit Formblatt?',
    textPrint: 'Drucken',

    headerData:'Erstellungsdatum',
    headerMsg :'Mitteilung',
    headerWho :'Wer?',

    titleDocsCopy: 'Liste von Unterlagen, die zu Kopieren sind',
    headerName: 'Bezeichnung',
    btnCopy: 'Kopieren',
    all:            'Whole document',
    smgs2_1        :'1|Sender|1',
    smgs2_2        :'2|Departure station|2',
    smgs2_3        :'3|Consignor`s application|3',
    smgs2_4        :'4|Consignee|4',
    smgs2_5        :'5|Destination station|5',
    smgs2_6        :'6|Borders stations|6',
    smgs2_7        :'7|Wagon|7-12',
    smgs2_8        :'8|Cargo|15-18',
    smgs2_9        :'9|Cargo, additional information|15доп.',
    smgs2_10        :'10|Container|15',
    smgs2_11        :'11|Plombs|19',
    smgs2_12        :'12|Carriers|22',
    smgs2_13        :'13|Payments for carrier charges|23',
    smgs2_14        :'14|Documents attached by consignor|24',
    smgs2_15        :'15|Data not intended for the carrier: delivery contact number|25',
    smgs2_16        :'16|Remarks for customers and administrative procedures|28'
});

Ext.define("TK.locale.de.controller.Ajax", {
    override:"TK.controller.Ajax",

    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.docs.Cimsmgs", {
    override:"TK.controller.docs.Cimsmgs",

    titleOtpr         :'Absender/Empfänger Directory',
    headerOtprName    :'Bezeichnung',
    headerOtprName1: 'Bezeichnung (rus)',
    headerOtprEmail   :'E-mail',
    headerOtprPhone   :'Telefon',
    headerOtprFax: 'Fax',
    headerOtprStrCode: 'Landeskode',
    headerOtprStr     :'Land',
    headerOtprStr1: 'Land (rus)',
    headerOtprZip     :'Index',
    headerOtprCity    :'Stadt',
    headerOtprCity1: 'Stadt (rus)',
    headerOtprAdress  :'Anschrift',
    headerOtprAdress1: 'Anschrift, rus',
    headerOtprVat     :'VAT',
    headerOtprSendCode: 'Absender / Empfänger-Kode',
    headerOtprClCode: 'Kundenkode',
    headerINN: 'StIdNr -Kode',
    headerCountryCode: 'Landeskode',
    headerDopInfo     :'Weitere Info',
    tooltipEdit       :'Editieren',
    tooltipDel        :'Löschen'
});

Ext.define("TK.locale.de.controller.docs.Cmr", {
    override:"TK.controller.docs.Cmr"
});

Ext.define("TK.locale.de.controller.docs.Epd", {
    override:"TK.controller.docs.Epd"
});

Ext.define("TK.locale.de.controller.docs.File", {
    override:"TK.controller.docs.File",

    waitMsg1: 'Daten werden gespeichert',
    delTitle: 'Löschung...',
    delMsg: 'Wollen Sie tatsächlich.. löschen?',
    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.docs.Gu27v", {
    override:"TK.controller.docs.Gu27v",

    titleEpd:'EPD nicht hochgeladen',
    msgEpd  :'Zum Hochladen ist die Registerkarte mit EPD einzusetzen'
});

Ext.define("TK.locale.de.controller.docs.Gu29k", {
    override:"TK.controller.docs.Gu29k",

    titleEpd:'EPD nicht hochgeladen',
    msgEpd  :'Zum Hochladen ist die Registerkarte mit EPD einzusetzen'
});

Ext.define("TK.locale.de.controller.docs.Invoice", {
    override:"TK.controller.docs.Invoice",

    titleEpd:'EPD nicht hochgeladen',
    msgEpd  :'Zum Hochladen ist die Registerkarte mit EPD einzusetzen'
});

Ext.define("TK.locale.de.controller.Logs", {
    override:"TK.controller.Logs",

    titleFilter:'Filter',
    lableDate  :'Erstellungsdatum',
    lableDate1 :'von',
    lableDate2 :'bis',
    labelUser: 'Der Benutzer',

    btnFind:'Finden'
});

Ext.define("TK.locale.de.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg: 'Achtung! Fehler…'
});

Ext.define("TK.locale.de.controller.Project", {
    override:"TK.controller.Project",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…',
    showTitle: 'Achtung! Löschen verboten...',
    showMsg  :'Vor dem Löschen eines Projektes sollten alle EPD aus seinen Routen gelöscht werden'
});

Ext.define("TK.locale.de.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'EPD nicht hochgeladen',
    titleDownldInv:'Hochladen der Rechnungen ',
    msgEpd  :'Zum Hochladen ist die Registerkarte mit EPD einzusetzen',
    errorMsg: 'Achtung! Fehler…',
    btnFind  :'Finden',
    btnSave  :'Speichern',
    btnClose :'Schließen'
});

Ext.define("TK.locale.de.controller.Doc2Doc", {
    override:"TK.controller.Doc2Doc",

    titleDownldInv:'Hochladen der Rechnungen',
    errorMsg: 'Achtung! Fehler…',
    successMsgTitle: 'Die Operation erfolgreich abgeschlossen',
    btnFind  :'Finden',
    btnSave  :'Speichern',
    btnContList  :'Liste',

    btnSmgs  :'Frachtbrief',
    titleContList: 'Nummer des Zuges (-Züge[,]ein)',
    labelWagenNums   :'Nummer des Zuges (der Züge)',
    btnClose :'Schließen',
    titleFilterPer: 'Filter der Züge',
    warnTitle       :'Warning',
    saveMgs         :'Save the document'
});

Ext.define("TK.locale.de.controller.User", {
    override:"TK.controller.User",

    maskMsg: 'Datenabruf...',
    errorMsg: 'Achtung! Fehler…',
    waitMsg1: 'Daten werden gespeichert',
    titleNoUser: 'Achtung',
    msgNoUser: 'Kein Benutzer gewählt'
});

Ext.define("TK.locale.de.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Directory hochladen',
    labelSelectFile: 'Dateiauswahl zum Hochladen',
    labelFile      :'Datei',
    btnSave        :'Speichern',
    btnClose       :'Schließen',
    btnSearch: 'Übersicht',
    titleErrorWarning: 'Achtung',
    warningFillErrors: 'Die rot unterstrichenen Felder enthalten zu viele Zeichen'
});

Ext.define("TK.locale.de.controller.docs.PlombsTreeDetailController", {
    override       :"TK.controller.docs.PlombsTreeDetailController",
    msgTitle    :'Warning',
    msgSplit    :'Split plomb strings with separators: , and ;<br>In records:<br>'
});

Ext.define("TK.locale.de.view.nsi.List", {
    override:"TK.view.nsi.List",

    title1: 'Gruppen',
    titleRoad: 'Eisenbahndirectory',
    titleRoute        :'Routendirectory',
    titleProject        :'Projektendirectory',
    titleManagement  :'Directory der Eisenbahnverwaltungen',
    titleSta         :'Eisenbahnstationdirectory',
    titleCountries   :'Länderdirectory',
    titleCountriesZhd:'Directory der Eisenbahnländer',
    titleDangerous   :'Gefahrengutdirectory',
    titleKarantin    :'Quarantänefrachtdirectory',
    titleVeterin     :' Veterinärfrachtdirectory ',
    titleGng: 'NHM-Kode-Directory',
    titleEtsng: 'ET SNG-Kode-Directory',
    titleDocs: 'Unterlagenartendirectory',
    titlePlat        :'Zahlerdirectory in Bezug auf Eisenbahnen (Spediteure)',
    titleOtpr        :'Directory juristischer Personen (von Absendern/Empfängern)',
    titleDocs1: 'Unterlagendirectory',
    titleCurrency    :'Währungsdirectory',
    titleTnved: 'HS-Directory',
    titleDeliv       :'Directory von Lieferbedingungen',
    titleUpak        :'Directory von Verpackungsarten',

    headerName       :'Bezeichnung',
    headerProject: 'Das Projekt',
    headerRoute      :'Route',
    headerDescr      :'Beschreibung',
    headerCode: 'Kode',
    headerCountryRu  :'Land(russ)',
    headerCountry    :'Land',
    headerCountryS: 'Land,abkürz',
    headerStn: 'Station (rus)',
    headerStn1: 'Station (China)',
    headerStn2       :'Station (eng)',
    headerZhD        :'Eisenbahn',
    headerCodeAdm: 'Verwaltungskode',
    headerWay        :'Bahn',
    headerWayCode: 'Bahnkode',
    headerCoedEdi: 'UN/EDIFACT-Kode',
    headerCustCode   :'Zollcode',
    headerName1: 'Bezeichnung (rus)',
    headerName2: 'Bezeichnung (China)',
    headerName3      :' Bezeichnung (andere)',
    headerPayerMeth  :'Zahlungsart',
    headerPayerCode: 'Zahlerkode',
    headerPayerCode1: 'Unterkode des Kodes',
    headerPayerCode2: 'Unterkode des Kodes',
    headerCountryCode: 'Landeskode',
    headerCountryName:'Landbezeichnung',
    headerCity       :'Stadt',
    headerAddress    :'Anschrift',
    headerOtprZip    :'Index',
    headerDopInfo    :'Weitere Info',

    carrierTitle: 'Befördererdirectory',
    headerSt        :'Station',
    headerCar: 'Beförderer, Nummer',
    headerCarName: 'Beförderer,Bezeichnung',
    headerCarShort  :'Träger, bezeichnung',

    ttipSave:'speichern',
    ttipDel: 'Löschen',
    btnClose: 'Schließen',
    tooltipEdit: 'Bearbeiten',
    tooltipDel: 'Delete'
});

Ext.define("TK.locale.de.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: 'Druckeinstellung',
    labelBlank: 'Mit Formblatt?',
    textPrint: 'Drucken',
    textPages: 'Zum Ausdruck bestimmte Seiten',
    textPage: 'Seite',
    textPageBack: '(Auf der Rückseite drucken )',
    printTitle: 'Печать',
    printMsg: 'Будут распечатаны документ(-ы)'
});

Ext.define("TK.locale.de.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'Ausdruckvorlage anbinden',
    titleSelectText: 'Druckmuster auswählen',
    columnText: 'Bezeichnung',
    btnBindText: 'anbinden',
    btnBindPrintText: 'Ausdruck',
    btnClose: 'Schließen',
    msgTitle: 'Warnung',
    msgMsg: 'Please, select a record'
});

Ext.define("TK.locale.de.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Der Wagen',
    titleCont: 'Der Konteiner',
    titleCargo: 'Fracht',
    titleDanCargo: 'Gefahrengut',

    btnDel: 'Löschen',
    btnClose: 'Schließen',
    btnSave: 'speichern',
    btnVagText: '+ ein Wagen',
    btnContText: '+ Konteiner',
    btnCargoText: '+ Fracht',
    btnDanCargoText: '+ Gefahrengut',
    btnDocText: '+ Unterlage',
    btnPlombText: '+ Plombe',
    btnSearch: 'Empfänger',
    btnExpandAll: 'Alles maximieren',
    btnCollapseAll: 'Alles minimieren',
    btnImportXLSvag:'Wagon list import',
    btnImportXLSCont:'Container list import'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Vom Absender beigefügten Unterlagen '
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Wagen/Konteiner/Fracht'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plombs'
});

/*
Ext.define("Ext.locale.de.form.field.Base", {
    override: "Ext.form.field.Base",

    kontNumText: 'Das Feld soll die Nummer des Containers in der Form ABCD1234567 entalten',
    vagNumText: 'Das Feld soll die Nummer des Wagens für 1520 mm (8 Symbole )oder der Wagens für 1435 mm (12 Symbole) enthalten',
    vagNumUzkText: 'Das Feld enthält die Nummer das Wagens für 1435mm in folgender 123456789012 Form',
    vagNumShirText: 'Das Feld enthält die Nummer das Wagens für 1520mm in folgender 12345678 Form',
    vagNumLastDigitText: 'Falsche Kontrollnummer',
    kontNumLastDigitText: 'Falsche Kontrollnummer'
});
*/
Ext.define("TK.locale.de.Validators", {
    override: "TK.Validators",

    kontNumText: 'Diese Feld hat die Nummer des Konteiners im Format ABCD1234567 zu entalten',
    vagNumText: 'Dieses Feld hat die Nummer eines schmalen Wagens (8 Symbole )oder eines breiten Wagens für  (12 Symbole) zu enthalten',
    vagNumUzkText: 'Dieses Feld hat die Nummer eines schmalen Wagens  im Format 123456789012 zu enthalten',
    vagNumShirText: 'Dieses Feld hat die Nummer eines schmalen Wagens  im Format 12345678 zu enthalten',
    vagNumLastDigitText: 'Falsche Kontrollzahlen',
    kontNumLastDigitText: 'Falsche Kontrollzahlen',
    notXLS: 'Выбран не xls/xlsx файл'
});

Ext.define("TK.locale.de.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Zollcode',
    labelTextRu: 'Text (rus)',
    labelText: 'Text'
});

Ext.define("TK.locale.de.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Documents attached by sender',
    titleUpload: 'Hochladung',
    btnClose: 'Schließen',
    btnSave: 'Speichern',
    labelUpload: 'Hochladen',
    labelFile: 'Datei',
    downloadTpl:'Download template'
});

Ext.define("TK.locale.de.view.ved.List", {
    override        :"TK.view.ved.List",
    btnCreate: 'Erstellen',
    btnEdit: 'Editieren',
    btnDelete: 'Löschen',
    headerID        :'ID',
    headerCreation: 'Erstellung',
    headerDateTime: 'Datum und Zeit',
    headerUser: 'Der Benutzer',
    headerVagVedNum: 'Wagenliste №',
    headerPerVedNum: 'Nummern der Übergabelisten',
    headerTraneNum: 'Zugnummer',
    headerTraneName: 'Zugbezeichnung',
    headerVagCount: 'Wagenanzahl',
    title: 'Listenheft',
    btnPrint: 'PDF-Ausdruck',
    btnA4VagPrint: 'А4-Wagenliste',
    btnA3VagPrint: 'А3-Wagenliste',
    btnA4PerPrint: 'А4-Übergabeliste',
    btnA3PerPrint: 'А3-Übergabeliste',
    delMsg1: 'Löschung...',
    delMsg2: 'Wollen Sie die laufende Liste tatsächlich löschen?',
    delErr1: 'Löschung...',
    delErr2: 'Im Laufe der Löschung einer Liste ist ein Fehler aufgetreten'
});

Ext.define("TK.locale.de.controller.docs.Ved", {
    override        :"TK.controller.docs.Ved",
    titleEdit: 'Editieren',
    waitMsg: 'Daten werden gespeichert',
    btnSelect: 'Wählen',
    btnClose: 'Schließen',
    labelDocs: 'Frachtbriefliste',
    headerNumClaim: 'SMGS-Nummer',
    headerVags: 'Wagen №',
    headerCreate: 'Erstellungsdatum',
    headerKont: 'Konteinernummer',
    headerTrain: 'Zugnummer',
    headerNstn: 'Bestimmungsstation',
    headerRoute :'Route',
    headerGng: 'GNG',
    filterText: 'Filter',
    duplicateAll: 'Alle vervielfältigen',
    duplicateEmpty: 'Leere vervielfältigen',
    labelFilter :   'Filter',
    filterHeader: 'Daten',
    userfiltr: 'Filter',
    claerAll: 'Alles löschen'
});

Ext.define("TK.locale.de.view.ved.Form", {
    override            :"TK.view.ved.Form",
    title: 'Liste',
    fldLblNum: 'Listennummer',
    fldLblDate: 'Datum',
    fldLblTrain: 'Zug',
    fldLblTrainName: 'Zugbezeichnung',
    fldLblCarrOutName: 'Übergebender Beförderer',
    fldLblCarrInName: 'Empfangender Beförderer',
    fldLblStnOut: 'Station',
    fldLblStnIn: 'Station',
    fldLblRoadOut: 'Von der Bahn?',
    fldLblRoadIn: 'Auf die Bahn'

});

Ext.define("TK.locale.de.view.ved.VagsList", {
    override: "TK.view.ved.VagsList",
    title: 'Unterlagenliste',
    colTextIndex: '<br>laufende Nummer',
    colTextNvag: 'Wagennummer<br>',
    colTextOwner:   'Wagons<br>owner',
    colTextKind: 'Wagenart<br>',
    colTextGp: 'Ladefähigkeit<br>des Wagens,tonnen.',
    colTextAxes: 'Anzahl von <br>Axen',
    colTextTara: 'Verpackung<br>im Wagen,m.t.',
    colTextPlomb: 'Angaben zu den Plomben',
    colTextKpl: 'Anzahl',
    colTextZnak: 'Zeichen',
    colTextNstoF: 'Verplombungstation<br>',
    colTextNum: 'Frachtbrief №',
    colTextDatpp: 'Abnahmedatum zwecks <br>Beförderung',
    colTextKsto: 'Kode der  <br> Absenderstation',
    colTextNsto: 'Abfertigungs<br>station',
    colTextKstn: 'Kode  der  <br> Empfängerstation',
    colTextNstn: 'Bestimmungsstation <br>',
    colTextKontNum: 'Konteiner<br>nummer',
    colTextKontType: 'Konteinertypabmessung',
    colTextKontGp: 'Maximale<br>konterinerlast,t',
    colTextKontTara: 'Verpackung<br>im Konteiner, kg',
    colTextPlaces: 'Kollis',
    colTextPack: 'Verpackung',
    colTextGruz: 'NHM -Kode',
    colTextGruzName: 'Frachtbezeichnung <br>',
    colTextMbrt: 'Fracht<br>Gewicht',
    colTextPrim: 'Anmerkung',
    colTextPerVed: 'Übergabe<br>liste № ',
    btnAdd: 'Ergänzen',
    btnDelete: 'Löschen',
    btnLoad: 'Herunterladen...',
    btnCancelFilters: 'Filter ablegen'
});

Ext.define("TK.locale.de.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Routenliste',
    btnView: 'Unterlagen zeigen'
});

Ext.define("TK.locale.de.view.po.de..PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title       :'Züge',
    btnFind     :'Finden',
    btnFilter   :'Filter',
    btnClose    :'Schließen',
    btnReset    :'Zurücksetzen',
    lableDate: 'Datum von',
    lableDate1: 'Datum bis',
    train       :'Zugnummer',
    count: 'Anzahl',
    btnOk: 'Wählen',
    btnCancel: 'Annulieren'
});

Ext.define("TK.locale.de.view.po.de..SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title: 'CIM/SMGS entsprechend Zugnummer',
    btnClose        :'Schließen',
    headerG694: 'Versandnummer',
    headerAltered: 'Änderungsdatum',
    btnOk: 'Wählen',
    btnCancel: 'Annulieren',
    headerContNum: 'Konteinernummer',
    headerVagNum    :'Wagennummer',
    headertNstn     :'Bestimmungsstation'
});

Ext.define("TK.locale.de.view.po.de..Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title: 'Beladungsliste',
    headerWagN: 'Wagennummer<br/><b>Liste</b>',
    headerKonN: 'Konteinernummer<br/><b>liste</b>',
    headerKonNdb: 'Konteinernummer<br/><b>Datenbank</b>',
    headerG694: 'Versandnummer<br/><b>Liste</b>',
    headerKlient: 'Inhaber<br/><b>Liste</b>',
    headerFoot: 'Fuβ<br/><b>Liste</b>',
    headerContSize: 'Typabmessung<br/><b>Liste</b>',
    headerPlomb: 'Plomben<br/><b>Liste</b>',
    headerTara: 'Verpackung<br/>des Konteiners, kg<br/><b>Liste</b>',
    headerMaxLoad: 'Ladefähigketi<br/>des Konteiners<br/><b>Liste</b>',
    headerTaraVag: 'Verpackung<br/>der Wagens, t<br/><b>Liste</b>',
    headerMaxLoadVag: 'Ladefähigkeit<br/>des Wagens<br/><b>Liste</b>',
    headerKolOs: 'Achse<br/><b>Liste</b>',
    headerId: 'Id<br/><b>Datenbank</b>',

    btnOk: 'Wählen',
    btnCancel: 'Annulieren'
});

Ext.define("TK.locale.de.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText           :'einträge pro seite'
});

Ext.define("TK.locale.de.view.edit.StationCatalogEdit", {
    override: "TK.view.edit.StationCatalogEdit",

    title        :'Station',
    btnSave         :'Save',
    btnCancel       :'Cancel',
    lblStaRu      :'Station(ru)',
    lblStaEn      :'Station(en)',
    lblStaCn      :'Station(cn)',
    lblStaNo      :'Code',
    lblMnamerus   :'Railroad',
    lblManagno    :'Administaration<br>code',
    lblCtryNam    :'Country name'
});

Ext.define("Ext.locale.de.grid.plugin.RowEditing", {
    override: "Ext.grid.plugin.RowEditing",

    saveBtnText:'Save',
    cancelBtnText:'Cancel',
    errorsText:'Error',
    dirtyText:'You need to commit or cancel your changes',
    chEvery:'Change all on ',
    chEmpty:'Change empty on '
});

Ext.define("TK.locale.de.view.components.g7vagsmgs2", {
    override: "TK.view.components.g7vagsmgs2",

    drophlp        :'Drop the record in the desired place'
});
Ext.define("TK.locale.de.view.components.g19plombsmgs2", {
    override: "TK.view.components.g19plombsmgs2",

    totalCount        :'Total'
});
Ext.define("TK.locale.de.view.edit.SelectCopy2AvisoElements", {
    override: "TK.view.edit.SelectCopy2AvisoElements",

    title   :'Create a template',
    headtext    :'Name',
    headngraph  :'N item',
    choose      :'Choose',
    cancel      :'Cancel'
});
