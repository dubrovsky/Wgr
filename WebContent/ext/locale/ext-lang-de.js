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
 * German translation
 * 2007-Apr-07 update by schmidetzki and humpdi
 * 2007-Oct-31 update by wm003
 * 2009-Jul-10 update by Patrick Matsumura and Rupert Quaderer
 * 2010-Mar-10 update by Volker Grabsch
 */
Ext.onReady(function() {
    
    if (Ext.Date) {
        Ext.Date.monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        
        Ext.Date.defaultFormat = 'd.m.Y';

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            "M\u00e4r": 2,
            Apr: 3,
            Mai: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Okt: 9,
            Nov: 10,
            Dez: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.util.Format.__number = Ext.util.Format.number;
        Ext.util.Format.number = function(v, format) {
            return Ext.util.Format.__number(v, format || "0.000,00/i");
        };

        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // German Euro
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
    dragText: "{0} Zeile(n) ausgewählt"
});

Ext.define("Ext.locale.de.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Diesen Tab schließen"
});

Ext.define("Ext.locale.de.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Bitte warten..."
});

Ext.define("Ext.locale.de.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Der Wert des Feldes ist nicht korrekt"
});

Ext.define("Ext.locale.de.LoadMask", {
    override: "Ext.LoadMask",
    loadingText: "Lade Daten..."
});

Ext.define("Ext.locale.de.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Lade Daten..."
});

Ext.define("Ext.locale.de.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Heute",
    minText: "Dieses Datum liegt von dem erstmöglichen Datum",
    maxText: "Dieses Datum liegt nach dem letztmöglichen Datum",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: "Nächster Monat (Strg/Control + Rechts)",
    prevText: "Vorheriger Monat (Strg/Control + Links)",
    monthYearText: "Monat auswählen (Strg/Control + Hoch/Runter, um ein Jahr auszuwählen)",
    todayTip: "Heute ({0}) (Leertaste)",
    format: "d.m.Y",
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
    afterPageText: "von {0}",
    firstText: "Erste Seite",
    prevText: "vorherige Seite",
    nextText: "nächste Seite",
    lastText: "letzte Seite",
    refreshText: "Aktualisieren",
    displayMsg: "Anzeige Eintrag {0} - {1} von {2}",
    emptyMsg: "Keine Daten vorhanden"
});

Ext.define("Ext.locale.de.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Bitte geben Sie mindestens {0} Zeichen ein",
    maxLengthText: "Bitte geben Sie maximal {0} Zeichen ein",
    blankText: "Dieses Feld darf nicht leer sein",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.de.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Der Mindestwert für dieses Feld ist {0}",
    maxText: "Der Maximalwert für dieses Feld ist {0}",
    nanText: "{0} ist keine Zahl"
});

Ext.define("Ext.locale.de.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "nicht erlaubt",
    disabledDatesText: "nicht erlaubt",
    minText: "Das Datum in diesem Feld muss nach dem {0} liegen",
    maxText: "Das Datum in diesem Feld muss vor dem {0} liegen",
    invalidText: "{0} ist kein gültiges Datum - es muss im Format {1} eingegeben werden",
    format: "d.m.Y",
    altFormats: "j.n.Y|j.n.y|j.n.|j.|j/n/Y|j/n/y|j-n-y|j-n-Y|j/n|j-n|dm|dmy|dmY|j|Y-n-j|Y-m-d",
    startDay: 1
});

Ext.define("Ext.locale.de.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Lade Daten ..."
    });
});

Ext.define("Ext.locale.de.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Dieses Feld sollte eine E-Mail-Adresse enthalten. Format: "user@example.com"',
    urlText: 'Dieses Feld sollte eine URL enthalten. Format: "http:/' + '/www.example.com"',
    alphaText: 'Dieses Feld darf nur Buchstaben enthalten und _',
    alphanumText: 'Dieses Feld darf nur Buchstaben und Zahlen enthalten und _'
});

Ext.define("Ext.locale.de.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Bitte geben Sie die URL für den Link ein:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Fett (Ctrl+B)',
                text: 'Erstellt den ausgewählten Text in Fettschrift.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Kursiv (Ctrl+I)',
                text: 'Erstellt den ausgewählten Text in Schrägschrift.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Unterstrichen (Ctrl+U)',
                text: 'Unterstreicht den ausgewählten Text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Text vergößern',
                text: 'Erhöht die Schriftgröße.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Text verkleinern',
                text: 'Verringert die Schriftgröße.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text farblich hervorheben',
                text: 'Hintergrundfarbe des ausgewählten Textes ändern.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Schriftfarbe',
                text: 'Farbe des ausgewählten Textes ändern.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Linksbündig',
                text: 'Setzt den Text linksbündig.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Zentrieren',
                text: 'Zentriert den Text in Editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Rechtsbündig',
                text: 'Setzt den Text rechtsbündig.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Aufzählungsliste',
                text: 'Beginnt eine Aufzählungsliste mit Spiegelstrichen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numerierte Liste',
                text: 'Beginnt eine numerierte Liste.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Erstellt einen Hyperlink aus dem ausgewählten text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source bearbeiten',
                text: 'Zur Bearbeitung des Quelltextes wechseln.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.de.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Aufsteigend sortieren",
    sortDescText: "Absteigend sortieren",
    lockText: "Spalte sperren",
    unlockText: "Spalte freigeben (entsperren)",
    columnsText: "Spalten"
});

