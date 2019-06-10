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
 * By ZooKeeper (utf-8 encoding)
 * 6 November 2007*/
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
    dragText: "{0} ausgewählte Zeilen"
});

Ext.define("Ext.locale.de.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "diesen Register schließen"
});

Ext.define("Ext.locale.de.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "der Wert in diesem Feld ist falsch"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.de.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "herunterladen..."
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
    okText: "&#160;OK&#160;",
    cancelText: "Abbrechen"
});

Ext.define("Ext.locale.de.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Seite",
    afterPageText: "aus{0}",
    firstText: "Erste Seite",
    prevText: "Vorhergehende Seite",
    nextText: "Nächste Seite",
    lastText: "Letzte Seite",
    refreshText: "Aktualisieren",
    displayMsg: "die Einträge von {0} - {1} bis {2}",
    emptyMsg: ' keine Daten für Anzeige '
});

Ext.define("Ext.locale.de.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Die minimale Länge dieses Feldes {0}",
    maxLengthText: "Die maximale Länge dieses Feldes {0}",
    blankText: "Dieses Feld ist auszufüllen ",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.de.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Feldwert nicht unter {0}",
    maxText: "Feldwert nicht über {0}",
    nanText: "{0} ist keine Zahl",
    negativeText: "Der Wert kann nicht negativ sein"
});

Ext.define("Ext.locale.de.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Nicht verfügbar",
    disabledDatesText: "Nicht verfügbar",
    minText: "Das Datum in diesem Feld hat später zu sein {0}",
    maxText: "Das Datum in diesem Feld hat früher zu sein {0}",
    invalidText: "{0} Falsches Datum - das Datum soll im Format {1} anzugeben",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.de.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Herunterladen..."
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
    waitTitle: "Bitte warten..."
});

Ext.define("Ext.locale.de.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Ansteigend sortieren",
    sortDescText: "Absteigend sortieren",
    lockText: "Spalte sichern",
    unlockText: "Spalte entsichern",
    columnsText: "Spalten"
});

Ext.define("Ext.locale.de.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Leer)',
    groupByText: 'Nach diesem Feld gruppieren',
    showGroupsText: 'Den Gruppen nach anzeigen '
});

Ext.define("Ext.locale.de.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Bezeichnung",
    valueText: "Beduetung",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.de.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Abbrechen ",
        yes: "Ja",
        no: "Nein"
    }
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.de.Component", {
    override: "Ext.Component",
    titleDelMsgBox  :'Datensatz löschen?',
    textDelMsgBox   :'Der Datensatz wird gelöscht',
    titleEditWindow  :'Datensatz bearbeiten',
    titleAddWindow  :'Eintrag hinzufügen'
});

//////////////////////////////////
// TK Portal lacale costants  ////
/////////////////////////////////

Ext.define("TK.locale.de.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'Portal der TransContainer OAG',
    headerUser   :'Benutzer:',
    headerLangLbl:'Sprache wählen:'
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

    btnStat    :"Statistik",
    btnRestore    :"Gelöschte",
    btnDestroy    :"Dauerhaft löschen",
    btnPrint   :"PDF-Ausdruck",
    btnPrintView   :"View PDF",
    btnCreate  :'Erstellen',
    btnCopy    :'Kopie',
    btnCopySelect    :'Copy, select...',
    btnEdit    :'Editieren',
    btnDelete  :'Löschen',
    btnMakeSmgs:'Eine SMGS erstellen',
    btnMakeCimSmgs:'Eine ZIM/SMGS erstellen ',
    btnAppend2Smgs:'Eine SMGS ergänzen',
    btnAppend2CimSmgs:'Eine ZIM/SMGS ergänzen',
    btnMakeGU  :'GU erstellen',
    btnDownload:'Uploaden',
    btnHistory :'Historie',
    btnBindPrint :'Ausdruck anbinden',
    btnSelectPrint :'Muster auswählen',
    btnExch    :'Austausch',
    btnExchTBC :'TBZ',
    btnExchBCh1:'Zum Editieren öffnen / schließen',
    btnExchBCh :'BC',
    btnExchFTS :'FTS',
    btnExchBTLC :'BTLC',
    btnExchTdgFTS:'TDG',
    btnReports :'Berichte',
    btnView    :'Durchsehen',
    btnCont    :'Containers',
    btnVag     :'Wagons',
    /*btnContList  :'Liste',
     btnSmgs  :'SMGS',*/

    btnContsList :'Wagon/Vertrags liste',
    btnDopList :'Zusatzblatt',
    btnUploadCSDocs9 :'Absender dok.',
    btnUploadPogruzList:'Frachtliste',
    btnUploadPogruzListPoezd:'Cargo List. for trains',
    btnContsList1 :'Liste',
    btnSmgs :'SMGS',

    lableDeleted: 'Löschen?',

    btnPlusDocs :'+ Dokumente',
    btnPlusSmgsInv :'SMGS und Rechnungen',
    btnPlusInv :'+ Rechnungen',

    headerID          :'ID',
    headerProject          :'Projekt',
    headerRoute          :'Route',
    headerDoc          :'Dokument',
    headerCreation    :'Erstellung',
    headerDateTime    :'Datum und Zeit',
    headerUser        :'Benutzer',
    headerSenderName  :'Bezeichnung des Absenders',
    headerReceiverName:'Empfängerbezeichnung',
    headerContNum     :'Cont. Nummer.',
    headerDescr       :'Beschreibung',
    headerVagNum      :'Wagennummer',
    headerInv           :'Rechnungen',
    headerNPoezd      :'Zugnummer',
    headerFileName    :'Dateiname',
    headerContentType :'Inhaltstyp',
    headerSizeByte    :'Größe, Byte',

    warnTitle:'Warnung',
    warnMsg  :'Es ist eine Zeile aus der Datentabelle zu wählen',

    txtForApproval:'Zur Vereinbarung ',
    txtApproved:'Vereinbart ',
    txtWork:'in Arbeit',
    txtNotApproved:'Nicht vereinbart',
    txtBlocked:'Gesperrt',

    headerStatus  :'Status',
    headerInstrNum:'Template No.',
    headerGNG:'NHM',
    headerComments:'Bemerkungen',

    statusBlocked  :'Gesperrt',
    status4Approval:'Zur Vereinbarung',
    statusAgreed   :'Agreed',
    statusNotAgreed:'Nicht vereinbart'

});
Ext.define("TK.locale.de.view.avisocim.AvisoCimList", {
    override      :"TK.view.avisocim.AvisoCimList",
    title         :'CIM template register'
});
Ext.define("TK.locale.de.view.aviso2.AvisoSmgs2List", {
    override      :"TK.view.aviso2.AvisoSmgs2List",
    title         :'SMGS2 template register'
});

