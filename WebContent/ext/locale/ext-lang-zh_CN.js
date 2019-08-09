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
 * Simplified Chinese translation
 * By DavidHu
 * 09 April 2007
 *
 * update by andy_ghg
 * 2009-10-22 15:00:57
 */
Ext.onReady(function() {
    var parseCodes;

    if (Ext.Date) {
        Ext.Date.monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

        Ext.Date.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

        Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')";
        Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')";

        parseCodes = {
            g: 1,
            c: "if (/(上午)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s: "(上午|下午)",
            calcAtEnd: true
        };

        Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '\u00a5',
            // Chinese Yuan
            dateFormat: 'y年m月d日'
        });
    }
});

Ext.define("Ext.locale.zh_CN.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.zh_CN.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "选择了 {0} 行"
});

Ext.define("Ext.locale.zh_CN.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "关闭此标签"
});

Ext.define("Ext.locale.zh_CN.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "输入值非法"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.zh_CN.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "讀取中..."
});

Ext.define("Ext.locale.zh_CN.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "今天",
    minText: "日期必须大于最小允许日期",
    //update
    maxText: "日期必须小于最大允许日期",
    //update
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: '下个月 (Ctrl+Right)',
    prevText: '上个月 (Ctrl+Left)',
    monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',
    //update
    todayTip: "{0} (空格键选择)",
    format: "y年m月d日",
    ariaTitle: '{0}',
    ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
    longDayFormat: 'Y\u5e74m\u6708d\u65e5',
    monthYearFormat: 'Y\u5e74m\u6708',
    getDayInitial: function (value) {
        // Grab the last character
        return value.substr(value.length - 1);
    }
});

Ext.define("Ext.locale.zh_CN.picker.Month", {
    override: "Ext.picker.Month",
    okText: "确定",
    cancelText: "取消"
});

Ext.define("Ext.locale.zh_CN.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "第",
    //update
    afterPageText: "页,共 {0} 页",
    //update
    firstText: "第一页",
    prevText: "上一页",
    //update
    nextText: "下一页",
    lastText: "最后页",
    refreshText: "刷新",
    displayMsg: "显示 {0} - {1}条，共 {2} 条",
    //update
    emptyMsg: '没有数据'
});

Ext.define("Ext.locale.zh_CN.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "该输入项的最小长度是 {0} 个字符",
    maxLengthText: "该输入项的最大长度是 {0} 个字符",
    blankText: "该输入项为必输项",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.zh_CN.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "该输入项的最小值是 {0}",
    maxText: "该输入项的最大值是 {0}",
    nanText: "{0} 不是有效数值"
});

Ext.define("Ext.locale.zh_CN.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "禁用",
    disabledDatesText: "禁用",
    minText: "该输入项的日期必须在 {0} 之后",
    maxText: "该输入项的日期必须在 {0} 之前",
    invalidText: "{0} 是无效的日期 - 必须符合格式： {1}",
    format: "y年m月d日"
});

Ext.define("Ext.locale.zh_CN.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "加载中..."
    });
});

Ext.define("Ext.locale.zh_CN.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: '该输入项必须是电子邮件地址，格式如： "user@example.com"',
    urlText: '该输入项必须是URL地址，格式如： "http:/' + '/www.example.com"',
    alphaText: '该输入项只能包含半角字母和_',
    alphanumText: '该输入项只能包含半角字母,数字和_'
});

//add HTMLEditor's tips by andy_ghg
Ext.define("Ext.locale.zh_CN.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: '添加超级链接:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: '粗体 (Ctrl+B)',
                text: '将选中的文字设置为粗体',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: '斜体 (Ctrl+I)',
                text: '将选中的文字设置为斜体',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: '下划线 (Ctrl+U)',
                text: '给所选文字加下划线',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: '增大字体',
                text: '增大字号',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: '缩小字体',
                text: '减小字号',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: '以不同颜色突出显示文本',
                text: '使文字看上去像是用荧光笔做了标记一样',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: '字体颜色',
                text: '更改字体颜色',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: '左对齐',
                text: '将文字左对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: '居中',
                text: '将文字居中对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: '右对齐',
                text: '将文字右对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: '项目符号',
                text: '开始创建项目符号列表',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: '编号',
                text: '开始创建编号列表',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: '转成超级链接',
                text: '将所选文本转换成超级链接',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: '代码视图',
                text: '以代码的形式展现文本',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.zh_CN.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "正序",
    //update
    sortDescText: "倒序",
    //update
    lockText: "锁定列",
    //update
    unlockText: "解除锁定",
    //update
    columnsText: "列"
});

Ext.define("Ext.locale.zh_CN.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "名称",
    valueText: "值",
    dateFormat: "y年m月d日"
});

Ext.define("Ext.locale.zh_CN.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "确定",
        cancel: "取消",
        yes: "是",
        no: "否"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.zh_CN.Component", {	
    override: "Ext.Component",
    titleDelMsgBox  :'Delete record?',
    textDelMsgBox   :'Record will be deleted',
    titleEditWindow  :'Edit record',
    titleAddWindow  :'Add record'
});

//////////////////////////////////
// TK Portal locale costants  ////
/////////////////////////////////

Ext.define("TK.locale.zh_CN.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'门户TC',
    headerUser   :'使用人:',
    headerLangLbl:'选择语言:'
});