Ext.define("Ext.locale.de.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Keine)',
    groupByText: 'Dieses Feld gruppieren',
    showGroupsText: 'In Gruppen anzeigen'
});

Ext.define("Ext.locale.de.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Name",
    valueText: "Wert",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.de.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "wahr",
    falseText: "falsch"
});

Ext.define("Ext.locale.de.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0.000,00/i'
});

Ext.define("Ext.locale.de.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'd.m.Y'
});

Ext.define("Ext.locale.de.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "Die Zeit muss gleich oder nach {0} liegen",
    maxText: "Die Zeit muss gleich oder vor {0} liegen",
    invalidText: "{0} ist keine gültige Zeit",
    format: "H:i"
});

Ext.define("Ext.locale.de.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "Du mußt mehr als einen Eintrag aus der Gruppe auswählen"
});

Ext.define("Ext.locale.de.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "Du mußt einen Eintrag aus der Gruppe auswählen"
});

Ext.define("Ext.locale.de.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Abbrechen",
        yes: "Ja",
        no: "Nein"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.de.Component", {	
    override: "Ext.Component"
});

//////////////////////////////////
// TK Portal locale costants  ////
/////////////////////////////////

Ext.define("TK.locale.de.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'JSC "TransContainer" Portal',
    headerUser   :'User: ',
    headerLangLbl:'Language selection: '
});

Ext.define("TK.locale.de.view.MenuTree", {
    override    :"TK.view.MenuTree",
    title       :'Menu',
    treeUsers   :'Users',
    treeProjects:'Projects',
    treeLogs    :'Logs',
    btnStat     :'Statistics',
    btnPrnTmpl  :"Print templates",
    treeDirs    :'Handbooks',
    treeInstr   :'User guide',
    treeExit    :'Exit'
});

Ext.define("TK.locale.de.view.DocsList", {
    override:"TK.view.DocsList",

    btnStat    :'Statistics',
    btnPrint   :'Print PDF',
    btnCreate  :'Create',
    btnCopy    :'Copy',
    btnEdit    :'Edit',
    btnDelete  :'Delete',
    btnMakeSmgs:'Create SMGS',
    btnMakeCimSmgs:'Create CIM/SMGS',
    btnAppend2Smgs:'Append to SMGS',
    btnAppend2CimSmgs:'Append to CIM/SMGS',
    btnMakeGU  :'Create GU',
    btnDownload:'Download',
    btnHistory :'History',
    btnBindPrint :'Bind print',
    btnExch    :'Exchange',
    btnExchTBC :'TBC',
    btnExchBCh1:'Open/close for edit.',
    btnExchBCh :'BCH',
    btnExchTdgFTS:'TDG',
    btnExchFTS :'FTS',
    btnExchBTLC:'BTLC',
    btnReports :'Reports',
    btnView    :'View',

    btnContsList :'Cont. list',
    btnDopList:'Erganzungsblatt',
    btnContsList1 :'List',
    btnSmgs :'Smgs',

    btnPlusDocs :'+ Docs',
    btnPlusSmgsInv :'+ Smgs & Invoices',
    btnPlusInv :'+ Invoices',

    headerID          :'ID',
    headerProject          :'Project',
    headerRoute          :'Route',
    headerDoc          :'Doc',
    headerCreation    :'Creation',
    headerDateTime    :'Date and time',
    headerUser        :'User',
    headerSenderName  :'Consignor`s<br/>name',
    headerReceiverName:'Cinsignee`s<br/>name',
    headerContNum     :'Container<br/>number',
    headerDescr       :'Description',
    headerInv           :'Invoices',
    headerNPoezd      :'Train<br/>No.',
    headerVagNum      :'Wagon<br/>number',
    headerFileName    :'File name',
    headerContentType :'Content<br/>type',
    headerSizeByte    :'Size, byte',

    warnTitle:'Warning',
    warnMsg  :'You must select a row from the table with data',

    txtForApproval:'For approval',
    txtApproved:'Approved',
    txtNotApproved:'Not approved',
    txtBlocked:'Blocked'
});

Ext.define("TK.locale.de.view.slovnakl.List", {
    override        :"TK.view.slovnakl.List",
    headerSlov       :'Slovak bill',
    title           :'Slovak bill'
});

Ext.define("TK.locale.de.view.printtmpl.List", {
    override    :"TK.view.printtmpl.List",
    title       :'Printing templates',
    headerName  :'Name',
    headerRoutes:'Routes',
    headerDefault:'Default?',
    headerBlank: 'With blank?',

    btnBindToRoute: 'Bind to route',
    btnBindToBlank: 'Bind to blank',
    btnBlanks: 'Blanks'
});

Ext.define("TK.locale.de.stat.List", {
    override    :"TK.view.stat.List",
    title       :'Statistics'
});

