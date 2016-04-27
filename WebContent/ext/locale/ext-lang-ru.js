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
 * 6 November 2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        Ext.Date.shortMonthNames = ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNumbers = {
            'Янв': 0,
            'Фев': 1,
            'Мар': 2,
            'Апр': 3,
            'Май': 4,
            'Июн': 5,
            'Июл': 6,
            'Авг': 7,
            'Сен': 8,
            'Окт': 9,
            'Ноя': 10,
            'Дек': 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

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

Ext.define("Ext.locale.ru.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.ru.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} выбранных строк"
});

Ext.define("Ext.locale.ru.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Закрыть эту вкладку"
});

Ext.define("Ext.locale.ru.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Значение в этом поле неверное"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.ru.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Загрузка..."
});

Ext.define("Ext.locale.ru.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Сегодня",
    minText: "Эта дата раньше минимальной даты",
    maxText: "Эта дата позже максимальной даты",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    nextText: 'Следующий месяц (Control+Вправо)',
    prevText: 'Предыдущий месяц (Control+Влево)',
    monthYearText: 'Выбор месяца (Control+Вверх/Вниз для выбора года)',
    todayTip: "{0} (Пробел)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.ru.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Отмена"
});

Ext.define("Ext.locale.ru.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Страница",
    afterPageText: "из {0}",
    firstText: "Первая страница",
    prevText: "Предыдущая страница",
    nextText: "Следующая страница",
    lastText: "Последняя страница",
    refreshText: "Обновить",
    displayMsg: "Отображаются записи с {0} по {1}, всего {2}",
    emptyMsg: 'Нет данных для отображения'
});

Ext.define("Ext.locale.ru.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Минимальная длина этого поля {0}",
    maxLengthText: "Максимальная длина этого поля {0}",
    blankText: "Это поле обязательно для заполнения",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.ru.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Значение этого поля не может быть меньше {0}",
    maxText: "Значение этого поля не может быть больше {0}",
    nanText: "{0} не является числом",
    negativeText: "Значение не может быть отрицательным"
});

Ext.define("Ext.locale.ru.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    minText: "Дата в этом поле должна быть позже {0}",
    maxText: "Дата в этом поле должна быть раньше {0}",
    invalidText: "{0} не является правильной датой - дата должна быть указана в формате {1}",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.ru.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Загрузка..."
    });
});

Ext.define("Ext.locale.ru.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Это поле должно содержать адрес электронной почты в формате "user@example.com"',
    urlText: 'Это поле должно содержать URL в формате "http:/' + '/www.example.com"',
    alphaText: 'Это поле должно содержать только латинские буквы и символ подчеркивания "_"',
    alphanumText: 'Это поле должно содержать только латинские буквы, цифры и символ подчеркивания "_"'
});

Ext.define("Ext.locale.ru.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Пожалуйста, введите адрес:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Полужирный (Ctrl+B)',
                text: 'Применение полужирного начертания к выделенному тексту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Курсив (Ctrl+I)',
                text: 'Применение курсивного начертания к выделенному тексту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Подчёркнутый (Ctrl+U)',
                text: 'Подчёркивание выделенного текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Увеличить размер',
                text: 'Увеличение размера шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Уменьшить размер',
                text: 'Уменьшение размера шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Заливка',
                text: 'Изменение цвета фона для выделенного текста или абзаца.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Цвет текста',
                text: 'Измение цвета текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Выровнять текст по левому краю',
                text: 'Вырaвнивание текста по левому краю.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'По центру',
                text: 'Вырaвнивание текста по центру.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Выровнять текст по правому краю',
                text: 'Вырaвнивание текста по правому краю.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Маркеры',
                text: 'Начать маркированный список.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Нумерация',
                text: 'Начать нумернованный список.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Вставить гиперссылку',
                text: 'Создание ссылки из выделенного текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Исходный код',
                text: 'Переключиться на исходный код.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.ru.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Пожалуйста, подождите..."
});

Ext.define("Ext.locale.ru.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Сортировать по возрастанию",
    sortDescText: "Сортировать по убыванию",
    lockText: "Закрепить столбец",
    unlockText: "Снять закрепление столбца",
    columnsText: "Столбцы"
});

Ext.define("Ext.locale.ru.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Пусто)',
    groupByText: 'Группировать по этому полю',
    showGroupsText: 'Отображать по группам'
});

Ext.define("Ext.locale.ru.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Название",
    valueText: "Значение",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.ru.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Отмена",
        yes: "Да",
        no: "Нет"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.ru.Component", {	
    override: "Ext.Component"
});

//////////////////////////////////
// TK Portal lacale costants  ////
/////////////////////////////////

Ext.define("TK.locale.ru.view.Viewport", {
    override     :"TK.view.Viewport",
    headerPortal :'Портал ОАО «ТрансКонтейнер»',
    headerUser   :'Пользователь: ',
    headerLangLbl:'Выбор языка: '
});

Ext.define("TK.locale.ru.view.MenuTree", {
    override    :"TK.view.MenuTree",
    title       :'Меню',
    treeUsers   :'Пользователи',
    treeProjects:'Проекты',
    treeLogs    :'Логи',
    btnStat     :"Статистика",
    btnPrnTmpl  :"Шаблоны печати",
    treeDirs    :'Справочники',
    treeInstr   :'Инструкция',
    treeExit    :'Выход'
});

