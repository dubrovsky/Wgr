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
 * English translation
 *
 * By ZooKeeper (utf-8 encoding)
 *
 * 6 November 2007
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

Ext.define("Ext.locale.en.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.en.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} selected row{1}"
});

Ext.define("Ext.locale.en.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Close this tab"
});

Ext.define("Ext.locale.en.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "The value in this field is invalid"
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
    format: "d.m.Y",
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
    minText: "The minimum value for this field is {0}",
    maxText: "The maximum value for this field is {0}",
    nanText: "{0} is not a valid number",
    negativeText: 'Value couldnt be negative'
});

Ext.define("Ext.locale.en.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Disabled",
    disabledDatesText: "Disabled",
    minText: "The date in this field must be after {0}",
    maxText: "The date in this field must be before {0}",
    invalidText: "{0} is not a valid date - it must be in the format {1}",
    format: "d.m.Y",
    altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
});

Ext.define("Ext.locale.en.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function () {
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

Ext.define("Ext.locale.en.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Please Wait..."
});

Ext.define("Ext.locale.en.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sort Ascending",
    sortDescText: "Sort Descending",
    lockText: 'Lock text',
    unlockText: 'Unlock text',
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
    dateFormat: "d.m.Y",
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
    format: 'd.m.Y'
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
    override: "Ext.Component",
    titleDelMsgBox: 'Delete record?',
    textDelMsgBox: 'Record will be deleted',
    titleEditWindow: 'Edit record',
    titleAddWindow: 'Add record'
});

//////////////////////////////////
// TK Portal locale costants  ////
/////////////////////////////////

Ext.define("TK.locale.en.view.Viewport", {
    override: "TK.view.Viewport",
    headerPortal: 'JSC "TransContainer" Portal',
    headerUser: 'User: ',
    headerLangLbl: 'Language selection: '
});