Ext.define("TK.locale.de.view.aviso.List", {
    override:"TK.view.aviso.List",

    headerStatus  :'Status',
    headerInstrNum:'Instruction No.',

    headerGNG:'GNG',

    statusBlocked  :'Blocked',
    status4Approval:'For approval',
    statusAgreed   :'Agreed',
    statusNotAgreed:'NOT agreed',

    title:'SMGS instructions register'

});

Ext.define("TK.locale.de.view.avisocimsmgs.List", {
    override:"TK.view.avisocimsmgs.List",

    headerStatus  :'Status',
    headerInstrNum:'Instruction No.',

    headerGNG:'GNG',

    statusBlocked  :'Blocked',
    status4Approval:'For approval',
    statusAgreed   :'Agreed',
    statusNotAgreed:'NOT agreed',

    title:'CIM/SMGS instructions register'

});

Ext.define("TK.locale.de.view.avisogu29k.List", {
    override:"TK.view.avisogu29k.List",

    headerStatus  :'Status',
    headerInstrNum:' Instruction No.',
    headerGNG     :'GNG',

    statusBlocked  :'Blocked',
    status4Approval:'For approval',
    statusAgreed   :'Agreed',
    statusNotAgreed:'NOT agreed',

    title:'GU instructions register'

});

Ext.define("TK.locale.de.view.cim.List", {
    override :"TK.view.cim.List",
    headerCim:'CIM',
    title    :'CIM register'

});

Ext.define("TK.locale.de.view.cimsmgs.List", {
    override        :"TK.view.cimsmgs.List",
    headerCimsmgs   :'CIM/SMGS',
    title           :'CIM/SMGS register',
    headerDateTransp:'Date of trans.',
    headerExchBch   :'Iftmin'
});

Ext.define("TK.locale.de.view.cmr.List", {
    override :"TK.view.cmr.List",
    headerCMR:'CMR',
    title    :'CMR register'

});

Ext.define("TK.locale.de.view.epd.List", {
    override:"TK.view.epd.List",
    title   :'EPD register'

});

Ext.define("TK.locale.de.view.gu27v.List", {
    override      :"TK.view.gu27v.List",
    headerGu27v   :'GU-27v',
    headerAvisoNum:'Aviso No.',
    title         :'GU register'

});

Ext.define("TK.locale.de.view.gu29k.List", {
    override      :"TK.view.gu29k.List",
    headerGu29k   :'GU-29�',
    headerAvisoNum:'Aviso No.',
    title         :'GU register'

});

Ext.define("TK.locale.de.view.invoice.List", {
    override:"TK.view.invoice.List",
    title   :'Invoices register'

});

Ext.define("TK.locale.de.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'SMGS list',
    headerSmgs    :'SMGS',
    headerExchTBC :'TBC',
    headerExchBch :'Iftmin',
    headerAvisoNum:'Aviso No.'
});

Ext.define("TK.locale.de.view.file.List", {
    override:"TK.view.file.List",
    title   :'Schedules register'
});

Ext.define("TK.locale.de.view.logs.List", {
    override    :"TK.view.logs.List",
    title       :'Portal logs',
    headerDate  :'Date',
    headerUser  :'User',
    headerHost  :'Host',
    headerAgent :'Runtime',
    headerLog   :'Log',
    headerThread:'Flow',
    headerFile  :'File',
    headerMethod:'Method',
    btnFilter   :'Filter'
});

Ext.define("TK.locale.de.view.project.List", {
    override    :"TK.view.project.List",
    title       :'List of projects',
    headerName  :'Name',
    headerGroups:'Groups',
    headerRoutes:'Routes',
    btnCreate   :'Create',
    btnEdit     :'Edit',
    btnDelete   :'Delete',
    delMsg1     :'Deleting...',
    delMsg2     :'Are you sure you want to delete current Project?'
});

Ext.define("TK.locale.de.view.user.List", {
    override      :"TK.view.user.List",
    title         :'List of users',
    headerUn      :'Login',
    headerName    :'Name',
    headerGroup   :'Group',
    headerGroups  :'Additional groups',
    headerPrivileg:'Privileges',
    headerLocked  :'Locked?',
    headerSu      :'Admin?',
    headerEmail   :'E-mail',
    btnCreate     :'Create',
    btnEdit       :'Edit',
    btnRefresh    :'Refresh',

    textYes: 'yes',
    textNo: 'no'
});

Ext.define("TK.locale.de.view.user.ListGroups", {
    override   :"TK.view.user.ListGroups",
    title      :'List of groups',
    headerName :'Name',
    headerDescr:'Description',
    btnSelect  :'Select',
    btnAdd     :'Add',
    btnEdit    :'Edit',
    btnRefresh :'Refresh',
    btnClose   :'Close'
});

Ext.define("TK.locale.de.view.user.ListPrivs", {
    override   :"TK.view.user.ListPrivs",
    title      :'List of privileges',
    headerName :'Name',
    headerDescr:'Description',
    btnSelect  :'Select',
    btnRefresh :'Refresh ',
    btnClose   :'Close'
});

