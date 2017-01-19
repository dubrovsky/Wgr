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
 * English Translations
 * updated to 2.2 by Condor (8 Aug 2008)
 */
Ext.onReady(function() {

    if (Ext.data && Ext.data.Types) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function(month) {
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

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }
    
    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '$',
            dateFormat: 'm/d/Y'
        });
    }
});

Ext.define("Ext.locale.en.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.en.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} selected row{1}"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.en.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Loading..."
});

Ext.define("Ext.locale.en.picker.Date", {
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
    format: "m/d/y",
    startDay: 0
});

Ext.define("Ext.locale.en.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Cancel"
});

Ext.define("Ext.locale.en.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Page",
    afterPageText: "of {0}",
    firstText: "First Page",
    prevText: "Previous Page",
    nextText: "Next Page",
    lastText: "Last Page",
    refreshText: "Refresh",
    displayMsg: "Displaying {0} - {1} of {2}",
    emptyMsg: 'No data to display'
});

Ext.define("Ext.locale.en.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Please Wait..."
});

Ext.define("Ext.locale.en.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "The value in this field is invalid"
});

Ext.define("Ext.locale.en.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "The minimum length for this field is {0}",
    maxLengthText: "The maximum length for this field is {0}",
    blankText: "This field is required",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.en.form.field.Number", {
    override: "Ext.form.field.Number",
    decimalPrecision: 2,
    minText: "The minimum value for this field is {0}",
    maxText: "The maximum value for this field is {0}",
    nanText: "{0} is not a valid number"
});

Ext.define("Ext.locale.en.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Disabled",
    disabledDatesText: "Disabled",
    minText: "The date in this field must be after {0}",
    maxText: "The date in this field must be before {0}",
    invalidText: "{0} is not a valid date - it must be in the format {1}",
    format: "m/d/y",
    altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
});

Ext.define("Ext.locale.en.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Loading..."
    });
});

Ext.define("Ext.locale.en.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'This field should be an e-mail address in the format "user@example.com"',
    urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
    alphaText: 'This field should only contain letters and _',
    alphanumText: 'This field should only contain letters, numbers and _'
});

Ext.define("Ext.locale.en.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function() {
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

Ext.define("Ext.locale.en.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sort Ascending",
    sortDescText: "Sort Descending",
    columnsText: "Columns"
});

Ext.define("Ext.locale.en.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(None)',
    groupByText: 'Group By This Field',
    showGroupsText: 'Show in Groups'
});

Ext.define("Ext.locale.en.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Name",
    valueText: "Value",
    dateFormat: "m/j/Y",
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

Ext.define("Ext.locale.en.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Cancel",
        yes: "Yes",
        no: "No"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.en.Component", {	
    override: "Ext.Component"
});

//////////////////////////////////
// TK Portal locale costants  ////
/////////////////////////////////

Ext.define("TK.locale.en.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'JSC "TransContainer" Portal',
    headerUser   :'User: ',
    headerLangLbl:'Language selection: '
});