Ext.define("TK.locale.ru.stat.List", {
    override    :"TK.view.stat.List",
    title       :'Статистика'
});

Ext.define("TK.locale.ru.view.DocsList", {
    override:"TK.view.DocsList",

    btnStat    :"Статистика",
    btnPrint   :"Печать PDF",
    btnCreate  :'Создать',
    btnCopy    :'Копия',
    btnEdit    :'Редактировать',
    btnDelete  :'Удалить',
    btnMakeSmgs:'Сформировать СМГС',
    btnMakeCimSmgs:'Сформировать ЦИМ/СМГС',
    btnAppend2Smgs:'Добавить в СМГС',
    btnAppend2CimSmgs:'Добавить в ЦИМ/СМГС',
    btnMakeGU  :'Сформировать ГУ',
    btnDownload:'Загрузить',
    btnHistory :'История',
    btnBindPrint :'Привязать печать',
    btnExch    :'Обмен',
    btnExchTBC :'ТБЦ',
    btnExchBCh1:'Открыть/закрыть на ред.',
    btnExchBCh :'БЧ',
    btnExchFTS :'ФТС',
    btnExchBTLC :'БТЛЦ',
    btnExchTdgFTS:'ТДГ',
    btnReports :'Отчеты',
    btnView    :'Просмотреть',
    /*btnContList  :'Ведомость',
     btnSmgs  :'СМГС',*/

    btnContsList :'Ведомость конт-ов',
    btnDopList :'Доп. лист',
    btnContsList1 :'Ведомость',
    btnSmgs :'СМГС',

    btnPlusDocs :'+ Документы',
    btnPlusSmgsInv :'+ СМГС и Инвойсы',
    btnPlusInv :'+ Инвойсы',

    headerID          :'ID',
    headerProject          :'Проект',
    headerRoute          :'Маршрут',
    headerDoc          :'Документ',
    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',
    headerSenderName  :'Наименование<br/>отправителя',
    headerReceiverName:'Наименование<br/>получателя',
    headerContNum     :'Номер<br/>конт.',
    headerDescr       :'Описание',
    headerVagNum      :'Номер<br/>вагона',
    headerInv           :'Инвойсы',
    headerNPoezd      :'№<br/>поезда',
    headerFileName    :'Имя файла',
    headerContentType :'Тип<br/>сожержимого',
    headerSizeByte    :'Размер, байт',

    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными',

    txtForApproval:'Для согласования',
    txtApproved:'Согласована',
    txtNotApproved:'Не согласована',
    txtBlocked:'Заблокирована'
});

Ext.define("TK.locale.ru.view.aviso.List", {
    override:"TK.view.aviso.List",

    headerStatus  :'Статус',
    headerInstrNum:'№ инструкции',

    headerGNG:'ГНГ',

    statusBlocked  :'Заблокирована',
    status4Approval:'Для согласования',
    statusAgreed   :'Согласована',
    statusNotAgreed:'НЕ Согласована',

    title:'Журнал Инструкций СМГС'

});

Ext.define("TK.locale.ru.view.avisocimsmgs.List", {
    override:"TK.view.avisocimsmgs.List",

    headerStatus  :'Статус',
    headerInstrNum:'№ инструкции',

    headerGNG:'ГНГ',

    statusBlocked  :'Заблокирована',
    status4Approval:'Для согласования',
    statusAgreed   :'Согласована',
    statusNotAgreed:'НЕ Согласована',

    title:'Журнал Инструкций ЦИМ/СМГС'

});

Ext.define("TK.locale.ru.view.avisogu29k.List", {
    override:"TK.view.avisogu29k.List",

    headerStatus  :'Статус',
    headerInstrNum:'№ инструкции',
    headerGNG     :'ГНГ',

    statusBlocked  :'Заблокирована',
    status4Approval:'Для согласования',
    statusAgreed   :'Согласована',
    statusNotAgreed:'НЕ Согласована',

    title:'Журнал Инструкций ГУ'

});

Ext.define("TK.locale.ru.view.cim.List", {
    override :"TK.view.cim.List",
    headerCim:'Цим',
    title    :'Журнал ЦИМ'

});

Ext.define("TK.locale.ru.view.cimsmgs.List", {
    override        :"TK.view.cimsmgs.List",
    headerCimsmgs   :'ЦИМ/СМГС',
    headerDateTransp:'Дата трансп.',
    headerExchBch   :'Iftmin',
    title           :'Журнал ЦИМ/СМГС'

});

Ext.define("TK.locale.ru.view.cmr.List", {
    override        :"TK.view.cmr.List",
    headerDateTransp:'Дата трансп.',
    headerCMR       :'ЦMP',
    title           :'Журнал ЦМP'

});

Ext.define("TK.locale.ru.view.slovnakl.List", {
    override        :"TK.view.slovnakl.List",
    headerSlov       :'Словацкая накл',
    title           :'Журнал словацких накладных'
});

Ext.define("TK.locale.ru.view.epd.List", {
    override:"TK.view.epd.List",
    title   :'Журнал ЭПД'

});