Ext.define("TK.locale.de.view.user.Form", {
    override       :"TK.view.user.Form",
    title          :'Editor',
    labelLogin     :'Login<span class="x-required">*</span>',
    labelLogin1    :'Login:',
    labelPass      :'Password<span class="x-required">*</span>',
    labelPass1     :'Password confirmation<span class="x-required">*</span>',
    labelPass2     :'New password:',
    labelFIO       :'Name(surname, name)',
    labelEmail     :'E-mail',
    labelLocked    :'Locked?',
    labelSu        :'Admin?',
    labelGroup     :'Group<span class="x-required">*</span>',
    labelGroups    :'Additional groups',
    labelPrivs     :'Privileges',
    btnSave        :'Save',
    btnClose       :'Close',
    vTypeLabelPass :'Passwords do not match, this field must contain only letters, numbers and _',
    vTypeLabelLogin:'User with this username already exist, this field must contain only letters, numbers and _'
});

Ext.define("TK.locale.de.view.user.FormGroups", {
    override    :"TK.view.user.FormGroups",
    title       :'Editor',
    vTypeLabelGr:'Group with this name already exist, this field must contain only letters, numbers and _',
    labelName   :'Name<span class="x-required">*</span>',
    labelName1  :'Name:',
    labelDescr  :'Description',
    btnSave     :'Save',
    btnClose    :'Close'
});

Ext.define("TK.locale.de.view.project.Form", {
    override        :"TK.view.project.Form",
    title           :'Edit the Projet',
    btnSave         :'Save',
    btnSaveExit     :'Save and exit',
    btnClose        :'Close',
    btnSelect       :'Select',
    labelProjectName:'Name',
    labelGroups     :'Groups',
    labelRoutes     :'Routes',
    labelSelected   :'Selected',
    labelAvailable  :'Available',
    headerName      :'Name',
    headerDescr     :'Description',
    saveMsg         :'Data saving�'
});

Ext.define("TK.locale.de.view.edit.DetailGrid", {
    override :"TK.view.edit.DetailGrid",
    btnAdd   :"Add",
    btnDelete:"Delete",
    btnCopy  :"Copy",
    btnOk    :'Ok',

    headerName         :'Name',
    headerRoutesGr     :'Groups',
    headerRoutesDocs   :'Documents',
    headerRoutesCodeTbc:'TBC code',
    headerRoutesCodeCustoms:'Customs code',
    headerRoutesEmailMask: 'Email, mask',
    headerContNum      :'Number',
    headerContSize     :'Size',
    headerContVid      :'Type',
    headerContNum1     :'Number',
    headerContSize1    :'Size',
    headerContVid1     :'Type',
    headerCodeTNVED    :'TNVED code',
    headerPack: 'Package',
    headerPackVid: 'Type',
    headerPackKod: 'Code',
    headerGoodsDescr   :'Goods description',
    headerPackage      :'Package type',
    headerPackNum      :'quantity of pack./places',
    headerBrutto       :'gross weight (kg)',
    headerNetto        :'net weight (kg)',
    headerQuantity     :'quantity',
    headerProdUnit     :'Goods unit of measure',
    headerProdPrice    :'Goods unit price',
    headerTotalValue   :'total value',
    headerType         :'type',
    headerTotal        :'Total:',

    titleColumn: 'Column',
    titleDesc: 'Description',
    titleCoordLeft: 'Coordinates of left<br/>bottom angle, mm',
    titleCoordRight: 'Coordinates of right<br/>upper angle, mm',
    titleColumnFont: 'Font for column',
    titleColumnFontName: 'Name',
    titleColumnFontSize: 'Size',
    titleColumnFontBold: 'Bold?',
    titleColumnFontUpper: 'Upper?',
    titleColumnFontSpace: 'Line spacing',
    titleRotate: 'Rotate',
    titleBorder: 'Border?',
    titleStroke: 'Underline?',
    titlePage: 'Page',
    titlePrint: 'Print?',
    titleTable: 'Table?',
    titlePhrases: 'Phrases?'
});

Ext.define("TK.locale.de.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    btnSave :'Save',
    btnClose:'Close'
});

Ext.define("TK.locale.de.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'Add',
    btnDelete:'Delete'
});

