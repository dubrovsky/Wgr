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
    dateFormat: "d.m.Y",
    trueText: "true",
    falseText: "false"
});

Ext.define("Ext.locale.ru.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("Ext.locale.ru.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("Ext.locale.ru.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'm/d/Y'
});

Ext.define("Ext.locale.ru.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "Время в данном поле должно быть больше или равно {0}",
    maxText: "Время в данном поле должно быть меньше или равно {0}",
    invalidText: "{0} неверное время",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.ru.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "Вы должны выбрать  хотябы один элемент в группе"
});

Ext.define("Ext.locale.ru.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "You must select one item in this group"
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
    override        : "Ext.Component",
    titleDelMsgBox  :'Удалить запись?',
    textDelMsgBox   :'Запись будет удалена',
    titleEditWindow  :'Редактивароние записи',
    titleAddWindow  :'Добавление записи'
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
    treeGroups  :'Группы',
    treeProjects:'Проекты',
    treeLogs    :'Логи',
    btnStat     :"Статистика",
    btnPrnTmpl  :"Шаблоны печати",
    treeDirs    :'Справочники',
    treeInstr   :'Инструкция',
    treeChangePw:'Смена пароля',
    treeExit    :'Выход',
    epd         :'ЭПД',
    smgs	    :'СМГС',
    invoicelist :'Инвойсы',
    aviso	    :'Инструкция СМГС для ЦКП',
    cimsmgs	    :'ЦИМ/СМГС',
    aviso1	    :'Инструкция СМГС для агентов',
    slovnakl    :'Словацкая накладная',
    smgs2	    :'СМГС2',
    aviso2	    :'Инструкция СМГС2',
    gu29k	    :'ГУ-29К',
    doplist 	:'Дополнительный лист',
    filesmgs    :'Графика СМГС',
    filegu29k   :'Графика ГУ',
    fileaviso   :'Графика Инструкция СМГС',
    fileinvoice :'Графика Инвойс',
    filecimsmgs :'Графика ЦИМ/СМГС',
    avisogu29k  :'Инструкция ГУ для ЦКП',
    cim         :'CIM',
    avisocim    :'Инструкция CIM',
    files       :'Прочие документы',
    cmr         :'CMR',
    fileavisogu29k:'Графика Инструкция ГУ',
    gu27v       :'ГУ-27в',
    avisogu29k1 :'Инструкция ГУ для агентов',
    avisocimsmgs:'Инструкция ЦИМ/СМГС',
    btnKontYards :"Контейнерная площадка",
    ved         :'Вагонная/передаточная ведомость',

    btnKontYard    :'Хранение/размещение контейнеров',
    btnKont         :'Список контейнеров',
    btnKontPoezdIn    :'Прибытие поезда',
    btnKontPoezdOut    :'Отправление поезда',
    btnKontReports    :'Отчетность',
    kyreport1: '1.Список по поезду. Прибытие/Отправление',
    kyreport2: '2.Расположение контейнеров на площадке',
    kyreport3: '3.Таблица накопления о вагонах',
    kyreport4: '4.Состояние вагонов на конец дня',
    kyreport5: '5.Контейнеры на путях по прибытию',
    kyreport6: '6.Priamy preklad'
});

Ext.define("TK.locale.ru.stat.List", {
    override    :"TK.view.stat.List",
    title       :'Статистика'
});

Ext.define("TK.locale.ru.view.DocsList", {
    override:"TK.view.DocsList",

    btnStat     :"Статистика",
    btnRestore  :"Восстановить",
    btnDestroy  :"Уничтожить",
    btnPrint    :"Печать PDF",
    btnPrintView:"Просмотр PDF",
    btnCreate   :'Создать',
    btnCopy     :'Копия',
    btnCopyAviso:'Копировать в шаблон',
    btnCopySelect:'Копия, выбрать...',
    btnEdit      :'Редактировать',
    btnDelete   :'Удалить',
    btnMakeSmgs :'Сформировать СМГС',
    btnMakeCimSmgs:'Сформировать ЦИМ/СМГС',
    btnAppend2Smgs:'Добавить в СМГС',
    btnAppend2CimSmgs:'Добавить в ЦИМ/СМГС',
    btnMakeGU   :'Сформировать ГУ',
    btnDownload :'Загрузить',
    btnHistory  :'История',
    btnBindPrint:'Привязать печать',
    btnSelectPrint :'Выбрать шаблон',
    btnExch     :'Обмен',
    btnExchTBC  :'ТБЦ',
    btnExchBCh1 :'Открыть/закрыть на ред.',
    btnExchBCh  :'БЧ',
    btnExchFTS  :'ФТС',
    btnExchBTLC :'БТЛЦ',
    btnExchTdgFTS:'ТДГ',
    btnReports  :'Отчеты',
    btnView     :'Просмотреть',

    btnCont     :'Контейнерная',
    btnVag      :'Повагонная',
    btnContsList: 'Ведомость конт/ваг',
    btnSmgs: 'СМГС',

    btnDopList  :'Доп. лист',
    btnUploadCSDocs9:'Док. отпр.',
    btnUploadPogruzList:'Лист погрузки',
    btnUploadPogruzListPoezd:'Лист погруз. для поезда',
    btnContsList1:'Ведомость',

    btnPlusDocs :'+ Документы',
    btnPlusSmgsInv :'+ СМГС и Инвойсы',
    btnPlusInv :'+ Инвойсы',

    lableDeleted: 'Удаленные?',

    headerID            :'ID',
    headerProject       :'Проект',
    headerRoute         :'Маршрут',
    headerDoc           :'Документ',
    headerCreation      :'Создание',
    headerDateTime      :'Дата и время',
    headerUser          :'Пользователь',
    headerSenderName    :'Наименование<br/>отправителя',
    headerReceiverName  :'Наименование<br/>получателя',
    headerContNum       :'Номер<br/>конт.',
    headerDescr         :'Описание',
    headerVagNum        :'Номер<br/>вагона',
    headerInv           :'Инвойсы',
    headerNPoezd        :'№<br/>поезда',
    headerFileName      :'Имя файла',
    headerContentType   :'Тип<br/>сожержимого',
    headerSizeByte      :'Размер, байт',

    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными',

    txtForApproval  :'Для согласования',
    txtApproved     :'Согласована',
    txtWork         :'Рабочая',
    txtNotApproved  :'Не согласована',
    txtBlocked      :'Заблокирована',
    headerStatus  :'Статус',
    headerName  :'Имя<br/>инструкции',
    headerInstrNum:'№ инструкции',
    headerGNG:'ГНГ',
    headerComments:'Замечания',

    statusBlocked  :'Заблокирована',
    status4Approval:'Для согласования',
    statusAgreed   :'Согласована',
    statusNotAgreed:'НЕ Согласована'
});

Ext.define("TK.locale.ru.view.avisocim.AvisoCimList", {
    override      :"TK.view.avisocim.AvisoCimList",
    title         :'Журнал Инструкций CIM'
});

Ext.define("TK.locale.ru.view.aviso2.AvisoSmgs2List", {
    override      :"TK.view.aviso2.AvisoSmgs2List",
    title         :'Журнал Инструкций СМГС2'
});

Ext.define("TK.locale.ru.view.aviso.List", {
    override:"TK.view.aviso.List",

    title:'Журнал Инструкций СМГС'
});

Ext.define("TK.locale.ru.view.avisocimsmgs.AvisoCimSmgsList", {
    override:"TK.view.avisocimsmgs.AvisoCimSmgsList",

    title:'Журнал Инструкций ЦИМ/СМГС'
});

Ext.define("TK.locale.ru.view.avisogu29k.List", {
    override:"TK.view.avisogu29k.List",

    title:'Журнал Инструкций ГУ'
});