Ext.define("TK.locale.en.view.MenuTree", {
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
    btnKontYards  :"Сontainer\'s yard",
    btnKontYard    :'Container\'s storage and location',
    btnKont         :'Container\'s list',
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

Ext.define("TK.locale.en.stat.List", {
    override: "TK.view.stat.List",
    title: 'Statistics'
});

Ext.define("TK.locale.en.view.DocsList", {
    override: "TK.view.DocsList",

    btnStat: 'Statistics',
    btnRestore: "Restore",
    btnDestroy: "Destroy",
    btnPrint: 'Print PDF',
    btnPrintView: "View PDF",
    btnCreate: 'Create',
    btnCopy: 'Copy',
    btnCopyAviso: 'Copy to template',
    btnCopySelect: 'Copy, select...',
    btnCopy2ArchSel: 'Copy selection to archive',
    btnCopy2ArchTrN: 'Copy to archive by train №',
    btnCopy2RouteSel:'Copy/move selection to route',
    btnCopy2RouteTrN: 'Copy/move to route by train №',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
    btnArchive: 'Archive',
    btnMakeSmgs: 'Create SMGS',
    btnMakeSmgsXls: 'Create with XLS file',
    btnMakeCimSmgs: 'Create CIM/SMGS',
    btnAppend2Smgs: 'Append to SMGS',
    btnAppend2CimSmgs: 'Append to CIM/SMGS',
    btnMakeGU: 'Create GU',
    btnDownload: 'Download',
    btnHistory: 'History',
    btnBindPrint: 'Bind print',
    btnSelectPrint: 'Select template',
    btnExch: 'Exchange',
    btnExchTBC: 'TBC',
    btnExchBCh1: 'Open/close for edit.',
    btnExchBCh: 'BCH',
    btnExchFTS: 'FTS',
    btnExchBTLC: 'BTLC',
    btnExchTdgFTS: 'TDG',
    btnReports: 'Reports',
    btnView: 'View',
    btnSpecs:'Specification',
    btnInvoiceImport:'Invoice import',

    btnCont: 'Containers',
    btnVag: 'Wagons',
    btnContsList: 'Cont/Wag list',
    btnSmgs: 'Smgs',

    btnDopList: 'Extra List',
    btnUploadCSDocs9: 'Sender docs',
    btnUploadPogruzList: 'Cargo List',
    btnUploadPogruzListPoezd: 'Cargo List. for trains',
    btnContsList1: 'List',

    btnPlusDocs: '+ Docs',
    btnPlusSmgsInv: '+ Smgs & Invoices',
    btnPlusInv: '+ Invoices',

    lableDeleted: 'Deleted?',

    headerID: 'ID',
    headerProject: 'Project',
    headerRoute: 'Route',
    headerDoc: 'Doc',
    headerCreation: 'Creation',
    headerDateTime: 'Date and time',
    headerUser: 'User',
    headerSenderName: 'Consignor`s<br/>name',
    headerReceiverName: 'Cinsignee`s<br/>name',
    headerContNum: 'Container<br/>number',
    headerDescr: 'Description',
    headerInv: 'Invoices',
    headerNPoezd: 'Train<br/>No.',
    headerVagNum: 'Wagon<br/>number',
    headerFileName: 'File name',
    headerContentType: 'Content<br/>type',
    headerSizeByte: 'Size, byte',

    warnTitle: 'Warning',
    warnMsg: 'You must select a row from the table with data',

    txtForApproval: 'For approval',
    txtApproved: 'Approved',
    txtWork: 'Working',
    txtNotApproved: 'Not approved',
    txtBlocked: 'Blocked',
    headerStatus: 'Status',
    headerName: 'Template<br/>name',
    headerInstrNum: 'Template No.',
    headerGNG: 'NHM',
    headerComments: 'Comments',

    statusBlocked: 'Blocked',
    status4Approval: 'For approval',
    statusAgreed: 'Agreed',
    statusNotAgreed: 'NOT agreed',

    avisoXsmgs:'Combine template and documents',
    groupPrint:'Group print',
    groupEdit: 'Group edit',

    saveGridSettings:'Save settings',
    clearGridSettings:'Clear settings'
});

Ext.define("TK.locale.en.view.avisocim.AvisoCimList", {
    override: "TK.view.avisocim.AvisoCimList",
    title: 'CIM template register'
});

Ext.define("TK.locale.en.view.aviso2.AvisoSmgs2List", {
    override: "TK.view.aviso2.AvisoSmgs2List",
    title: 'SMGS2 template register'
});

Ext.define("TK.locale.en.view.aviso.List", {
    override: "TK.view.aviso.List",

    title: 'SMGS template register'
});

Ext.define("TK.locale.en.view.avisocimsmgs.AvisoCimSmgsList", {
    override: "TK.view.avisocimsmgs.AvisoCimSmgsList",

    title: 'CIM/SMGS template register'
});

Ext.define("TK.locale.en.view.avisogu29k.List", {
    override: "TK.view.avisogu29k.List",

    title: 'GU template register'
});

Ext.define("TK.locale.en.view.cim.CimList", {
    override: "TK.view.cim.CimList",

    headerCim: 'CIM',
    title: 'CIM register',
    menuTrSearch: 'Filter train'
});

Ext.define("TK.locale.en.view.cimsmgs.CimSmgsList", {
    override: "TK.view.cimsmgs.CimSmgsList",

    title: 'CIM/SMGS register',
    headerCimsmgs: 'Num CIM/SMGS',
    headerVagVed: 'Wagons list',
    headerDateTransp: 'Date of CIM/SMGS',
    headerExchBch: 'Iftmin',
    menuTrSearch: 'Filter train'
});

Ext.define("TK.locale.en.view.cmr.List", {
    override: "TK.view.cmr.List",

    headerDateTransp: 'Data Trans',
    headerCMR: 'CMR',
    title: 'CMR register'
});

Ext.define("TK.locale.en.view.slovnakl.List", {
    override: "TK.view.slovnakl.List",

    headerSlov: 'Slovak bill',
    title: 'Slovak bill'
});

Ext.define("TK.locale.en.view.epd.List", {
    override: "TK.view.epd.List",

    title: 'EPD register'
});

Ext.define("TK.locale.en.view.gu27v.List", {
    override: "TK.view.gu27v.List",

    headerGu27v: 'GU-27v',
    headerDateTransp: 'Data Trans',
    headerAvisoNum: 'Aviso No.',
    title: 'GU register'
});

Ext.define("TK.locale.en.view.gu29k.List", {
    override: "TK.view.gu29k.List",

    headerGu29k: 'GU-29�',
    headerDateTransp: 'Data Trans',
    headerAvisoNum: 'Aviso No.',
    title: 'GU register'
});

Ext.define("TK.locale.en.view.invoice.List", {
    override: "TK.view.invoice.List",

    title: 'Invoices register',
    headerNum: '№ inv',
    headerNumOtpr: '№',
    headerNumCont: '№ cont',
    headerDateOtpr: 'Date inv'
});

Ext.define("TK.locale.en.view.smgs.List", {
    override: "TK.view.smgs.List",
    title: 'SMGS list',
    headerSmgs: 'SMGS',
    headerExchTBC: 'TBC',
    headerExchBch: 'Iftmin',
    headerAvisoNum: 'Aviso No.'
});

Ext.define("TK.locale.en.view.smgs2.Smgs2List", {
    override: "TK.view.smgs2.Smgs2List",
    title: 'SMGS list',
    headerSmgs: 'SMGS',
    headerExchTBC: 'TBC',
    headerExchBch: 'Iftmin',
    headerAvisoNum: 'Aviso No.',
    headerVagVed: 'Wagons list',
    titleVagVed: 'List',
    menuTrSearch: 'Filter train'
});

Ext.define("TK.locale.en.view.file.List", {
    override: "TK.view.file.List",
    title: 'Schedules register',
    headerNumOtpr: 'Shipment №',
    headerNumCont: 'Сont №',
    headerDateOtpr: 'Shipment Date'
});

Ext.define("TK.locale.en.view.logs.List", {
    override: "TK.view.logs.List",
    title: 'Portal logs',
    headerDate: 'Date',
    headerUser: 'User',
    headerHost: 'Host',
    headerAgent: 'Runtime',
    headerLog: 'Log',
    headerThread: 'Flow',
    headerFile: 'File',
    headerMethod: 'Method',
    btnFilter: 'Filter'
});

Ext.define("TK.locale.en.view.project.List", {
    override: "TK.view.project.List",
    title: 'List of projects',
    headerName: 'Name',
    headerGroups: 'Groups',
    headerRoutes: 'Routes',
    btnCreate: 'Create',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
    delMsg1: 'Deleting...',
    delMsg2: 'Are you sure you want to delete current Project?'
});

Ext.define("TK.locale.en.view.printtmpl.List", {
    override: "TK.view.printtmpl.List",
    title: 'Printing templates',
    headerName: 'Name',
    headerRoutes: 'Routes',
    headerDefault: 'Default?',
    headerBlank: 'With blank?',

    btnBindToRoute: 'Bind to route',
    btnBindToBlank: 'Bind to blank',
    btnBlanks: 'Blanks'
});

Ext.define("TK.locale.en.view.printtmpl.Form", {
    override: "TK.view.printtmpl.Form",
    title: 'Print templates',
    btnSave: 'Save',
    btnSaveExit: 'Seve & Exit',
    btnClose: 'Close',

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

Ext.define("TK.locale.en.view.user.List", {
    override: "TK.view.user.List",
    title: 'List of users',
    headerUn: 'Login',
    headerName: 'Name',
    headerGroup: 'Group',
    headerGroups: 'Additional groups',
    headerPrivileg: 'Privileges',
    headerLocked: 'Locked?',
    headerSu: 'Admin?',
    headerEmail: 'E-mail',
    headerLang: 'Interface<br>language',
    btnCreate: 'Create',
    btnEdit: 'Edit',
    btnCopy: 'Copy',
    btnRefresh: 'Refresh',

    textYes: 'yes',
    textNo: 'no',
    btnGrFilter:'Group filter',
    btnResetGrFilter:'Reset group filter'
});

Ext.define("TK.locale.en.view.user.ListGroups", {
    override: "TK.view.user.ListGroups",
    title: 'List of groups',
    headerName: 'Name',
    headerDescr: 'Description',
    btnSelect: 'Select',
    btnAdd: 'Add',
    btnEdit: 'Edit',
    btnRefresh: 'Refresh',
    btnClose: 'Close'
});

Ext.define("TK.locale.en.view.user.ListPrivs", {
    override: "TK.view.user.ListPrivs",
    title: 'List of privileges',
    headerName: 'Name',
    headerDescr: 'Description',
    btnSelect: 'Select',
    btnRefresh: 'Refresh ',
    btnClose: 'Close'
});

Ext.define("TK.locale.en.view.user.Form", {
    override: "TK.view.user.Form",
    title: 'Editor',
    labelLogin: 'Login<span class="x-required">*</span>',
    labelLogin1: 'Login:',
    labelPass: 'Password<span class="x-required">*</span>',
    labelPass1: 'Password confirmation<span class="x-required">*</span>',
    labelPass2: 'New password:',
    labelFIO: 'Name(surname, name)',
    labelEmail: 'E-mail',
    labelLocked: 'Locked?',
    labelSu: 'Admin?',
    labelGroup: 'Group<span class="x-required">*</span>',
    labelGroups: 'Additional groups',
    labelPrivs: 'Privileges',
    btnSave: 'Save',
    btnClose: 'Close',
    vTypeLabelPass: 'Passwords do not match, this field must contain only letters, numbers and _',
    vTypeLabelLogin: 'User with this username already exist, this field must contain only letters, numbers and _'
});

Ext.define("TK.locale.en.view.user.FormGroups", {
    override: "TK.view.user.FormGroups",
    title: 'Editor',
    vTypeLabelGr: 'Group with this name already exist, this field must contain only letters, numbers and _',
    labelName: 'Name<span class="x-required">*</span>',
    labelName1: 'Name:',
    labelDescr: 'Description',
    btnSave: 'Save',
    btnClose: 'Close'
});

Ext.define("TK.locale.en.view.project.Form", {
    override: "TK.view.project.Form",
    title: 'Edit the Projet',
    btnSave: 'Save',
    btnSaveExit: 'Save and exit',
    btnClose: 'Close',
    btnSelect: 'Select',
    labelProjectName: 'Name',
    labelGroups: 'Groups',
    labelRoutes: 'Routes',
    labelSelected: 'Selected',
    labelAvailable: 'Available',
    headerName: 'Name',
    headerDescr: 'Description',
    saveMsg: 'Data saving...'
});

Ext.define("TK.locale.en.view.edit.DetailGrid", {
    override: "TK.view.edit.DetailGrid",
    btnAdd: "Add",
    btnDelete: "Delete",
    btnCopy: "Copy",
    btnOk: 'Ok',
    btnCheckTnved:'Check HS codes',
    btnImportXlsCargo:'Import cargo from XLS',
    btnTranslate:'Translate',

    headerName: 'Name',
    headerRoutesGr: 'Groups',
    headerRoutesDocs: 'Documents',
    headerRoutesCodeTbc: 'TBC code',
    headerRoutesCodeCustoms: 'Customs code',
    headerRoutesEmailMask: 'Email, mask',
    headerRoutesForDeleted: 'For deleted?',
    headerContNum: 'Number',
    headerContSize: 'Size',
    headerContVid: 'Type',
    headerContNum1: 'Number',
    headerContSize1: 'Size',
    headerContVid1: 'Type',
    headerCodeTNVED: 'HS code',
    headerPack: 'Package',
    headerPackVid: 'Type',
    headerPackKod: 'Code',
    headerGoodsDescr: 'Goods description RU',
    headerGoodsDescrEn: 'Goods description EN',
    headerPackage: 'Package type',
    headerPackNum: 'quantity of pack./places',
    headerBrutto: 'gross weight (kg)',
    headerNetto: 'net weight (kg)',
    headerQuantity: 'quantity',
    headerProdUnit: 'Goods unit of measure',
    headerProdPrice: 'Goods unit price',
    headerTotalValue: 'total value',
    headerType: 'type',
    headerTotal: 'Total:',

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
    titlePhrases: 'Phrases?',
    btnShowDetails:'Show details',
    btnHideDetails:'Hide details'
});

Ext.define("TK.locale.en.view.edit.DetailPanel", {
    override: "TK.view.edit.DetailPanel",
    errorTitle: 'Error',
    errorMsgValid: 'Check fields',
    btnSave: 'Save',
    btnClose: 'Close',
    labelSender: 'Consignor',
    labelName: 'Name',
    labelName1: 'Name',
    labelNameEu: 'Name EU',
    labelNameRu: 'Name (RU)',
    labelNameCh: 'Name (CN)',
    labelDate: 'Date',
    labelTotal: 'Total',
    labelCountry: 'Country',
    labelCountryRu: 'Country (RU)',
    labelCountryCode: 'Country code',
    labelZip: 'Zip code',
    labelCity: 'City',
    labelCityRu: 'City(RU)',
    labelAdress: 'Address',
    labelAdressRu: 'Address(RU)',
    labelOptInfo: 'Opt. info',
    labelSenderCod: 'Senders code',
    labelReceiverCod: 'Recievers code',
    labelReceiver: 'Consignee'
});

Ext.define("TK.locale.en.view.edit.DetailTabPanel", {
    override: "TK.view.edit.DetailTabPanel",
    btnAdd: 'Add',
    btnDelete: 'Delete'
});

Ext.define("TK.locale.en.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",

    labelName1: 'Name',
    labelWagons: 'Wagons',
    labelWagonNum: 'Wagon No.',
    labelWagonsTonnage: 'Tonnage, t',
    labelWagonsTara: 'Tara, t',
    labelWagonsAxis: 'Axis',
    labelConts: 'Containers',
    labelSize: 'Size',
    labelSizeMm: 'Size(mm)',
    labelTaraCont: 'Tara, weight',
    labelNotes: 'Note ',
    labelCategory: 'Category',
    labelContNum: 'Container No.',
    labelDescr: 'Desciption',
    labelVid: 'Type',
    labelCargo: 'Cargo',
    labelNetto: 'Gross weight',
    labelTara: 'Tara',
    labelBrutto: 'Gross weight',
    labelCodeGng: 'NHM code',
    labelNameRuGng: 'Name(RU)',
    labelNameChGng: 'Name(CN)',
    labelCodeEtsng: 'Code ET SNG',
    labelNameEtsng: 'Name',
    labelMassa: 'Weight, kg',
    labelMesta: 'Places',
    labelPack: 'Package(ru)',
    labelPackForeign: 'Package',

    labelWagonsGiven: 'Wagon is given',
    labelWagonsOwner: "Wagon's owner",
    labelWagonsKind: "Wagon's kind",

    labelContSize: 'Size Type',
    labelMaxLoad: 'Max load, t',

    labelNameRu: 'Name(ru)',
    labelName: 'Name',
    labelCode: 'Code',
    labelOON: 'OON',
    labelClass: 'Class',
    labelZnak: 'Marks',
    labelGrUpak: 'Packing group',
    labelAvKart: '№ emerg. card',
    labelStamp: 'Stamp',
    labelDopInf: 'Add. info '
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

Ext.define("TK.locale.en.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",
    labelOtprName: 'Name',
    labelOtprNameRu: 'Name,(RU)',
    labelCountry: 'Country',
    labelCountryRu: 'Country,(RU)',
    labelCountryCode: 'Country code',
    labelEmail: 'E-mail',
    labelPhone: 'Phone',
    labelFax: 'Fax',
    labelCity: 'City',
    labelCityRu: 'City(RU)',
    labelAdress: 'Address',
    labelAdressRu: 'Address(RU)',
    labelZip: 'Zip code',
    labelVat: 'VAT',
    labelSenRecCode: 'Consignor`s/consignee`s code',
    labelCliCode: 'Client`s code',
    labelNNcode: 'Code INN',
    labelDopInfo: 'Additional info',
    labelOKPO: 'Code OKPO:',

    closeBtn: 'Close',
    saveBtn: 'Save'
});

Ext.define("TK.locale.en.view.DocsForm", {
    override: "TK.view.DocsForm",

    btnSave: 'Save',
    btnSaveExit: 'Save and Exit',
    btnSavePrint: 'Save and Print PDF',
    btnClose: 'Close',
    btnSign: 'Sign ECP',
    btnChange: 'Change',
    btnChangePlomb: 'Change plombs',
    btnChangeWagen: 'Change the wagon',
    btnChangeCont: 'Change the container',
    btnChangeGr: 'Change the cargo',
    btnCopyEpd: 'Copy from EPD',
    btnDopList: 'Extra List',
    btnContsList: 'Cont/Wag list',
    btnCopy20: 'Copy to column 20',
    btnTbcReady: 'TBC ready',
    btnTbcNotReady: 'TBC cancel',
    btnBchReady: 'Iftmin ready',
    btnBchNotReady: 'Iftmin cancel',
    btnFtsReady: 'FTS ready',
    btnFtsNotReady: 'FTS cancel',

    labelNotes: 'Text before Container No.',

    labelPayers: 'Payers',
    labelNumDate: 'Contract number date',
    labelBukvKod: 'Railroad administration`s code (letters)',
    labelBukvKodRu: 'Railroad administration`s code (letters)RU',
    labelPayerName: 'Payer`s name',
    labelPayerNameRu: 'Payer`s name(RU)',
    labelThrough: 'Through what',
    labelPrim: 'Notes',
    labelPayerKod1: 'Payer`s code',
    labelPayerKod2: 'Payer`s subcode of the code',
    labelPayerKod3: 'Payer`s subcode of the subcode',
    labelPayerKod4: 'Additional field for code',
    labelPayment: 'Payment method',
    labelPaymentRu: 'Payment method(RU)',

    labelConts: 'Containers',
    labelSize: 'Size',
    labelSizeMm: 'Size(mm)',
    labelNotesVag: 'Text before Car  No.',
    labelCategory: 'Category',
    labelContNum: 'Container No.',
    labelDescr: 'Desciption',
    labelVid: 'Type',

    labelCargo: 'Cargo',
    labelCode: 'Code',
    labelNetto: 'Gross weight',
    labelTara: 'Tara',
    labelBrutto: 'Gross weight ',
    labelCodeGng: 'NHM code',
    labelNameRuGng: 'Name(RU)',
    labelNameChGng: 'Name(CN)',
    labelCodeEtsng: 'Code ET SNG',
    labelNameEtsng: 'Name',
    labelMassa: 'Weight, kg',
    labelMesta: 'Places',
    labelPack: 'Package(ru)',
    labelPackForeign: 'Package',

    labelCodeStn: 'Station code',
    labelText3: 'Road name',
    labelText4: 'Road code',
    labelBorderStn: 'Borders stations',
    labelCodeDoc: 'Document`s code',
    labelText: 'Text',
    labelTextEu: 'Text EU',
    labelTextRu: 'Text(RU)',
    labelSenderDocs: 'Documents attached by consignor',
    labelCustomsCode: 'Customs code',
    labelDocNum: 'Document No.',
    labelCommercTerms: 'Commercial terms',
    labelPogrStn: 'Boardercrossing stations',

    labelWagons: 'Wagons',
    labelWagonNum: 'Wagon No.',
    labelWagonsTonnage: 'Tonnage, t',
    labelWagonsTara: 'Tara, t',
    labelWagonsAxis: 'Axis',

    labelZayavSenderPayers: 'Consignor`s/payer`s application',
    labelZayavSender: 'Consignor`s application',
    labelSenderNotes: 'Consignor`s special notes',
    labelFile: 'File',
    labelFileSearch: 'Review...',
    labelWagenNum: 'Train number:',
    labelTeplatename: 'Template name:',
    labelDocSort: 'Serial number:',
    labelDocSummary: 'Consolidated:',

    labelTGNL: 'Code TGNL:',
    labelOKPO: 'Code OKPO:',
    labelINN: 'Code INN:',

    labelVagKontGruz: 'Car/Container/Cargo',
    btnPrintView: "View PDF",

    labelDate: 'Date',
    labelCodyDo: 'Code expires:',
    labelVsegoSmgs: 'Total SMGS:',
    labelCarrier: 'Carries',
    labelFrom: 'Station from',
    labelTo: 'Station to',
    labelStationFrom: 'Station from(code)',
    labelStationTo: 'Station to(code)',
    titleCarriers: 'Carriers',
    btnVed: 'List',
    btnVag: 'Wagon',
    btnCont: 'Container'
});

Ext.define("TK.locale.en.view.aviso.Form", {
    override: "TK.view.aviso.Form",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelCodyDo: 'Codes are valid till:',
    labelVsegoSmgs: 'Total SMGS:',
    labelZakazNum: 'Order number:'
});

Ext.define("TK.locale.en.view.aviso2.AvisoSmgs2Form", {
    override: "TK.view.aviso2.AvisoSmgs2Form",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelCodyDo: 'Codes are valid till:',
    labelVsegoSmgs: 'Total SMGS:',
    labelZakazNum: 'Order number:'
});

Ext.define("TK.locale.en.view.aviso.Form1", {
    override: "TK.view.aviso.Form1",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelCodyDo: 'Codes are valid till:',
    labelVsegoSmgs: 'Total SMGS:',
    labelZakazNum: 'Order number:'
});

Ext.define("TK.locale.en.view.avisocimsmgs.AvisoCimSmgsForm", {
    override: "TK.view.avisocimsmgs.AvisoCimSmgsForm",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelCodyDo: 'Codes are valid till:',
    labelVsegoSmgs: 'Total CIM/SMGS:',
    labelZakazNum: 'Order number:'
});

Ext.define("TK.locale.en.view.avisogu29k.Form", {
    override: "TK.view.avisogu29k.Form",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelVsegoGU: 'TOTAL GU',
    labelZakazNum: 'Order number',
    labelSender1: 'Consignor',
    labelReceiver1: 'Consignee',
    labelStnSender: 'Departure station',
    labelStnReceiver: 'Destination station',
    labelPayers1: 'Payer',
    labelCodesTill: 'Codes are valid till',
    labelGU: 'GU',
    labelGU29: 'GU29',
    labelGU27: 'GU27'
});

Ext.define("TK.locale.en.view.avisogu29k.Form1", {
    override: "TK.view.avisogu29k.Form1",

    btnForAgree: 'For approval',
    btnAgreed: 'Agreed',
    btnNotAgreed: 'NOT agreed',

    labelVsegoGU: 'TOTAL GU',
    labelZakazNum: 'Order number',
    labelSender1: 'Consignor',
    labelReceiver1: 'Consignee',
    labelStnSender: 'Departure station',
    labelStnReceiver: 'Destination station',
    labelPayers1: 'Payer',
    labelCodesTill: 'Codes are valid till',
    labelGU: 'GU',
    labelGU29: 'GU29',
    labelGU27: 'GU27'
});

Ext.define("TK.locale.en.view.cim.CimForm", {
    override: "TK.view.cim.CimForm",

    labelWagonOtpr: 'Dispatch No.',
    labelContPrivate: 'Private("P")'
});

Ext.define("TK.locale.en.view.slovnakl.Form", {
    override: "TK.view.slovnakl.Form",

    labelWagonOtpr: 'Dispatch No.'
});

Ext.define("TK.locale.en.view.cimsmgs.CimSmgsForm", {
    override: "TK.view.cimsmgs.CimSmgsForm",
    labelDopList: 'Erganzungsblatt'
});

Ext.define("TK.locale.en.view.cmr.Form", {
    override: "TK.view.cmr.Form"
});

Ext.define("TK.locale.en.view.epd.Form", {
    override: "TK.view.epd.Form",

    labelSenderName: 'Consignor`s name',
    labelSenderAdress: 'Consignor`s address',
    labelReceiverName: 'Consignee`s name',
    labelReceiverAdress: 'Consignee`s address',
    labelStnSenderName: 'Departure station name',
    labelStnSenderCode: 'Departure station code',
    labelStnReceiverName: 'Consignee`s station name',
    labelStnReceiverCode: 'Consignee`s station code'
});

Ext.define("TK.locale.en.view.file.Form", {
    override: "TK.view.file.Form",

    labelGeneralInfo: 'General information',
    labelDownloadFile: 'Download file'
});

Ext.define("TK.locale.en.view.gu27v.Form", {
    override: "TK.view.gu27v.Form"
});

Ext.define("TK.locale.en.view.gu29k.Form", {
    override: "TK.view.gu29k.Form"
});

Ext.define("TK.locale.en.view.invoice.Form", {
    override: "TK.view.invoice.Form",

    labelType: 'Type',
    labelOtprNum: 'Dispatch No.',
    labelContractNum: 'Contract No.',
    labelContractDate: 'Contract date',
    labelSellerName: 'Seller`s name',
    labelSenderName: 'Consignor`s name',
    labelSellerAdress: 'Seller`s address',
    labelSenderAdress: 'Consignor`s address',
    labelSenderCountry: 'Consignor`s country, code',
    labelSenderZip: 'Consignor`s zip code',
    labelSenderCity: 'Consignor`s city',
    labelBuyerName: 'Buyer`s name',
    labelReceiverName: 'Consignee`s name',
    labelReceiverCountry: 'Consignee`s country, code',
    labelReceiverZip: 'Consignee`s zip code',
    labelReceiverCity: 'Consignee`s city',
    labelBuyerAdress: 'Buyer`s address',
    labelReceiverAdress: 'Consignee`a address',
    labelDeliveryCode: 'Code of delivery terms',
    labelDeliveryPlace: 'Point of delivery',
    labelCurrency: 'Invoice currency',
    labelNote: 'Note',

    lableCombo1: 'Invoice',
    lableCombo2: 'Invoice',
    lableCombo3: 'Annex to invoice',
    lableCombo4: 'Cargo list',
    lableCombo5: 'Manifest',
    deatailTitle:'Additional info',
    btnShowDetails:'Show details',
    btnHideDetails:'Hide details'
});

Ext.define("TK.locale.en.view.nsi.EditList", {
    override: "TK.view.nsi.EditList",

    btnAdd: 'Add',
    btnDelete: 'Delete',
    btnEdit: 'Edit'
});

Ext.define("TK.locale.en.view.nsi.ListDir", {
    override: "TK.view.nsi.ListDir",

    title: 'List of handbooks',
    btnView: 'View',
    btnUploadDir: 'Upload handbook',
    btnExportDir: 'Export to Excel',
    headerName: 'Name',
    warnTitle: 'Warning',
    warnMsg: 'You must select a row from the table with data',

    nsiSta: 'Handbook of railroads stations',
    nsiCountries: 'Handbook of countries',
    nsiGng: 'Handbook of NHM codes',
    nsiEtsng: 'Handbook of ETSNG codes',
    nsiCurrency: 'Currency handbook',
    nsiTnved: 'HS handbook',
    nsiDeliv: 'Handbook of delivery terms',
    nsiUpak: 'Handbook of package types',
    nsiOtpr: 'Handbook of juridical persons (consignors/consignees)',
    nsiPlat: 'Handbook of payers by railroads (forwarders)',
    nsiManagement: 'Handbook of railroads administrations',
    nsiCountriesGd: 'Handbook of railroads countries',
    nsiDocG23: 'Handbook of documents types',
    nsiVeterin: 'Handbook of veterinary cargo',
    nsiKarantin: 'Handbook of quarantine cargo',
    nsiDangCode: 'Handbook of dangerous cargo',
    gruzyLink: 'Cargo list, with financial insurance'
});

Ext.define("TK.locale.en.view.smgs.Form", {
    override: "TK.view.smgs.Form",

    labelWagonNum: 'Wagon No.(col.27)',
    labelWagonsTonnage: 'Tonnage (col.28), t',
    labelWagonsTara: 'Tara (col.30), t',
    labelWagonsAxis: 'Axis (col.29)',
    labelContNum: 'Number (col.9;19)',
    labelSize: 'Size (col.9)',
    labelVid: 'Type (col.18)'
});

Ext.define("TK.locale.en.view.stat.Form", {
    override: "TK.view.stat.Form",

    lableDate: 'Date of creation',
    lableDate1: 'from',
    lableDate2: 'till',
    lableZakazNum: 'Order number',
    lableStatus: 'Status',
    lableUser: 'User',
    lableCountrySender: 'Country of dispatch',
    lableCountryRceiver: 'Country of destination',
    lableDeleted: 'Deleted?',
    lableStnPogr: 'Border station',
    lableStnSender: 'Station of departure',
    lableStnReciver: 'Station of destination',
    lableSender: 'Consignor',
    lableReceiver: 'Consignee',
    lableCargoName: 'Description of cargo',
    lableContSize: 'Container`s size type',
    lablePayer: 'Payer for tariff and service',
    lableKontNum: '# container',

    btnFind: 'Find',
    btnClose: 'Close',
    btnReset: 'Reset',
    lableCombo1: 'Instructions for confirmation by an agent',
    lableCombo2: 'Instructions confirmed by the agent',
    lableCombo3: 'Instructions not confirmed by the agent',
    lableCombo4: 'Instructions blocked',
    lableCombo5: 'Printed'
});

Ext.define("TK.locale.en.controller.exchange.Senders", {
    override: "TK.controller.exchange.Senders",

    waitMsg: 'File download...',
    waitMsg1: 'Save data in progress...',
    maskMsg: 'Data request...',
    showTitle: 'Attention',
    showMsg1: 'Was sent!',
    showMsg2: 'Mistake!',
    showMsg3: 'Saved!',
    errorMsg: 'Attention! Mistake...',

    btnClose: 'Close',
    btnSave: 'Save',
    btnExport: 'Export FTS',

    titleFTS: 'Exchange with FTS',

    labelWagenNum: 'Train number:',
    labelWagenNums: 'Train number(-s[,]):',
    labelWagenInd: 'Train index:',
    labelPPVInd: ':',
    labelInputDate: ':'
});

Ext.define("TK.locale.en.controller.exchange.Agreements", {
    override: "TK.controller.exchange.Agreements",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.Docs", {
    override: "TK.controller.Docs",

    titleCopy2Aviso: 'Copy to aviso',
    titleList: 'List ',
    titleEdit: 'Edit',
    titleCopy: 'Copy ',
    titletPrint: 'Print',
    titletStat: 'Statistics',
    titleReports: 'Reports',
    titleHistory: 'Document`s history',
    titleUpload: 'Instruction loading in XML format',
    titleFTS: 'Exchange with FTS',
    titleContList: 'Enter train num(-s[,])',

    lableSettings: 'Setting',
    lableFace: 'Front',
    lableBack: 'Back',
    lableTraneNum: 'Train(number)',
    labelSelectFile: 'Select file for the upload...',
    labelFile: 'File',
    labelUn: 'Login',
    labelUnName: 'Name',
    labelUnEmail: 'Email',
    labelUnGroup: 'Group',
    labelGU: 'GU',
    labelGU29: 'GU29',
    labelGU27: 'GU27',
    labelWagenNum: 'Train number:',
    labelWagenNums: 'Train number(-s[,]):',
    labelWagenInd: 'Train index:',
    labelPPVInd: ':',
    labelInputDate: ':',

    msgCopy2Arch:'Copy to archive records',

    btnPrint: 'Print',
    btnFind: 'Find',
    btnSearch: 'Overview...',
    btnClose: 'Close',
    btnSave: 'Save',
    btnExport: 'Export FTS',
    btnContList: 'List',
    btnSmgs: 'Document',

    delTitle: 'Deletion...',
    delMsg: 'Are you sure you want to delete..?',
    maskMsg: 'Data request...',
    showTitle: 'Attention',
    showMsg1: 'Was sent!',
    showMsg2: 'Mistake!',
    showMsg3: 'Saved!',
    errorMsg: 'Attention! Mistake...',
    waitMsg: 'File download...',
    waitMsg1: 'Save data in progress...',

    titlePrint: "Printing",
    labelBlank: "With blank?",
    textPrint: "Print",

    headerData: 'Creation data',
    headerMsg: 'Message',
    headerWho: 'Who?',

    titleDocsCopy: 'Docs list for copy',
    headerName: 'Name',
    btnCopy: 'Copy',
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

    successMsgTitle: 'The operation has been finished successfully',
    processed:'Processed',
    docs: 'documents'
});

Ext.define("TK.locale.en.controller.Ajax", {
    override: "TK.controller.Ajax",

    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Aviso", {
    override: "TK.controller.docs.Aviso",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Avisogu29k", {
    override: "TK.controller.docs.Avisogu29k",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Cim", {
    override: "TK.controller.docs.Cim",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Cimsmgs", {
    override: "TK.controller.docs.Cimsmgs",

    titleOtpr: 'Handbook of consignors/consignees',
    headerOtprName: 'Name',
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
    tooltipEdit: 'Edit',
    tooltipDel: 'Delete'
});

Ext.define("TK.locale.en.controller.docs.Cmr", {
    override: "TK.controller.docs.Cmr"
});

Ext.define("TK.locale.en.controller.docs.Epd", {
    override: "TK.controller.docs.Epd"
});

Ext.define("TK.locale.en.controller.docs.File", {
    override: "TK.controller.docs.File",

    waitMsg1: 'Save data in progress...',
    delTitle: 'Deleting...',
    delMsg: 'Are you sure you want to delete...?',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.controller.docs.Gu27v", {
    override: "TK.controller.docs.Gu27v",

    titleEpd: 'EPD is not downloaded',
    msgEpd: 'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.en.controller.docs.Gu29k", {
    override: "TK.controller.docs.Gu29k",

    titleEpd: 'EPD is not downloaded',
    msgEpd: 'Click on the link with EPD to start the download'
});

Ext.define("TK.locale.en.controller.docs.Invoice", {
    override: "TK.controller.docs.Invoice",

    titleEpd: 'EPD is not downloaded',
    msgEpd: 'Click on the link with EPD to start the download',
    titlePrint      :'Print options',
    lblCodes        :'Codes',
    lblCodes6       :'6 symbols',
    lblCodes10      :'10 symbols',
    lblOptions      :'Options',
    lblTnved        :'TNVED',
    lblTnvedNzgr    :'TNVED+Name',
    lblWithCost     :'With cost',
    btnPrint        :'Print',
    msgTitleWarn    :'Warning',
    msgTxtSeveralDocs:'There is more than one filled  document in  the document!<br>You can generate specification only when only one document is filled!'
});

Ext.define("TK.locale.en.controller.Logs", {
    override: "TK.controller.Logs",

    titleFilter: 'Filter',
    lableDate: 'Creation data',
    lableDate1: 'from',
    lableDate2: 'till',
    labelUser: 'User',

    btnFind: 'Find'
});

Ext.define("TK.locale.en.controller.Menu", {
    override: "TK.controller.Menu",

    errorMsg: 'Attention! Mistake...',
    warning:'Warning!',
    warnMsg:'Are you sure want to exit?<br>Unsaved data can be lost!'
});

Ext.define("TK.locale.en.controller.Project", {
    override: "TK.controller.Project",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...',
    showTitle: 'Attention! Deleting not allowed...',
    showMsg: 'If you want to delete the Project, please, delete all EPD from routes first'
});

Ext.define("TK.locale.en.controller.docs.Smgs", {
    override: "TK.controller.docs.Smgs",

    titleEpd: 'EPD is not downloaded',
    titleDownldInv: 'Download Invoices',
    msgEpd: 'Click on the link with EPD to start the download',
    errorMsg: 'Attention! Mistake...',
    btnClose: 'Close',
    btnSave: 'Save',
    btnFind: 'Find'
});

Ext.define("TK.locale.en.controller.Doc2Doc", {
    override: "TK.controller.Doc2Doc",

    titleDownldInv: 'Download Invoices',
    errorMsg: 'Attention! Mistake...',
    btnClose: 'Close',
    btnSave: 'Save',
    btnFind: 'Find',

    btnContList: 'List',
    btnSmgs: 'Document',
    titleContList: 'Enter train num(-s[,])',
    labelWagenNums: 'Train number(-s[,]):',
    titleFilterPer: 'Train filter',
    warnTitle: 'Warning',
    saveMgs: 'Save the document',
    successMsgTitle: 'The operation has been finished successfully',
    processed:'Processed',
    docs: 'documents',
    titleWarning:'Warning',
    msgSaveBeforeImport:'Save document before Invoice import'
});

Ext.define("TK.locale.en.controller.User", {
    override: "TK.controller.User",

    maskMsg: 'Data request...',
    errorMsg: 'Attention! Mistake...',
    waitMsg1: 'Saving data in the process...',
    titleNoUser: 'Warning',
    msgNoUser: 'Choose a user to perform an operation'
});

Ext.define("TK.locale.en.controller.Nsi", {
    override: "TK.controller.Nsi",
    titleUpload: 'Upload handbook',
    labelSelectFile: 'Select file for the upload...',
    labelFile: 'File',
    btnSave: 'Save',
    btnClose: 'Close',
    btnSearch: 'Overview...',
    titleErrorWarning: 'Warning',
    warningFillErrors: 'Underlined fields are too long'
});

Ext.define("TK.locale.en.controller.docs.PlombsTreeDetailController", {
    override: "TK.controller.docs.PlombsTreeDetailController",
    msgTitle: 'Warning',
    msgSplit: 'Split plomb strings with separators: , and ;<br>In records:<br>'
});

Ext.define("TK.locale.en.view.nsi.List", {
    override: "TK.view.nsi.List",

    title1: "Groups",
    titleRoad: 'List of railroads',
    titleRoute: 'Handbook of routes',
    titleProject: 'Handbook of projects',
    titleManagement: 'Handbook of railroads administrations',
    titleSta: 'Handbook of railroads stations',
    titleCountries: 'Handbook of countries',
    titleCountriesZhd: 'Handbook of railroads countries',
    titleDangerous: 'Handbook of dangerous cargo',
    titleKarantin: 'Handbook of quarantine cargo',
    titleVeterin: 'Handbook of veterinary cargo',
    titleGng: 'Handbook of NHM codes',
    titleEtsng: 'Handbook of ETSNG codes',
    titleDocs: 'Handbook of documents types',
    titlePlat: 'Handbook of payers by railroads (forwarders)',
    titleOtpr: 'Handbook of juridical persons (consignors/consignees)',
    titleDocs1: 'Documents handbook',
    titleCurrency: 'Currency handbook',
    titleTnved: 'HS handbook',
    titleDeliv: 'Handbook of delivery terms',
    titleUpak: 'Handbook of package types',

    headerName: 'Name',
    headerProject: 'Project',
    headerRoute: 'Route',
    headerDescr: 'Description',
    headerCode: 'Code',
    headerNDog:'Contract number',
    headerPZ:'PZ',
    headerWZ:'WZ',
    headerDatDog:'Contract date',
    headerGroups:'Groups',
    headerCountryRu: 'Country(RU)',
    headerCountry: 'Country',
    headerCountryS: 'Country,abbr',
    headerStn: 'Station(RU)',
    headerStn1: 'Station(CN)',
    headerStn2: 'Station(EN)',
    headerZhD: 'Railroad',
    headerCodeAdm: 'Adm. code',
    headerWay: 'Road',
    headerWayCode: 'Road code',
    headerCoedEdi: 'Code UN/EDIFACT',
    headerCustCode: 'Custom`s code',
    headerName1: 'Name(RU)',
    headerName2: 'Name(CH)',
    headerName3: 'Name(other)',
    headerPayerMeth: 'Payment method',
    headerPayerCode: 'Payer`s code',
    headerPayerCode1: 'Subcode of the code',
    headerPayerCode2: 'Subcode of the subcode',
    headerCountryCode: 'Country code',
    headerCountryName: 'Country name',
    headerCity: 'City',
    headerAddress: 'Address',
    headerOtprZip: 'Zip code',
    headerDopInfo: 'Additional Info',

    carrierTitle: 'Carrier handbook',
    headerSt: 'Station',
    headerCar: 'Carrier, number',
    headerCarName: 'Carrier, name',
    headerCarShort: 'Carrier, name short',

    ttipSave: 'Save',
    ttipDel: 'Delete',
    btnClose: 'Close',
    tooltipEdit: 'Edit',
    tooltipDel: 'Delete',

    zayavClientTitle        :'Orders',
    zayavClientClmnNZayav   :'Order №',
    zayavClientClmnClient   :'Client',
    zayavClientClmnDate     :'Order date',
    storeError              :'Warning! List loading error...'
});

Ext.define("TK.locale.en.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Print settings",
    labelBlank: "With blank?",
    labelFiles:'Separate file for each document',
    printAll:'Print all pages',
    printFirst:'Print only first pages',
    printForth:'Print only forth pages',
    textPrint: "Print",
    textPages: 'Pages for print',
    textPage: 'Page ',
    textPageBack: '(back)',
    printTitle: 'Print documents',
    printMsg: 'Document(-s) will be printed'
});

Ext.define("TK.locale.en.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",

    titleText: 'Bind print template',
    titleSelectText: 'Select print template',
    columnText: 'Name',
    btnBindText: 'Bind',
    btnBindPrintText: 'Print',
    btnClose: 'Close',
    msgTitle: 'Warning',
    msgMsg: 'Please, select a record'
});

Ext.define("TK.locale.en.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Car',
    titleCont: 'Container',
    titleCargo: 'Cargo',
    titleDanCargo: 'Dan Cargo',

    btnDel: 'Delete',
    btnClose: 'Close',
    btnSave: 'Save',
    btnVagText: '+ Car',
    btnContText: '+ Container',
    btnCargoText: '+ Cargo',
    btnDanCargoText: '+ Dan.Cargo',
    btnDocText: '+ Doc',
    btnPlombText: '+ Seal',
    btnSearch: 'Search',
    btnExpandAll: 'Expand All',
    btnCollapseAll: 'Collapse All',
    btnImportXLSvag: 'Wagon list import',
    btnImportXLSCont: 'Container list import'
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

/*Ext.define("Ext.locale.en.form.field.Base", {
    override: "Ext.form.field.Base",

    kontNumText: 'This field must have the container number in the format ABCD1234567',
    vagNumText: 'This field must have the number of the narrow(8 symbols) or the wide(12 symbols) wagon',
    vagNumUzkText: 'This field must have the number of the narrow wagon in the format 123456789012',
    vagNumShirText: 'This field must have the number of the wide wagon in the format 12345678',
    vagNumLastDigitText: 'Invalid key digit',
    kontNumLastDigitText: 'Invalid key digit'
});*/

Ext.define("TK.locale.en.Validators", {
    override: "TK.Validators",

    kontNumText: 'This field must have the container number in the format ABCD1234567',
    vagNumText: 'This field must have the number of the narrow(8 symbols) or the wide(12 symbols) wagon',
    vagNumUzkText: 'This field must have the number of the narrow wagon in the format 123456789012',
    vagNumShirText: 'This field must have the number of the wide wagon in the format 12345678',
    vagNumLastDigitText: 'Invalid key digit',
    kontNumLastDigitText: 'Invalid key digit',
    notXLS: 'Not a xls/xlsx file'
});

Ext.define("TK.locale.en.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Customs code',
    labelTextRu: 'Text(ru)',
    labelText: 'Text'
});

Ext.define("TK.locale.en.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Documents attached by sender',
    titleUpload: 'Uploading',
    btnClose: 'Close',
    btnSave: 'Save',
    labelUpload: 'Upload',
    labelFile: 'File',
    downloadTpl:'Download template'
});

Ext.define("TK.locale.en.view.ved.List", {
    override: "TK.view.ved.List",
    btnCreate: 'Create',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
    headerID: 'ID',
    headerCreation: 'Creation',
    headerDateTime: 'Date&Time',
    headerUser: 'User',
    headerVagVedNum: 'Wagon list №',
    headerPerVedNum: 'Transfer list №',
    headerTraneNum: 'Train №',
    headerTraneName: 'Train name',
    headerVagCount: 'Wagon count',
    title: 'Wagon and transfer lists',
    btnPrint: 'Print PDF',
    btnA4VagPrint: 'А4-Wagon list',
    btnA3VagPrint: 'А3-Wagon list',
    btnA4PerPrint: 'А4-Transfer list',
    btnA3PerPrint: 'А3-Transfer list',
    delMsg1: 'Deleting ...',
    delMsg2: 'You are going to delete kist. Are you sure?',
    delErr1: 'Deleting ...',
    delErr2: 'There was an error during delete process'
});

Ext.define("TK.locale.en.controller.docs.Ved", {
    override: "TK.controller.docs.Ved",
    titleEdit: 'Edit',
    waitMsg: 'Saving',
    btnSelect: 'Select',
    btnClose: 'Close',
    labelDocs: 'Waybill list',
    headerNumClaim: 'Waybill',
    headerVags: 'Wagon №',
    headerCreate: 'Creation date',
    headerKont: 'Container №',
    headerTrain: 'Train №',
    headerNstn: 'Destination<br/>station',
    headerRoute: 'Route',
    headerGng: 'NHM',
    filterText: 'Filter',
    duplicateAll: 'Duplicate all',
    duplicateEmpty: 'Duplicate empty',
    labelFilter: 'Filter',
    filterHeader: 'Data',
    userfiltr: 'Filter',
    claerAll: 'Clear all'
});

Ext.define("TK.locale.en.view.ved.Form", {
    override: "TK.view.ved.Form",
    title: 'List',
    fldLblNum: 'List №',
    fldLblDate: 'Date',
    fldLblTrain: 'Train',
    fldLblTrainName: 'Train name',
    fldLblCarrOutName: 'Carrier from',
    fldLblCarrInName: 'Carrier to',
    fldLblStnOut: 'station',
    fldLblStnIn: 'station',
    fldLblRoadOut: 'From road',
    fldLblRoadIn: 'To road'

});

Ext.define("TK.locale.en.view.ved.VagsList", {
    override: "TK.view.ved.VagsList",
    title: 'Documents list',
    colTextIndex: '№',
    colTextNvag: 'Wagon<br>№',
    colTextOwner: 'Wagons<br>owner',
    colTextKind: 'Wagons<br>kind',
    colTextGp: 'Wagons<br>max load,m.t.',
    colTextAxis: 'Axis<br>count',
    colTextTara: 'Wagones<br>tara,m.t.',
    colTextPlomb: 'Plombs',
    colTextKpl: 'Quantity',
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
    colTextPrim: 'Notes',
    colTextPerVed: 'Transfer<br>list № ',
    btnAdd: 'Add',
    btnDelete: 'Delete',
    btnLoad: 'Close',
    btnCancelFilters: 'Cancel filters'
});

Ext.define("TK.locale.en.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Routes list',
    btnView: 'Show documents'
});