Ext.define("TK.locale.de.view.DocsForm", {
    override      :"TK.view.DocsForm",
    btnSave       :'Save',
    btnSaveExit   :'Save and Exit',
    btnSavePrint  :'Save and Print PDF',
    btnClose      :'Close',
    btnSign       :'Sign ECP',
    btnChange     :'Change',
    btnChangeWagen:'Change the wagon',
    btnChangeCont :'Change the container',
    btnChangeGr   :'Change the cargo',
    btnCopyEpd    :'Copy from EPD',
    btnCopy20     :'Copy to column 20',
    btnTbcReady   :'TBC ready',
    btnTbcNotReady:'TBC cancel',
    btnBchReady   :'Iftmin ready',
    btnBchNotReady:'Iftmin cancel',
    btnFtsReady   :'FTS ready',
    btnFtsNotReady:'FTS cancel',

    labelNotes:'Note ',

    labelSender     :'Consignor',
    labelName       :'Name',
    labelName1      :'Name',
    labelNameEu     :'Name EU',
    labelNameRu     :'Name (RU)',
    labelNameCh     :'Name (CN)',
    labelDate       :'Date',
    labelTotal      :'Total',
    labelCountry    :'Country',
    labelCountryRu  :'Country (RU)',
    labelCountryCode:'Country code',
    labelZip        :'Zip code',
    labelCity       :'City',
    labelCityRu     :'City(RU)',
    labelAdress     :'Address',
    labelAdressRu   :'Address(RU)',
    labelReceiver   :'Consignee',

    labelPayers     :'Payers',
    labelBukvKod    :'Railroad administration`s code (letters)',
    labelBukvKodRu  :'Railroad administration`s code (letters)RU',
    labelPayerName  :'Payer`s name',
    labelPayerNameRu:'Payer`s name(RU)',
    labelThrough    :'Through what',
    labelPayerKod1  :'Payer`s code',
    labelPayerKod2  :'Payer`s subcode of the code',
    labelPayerKod3  :'Payer`s subcode of the subcode',
    labelPayerKod4  :'Additional field for code',
    labelPayment    :'Payment method',
    labelPaymentRu  :'Payment method(RU)',

    labelConts   :'Containers',
    labelSize    :'Size',
    labelSizeMm  :'Size(mm)',
    labelNotes  :'Text before Container No.',
    labelCategory:'Category',
    labelContNum :'Container No.',
    labelDescr   :'Desciption',
    labelVid     :'Type',

    labelCargo    :'Cargo',
    labelCode     :'Code',
    labelNetto    :'Gross weight',
    labelTara     :'Tara',
    labelBrutto   :'Gross weight ',
    labelCodeGng  :'GNG code',
    labelNameRuGng:'Name(RU)',
    labelNameChGng:'Name(CN)',
    labelCodeEtsng:'Code ET SNG',
    labelNameEtsng:'Name',
    labelMassa    :'Weight, kg',
    labelMesta    :'Places',
    llabelPack     :'Package(ru)',
    labelPackForeign:'Package',

    labelCodeStn     :'Station code',
    labelBorderStn   :'Borders stations',
    labelCodeDoc     :'Document`s code',
    labelText        :'Text',
    labelTextEu      :'Text EU',
    labelTextRu      :'Text(RU)',
    labelSenderDocs  :'Documents attached by consignor',
    labelCustomsCode :'Customs code',
    labelDocNum      :'Document No.',
    labelCommercTerms:'Commercial terms',
    labelPogrStn: 'Выходные пограничные станции',

    labelWagons       :'Wagons',
    labelWagonNum     :'Wagon No.',
    labelWagonsTonnage:'Tonnage',
    labelWagonsTara   :'Tara',
    labelWagonsAxes   :'Axes',

    labelZayavSenderPayers:'Consignor`s/payer`s application',
    labelZayavSender      :'Consignor`s application',
    labelSenderNotes      :'Consignor`s special notes',
    labelFile             :'File',
    labelFileSearch       :'Review...',
    labelWagenNum         :'Train number:',
    labelDocSort         :'Serial number:',
    labelDocSummary :'Consolidated:',

    labelTGNL: 'Code TGNL:',
    labelOKPO: 'Code OKPO:',
    labelINN: 'Code INN:',

    labelVagKontGruz: 'Car/Container/Cargo'

});