Ext.define("TK.locale.ru.view.gu27v.List", {
    override        :"TK.view.gu27v.List",
    headerGu27v     :'ГУ-27в',
    headerDateTransp:'Дата трансп.',
    headerAvisoNum  :'№ Авизо',
    title           :'Журнал ГУ'

});

Ext.define("TK.locale.ru.view.gu29k.List", {
    override        :"TK.view.gu29k.List",
    headerGu29k     :'ГУ-29к',
    headerDateTransp:'Дата трансп.',
    headerAvisoNum  :'№ Авизо',
    title           :'Журнал ГУ'

});

Ext.define("TK.locale.ru.view.invoice.List", {
    override:"TK.view.invoice.List",
    title   :'Журнал Инвойсов'

});

Ext.define("TK.locale.ru.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'Журнал СМГС',
    headerSmgs    :'СМГС',
    headerExchTBC :'ТБЦ',
    headerExchBch :'Iftmin',
    headerAvisoNum:'№ Авизо'
});

Ext.define("TK.locale.ru.view.file.List", {
    override:"TK.view.file.List",
    title   :'Журнал Графики'
});

Ext.define("TK.locale.ru.view.logs.List", {
    override    :"TK.view.logs.List",
    title       :'Логи портала',
    headerDate  :'Дата',
    headerUser  :'Пользователь',
    headerHost  :'Хост',
    headerAgent :'Среда выполнения',
    headerLog   :'Лог',
    headerThread:'Поток',
    headerFile  :'Файл',
    headerMethod:'Метод',
    btnFilter   :'Фильтр'
});

Ext.define("TK.locale.ru.view.project.List", {
    override    :"TK.view.project.List",
    title       :'Список проектов',
    headerName  :'Наименование',
    headerGroups:'Группы',
    headerRoutes:'Маршруты',
    btnCreate   :'Создать',
    btnEdit     :'Редактировать',
    btnDelete   :'Удалить',
    delMsg1     :'Удаление...',
    delMsg2     :'Вы действительно хотите удалить текущий Проект?'
});

Ext.define("TK.locale.ru.view.printtmpl.List", {
    override    :"TK.view.printtmpl.List",
    title       :'Список шаблонов печати',
    headerName  :'Наименование',
    headerRoutes:'Маршруты',
    headerDefault:'По умолчанию?'
});

Ext.define("TK.locale.ru.view.printtmpl.Form", {
    override    :"TK.view.printtmpl.Form",
    title       :'Шаблон печати',
    btnSave       :'Сохранить',
    btnSaveExit   :'Сохр-ть и Выйти',
    btnClose      :'Закрыть'
});

Ext.define("TK.locale.ru.view.user.List", {
    override      :"TK.view.user.List",
    title         :'Список пользователей',
    headerUn      :'Логин',
    headerName    :'Имя',
    headerGroup   :'Группа',
    headerGroups  :'Доп. группы',
    headerPrivileg:'Привелегии',
    headerLocked  :'Отключена?',
    headerSu      :'Админ?',
    headerEmail   :'Эл.почта',
    btnCreate     :'Создать',
    btnEdit       :'Редактировать',
    btnRefresh    :'Обновить'
});

Ext.define("TK.locale.ru.view.user.ListGroups", {
    override   :"TK.view.user.ListGroups",
    title      :'Список групп',
    headerName :'Имя',
    headerDescr:'Описание',
    btnSelect  :'Выбрать',
    btnAdd     :'Добавить',
    btnEdit    :'Редактировать',
    btnRefresh :'Обновить',
    btnClose   :'Закрыть'
});

Ext.define("TK.locale.ru.view.user.ListPrivs", {
    override   :"TK.view.user.ListPrivs",
    title      :'Список привелегий',
    headerName :'Имя',
    headerDescr:'Описание',
    btnSelect  :'Выбрать',
    btnRefresh :'Обновить',
    btnClose   :'Закрыть'
});

Ext.define("TK.locale.ru.view.user.Form", {
    override       :"TK.view.user.Form",
    title          :'Редактор',
    labelLogin     :'Логин<span class="x-required">*</span>',
    labelLogin1    :'Логин:',
    labelPass      :'Пароль<span class="x-required">*</span>',
    labelPass1     :'Подтверждение пароля<span class="x-required">*</span>',
    labelPass2     :'Новый пароль:',
    labelFIO       :'Имя(ФИО)',
    labelEmail     :'Эл.почта',
    labelLocked    :'Отключена?',
    labelSu        :'Админ?',
    labelGroup     :'Группа<span class="x-required">*</span>',
    labelGroups    :'Доп. группы',
    labelPrivs     :'Привелегии',
    btnSave        :'Сохранить',
    btnClose       :'Закрыть',
    vTypeLabelPass :'Пароли не совпадают, это поле может содержать только буквы, цифры и _',
    vTypeLabelLogin:'Пользователь с таким логином уже существует, это поле может содержать только буквы, цифры и _'
});

Ext.define("TK.locale.ru.view.user.FormGroups", {
    override    :"TK.view.user.FormGroups",
    title       :'Редактор',
    vTypeLabelGr:'Группа с таким именем уже существует, это поле может содержать только буквы, цифры и _',
    labelName   :'Имя<span class="x-required">*</span>',
    labelName1  :'Имя:',
    labelDescr  :'Описание',
    btnSave     :'Сохранить',
    btnClose    :'Закрыть'
});