Ext.define("TK.locale.de.view.aviso.List", {
    override:"TK.view.aviso.List",

    title:'SMGS-Anweisungsheft'
});

Ext.define("TK.locale.de.view.avisocimsmgs.AvisoCimSmgsList", {
    override:"TK.view.avisocimsmgs.AvisoCimSmgsList",

    title:' ZIM/SMGS-Anweisungsheft'
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
    title    :'ZIM-Heft'

});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsList", {
    override        :"TK.view.cimsmgs.CimSmgsList",
    headerCimsmgs   :'Num CIM/SMGS',
    headerDateTransp:'Date CIM/SMGS',
    headerExchBch   :'Iftmin',
    title           :'ZIM/SMGS-Heft'

});

Ext.define("TK.locale.de.view.cmr.List", {
    override        :"TK.view.cmr.List",
    headerDateTransp:'Transp. Datum.',
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
    headerDateTransp:'Transportdatum.',
    headerAvisoNum  :'Avisonummer',
    title           :'GU-Heft'

});

Ext.define("TK.locale.de.view.gu29k.List", {
    override        :"TK.view.gu29k.List",
    headerGu29k     :'GU-29k',
    headerDateTransp:'Transportdatum.',
    headerAvisoNum  :'Avisonummer',
    title           :'GU-Heft'

});

Ext.define("TK.locale.de.view.invoice.List", {
    override:"TK.view.invoice.List",
    title   :'Rechnungsheft',
    headerNum: '№ inv',
    headerNumOtpr: '№',
    headerNumCont: '№ cont',
    headerDateOtpr: 'Date inv'

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
    headerAvisoNum:'Avisonummer'
});


Ext.define("TK.locale.de.view.file.List", {
    override:"TK.view.file.List",
    title   :'Graphikheft',
    headerNumOtpr: '№ Shipment',
    headerNumCont: '№ cont',
    headerDateOtpr: 'Data Shipment'
});

Ext.define("TK.locale.de.view.logs.List", {
    override    :"TK.view.logs.List",
    title       :'Portallogs',
    headerDate  :'Datum',
    headerUser  :'Benutzer',
    headerHost  :'Host',
    headerAgent :'Ausführungsumfeld',
    headerLog   :'Log',
    headerThread:'Thread',
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
    delMsg1     :'Löschung von…',
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
    fieldLabelFont: 'Die Schrift als Default-Wert für das komplette Dokument',
    fieldLabelFontName: 'Bezeichnung',
    fieldLabelFontSize: 'Größe',
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
    btnCopy       :'Kopieren',
    btnEdit       :'Editieren',
    btnRefresh    :'Aktualisieren',

    textYes: 'Ja',
    textNo: 'nein'
});

Ext.define("TK.locale.de.view.user.ListGroups", {
    override   :"TK.view.user.ListGroups",
    title      :'Gruppenliste',
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
    title      :'Vorrechtsliste ',
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
    labelLogin1    :'Login:',
    labelPass      :'Das Passwort<span class="x-required">*</span>',
    labelPass1     :'Passwortbestätigung<span class="x-required">*</span>',
    labelPass2     :'Neues Passwort:',
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
    vTypeLabelGr:'Eine Gruppe mit solchem Namen existiert bereits, dieses Feld kann nur Buchstaben,  Zahlen und _ enthalten',
    labelName   :'Name<span class="x-required">*</span>',
    labelName1  :'Name:',
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
    saveMsg         :'Datenspeicherung läuft'
});

Ext.define("TK.locale.de.view.edit.DetailGrid", {
    override :"TK.view.edit.DetailGrid",
    btnAdd   :"Ergänzen",
    btnDelete:"Löschen",
    btnCopy  :"Kopieren",
    btnOk    :'Ok',

    headerName         :'Bezeichnung',
    headerRoutesGr     :'Gruppen',
    headerRoutesDocs   :'Dokumente',
    headerRoutesCodeTbc:'Tbc-Code',
    headerRoutesCodeCustoms:'Zollamtcode',
    headerRoutesEmailMask: 'Email, maske',
    headerRoutesForDeleted: 'Zum Löschen?',
    headerContNum      :'Nummer',
    headerContSize     :'Größe',
    headerContVid      :'Ansicht',
    headerContNum1     :'Nummer',
    headerContSize1    :'Größe',
    headerContVid1     :'Ansicht',
    headerCodeTNVED    :'HS-Code',
    headerPack: 'Verpackung',
    headerPackVid: 'Ansicht',
    headerPackKod: 'Code',
    headerGoodsDescr   :'Warenbeschreibung',
    headerPackage      :'Verpackungsart',
    headerPackNum      :'Anzahl von Verpackungen/Kolli',

    headerBrutto       :'brutto (kg)',
    headerNetto        :'netto (kg)',
    headerQuantity     :'Anzahl',
    headerProdUnit     :'Warenmesseinheit',
    headerProdPrice    :'Wareneinheitspreis',
    headerTotalValue   :'Gesamtwert',
    headerType         :'Typ',
    headerTotal        :'Gesamt:',


    titleColumn: 'Spalte',
    titleDesc: 'Beschreibung',
    titleCoordLeft: 'Koordinaten der linken unteren Ecke, mm',
    titleCoordRight: 'Koordinaten der rechten oberen Ecke, mm',
    titleColumnFont: 'Schrift einer bestimmten Spalte',
    titleColumnFontName: 'Bezeichnung',
    titleColumnFontSize: 'Größe',
    titleColumnFontBold: 'Fett?',
    titleColumnFontUpper: ' Großbuchstaben?',
    titleColumnFontSpace: 'Zeilenabstand',
    titleRotate: 'Drehung',
    titleBorder: 'Grenze?',
    titleStroke: 'Zu unterstreichen?',
    titlePage: 'Seite',
    titlePrint: 'Ausdrucken?',
    titleTable: 'Tabelle?',
    titlePhrases: 'Sätze?'
});