Ext.define("TK.locale.de.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.de.view.aviso2.Form", {
    override:"TK.view.aviso2.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.de.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.de.view.avisocimsmgs.Form", {
    override:"TK.view.avisocimsmgs.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total CIM/SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.de.view.avisogu29k.Form", {
    override:"TK.view.avisogu29k.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelVsegoGU    :'TOTAL GU',
    labelZakazNum   :'Order number',
    labelSender1    :'Consignor',
    labelReceiver1  :'Consignee',
    labelStnSender  :'Departure station',
    labelStnReceiver:'Destination station',
    labelPayers1    :'Payer',
    labelCodesTill  :'Codes are valid till',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27'
});

Ext.define("TK.locale.de.view.avisogu29k.Form1", {
    override:"TK.view.avisogu29k.Form1",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelVsegoGU    :'TOTAL GU',
    labelZakazNum   :'Order number',
    labelSender1    :'Consignor',
    labelReceiver1  :'Consignee',
    labelStnSender  :'Departure station',
    labelStnReceiver:'Destination station',
    labelPayers1    :'Payer',
    labelCodesTill  :'Codes are valid till',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27'
});

Ext.define("TK.locale.de.view.cim.Form", {
    override:"TK.view.cim.Form",

    labelWagonOtpr  :'Dispatch No.',
    labelContPrivate:'Private("P")'
});

Ext.define("TK.locale.de.view.slovnakl.Form", {
    override:"TK.view.slovnakl.Form",

    labelWagonOtpr  :'Dispatch No.'
});

Ext.define("TK.locale.de.view.cimsmgs.Form", {
    override:"TK.view.cimsmgs.Form",
    labelDopList: 's.Ergänzungsblatt'
});

Ext.define("TK.locale.de.view.cmr.Form", {
    override:"TK.view.cmr.Form"
});

Ext.define("TK.locale.de.view.epd.Form", {
    override:"TK.view.epd.Form",

    labelSenderName    :'Consignor`s name',
    labelSenderAdress  :'Consignor`s address',
    labelReceiverName  :'Consignee`s name',
    labelReceiverAdress:'Consignee`s address',
    labelStnSenderName :'Departure station name',
    labelStnSenderCode :'Departure station code',
    labelStnReceiverName :'Consignee`s station name',
    labelStnReceiverCode :'Consignee`s station code'
});

Ext.define("TK.locale.de.view.file.Form", {
    override:"TK.view.file.Form",

    labelGeneralInfo :'General information',
    labelDownloadFile:'Download file'
});

Ext.define("TK.locale.de.view.gu27v.Form", {
    override:"TK.view.gu27v.Form"
});

Ext.define("TK.locale.de.view.gu29k.Form", {
    override:"TK.view.gu29k.Form"
});

Ext.define("TK.locale.de.view.invoice.Form", {
    override:"TK.view.invoice.Form",

    labelType           :'Type',
    labelOtprNum        :'Dispatch No.',
    labelContractNum    :'Contract No.',
    labelContractDate   :'Contract date',
    labelSellerName     :'Seller`s name',
    labelSenderName     :'Consignor`s name',
    labelSellerAdress   :'Seller`s address',
    labelSenderAdress   :'Consignor`s address',
    labelSenderCountry  :'Consignor`s country, code',
    labelSenderZip      :'Consignor`s zip code',
    labelSenderCity     :'Consignor`s city',
    labelBuyerName      :'Buyer`s name',
    labelReceiverName   :'Consignee`s name',
    labelReceiverCountry:'Consignee`s country, code',
    labelReceiverZip    :'Consignee`s zip code',
    labelReceiverCity   :'Consignee`s city',
    labelBuyerAdress    :'Buyer`s address',
    labelReceiverAdress :'Consignee`a address',
    labelDeliveryCode   :'Code of delivery terms',
    labelDeliveryPlace  :'Point of delivery',
    labelCurrency       :'Invoice currency',
    labelNote           :'Note',

    lableCombo1: 'Invoice',
    lableCombo2: 'Счет-фактура',
    lableCombo3: 'Приложение к инвойсу',
    lableCombo4: 'Грузовая ведомость',
    lableCombo5: 'Манифест'
});

Ext.define("TK.locale.de.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd:'Add'
});

Ext.define("TK.locale.de.view.nsi.ListDir", {
    override:"TK.view.nsi.ListDir",

    title       :'List of handbooks',
    btnView     :'View',
    btnUploadDir:'Upload handbook',
    btnExportDir:'Export to Excel',
    headerName  :'Name',
    warnTitle:'Warning',
    warnMsg  :'You must select a row from the table with data'
});

Ext.define("TK.locale.de.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum     :'Wagon No.(col.27)',
    labelWagonsTonnage:'Tonnage (col.28)',
    labelWagonsTara   :'Tara (col.30)',
    labelWagonsAxes   :'Axes (col.29)',
    labelContNum      :'Number (col.9;19)',
    labelSize         :'Size (col.9)',
    labelVid          :'Type (col.18)'
});

Ext.define("TK.locale.de.view.stat.Form", {
    override:"TK.view.stat.Form",

    lableDate          :'Date of creation',
    lableDate1         :'from',
    lableDate2         :'till',
    lableZakazNum      :'Order number',
    lableStatus        :'Status',
    lableUser          :'User',
    lableCountrySender :'Country of dispatch',
    lableCountryRceiver:'Country of destination',
    lableStnPogr       :'Border station',
    lableStnSender     :'Station of departure',
    lableStnReciver    :'Station of destination',
    lableSender        :'Consignor',
    lableReceiver      :'Consignee',
    lableCargoName     :'Description of cargo',
    lableContSize      :'Container`s size type',
    lablePayer         :'Payer for tariff and service',
    lableKontNum         :'# container',

    btnFind :'Find',
    btnClose:'Close',
    btnReset:'Reset',
    lableCombo1: 'Инстр. для согл. агентом',
    lableCombo2: 'Инстр. согл-на агентом',
    lableCombo3: 'Инстр. НЕсогл-на агентом',
    lableCombo4: 'Инстр. blocked',
    lableCombo5: 'Printed'
});

Ext.define("TK.locale.de.controller.exchange.Senders", {
    override:"TK.controller.exchange.Senders",

    waitMsg  :'File download...',
    waitMsg1 :'Save data in progress...',
    maskMsg  :'Data request...',
    showTitle:'Attention',
    showMsg1 :'Was sent!',
    showMsg2 :'Mistake!',
    showMsg3 :'Saved!',
    errorMsg :'Attention! Mistake...',

    btnClose :'Close',
    btnSave  :'Save',
    btnExport:'Export FTS',

    titleFTS    :'Exchange with FTS',

    labelWagenNum   :'Train number:',
    labelWagenNums   :'Train number(-s[,]):',
    labelWagenInd   :'Train index:',
    labelPPVInd     :':',
    labelInputDate  :':'
});