Ext.define("TK.locale.zh_CN.view.MenuTree", {
    override    :"TK.view.MenuTree",
    title       :'菜单',
    treeUsers   :'使用人',
    treeGroups  :'Groups',
    treeProjects:'草案',
    treeLogs    :'日志文件',
    btnStat     :"统计",
    btnPrnTmpl  :"Print templates",
    treeDirs    :'手册',
    treeInstr   :'细则',
    treeChangePw:'Password change',
    treeExit    :'出口',
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
    avisogu29k  :'Templates GU for CKP',
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

Ext.define("TK.locale.zh_CN.view.DocsList", {
    override:"TK.view.DocsList",

    btnStat    :"统计",
    btnRestore    :"Restore",
    btnDestroy    :"Destroy",
    btnPrint   :" 打印PDF",
    btnPrintView   :"View PDF",
    btnCreate  :'创造',
    btnCopy    :'副本',
    btnCopyAviso:'Copy to template',
    btnCopySelect    :'Copy, select...',
    btnEdit    :'编辑',
    btnDelete  :'删除',
    btnMakeSmgs:'形成SMGS',
    btnMakeCimSmgs:'形成CIM/SMGS',
    btnAppend2Smgs:'Append to SMGS',
    btnAppend2CimSmgs:'Append to CIM/SMGS',
    btnMakeGU  :'形成GU',
    btnDownload:'下载文件',
    btnHistory :'历史',
    btnBindPrint :'Bind print',
    btnSelectPrint :'Select template',
    btnExch    :'与... 交流',
    btnExchTBC :'与TBC交流',
    btnExchBCh1:'打开/关闭在“编辑',
    btnExchBCh :'与BCH交流',
    btnExchTdgFTS:'交通发展集团',
    btnExchFTS :'与FTS交流',
    btnExchBTLC:'BTLC',
    btnReports :'决算',
    btnView    :'查看',
    btnCont    :'Containers',
    btnVag     :'Wagons',
    lableDeleted: 'Deleted?',

    btnContsList :'Cont/Wag list',
    btnDopList:'Extra list',
    btnUploadCSDocs9 :'Sender docs',
    btnUploadPogruzList:'Cargo List',
    btnUploadPogruzListPoezd:'Cargo List. for trains',
    btnContsList1 :'List',
    btnSmgs :'Smgs',

    btnPlusDocs :'+ Docs',
    btnPlusSmgsInv :'+ Smgs & Invoices',
    btnPlusInv :'+ Invoices',

    headerID          :'ID',
    headerProject          :'Project',
    headerRoute          :'Route',
    headerDoc          :'Doc',
    headerCreation    :'创建',
    headerDateTime    :'日期和时间',
    headerUser        :'使用人',
    headerSenderName  :'发货人的名称',
    headerReceiverName:'收货人的名称',
    headerContNum     :'集装箱号码',
    headerDescr       :'Description',
    headerNPoezd      :'Train<br/>No.',
    headerVagNum      :'车辆号码',
    headerFileName    :'文件名',
    headerContentType :'内容类型',
    headerSizeByte    :'数量, 字节',

    warnTitle:'警告',
    warnMsg  :'你必须选择一个数据行',

    txtForApproval:'For approval',
    txtApproved:'Approved',
    txtWork:'Working',
    txtNotApproved:'Not approved',
    txtBlocked:'Blocked',
    headerStatus   :'地位',
    headerName  :'Template<br/>name',
    headerInstrNum :'细则号码',
    headerGNG      :'GNG',
    statusBlocked  :'封锁',
    status4Approval:'为了协调',
    statusAgreed   :'协调一致',
    statusNotAgreed:'不协调一致'
});

Ext.define("TK.locale.zh_CN.view.printtmpl.List", {
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

Ext.define("TK.locale.zh_CN.view.slovnakl.List", {
    override        :"TK.view.slovnakl.List",
    headerSlov       :'Slovak bill',
    title           :'Slovak bill'
});

Ext.define("TK.locale.zh_CN.stat.List", {
    override    :"TK.view.stat.List",
    title       :'统计'
});

Ext.define("TK.locale.zh_CN.view.aviso.List", {
    override:"TK.view.aviso.List",

    title          :'SMGS细则的清单'
});

Ext.define("TK.locale.zh_CN.view.aviso.List", {
    override:"TK.view.aviso.List",

    title          :'CIM/SMGS细则的清单'
});

Ext.define("TK.locale.zh_CN.view.avisogu29k.List", {
    override       :"TK.view.avisogu29k.List",

    title          :'GU细则的清单'
});

Ext.define("TK.locale.zh_CN.view.cim.CimList", {
    override :"TK.view.cim.CimList",
    headerCim:'CIM',
    title    :'CIM的清单',
    menuTrSearch  :'Filter train'

});

Ext.define("TK.locale.zh_CN.view.cimsmgs.CimSmgsList", {
    override     :"TK.view.cimsmgs.CimSmgsList",
    headerCimsmgs:'Num CIM/SMGS',
    headerDateTransp:'Date CIM/SMGS',
    title        :'CIM/SMGS的清单',
    headerExchBch:'Iftmin',
    menuTrSearch  :'Filter train'

});

Ext.define("TK.locale.zh_CN.view.cmr.List", {
    override :"TK.view.cmr.List",
    title    :'CMR的清单',
    headerCMR:'CMR'
});

Ext.define("TK.locale.zh_CN.view.epd.List", {
    override:"TK.view.epd.List",
    title   :'电子运输文件的清单'
});

Ext.define("TK.locale.zh_CN.view.gu27v.List", {
    override      :"TK.view.gu27v.List",
    headerGu27v   :'GU-27v',
    headerAvisoNum:'结算通知单号码',
    title         :'GU的清单'
});

Ext.define("TK.locale.zh_CN.view.gu29k.List", {
    override      :"TK.view.gu29k.List",
    headerGu29k   :'GU29k',
    headerAvisoNum:'结算通知单号码',
    title         :'GU的清单'
});

Ext.define("TK.locale.zh_CN.view.invoice.List", {
    override:"TK.view.invoice.List",
    title   :'发票的清单',
    headerNum: '№ inv',
    headerNumOtpr: '№',
    headerNumCont: '№ cont',
    headerDateOtpr: 'Date inv'
});

Ext.define("TK.locale.zh_CN.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'SMGS的清单',
    headerSmgs    :'SMGS',
    headerExchTBC :'与TBC交流',
    headerAvisoNum:'结算通知单号码',
    headerExchBch :'Iftmin'
});

Ext.define("TK.locale.zh_CN.view.smgs2.Smgs2List", {
    override      :"TK.view.smgs2.Smgs2List",
    title         :'SMGS的清单',
    headerSmgs    :'SMGS',
    headerExchTBC :'与TBC交流',
    headerAvisoNum:'结算通知单号码',
    headerExchBch :'Iftmin',
    menuTrSearch  :'Filter train'
});
Ext.define("TK.locale.zh_CN.view.avisocim.AvisoCimList", {
    override      :"TK.view.avisocim.AvisoCimList",
    title         :'CIM template register'
});
Ext.define("TK.locale.zh_CN.view.aviso2.AvisoSmgs2List", {
    override      :"TK.view.aviso2.AvisoSmgs2List",
    title         :'SMGS template register'
});

Ext.define("TK.locale.zh_CN.view.file.List", {
    override:"TK.view.file.List",
    title   :'图形数据的清单',
    headerNumOtpr: '№ Shipment',
    headerNumCont: '№ cont',
    headerDateOtpr: 'Data Shipment'
});

Ext.define("TK.locale.zh_CN.view.logs.List", {
    override    :"TK.view.logs.List",
    title       :'门户网站的日志文件',
    headerDate  :'日期',
    headerUser  :'使用人',
    headerHost  :'主人',
    headerAgent :'完成的环境',
    headerLog   :'日志文件',
    headerThread:'数据流',
    headerFile  :'文件',
    headerMethod:'方法',
    btnFilter   :'过滤器'
});

Ext.define("TK.locale.zh_CN.view.project.List", {
    override    :"TK.view.project.List",
    title       :'设计的清单',
    headerName  :'名称',
    headerGroups:'用户集团',
    headerRoutes:'路线',
    btnCreate   :'创造',
    btnEdit     :'编辑',
    btnDelete   :'删除',
    delMsg1     :'删除...',
    delMsg2     :'你想不想删除本草案?'
});

Ext.define("TK.locale.zh_CN.view.user.List", {
    override      :"TK.view.user.List",
    title         :'用户的清单',
    headerUn      :'用户名',
    headerName    :'名称',
    headerGroup   :'用户集团',
    headerGroups  :'补集团',
    headerPrivileg:'特权',
    headerLocked  :'断开连接?',
    headerSu      :'管理员?',
    headerEmail   :'E-mail',
    btnCreate     :'创造',
    btnCopy       :"复制",
    btnEdit       :'编辑',
    btnRefresh    :'升级',

    textYes: 'yes',
    textNo: 'no'
});

Ext.define("TK.locale.zh_CN.view.user.ListGroups", {
    override   :"TK.view.user.ListGroups",
    title      :'用户集团的清单',
    headerName :'名称',
    headerDescr:'描写',
    btnSelect  :'选择',
    btnAdd     :'添加',
    btnEdit    :'编辑',
    btnRefresh :'升级',
    btnClose   :'关闭'
});

Ext.define("TK.locale.zh_CN.view.user.ListPrivs", {
    override   :"TK.view.user.ListPrivs",
    title      :'特权的清单',
    headerName :'名称',
    headerDescr:'描写',
    btnSelect  :'选择',
    btnRefresh :'升级',
    btnClose   :'关闭'
});

Ext.define("TK.locale.zh_CN.view.user.Form", {
    override       :"TK.view.user.Form",
    title          :'编辑',
    labelLogin     :'用户名<span class="x-required">*</span>',
    labelLogin1    :'用户名:',
    labelPass      :'密码<span class="x-required">*</span>',
    labelPass1     :'确认密码<span class="x-required">*</span>',
    labelPass2     :'新的密码:',
    labelFIO       :'姓名',
    labelEmail     :'E-mail ',
    labelLocked    :'断开连接?',
    labelSu        :'管理员?',
    labelGroup     :'集<span class="x-required">*</span>',
    labelGroups    :'补集团',
    labelPrivs     :'特权',
    btnSave        :'保存',
    btnClose       :'关闭',
    vTypeLabelPass :'这些密码不相符合，这个字段只能包含字母，数字和_',
    vTypeLabelLogin:'这个用户名已经有，这个字段只能包含字母，数字和_'
});

Ext.define("TK.locale.zh_CN.view.user.FormGroups", {
    override    :"TK.view.user.FormGroups",
    title       :'编辑',
    vTypeLabelGr:'这个用户集团的名称已经有,这个字段只能包含字母，数字和_',

    labelName :'名称<span class="x-required">*</span>',
    labelName1:'名称:',
    labelDescr:'描写',
    btnSave   :'保存',
    btnClose  :'关闭'
});

Ext.define("TK.locale.zh_CN.view.project.Form", {
    override        :"TK.view.project.Form",
    title           :'草案',
    btnSave         :'保存',
    btnSaveExit     :'保存与出口',
    btnClose        :'关闭',
    btnSelect       :'选择',
    labelProjectName:'名称',
    labelGroups     :'集团',
    labelRoutes     :'路线',
    labelSelected   :'选择的',
    labelAvailable  :'可用的',
    headerName      :'名称',
    headerDescr     :'描写',
    saveMsg         :'保存数据时...'
});

Ext.define("TK.locale.zh_CN.view.edit.DetailGrid", {
    override           :"TK.view.edit.DetailGrid",
    btnAdd             :"添加",
    btnDelete          :" 删除",
    btnCopy            :" 复制",
    btnOk              :'好',
    headerName         :'名称',
    headerRoutesGr     :'集团',
    headerRoutesDocs   :'文件',
    headerRoutesCodeTbc:' TBC代码',
    headerRoutesCodeCustoms:'Customs code',
    headerRoutesEmailMask: 'Email, mask',
    headerRoutesForDeleted: 'For deleted?',
    headerContNum      :'集装箱号码',
    headerContSize     :'集装箱大少',
    headerContVid      :'集装箱种类',
    headerContNum1     :'集装箱号码',
    headerContSize1    :'集装箱大少',
    headerContVid1     :'集装箱种类',
    headerCodeTNVED    :'对外经济活动商品分类目录',
    headerPack: 'Package',
    headerPackVid: 'Type',
    headerPackKod: 'Code',
    headerGoodsDescr   :'货物描述',
    headerPackage      :'包装种类',
    headerPackNum      :'包装数量',
    headerBrutto       :'毛重（公斤)',
    headerNetto        :'净重（公斤）',
    headerQuantity     :'数量',
    headerProdUnit     :'货物测量单位',
    headerProdPrice    :'单价',
    headerTotalValue   :'总价值',
    headerType         :'类型',
    headerTotal        :'共计:',

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

Ext.define("TK.locale.zh_CN.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    errorTitle    :'注意! 是错误...',
    errorMsgValid :'检查数据',
    btnSave :'保存',
    btnClose:'关闭',
    labelDescr   :'Desciption',
    labelNotes            :'附注',
    labelSender           :'发货人',
    labelName             :'名称',
    labelName1            :'名称',
    labelNameEu           :'名称 (EU)',
    labelNameRu           :'名称 (RU)',
    labelNameCh           :'名称 (CN)',
    labelDate             :'日期',
    labelTotal            :'数量',
    labelCountry          :'国家',
    labelCountryRu        :'国家 (RU)',
    labelCountryCode      :'国家代码',
    labelZip              :'邮政编码',
    labelCity             :'城市',
    labelCityRu           :'城市 (RU)',
    labelAdress           :'地址',
    labelAdressRu         :'地址 (RU)',
    labelOptInfo          :'Opt. info',
    labelSenderCod        :'Senders code',
    labelReceiverCod      :'Recievers code',
    labelReceiver         :'收货人'
});

Ext.define("TK.locale.zh_CN.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'添加',
    btnDelete:'删除'
});

Ext.define("TK.locale.zh_CN.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",

    labelName1      :'名称',
    labelWagons       :'车辆',
    labelWagonNum     :'车辆号码',
    labelWagonsTonnage:'吨位',
    labelWagonsTara   :'自重',
    labelWagonsAxes   :'轴数',
    labelConts   :'集装箱',
    labelSize    :'集装箱大少',
    labelSizeMm  :'集装箱大少(mm)',
    labelTaraCont: 'Tara, weight',
    labelNotes  :'附注',
    labelCategory:'集装箱类型',
    labelContNum :'集装箱号码',
    labelDescr   :'Desciption',
    labelVid     :'集装箱种类',
    labelCargo    :'货物',
    labelCode     :'代码',
    labelNetto    :'净重',
    labelTara     :'自重',
    labelBrutto   :'毛重',
    labelCodeGng  :'GNG代码',
    labelNameRuGng:'名称 (RU)',
    labelNameChGng:'名称 (CN)',
    labelCodeEtsng:' ET SNG代码',
    labelNameEtsng:'名称',
    labelMassa    :'重量 (公斤)',
    labelMesta    :'件数',
    labelPack     :'包装种类(ru)',
    labelPackForeign:'包装种类',

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


Ext.define("TK.locale.zh_CN.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: '海关代码',
    labelTextRu: '文本(RU)',
    labelText: '文本',
    labelDocNum: '文件的号码',
    labelDate: '日期',
    labelTotal: '数量'
});

Ext.define("TK.locale.zh_CN.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Plomb',
    labelTotal: 'Total'
});
Ext.define("TK.locale.zh_CN.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",
    labelOtprName:'名称',
    labelOtprNameRu:'名称 (RU)',
    labelCountry:'国家',
    labelCountryRu:'国家 (RU)',
    labelCountryCode:'国家代码',
    labelEmail:'E-mail',
    labelPhone:'电话',
    labelFax:'Fax',
    labelCity:'城市',
    labelCityRu:'城市 (RU)',
    labelAdress:'地址',
    labelAdressRu:'地址 (RU)',
    labelZip:'邮政编码',
    labelVat:'VAT',
    labelSenRecCode:'发货人代码/收货人代码',
    labelOKPO: 'Code OKPO:',
    labelCliCode:'顾客代码',
    labelNNcode:'Code INN',
    labelDopInfo:'Additional info',


    closeBtn:'关闭',
    saveBtn:'保存'
});
Ext.define("TK.locale.zh_CN.view.DocsForm", {
    override      :"TK.view.DocsForm",
    btnSave       :'保存',
    btnSaveExit   :'保存与退出',
    btnSavePrint  :'保存-打印 PDF',
    btnClose      :'关闭',
    btnSign       :'签定电子签名',
    btnChange     :'改变',
    btnChangePlomb   :'Change plombs',
    btnChangeWagen:'改变车辆',
    btnChangeCont :'改变集装箱',
    btnChangeGr   :'改变商品',
    btnCopyEpd    :'从电子运输文件复制',
    btnDopList:'Extra list',
    btnContsList :'Cont/Wag list',
    btnCopy20     :'复制到第二十栏',
    btnTbcReady   :'准备TBC',
    btnTbcNotReady:'取消TBC',
    btnBchReady   :'准备Iftmin',
    btnBchNotReady:'取消Iftmin',
    btnFtsReady   :'FTS ready',
    btnFtsNotReady:'FTS cancel',

    labelPayers           :'付款人',
    labelBukvKod          :'当局字母代码',
    labelBukvKodRu        :'当局字母代码(RU)',
    labelPayerName        :'付款人名称',
    labelPayerNameRu      :'付款人名称(RU)',
    labelThrough          :'通过……',
    labelPrim    :'Notes',
    labelPayerKod1        :'付款人代码',
    labelPayerKod2        :'付款人代码的子码',
    labelPayerKod3        :'付款人子码的子码',
    labelPayerKod4        :'留下为了补码',
    labelPayment          :'付款方式',
    labelPaymentRu        :'付款方式(RU)',
    labelConts            :'集装箱',
    labelSize             :'集装箱大少',
    labelSizeMm           :'集装箱大少(mm)',
    labelNotes  :'Text before Container No.',
    labelNotesVag  :'Text before Car  No.',
    labelCategory         :'集装箱类型',
    labelContNum          :'集装箱号码',
    labelVid              :'集装箱种类',
    labelCargo            :'货物',
    labelCode             :'代码',
    labelNetto            :'净重',
    labelTara             :'自重',
    labelBrutto           :'毛重',
    labelCodeGng          :'GNG代码',
    labelNameRuGng        :'名称 (RU)',
    labelNameChGng        :'名称 (CN)',
    labelCodeEtsng        :' ET SNG代码',
    labelNameEtsng        :'名称',
    labelMassa            :'重量 (公斤)',
    labelMesta            :'件数',
    labelPack             :'包装种类(ru)',
    labelPackForeign      :'包装种类',
    labelCodeStn          :'车站代码',
    labelText3            :'Road name',
    labelText4            :'Road code',
    labelPogrStn          :'Boardercrossing stations',
    labelBorderStn        :'通过的国境站',
    labelCodeDoc          :'文件代码',
    labelText             :'文本',
    labelTextEu           :'文本(EU)',
    labelTextRu           :'文本(RU)',
    labelSenderDocs       :'发货人添附的文件',
    labelCustomsCode      :'海关代码',
    labelDocNum           :'文件的号码',
    labelCommercTerms     :'商业条款',
    labelPogrStn: 'Выходные пограничные станции',
    labelWagons           :'车辆',
    labelWagonNum         :'车辆号码',
    labelWagonsTonnage    :'吨位',
    labelWagonsTara       :'自重',
    labelWagonsAxes       :'轴数',
    labelZayavSenderPayers:'发货人/付款人的声明',
    labelZayavSender      :'发货人的声明',
    labelSenderNotes      :'发货人的特别声明',
    labelFile             :'文件',
    labelFileSearch       :'查看记录...',
    labelWagenNum         :'火车的号码:',
    labelTeplatename        :'Template name:',
    labelDocSort         :'Serial number:',
    labelDocSummary :'Consolidated:',

    labelTGNL: 'Code TGNL:',
    labelOKPO: 'Code OKPO:',
    labelINN: 'Code INN:',

    labelVagKontGruz: 'Car/Container/Cargo',
    btnPrintView   :"View PDF",
    labelDate: 'Date',
    labelCodyDo   :'Code expires:',
    labelVsegoSmgs:'Total SMGS:',
    labelCarrier  :'Carries',
    labelFrom     :'Station from',
    labelTo       :'Station to',
    labelStationFrom   :'Station from(code)',
    labelStationTo     :'Station to(code)',
    titleCarriers      :'Carriers',
    btnVed          :'List',
    btnVag          :'Wagon',
    btnCont         :'Container'
});

Ext.define("TK.locale.zh_CN.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree :'为了协调过程',
    btnAgreed   :'协调一致',
    btnNotAgreed:'不协调一致',

    labelCodyDo   :'代码是有效的直到:',
    labelVsegoSmgs:'共计SMGS:',
    labelZakazNum :'定货号码:'
});