Ext.define("TK.locale.de.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    btnSave :'Speichern',
    btnClose:'Schließen',

    labelSender     :'Der Absender',
    labelName       :'Bezeichnung',
    labelName1      :'Name',
    labelNameEu     :'EU-Bezeichnung',
    labelNameRu     :'Bezeichnung (russ)',
    labelNameCh     :'Bezeichnung (chin)',
    labelDate       :'Datum',
    labelTotal      :'Menge',
    labelCountry    :'Land',
    labelCountryRu  :'Land (russ)',
    labelCountryCode:'Landescode',
    labelZip        :'Index',
    labelCity       :'Stadt',
    labelCityRu     :'Stadt (russ)',
    labelAdress     :'Anschrift',
    labelAdressRu   :'Anschrift (russ)',
    labelOptInfo    :'Opt. info',
    labelSenderCod  :'Absender code',
    labelReceiverCod:'Empfänger code',
    labelReceiver   :'Empfänger'
});

Ext.define("TK.locale.de.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'Ergänzen',
    btnDelete:'Löschen'
});

Ext.define("TK.locale.de.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",
    labelName1      :'Bezeichnung',
    labelWagons       :'die Wagen',
    labelWagonNum     :'Wagennummer',
    labelWagonsTonnage:'Ladeinhalt',
    labelWagonsTara   :'Verpackung',
    labelWagonsAxes   :'Achsen',
    labelConts   :'Container',
    labelSize    :'Abmessung',
    labelSizeMm  :'Abmessung, mm',
    labelTaraCont: 'Verpackung, Gewicht',
    labelNotes  :'Text vor Containernummer',
    labelCategory:'Klasse',
    labelContNum :'Containernummer',
    labelDescr   :'Beschreibung',
    labelVid     :'Ansicht',
    labelCargo    :'Fracht',
    labelCode     :'Code',
    labelNetto    :'Netto',
    labelTara     :'Verpackung',
    labelBrutto   :'Brutto',
    labelCodeGng  :'NHM-Code',
    labelNameRuGng:'Bezeichnung (russ)',
    labelNameChGng:'Bezeichnung (China)',
    labelCodeEtsng:'ET GUS-Code',
    labelNameEtsng:'Bezeichnung',
    labelMassa    :'Gewicht, kg',
    labelMesta    :'Kollis',
    labelPack     :'Verpackung (russ)',
    labelPackForeign:'Verpackung',

    labelWagonsGiven:'Wagon is given',
    labelWagonsOwner:"Wagon's owner",
    labelWagonsKind:"Wagon's kind",

    labelContSize:'Size Type',
    labelMaxLoad:'Max load',

    labelNameRu: 'Name(ru)',
    labelName: 'Name',
    labelOON: 'OON',
    labelClass: 'Class',
    labelZnak: 'Marks',
    labelGrUpak: 'Packing group',
    labelAvKart: '№ emerg. card',
    labelStamp: 'Stamp',
    labelDopInf: 'Add. info '
});


Ext.define("TK.locale.de.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Zollcode',
    labelTextRu: 'Text (russ)',
    labelText: 'Text',
    labelDocNum: 'Dokumentennummer',
    labelDate: 'Datum',
    labelTotal: 'Menge'
});