Ext.define("TK.locale.de.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg  :'Data request...',
    errorMsg :'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.Docs", {
    override:"TK.controller.Docs",

    titleList   :'List ',
    titleEdit   :'Edit',
    titleCopy   :'Copy ',
    titletPrint :'Print',
    titletStat  :'Statistics',
    titleReports:'Reports',
    titleHistory:'Document`s history',
    titleUpload :'Instruction loading in XML format',
    titleFTS    :'Exchange with FTS',
    titleContList:'Enter train num(-s[,])',

    lableSettings  :'Setting',
    lableFace      :'Front',
    lableBack      :'Back',
    lableTraneNum  :'Train(number)',
    labelSelectFile:'Select file for the upload...',
    labelFile      :'File',
    labelUn        :'Login',
    labelUnName    :'Name',
    labelUnEmail   :'Email',
    labelUnGroup   :'Group',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27',
    labelWagenNum   :'Train number:',
    labelWagenNums   :'Train number(-s[,]):',
    labelWagenInd   :'Train index:',
    labelPPVInd     :':',
    labelInputDate  :':',

    btnPrint :'Print',
    btnFind  :'Find',
    btnSearch:'Overview...',
    btnClose :'Close',
    btnSave  :'Save',
    btnExport:'Export FTS',
    btnContList  :'List',
    btnSmgs  :'Document',

    delTitle :'Deletion...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg  :'Data request...',
    showTitle:'Attention',
    showMsg1 :'Was sent!',
    showMsg2 :'Mistake!',
    showMsg3 :'Saved!',
    errorMsg :'Attention! Mistake...',
    waitMsg  :'File download...',
    waitMsg1 :'Save data in progress...',

    headerData:'Creation data',
    headerMsg :'Message',
    headerWho :'Who?'
});

Ext.define("TK.locale.ru.controller.Doc2Doc", {
    override:"TK.controller.Doc2Doc",

    titleDownldInv:'Download Invoices',
    errorMsg:'Attention! Mistake...',
    btnClose :'Close',
    btnSave  :'Save',
    btnFind  :'Find',

    btnContList  :'List',
    btnSmgs  :'Document',
    titleContList:'Enter train num(-s[,])',
    labelWagenNums :'Train number(-s[,]):'
});

Ext.define("TK.locale.de.controller.Ajax", {
    override:"TK.controller.Ajax",

    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.docs.Cimsmgs", {
    override:"TK.controller.docs.Cimsmgs",

    titleOtpr         :'Handbook of consignors/consignees',
    headerOtprName    :'Name',
    headerOtprName1   :'Name, RU',
    headerOtprEmail   :'E-mail',
    headerOtprPhone   :'Phone',
    headerOtprStrCode :'Country code',
    headerOtprStr     :'Country',
    headerOtprStr1    :'Country, RU',
    headerOtprZip     :'Zip code',
    headerOtprCity    :'City',
    headerOtprCity1   :'City, RU',
    headerOtprAdress  :'Address',
    headerOtprAdress1 :'Address, RU',
    headerOtprVat     :'VAT',
    headerOtprSendCode:'Consignor`s/consignee`s code',
    headerOtprClCode  :'Client`s code'
});

Ext.define("TK.locale.de.controller.docs.Cmr", {
    override:"TK.controller.docs.Cmr"
});

Ext.define("TK.locale.de.controller.docs.Epd", {
    override:"TK.controller.docs.Epd"
});

Ext.define("TK.locale.de.controller.docs.File", {
    override:"TK.controller.docs.File",

    waitMsg1:'Save data in progress...',
    delTitle:'Deleting...',
    delMsg  :'Are you sure you want to delete...?',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.docs.Gu27v", {
    override:"TK.controller.docs.Gu27v",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.de.controller.docs.Gu29k", {
    override:"TK.controller.docs.Gu29k",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.de.controller.docs.Invoice", {
    override:"TK.controller.docs.Invoice",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.de.controller.Logs", {
    override:"TK.controller.Logs",

    titleFilter:'Filter',
    lableDate  :'Creation data',
    lableDate1 :'from',
    lableDate2 :'till',
    labelUser  :'User',

    btnFind:'Find'
});

Ext.define("TK.locale.de.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.de.controller.Project", {
    override:"TK.controller.Project",

    maskMsg  :'Data request...',
    errorMsg :'Attention! Mistake...',
    showTitle:'Attention! Deleting not allowed...',
    showMsg  :'If you want to delete the Project, please, delete all EPD from routes first'
});

Ext.define("TK.locale.de.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'EPD is not downloaded',
    titleDownldInv:'Download Invoices',
    msgEpd  :'Click on the link with EPD to start the download',
    errorMsg:'Attention! Mistake...',
    btnClose :'Close',
    btnSave  :'Save',
    btnFind  :'Find'
});

Ext.define("TK.locale.de.controller.User", {
    override:"TK.controller.User",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...',
    waitMsg1:'Save data in process...'
});

Ext.define("TK.locale.de.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Upload handbook',
    labelSelectFile:'Select file for the upload...',
    labelFile      :'File',
    btnSave        :'Save',
    btnClose       :'Close',
    btnSearch      :'Overview...'
});