Ext.define("TK.locale.ru.view.cim.CimList", {
    override :"TK.view.cim.CimList",

    headerCim:'Цим',
    title    :'Журнал ЦИМ',
    menuTrSearch  :'Поиск поезда'
});

Ext.define("TK.locale.ru.view.cimsmgs.CimSmgsList", {
    override        :"TK.view.cimsmgs.CimSmgsList",

    headerCimsmgs   :'Номер отправки',
    headerDateTransp:'Дата отправки',
    headerExchBch   :'Iftmin',
    title           :'Журнал ЦИМ/СМГС',
    headerVagVed    :'Вагонная ведомость',
    titleVagVed     :'ведомость',
    menuTrSearch    :'Поиск поезда'
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

    title   :'Журнал Инвойсов',
    headerNum: '№ инвойса',
    headerNumOtpr: '№ отправки',
    headerNumCont: '№ контейнера',
    headerDateOtpr: 'Дата отправки'
});

Ext.define("TK.locale.ru.view.smgs.List", {
    override      :"TK.view.smgs.List",
    title         :'Журнал СМГС',
    headerSmgs    :'СМГС',
    headerExchTBC :'ТБЦ',
    headerExchBch :'Iftmin',
    headerAvisoNum:'№ Авизо'
});

Ext.define("TK.locale.ru.view.smgs2.Smgs2List", {
    override      :"TK.view.smgs2.Smgs2List",
    title         :'Журнал СМГС',
    headerSmgs    :'СМГС',
    headerExchTBC :'ТБЦ',
    headerExchBch :'Iftmin',
    headerAvisoNum:'№ Авизо',
    headerVagVed  :'Вагонная ведомость',
    titleVagVed   :'ведомость',
    menuTrSearch  :'Поиск поезда'
});

Ext.define("TK.locale.ru.view.file.List", {
    override:"TK.view.file.List",
    title   :'Журнал Графики',
    headerNumOtpr: '№ отправки',
    headerNumCont: '№ контейнера',
    headerDateOtpr: 'Дата отправки'
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
    headerDefault:'По умолчанию?',
    headerBlank: 'С бланком?',
    
    btnBindToRoute: 'Привязать к маршруту',
    btnBindToBlank: 'Привязать к бланку',
    btnBlanks: 'Бланки'
});

Ext.define("TK.locale.ru.view.printtmpl.Form", {
    override    :"TK.view.printtmpl.Form",
    title       :'Шаблон печати',
    btnSave       :'Сохранить',
    btnSaveExit   :'Сохр-ть и Выйти',
    btnClose      :'Закрыть',

    fieldLabelName: 'Наименование',
    fieldLabelDef: 'По умолчанию',
    fieldLabelPageSize: 'Размер бумаги, мм',
    fieldLabelWidth: 'Ширина',
    fieldLabelHeight: 'Высота',
    fieldLabelFont: 'Шрифт, по умолчанию для всего документа',
    fieldLabelFontName: 'Наименование',
    fieldLabelFontSize: 'Размер',
    fieldLabelFontSpace: 'Межстрочный интервал',
    fieldLabelSyncXY: 'Синхронизировать изменения по X или Y',
    fieldLabelMoveHor: 'Сдвинуть все по горизонтали, мм',
    fieldLabelMoveVert: 'Сдвинуть все по вертикали, мм',
    titleData: 'Данные'
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
    btnCopy       :'Копировать',
    btnRefresh    :'Обновить',

    textYes: 'да',
    textNo: 'нет'
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
    headerRoutesCodeCustoms:'Код таможни',
    headerRoutesEmailMask: 'Email, маска',
    headerRoutesForDeleted: 'Для удаленных?',
    headerContNum      :'Номер',
    headerContSize     :'Размер',
    headerContVid      :'Вид',
    headerContNum1     :'Номер',
    headerContSize1    :'Размер',
    headerContVid1     :'Вид',
    headerCodeTNVED    :'код ТНВЭД',
    headerPack: 'Упаковка',
    headerPackVid: 'Вид',
    headerPackKod: 'Код',
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
    headerTotal        :'Итого:',

    titleColumn: 'Колонка',
    titleDesc: 'Описание',
    titleCoordLeft: 'Координаты левого<br/>нижнего угла, мм',
    titleCoordRight: 'Координаты правого<br/>верхнего угла, мм',
    titleColumnFont: 'Шрифт для конкретной колонки',
    titleColumnFontName: 'Наименование',
    titleColumnFontSize: 'Размер',
    titleColumnFontBold: 'Жирным?',
    titleColumnFontUpper: 'Заглавными?',
    titleColumnFontSpace: 'Межстрочный интервал',
    titleRotate: 'Поворот',
    titleBorder: 'Граница?',
    titleStroke: 'Подчеркнуть?',
    titlePage: 'Страница',
    titlePrint: 'Печатать?',
    titleTable: 'Таблица?',
    titlePhrases: 'Фразы?'
});