Ext.define("TK.locale.en.view.MenuTree", {
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

Ext.define("TK.locale.en.view.DocsList", {
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

Ext.define("TK.locale.en.view.slovnakl.List", {
    override        :"TK.view.slovnakl.List",
    headerSlov       :'Slovak bill',
    title           :'Slovak bill'
});

Ext.define("TK.locale.en.view.printtmpl.List", {
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

Ext.define("TK.locale.en.stat.List", {
    override    :"TK.view.stat.List",
    title       :'Statistics'
});

Ext.define("TK.locale.en.view.aviso.List", {
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

Ext.define("TK.locale.en.view.avisocimsmgs.List", {
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

Ext.define("TK.locale.en.view.avisogu29k.List", {
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

Ext.define("TK.locale.en.view.cim.List", {
    override :"TK.view.cim.List",
    headerCim:'CIM',
    title    :'CIM register'

});

Ext.define("TK.locale.en.view.cimsmgs.List", {
    override        :"TK.view.cimsmgs.List",
    headerCimsmgs   :'CIM/SMGS',
    title           :'CIM/SMGS register',
    headerDateTransp:'Date of trans.',
    headerExchBch   :'Iftmin'
});

Ext.define("TK.locale.en.view.cmr.List", {
    override :"TK.view.cmr.List",
    headerCMR:'CMR',
    title    :'CMR register'

});

Ext.define("TK.locale.en.view.epd.List", {
    override:"TK.view.epd.List",
    title   :'EPD register'

});

Ext.define("TK.locale.en.view.gu27v.List", {
    override      :"TK.view.gu27v.List",
    headerGu27v   :'GU-27v',
    headerAvisoNum:'Aviso No.',
    title         :'GU register'

});

Ext.define("TK.locale.en.view.gu29k.List", {
    override      :"TK.view.gu29k.List",
    headerGu29k   :'GU-29�',
    headerAvisoNum:'Aviso No.',
    title         :'GU register'

});

Ext.define("TK.locale.en.view.invoice.List", {
    override:"TK.view.invoice.List",
    title   :'Invoices register'

});

Ext.define("TK.locale.en.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'SMGS list',
    headerSmgs    :'SMGS',
    headerExchTBC :'TBC',
    headerExchBch :'Iftmin',
    headerAvisoNum:'Aviso No.'
});

Ext.define("TK.locale.en.view.file.List", {
    override:"TK.view.file.List",
    title   :'Schedules register'
});

Ext.define("TK.locale.en.view.logs.List", {
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

Ext.define("TK.locale.en.view.project.List", {
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

Ext.define("TK.locale.en.view.user.List", {
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

Ext.define("TK.locale.en.view.user.ListGroups", {
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

Ext.define("TK.locale.en.view.user.ListPrivs", {
    override   :"TK.view.user.ListPrivs",
    title      :'List of privileges',
    headerName :'Name',
    headerDescr:'Description',
    btnSelect  :'Select',
    btnRefresh :'Refresh ',
    btnClose   :'Close'
});

Ext.define("TK.locale.en.view.user.Form", {
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

Ext.define("TK.locale.en.view.user.FormGroups", {
    override    :"TK.view.user.FormGroups",
    title       :'Editor',
    vTypeLabelGr:'Group with this name already exist, this field must contain only letters, numbers and _',
    labelName   :'Name<span class="x-required">*</span>',
    labelName1  :'Name:',
    labelDescr  :'Description',
    btnSave     :'Save',
    btnClose    :'Close'
});

Ext.define("TK.locale.en.view.project.Form", {
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

Ext.define("TK.locale.en.view.edit.DetailGrid", {
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

Ext.define("TK.locale.en.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    btnSave :'Save',
    btnClose:'Close'
});

Ext.define("TK.locale.en.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'Add',
    btnDelete:'Delete'
});

Ext.define("TK.locale.en.view.edit.VgCtGrTreeFormWin", {
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


Ext.define("TK.locale.en.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Customs code',
    labelTextRu: 'Text(RU)',
    labelText: 'Text',
    labelDocNum: 'Document No.',
    labelDate: 'Date',
    labelTotal: 'Total'
});

Ext.define("TK.locale.en.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plomb',
    labelTotal: 'Total'
});

Ext.define("TK.locale.en.view.DocsForm", {
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
    labelPack     :'Package(ru)',
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

Ext.define("TK.locale.en.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.en.view.aviso2.Form", {
    override:"TK.view.aviso2.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.en.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.en.view.avisocimsmgs.Form", {
    override:"TK.view.avisocimsmgs.Form",

    btnForAgree :'For approval',
    btnAgreed   :'Agreed',
    btnNotAgreed:'NOT agreed',

    labelCodyDo   :'Codes are valid till:',
    labelVsegoSmgs:'Total CIM/SMGS:',
    labelZakazNum :'Order number:'
});

Ext.define("TK.locale.en.view.avisogu29k.Form", {
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

Ext.define("TK.locale.en.view.avisogu29k.Form1", {
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

Ext.define("TK.locale.en.view.cim.Form", {
    override:"TK.view.cim.Form",

    labelWagonOtpr  :'Dispatch No.',
    labelContPrivate:'Private("P")'
});

Ext.define("TK.locale.en.view.slovnakl.Form", {
    override:"TK.view.slovnakl.Form",

    labelWagonOtpr  :'Dispatch No.'
});

Ext.define("TK.locale.en.view.cimsmgs.Form", {
    override:"TK.view.cimsmgs.Form",
    labelDopList: 'Erganzungsblatt'
});

Ext.define("TK.locale.en.view.cmr.Form", {
    override:"TK.view.cmr.Form"
});

Ext.define("TK.locale.en.view.epd.Form", {
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

Ext.define("TK.locale.en.view.file.Form", {
    override:"TK.view.file.Form",

    labelGeneralInfo :'General information',
    labelDownloadFile:'Download file'
});

Ext.define("TK.locale.en.view.gu27v.Form", {
    override:"TK.view.gu27v.Form"
});

Ext.define("TK.locale.en.view.gu29k.Form", {
    override:"TK.view.gu29k.Form"
});

Ext.define("TK.locale.en.view.invoice.Form", {
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

Ext.define("TK.locale.en.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd:'Add'
});

Ext.define("TK.locale.en.view.nsi.ListDir", {
    override:"TK.view.nsi.ListDir",

    title       :'List of handbooks',
    btnView     :'View',
    btnUploadDir:'Upload handbook',
    btnExportDir:'Export to Excel',
    headerName  :'Name',
    warnTitle:'Warning',
    warnMsg  :'You must select a row from the table with data'
});

Ext.define("TK.locale.en.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum     :'Wagon No.(col.27)',
    labelWagonsTonnage:'Tonnage (col.28)',
    labelWagonsTara   :'Tara (col.30)',
    labelWagonsAxes   :'Axes (col.29)',
    labelContNum      :'Number (col.9;19)',
    labelSize         :'Size (col.9)',
    labelVid          :'Type (col.18)'
});

Ext.define("TK.locale.en.view.stat.Form", {
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

Ext.define("TK.locale.en.controller.exchange.Senders", {
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

Ext.define("TK.locale.en.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg  :'Data request...',
    errorMsg :'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.Docs", {
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

Ext.define("TK.locale.en.controller.Ajax", {
    override:"TK.controller.Ajax",

    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Cimsmgs", {
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

Ext.define("TK.locale.en.controller.docs.Cmr", {
    override:"TK.controller.docs.Cmr"
});

Ext.define("TK.locale.en.controller.docs.Epd", {
    override:"TK.controller.docs.Epd"
});

Ext.define("TK.locale.en.controller.docs.File", {
    override:"TK.controller.docs.File",

    waitMsg1:'Save data in progress...',
    delTitle:'Deleting...',
    delMsg  :'Are you sure you want to delete...?',
    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Gu27v", {
    override:"TK.controller.docs.Gu27v",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.en.controller.docs.Gu29k", {
    override:"TK.controller.docs.Gu29k",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.en.controller.docs.Invoice", {
    override:"TK.controller.docs.Invoice",

    titleEpd:'EPD is not downloaded',
    msgEpd  :'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.en.controller.Logs", {
    override:"TK.controller.Logs",

    titleFilter:'Filter',
    lableDate  :'Creation data',
    lableDate1 :'from',
    lableDate2 :'till',
    labelUser  :'User',

    btnFind:'Find'
});

Ext.define("TK.locale.en.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg:'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.Project", {
    override:"TK.controller.Project",

    maskMsg  :'Data request...',
    errorMsg :'Attention! Mistake...',
    showTitle:'Attention! Deleting not allowed...',
    showMsg  :'If you want to delete the Project, please, delete all EPD from routes first'
});

Ext.define("TK.locale.en.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'EPD is not downloaded',
    titleDownldInv:'Download Invoices',
    msgEpd  :'Click on the link with EPD to start the download',
    errorMsg:'Attention! Mistake...',
    btnClose :'Close',
    btnSave  :'Save',
    btnFind  :'Find'
});

Ext.define("TK.locale.en.controller.User", {
    override:"TK.controller.User",

    maskMsg :'Data request...',
    errorMsg:'Attention! Mistake...',
    waitMsg1:'Save data in process...'
});

Ext.define("TK.locale.en.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Upload handbook',
    labelSelectFile:'Select file for the upload...',
    labelFile      :'File',
    btnSave        :'Save',
    btnClose       :'Close',
    btnSearch      :'Overview...'
});

Ext.define("TK.locale.en.view.nsi.List", {
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

Ext.define("TK.locale.en.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Print settings",
    labelBlank: "With blank?",
    textPrint: "Print",
    textPages: 'Pages for print',
    textPage: 'Page ',
    textPageBack: '(back)'
});

Ext.define("TK.locale.en.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'Bind print template',
    columnText: 'Name',
    btnBindText: 'Bind'
});

Ext.define("TK.locale.en.view.printtmpl.Form", {
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

Ext.define("TK.locale.en.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Car',
    titleCont: 'Container',
    titleCargo: 'Cargo',

    btnDel: 'Delete',
    btnClose: 'Close',
    btnSave: 'Save',
    btnVagText: '+ Car',
    btnContText: '+ Container',
    btnCargoText: '+ Cargo',
    btnDocText: '+ Doc',
    btnPlombText: '+ Plomb'
});

Ext.define("TK.locale.en.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Docs, from senders'
});

Ext.define("TK.locale.en.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Car/Container/Cargo'
});

Ext.define("TK.locale.en.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plombs'
});