Ext.define("TK.locale.de.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plombe',
    labelTotal: 'Menge'
});
Ext.define("TK.locale.de.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",

    labelOtprName:'Bezeichnung',
    labelOtprNameRu:'Bezeichnung (russ)',
    labelCountry:'Land',
    labelCountryRu:'Land (russ)',
    labelCountryCode:'Landescode',
    labelEmail:'E-mail',
    labelPhone:'Telefon',
    labelFax:'Faxgerät',
    labelCity:'Stadt',
    labelCityRu:'Stadt (russ)',
    labelAdress:'Anschrift',
    labelAdressRu:'Anschrift, russ',
    labelZip:'Index',
    labelVat:'VAT',
    labelSenRecCode:'Code des Absenders / Empfängers',
    labelOKPO: 'OKPO-Code:',
    labelCliCode:'Kundencode',
    labelNNcode:'INN-Code',
    labelDopInfo:'Weitere Info.',

    closeBtn:'Speichern',
    saveBtn:'Speichern'
});
Ext.define("TK.locale.de.view.DocsForm", {
    override      :"TK.view.DocsForm",
    btnSave       :'Speichern',
    btnSaveExit   :'Speichern und EXIT',
    btnSavePrint  :'Speichern und PDF-Ausdruck',
    btnClose      :'Schließen',
    btnSign       :'EZP unterschreiben',
    btnChange     :'Andern',
    btnChangePlomb     :'Изменить пломбы',
    btnChangeWagen:'Wagen ändern',
    btnChangeCont :'Container ändern',
    btnChangeGr   :'Fracht ändern',
    btnCopyEpd    :'mit EPD kopieren',
    btnDopList :'Zusatzblatt',
    btnContsList :'Wagon/Vertrags liste',
    btnCopy20     :'Kopie in der Gr.20',
    btnTbcReady   :'Tbc fertig',
    btnTbcNotReady:'Tbc abbrechen',
    btnBchReady   :'Fertig',
    btnBchNotReady:'Abbruch',
    btnFtsReady   :'Fts fertig',
    btnFtsNotReady:'Fts Abbruch',

    labelNotes:'Anmerkung',

    labelPayers     :'Zahler',
    labelBukvKod    :'ABC-Code der Eisenbahnverwaltung',
    labelBukvKodRu  :'ABC-Code der Eisenbahnverwaltung (russ)',
    labelPayerName  :'Zahlerbezeichnung',
    labelPayerNameRu:'Zahlerbezeichnung (russ)',
    labelThrough    :'Zahlungsart',
    labelPayerKod1  :'Zahlercode',
    labelPayerKod2  :'Zahleruntercode',
    labelPayerKod3  :'Untercode des Zahleruntercodes',
    labelPayerKod4  :'Reserv. für Zusatzcode',
    labelPayment    :'Zahlungsart',
    labelPaymentRu  :'Zahlungsart (russ)',

    labelConts   :'Die Container',
    labelSize    :'Abmessung',
    labelSizeMm  :'Abmessung, mm',
    labelNotes  :'Text vor der Containernummer',
    labelNotesVag  :'Текст перед № вагона',
    labelCategory:'Klasse',
    labelContNum :'DContainernummer',
    labelDescr   :'Beschreibung',
    labelVid     :'Art',

    labelCargo    :'Fracht',
    labelCode     :'Code',
    labelNetto    :'Netto',
    labelTara     :'Verpackung',
    labelBrutto   :'Brutto',
    labelCodeGng  :'Gng-Code',
    labelNameRuGng:'Name (russ)',
    labelNameChGng:'Der Name(chin)',
    labelCodeEtsng:'ETSNG-Code',
    labelNameEtsng:'Name',
    labelMassa    :'Gewicht, kg',
    labelMesta    :'Kollis',
    labelPack     :'Verpackung (russ)',
    labelPackForeign:'Verpackung',

    labelCodeStn     :'Stationscode',
    labelBorderStn   :'Grenzübergangsstationen',
    labelCodeDoc     :'Dokumentencode',
    labelText        :'Text',
    labelTextEu      :'EU-Text',
    labelTextRu      :'Text (russ)',
    labelSenderDocs  :'Vom Absender beigelegten Dokumente',
    labelCustomsCode :'Zollcode',
    labelDocNum      :'Dokumentennummer',
    labelCommercTerms:'Geschäftsbedingungen',
    labelPogrStn: 'Ausfahrtsgrenzstationen',

    labelWagons       :'Wagen',
    labelWagonNum     :'Wagennummer',
    labelWagonsTonnage:'Ladeinhalt',
    labelWagonsTara   :'Verpackung',
    labelWagonsAxes   :'Achsen',

    labelZayavSenderPayers:'Absendererklärung/Zahler',
    labelZayavSender      :'Absendererklärung',
    labelSenderNotes      :'Besondere Absendererklärungen',
    labelFile             :'Datei',
    labelFileSearch       :'Übersicht',
    labelWagenNum         :'Zugnummer:',
    labelDocSort         :'Laufende Nummer',
    labelDocSummary         :'Kumulativ',

    labelTGNL: 'TGNL-Code:',
    labelOKPO: 'OKPO-Code:',
    labelINN: 'INN-Code:',

    labelVagKontGruz: 'Wagen / Container/ Fracht',
    btnPrintView   :"View PDF"

});

Ext.define("TK.locale.de.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Vereinbart',

    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo   :'Die Codes gelten bis:',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum :'Bestellungsnummer'
});

Ext.define("TK.locale.de.view.aviso2.AvisoSmgs2Form", {
    override:"TK.view.aviso2.AvisoSmgs2Form",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo   :'Die Codes gelten bis:',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum :'Die Bestellungsnummer'
});

Ext.define("TK.locale.de.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo   :'Die Codes gelten bis:',
    labelVsegoSmgs:'SMGS insgesamt',
    labelZakazNum :'Die Bestellungsnummer'
});

Ext.define("TK.locale.de.view.avisocimsmgs.CimSmgsForm", {
    override:"TK.view.avisocimsmgs.CimSmgsForm",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Ivereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelCodyDo   :'Die Codes gelten bis:',
    labelVsegoSmgs:'CIM/SMGS insgesamt',
    labelZakazNum :'Die Bestellungsnummer'
});

Ext.define("TK.locale.de.view.avisogu29k.Form", {
    override:"TK.view.avisogu29k.Form",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelVsegoGU    :'GU insgesamt',
    labelZakazNum   :'Die Bestellungsnummer',
    labelSender1    :'Absender',
    labelReceiver1  :'Empfänger',
    labelStnSender  :'Abfertigungsstation',
    labelStnReceiver:'Bestimmungsstation',
    labelPayers1    :'Zahler',
    labelCodesTill  :'Die Codes gelten bis',
    labelGU         :'GU',
    labelGU29       :'GU29k',
    labelGU27       :'GU27v'
});