Ext.define("TK.locale.en.view.pogruz.PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title: 'Trains',
    btnFind: 'Find',
    btnFilter: 'Filter',
    btnClose: 'Close',
    btnReset: 'Reset',
    lableDate: 'Date from',
    lableDate1: 'Date to',
    train: 'Train number',
    count: 'Quantity',
    btnOk: 'Choose',
    btnCancel: 'Cancel',
    errorMsg: 'Attention! Mistake...'
});

Ext.define("TK.locale.en.view.pogruz.SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title: 'Waybill by train number',
    btnClose: 'Close',
    headerG694: '№<br/>waybill',
    headerAltered: 'Altered',
    btnOk: 'Choose',
    btnCancel: 'Cancel',
    headerContNum: '№ container',
    headerVagNum: '№ wagon',
    headertNstn: 'Destination<br/>station'
});

Ext.define("TK.locale.en.view.pogruz.Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title: 'Loading list',
    headerWagN: '№ wagon<br/><b>list</b>',
    headerKonN: '№ container<br/><b>list</b>',
    headerKonNdb: '№ container<br/><b>db</b>',
    headerG694: '№waybill<br/><b>list</b>',
    headerKlient: 'Owner<br/><b>list</b>',
    headerFoot: 'Size foot<br/><b>list</b>',
    headerContSize: 'Type<br/><b>list</b>',
    headerPlomb: 'Plombs<br/><b>list</b>',
    headerTara: 'Tara,weight<br/>container, kg<br/><b>list</b>',
    headerMaxLoad: 'Max load<br/>container, t<br/><b>list</b>',
    headerTaraVag: 'Tara,weight<br/>wagon<br/><b>list</b>',
    headerMaxLoadVag: 'Max load<br/>wagon<br/><b>list</b>',
    headerKolOs: 'Axis<br/><b>list</b>',
    headerId: 'Id<br/><b>db</b>',

    btnOk: 'Choose',
    btnCancel: 'Cancel',
});