Ext.define("TK.locale.zh_CN.view.aviso2.AvisoSmgs2Form", {
    override:"TK.view.aviso2.AvisoSmgs2Form",

    btnForAgree :'为了协调过程',
    btnAgreed   :'协调一致',
    btnNotAgreed:'不协调一致',

    labelCodyDo   :'代码是有效的直到:',
    labelVsegoSmgs:'共计SMGS:',
    labelZakazNum :'定货号码:'
});

Ext.define("TK.locale.zh_CN.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree :'为了协调过程',
    btnAgreed   :'协调一致',
    btnNotAgreed:'不协调一致',

    labelCodyDo   :'代码是有效的直到:',
    labelVsegoSmgs:'共计SMGS:',
    labelZakazNum :'定货号码:'
});

Ext.define("TK.locale.zh_CN.view.avisocimsmgs.CimSmgsForm", {
    override:"TK.view.avisocimsmgs.CimSmgsForm",

    btnForAgree :'为了协调过程',
    btnAgreed   :'协调一致',
    btnNotAgreed:'不协调一致',

    labelCodyDo   :'代码是有效的直到:',
    labelVsegoSmgs:'共计 CIM/SMGS:',
    labelZakazNum :'定货号码:'
});

Ext.define("TK.locale.zh_CN.view.avisogu29k.Form", {
    override:"TK.view.avisogu29k.Form",

    btnForAgree     :'为了协调过程',
    btnAgreed       :'协调一致',
    btnNotAgreed    :'不协调一致',
    labelVsegoGU    :'共计GU',
    labelZakazNum   :'申请号码',
    labelSender1    :'发货人',
    labelReceiver1  :'收货人',
    labelStnSender  :'发站',
    labelStnReceiver:'到站',
    labelPayers1    :'付款人',
    labelCodesTill  :'代码是有效的直到',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27'
});