Ext.define("TK.locale.de.view.avisogu29k.Form1", {
    override:"TK.view.avisogu29k.Form1",

    btnForAgree :'Zur Vereinbarung',
    btnAgreed   :'Vereinbart',
    btnNotAgreed:'Nicht vereinbart',

    labelVsegoGU    :'GU insgesamt',
    labelZakazNum   :'Die Bestellungsnummer',
    labelSender1    :'Absender',
    labelReceiver1  :'Empfänger',
    labelStnSender  :'Abfertigunsstation',
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
    labelContPrivate:'Eigene („P“)'
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
    labelStnSenderCode :'Abfertigungsstationcode',
    labelStnReceiverName :'Bestimmungsstationsbezeichnung',
    labelStnReceiverCode :'Bestimmungsstationcode'
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
    labelSenderCountry  :'Absenderland, Code',
    labelSenderZip      :'Absenderpostcode',
    labelSenderCity     :'Absenderstadt',
    labelBuyerName      :'Käuferbezeichnung',
    labelReceiverName   :'Empfängerbezeichnung',
    labelReceiverCountry:'Empfängerland, Code',
    labelReceiverZip    :'Empfängerpostcode',
    labelReceiverCity   :'Empfängerstadt',
    labelBuyerAdress    :'Käuferanschrift',
    labelReceiverAdress :'Empfängeranschrift',
    labelDeliveryCode   :'Lieferbedingungscode',
    labelDeliveryPlace  :'Lieferungsort',
    labelCurrency       :'Rechnungswährung',
    labelNote           :'Anmerkung',

    lableCombo1: 'Rechnung',
    lableCombo2: 'Eingangsrechnung',
    lableCombo3: 'Rechnungsanlage',
    lableCombo4: 'Frachtliste',
    lableCombo5: 'Ladungsmanifest'

});

Ext.define("TK.locale.de.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd:'Ergänzen'
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
    nsiGng      :'NHM-Codes-Directory',
    nsiEtsng    :'ET SNG-Codes-Directory',
    nsiCurrency :'Währungsdirectory',
    nsiTnved    :'HS-Directory',
    nsiDeliv    :'Directory von Lieferbedingungen',
    nsiUpak     :'Directory von Verpackungsarten',
    nsiOtpr     :'Directory juristischer Personen (von Absendern/Empfängern)',
    nsiPlat     :'Zahlerdirectory in Bezug auf Eisenbahnen (Spediteure)',
    nsiManagement:'Directory der Eisenbahnverwaltungen',
    nsiCountriesGd:'Directory der Eisenbahnländer',
    nsiDocG23   :'Dokumentenartendirectory',
    nsiVeterin	:'Veterinärfrachtdirectory',
    nsiKarantin	:'Quarantänefrachtdirectory',
    nsiDangCode	:'Gefahrengutdirectory',
    gruzyLink	:'!!!!Cargo list, with financial insurance'
});

Ext.define("TK.locale.de.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum     :'Wagennummer (Gr.27',
    labelWagonsTonnage:'Ladeinhalt (Gr.28)',
    labelWagonsTara   :'Verpackung (Gr.30)',
    labelWagonsAxes   :'Achsen (Gr.29)',
    labelContNum      :'Nummer (Gr.9; 19)',
    labelSize         :'Abmessung (Gr.9)',
    labelVid          :'Art (Gr.18)'
});

Ext.define("TK.locale.de.view.stat.Form", {
    override:"TK.view.stat.Form",

    lableDate          :'Erstellungsdatum',
    lableDate1         :' von ',
    lableDate2         :'bis',
    lableZakazNum      :'Die Bestellungsnummer',
    lableStatus        :'Status',
    lableUser          :'Benutzer',
    lableCountrySender :'Frachtabfertigungsland',
    lableCountryRceiver:'Bestimmungsland',
    lableDeleted        :'Löschen?',
    lableStnPogr       :'Grenzübergangsstation',
    lableStnSender     :'Abfertigungsstation',
    lableStnReciver    :'Bestimmungsstation',
    lableSender        :'Frachtabsender',
    lableReceiver      :'Frachtempfänger',
    lableCargoName     :'Frachtbezeichnung',
    lableContSize      :'Containerabmessungstyp',
    lablePayer         :'Zahler für Tarif und Dienstleistungen',
    lableKontNum         :'Containernummer',

    btnFind :'Finden',
    btnClose:'Schließen',
    btnReset:'Zurücksetzen',
    lableCombo1: 'Anleitung zur Bestätigung durch einen Agente',
    lableCombo2: 'Anleitung vom Agenten bestätig ',
    lableCombo3: 'Anleitung vom Agenten nicht bestätigt',
    lableCombo4: 'Anleitung gesperrt',
    lableCombo5: 'Ausgedruckt'
});

Ext.define("TK.locale.de.controller.exchange.Senders", {
    override:"TK.controller.exchange.Senders",

    maskMsg  :'Datenabruf',
    showTitle:'Achtung',
    showMsg1 :'Gesendet!',
    showMsg2 :'Fehler!',
    showMsg3 :'Gespeichert!',
    errorMsg :'Achtung! Fehler!',
    waitMsg  :'Datei wird geladen',
    waitMsg1 :'Daten werden gespeichert',

    btnSave  :'Speichern',
    btnExport:'Export in',
    btnClose :'Schließen',

    titleFTS    :' mit FTS',

    labelWagenNum   :'Zugnummer',
    labelWagenNums   :'Nummer des Zuges (der Züge):',
    labelWagenInd   :'Zugindex',
    labelPPVInd     :'PPV-Nummer:',
    labelInputDate  :'Ankunftsdatum:'
});