Ext.define("TK.locale.ru.view.project.Form", {
    override        :"TK.view.project.Form",
    title           :'Ред. Проект',
    btnSave         :'Сохранить',
    btnSaveExit     :'Сохр-ть и Выйти',
    btnClose        :'Закрыть',
    btnSelect       :'Выбрать',
    labelProjectName:'Наименование',
    labelGroups     :'Группы',
    labelRoutes     :'Маршруты',
    labelSelected   :'Выбранные',
    labelAvailable  :'Доступные',
    headerName      :'Наименование',
    headerDescr     :'Описание',
    saveMsg         :'Идет сохранение данных...'
});

Ext.define("TK.locale.ru.view.edit.DetailGrid", {
    override :"TK.view.edit.DetailGrid",
    btnAdd   :"Добавить",
    btnDelete:"Удалить",
    btnCopy  :"Копировать",
    btnOk    :'Ok',

    headerName         :'Наименование',
    headerRoutesGr     :'Группы',
    headerRoutesDocs   :'Документы',
    headerRoutesCodeTbc:'Код ТБЦ',
    headerContNum      :'Номер',
    headerContSize     :'Размер',
    headerContVid      :'Вид',
    headerContNum1     :'Номер',
    headerContSize1    :'Размер',
    headerContVid1     :'Вид',
    headerCodeTNVED    :'код ТНВЭД',
    headerGoodsDescr   :'описание товара',
    headerPackage      :'вид уп-ки',
    headerPackNum      :'число уп./мест',
    headerBrutto       :'брутто (кг)',
    headerNetto        :'нетто (кг)',
    headerQuantity     :'кол-во',
    headerProdUnit     :'ед.изм. товара',
    headerProdPrice    :'цена ед. товара',
    headerTotalValue   :'общая стоимость',
    headerType         :'тип',
    headerTotal        :'Итого:'
});

Ext.define("TK.locale.ru.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    btnSave :'Сохранить',
    btnClose:'Закрыть'
});

Ext.define("TK.locale.ru.view.edit.DetailTabPanel", {
    override :"TK.view.edit.DetailTabPanel",
    btnAdd   :'Добавить',
    btnDelete:'Удалить'
});

Ext.define("TK.locale.ru.view.edit.VgCtGrTreeFormWin", {
    override: "TK.view.edit.VgCtGrTreeFormWin",
    labelName1      :'Название',
    labelWagons       :'Вагоны',
    labelWagonNum     :'№ вагона',
    labelWagonsTonnage:'Тоннаж',
    labelWagonsTara   :'Тара',
    labelWagonsAxes   :'Оси',
    labelConts   :'Контейнера',
    labelSize    :'Размер',
    labelSizeMm  :'Размер(мм)',
    labelTaraCont: 'Тара, вес',
    labelNotes  :'Текст перед № контейнера',
    labelCategory:'Категория',
    labelContNum :'№ Контейнера',
    labelDescr   :'Описание',
    labelVid     :'Вид',
    labelCargo    :'Груз',
    labelCode     :'Код ',
    labelNetto    :'Нетто ',
    labelTara     :'Тара ',
    labelBrutto   :'Брутто ',
    labelCodeGng  :'Код ГНГ',
    labelNameRuGng:'Название(рус)',
    labelNameChGng:'Название(китай)',
    labelCodeEtsng:'Код ЕТ СНГ',
    labelNameEtsng:'Название',
    labelMassa    :'Масса, кг',
    labelMesta    :'Места',
    labelPack     :'Упаковка(рус)',
    labelPackForeign:'Упаковка'
});


Ext.define("TK.locale.ru.view.edit.Docs9TreeFormWin", {
    override: "TK.view.edit.Docs9TreeFormWin",

    labelCustomsCode: 'Таможенный код',
    labelTextRu: 'Текст(рус)',
    labelText: 'Текст',
    labelDocNum: '№ док-та',
    labelDate: 'Дата',
    labelTotal: 'Кол-во'
});

Ext.define("TK.locale.ru.view.edit.PlombsTreeFormWin", {
    override: "TK.view.edit.PlombsTreeFormWin",

    labelZnak: 'Пломба',
    labelTotal: 'Кол-во'
});