Ext.define("TK.locale.zh_CN.view.avisogu29k.Form1", {
    override:"TK.view.avisogu29k.Form1",

    btnForAgree     :'为了协调过程',
    btnAgreed       :'协调一致',
    btnNotAgreed    :'不协调一致',
    labelVsegoGU    :'共计GU',
    labelZakazNum   :'申请号码',
    labelSender1    :'发货人',
    labelReceiver1  :'收货人',
    labelStnSender  :'发站',
    labelStnReceiver:'到站',
    labelPayers1    :'付款人',
    labelCodesTill  :'代码是有效的直到',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27'
});

Ext.define("TK.locale.zh_CN.view.cim.CimForm", {
    override        :"TK.view.cim.CimForm",
    labelWagonOtpr  :'批号',
    labelContPrivate:'自己(P)'
});

Ext.define("TK.locale.zh_CN.view.slovnakl.Form", {
    override        :"TK.view.slovnakl.Form",
    labelWagonOtpr  :'批号'
});

Ext.define("TK.locale.zh_CN.view.cimsmgs.CimSmgsForm", {
    override:"TK.view.cimsmgs.CimSmgsForm",
    labelDopList: 'Erganzungsblatt'
});

Ext.define("TK.locale.zh_CN.view.cmr.Form", {
    override:"TK.view.cmr.Form"
});