Ext.define("TK.locale.en.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText: 'records per page'
});

Ext.define("TK.locale.en.view.edit.StationCatalogEdit", {
    override: "TK.view.edit.StationCatalogEdit",

    title: 'Station',
    btnSave: 'Save',
    btnCancel: 'Cancel',
    lblStaRu: 'Station(ru)',
    lblStaEn: 'Station(en)',
    lblStaCn: 'Station(cn)',
    lblStaNo: 'Code',
    lblMnamerus: 'Railroad',
    lblManagno: 'Administaration<br>code',
    lblCtryNam: 'Country name'
});

Ext.define("Ext.locale.en.grid.plugin.RowEditing", {
    override: "Ext.grid.plugin.RowEditing",

    saveBtnText: 'Save',
    cancelBtnText: 'Cancel',
    errorsText: 'Error',
    dirtyText: 'You need to commit or cancel your changes',
    chEvery: 'Change all on ',
    chEmpty: 'Change empty on '
});

Ext.define("TK.locale.en.view.components.g7vagsmgs2", {
    override: "TK.view.components.g7vagsmgs2",

    drophlp: 'Drop the record in the desired place'
});
Ext.define("TK.locale.en.view.components.g19plombsmgs2", {
    override: "TK.view.components.g19plombsmgs2",

    totalCount: 'Total'
});
Ext.define("TK.locale.en.view.edit.SelectCopy2AvisoElements", {
    override: "TK.view.edit.SelectCopy2AvisoElements",

    title: 'Create a template',
    headtext: 'Name',
    headngraph: 'N item',
    choose: 'Choose',
    cancel: 'Cancel'
});
Ext.define("TK.locale.en.Utils", {
    override: "TK.Utils",

    processed:'Processed documents:',
    wrongAviso: 'Wrong template!<br>Check if the quantity of wagons/containers/cargo is less or equal 1',
    unProcDocs:'Shipping type is different from shipping type of the template<br>in the following documents:',
    successMsgTitle:'The operation has been finished successfully',
    request:'Request...',
    dataErrorHdr:'Warning! Data check failure',
    dataErrormsg:'Check fields for correct data'
});
Ext.define("TK.locale.en.view.edit.GroupEdit", {
    override: "TK.view.edit.GroupEdit",

    title:'Group edit',
    lookDoc:'look doc.',
    nvagHdr:'№ wagon',
    sortHdr:'№ in row',
    klientNameHdr:"Wagon's owner",
    vagOtmHdr:'Wagon<br>is given',
    grPodHdr:'Tonnage,t',
    kolOsHdr:'Axis',
    taraVagHdr:'Tara<br>wagon,t',
    utiNHdr:'Container',
    utiTypeHdr:'Size<br>Type',
    grPodKontHdr:'Max load,t',
    taraKontHdr:'Container<br>tara, kg',
    massaHdr:'Net weight,kg',
    bruttoHdr:'Gross weight,kg',
    kgvnHdr:'NHM',
    placesHdr:'Places',
    rodHdr:'Package',
    g22Hdr:'Loaded by',
    gs_48Hdr:'Mass determination<br>method',
    g694Hdr:'№ CIM/SMGS',
    g281Hdr:'Date of<br>CIM/SMGS',
    npoezdHdr:'Train №',
    plombsHdr:'Plombs',
    changeAll:'Change all on ',
    changeEmpty:'Change empty on ',
    makeAllZeroes:'Change all on 0',
    makeAllEmpty:'Change empty on ""',

    btnSave:'Save',
    btnCancel:'Cancel'
});
Ext.define("TK.locale.en.view.edit.RouteSelect", {
    override: "TK.view.edit.RouteSelect",

    title:'Choose destination route',
    btnChoose:'Choose',
    btnCancel:'Cancel',
    labelCopy:'Copy',
    labelMove:'Move',
    showTitle: 'Warning',
    noRouteSelMsg:'No route selected',
    sameRouteMsg:'Destination route is the same as current'
});