Ext.define("TK.locale.ru.view.DocsForm", {
    override      :"TK.view.DocsForm",
    btnSave       :'Сохранить',
    btnSaveExit   :'Сохр-ть и Выйти',
    btnSavePrint  :'Сохр-ть и Печать PDF',
    btnClose      :'Закрыть',
    btnSign       :'Подписать ЭЦП',
    btnChange     :'Изменить',
    btnChangeWagen:'Изменить вагон',
    btnChangeCont :'Изменить контейнер',
    btnChangeGr   :'Изменить груз',
    btnCopyEpd    :'Копировать с ЭПД',
    btnCopy20     :'Копия в гр.20',
    btnTbcReady   :'ТБЦ готов',
    btnTbcNotReady:'ТБЦ отмена',
    btnBchReady   :'Iftmin готов',
    btnBchNotReady:'Iftmin отмена',
    btnFtsReady   :'ФТС готов',
    btnFtsNotReady:'ФТС отмена',

    labelNotes:'Примечание ',

    labelSender     :'Отправитель',
    labelName       :'Наименование',
    labelName1      :'Название',
    labelNameEu     :'Наименование EU',
    labelNameRu     :'Наименование (рус)',
    labelNameCh     :'Наименование (кит)',
    labelDate       :'Дата',
    labelTotal      :'Кол-во',
    labelCountry    :'Страна',
    labelCountryRu  :'Страна (рус)',
    labelCountryCode:'Код страны',
    labelZip        :'Индекс',
    labelCity       :'Город',
    labelCityRu     :'Город(рус)',
    labelAdress     :'Адрес',
    labelAdressRu   :'Адрес(рус)',
    labelReceiver   :'Получатель',

    labelPayers     :'Плательщики',
    labelBukvKod    :'Букв. код ж/д администрации',
    labelBukvKodRu  :'Букв. код ж/д администрации(рус)',
    labelPayerName  :'Наименование плательщика',
    labelPayerNameRu:'Наименование плательщика(рус)',
    labelThrough    :'Способ оплаты (Через что)',
    labelPayerKod1  :'Код плательщика',
    labelPayerKod2  :'Подкод кода плательщика',
    labelPayerKod3  :'Подкод подкода плательщика',
    labelPayerKod4  :'Резерв. для доп. кода',
    labelPayment    :'Способ оплаты',
    labelPaymentRu  :'Способ оплаты(рус)',

    labelConts   :'Контейнера',
    labelSize    :'Размер',
    labelSizeMm  :'Размер(мм)',
    labelNotes  :'Текст перед № контейнера',
    labelCategory:'Категория',
    labelContNum :'№ Контейнера',
    labelDescr   :'Описание',
    labelVid     :'Вид',

    labelCargo    :'Груз',
    labelCode     :'Код ',
    labelNetto    :'Нетто ',
    labelTara     :'Тара ',
    labelBrutto   :'Брутто ',
    labelCodeGng  :'Код ГНГ',
    labelNameRuGng:'Название(рус)',
    labelNameChGng:'Название(китай)',
    labelCodeEtsng:'Код ЕТ СНГ',
    labelNameEtsng:'Название',
    labelMassa    :'Масса, кг',
    labelMesta    :'Места',
    labelPack     :'Упаковка(рус)',
    labelPackForeign:'Упаковка',

    labelCodeStn     :'Код станции',
    labelBorderStn   :'Пограничные станции перехода',
    labelCodeDoc     :'Код документа',
    labelText        :'Текст',
    labelTextEu      :'Текст Eu',
    labelTextRu      :'Текст(рус)',
    labelSenderDocs  :'Документы, приложенные отправителем',
    labelCustomsCode :'Таможенный код',
    labelDocNum      :'№ док-та',
    labelCommercTerms:'Коммерческие условия',

    labelWagons       :'Вагоны',
    labelWagonNum     :'№ вагона',
    labelWagonsTonnage:'Тоннаж',
    labelWagonsTara   :'Тара',
    labelWagonsAxes   :'Оси',

    labelZayavSenderPayers:'Заявления отправителя/Плательщики',
    labelZayavSender      :'Заявления отправителя',
    labelSenderNotes      :'Особые заявления отправителя',
    labelFile             :'Файл',
    labelFileSearch       :'Обзор...',
    labelWagenNum         :'Номер поезда:',
    labelDocSort         :'Порядковый номер:',
    labelDocSummary         :'Сводная:'

});

Ext.define("TK.locale.ru.view.aviso.Form", {
    override:"TK.view.aviso.Form",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelCodyDo   :'Коды действуют до:',
    labelVsegoSmgs:'ВСЕГО SMGS:',
    labelZakazNum :'Номер заказа:'
});

Ext.define("TK.locale.ru.view.aviso2.Form", {
    override:"TK.view.aviso2.Form",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelCodyDo   :'Коды действуют до:',
    labelVsegoSmgs:'ВСЕГО SMGS:',
    labelZakazNum :'Номер заказа:'
});

Ext.define("TK.locale.ru.view.aviso.Form1", {
    override:"TK.view.aviso.Form1",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelCodyDo   :'Коды действуют до:',
    labelVsegoSmgs:'ВСЕГО SMGS:',
    labelZakazNum :'Номер заказа:'
});

Ext.define("TK.locale.ru.view.avisocimsmgs.Form", {
    override:"TK.view.avisocimsmgs.Form",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelCodyDo   :'Коды действуют до:',
    labelVsegoSmgs:'ВСЕГО CIM/SMGS:',
    labelZakazNum :'Номер заказа:'
});

Ext.define("TK.locale.ru.view.avisogu29k.Form", {
    override:"TK.view.avisogu29k.Form",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelVsegoGU    :'ВСЕГО ГУ',
    labelZakazNum   :'Номер заказа',
    labelSender1    :'Отправитель',
    labelReceiver1  :'Получатель',
    labelStnSender  :'Станция отправления',
    labelStnReceiver:'Станция назначения',
    labelPayers1    :'Плательщик',
    labelCodesTill  :'Коды действительны до',
    labelGU         :'ГУ',
    labelGU29       :'ГУ29к',
    labelGU27       :'ГУ27в'
});