Ext.define("TK.locale.zh_CN.view.epd.Form", {
    override           :"TK.view.epd.Form",
    labelSenderName    :'发货人的名称',
    labelSenderAdress  :'发货人的地址',
    labelReceiverName  :'收货人的名称',
    labelReceiverAdress:'收货人的地址',
    labelStnSenderName :'发站名称',
    labelStnSenderCode :'发站的代码',
    labelStnReceiverName :'Consignee`s station name',
    labelStnReceiverCode :'Consignee`s station code'
});

Ext.define("TK.locale.zh_CN.view.file.Form", {
    override         :"TK.view.file.Form",
    labelGeneralInfo :'共用信息',
    labelDownloadFile:'下载文件'
});

Ext.define("TK.locale.zh_CN.view.gu27v.Form", {
    override:"TK.view.gu27v.Form"
});

Ext.define("TK.locale.zh_CN.view.gu29k.Form", {
    override:"TK.view.gu29k.Form"
});

Ext.define("TK.locale.zh_CN.view.invoice.Form", {
    override:"TK.view.invoice.Form",

    labelType           :'类型',
    labelOtprNum        :'发货号码',
    labelContractNum    :'合同号码',
    labelContractDate   :'合同日期',
    labelSellerName     :'卖主名称',
    labelSenderName     :'发货人的名称',
    labelSellerAdress   :'卖主地址',
    labelSenderAdress   :'发货人地址',
    labelBuyerName      :'顾客名称',
    labelReceiverName   :'收货人的名称',
    labelReceiverCountry:'收货人的国家, 代码',
    labelReceiverZip    :'收货人的邮政编码',
    labelReceiverCity   :'收货人的城市',
    labelBuyerAdress    :'顾客的地址',
    labelReceiverAdress :'收货人的地址',
    labelDeliveryCode   :'供应条件的代码',
    labelDeliveryPlace  :'送货地点',
    labelCurrency       :'发票货币',
    labelNote           :'附注',

    lableCombo1: 'Invoice',
    lableCombo2: 'Счет-фактура',
    lableCombo3: 'Приложение к инвойсу',
    lableCombo4: 'Грузовая ведомость',
    lableCombo5: 'Манифест'
});

Ext.define("TK.locale.zh_CN.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",
    btnAdd  :'添加'
});

Ext.define("TK.locale.zh_CN.view.nsi.ListDir", {
    override    :"TK.view.nsi.ListDir",
    title       :'手册的清单',
    btnView     :'查看',
    btnUploadDir:'下载文件手册',
    btnExportDir:'Export to Excel',
    headerName  :'名称',
    warnTitle:'警告',
    warnMsg  :'你必须选择一个数据行',

    nsiSta      :'铁路车站的手册',
    nsiCountries:'国家的手册',
    nsiGng      :'Handbook of NHM codes',
    nsiEtsng    :'ETSNG代码的手册',
    nsiCurrency :'货币的手册',
    nsiTnved    :'对外经济活动商品分类目录的手册',
    nsiDeliv    :'供应条件的手册',
    nsiUpak     :'包装种类的手册',
    nsiOtpr     :'法人的手册',
    nsiPlat     :'在铁路中付款人的手册(货运代理)',
    nsiManagement:'铁路机关的手册',
    nsiCountriesGd:'国家铁路的手册',
    nsiDocG23   :'文件种类的手册',
    nsiVeterin	:'兽医品的手册',
    nsiKarantin	:'检疫品的手册',
    nsiDangCode	:'危险品的手册',
    gruzyLink	:'Cargo list, with financial insurance'
});