//--------------- контейнерная площадка
Ext.define("TK.locale.en.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerNKont        :'Train №',
    headerDateIn        :'Arrival date',
    headerDateOut        :'Departure date',
    headerSector        :'Sector',
    headerLoaded        :'Loaded',
    headerStorageType        :'Storage type',
    headerXYZ        :'Coordinates',
    title:'Container yard'
});

Ext.define("TK.locale.en.view.ky2.yard.YardList", {
    override:"TK.view.ky2.yard.YardList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerNKont        :'Container №',
    headerDateIn        :'Arrival date',
    headerDateOut        :'Departure date',
    headerSector        :'Sector',
    headerLoaded        :'Loaded',
    headerStorageType        :'Storage type',
    headerXYZ        :'Coordinates',
    headerTara         :'Tara,t',
    headerBrutto        :'Gross weight,kg',
    headerMaxLoad       :'Tonnage,t',
    headerContSize      :'Size Type',
    headerTrNum     :'Train № by arrival',
    headerArrDate       :'Arrival date',
    headerClient        :'Client',
    title:'Container yard',
    btnEditKont     : 'Edit container',
    btnKont         :'Container',
    btnCreateKont   :'Create container',
    btnSwitchClient :'Change client',
    btnClearFilter  :'Clear filter',
    btnActions      :'Actions',
    btnXLSsearch    :'XLS (search)',
    btnXLSexport    :'XLS (export)',
    btnXLSrefresh   :'XLS (refresh)',
    btnDelClient    :'Delete container'
});

Ext.define("TK.locale.en.controller.ky.Yard", {
    override:"TK.controller.ky.Yard",

    titleEdit:'Edit container yard position',
    titleCreate:'Create container yard position',
    delTitle :'Deleting...',
    delMsg   :'Are you sure want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    headerName       :'Name',
    headerDescr      :'Description'
});

Ext.define("TK.locale.en.controller.ky2.YardController", {
    override:"TK.controller.ky2.YardController",

    titleEdit:'Edit container yard position',
    titleCreate:'Create container yard position',
    delTitle :'Deleting...',
    delMsg   :'Are you sure want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    headerName       :'Name',
    headerDescr      :'Description',
    titleCreateSector:'Create sector',
    titleEditSector  :'Edit sector'
});

Ext.define("TK.locale.en.view.ky.yard.Form", {
    override:"TK.view.ky.yard.Form",

    labelNKont:'Container №',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Arrival date',
    labelDate  :'date',
    labelTime  :'time',
    labelDateOut  :'Replacement',
    labelSector  :'Sector',
    labelLoaded  :'Loaded',
    labelStorageType  :'Storage type',
    labelStorageVACANT  :'Vacant position',
    labelStorageTEMPORALLY  :'Temporal position',
    labelStorageSTORAGE  :'Storage',
    labelMileage  :'Mileage(km)',
    labelNotes  :'Notes',
    msgSearch  :'Searching...',
    msgNothingFound:'Nothing found'
});

Ext.define("TK.locale.en.view.ky2.yard.YardForm", {
    override:"TK.view.ky2.yard.YardForm",

    labelNKont:'Container №',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Arrival date',
    labelDate  :'date',
    labelTime  :'time',
    labelDateOut  :'Replacement',
    labelSector  :'Sector',
    labelLoaded  :'Loaded',
    labelStorageType  :'Storage type',
    labelStorageVACANT  :'Vacant position',
    labelStorageTEMPORALLY  :'Temporal position',
    labelStorageSTORAGE  :'Storage',
    labelMileage  :'Mileage(km)',
    labelNotes  :'Notes',
    msgSearch  :'Searching...',
    msgNothingFound:'Nothing found'
});

Ext.define("TK.locale.en.view.ky.yard.Filter", {
    override:"TK.view.ky.yard.Filter",

    title: 'Filter',
    btnFilter         :'Filter',
    btnClear     :'Clear',
    btnClose        :'Close',
    labelNKont:'Container №',
    labelDateIn  :'Arrival date',
    labelDate  :'date',
    labelTime  :'time',
    labelDateOut  :'Replacement',
    labelDateFrom  :'from',
    labelDateTo  :'to',
    labelSector  :'Sector',
    labelLoaded  :'Loaded',
    labelNotLoaded:'Empty',
    labelStorageType  :'Storage type',
    labelStorageVACANT  :'Vacant position',
    labelStorageTEMPORALLY  :'Temporal position',
    labelStorageSTORAGE  :'Storage',
    msgSearch  :'Searching...',
    msgNothingFound:'Nothing found'
});

Ext.define("TK.locale.en.view.ky2.yard.Filter", {
    override:"TK.view.ky2.yard.Filter",

    title: 'Filter',
    btnFilter         :'Filter',
    btnClear     :'Clear ',
    btnClose        :'Close ',
    labelNKont:'Container №',
    labelDateIn  :'Arrival date',
    labelDate  :'date',
    labelTime  :'time',
    labelDateOut  :'Replacement',
    labelDateFrom  :'from',
    labelDateTo  :'to',
    labelSector  :'Sector',
    labelLoaded  :'Loaded',
    labelNotLoaded:'Empty',
    labelStorageType  :'Storage type',
    labelStorageVACANT  :'Vacant position',
    labelStorageTEMPORALLY  :'Temporal position',
    labelStorageSTORAGE  :'Storage',
    msgSearch  :'Searching...',
    msgNothingFound:'Nothing found',
    labelArrivalFrom:'Arrival, from',
    labelArrivalTill:'Arrival, till',
    lblInternationalTrNum:'International train №',
    labelClient:'Client',
    labelContainer:'Container'
});

Ext.define("TK.locale.en.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    storage_0       :"Vacant",
    storage_1       :"Temporal",
    storage_2       :"Storage"
});

Ext.define("TK.locale.en.view.ky2.yard.List", {
    override:"TK.view.ky2.yard.List",

    storage_0       :"Vacant",
    storage_1       :"Temporal",
    storage_2       :"Storage"
});

Ext.define("TK.locale.en.view.ky.AbstractForm", {
    override:"TK.view.ky.AbstractForm",

    btnSave         :'Save',
    btnCancel     :'Cancel'
});

Ext.define("TK.locale.en.view.ky2.AbstractForm", {
    override:"TK.view.ky2.AbstractForm",

    btnSave         :'Save',
    btnSaveExit     :'Save&Exit',
    btnClose        :'Close',
    btnCancel     :'Cancel',
    lblPosition     :'Position',
    lblRow          :'Row',
    lblFloor        :'Floor',
    lblSector       :'Sector ',
    lblName             :'Name',
    lblDescription      :'Description',
    lblUsrGroups        :'User groups'
});

Ext.define("TK.locale.en.view.ky.BaseList", {
    override:"TK.view.ky.BaseList",

    btnEdit     :'Edit',
    btnDelete   :'Delete',
    btnFilter   :'Filter',
    warnTitle:'Warning',
    warnMsg  :'You should select row from data table',
    btnVgCtGr:'+Wagon/Container/Cargo',
    btnFromCar:'By truck',
    btnFromTrainByArr:'+ From train by arrival',
    btnReports:'Reports'
});

Ext.define("TK.locale.en.view.ky2.BaseList", {
    override:"TK.view.ky2.BaseList",

    btnEdit     :'Edit',
    btnDelete   :'Delete',
    btnFilter   :'Filter',
    warnTitle:'Warning',
    warnMsg  :'You should select row from data table',
    btnVgCtGr:'+Wagon/Container/Cargo',
    btnVgCt:'Container/Cargo',
    btnDocs:'Attached documents',
    btnFromCar:'By truck',
    btnFromTrainByArr:'+ From train by arrival',
    btnReports:'Reports',
    btnWide:'On a wide',
    btnCreateFromOrder:'Create from order',
    btnCopy:'Copy',
    btnAddTrackByArr:'+ Truck by departure',
    btnPrint:'Print',
    btnSectors:'Sectors',
    noData:'No data'
});

Ext.define("TK.locale.en.view.ky.AbstractList", {
    override:"TK.view.ky.AbstractList",

    btnCreate   :'Create',
    btnReport:'Report'
});

Ext.define("TK.locale.en.view.ky2.AbstractList", {
    override:"TK.view.ky2.AbstractList",

    btnCreate   :'Create',
    warnTitle:'Warning',
    warnMsg  :'You should select row from data table',
    btnReport:'Report',
    btnUniversalMap:'Universal map',
    btnFilter   :'Filter',
    noData:'No data',
    labelNWag:'Wagon №',
    btnChoose:'Choose',
    labelNOrder:'Order №',
    lblTrainNum         :'Train №',
    loadingTxt          :'Searching',
    emptyText           :'Nothing found',
    columnLblName       :'Name',
    columnLblDescription:'Description',
    columnLblGroups     :'Groups',
    btnEdit             :'Edit',
    btnDelete           :'Delete'
});