Ext.define("TK.locale.ru.view.avisogu29k.Form1", {
    override:"TK.view.avisogu29k.Form1",

    btnForAgree :'Для согласования',
    btnAgreed   :'Согласована',
    btnNotAgreed:'НЕ согласована',

    labelVsegoGU    :'ВСЕГО ГУ',
    labelZakazNum   :'Номер заказа',
    labelSender1    :'Отправитель',
    labelReceiver1  :'Получатель',
    labelStnSender  :'Станция отправления',
    labelStnReceiver:'Станция назначения',
    labelPayers1    :'Плательщик',
    labelCodesTill  :'Коды действительны до',
    labelGU         :'ГУ',
    labelGU29       :'ГУ29к',
    labelGU27       :'ГУ27в'
});

Ext.define("TK.locale.ru.view.cim.Form", {
    override:"TK.view.cim.Form",

    labelWagonOtpr  :'№ отправки',
    labelContPrivate:'Собственный("P")'
});

Ext.define("TK.locale.ru.view.slovnakl.Form", {
    override:"TK.view.slovnakl.Form",

    labelWagonOtpr  :'№ отправки'
});

Ext.define("TK.locale.ru.view.cimsmgs.Form", {
    override:"TK.view.cimsmgs.Form",
    labelDopList: 'Доп. лист'
});

Ext.define("TK.locale.ru.view.cmr.Form", {
    override:"TK.view.cmr.Form"
});

Ext.define("TK.locale.ru.view.epd.Form", {
    override:"TK.view.epd.Form",

    labelSenderName    :'Наименование грузоотправителя',
    labelSenderAdress  :'Адрес грузоотправителя',
    labelReceiverName  :'Наименование грузополучателя',
    labelReceiverAdress:'Адрес грузополучателя',
    labelStnSenderName :'Наименование станции отправления',
    labelStnSenderCode :'Код cтанция отправления',
    labelStnReceiverName :'Наименование станции назначения',
    labelStnReceiverCode :'Код cтанция назначения'
});

Ext.define("TK.locale.ru.view.file.Form", {
    override:"TK.view.file.Form",

    labelGeneralInfo :'Общая информация',
    labelDownloadFile:'Загрузить файл'
});

Ext.define("TK.locale.ru.view.gu27v.Form", {
    override:"TK.view.gu27v.Form"
});

Ext.define("TK.locale.ru.view.gu29k.Form", {
    override:"TK.view.gu29k.Form"
});

Ext.define("TK.locale.ru.view.invoice.Form", {
    override:"TK.view.invoice.Form",

    labelType           :'Тип',
    labelOtprNum        :'№ отправки',
    labelContractNum    :'№ договора',
    labelContractDate   :'Дата договора',
    labelSellerName     :'Наименование продавца',
    labelSenderName     :'Наименование отправителя',
    labelSellerAdress   :'Адрес продавца',
    labelSenderAdress   :'Адрес отправителя',
    labelSenderCountry  :'Страна отправителя, код',
    labelSenderZip      :'Почтовый код отправителя',
    labelSenderCity     :'Город отправителя',
    labelBuyerName      :'Наименование покупателя',
    labelReceiverName   :'Наименование получателя',
    labelReceiverCountry:'Страна получателя, код',
    labelReceiverZip    :'Почтовый код получателя',
    labelReceiverCity   :'Город получателя',
    labelBuyerAdress    :'Адрес покупателя',
    labelReceiverAdress :'Адрес получателя',
    labelDeliveryCode   :'Код условий поставки',
    labelDeliveryPlace  :'Пункт поставки',
    labelCurrency       :'Валюта инвойса',
    labelNote           :'Примечание'
});

Ext.define("TK.locale.ru.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd:'Добавить'
});

Ext.define("TK.locale.ru.view.nsi.ListDir", {
    override:"TK.view.nsi.ListDir",

    title       :'Список справочников',
    btnView     :'Просмотр',
    btnUploadDir:'Загрузить справочник',
    btnExportDir:'Экспорт в Excel',
    headerName  :'Наименование',
    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.ru.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum     :'№ вагона (гр.27)',
    labelWagonsTonnage:'Тоннаж (гр.28)',
    labelWagonsTara   :'Тара (гр.30)',
    labelWagonsAxes   :'Оси (гр.29)',
    labelContNum      :'Номер (гр.9;19)',
    labelSize         :'Размер (гр.9)',
    labelVid          :'Вид (гр.18)'
});

Ext.define("TK.locale.ru.view.stat.Form", {
    override:"TK.view.stat.Form",

    lableDate          :'Дата создания',
    lableDate1         :'с',
    lableDate2         :'по',
    lableZakazNum      :'Номер заказа',
    lableStatus        :'Статус',
    lableUser          :'Пользователь',
    lableCountrySender :'Страна отправления груза',
    lableCountryRceiver:'Страна назначения',
    lableStnPogr       :'Пограничная станция перехода',
    lableStnSender     :'Станция отправления',
    lableStnReciver    :'Станция назначения',
    lableSender        :'Грузоотправитель',
    lableReceiver      :'Грузополучатель',
    lableCargoName     :'Наименование груза',
    lableContSize      :'Тип размер контейнера',
    lablePayer         :'Плательщик за тариф и услуги',

    btnFind :'Найти',
    btnClose:'Закрыть'
});