Ext.define("TK.locale.de.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg  :'Datenabruf',
    errorMsg :'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.Docs", {
    override:"TK.controller.Docs",

    titleList   :'Heft',
    titleEdit   :'Editieren',
    titleCopy   :'Kopie',
    titletPrint :'Ausdruck',
    titletStat  :'Statistik',
    titleReports:'Berichte',
    titleHistory:'Dokumentengeschichte',
    titleUpload :'Hochladen der Anleitung im XML-Format',
    titleFTS    :'Austausch mit FTS',
    titleContList:'Geben Sie die Zugnummer ein',

    lableSettings  :'Einstellung',
    lableFace      :'Vorderseite',
    lableBack      :'Rückseite',
    lableTraneNum  :'Zug (Nummer)',
    labelSelectFile:'Dateiauswahl zwecks Hochladen',
    labelFile      :'Datei',
    labelUn        :'Login',
    labelUnName    :'Name, Vorname und Vatersname',
    labelUnEmail   :'Email',
    labelUnGroup   :'Gruppe',
    labelGU         :'GU',
    labelGU29       :'GU29k',
    labelGU27       :'GU27v',
    labelWagenNum   :'Zugnummer:',
    labelWagenNums   :'Nummer des Zuges (der Züge):',
    labelWagenInd   :'Zugindex:',
    labelPPVInd     :'PPV-Nummer:',
    labelInputDate  :'Ankunftsdatum:',

    btnPrint :'Ausdruck',
    btnFind  :'Finden',
    btnSearch:'Übersicht…',
    btnSave  :'Speichern',
    btnClose :'Schließen',
    btnExport:'Export in das FTS',
    btnContList  :'Liste',
    btnSmgs  :'Frachtbrief',

    delTitle :'löschen...',
    delMsg   :'Wollen Sie tatsächlich löschen?',
    maskMsg  :'Datenabruf...',
    showTitle:'Achtung',
    showMsg1 :'Gesendet!',
    showMsg2 :'Fehler!',
    showMsg3 :'Gespeichert!',
    errorMsg :'Achtung! Fehler!',
    waitMsg  :'Hochladen einer Datei',
    waitMsg1 :'Daten werden gespeichert',

    titlePrint: "Printing",
    labelBlank: "With blank?",
    textPrint: "Print",

    headerData:'Erstellungsdatum',
    headerMsg :'Mitteilung',
    headerWho :'Wer?',

    titleDocsCopy: 'Docs list for copy',
    headerName: 'Name',
    btnCopy: 'Copy'
});

Ext.define("TK.locale.de.controller.Ajax", {
    override:"TK.controller.Ajax",

    errorMsg:'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",

    maskMsg :'Datenabruf',
    errorMsg:'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",

    maskMsg :'Datenabruf',
    errorMsg:'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",

    maskMsg :'Datenabruf',
    errorMsg:'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.docs.Cimsmgs", {
    override:"TK.controller.docs.Cimsmgs",

    titleOtpr         :'Absender/Empfänger Directory',
    headerOtprName    :'Bezeichnung',
    headerOtprName1   :'Bezeichnung (russ)',
    headerOtprEmail   :'E-mail',
    headerOtprPhone   :'Telefon',
    headerOtprFax     :'Faxgerät',
    headerOtprStrCode :'Landescode',
    headerOtprStr     :'Land',
    headerOtprStr1    :'Land (russ)',
    headerOtprZip     :'Index',
    headerOtprCity    :'Stadt',
    headerOtprCity1   :'Der Stadt (russ)',
    headerOtprAdress  :'Anschrift',
    headerOtprAdress1 :'Anschrift, russ',
    headerOtprVat     :'VAT',
    headerOtprSendCode:'Code des Absenders / Empfängers',
    headerOtprClCode  :'Kundencode',
    headerINN         :'INN-Code:',
    headerCountryCode :'Land, Code',
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

    waitMsg1:'Datenspeicherung läuft',
    delTitle:'Löschung',
    delMsg  :' Wollen Sie tatsächlich löschen?',
    errorMsg:'Achtung! Fehler!'
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
    labelUser  :'Benutzer',

    btnFind:'Finden'
});

Ext.define("TK.locale.de.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg:'Achtung! Fehler!'
});

Ext.define("TK.locale.de.controller.Project", {
    override:"TK.controller.Project",

    maskMsg  :'Datenabruf',
    errorMsg :'Achtung! Fehler!',
    showTitle:'Achtung! Löschen verboten',
    showMsg  :'Vor dem Löschen eines Projektes sollten alle EPD aus seinen Routen gelöscht werden'
});

Ext.define("TK.locale.de.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'EPD nicht hochgeladen',
    titleDownldInv:'Hochladen der Rechnungen ',
    msgEpd  :'Zum Hochladen ist die Registerkarte mit EPD einzusetzen',
    errorMsg:'Achtung! Fehler!',
    btnFind  :'Finden',
    btnSave  :'Speichern',
    btnClose :'Schließen'
});

Ext.define("TK.locale.de.controller.Doc2Doc", {
    override:"TK.controller.Doc2Doc",

    titleDownldInv:'Hochladen der Rechnungen',
    errorMsg:'Achtung! Fehler!',
    successMsgTitle:'Die Operation wurde erfolgreich abgeschlossen',
    btnFind  :'Finden',
    btnSave  :'Speichern',
    btnContList  :'Liste',
    btnSmgs  :'Frachtbrief',
    titleContList:'Geben Sie die Zugnummer ein',
    labelWagenNums   :'Nummer des Zuges (der Züge)',
    btnClose :'Schließen'
});

Ext.define("TK.locale.de.controller.User", {
    override:"TK.controller.User",

    maskMsg :'Datenabruf',
    errorMsg:'Achtung! Fehler!',
    waitMsg1:'Die Daten werden gespeichert',
    titleNoUser :'Warnung',
    msgNoUser   :'Wählen Sie einen Benutzer aus, um eine Operation auszuführen'
});

Ext.define("TK.locale.de.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Directory hochladen',
    labelSelectFile:'Dateiauswahl zwecks Hochladen',
    labelFile      :'Datei',
    btnSave        :'Speichern',
    btnClose       :'Schließen',
    btnSearch      :'Die Übersicht',
    titleErrorWarning   :'Warnung',
    warningFillErrors   :'Unterstrichene Felder sind zu lang'
});