Ext.define("TK.locale.zh_CN.view.smgs.Form", {
    override          :"TK.view.smgs.Form",
    labelWagonNum     :'车辆号码 (27)',
    labelWagonsTonnage:'吨位(28)',
    labelWagonsTara   :'自重(30)',
    labelWagonsAxes   :'轴数(29)',
    labelContNum      :'集装箱号码(9,19)',
    labelSize         :'集装箱大少',
    labelVid          :'集装箱种类(18)'
});

Ext.define("TK.locale.zh_CN.view.stat.Form", {
    override:"TK.view.stat.Form",

    lableDate          :'创造日期',
    lableDate1         :'从',
    lableDate2         :'到',
    lableZakazNum      :'定货号码',
    lableStatus        :'地位',
    lableUser          :'使用人',
    lableCountrySender :'发国',
    lableCountryRceiver:'到国',
    lableDeleted:'Deleted?',
    lableStnPogr       :'通过的国境站',
    lableStnSender     :'发站',
    lableStnReciver    :'到站',
    lableSender        :'发货人',
    lableReceiver      :'收货人',
    lableCargoName     :'货物名称',
    lableContSize      :'集装箱的种类',
    lablePayer         :'铁路运价和业务的付款人',
    lableKontNum         :'# container',

    btnFind :'查找',
    btnClose:'关闭',
    btnReset:'Reset',
    lableCombo1: 'Инстр. для согл. агентом',
    lableCombo2: 'Инстр. согл-на агентом',
    lableCombo3: 'Инстр. НЕсогл-на агентом',
    lableCombo4: 'Инстр. blocked',
    lableCombo5: 'Printed'
});

Ext.define("TK.locale.zh_CN.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg        :'数据请求...',
    errorMsg       :'注意! 是错误...'
});

Ext.define("TK.locale.zh_CN.controller.exchange.Senders", {
    override:"TK.controller.exchange.Senders",

    waitMsg        :'下载的文件...',
    waitMsg1       :'保存数据时…',
    maskMsg        :'数据请求...',
    showTitle      :'注意',
    showMsg1       :'已发送',
    showMsg2       :'错误!',
    showMsg3       :'',
    errorMsg       :'注意! 是错误...',

    btnClose       :'关闭',
    btnSave        :'保存',
    btnExport:     'Export FTS',

    titleFTS    :'Exchange with FTS',

    labelWagenNum   :'火车的号码:',
    labelWagenNums   :'Train number(-s[,]):',
    labelWagenInd   :'Train index:',
    labelPPVInd     :':',
    labelInputDate  :':'
});

Ext.define("TK.locale.zh_CN.controller.Docs", {
    override       :"TK.controller.Docs",

    titleCopy2Aviso:'Copy to aviso',
    titleList      :'清单',
    titleEdit      :'编辑',
    titleCopy      :'副本',
    titletPrint    :'打印',
    titletStat     :'统计',
    titleReports   :'决算',
    titleHistory   :'文件历史',
    titleUpload    :'下载手册文件',
    titleFTS       :'FTS',
    titleContList:'Enter train num(-s[,])',

    lableSettings  :'调整',
    lableFace      :'正面',
    lableBack      :'背面',
    lableTraneNum  :'火车的号码',
    labelSelectFile:'选择文件为了下载文件...',
    labelFile      :'文件',
    labelUn        :'用户名',
    labelUnName    :'姓名',
    labelUnEmail   :'Email',
    labelUnGroup   :'用户集团',
    labelGU         :'GU',
    labelGU29       :'GU29',
    labelGU27       :'GU27',
    labelWagenNum   :'火车的号码:',
    labelWagenNums   :'Train number(-s[,]):',
    labelWagenInd   :':',
    labelPPVInd     :':',
    labelInputDate  :':',

    btnPrint       :'打印',
    btnFind        :'查找',
    btnSearch      :'查看记录... ',
    btnClose       :'关闭',
    btnSave        :'保存',
    btnExport:     'Export FTS',
    btnContList  :'List',
    btnSmgs  :'Document',

    delTitle       :'删除...',
    delMsg         :'你确想删除文件吗?',
    maskMsg        :'数据请求...',
    showTitle      :'注意',
    showMsg1       :'已发送',
    showMsg2       :'错误!',
    showMsg3       :'',
    errorMsg       :'注意! 是错误...',
    waitMsg        :'下载的文件...',
    waitMsg1       :'保存数据时…',
    headerData     :'造成的日期',
    headerMsg      :'报告',

    titlePrint: "Printing",
    labelBlank: "With blank?",
    textPrint: "Print",

    titleDocsCopy: 'Docs list for copy',
    headerName: 'Name',
    btnCopy: 'Copy',
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

Ext.define("TK.locale.zh_CN.controller.Doc2Doc", {
    override:"TK.controller.Doc2Doc",

    titleDownldInv:'Download Invoices',
    msgEpd  :'你须要选择电子运输文件的选项卡为了文件下载好',
    successMsgTitle:'The operation has been finished successfully',

    errorMsg:'注意! 是错误...',
    btnFind        :'查找',
    btnClose       :'关闭',
    btnSave        :'保存',
    btnContList  :'List',
    btnSmgs  :'Smgs',
    titleContList:'Enter train num(-s[,])',
    labelWagenNums :'Train number(-s[,]):',
    warnTitle       :'Warning',
    saveMgs         :'Save the document'
});

Ext.define("TK.locale.zh_CN.controller.Ajax", {
    override:"TK.controller.Ajax",
    errorMsg:'注意! 是错误...'
});

Ext.define("TK.locale.zh_CN.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",
    maskMsg :'数据请求...',
    errorMsg:'注意! 是错误...'

});

Ext.define("TK.locale.zh_CN.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",
    maskMsg :'数据请求...',
    errorMsg:'注意! 是错误...'
});

Ext.define("TK.locale.zh_CN.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",
    maskMsg :'数据请求...',
    errorMsg:'注意! 是错误...'

});