Ext.define("TK.locale.ru.controller.exchange.Senders", {
    override:"TK.controller.exchange.Senders",

    maskMsg  :'Запрос данных...',
    showTitle:'Внимание',
    showMsg1 :'Отправлено!',
    showMsg2 :'Ошибка!',
    showMsg3 :'Сохранено!',
    errorMsg :'Внимание! Ошибка...',
    waitMsg  :'Загрузка файла...',
    waitMsg1 :'Идет сохранение данных...',

    btnSave  :'Сохранить',
    btnExport:'Экспорт в ФТС',
    btnClose :'Закрыть',

    titleFTS    :'Обмен с ФТС',

    labelWagenNum   :'Номер поезда:',
    labelWagenNums   :'Номер поезда(-ов[,]):',
    labelWagenInd   :'Индекс поезда:',
    labelPPVInd     :'Номер ППВ:',
    labelInputDate  :'Дата прибытия:'
});

Ext.define("TK.locale.ru.controller.exchange.Agreements", {
    override:"TK.controller.exchange.Agreements",

    maskMsg  :'Запрос данных...',
    errorMsg :'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.Docs", {
    override:"TK.controller.Docs",

    titleList   :'Журнал ',
    titleEdit   :'Ред.',
    titleCopy   :'Копия ',
    titletPrint :'Печать',
    titletStat  :'Статистика',
    titleReports:'Отчеты',
    titleHistory:'История документа',
    titleUpload :'Загрузка инструкции в формате XML',
    titleFTS    :'Обмен с ФТС',
    titleContList:'Введите номер поезда(-ов[,])',

    lableSettings  :'Настройка',
    lableFace      :'Лицевая сторона',
    lableBack      :'Оборот',
    lableTraneNum  :'Поезд(номер)',
    labelSelectFile:'Выбор файла для загрузки...',
    labelFile      :'Файл',
    labelUn        :'Логин',
    labelUnName    :'ФИО',
    labelUnEmail   :'Email',
    labelUnGroup   :'Группа',
    labelGU         :'ГУ',
    labelGU29       :'ГУ29к',
    labelGU27       :'ГУ27в',
    labelWagenNum   :'Номер поезда:',
    labelWagenNums   :'Номер поезда(-ов[,]):',
    labelWagenInd   :'Индекс поезда:',
    labelPPVInd     :'Номер ППВ:',
    labelInputDate  :'Дата прибытия:',

    btnPrint :'Печать',
    btnFind  :'Найти',
    btnSearch:'Обзор...',
    btnSave  :'Сохранить',
    btnClose :'Закрыть',
    btnExport:'Экспорт в ФТС',
    btnContList  :'Ведомость',
    btnSmgs  :'Накладная',

    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg  :'Запрос данных...',
    showTitle:'Внимание',
    showMsg1 :'Отправлено!',
    showMsg2 :'Ошибка!',
    showMsg3 :'Сохранено!',
    errorMsg :'Внимание! Ошибка...',
    waitMsg  :'Загрузка файла...',
    waitMsg1 :'Идет сохранение данных...',

    headerData:'Дата создания',
    headerMsg :'Сообщение',
    headerWho :'Кто?'
});

Ext.define("TK.locale.ru.controller.Ajax", {
    override:"TK.controller.Ajax",

    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.docs.Aviso", {
    override:"TK.controller.docs.Aviso",

    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.docs.Avisogu29k", {
    override:"TK.controller.docs.Avisogu29k",

    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.docs.Cim", {
    override:"TK.controller.docs.Cim",

    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.docs.Cimsmgs", {
    override:"TK.controller.docs.Cimsmgs",

    titleOtpr         :'Справочник отправителей/получателей',
    headerOtprName    :'Наименование',
    headerOtprName1   :'Наименование, рус',
    headerOtprEmail   :'E-mail',
    headerOtprPhone   :'Телефон',
    headerOtprStrCode :'Код страны',
    headerOtprStr     :'Страна',
    headerOtprStr1    :'Страна, рус',
    headerOtprZip     :'Индекс',
    headerOtprCity    :'Город',
    headerOtprCity1   :'Город, рус',
    headerOtprAdress  :'Адрес',
    headerOtprAdress1 :'Адрес, рус',
    headerOtprVat     :'VAT',
    headerOtprSendCode:'Код отправителя / получателя',
    headerOtprClCode  :'Код клиента'
});

Ext.define("TK.locale.ru.controller.docs.Cmr", {
    override:"TK.controller.docs.Cmr"
});

Ext.define("TK.locale.ru.controller.docs.Epd", {
    override:"TK.controller.docs.Epd"
});

Ext.define("TK.locale.ru.controller.docs.File", {
    override:"TK.controller.docs.File",

    waitMsg1:'Идет сохранение данных...',
    delTitle:'Удаление...',
    delMsg  :'Вы действительно хотите удалить..?',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.docs.Gu27v", {
    override:"TK.controller.docs.Gu27v",

    titleEpd:'ЕПД не загружен',
    msgEpd  :'Для загрузки следует стать на закладку с ЕПД'
});