Ext.define("TK.locale.en.view.ky.AbstractWindow", {
    override:"TK.view.ky.AbstractWindow",

    btnClose         :'Close'
});

Ext.define("TK.locale.en.view.ky2.AbstractWindow", {
    override:"TK.view.ky2.AbstractWindow",

    btnClose         :'Close'
});

Ext.define("TK.locale.en.view.ky.poezd.into.List", {
    override:"TK.view.ky.poezd.into.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerPoezdNum        :'Train №',
    headerKoleya        :'Track',
    headerDateIn        :'Arrival',
    title:'Train list by Arrival'
});

Ext.define("TK.locale.en.view.ky2.poezd.BasePoezdList", {
    override:"TK.view.ky2.poezd.BasePoezdList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerPoezdNum    :'Train №',
    headerPoezdNumM   :'International train №',
    headerKoleya      :'Track',
    headerVagCount    :'Wagon quantity',
    freeSpace         :'',
    // title:'Список поездов по прибытию',
    btnCreate   :'Create train',
    btnEdit     :'Edit train',
    btnCreateVags   :'Create wagon',
    btnEditVags     :'Edit wagon'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateIn        :'Arrival date',
    headerKontCount   :'Quantity of unloaded containers',
    btnToPoezdOut   : 'On train by departure',
    btnToYard     : 'On container yard',
    btnOnTrack:'On a track',
    btnAddTrain:'+ Train by departure',
    btnCreateFromOrder:'Create from order',
    title:'Train list by arrival'
    // btnCreate   :'Создать поезд',
    // btnEdit     :'Редактировать поезд',
    // btnCreateVags   :'Создать вагоны',
    // btnEditVags     :'Редактировать вагоны'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateOut        :'Departure date',
    headerKontCount :'Quantity of loaded container',
    btnFromPoezdInto   : 'From train by arrival',
    btnFromYard     : 'From container yard',
    title:'Train list by departure'
});

Ext.define("TK.locale.en.view.ky.poezd.out.List", {
    override:"TK.view.ky.poezd.out.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerPoezdNum        :'Train №',
    headerKoleya        :'Track',
    headerDateOut        :'Departure date',
    title:'Train list by departure'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.List", {
    override:"TK.view.ky2.poezd.out.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerPoezdNum        :'Train №',
    headerKoleya        :'Track',
    headerDateOut        :'Departure date',
    title:'Train list by departure'
});

Ext.define("TK.locale.en.view.ky.poezd.into.vagon.List", {
    override:"TK.view.ky.poezd.into.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Train\'s wagon list'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.vagon.List", {
    override:"TK.view.ky2.poezd.into.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Train\'s wagon list'
});

Ext.define("TK.locale.en.view.ky.poezd.out.vagon.List", {
    override:"TK.view.ky.poezd.out.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Train\'s wagon list'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.vagon.List", {
    override:"TK.view.ky2.poezd.out.vagon.List",

    headerVagonNum        :'Wagon №',
    title:'Train\'s wagon list'
});

Ext.define("TK.locale.en.view.ky.poezd.into.vagon.kont.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.List",

    headerKontNum        :'Container №',
    title:'Wagon\'s container list'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.vagon.kont.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.List",

    headerKontNum        :'Container №',
    title:'Wagon\'s container list'
});

Ext.define("TK.locale.en.view.ky.poezd.out.vagon.kont.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.List",

    headerKontNum        :'Container №',
    title:'Wagon\'s container list'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.vagon.kont.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.List",

    headerKontNum        :'Container №',
    title:'Wagon\'s container list'
});

Ext.define("TK.locale.en.view.ky.kontnotransp.List", {
    override:"TK.view.ky.kontnotransp.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerKontNum        :'Container №',
    title:'Container list'
});

Ext.define("TK.locale.en.view.ky2.kontnotransp.List", {
    override:"TK.view.ky2.kontnotransp.List",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerKontNum        :'Container №',
    title:'Container list'
});