Ext.define("TK.locale.de.view.nsi.List", {
    override:"TK.view.nsi.List",

    title1           :"Groups",
    titleRoad        :'List of railroads',
    titleRoute        :'Handbook of routes',
    titleProject        :'Handbook of projects',
    titleManagement  :'Handbook of railroads administrations',
    titleSta         :'Handbook of railroads stations',
    titleCountries   :'Handbook of countries',
    titleCountriesZhd:'Handbook of railroads countries',
    titleDangerous   :'Handbook of dangerous cargo',
    titleKarantin    :'Handbook of quarantine cargo',
    titleVeterin     :'Handbook of veterinary cargo',
    titleGng         :'Handbook of GNG codes',
    titleEtsng       :'Handbook of ETSNG codes',
    titleDocs        :'Handbook of documents types',
    titlePlat        :'Handbook of payers by railroads (forwarders)',
    titleOtpr        :'Handbook of juridical persons (consignors/consignees)',
    titleDocs1       :'Documents handbook',
    titleCurrency    :'Currency handbook',
    titleTnved       :'TNVED handbook',
    titleDeliv       :'Handbook of delivery terms',
    titleUpak        :'Handbook of package types',

    headerName       :'Name',
    headerProject       :'Project',
    headerRoute       :'Route',
    headerDescr      :'Description',
    headerCode       :'Code',
    headerCountry    :'Country',
    headerStn        :'Station(RU)',
    headerStn1       :'Station(CN)',
    headerStn2       :'Station(EN)',
    headerZhD        :'Railroad',
    headerCodeAdm    :'Adm. code',
    headerWay        :'Road',
    headerWayCode    :'Road code',
    headerCoedEdi    :'Code UN/EDIFACT',
    headerCustCode   :'Custom`s code',
    headerName1      :'Name(RU)',
    headerName2      :'Name(CH)',
    headerName3      :'Name(other)',
    headerPayerMeth  :'Payment method',
    headerPayerCode  :'Payer`s code',
    headerPayerCode1 :'Subcode of the code',
    headerPayerCode2 :'Subcode of the subcode',
    headerCountryCode:'Country code',
    headerCountryName:'Country name',
    headerCity       :'City',
    headerAddress    :'Address',

    ttipSave:'Save',
    ttipDel :'Delete',
    btnClose:'Close'
});

Ext.define("TK.locale.de.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",

    labelName1      :'Name',
    labelWagons       :'Wagons',
    labelWagonNum     :'Wagon No.',
    labelWagonsTonnage:'Tonnage',
    labelWagonsTara   :'Tara',
    labelWagonsAxes   :'Axes',
    labelConts   :'Containers',
    labelSize    :'Size',
    labelSizeMm  :'Size(mm)',
    labelTaraCont: 'Tara, weight',
    labelNotes  :'Note ',
    labelCategory:'Category',
    labelContNum :'Container No.',
    labelDescr   :'Desciption',
    labelVid     :'Type',
    labelCargo    :'Cargo',
    labelCode     :'Code',
    labelNetto    :'Gross weight',
    labelTara     :'Tara',
    labelBrutto   :'Gross weight',
    labelCodeGng  :'GNG code',
    labelNameRuGng:'Name(RU)',
    labelNameChGng:'Name(CN)',
    labelCodeEtsng:'Code ET SNG',
    labelNameEtsng:'Name',
    labelMassa    :'Weight, kg',
    labelMesta    :'Places',
    labelPack     :'Package(ru)',
    labelPackForeign:'Package'
});


Ext.define("TK.locale.de.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Customs code',
    labelTextRu: 'Text(RU)',
    labelText: 'Text',
    labelDocNum: 'Document No.',
    labelDate: 'Date',
    labelTotal: 'Total'
});

Ext.define("TK.locale.de.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plomb',
    labelTotal: 'Total'
});

Ext.define("TK.locale.de.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Print settings",
    labelBlank: "With blank?",
    textPrint: "Print",
    textPages: 'Pages for print',
    textPage: 'Page ',
    textPageBack: '(back)'
});

Ext.define("TK.locale.de.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'Bind print template',
    columnText: 'Name',
    btnBindText: 'Bind'
});

Ext.define("TK.locale.de.view.printtmpl.Form", {
    override    :"TK.view.printtmpl.Form",
    title       :'Print templates',
    btnSave       :'Save',
    btnSaveExit   :'Seve & Exit',
    btnClose      :'Close',

    fieldLabelName: 'Name',
    fieldLabelDef: 'By default',
    fieldLabelPageSize: 'Page size, mm',
    fieldLabelWidth: 'Width',
    fieldLabelHeight: 'Height',
    fieldLabelFont: 'Font for all document ',
    fieldLabelFontName: 'Name',
    fieldLabelFontSize: 'Size',
    fieldLabelFontSpace: 'Line spacing',
    fieldLabelSyncXY: 'Sync changes on X or Y',
    fieldLabelMoveHor: 'Move all horizontally, mm',
    fieldLabelMoveVert: 'Move all vertically, mm',
    titleData: 'Data'
});

Ext.define("TK.locale.de.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    title: 'Car/Container/Cargo',
    titleVag: 'Car',
    titleCont: 'Container',
    titleCargo: 'Cargo',

    btnDel: 'Delete',
    btnClose: 'Close',
    btnSave: 'Save',
    btnVagText: '+ Car',
    btnContText: '+ Container',
    btnCargoText: '+ Cargo',
    btnPlombText: '+ Plomb'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Docs, from senders'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Car/Container/Cargo'
});

Ext.define("TK.locale.de.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plombs'
});