Ext.define("TK.locale.zh_CN.controller.docs.Cimsmgs", {
    override          :"TK.controller.docs.Cimsmgs",

    titleOtpr         :'发货人/收货人的手册',
    headerOtprName    :'名称',
    headerOtprName1   :'名称 (RU)',
    headerOtprEmail   :'E-mail',
    headerOtprPhone   :'电话',
    headerOtprFax     :'Fax',
    headerOtprStrCode :'国家代码',
    headerOtprStr     :'国家',
    headerOtprStr1    :'国家 (RU)',
    headerOtprZip     :'邮政编码',
    headerOtprCity    :'城市',
    headerOtprCity1   :'城市 (RU)',
    headerOtprAdress  :'地址',
    headerOtprAdress1 :'地址 (RU)',
    headerOtprVat     :'VAT',
    headerOtprSendCode:'发货人代码/收货人代码',
    headerOtprClCode  :'顾客代码',
    headerINN         :'Code INN:',
    headerCountryCode :'国家代码',
    headerDopInfo     :'Additional Info',
    tooltipEdit       :'编辑',
    tooltipDel        :'删除'
});

Ext.define("TK.locale.zh_CN.controller.docs.Cmr", {
    override:"TK.controller.docs.Cmr"
});

Ext.define("TK.locale.zh_CN.controller.docs.Epd", {
    override:"TK.controller.docs.Epd"
});

Ext.define("TK.locale.zh_CN.controller.docs.File", {
    override:"TK.controller.docs.File",
    waitMsg1:'保存数据时...',
    delTitle:'删除...',
    delMsg  :'你确想删除吗..?',
    errorMsg:'注意! 是错误...'
});

Ext.define("TK.locale.zh_CN.controller.docs.Gu27v", {
    override:"TK.controller.docs.Gu27v",

    titleEpd:'电子运输文件不下载',
    msgEpd  :'你须要选择电子运输文件的选项卡为了文件下载好'

});

Ext.define("TK.locale.zh_CN.controller.docs.Gu29k", {
    override:"TK.controller.docs.Gu29k",

    titleEpd:'电子运输文件不下载',
    msgEpd  :'你须要选择电子运输文件的选项卡为了文件下载好'


});

Ext.define("TK.locale.zh_CN.controller.docs.Invoice", {
    override:"TK.controller.docs.Invoice",

    titleEpd:'电子运输文件不下载',
    msgEpd  :'你须要选择电子运输文件的选项卡为了文件下载好'
});


Ext.define("TK.locale.zh_CN.controller.Logs", {
    override   :"TK.controller.Logs",
    titleFilter:'过滤器',
    lableDate  :'创造的日期',
    lableDate1 :'从',
    lableDate2 :'到',
    labelUser  :'使用人',
    btnFind    :'查找'
});

Ext.define("TK.locale.zh_CN.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg:'注意! 是错误...'
});

Ext.define("TK.locale.zh_CN.controller.Project", {
    override:"TK.controller.Project",

    maskMsg  :'数据请求...',
    errorMsg :'注意! 是错误...',
    showTitle:'注意! ...禁止删除…',
    showMsg  :'删除设计前你需要在线路中删除所有的电子运输文件'
});

Ext.define("TK.locale.zh_CN.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'电子运输文件不下载',
    titleDownldInv:'Download Invoices',
    msgEpd  :'你须要选择电子运输文件的选项卡为了文件下载好',

    errorMsg:'注意! 是错误...',
    btnFind        :'查找',
    btnClose       :'关闭',
    btnSave        :'保存',
    btnContList  :'List',
    btnSmgs  :'Smgs'

});

Ext.define("TK.locale.zh_CN.controller.User", {
    override:"TK.controller.User",
    maskMsg :'数据请求...',
    errorMsg:'注意! 是错误...',
    waitMsg1:'保存数据时...',
        titleNoUser :'Warning',
        msgNoUser   :'Choose a user to perform an operation'
});

Ext.define("TK.locale.zh_CN.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Upload handbook',
    labelSelectFile:'选择文件为了下载文件...',
    labelFile      :'文件',
    btnSave        :'保存',
    btnClose       :'关闭',
    btnSearch      :'查看记录... ',
    titleErrorWarning   :'Warning',
    warningFillErrors   :'Underlined fields are too long'
});

Ext.define("TK.locale.zh_CN.controller.docs.PlombsTreeDetailController", {
    override       :"TK.controller.docs.PlombsTreeDetailController",
    msgTitle    :'Warning',
    msgSplit    :'Split plomb strings with separators: , and ;<br>In records:<br>'
});

Ext.define("TK.locale.zh_CN.view.nsi.List", {
    override         :"TK.view.nsi.List",
    title1           :"本集团",
    titleRoad        :'铁路的手册',
    titleRoute        :'Handbook of routes',
    titleProject        :'Handbook of projects',
    titleManagement  :'铁路机关的手册',
    titleSta         :'铁路车站的手册',
    titleCountries   :'国家的手册',
    titleCountriesZhd:'国家铁路的手册',
    titleDangerous   :'危险品的手册',
    titleKarantin    :'检疫品的手册',
    titleVeterin     :'兽医品的手册',
    titleEtsng       :' ETSNG代码的手册',
    titleDocs        :'文件种类的手册',
    titlePlat        :'在铁路中付款人的手册(货运代理)',
    titleOtpr        :'法人的手册',
    titleDocs1       :'文件的手册',
    titleCurrency    :'货币的手册',
    titleTnved       :'对外经济活动商品分类目录的手册',
    titleDeliv       :'供应条件的手册',
    titleUpak        :'包装种类的手册',

    headerName       :'名称',
    headerProject       :'Project',
    headerRoute       :'Route',
    headerDescr      :'成名',
    headerCode       :'代码',
    headerCountryRu  :'国家(RU)',
    headerCountry    :'国家',
    headerCountryS   :'国家',
    headerStn        :'站(RU)',
    headerStn1       :'站(CN)',
    headerStn2       :'站(EN)',
    headerZhD        :'铁路',
    headerCodeAdm    :'当局代码',
    headerWay        :'铁路',
    headerWayCode    :'铁路代码',
    headerCoedEdi    :'代码UN/EDIFACT ',
    headerCustCode   :'海关代码',
    headerName1      :'名称 (RU)',
    headerName2      :'名称 (CN)',
    headerName3      :'名称 (EU)',
    headerPayerMeth  :'付款方式',
    headerPayerCode  :'付款人的代码',
    headerPayerCode1 :'代码的子码',
    headerPayerCode2 :'子码的子码',
    headerCountryCode:'国家代码',
    headerCountryName:'国家名称',
    headerCity       :'城市',
    headerAddress    :'地址',
    headerOtprZip    :'邮政编码',
    headerDopInfo    :'Additional Info',

    carrierTitle    :'Carrier handbook',
    headerSt        :'Station',
    headerCar       :'Carrier, number',
    headerCarName   :'Carrier, name',
    headerCarShort  :'Carrier, name short',

    ttipSave         :'保存',
    ttipDel          :'删除',
    btnClose         :'关闭'
});