Ext.define("TK.locale.ru.view.edit.DetailPanel", {
    override:"TK.view.edit.DetailPanel",
    errorTitle    :'Ошибка',
    errorMsgValid :'Проверьте правильность заполнения полей',
    btnSave :'Сохранить',
    btnClose:'Закрыть',
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
    labelOptInfo    :'Доп. инфо',
    labelSenderCod  :'Код Отправителя',
    labelReceiverCod:'Код Получателя',
    labelReceiver   :'Получатель'


});
Ext.define("TK.locale.ru.view.edit.Cimsmgs_g1_detailpanel", {
    override:"TK.view.edit.Cimsmgs_g1_detailpanel"


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
    labelWagonsTonnage: 'Грузоподъемность, тн',
    labelWagonsTara: 'Тара, тн',
    labelWagonsAxes: 'Кол-во осей',
    labelConts   :'Контейнера',
    labelSize: 'Футовость',
    labelSizeMm  :'Размер(мм)',
    labelTaraCont: 'Тара, кг',
    labelNotes  :'Текст перед № контейнера',
    labelCategory:'Категория',
    labelContNum :'№ Контейнера',
    labelDescr   :'Описание',
    labelVid     :'Вид',
    labelCargo    :'Груз',
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

    labelWagonsGiven:'Вагон предоставлен',
    labelWagonsOwner:'Владелец вагона',
    labelWagonsKind:'Род вагона',

    labelContSize:'Типоразмер',
    labelMaxLoad: 'Макс.<br>грузопод., тн',

    labelNameRu: 'Название(рус)',
    labelName: 'Название',
    labelCode: 'Код',
    labelOON: 'ООН',
    labelClass: 'Класс',
    labelZnak: 'Знаки',
    labelGrUpak: 'Группа упаковки',
    labelAvKart: '№ авар. карт.',
    labelStamp: 'Штамп',
    labelDopInf: 'Доп. инфо'
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

Ext.define("TK.locale.ru.view.edit.OtpavitelEdit", {
    override: "TK.view.edit.OtpavitelEdit",
    labelOtprName:'Наименование',
    labelOtprNameRu:'Наименование,рус',
    labelCountry:'Страна',
    labelCountryRu:'Страна,рус',
    labelCountryCode:'Код страны',
    labelEmail:'Е-мейл',
    labelPhone:'Телефон',
    labelFax:'Факс',
    labelCity:'Город',
    labelCityRu:'Город,рус',
    labelAdress:'Адрес',
    labelAdressRu:'Адрес,рус',
    labelZip:'Индекс',
    labelVat:'VAT',
    labelSenRecCode:'Код отправителя/получателя',
    labelCliCode:'Код клиента',
    labelNNcode:'Код ИНН',
    labelDopInfo:"Доп. инфо",
    labelOKPO: 'Код ОКПО:',

    closeBtn:'Закрыть',
    saveBtn:'Сохранить'
});

Ext.define("TK.locale.ru.view.DocsForm", {
    override      :"TK.view.DocsForm",

    btnSave       :'Сохранить',
    btnSaveExit   :'Сохр-ть и Выйти',
    btnSavePrint  :'Сохр-ть и Печать PDF',
    btnClose      :'Закрыть',
    btnSign       :'Подписать ЭЦП',
    btnChange     :'Изменить',
    btnChangePlomb     :'Изменить пломбы',
    btnChangeWagen:'Изменить вагон',
    btnChangeCont :'Изменить контейнер',
    btnChangeGr   :'Изменить груз',
    btnCopyEpd    :'Копировать с ЭПД',
    btnDopList :'Доп. лист',
    btnContsList :'Ведомость конт/ваг',
    btnCopy20     :'Копия в гр.20',
    btnTbcReady   :'ТБЦ готов',
    btnTbcNotReady:'ТБЦ отмена',
    btnBchReady   :'Iftmin готов',
    btnBchNotReady:'Iftmin отмена',
    btnFtsReady   :'ФТС готов',
    btnFtsNotReady:'ФТС отмена',

    labelNotes: 'Текст перед № контейнера',

    labelPayers     :'Плательщики',
    labelNumDate: 'Номер и дата договора',
    labelBukvKod    :'Букв. код ж/д администрации',
    labelBukvKodRu  :'Букв. код ж/д администрации(рус)',
    labelPayerName  :'Наименование плательщика',
    labelPayerNameRu:'Наименование плательщика(рус)',
    labelThrough    :'Способ оплаты (Через что)',
    labelPrim    :'Примечание',
    labelPayerKod1  :'Код плательщика',
    labelPayerKod2  :'Подкод кода плательщика',
    labelPayerKod3  :'Подкод подкода плательщика',
    labelPayerKod4  :'Резерв. для доп. кода',
    labelPayment    :'Способ оплаты',
    labelPaymentRu  :'Способ оплаты(рус)',

    labelConts   :'Контейнера',
    labelSize: 'Футовость',
    labelSizeMm  :'Размер(мм)',
    labelNotesVag  :'Текст перед № вагона',
    labelCategory:'Категория',
    labelContNum :'№ Контейнера',
    labelDescr   :'Описание',
    labelVid     :'Вид',

    labelCargo    :'Груз',
    labelCode     :'Код ',
    labelNetto    :'Нетто ',
    labelTara: 'Тара, тн',
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
    labelText3       :'Дорога ',
    labelText4       :'Код администрации',
    labelBorderStn   :'Пограничные станции перехода',
    labelCodeDoc     :'Код документа',
    labelText        :'Текст',
    labelTextEu      :'Текст Eu',
    labelTextRu      :'Текст(рус)',
    labelSenderDocs  :'Документы, приложенные отправителем',
    labelCustomsCode :'Таможенный код',
    labelDocNum      :'№ док-та',
    labelCommercTerms:'Коммерческие условия',
    labelPogrStn: 'Выходные пограничные станции',

    labelWagons       :'Вагоны',
    labelWagonNum     :'№ вагона',
    labelWagonsTonnage: 'Грузоподъемность, тн',
    labelWagonsTara: 'Тара, тн',
    labelWagonsAxes: 'Кол-во осей',

    labelZayavSenderPayers:'Заявления отправителя/Плательщики',
    labelZayavSender      :'Заявления отправителя',
    labelSenderNotes      :'Особые заявления отправителя',
    labelFile             :'Файл',
    labelFileSearch       :'Обзор...',
    labelWagenNum         :'Номер поезда:',
    labelTeplatename        :'Имя инструкции:',
    labelDocSort         :'Порядковый номер:',
    labelDocSummary         :'Сводная:',
    
    labelTGNL: 'Код ТГНЛ:',
    labelOKPO: 'Код ОКПО:',
    labelINN: 'Код ИНН:',

    labelVagKontGruz: 'Вагон/Контейнер/Груз',
    btnPrintView   :"Просмотр PDF",

    labelDate: 'Дата',
    labelCodyDo   :'Коды действуют до:',
    labelVsegoSmgs:'ВСЕГО SMGS:',
    labelCarrier  :'Перевозчик',
    labelFrom     :'Станция от',
    labelTo       :'Станция до',
    labelStationFrom   :'Станция от(код)',
    labelStationTo     :'Станция до(код)',
    titleCarriers      :'Перевозчики',
    btnVed          :'Ведомость',
    btnVag          :'Вагонаая',
    btnCont         :'Контейнерная'
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

Ext.define("TK.locale.ru.view.aviso2.AvisoSmgs2Form", {
    override:"TK.view.aviso2.AvisoSmgs2Form",

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

Ext.define("TK.locale.ru.view.avisocimsmgs.AvisoCimSmgsForm", {
    override:"TK.view.avisocimsmgs.AvisoCimSmgsForm",

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

Ext.define("TK.locale.ru.view.cim.CimForm", {
    override:"TK.view.cim.CimForm",

    labelWagonOtpr  :'№ отправки',
    labelContPrivate:'Собственный("P")'
});

Ext.define("TK.locale.ru.view.slovnakl.Form", {
    override:"TK.view.slovnakl.Form",

    labelWagonOtpr  :'№ отправки'
});

Ext.define("TK.locale.ru.view.cimsmgs.CimSmgsForm", {
    override:"TK.view.cimsmgs.CimSmgsForm",
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
    labelNote           :'Примечание',

    lableCombo1: 'Инвойс',
    lableCombo2: 'Счет-фактура',
    lableCombo3: 'Приложение к инвойсу',
    lableCombo4: 'Грузовая ведомость',
    lableCombo5: 'Манифест'
});

Ext.define("TK.locale.ru.view.nsi.EditList", {
    override:"TK.view.nsi.EditList",

    btnAdd:     'Добавить',
    btnDelete:  'Удалить',
    btnEdit    :'Редактировать'
});

Ext.define("TK.locale.ru.view.nsi.ListDir", {
    override:"TK.view.nsi.ListDir",

    title       :'Список справочников',
    btnView     :'Просмотр',
    btnUploadDir:'Загрузить справочник',
    btnExportDir:'Экспорт в Excel',
    headerName  :'Наименование',
    warnTitle   :'Предупреждение',
    warnMsg     :'Следует выбрать строку из таблицы с данными',

    nsiSta:	    'Справочник станций ж.д.',
    nsiCountries:'Справочник стран',
    nsiGng      :'Справочник кодов ГНГ',
    nsiEtsng    :'Справочник кодов ЕТ СНГ',
    nsiCurrency :'Справочник валют',
    nsiTnved    :'Справочник кодов ТНВЭД',
    nsiDeliv    :'Справочник условий поставки',
    nsiUpak     :'Справочник видов упаковки',
    nsiOtpr     :'Справочник юридических лиц (отправителей/получателей)',
    nsiPlat     :'Справочник плательщиков по железным дорогам (экспедиторы)',
    nsiManagement:'Справочник администраций железных дорог',
    nsiCountriesGd:'Справочник стран ж.д.',
    nsiDocG23   :'Справочник видов документов',
    nsiVeterin	:'Справочник ветеринарных грузов',
    nsiKarantin	:'Справочник карантинных грузов',
    nsiDangCode	:'Справочник опасных грузов',
    gruzyLink	:'Список грузов, подлежащих финансовой гарантии при транзите'
});

Ext.define("TK.locale.ru.view.smgs.Form", {
    override:"TK.view.smgs.Form",

    labelWagonNum     :'№ вагона (гр.27)',
    labelWagonsTonnage: 'Грузоподъемность (гр.28), тн',
    labelWagonsTara: 'Тара (гр.30), тн',
    labelWagonsAxes: 'Кол-во осей (гр.29)',
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
    lableKontNum         :'Номер контейнера',
    lableDeleted:'Удаленные?',

    btnFind :'Найти',
    btnClose:'Закрыть',
    btnReset:'Сброс',
    lableCombo1: 'Инстр. для согл. агентом',
    lableCombo2: 'Инстр. согл-на агентом',
    lableCombo3: 'Инстр. НЕсогл-на агентом',
    lableCombo4: 'Инстр. заблокирована',
    lableCombo5: 'Распечатана'
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

    titleCopy2Aviso:'Копия в шаблон',
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

    titlePrint: "Настройка печати",
    labelBlank: "С бланком?",
    textPrint: "Печать",

    headerData:'Дата создания',
    headerMsg :'Сообщение',
    headerWho :'Кто?',

    titleDocsCopy: 'Список докуметов для копирования',
    headerName: 'Наименование',
    btnCopy: 'Копировать',
    all:            'Документ целиком',
    smgs2_1        :'1|Отправитель|1',
    smgs2_2        :'2|Станция отправления|2',
    smgs2_3        :'3|Заявления отправителя|3',
    smgs2_4        :'4|Получатель|4',
    smgs2_5        :'5|Станция назначения|5',
    smgs2_6        :'6|Погранпереходы|6',
    smgs2_7        :'7|Вагон|7-12',
    smgs2_8        :'8|Груз|15-18',
    smgs2_9        :'9|Груз, дополнительная информация|15доп.',
    smgs2_10        :'10|Контейнер|15',
    smgs2_11        :'11|Пломбы|19',
    smgs2_12        :'12|Перевозчики|22',
    smgs2_13        :'13|Провозные платежи|23',
    smgs2_14        :'14|Приложенные документы|24',
    smgs2_15        :'15|Информация не предназначенная для перевозчика|25',
    smgs2_16        :'16|Отметки таможни|28'
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
    headerOtprFax     :'Факс',
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
    headerOtprClCode  :'Код клиента',
    headerINN         :'Код ИНН:',
    headerCountryCode :'Код страны',
    headerDopInfo     :'Доп. Инфо',
    tooltipEdit       :'Редактировать',
    tooltipDel        :'Удалить'
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
    successMsgTitle:'Операция завершена успешно',
    btnClose: 'Закрыть',
    btnSave: 'Сохранить',
    btnFind  :'Найти',

    btnContList  :'Ведомость',
    btnSmgs  :'Накладная',
    titleContList:'Введите номер поезда(-ов[,])',
    labelWagenNums   :'Номер поезда(-ов[,]):',
    titleFilterPer  :'Фильтр поездов',
    warnTitle       :'Предупреждение',
    saveMgs         :'Сохраните документ'
});

Ext.define("TK.locale.ru.controller.User", {
    override:"TK.controller.User",

    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    waitMsg1    :'Идет сохранение данных...',
    titleNoUser :'Внимание',
    msgNoUser   :'Не выбран пользователь'
});

Ext.define("TK.locale.ru.controller.Nsi", {
    override       :"TK.controller.Nsi",
    titleUpload    :'Загрузка справочника',
    labelSelectFile:'Выбор файла для загрузки...',
    labelFile      :'Файл',
    btnSave        :'Сохранить',
    btnClose       :'Закрыть',
    btnSearch      :'Обзор...',
    titleErrorWarning   :'Внимание',
    warningFillErrors   :'Поля подчеркнутые красным содержат слишком много символов'
});

Ext.define("TK.locale.ru.controller.docs.PlombsTreeDetailController", {
    override       :"TK.controller.docs.PlombsTreeDetailController",
    msgTitle    :'Внимание',
    msgSplit    :'Данные записи сожержат разделители: , ; <br>Разделить на отдельные записи:<br>'
});

Ext.define("TK.locale.ru.view.nsi.List", {
    override:"TK.view.nsi.List",

    title1           :"Группы",
    titleRoad        :'Справочник дорог',
    titleRoute       :'Справочник маршрутов',
    titleProject     :'Справочник проектов',
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
    titleClient      :'Справочник клиентов',

    headerName       :'Наименование',
    headerProject       :'Проект',
    headerRoute       :'Маршрут',
    headerDescr      :'Описание',
    headerCode       :'Код',
    headerCountryRu  :'Страна,ру',
    headerCountry    :'Страна',
    headerCountryS   :'Страна,сокр',
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
    headerCountryCode:'Код страны',
    headerCountryName:'Страна наим',
    headerCity       :'Город',
    headerAddress    :'Адрес',
    headerOtprZip    :'Индекс',
    headerDopInfo    :'Доп. Инфо',

    carrierTitle    :'Справочник перевозчиков',
    headerSt        :'Станция',
    headerCar       :'Перевозчик, номер',
    headerCarName   :'Перевозчик, наимен.',
    headerCarShort  :'Перевозчик, короткое наимен',

    ttipSave:'Сохранить',
    ttipDel :'Удалить',
    btnClose:'Закрыть',
    tooltipEdit: 'Редактировать',
    tooltipDel: 'Удалить'
});

Ext.define("TK.locale.ru.controller.print.Print", {
    override: "TK.controller.print.Print",
    titlePrint: "Настройка печати",
    labelBlank: "С бланком?",
    textPrint: "Печать",
    textPages: 'Страницы на печать',
    textPage: 'Страница ',
    textPageBack: '(оборот)',
    printTitle:'Печать',
    printMsg:'Будут распечатаны документ(-ы)'
});

Ext.define("TK.locale.ru.controller.print.PrintTemplates", {
    override: "TK.controller.print.PrintTemplates",
    
    titleText: 'Привязать шаблон печати',
    titleSelectText: 'Выбрать шаблон печати',
    columnText: 'Наименование',
    btnBindText: 'Привязать',
    btnBindPrintText: 'Печать',
    btnClose: 'Закрыть',
    msgTitle: 'Предупреждение',
    msgMsg: 'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.ru.view.edit.TreeFormWin", {
    override: "TK.view.edit.TreeFormWin",

    titleVag: 'Вагон',
    titleCont: 'Контейнер',
    titleCargo: 'Груз',
    titleDanCargo: 'Опсасный Груз',

    btnDel: 'Удалить',
    btnClose: 'Закрыть',
    btnSave: 'Сохранить',
    btnVagText: '+ Вагон',
    btnContText: '+ Контейнер',
    btnCargoText: '+ Груз',
    btnDanCargoText: '+ Оп.Груз',
    btnDocText: '+ Документ',
    btnPlombText: '+ Пломба',
    btnSearch: 'Поиск',
    btnExpandAll: 'Все развернуть',
    btnCollapseAll: 'Все свернуть',
    btnImportXLSvag:'Импорт вагонов',
    btnImportXLSCont:'Импорт котейнеров'
});

Ext.define("TK.locale.ru.view.cimsmgs.CimSmgsDocs9TreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsDocs9TreeFormWin",

    title: 'Документы, приложенные отправителем'
});

Ext.define("TK.locale.ru.view.cimsmgs.CimSmgsVgCtGrTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsVgCtGrTreeFormWin",

    title: 'Вагон/Контейнер/Груз'
});

Ext.define("TK.locale.ru.view.cimsmgs.CimSmgsPlombsTreeFormWin", {
    override: "TK.view.cimsmgs.CimSmgsPlombsTreeFormWin",

    title: 'Пломбы'
});

/*Ext.define("Ext.locale.ru.form.field.Base", {
    override: "Ext.form.field.Base",

    kontNumText: 'Это поле должно содержать номер контейнера в формате ABCD1234567',
    vagNumText: 'Это поле должно содержать номер узкого(8 символов) или широкого(12 символов) вагона',
    vagNumUzkText: 'Это поле должно содержать номер узкого вагона в формате 123456789012',
    vagNumShirText: 'Это поле должно содержать номер узкого вагона в формате 12345678',
    vagNumLastDigitText: 'Неверная контрольная цифра',
    kontNumLastDigitText: 'Неверная контрольная цифра'
});*/

Ext.define("TK.locale.ru.Validators", {
    override: "TK.Validators",

    kontNumText: 'Это поле должно содержать номер контейнера в формате ABCD1234567',
    vagNumText: 'Это поле должно содержать номер узкого(8 символов) или широкого(12 символов) вагона',
    vagNumUzkText: 'Это поле должно содержать номер узкого вагона в формате 123456789012',
    vagNumShirText: 'Это поле должно содержать номер узкого вагона в формате 12345678',
    vagNumLastDigitText: 'Неверная контрольная цифра',
    kontNumLastDigitText: 'Неверная контрольная цифра',
    notXLS          :'Выбран не xls/xlsx файл'
});

Ext.define("TK.locale.ru.view.edit.UploadDoc9FormWin", {
    override: "TK.view.edit.UploadDoc9FormWin",

    labelCustomsCode: 'Таможенный код',
    labelTextRu: 'Текст(рус)',
    labelText: 'Текст'
});

Ext.define("TK.locale.ru.view.edit.UploadFormWin", {
    override: "TK.view.edit.UploadFormWin",

    title: 'Документы, приложенные отправителем',
    titleUpload: 'Загрузка',
    btnClose: 'Закрыть',
    btnSave: 'Сохранить',
    labelUpload: 'Загрузить',
    labelFile: 'Файл',
    downloadTpl:'Cкачать шаблон'
});

Ext.define("TK.locale.ru.view.ved.List", {
    override        :"TK.view.ved.List",
    btnCreate       :'Создать',
    btnEdit         :'Редактировать',
    btnDelete       :'Удалить',
    headerID        :'ID',
    headerCreation  :'Создание',
    headerDateTime  :'Дата и время',
    headerUser      :'Пользователь',
    headerVagVedNum :'Номер вагонной ведомости',
    headerPerVedNum :'Номера передаточных ведемостей',
    headerTraneNum  :'№ поезда',
    headerTraneName :'Название поезда',
    headerVagCount  :'Кол-во вагонов',
    title           :'Журнал ведомостей',
    btnPrint        :"Печать PDF",
    btnA4VagPrint   :"А4-Вагонная ведомость",
    btnA3VagPrint   :"А3-Вагонная ведомость",
    btnA4PerPrint   :"А4-Передаточная ведомость",
    btnA3PerPrint   :"А3-Передаточная ведомость",
    delMsg1         :'Удаление...',
    delMsg2         :'Вы действительно хотите удалить текущую ведомость?',
    delErr1         :'Удаление...',
    delErr2         :'В процессе удаления ведомости произошла ошибка'
});

Ext.define("TK.locale.ru.controller.docs.Ved", {
    override        :"TK.controller.docs.Ved",
    titleEdit       :'Ред. ',
    waitMsg         :'Идет сохранение',
    btnSelect       :'Выбрать',
    btnClose        :'Закрыть',
    labelDocs :     'Список накладных',
    headerNumClaim :'Номер СМГС',
    headerVags :    'Номер вагона',
    headerCreate :  'Дата создания',
    headerKont :    'Номер контейнера',
    headerTrain :   'Номер поезда',
    headerNstn :    'Станция назначения',
    headerRoute :   'Маршрут',
    headerGng :     'ГНГ',
    filterText:     'Фильтр',
    duplicateAll:   'Размножить все',
    duplicateEmpty: 'Размножить пустые',
    labelFilter: 'Фильтр',
    filterHeader: 'Данные',
    userfiltr: "Фильтр",
    claerAll: 'Очистить все'
});

Ext.define("TK.locale.ru.view.ved.Form", {
    override            :"TK.view.ved.Form",
    title               :'Ведомость',
    fldLblNum           :'Ведомость №',
    fldLblDate          :'Дата',
    fldLblTrain         :'Поезд',
    fldLblTrainName     :'Наим. поезда',
    fldLblCarrOutName   :'Сдающий перевозчик',
    fldLblCarrInName    :'Принимающий перевозчик',
    fldLblStnOut        :'станции',
    fldLblStnIn         :'станцию',
    fldLblRoadOut       :'С дороги',
    fldLblRoadIn        :'На дорогу'

});

Ext.define("TK.locale.ru.view.ved.VagsList", {
    override: "TK.view.ved.VagsList",
    title: 'Список документов',
    colTextIndex: '№<br>п/п',
    colTextNvag: 'Номер<br>вагона',
    colTextOwner: 'Владелец<br>вагона',
    colTextKind: 'Род<br>вагона',
    colTextGp: 'Грузоп-ть<br>вагона, тн',
    colTextAxes: 'Кол-во<br>осей',
    colTextTara: 'Тара<br>вагона, тн',
    colTextPlomb: 'Сведения о пломбах',
    colTextKpl: 'Количество',
    colTextZnak: 'Знаки',
    colTextNstoF: 'Станция<br>нал. пломб',
    colTextNum: 'Накладная №',
    colTextDatpp: 'Дата приема к <br>перевозке',
    colTextKsto: 'Код станции<br>отправления',
    colTextNsto: 'Cтанция<br>отправления',
    colTextKstn: 'Код станции<br>назначения',
    colTextNstn: 'Станция<br>назначения',
    colTextKontNum: '№<br>контейнера',
    colTextKontType: 'Типоразмер<br>контейнера',
    colTextKontGp: 'Макс грузоп-ть<br>контейнера, тн',
    colTextKontTara: 'Тара<br>контейнера, кг',
    colTextPlaces: 'Мест',
    colTextPack: 'Упаковка',
    colTextGruz: 'Код груза',
    colTextGruzName: 'Наим.<br>груза',
    colTextMbrt: 'Вес<br>груза',
    colTextPrim: 'Прим.',
    colTextPerVed: '№ передаточной<br>ведомости',
    btnAdd: "Добавить",
    btnDelete: "Удалить",
    btnLoad: "Загрузить",
    btnCancelFilters: "Снять фильтры"
});

Ext.define("TK.locale.ru.view.ved.MenuPart", {
    override: "TK.view.ved.MenuPart",
    title: 'Список маршрутов',
    btnView: "Показать документы"
});

Ext.define("TK.locale.ru.view.pogruz.PoezdSelectForm", {
    override: "TK.view.pogruz.PoezdSelectForm",
    title       :'Поезда',
    btnFind     :'Найти',
    btnFilter   :'Фильтр',
    btnClose    :'Закрыть',
    btnReset    :'Сброс',
    lableDate   :'Дата c',
    lableDate1  :'Дата по',
    train       :'Номер поезда',
    count       :'Количество',
    btnOk       :'Выбрать',
    btnCancel   :'Отмена'
});

Ext.define("TK.locale.ru.view.pogruz.SmgsSelectForm", {
    override: "TK.view.pogruz.SmgsSelectForm",
    title           :'CIM/СМГС по номеру поезда',
    btnClose        :'Закрыть',
    headerG694      :'Номер<br/>отправки',
    headerAltered   :'Дата изменения',
    btnOk           :'Выбрать',
    btnCancel       :'Отмена',
    headerContNum   :'Номер<br/>конт.',
    headerVagNum    :'Номер<br/>вагона',
    headertNstn     :'Станция<br>назначения'
});

Ext.define("TK.locale.ru.view.pogruz.Map2BaseSelectForm", {
    override: "TK.view.pogruz.Map2BaseSelectForm",
    title           :'Лист погрузки',
    headerWagN      :'№ вагона<br/><b>лист</b>',
    headerKonN      :'№ контейнера<br/><b>лист</b>',
    headerKonNdb    :'№ контейнера<br/><b>база</b>',
    headerG694      :'Номер<br/>отправки<br/><b>лист</b>',
    headerKlient    :'Собственник<br/><b>лист</b>',
    headerFoot      :'Фут-сть<br/><b>лист</b>',
    headerContSize  :'Типоразмер<br/><b>лист</b>',
    headerPlomb     :'Пломбы<br/><b>лист</b>',
    headerTara: 'Тара<br/>конт-ра, кг<br/><b>лист</b>',
    headerMaxLoad   :'Груз-сть<br/>конт-ра<br/><b>лист</b>',
    headerTaraVag: 'Тара<br/>вагона, тн<br/><b>лист</b>',
    headerMaxLoadVag:'Груз-сть<br/>вагона<br/><b>лист</b>',
    headerKolOs: 'Кол-во осей<br/><b>лист</b>',
    headerId        :'Id<br/><b>база</b>',

    btnOk           :'Выбрать',
    btnCancel: 'Отмена',
});

Ext.define("TK.locale.ru.view.components.PagingSizeChangerPlugin", {
    override: "TK.view.components.PagingSizeChangerPlugin",
    displayText           :'записей на странице'
});

Ext.define("TK.locale.ru.view.edit.StationCatalogEdit", {
    override: "TK.view.edit.StationCatalogEdit",

    title        :'Станция',
    btnSave         :'Сохранить',
    btnCancel       :'Отмена',
    lblStaRu      :'Станция(рус)',
    lblStaEn      :'Станция(англ)',
    lblStaCn      :'Станция(кит)',
    lblStaNo      :'Код',
    lblMnamerus   :'Железная<br>дорога',
    lblManagno    :'Код<br>администрации',
    lblCtryNam    :'Страна'
});

Ext.define("Ext.locale.ru.grid.plugin.RowEditing", {
    override: "Ext.grid.plugin.RowEditing",

    saveBtnText:'Сохранить',
    cancelBtnText:'Отмена',
    errorsText:'Ошибка',
    dirtyText:'Подтвердите или отмените изменения',
    chEvery:'Заменить все на ',
    chEmpty:'Заменить пустые на '
});

Ext.define("TK.locale.ru.view.components.g7vagsmgs2", {
    override: "TK.view.components.g7vagsmgs2",

    drophlp        :'Перетащите запись в желаемое место'
});
Ext.define("TK.locale.ru.view.components.g19plombsmgs2", {
    override: "TK.view.components.g19plombsmgs2",

    totalCount        :'Итого'
});
Ext.define("TK.locale.ru.view.edit.SelectCopy2AvisoElements", {
    override: "TK.view.edit.SelectCopy2AvisoElements",

    title   :'Создание шаблона',
    headtext    :'Пункт',
    headngraph  :'N графы',
    choose      :'Выбрать',
    cancel      :'Отмена'
});

Ext.define("TK.locale.ru.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerNKont        :'Номер контейнера',
    headerDateIn        :'Размещение',
    headerDateOut        :'Перемещение',
    headerSector        :'Сектор',
    headerLoaded        :'Груженный',
    headerStorageType        :'Хранение',
    headerXYZ        :'Координаты',

    title:'Контейнерная площадка'

});

Ext.define("TK.locale.ru.view.ky2.yard.YardList", {
    override:"TK.view.ky2.yard.YardList",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerNKont        :'Номер контейнера',
    headerDateIn        :'Размещение',
    headerDateOut        :'Перемещение',
    headerSector        :'Сектор',
    headerLoaded        :'Груженный',
    headerStorageType        :'Хранение',
    headerXYZ        :'Координаты',

    title:'Контейнерная площадка',
    btnEditKont     : 'Редактировать контейнер'

});

Ext.define("TK.locale.ru.controller.ky.Yard", {
    override:"TK.controller.ky.Yard",

    titleEdit:'Редактирование места на конт. площадке',
    titleCreate:'Создание места на конт. площадке',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    headerName       :'Наименование',
    headerDescr      :'Описание'

});

Ext.define("TK.locale.ru.controller.ky2.YardController", {
    override:"TK.controller.ky2.YardController",

    titleEdit:'Редактирование места на конт. площадке',
    titleCreate:'Создание места на конт. площадке',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    headerName       :'Наименование',
    headerDescr      :'Описание'

});

Ext.define("TK.locale.ru.view.ky.yard.Form", {
    override:"TK.view.ky.yard.Form",

    labelNKont:'Номер контейнера',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Размещение',
    labelDate  :'дата',
    labelTime  :'время',
    labelDateOut  :'Перемещение',

    labelSector  :'Сектор',
    labelLoaded  :'Груженный',
    labelStorageType  :'Хранение',
    labelStorageVACANT  :'Вакантная позиция',
    labelStorageTEMPORALLY  :'Временное нахождение',
    labelStorageSTORAGE  :'Хранение',
    labelMileage  :'Пробег(км)',
    labelNotes  :'Примечание',
    msgSearch  :'Поиск...',
    msgNothingFound:'Найдено 0 совпадений'

});

Ext.define("TK.locale.ru.view.ky2.yard.YardForm", {
    override:"TK.view.ky2.yard.YardForm",

    labelNKont:'Номер контейнера',
    labelX     :'X',
    labelY     :'Y',
    labelZ   :'Z',
    labelDateIn  :'Размещение',
    labelDate  :'дата',
    labelTime  :'время',
    labelDateOut  :'Перемещение',

    labelSector  :'Сектор',
    labelLoaded  :'Груженный',
    labelStorageType  :'Хранение',
    labelStorageVACANT  :'Вакантная позиция',
    labelStorageTEMPORALLY  :'Временное нахождение',
    labelStorageSTORAGE  :'Хранение',
    labelMileage  :'Пробег(км)',
    labelNotes  :'Примечание',
    msgSearch  :'Поиск...',
    msgNothingFound:'Найдено 0 совпадений'

});

Ext.define("TK.locale.ru.view.ky.yard.Filter", {
    override:"TK.view.ky.yard.Filter",
    title: 'Фильтр',

    btnFilter         :'Фильтровать',
    btnClear     :'Очистить',
    btnClose        :'Закрыть',

    labelNKont:'Номер контейнера',

    labelDateIn  :'Размещение',
    labelDate  :'дата',
    labelTime  :'время',
    labelDateOut  :'Перемещение',
    labelDateFrom  :'с',
    labelDateTo  :'по',

    labelSector  :'Сектор',
    labelLoaded  :'Груженный',
    labelNotLoaded:'Порожний',
    labelStorageType  :'Хранение',
    labelStorageVACANT  :'Вакантная позиция',
    labelStorageTEMPORALLY  :'Временное нахождение',
    labelStorageSTORAGE  :'Хранение',
    msgSearch  :'Поиск...',
    msgNothingFound:'Найдено 0 совпадений'

});

Ext.define("TK.locale.ru.view.ky2.yard.Filter", {
    override:"TK.view.ky2.yard.Filter",
    title: 'Фильтр',

    btnFilter         :'Фильтровать',
    btnClear     :'Очистить',
    btnClose        :'Закрыть',

    labelNKont:'Номер контейнера',

    labelDateIn  :'Размещение',
    labelDate  :'дата',
    labelTime  :'время',
    labelDateOut  :'Перемещение',
    labelDateFrom  :'с',
    labelDateTo  :'по',

    labelSector  :'Сектор',
    labelLoaded  :'Груженный',
    labelNotLoaded:'Порожний',
    labelStorageType  :'Хранение',
    labelStorageVACANT  :'Вакантная позиция',
    labelStorageTEMPORALLY  :'Временное нахождение',
    labelStorageSTORAGE  :'Хранение',
    msgSearch  :'Поиск...',
    msgNothingFound:'Найдено 0 совпадений'

});

Ext.define("TK.locale.ru.view.ky.yard.List", {
    override:"TK.view.ky.yard.List",

    storage_0       :"Вакантно",
    storage_1       :"Временно",
    storage_2       :"Хранение"
});

Ext.define("TK.locale.ru.view.ky2.yard.List", {
    override:"TK.view.ky2.yard.List",

    storage_0       :"Вакантно",
    storage_1       :"Временно",
    storage_2       :"Хранение"
});

Ext.define("TK.locale.ru.view.ky.AbstractForm", {
    override:"TK.view.ky.AbstractForm",

    btnSave         :'Сохранить',
    btnCancel     :'Очистить'
});

Ext.define("TK.locale.ru.view.ky2.AbstractForm", {
    override:"TK.view.ky2.AbstractForm",

    btnSave         :'Сохранить',
    btnSaveExit     :'Сохранить и выйти',
    btnClose        :'Закрыть',
    btnCancel     :'Очистить'
});

Ext.define("TK.locale.ru.view.ky.BaseList", {
    override:"TK.view.ky.BaseList",

    btnEdit     :'Редактировать',
    btnDelete   :'Удалить',
    btnFilter   :'Фильтр',
    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.ru.view.ky2.BaseList", {
    override:"TK.view.ky2.BaseList",

    btnEdit     :'Редактировать',
    btnDelete   :'Удалить',
    btnFilter   :'Фильтр',
    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.ru.view.ky.AbstractList", {
    override:"TK.view.ky.AbstractList",

    btnCreate   :'Создать'
});

Ext.define("TK.locale.ru.view.ky2.AbstractList", {
    override:"TK.view.ky2.AbstractList",

    btnCreate   :'Создать'
});

Ext.define("TK.locale.ru.view.ky2.AbstractList", {
    override:"TK.view.ky2.AbstractList",

    btnCreate   :'Создать',
    warnTitle:'Предупреждение',
    warnMsg  :'Следует выбрать строку из таблицы с данными'
});

Ext.define("TK.locale.ru.view.ky.AbstractWindow", {
    override:"TK.view.ky.AbstractWindow",

    btnClose         :'Закрыть'
});

Ext.define("TK.locale.ru.view.ky2.AbstractWindow", {
    override:"TK.view.ky2.AbstractWindow",

    btnClose         :'Закрыть'
});

Ext.define("TK.locale.ru.view.ky.poezd.into.List", {
    override:"TK.view.ky.poezd.into.List",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum        :'Номер поезда',
    headerKoleya        :'Колея',
    headerDateIn        :'Прибытие',

    title:'Список поездов по прибытию'
});

Ext.define("TK.locale.ru.view.ky2.poezd.BasePoezdList", {
    override:"TK.view.ky2.poezd.BasePoezdList",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum    :'Номер поезда',
    headerPoezdNumM   :'Международный номер поезда',
    headerKoleya      :'Колея',
    headerVagCount    :'Количество вагонов',
    freeSpace         :'',

    // title:'Список поездов по прибытию',

    btnCreate   :'Создать поезд',
    btnEdit     :'Редактировать поезд',
    btnCreateVags   :'Создать вагоны',
    btnEditVags     :'Редактировать вагоны'
});

Ext.define("TK.locale.ru.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateIn        :'Прибытие',
    headerKontCount   :'Количество контейнеров не выгружено',

    btnToPoezdOut   : 'На поезд по отпр.',
    btnToYard     : 'На конт. площадку',

    title:'Список поездов по прибытию'

    // btnCreate   :'Создать поезд',
    // btnEdit     :'Редактировать поезд',
    // btnCreateVags   :'Создать вагоны',
    // btnEditVags     :'Редактировать вагоны'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    // headerCreation    :'Создание',
    // headerDateTime    :'Дата и время',
    // headerUser        :'Пользователь',
    //
    // headerPoezdNum        :'Номер поезда',
    // headerKoleya        :'Колея',
    headerDateOut        :'Отправление',
    headerKontCount :'Количество контейнеров погружено',

    btnFromPoezdInto   : 'С поезда по приб.',
    btnFromYard     : 'С конт. площадки',

    title:'Список поездов по отправлению'
});

Ext.define("TK.locale.ru.view.ky.poezd.out.List", {
    override:"TK.view.ky.poezd.out.List",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum        :'Номер поезда',
    headerKoleya        :'Колея',
    headerDateOut        :'Отправление',

    title:'Список поездов по отправлению'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.List", {
    override:"TK.view.ky2.poezd.out.List",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum        :'Номер поезда',
    headerKoleya        :'Колея',
    headerDateOut        :'Отправление',

    title:'Список поездов по отправлению'
});

Ext.define("TK.locale.ru.view.ky.poezd.into.vagon.List", {
    override:"TK.view.ky.poezd.into.vagon.List",
    headerVagonNum        :'Номер вагона',
    title:'Список вагонов в поезде'
});

Ext.define("TK.locale.ru.view.ky2.poezd.into.vagon.List", {
    override:"TK.view.ky2.poezd.into.vagon.List",
    headerVagonNum        :'Номер вагона',
    title:'Список вагонов в поезде'
});

Ext.define("TK.locale.ru.view.ky.poezd.out.vagon.List", {
    override:"TK.view.ky.poezd.out.vagon.List",
    headerVagonNum        :'Номер вагона',
    title:'Список вагонов в поезде'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.vagon.List", {
    override:"TK.view.ky2.poezd.out.vagon.List",
    headerVagonNum        :'Номер вагона',
    title:'Список вагонов в поезде'
});

Ext.define("TK.locale.ru.view.ky.poezd.into.vagon.kont.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.List",
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров в вагоне'
});

Ext.define("TK.locale.ru.view.ky2.poezd.into.vagon.kont.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.List",
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров в вагоне'
});

Ext.define("TK.locale.ru.view.ky.poezd.out.vagon.kont.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.List",
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров в вагоне'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.vagon.kont.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.List",
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров в вагоне'
});

Ext.define("TK.locale.ru.view.ky.kontnotransp.List", {
    override:"TK.view.ky.kontnotransp.List",
    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров'
});

Ext.define("TK.locale.ru.view.ky2.kontnotransp.List", {
    override:"TK.view.ky2.kontnotransp.List",
    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',
    headerKontNum        :'Номер контейнера',
    title:'Список контейнеров'
});


Ext.define("TK.locale.ru.view.ky.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.poezd.into.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky.BaseGruzList", {
    override:"TK.view.ky.BaseGruzList",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.BaseGruzList", {
    override:"TK.view.ky2.BaseGruzList",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.into.vagon.kont.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.poezd.into.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.into.vagon.kont.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky.BasePlombList", {
    override:"TK.view.ky.BasePlombList",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.BasePlombList", {
    override:"TK.view.ky2.BasePlombList",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.vagon.kont.gruz.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky.poezd.out.vagon.kont.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.vagon.kont.plomb.List", {
    override:"TK.view.ky2.poezd.out.vagon.kont.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky.kontnotransp.gruz.List", {
    override:"TK.view.ky.kontnotransp.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.kontnotransp.gruz.List", {
    override:"TK.view.ky2.kontnotransp.gruz.List",
    headerGruzCode        :'Код',
    headerGruzName        :'Наименование',
    title:'Список грузов в контейнере'
});

Ext.define("TK.locale.ru.view.ky.kontnotransp.plomb.List", {
    override:"TK.view.ky.kontnotransp.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.view.ky2.kontnotransp.plomb.List", {
    override:"TK.view.ky2.kontnotransp.plomb.List",
    headerPlombKpl        :'Количество',
    headerPlombZnak        :'Знак',
    title:'Список пломб в контейнере'
});

Ext.define("TK.locale.ru.controller.ky.Poezd", {
    override:"TK.controller.ky.Poezd",

    titleCreate: 'Создание поезда',
    titleEdit: 'Редактирование поезда',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.PoezdController", {
    override:"TK.controller.ky2.PoezdController",

    titleCreate: 'Создание поезда',
    titleCreateIntoWide: 'Создание поезда к.1520 по прибытию',
    titleCreateOutWide: 'Создание поезда к.1520 по отправлению',
    titleCreateIntoNar: 'Создание поезда к.1435 по прибытию',
    titleCreateOutNar: 'Создание поезда к.1435 по отправлению',
    titleEdit: 'Редактирование поезда',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    warningMsg:'Внимание!',
    warningText:'Поезд не сохранен....',
    uploadText:'Данные загружены',
    titleUpload: 'Загрузка XLS',
    labelSelectFile:'Выбор файла для загрузки...',
    labelFile:'Файл',
    btnSearch:'Обзор...',
    btnSave  :'Сохранить',
    btnClose :'Закрыть'
});

Ext.define("TK.locale.ru.controller.ky2.AvtoCtGrController", {
    override:"TK.controller.ky2.AvtoCtGrController",

    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...',
    warningMsg:'Внимание!',
    warningText:'Автомобиль не сохранен....',
    uploadText:'Данные загружены',
    titleUpload: 'Загрузка XLS',
    labelSelectFile:'Выбор файла для загрузки...',
    labelFile:'Файл',
    btnSearch:'Обзор...',
    btnSave  :'Сохранить',
    btnClose :'Закрыть'
});

Ext.define("TK.locale.ru.controller.ky.Vagon", {
    override:"TK.controller.ky.Vagon",

    titleCreate: 'Создание вагона',
    titleEdit: 'Редактирование вагона',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.Vagon", {
    override:"TK.controller.ky2.Vagon",

    titleCreate: 'Создание вагона',
    titleEdit: 'Редактирование вагона',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky.Gruz", {
    override:"TK.controller.ky.Gruz",

    titleCreate: 'Создание груза',
    titleEdit: 'Редактирование груза',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.Gruz", {
    override:"TK.controller.ky2.Gruz",

    titleCreate: 'Создание груза',
    titleEdit: 'Редактирование груза',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky.Kont", {
    override:"TK.controller.ky.Kont",

    titleCreate: 'Создание контейнера',
    titleEdit: 'Редактирование контейнера',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.Kont", {
    override:"TK.controller.ky2.Kont",

    titleCreate: 'Создание контейнера',
    titleEdit: 'Редактирование контейнера',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky.Plomb", {
    override:"TK.controller.ky.Plomb",

    titleCreate: 'Создание пломбы',
    titleEdit: 'Редактирование пломбы',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.Plomb", {
    override:"TK.controller.ky2.Plomb",

    titleCreate: 'Создание пломбы',
    titleEdit: 'Редактирование пломбы',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});


Ext.define("TK.locale.ru.view.ky2.poezd.into.PoezdList", {
    override:"TK.view.ky2.poezd.into.PoezdList",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum        :'Номер поезда',
    headerKoleya        :'Колея',
    headerDateIn        :'Прибытие',

    title:'Список поездов по прибытию',

    btnCreate   :'Создать поезд',
    btnEdit     :'Редактировать поезд',
    btnCreateVags   :'Создать вагоны',
    btnEditVags     :'Редактировать вагоны'
});

Ext.define("TK.locale.ru.view.ky2.poezd.out.PoezdList", {
    override:"TK.view.ky2.poezd.out.PoezdList",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerPoezdNum        :'Номер поезда',
    headerKoleya        :'Колея',
    headerDateOut        :'Отправление',

    title:'Список поездов по отправлению'
});

Ext.define("TK.locale.ru.view.ky2.poezd.BasePoezdForm", {
    override:"TK.view.ky2.poezd.BasePoezdForm",

    labelNppr         :'Номер поезда',
    labelNpprm        :'Международный номер поезда',
    labelKoleya       :'Колея',
    labelKoleyaWide   :'Широкая',
    labelKoleyaNarow  :'Узкая',
    labelClient       :'Клиент',
    labelKstf         :'Код станции формирования',
    labelNstf         :'Наименование станции формирования',
    labelAdmf         :'Администрация формирования',
    labelKstn         :'Код станции назначения',
    labelNstn         :'Наименование станции назначения',
    labelAdmn         :'Администрация назначения'


});

Ext.define("TK.locale.ru.view.ky2.avto.BaseAvtoList", {
    override:"TK.view.ky2.avto.BaseAvtoList",

    headerCreation    :'Создание',
    headerDateTime    :'Дата и время',
    headerUser        :'Пользователь',

    headerAvtoNum      :'Номер авто',
    headerAvtoTrail    :'Номер прицепа',
    headerDriverFam    :'ФИО водителя',
    headerDep          :'Пункт отправления',
    headerDest         :'Пункт назначения',

    title:'Список автомобилей по прибытию'

});

Ext.define("TK.locale.ru.view.ky2.BaseAvtosDir", {
    override:"TK.view.ky2.BaseAvtosDir",

    headerAvtoNum      :'Номер авто',
    headerAvtoTrail    :'Номер прицепа',
    headerDep          :'Отправление',
    headerDest         :'Назначение',
    btnSelect          :'Выбрать',

    title:'Список автомобилей по прибытию'

});
Ext.define("TK.locale.ru.view.ky2.avto.into.AvtoList", {
    override:"TK.view.ky2.avto.into.AvtoList",

    headerDateIn       :'Прибытие',
    btnToAvto          : "На авто по отпр.",
    btnToPoezd         : "На поезд по отпр.",
    btnToYard          : "На конт. площадку",
    title              :'Список автомобилей по прибытию',
    headerKontCount    :'Количество контейнеров не выгружено'


});

Ext.define("TK.locale.ru.view.ky2.avto.out.AvtoList", {
    override:"TK.view.ky2.avto.out.AvtoList",

    headerDateOut      :'Отправление',
    btnToAvto          : "На авто по приб.",
    btnToPoezd         : "На поезд по приб.",
    btnToYard          : "На конт. площадку",
    title              :'Список автомобилей по отправлению',
    headerKontCount    :'Количество контейнеров погружено',

});

Ext.define("TK.locale.ru.controller.ky2.AvtoController", {
    override:"TK.controller.ky2.AvtoController",

    titleCreate: 'Создание авто',
    titleEdit: 'Редактирование авто',
    delTitle :'Удаление...',
    delMsg   :'Вы действительно хотите удалить..?',
    maskMsg :'Запрос данных...',
    errorMsg:'Внимание! Ошибка...'
});

Ext.define("TK.locale.ru.controller.ky2.PoezdVgCtGrController", {
    override:"TK.controller.ky2.PoezdVgCtGrController",

    titleTree       : 'Вагон/Контейнер/Груз по поезду №'
});

Ext.define("TK.locale.ru.view.ky2.AbstractTreeForm", {
    override:"TK.view.ky2.AbstractTreeForm",

    btnSave       : 'Сохранить',
    btnSaveExit   : 'Сохранить и Выйти',
    btnClose      : 'Закрыть',
    btnEditPoezd  : 'Редактировать поезд'
});
Ext.define("TK.locale.ru.ky2.AbstractBindTreeForm", {
    override:"TK.view.ky2.AbstractBindTreeForm",

    btnSave       : 'Сохранить',
    btnSaveExit   : 'Сохранить и Выйти',
    btnClose      : 'Закрыть',
    btnEditPoezd  : 'Редактировать поезд',
    btnVgCtGr     : '+Вагон/Контейнер/Груз'
});

Ext.define("TK.locale.ru.ky2.avto.AvtoBindTreeForm", {
    override:"TK.view.ky2.avto.AvtoBindTreeForm",

    btnSave       : 'Сохранить',
    btnSaveExit   : 'Сохранить и Выйти',
    btnClose      : 'Закрыть',
    btnEditPoezd  : 'Редактировать автомобиль',
    btnVgCtGr     : '+Вагон/Контейнер/Груз'
});