Ext.define("TK.locale.ru.controller.docs.Gu29k", {
    override:"TK.controller.docs.Gu29k",

    titleEpd:'ЕПД не загружен',
    msgEpd  :'Для загрузки следует стать на закладку с ЕПД'
});

Ext.define("TK.locale.ru.controller.docs.Invoice", {
    override:"TK.controller.docs.Invoice",

    titleEpd:'ЕПД не загружен',
    msgEpd  :'Для загрузки следует стать на закладку с ЕПД'
});

Ext.define("TK.locale.ru.controller.Logs", {
    override:"TK.controller.Logs",

    titleFilter:'Фильтр',
    lableDate  :'Дата создания',
    lableDate1 :'с',
    lableDate2 :'по',
    labelUser  :'Пользователь',

    btnFind:'Найти'
});

Ext.define("TK.locale.ru.controller.Menu", {
    override:"TK.controller.Menu",

    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.Project", {
    override:"TK.controller.Project",

    maskMsg  :'Запрос данных...',
    errorMsg :'Внимание! Ошибка...',
    showTitle:'Внимание! Удаление запрещено...',
    showMsg  :'Перед удалением Проекта, следует удалить все ЭПД из его маршрутов'
});

Ext.define("TK.locale.ru.controller.docs.Smgs", {
    override:"TK.controller.docs.Smgs",

    titleEpd:'ЕПД не загружен',
    titleDownldInv:'Загрузка Инвойсов',
    msgEpd  :'Для загрузки следует стать на закладку с ЕПД',
    errorMsg:'Внимание! Ошибка...',
    btnFind  :'Найти',
    btnSave  :'Сохранить',
    btnClose :'Закрыть'
});

Ext.define("TK.locale.ru.controller.Doc2Doc", {
    override:"TK.controller.Doc2Doc",

    titleDownldInv:'Загрузка Инвойсов',
    errorMsg:'Внимание! Ошибка...',
    btnFind  :'Найти',
    btnSave  :'Сохранить',
    btnContList  :'Ведомость',
    btnSmgs  :'Накладная',
    titleContList:'Введите номер поезда(-ов[,])',
    labelWagenNums   :'Номер поезда(-ов[,]):',
    btnClose :'Закрыть'
});

Ext.define("TK.locale.ru.controller.User", {
    override:"TK.controller.User",

    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    waitMsg1:'Идет сохранение данных...'
});

Ext.define("TK.locale.ru.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Загрузка справочника',
    labelSelectFile:'Выбор файла для загрузки...',
    labelFile      :'Файл',
    btnSave        :'Сохранить',
    btnClose       :'Закрыть',
    btnSearch      :'Обзор...'
});

Ext.define("TK.locale.ru.view.nsi.List", {
    override:"TK.view.nsi.List",

    title1           :"Группы",
    titleRoad        :'Справочник дорог',
    titleRoute        :'Справочник маршрутов',
    titleProject        :'Справочник проектов',
    titleManagement  :'Справочник администраций железных дорог',
    titleSta         :'Справочник станций ж.д.',
    titleCountries   :'Справочник стран',
    titleCountriesZhd:'Справочник стран ж.д.',
    titleDangerous   :'Справочник опасных грузов',
    titleKarantin    :'Справочник карантинных грузов',
    titleVeterin     :'Справочник ветеринарных грузов',
    titleGng         :'Справочник кодов ГНГ',
    titleEtsng       :'Справочник кодов ЕТ СНГ',
    titleDocs        :'Справочник видов документов',
    titlePlat        :'Справочник плательщиков по железным дорогам (экспедиторы)',
    titleOtpr        :'Справочник юридических лиц (отправителей/получателей)',
    titleDocs1       :'Справочник документов',
    titleCurrency    :'Справочник валют',
    titleTnved       :'Справочник ТНВЭД',
    titleDeliv       :'Справочник условий поставки',
    titleUpak        :'Справочник видов упаковки',

    headerName       :'Наименование',
    headerProject       :'Проект',
    headerRoute       :'Маршрут',
    headerDescr      :'Описание',
    headerCode       :'Код',
    headerCountry    :'Страна',
    headerStn        :'Станция(рус)',
    headerStn1       :'Станция(кит)',
    headerStn2       :'Станция(англ)',
    headerZhD        :'Жел. дор',
    headerCodeAdm    :'Код адм.',
    headerWay        :'Дорога',
    headerWayCode    :'Код дороги',
    headerCoedEdi    :'код UN/EDIFACT',
    headerCustCode   :'таможенный код',
    headerName1      :'Наименование(рус)',
    headerName2      :'Наименование(кит)',
    headerName3      :'Наименование(др)',
    headerPayerMeth  :'Способ оплаты',
    headerPayerCode  :'Код плат',
    headerPayerCode1 :'Подкод кода',
    headerPayerCode2 :'Подкод подкода',
    headerCountryCode:'Страна код',
    headerCountryName:'Страна наим',
    headerCity       :'Город',
    headerAddress    :'Адрес',

    ttipSave:'Сохранить',
    ttipDel :'Удалить',
    btnClose:'Закрыть'
});