Ext.define("TK.locale.en.view.ky.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky.BaseGruzList", {
    override:"TK.view.ky.BaseGruzList",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky2.BaseGruzList", {
    override:"TK.view.ky2.BaseGruzList",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.plomb.List",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.plomb.List",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky.BasePlombList", {
    override:"TK.view.ky.BasePlombList",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky2.BasePlombList", {
    override:"TK.view.ky2.BasePlombList",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.plomb.List",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.plomb.List",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky.kontnotransp.gruz.List", {
    override:"TK.view.ky.kontnotransp.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky2.kontnotransp.gruz.List", {
    override:"TK.view.ky2.kontnotransp.gruz.List",

    headerGruzCode        :'Code',
    headerGruzName        :'Name',
    title:'Container\'s cargo list'
});

Ext.define("TK.locale.en.view.ky.kontnotransp.plomb.List", {
    override:"TK.view.ky.kontnotransp.plomb.List",

    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.view.ky2.kontnotransp.plomb.List", {
    override:"TK.view.ky2.kontnotransp.plomb.List",
    headerPlombKpl        :'Quantity',
    headerPlombZnak        :'Plombs',
    title:'Container\'s plomb list'
});

Ext.define("TK.locale.en.controller.ky.Poezd", {
    override:"TK.controller.ky.Poezd",

    titleCreate: 'Create train',
    titleEdit: 'Edit train',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky2.PoezdController", {
    override:"TK.controller.ky2.PoezdController",

    titleCreate: 'Create train',
    titleCreateIntoWide: 'Create train t.1520 by arrival',
    titleCreateOutWide: 'Create train t.1520 by departure',
    titleCreateIntoNar: 'Create train t.1435 by arrival',
    titleCreateOutNar: 'Create train t.1435 by departure',
    titleEdit: 'Edit train',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    warningMsg:'Warning!',
    warningText:'Train unsaved....',
    uploadText:'Data uploaded',
    titleUpload: 'Upload XLS',
    labelSelectFile:'Select file for the upload...',
    labelFile:'File',
    btnSearch:'Search...',
    btnSave  :'Save',
    btnClose :'Close',
    titleConfirmation:'Confirmation',
    msgTrainByDeparture:'Create train by departure?',
    titleWarn:'Warning',
    msgInvalid:'Invalid form',
    errorTitle:'Error',
    noSelectionError:'Nothing was selected'
});

Ext.define("TK.locale.en.controller.ky2.PoezdZayavController", {
    override:"TK.controller.ky2.PoezdZayavController",

    titleCreate: 'Create order',
    titleCreateOrderImport:'Create order for import',
    titleCreateOrderExport:'Create order for export',
    titleEdit: 'Edit order',
    delTitle :'Deleting...',
    delOrderMsg:'Delete order?',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    warningMsg:'Warning!',
    warningText:'Order unsaved....',
    uploadText:'Data uploaded',
    titleUpload: 'Upload XLS',
    labelSelectFile:'Select file for the upload...',
    labelFile:'File',
    btnSearch:'Search...',
    btnSave  :'Save',
    btnClose :'Close',
    formInvalid:'Form is not valid'
});

Ext.define("TK.locale.en.controller.ky2.AvtoCtGrController", {
    override:"TK.controller.ky2.AvtoCtGrController",

    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    warningMsg:'Warning!',
    warningText:'Truck unsaved....',
    uploadText:'Data uploaded',
    titleUpload: 'Upload XLS',
    labelSelectFile:'Select file for the upload...',
    labelFile:'File',
    btnSearch:'Search...',
    btnSave  :'Save',
    btnClose :'Close',
    titleCtGr:'Container/Cargo'
});

Ext.define("TK.locale.en.controller.ky.Vagon", {
    override:"TK.controller.ky.Vagon",

    titleCreate: 'Create wagon',
    titleEdit: 'Edit wagon',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky2.Vagon", {
    override:"TK.controller.ky2.Vagon",

    titleCreate: 'Create wagon',
    titleEdit: 'Edit wagon',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky.Gruz", {
    override:"TK.controller.ky.Gruz",

    titleCreate: 'Create truckgo',
    titleEdit: 'Edit truckgo',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky2.Gruz", {
    override:"TK.controller.ky2.Gruz",

    titleCreate: 'Create truckgo',
    titleEdit: 'Edit truckgo',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky.Kont", {
    override:"TK.controller.ky.Kont",

    titleCreate: 'Create container',
    titleEdit: 'Edit container',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky2.Kont", {
    override:"TK.controller.ky2.Kont",

    titleCreate: 'Create container',
    titleEdit: 'Edit container',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky.Plomb", {
    override:"TK.controller.ky.Plomb",

    titleCreate: 'Create plombs',
    titleEdit: 'Edit plombs',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.controller.ky2.Plomb", {
    override:"TK.controller.ky2.Plomb",

    titleCreate: 'Create plombs',
    titleEdit: 'Edit plombs',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',

    headerPoezdNum        :'Train №',
    headerKoleya        :'Track',
    headerDateIn        :'Arrival date',

    title:'Train list by arrival',

    btnCreate   :'Create train',
    btnEdit     :'Edit train',
    btnCreateVags   :'Create wagon',
    btnEditVags     :'Edit wagon'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',

    headerPoezdNum        :'Train №',
    headerKoleya        :'Track',
    headerDateOut        :'Departure',

    title:'Train list by departure'
});

Ext.define("TK.locale.en.view.ky2.poezd.BasePoezdForm", {
    override:"TK.view.ky2.poezd.BasePoezdForm",

    labelNppr         :'Train №',
    labelNpprm        :'International train №',
    labelKoleya       :'Track',
    labelKoleyaWide   :'Wide',
    labelKoleyaNarow  :'Tight',
    labelClient       :'Client',
    labelKstf         :'Formation station code',
    labelNstf         :'Formation station name',
    labelAdmf         :'Formation administration',
    labelKstn         :'Destination station code',
    labelNstn         :'Destination station name',
    labelAdmn         :'Road',
    labelArr      :'Arrival',
    labelDate     :'Date',
    labelTime     :'Time',
    labelImport     :'Import',
    labelImportXLS  :'XLS (Loading list)',
    labelXLSrefresh :'XLS (refresh)',
    labelPPV        :'BCh wagon list',
    labelImportFromOrder  :'+ import from order',
    labelVgCtGr     :'+Wagon/Container/Cargo'
});

Ext.define("TK.locale.en.view.ky2.avto.BaseAvtoList", {
    override:"TK.view.ky2.avto.BaseAvtoList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    headerAvtoNum      :'Truck №',
    headerAvtoTrail    :'Trailer №',
    headerNKont        :'Container №',
    headerDriverFam    :'Driver\'s name',
    headerDep          :'Point of departure',
    headerDest         :'Point of arrival',
    title:'List of cars upon arrival'
});

Ext.define("TK.locale.en.view.ky2.BaseAvtoZayavsDir", {
    override:"TK.view.ky2.BaseAvtoZayavsDir",

    headerZayavNum     :'Order №',
    headerAvtoNum      :'Truck №Track №',
    headerAvtoTrail    :'Trailer №',
    btnSelect          :'Select'
});

Ext.define("TK.locale.en.view.ky2.avto.into.AvtoList", {
    override:"TK.view.ky2.avto.into.AvtoList",

    headerDateIn       :'Arrival',
    btnToAvto          : "By truck on departure",
    btnToPoezd         : "By train on departure",
    btnToYard          : "On container yard",
    title              :'Car list by arrival',
    headerKontCount    :'Quantity of unloaded containers',
    headerPZWZ         :'№ PZ'
});

Ext.define("TK.locale.en.view.ky2.avto.BaseAvtoZayavList", {
    override:"TK.view.ky2.avto.BaseAvtoZayavList",

    headerCreation    :'Creation',
    headerDateTime    :'Date&Time',
    headerUser        :'User',
    txtUnload         :'Unload',
    txtLoad           :'Load'
});

Ext.define("TK.locale.en.view.ky2.into.AvtoZayavList", {
    override:"TK.view.ky2.avto.into.AvtoZayavList",

    title:'List of import orders'
});

Ext.define("TK.locale.en.view.ky2.avto.out.AvtoZayavList", {
    override:"TK.view.ky2.avto.out.AvtoZayavList",

    title:'List of export orders'
});

Ext.define("TK.locale.en.view.ky2.avto.out.AvtoList", {
    override:"TK.view.ky2.avto.out.AvtoList",

    headerDateOut      :'Departure date',
    btnToAvto          : "By truck on departure",
    btnToPoezd         : "By train on departure",
    btnToYard          : "On container yard",
    title              :'Car list by arrival',
    headerKontCount    :'Quantity of unloaded containers',
    headerPZWZ         :'№ WZ'
});

Ext.define("TK.locale.en.controller.ky2.AvtoController", {
    override:"TK.controller.ky2.AvtoController",

    titleCreate: 'Create truck',
    titleEdit: 'Edit truck',
    delTitle :'Deleting...',
    delMsg   :'Are you sure you want to delete..?',
    maskMsg :'Data request...',
    errorMsg:'Warning! Error...',
    warningMsg:'Warning!',
    warningText:'Truck is unsaved....',
    lblConfirmation:'Confirmation',
    msgCreateCarByDeparture:'Create truck by departure?',
    msgCarByDepartureConfirm:'Truck by departure was created',
    msgDataLoaded:'Data loaded',
    titeltError:'Error',
    msgNothingSel:'Nothing was selected',
    titleConfirm:'Confirmation',
    msgCopyTruck:'Copy truck?'
});

Ext.define("TK.locale.en.controller.ky2.PoezdVgCtGrController", {
    override:"TK.controller.ky2.PoezdVgCtGrController",

    titleTree       : 'Wagon/Container/Cargo',
    titleTreeVgCt       : 'Wagon/Container'
});

Ext.define("TK.locale.en.view.ky2.AbstractTreeForm", {
    override:"TK.view.ky2.AbstractTreeForm",

    btnSave       : 'Save',
    btnSaveExit   : 'Save&Exit',
    btnClose      : 'Close',
    btnEditPoezd  : 'Edit train',
    ttipEditOrder         :'Edit order',
    ttipEditTruck           :'Edit truck',
    ttipByTruckDeparture    :'By truck upon departure',
    ttipByTruckArrival      :'By truck upon arrival',
    ttipByTrainDeparture    :'By train upon departure',
    ttipByTrainArrival      :'By train upon arrival',
    ttipOnCYard             :'On container yard',
    ttipHideWags            :'Hide wagons',
    ttipShowWags            :'Show wagons',
    ttipHide                :'Collapse',
    ttipShow                :'Expand',
    btnAddWag               :'+ Wagon',
    btnAddCont              :'+ Container',
    btnAddCorgo             :'+ Cargo',
    btnAddPlomb             :'+ Seal',
    titleWag                :'Wagon',
    labelArrival            :'Arrival',
    labelNvag               :'№ wagon',
    labelNtrack             :'Track №',
    labelTonnage            :'Tonnage, т',
    labelKolOs              :'Axis',
    labelTaraWag            :'Tara',
    labelOwner              :'Owner',
    titleCont               :'Container',
    labelNum                :'Number',
    labelCont               :'Container',
    labalOtpr               :'CIM/SMGS №',
    labelNorder             :'Order №',
    labelDeparture          :'Departure',
    labelDate               :'Date',
    labelTime               :'Time',
    labelEmtyWag            :'Empty',
    labelBrutto             :'Gross weight,kg',
    labelTara               :'Tara, kg',
    labelTotalBrutto        :'Total gross weight,kg',
    labelSize               :'Size',
    labelContSize           :'Size Type',
    labelClient             :'Client',
    labelNotes              :'Notes',
    titleCargo              :'Cargo',
    labelCodeGng            :'NHM code',
    labelNameGng            :'NHM name',
    labelPackage            :'Package',
    labelPlaces             :'Places',
    labelMassa              :'Weight, kg',
    titlePlomb              :'Seal',
    labelPlomb              :'Seal',
    labelSealingStation     :'Sealing station',
    labelQuantity           :'Quantity',
    btnAct                  :'Act',
    btnInterchange          :'INTERCHANGE',
    btnDelete               :'Delete'
});
Ext.define("TK.locale.en.ky2.AbstractBindTreeForm", {
    override:"TK.view.ky2.AbstractBindTreeForm",

    btnSave       : 'Save',
    btnSaveExit   : 'Save&Exit',
    btnClose      : 'Close',
    btnEditPoezd  : 'Edit train',
    btnVgCtGr     : '+Wagon/Container/Cargo',
    ttipHideWags            :'Hide wagons',
    ttipShowWags            :'Show wagons',
    ttipHide                :'Collapse',
    ttipShow                :'Expand',
    labelMove       :'Move',
    labelMoveAll    :'Move all',
    lblOrder               :'Order',
    btnRest             :'Reset',
    btnFiltr            :'Filter'

});

Ext.define("TK.locale.en.ky2.avto.AvtoBindTreeForm", {
    override:"TK.view.ky2.avto.AvtoBindTreeForm",

    btnSave       : 'Save',
    btnSaveExit   : 'Save&Exit',
    btnClose      : 'Close',
    btnEdit       : 'Edit truck',
    btnVgCtGr     : 'Container/Cargo',
    ttipMove      :'Move',
    lblOrder      :'Zamówienie',
    btnRest             :'Reset',
    btnFiltr            :'Filtr'
});

Ext.define("TK.locale.en.view.ky2.poezd.zayav.PoezdZayavList", {
    override:"TK.view.ky2.poezd.zayav.PoezdZayavList",

    title:'Train orders list'
});

Ext.define("TK.locale.en.view.ky2.poezd.BasePoezdZayavList", {
    override:"TK.view.ky2.poezd.BasePoezdZayavList",

    headerOrderNum      :'Order №',
    headerTrainNum      :'Train №',
    headerClient        :'Client',
    headerOrderType     :'Order type',
    headerWagonQuantity     :'Wagon quantity',
    headerContainerQuantity     :'Container quantity',
    headerCreation      :'Creation',
    headerDateTime      :'Date&time',
    headerUser          :'User'
});

Ext.define("TK.locale.en.view.ky2.avto.BaseAvtoZayavList", {
    override:"TK.view.ky2.avto.BaseAvtoZayavList",

    title: 'Truck order list',
    headerOrderNum      :'Order №',
    headerAvtoNum      :'Truck №',
    headerTrailerNum      :'Trailer №',
    headerDriver        :'Driver',
    headerClient        :'Client',
    headerContainerNum     :'Container №',
    headerOrderType     :'Order type'
});

Ext.define("TK.locale.en.view.ky2.client.ClientList", {
    override:"TK.view.ky2.client.ClientList",

    title: 'Client',
    headerSector        :'Sector',
    headerPlace         :'Placement',
    headerContainer     :'Container',
    headerTara          :'Tara',
    headerBrutto        :'Gross weight,kg',
    headerContainerNum  :'Container №',
    headerContSize      :'Size type',
    headerTrainNbyArrival  :'Train №<br/>by arrival',
    hederArrDate        :'Arraival<br/>date',
    headerClient        :'Client',
    headerDaysInKP      :'In storage<br/>(days)'
});

Ext.define("TK.locale.en.view.ky2.ReportParams", {
    override:"TK.view.ky2.ReportParams",

    title: 'Report parameters',
    labelDepArr        :'Arrival/Departure',
    labelFrom         :'from',
    labelTo             :'to',
    labelIntTrainNumber          :'International train №',
    loadintTxt          :'Search',
    emptyText           :'Nothing found',
    labelClient      :'Client',
    labelVehicleByArr  :'Vehicles by arrival',
    labelVehicleByDep  :'Vehicles by departure',
    buttonOk            :'Ok',
    buttonClear        :'Clear',
    buttonClose      :'Close',
    storeTxtAll         :'All',
    storeTxtArrival     :'Arrival',
    storeTxtDeparture   :'Departure',
    storeTxtVagon       :'Vagon',
    storeTxtTruck       :'Truck'
});

Ext.define("TK.locale.en.view.edit.ClientEdit", {
    override:"TK.view.edit.ClientEdit",

    title          : 'Client',
    btnSave        :'Save',
    btnCancel      :'Close',
    lblContractNum  :'Contract number',
    lblContractDate :'Contract date',
    lblFullName     :'Full name',
    lblShortName    :'Short name',
    lblClientCode   :'Clients code',
    lblDaysWoutPayment:'Days without payment',
    lblUserGroups   :'User groups',
    lblPZ           :'PZ',
    lblWZ           :'WZ'
});

Ext.define("TK.locale.en.view.ky2.avto.BaseAvtoForm", {
    override:"TK.view.ky2.avto.BaseAvtoForm",

    lblArrival          : 'Arrival',
    lblDate             :'Date',
    lblTime             :'Time',
    btnPrint            :'Print',
    btnPZ               :'PZ',
    btnAddContGr        :'+Container/Cargo',
    btnTrucksByDeparture:'+ Trucks by departure',
    btnImportFromOrder  :'+ Import from order',
    lblTruckN           :'Truck №',
    lblTrailerN         :'Trailer №',
    lblDriverFullName   :'Drivers full name',
    lblDriversPasport   :'Drivers passport',
    lblNotes            :'Notes',
    btnWZ               :'WZ'
});

Ext.define("TK.locale.en.controller.ky2.BindAvtoAndAvtoController", {
    override:"TK.controller.ky2.BindAvtoAndAvtoController",

    tittle1         : 'Container №/Tara weight/Gross weight/Size Type/Tonnage',
});

Ext.define("TK.locale.en.view.ky2.poezd.into.PoezdIntoForPoezdOutDir", {
    override:"TK.view.ky2.poezd.into.PoezdIntoForPoezdOutDir",

    title       :'List of train wagons by departure'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.PoezdZayavsIntoDir", {
    override:"TK.view.en.poezd.into.PoezdZayavsIntoDir",

    title :'Order list by arrival'
});

Ext.define("TK.locale.en.view.ky2.poezd.zayav.Filter", {
    override:"TK.view.ky2.poezd.zayav.Filter",

    title               :'Filter',
    labelFateFrom       :'Date, from',
    labelNOrder         :'Order №',
    labelClient         :'Client',
    labelNTraint        :'Train №',
    btnFilter           :'Filter',
    btnClear            :'Clear',
    btnClose            :'Close'
});

Ext.define("TK.locale.en.view.ky2.avto.FilterAvto", {
    override:"TK.view.ky2.avto.FilterAvto",

    title               :'Filter',
    labelFateFrom       :'Date, from',
    labelNTruck         :'Truck №',
    labelNTrailer       :'Trailer №',
    labelDriverFam      :'Driver\'s name',
    labelContainer      :'Container',
    btnFilter           :'Filter',
    btnClear            :'Clear',
    btnClose            :'Close'
});

Ext.define("TK.locale.en.view.ky2.avto.out.AvtoForm", {
    override:"TK.view.ky2.avto.out.AvtoForm",

    title               :'Truck, departure',
    lblDeparture        :'Departure',
    lblDate             :'Date',
    lblTime             :'Time'
});

Ext.define("TK.locale.en.controller.ky2.BindPoezdAndPoezdController", {
    override:"TK.controller.ky2.BindPoezdAndPoezdController",

    titlForPoezd               :"Wagon №/Tonnage/Tara/Axis/Owner" + '<br/>' +
        "Container №/Client/Tara weight/Brutto/Size Type/Tonnage/Notes"
});

Ext.define("TK.locale.en.view.ky2.avto.into.AvtoZayavsIntoDir", {
    override:"TK.view.ky2.avto.into.AvtoZayavsIntoDir",

    title: 'Order list for download'
});

Ext.define("TK.locale.en.view.ky2.InterchangeKont", {
    override:"TK.view.ky2.InterchangeKont",

    title               :'Choose malfunction',
    lblMalfunction      :'Malfunction',
    btnChoose           :'Choose',
    btnClose            :'Close'
});

Ext.define("TK.locale.en.view.ky2.FilesForm", {
    override:"TK.view.ky2.FilesForm",

    title               :'List of truck documents'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.PoezdForm", {
    override:"TK.view.ky2.poezd.out.PoezdForm",

    labelDep       :'Departure',
    labelDate       :'Date',
    labelTime       :'Time',
    labelImport     :'Import',
    labelImportFromOrder  :'+ import from order',
});

Ext.define("TK.locale.en.controller.ky2.BindPoezdAndYardController", {
    override:"TK.controller.ky2.BindPoezdAndYardController",

    titleAddOnConYard       :'+ On container yard',
    labelTrNum              :'Train № ',
    titleContYard           :'Plac kontenerowy ',
    titleCnumTypeBrTon      :'Container №/Client/Tara weight/Gross weight/Size Type/Tonnage/Notes',
    titleWarn               :'Warning',
    warnMsg                 :'Found container duplicates, move them anyway?',
    warnMsg2                :'Not enough free places on a sector to move all containers, continue?',
    allertTitle             :'Satus',
    allertMsg               :'Wrong field values.'
});

Ext.define("TK.locale.en.view.ky2.VagKontSearch", {
    override:"TK.view.ky2.VagKontSearch",

    emptyText               :'search... '
});

Ext.define("TK.locale.en.view.ky2.avto.out.Avto2YardBindTreeForm", {
    override:"TK.view.ky2.avto.out.Avto2YardBindTreeForm",

    lblOrder               :'Order'
});

Ext.define("TK.locale.en.view.ky2.poezd.out.PoezdsIntoForPoezdOutDir", {
    override:"TK.view.ky2.poezd.out.PoezdsIntoForPoezdOutDir",

    title               :'List of train wagons by departure'
});

Ext.define("TK.locale.en.vi.ky2.yard.YardSectorList", {
    override:"TK.view.ky2.yard.YardSectorList",

    title               :'Sectors'
});

Ext.define("TK.locale.en.view.ky2.poezd.BasePoezdZayavForm", {
    override:"TK.view.ky2.poezd.BasePoezdZayavForm",

    lblOrderNum         :'Order №',
    lblOrderType        :'Order type',
    lblUnloading        :'Unloading',
    lblLoading          :'Loading',
    titleDesigned       :'Created',
    lblDate             :'Date',
    lblTime             :'Time',
    lblInternationalTrNum:'International train №',
    lblTrainNum         :'Train №',
    lblClient           :'Client',
    btnSaveExit         : 'Save&Exit',
    btnVgCtGr           :'+Wagon/Container/Cargo',
    btnImportFromXLS    :'Import from XLS',
    btnClose            : 'Close'
});

Ext.define("TK.locale.en.view.ky2.avto.BaseAvtoZayavForm", {
    override:"TK.view.ky2.avto.BaseAvtoZayavForm",

    lblOrderNum         :'Order №',
    lblOrderType        :'Order type',
    lblUnloading        :'Unloading',
    lblLoading          :'Loading',
    titleDesigned       :'Created',
    lblDate             :'Date',
    lblTime             :'Time',
    lblClient           :'Client',
    btnSaveExit         : 'Save&Exit',
    btnCtGr           :'+ Container/Cargo',
    btnImportFromXLS    :'Import from XLS',
    btnClose            : 'Close',
    lblTruckNum         :'Truck №',
    lblTrailerNum       :'Trailer №',
    lblDriverFIO        :'Drivers full name',
    lblDriverPassport   :'Drivers passport',
    lblNotes            :'Notes'
});

Ext.define("TK.locale.en.controller.ky2.AvtoZayavController", {
    override:"TK.controller.ky2.AvtoZayavController",

    titleCreateOrderforUnload       :'Create an order for unloading',
    titleCreateOrderforLoad         :'Create an order for loading',
    titleCreateOrder                :'Create order',
    msgDelOrder                     :'Delete order?',
    titleEdit                       :'Edit order '
});

Ext.define("TK.locale.en.controller.ky2.AvtoZayavCtGrController", {
    override:"TK.controller.ky2.AvtoZayavCtGrController",

    titleContGr             :'Container/Cargo',
    mgsCont                 :'Container ',
    mgsInOrder              :' found in order № ',
    mgsFrom                 :' from ',
    btnContinue             :'Continue',
    btnCancel               :'Cancel',
    titleError              :'Error...'
});

Ext.define("TK.locale.en.view.ky2.avto.into.AvtoZayavForm", {
    override:"TK.view.ky2.avto.into.AvtoZayavForm",

    title               :'Truck order, import, import'
});

Ext.define("TK.locale.en.view.ky2.avto.out.AvtoZayavForm", {
    override:"TK.view.ky2.avto.out.AvtoZayavForm",

    title               :'Truck, departure'
});

Ext.define("TK.locale.en.view.ky2.poezd.into.PoezdZayavForm", {
    override:"TK.view.ky2.poezd.into.PoezdZayavForm",

    title               :'Train order, import'
});

Ext.define("TK.locale.en.view.ky2.poezd.PoezdsImportDir", {
    override:"TK.view.ky2.poezd.PoezdsImportDir",

    title               :'Train list for import'
});

Ext.define("TK.locale.en.view.ky2.BasePoezdsImportDir", {
    override:"TK.view.ky2.BasePoezdsImportDir",

    columnTrain         :'Train',
    columnDate          :'Date',
    columnVed           :'List',
    columnVagQuantity   :'Wagon<br/>quantity',
    coumnKontQuantity   :'Container<br/>quantity',
    btnFilter           :'Filter',
    btnChoose           :'Choose'
});

Ext.define("TK.locale.en.view.ky2.avto.DotpQuestionAvto", {
    override:"TK.view.ky2.avto.DotpQuestionAvto",

    title               :'Create a truck by departure with a specified date?',
    lblDeartureTime     :'Departure date',
    txtYes              :'Yes',
    txtNo               :'No'
});

Ext.define("TK.locale.en.view.ky2.ClientTrainAvtoFilter", {
    override:"TK.view.ky2.ClientTrainAvtoFilter",

    title               :'Filter Clients/Trains/Trucks',
    panelClients        :'Clients',
    clmnClient          :'Client',
    panelTrains        :'Train',
    clmnTrNum           :'Train №',
    btnFilter           :'Filter',
    btnCancel           :'Cancel',
    ckeckByTruck        :'Arrived by truck'
});

Ext.define("TK.locale.en.view.stamp.StampList", {
    override:"TK.view.stamp.StampList",

    title               :'Stamps',
    hdrTrans           :'Group',
    hdrdescr           :'Description',
    hdrCodePer         :'Carrier code',
    hdrAltered         :'Altered',
    hdrDattr           :'Createdd'
});

Ext.define("TK.locale.en.view.stamp.StampForm", {
    override:"TK.view.stamp.StampForm",

    title               :'Stamp',
    mainTitle           :'General',
    hdrdescr           :'Description',
    labelllx              :'X left lower corner on a blank',
    labellly              :'Y left lower corner on a blank',
    labelurx              :'Y right top corner on a blank',
    labelury              :'Y right top corner on a blank',
    hdrCodePer         :'Carrier code',
    bordersTitle         :'Borders',
    hdrBorder           :'Thickness',
    hdrColor            :'Color',
    hdrRadius           :'Radius',
    btnAdd              :'Add',
    btnEdit             :'Edit',
    btnDel              :'Delete',
    imgTitle            :'Images',
    txtTitle            :'Texts',
    hdrText             :'Text',
    hdrfontFamily       :'Font',
    hdrFontSize          :'Font<br>size',
    hdrLeading          :'Leading',
    hdrBold             :'Bold',
    hdrItalic           :'Italic',
    hdrRotate           :'Rotate',
    hdrTabular          :'Tabular',
    hdrUnderline        :'Underline ',
    hdrUppercase        :'Uppercase ',
    hdrName             :'Name',
    hdrMask             :'Mask',
    btnSaveExit         :'Save&Exit',
    btnSave             :'Save',
    btnPreView          :'Preview',
    btnExit             :'Exit'
});

Ext.define("TK.locale.en.view.stamp.StampBorderForm", {
    override:"TK.view.stamp.StampBorderForm",

    title               :'Stamp',
    lblBorderThick      :'Thickness',
    labelrllx           :'Lower left corner relative to stamp X',
    labelrlly           :'Lower left corner relative to stamp Y',
    labelrurx           :'Right top corner relative to stamp X',
    labelrury           :'Right top corner relative to stamp Y',
    labelRadius         :'Radius',
    labelColor          :'Color',
    btnSave             :'Save',
    btnExit             :'Exit'
});

Ext.define("TK.locale.en.view.stamp.StampTxtForm", {
    override:"TK.view.stamp.StampTxtForm",

    title               :'Text',
    labelrllx           :'Lower left corner relative to stamp X',
    labelrlly           :'Lower left corner relative to stamp Y',
    labelrurx           :'Right top corner relative to stamp X',
    labelrury           :'Right top corner relative to stamp Y',
    labelFont           :'Font',
    labelFontSize         :'Font size',
    labelLeading          :'Leading',
    labelRotate           :'Rotate',
    labelColor          :'Color',
    labelBold             :'Bold',
    labelItalic           :'Italic',
    labelTabular          :'Tabular',
    labelUnderline        :'Underline',
    labelUppercase        :'Uppercase ',
    labelName             :'Name',
    labelMask             :'Mask',
    btnSave             :'Save',
    btnExit             :'Exit'
});

Ext.define("TK.locale.en.view.stamp.StampPictureForm", {
    override:"TK.view.stamp.StampPictureForm",

    title               :'Image',
    labelrllx           :'Lower left corner relative to stamp X',
    labelrlly           :'Lower left corner relative to stamp Y',
    labelrurx           :'Right top corner relative to stamp X',
    labelrury           :'Right top corner relative to stamp Y',
    labelDescr          :'Description',
    labelImgFile        :'Image file',
    btnSave             :'Save',
    btnExit             :'Exit'
});

Ext.define("TK.locale.en.controller.print.PrintStamps", {
    override:"TK.controller.print.PrintStamps",

    delTitle: 'Deletion...',
    delMsg: 'Are you sure you want to delete..?',
    uploadtitle          :'Upload picture jpeg,jpg,png 64k',
    labelPic            :'Picture',
    btnUpload           :'Upload',
    btnSelectPic        :'Choose picture'
});

Ext.define("TK.locale.en.view.messanger.Messanger", {
    override:"TK.view.messanger.Messanger",

    title               :'Messenger',
    labelMsg            :'Message',
    btnSend             :'Send',
    btnRefresh          :'Refresh',
    btnClose            :'Close',
    chkOnMail           :'On mail',
    panelUsrs           :'Users'
});

Ext.define("TK.locale.en.controller.ky2.BindAvtoAndYardController", {
    override:"TK.controller.ky2.BindAvtoAndYardController",

    titleUploadXls      :'Upload XLS',
    emtyTxtFile         :'Choose file for upload...',
    labelFile           :'File',
    btnChoose           :'Choose...',
    btnUpload           :'Upload',
    msgUploading        :'Uploading',
    btnClose            :'Close',
    titleWarn           :'Warning',
    msgCont1            :'Found containers: ',
    msgCont2            :'<br>Nothing found: ',
    msgNoContOnCar      :'No container on a truck',
    msgContisOnyard     :'Container is already on a yard. Sector ',
    msgAvtoByDepCreated :'Truck by arrival created',
    titleOnYard         :'+ On a container yard',
    titleyard           :'Container yard '
});

Ext.define("TK.locale.en.controller.ky2.YardCtGrController", {
    override:"TK.controller.ky2.YardCtGrController",

    titleWarn           :'Warning',
    msgNoFreePlaces     :'Sector is full',
    titleEditKont       :'Edit container',
    titleDel            :'Deleting...',
    msgDel              :'Are you sure want to delete..?',
    errMsg1             :'No arrival date <br>',
    errMsg2             :'no arrival time  <br>',
    errMsg3             :'No client  <br>',
    errMsg4             :'Wrong container number ',
    msgNoKont           :'No container',
    msgError            :'Error...',
    titleCreateKont     :'Create container'
});

Ext.define("TK.locale.en.view.ky2.YardCtGrTreeForm", {
    override:"TK.view.ky2.YardCtGrTreeForm",

    title               :'Container',
    lblSector           :'Sector',
    lblKontN            :'Container №',
    lblOtprN            :'Shipment №',
    lblArrival          :'Arrival',
    lblDate             :'Date',
    lblTime             :'Time',
    lblOrderN           :'Order №',
    lblDeparture        :'Departure',
    lblEmpty            :'Empty',
    lblBrutto           :'Cargo brutto,kg',
    lblMasTara          :'Tara, weight,kg',
    lblTotalBrutto      :'Total gross weight,kg',
    lblMaxWeight        :'Tonnage, t',
    lblSize             :'Size',
    lblType             :'Type',
    lblClient           :'Client',
    lblNotes            :'Notes',
    lblCodeGng          :'NHM code',
    lblnameGng          :'NHM name',
    lblPackege          :'Package',
    lblPlaces           :'Places',
    lblWeight           :'Weight',
    lblPlomb            :'Plomb',
    lblSealingStation   :'Sealing station',
    lblQuantity         :'Quantity',
    btnAddCargo         :'+ Cargo',
    btnAddPlomb         :'+ Plomb',
    titleCargo          :'Cargo'
});

Ext.define("TK.locale.en.view.ky2.yard.ChangeClient", {
    override:"TK.view.ky2.yard.ChangeClient",

    title               :'Change client',
    lblDateFrom         :'Date, from',
    lbltimeFrom         :'Time, to',
    lblClient           :'Client',
    btnChangeCl         :'Change client',
    btnClose            :'Close'
});

Ext.define("Ext.locale.en.form.VTypes", {
    override:"Ext.form.VTypes",

    msgInvalidFsize     :'File size should be less than ',
    msgInvalidFType     :'File type should be in '
});

Ext.define("TK.locale.en.view.ky2.yard.ChangeClient", {
    override:"TK.view.ky2.yard.ChangeClient",

    title               :'Change client',
    lblDateFrom         :'Date, from',
    lbltimeFrom         :'Time, to',
    lblClient           :'Client',
    btnChangeCl         :'Change client',
    btnClose            :'Close'
});

Ext.define("TK.locale.en.view.ky2.client.Filter", {
    override:"TK.view.ky2.client.Filter",

    title                   :'Filter',
    lblArrivalFrom          :'Arrival, from',
    lblArrivalTo            :'Arrival, to',
    lblContainer            :'Container',
    lblPlace                :'Placement',
    lblAll                  :'All',
    lblVagon                :'Vagon',
    lblTruck                :'Truck',
    lblDaysQuantity         :'Days quan-ty',
    btnFilter               :'Filter',
    btnClear                :'Clear',
    btnClose                :'Close'
});