Ext.define("TK.locale.de.view.nsi.List", {
    override:"TK.view.nsi.List",

    title1           :"Gruppe",
    titleRoad        :'Strassendirectory',
    titleRoute        :'Routendirectory',
    titleProject        :'Projektendirectory',
    titleManagement  :'Directory der Eisenbahnverwaltungen',
    titleSta         :'Eisenbahnstationdirectory',
    titleCountries   :'Länderdirectory',
    titleCountriesZhd:'Directory der Eisenbahnländer',
    titleDangerous   :'Gefahrengutdirectory',
    titleKarantin    :'Quarantänefrachtdirectory',
    titleVeterin     :' Veterinärfrachtdirectory ',
    titleGng         :'NHM-Codes-Directory…',
    titleEtsng       :'ET SNG-Codes-Directory…',
    titleDocs        :'Dokumentenartendirectory',
    titlePlat        :'Zahlerdirectory in Bezug auf Eisenbahnen (Spediteure)',
    titleOtpr        :'Directory juristischer Personen (von Absendern/Empfängern)',
    titleDocs1       :'Dokumentendirectory',
    titleCurrency    :'Währungsdirectory',
    titleTnved       :'HS-Directory …..',
    titleDeliv       :'Directory von Lieferbedingungen',
    titleUpak        :'Directory von Verpackungsarten',

    headerName       :'Bezeichnung',
    headerProject    :'Projekt',
    headerRoute      :'Route',
    headerDescr      :'Beschreibung',
    headerCode       :'Code',
    headerCountryRu  :'Land(russ)',
    headerCountry    :'Land',
    headerCountryS   :'Land,kürz',
    headerStn        :'Station (russ)',
    headerStn1       :'Station (chin)',
    headerStn2       :'Station (eng)',
    headerZhD        :'Eisenbahn',
    headerCodeAdm    :'Verwaltungscode',
    headerWay        :'Bahn',
    headerWayCode    :'Bahncode',
    headerCoedEdi    :'UN/EDIFACT-Code',
    headerCustCode   :'Zollcode',
    headerName1      :'Bezeichnung (russ)',
    headerName2      :'Bezeichnung (ch)',
    headerName3      :' Bezeichnung (andere)',
    headerPayerMeth  :'Zahlungsart',
    headerPayerCode  :'Zahlungscode',
    headerPayerCode1 :'Codeuntercode',
    headerPayerCode2 :'Unterkode des Unterkodes',
    headerCountryCode:'Land, Code',
    headerCountryName:'Landbezeichnung',
    headerCity       :'Stadt',
    headerAddress    :'Anschrift',
    headerOtprZip    :'Index',
    headerDopInfo    :'Weitere Info',

    carrierTitle    :'Trägerdirectory',
    headerSt        :'Station',
    headerCar       :'Träger, nummer',
    headerCarName   :'Träger, bezeichnung',
    headerCarShort  :'Träger, bezeichnung',

    ttipSave:'speichern',
    ttipDel :'löschen',
    btnClose:'schließen'
});

Ext.define("TK.locale.de.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Druckeinstellungen",
    labelBlank: "Mit Formblatt?",
    textPrint: "Ausdruck",
    textPages: 'zum Ausdruck bestimmte Seiten',
    textPage: 'Seite',
    textPageBack: 'Umlauf'
});

Ext.define("TK.locale.de.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'Ausdruckvorlage anbinden',
    titleSelectText: 'Muster auswählen',
    columnText: 'Bezeichnung',
    btnBindText: 'anbinden',
    btnBindPrintText: 'Печать',
    btnClose: 'Закрыть',
    msgTitle: 'Предупреждение',
    msgMsg: 'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.de.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Wagen',
    titleCont: 'Container',
    titleCargo: 'Fracht',
    titleDanCargo: 'Dan Cargo',

    btnDel: 'löschen',
    btnClose: 'schließen',
    btnSave: 'speichern',
    btnVagText: '+ Wagen',
    btnContText: '+ Container',
    btnCargoText: '+ Fracht',
    btnDanCargoText: '+ Dan.Cargo',
    btnDocText: '+ Dokument',
    btnPlombText: '+ Plombe',
    btnSearch: 'Search',
    btnExpandAll: 'Alles öffnen',
    btnCollapseAll: 'Alles schließen'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Die vom Absender beigefügten Dokumente'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Wagen/Container/Fracht'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plomben'
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

    kontNumText: 'Das Feld soll die Nummer des Containers in der Form ABCD1234567 entalten',
    vagNumText: 'Das Feld soll die Nummer des Wagens für 1520 mm (8 Symbole )oder der Wagens für 1435 mm (12 Symbole) enthalten',
    vagNumUzkText: 'Das Feld enthält die Nummer das Wagens für 1435mm in folgender 123456789012 Form',
    vagNumShirText: 'Das Feld enthält die Nummer das Wagens für 1520mm in folgender 12345678 Form',
    vagNumLastDigitText: 'Falsche Kontrollnummer',
    kontNumLastDigitText: 'Falsche Kontrollnummer'
});


Ext.define("TK.locale.de.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Zollcode',
    labelTextRu: 'Bezeichnung(russ)',
    labelText: 'Bezeichnung'
});

Ext.define("TK.locale.de.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Absender dok.',
    titleUpload: 'Uploaden',
    btnClose: 'Schließen',
    btnSave: 'Speichern',
    labelUpload: 'Uploaden',
    labelFile: 'Datei'
});