Ext.define("TK.locale.zh_CN.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Print settings",
    labelBlank: "With blank?",
    textPrint: "Print",
    textPages: 'Pages for print',
    textPage: 'Page ',
    textPageBack: '(back)',
    printTitle:'Print documents',
    printMsg:'Document(-s) will be printed'
});

Ext.define("TK.locale.zh_CN.controller.print.PrintTemplates", {
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

Ext.define("TK.locale.zh_CN.view.printtmpl.Form", {
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

Ext.define("TK.locale.zh_CN.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    title: 'Car/Container/Cargo',
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
    btnPlombText: '+ Plomb',
    btnSearch: 'Search',
    btnExpandAll: 'Expand All',
    btnCollapseAll: 'Collapse All',
    btnImportXLSvag:'Wagon list import',
    btnImportXLSCont:'Container list import'
});

Ext.define("TK.locale.zh_CN.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Docs, from senders'
});

Ext.define("TK.locale.zh_CN.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Car/Container/Cargo'
});

Ext.define("TK.locale.zh_CN.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Plombs'
});
/*
Ext.define("Ext.locale.zh_CN.form.field.Base", {
    override: "Ext.form.field.Base",

    kontNumText: 'This field must have the container number in the format ABCD1234567',
    vagNumText: 'This field must have the number of the narrow(8 symbols) or the wide(12 symbols) wagon',
    vagNumUzkText: 'This field must have the number of the narrow wagon in the format 123456789012',
    vagNumShirText: 'This field must have the number of the wide wagon in the format 12345678',
    vagNumLastDigitText: 'Invalid key digit',
    kontNumLastDigitText: 'Invalid key digit'
});*/

Ext.define("TK.locale.zh_CN.Validators", {
    override: "TK.Validators",


    kontNumText: 'This field must have the container number in the format ABCD1234567',
    vagNumText: 'This field must have the number of the narrow(8 symbols) or the wide(12 symbols) wagon',
    vagNumUzkText: 'This field must have the number of the narrow wagon in the format 123456789012',
    vagNumShirText: 'This field must have the number of the wide wagon in the format 12345678',
    vagNumLastDigitText: 'Invalid key digit',
    kontNumLastDigitText: 'Invalid key digit',
    notXLS          :'Not a xls/xlsx file'
});

Ext.define("TK.locale.zh_CN.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Customs code',
    labelTextRu: 'Text(ru)',
    labelText: 'Text'
});

Ext.define("TK.locale.zh_CN.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Documents attached by sender',
    titleUpload: 'Uploading',
    btnClose: 'Close',
    btnSave: 'Save',
    labelUpload: 'Upload',
    labelFile: 'File'
});

Ext.define("TK.locale.zh_CN.view.ved.List", {
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

Ext.define("TK.locale.zh_CN.controller.docs.Ved", {
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

Ext.define("TK.locale.zh_CN.view.ved.Form", {
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

Ext.define("TK.locale.zh_CN.view.ved.VagsList", {
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

Ext.define("TK.locale.zh_CN.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Routes list',
    btnView: "Show documents"
});

Ext.define("TK.locale.zh_CN.view.pogruz.PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title       :'Trains',
    btnFind     :'查找',
    btnFilter   :'过滤器',
    btnClose    :'关闭',
    btnReset    :'Reset',
    lableDate   :'Date from',
    lableDate1  :'Date to',
    train       :'Train number',
    count       :'Quantity',
    btnOk       :'Choose',
    btnCancel   :'取消'
});

Ext.define("TK.locale.zh_CN.view.pogruz.SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title           :'CIM/SMGS by train number',
    btnClose        :'关闭',
    headerG694      :'Num<br/>waybill',
    headerAltered   :'Altered',
    btnOk           :'Choose',
    btnCancel       :'取消',
    headerContNum   :'集装箱号码',
    headerVagNum    :'车辆号码',
    headertNstn     :'到站'
});

Ext.define("TK.locale.zh_CN.view.pogruz.Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title           :'Loading list',
    headerWagN      :'№ wagon<br/><b>list</b>',
    headerKonN      :'№ container<br/><b>list</b>',
    headerKonNdb    :'№ container<br/><b>db</b>',
    headerG694      :'№waybill<br/><b>list</b>',
    headerKlient    :'Owner<br/><b>list</b>',
    headerFoot      :'Size foot<br/><b>list</b>',
    headerContSize  :'Type<br/><b>list</b>',
    headerPlomb     :'Plombs<br/><b>list</b>',
    headerTara      :'Tara<br/>container<br/><b>list</b>',
    headerMaxLoad   :'Max load<br/>container<br/><b>list</b>',
    headerTaraVag   :'Tara<br/>wagon<br/><b>list</b>',
    headerMaxLoadVag:'Max load<br/>wagon<br/><b>list</b>',
    headerKolOs     :'Axis<br/><b>list</b>',
    headerId        :'Id<br/><b>db</b>',

    btnOk           :'Choose',
    btnCancel       :'取消',
});
Ext.define("TK.locale.zh_CN.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText           :'records per page'
});

Ext.define("TK.locale.zh_CN.view.edit.StationCatalogEdit", {
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
Ext.define("Ext.locale.zh_CN.grid.plugin.RowEditing", {
    override: "Ext.grid.plugin.RowEditing",

    saveBtnText:'Save',
    cancelBtnText:'Cancel',
    errorsText:'Error',
    dirtyText:'You need to commit or cancel your changes',
    chEvery:'Change all on ',
    chEmpty:'Change empty on '
});

Ext.define("TK.locale.zh_CN.view.components.g7vagsmgs2", {
    override: "TK.view.components.g7vagsmgs2",

    drophlp        :'Drop the record in the desired place'
});
Ext.define("TK.locale.zh_CN.view.components.g19plombsmgs2", {
    override: "TK.view.components.g19plombsmgs2",

    totalCount        :'Total'
});
Ext.define("TK.locale.zh_CN.view.edit.SelectCopy2AvisoElements", {
    override: "TK.view.edit.SelectCopy2AvisoElements",

    title   :'Create a template',
    headtext    :'Name',
    headngraph  :'N item',
    choose      :'Choose',
    cancel      :'Cancel'
});