Ext.define("TK.locale.de.view.ved.List", {
    override        :"TK.view.ved.List",
    btnCreate       :'Create',
    btnEdit         :'Edit',
    btnDelete       :'Delete',
    headerID        :'ID',
    headerCreation  :'Creation',
    headerDateTime  :'Date&Time',
    headerUser      :'User',
    headerVagVedNum :'Wagon list №',
    headerPerVedNum :'Transfer list №',
    headerTraneNum  :'Train №',
    headerTraneName :'Train name',
    headerVagCount  :'Wagon count',
    title           :'Wagon and transfer lists',
    btnPrint        :"Print PDF",
    btnA4VagPrint   :"А4-Wagon list",
    btnA3VagPrint   :"А3-Wagon list",
    btnA4PerPrint   :"А4-Transfer list",
    btnA3PerPrint   :"А3-Transfer list"

});

Ext.define("TK.locale.de.controller.docs.Ved", {
    override        :"TK.controller.docs.Ved",
    titleEdit       :'Edit',
    waitMsg         :'Saving',
    btnSelect       :'Select',
    btnClose        :'Close',
    labelDocs :'Waybill list',
    headerNumClaim :'Waybill',
    headerVags :'Wagon №',
    headerCreate :'Creation date',
    headerKont :'Container №',
    headerTrain :'Train №',
    headerNstn :'Destination<br/>station',
    headerRoute :'Route',
    headerGng :'NHM',
    filterText: "Filter",
    claerAll: "Clear all",
    duplicateAll: "Duplicate all",
    duplicateEmpty: "Duplicate empty",

    labelFilter :   'Filter',
    filterHeader:   'Data',
    userfiltr: "Filter"

});

Ext.define("TK.locale.de.view.ved.Form", {
    override            :"TK.view.ved.Form",
    title               :'List',
    fldLblNum           :'List №',
    fldLblDate          :'Date',
    fldLblTrain         :'Train',
    fldLblTrainName     :'Train name',
    fldLblCarrOutName   :'Carrier from',
    fldLblCarrInName    :'Carrier to',
    fldLblStnOut        :'station',
    fldLblStnIn         :'station',
    fldLblRoadOut       :'From road',
    fldLblRoadIn        :'To road'

});

Ext.define("TK.locale.de.view.ved.VagsList", {
    override: "TK.view.ved.VagsList",
    title:          'Documents list',
    colTextIndex:   '№',
    colTextNvag:    'Wagon<br>№',
    colTextOwner:   'Wagons<br>owner',
    colTextKind:    'Wagons<br>kind',
    colTextGp:      'Wagons<br>max load,m.t.',
    colTextAxes:    'Axes<br>count',
    colTextTara:    'Wagones<br>tara,m.t.',
    colTextPlomb:   'Plombs',
    colTextKpl:     'Quantity',
    colTextZnak:    'Signs',
    colTextNstoF:   'Sealing<br>station',
    colTextNum:     'Waybill №',
    colTextDatpp:   'Shipping<br>date',
    colTextKsto:    'Departure st.<br>code',
    colTextNsto:    'Departure<br>station',
    colTextKstn:    'Arrival st.<br>code',
    colTextNstn:    'Arrival<br>station',
    colTextKontNum: 'Container<br>№',
    colTextKontType:'Container<br>type',
    colTextKontGp:  'Container<br>max load',
    colTextKontTara:'Container<br>tara',
    colTextPlaces:  'Places',
    colTextPack:    'Package',
    colTextGruz:    'Cargo code',
    colTextGruzName:'Cargo<br>name',
    colTextMbrt:    'Cargo<br>weight',
    colTextPrim:    'Notes',
    colTextPerVed:  'Transfer<br>list № ',
    btnAdd:         'Add',
    btnDelete:      'Delete',
    btnLoad:        'Close'
});

Ext.define("TK.locale.en.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Routes list',
    btnView: "Show documents"
});

Ext.define("TK.locale.de.view.pogruz.PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title       :'Züge',
    btnFind     :'Finden',
    btnFilter   :'Filter',
    btnClose    :'Schließen',
    btnReset    :'Zurücksetzen',
    lableDate   :'Startdatum',
    lableDate1  :'Enddatum',
    train       :'Zugnummer',
    count       :'Количество',
    btnOk       :'Anzahl',
    btnCancel   :'Cancel'
});

Ext.define("TK.locale.de.view.pogruz.SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title           :'CIM/СМГС nach Zugnummer',
    btnClose        :'Schließen',
    headerG694      :'Num<br/>CIM/SMGS',
    headerAltered   :'Datum der Änderung',
    btnOk           :'Anzahl',
    btnCancel       :'Cancel',
    headerContNum   :'Cont.<br/> Nummer',
    headerVagNum    :'Wagennummer',
    headertNstn     :'Bestimmungsstation'
});

Ext.define("TK.locale.de.view.pogruz.Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title           :'Loading list',
    headerWagN      :'Wagennummer<br/><b>list</b>',
    headerKonN      :'№ container<br/><b>list</b>',
    headerKonNdb    :'№ container<br/><b>db</b>',
    headerG694      :'№waybill<br/><b>list</b>',
    headerKlient    :'Owner<br/><b>list</b>',
    headerFoot      :'Größe foot<br/><b>list</b>',
    headerContSize  :'Ansicht<br/><b>list</b>',
    headerPlomb     :'Plomben<br/><b>list</b>',
    headerTara      :'Verpackung<br/>container<br/><b>list</b>',
    headerMaxLoad   :'Max load<br/>container<br/><b>list</b>',
    headerTaraVag   :'Tara<br/>wagen<br/><b>list</b>',
    headerMaxLoadVag:'Max load<br/>wagen<br/><b>list</b>',
    headerKolOs     :'Achse<br/><b>list</b>',
    headerId        :'Id<br/><b>db</b>',

    btnOk           :'Anzahl',
    btnCancel       :'Cancel',
});
Ext.define("TK.locale.de.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText           :'einträge pro seite'
});