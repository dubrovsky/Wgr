Ext.define('TK.Utils', {
    singleton: true,
    arrru: new Array('Кю', 'кю', 'Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ы', 'ы', 'ь', 'ь', 'ъ', 'ъ', 'Э', 'э'),
    arren: new Array('Q', 'q', 'Ya', 'ya', 'Yu', 'yu', 'Ch', 'ch', 'Sh', 'sh', 'Sh', 'sh', 'Zh', 'zh', 'A', 'a', 'B', 'b', 'V', 'v', 'G', 'g', 'D', 'd', 'E', 'e', 'E', 'e', 'Z', 'z', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'F', 'f', 'H', 'h', 'C', 'c', 'Y', 'y', '`', '`', '\'', '\'', 'E', 'e'),
    arrde: new Array('Ä', 'ä', 'Ö', 'ö', 'ẞ', 'ß', 'Ü', 'ü', 'W', 'w'),
    arrde_en: new Array('Ae', 'ae', 'Oe', 'oe', 'Ss', 'ss', 'Ue', 'ue', 'V', 'v'),
    arrpl: new Array('Ą', 'ą', 'Ć', 'ć', 'Ę', 'ę', 'Ł', 'ł', 'Ń', 'ń', 'Ó', 'ó', 'Ś', 'ś', 'Ź', 'ź', 'Ż', 'ż'),
    arrpl_en: new Array('A', 'a', 'C', 'c', 'E', 'e', 'L', 'l', 'N', 'n', 'O', 'o', 'S', 's', 'Z', 'z', 'Z', 'z'),

    makeErrMsg: function (response, title) {
        var msg = response.statusText ? response.statusText : '';
        if (response.responseText) {
            var errors = Ext.decode(response.responseText);
            if (errors) {
                if (errors.exception) {
                    msg += "<br/>" + errors.exception;
                    if (errors.cause) {
                        msg += "<br/>" + errors.cause;
                    }
                } else if (errors.msg) {
                    msg += "<br/>";
                    if (Ext.isArray(errors.msg)) {
                        msg += errors.msg.join(", ");
                    } else {
                        msg += errors.msg;
                    }
                }
            } else {
                msg += "<br/>" + response.responseText;
            }
        }
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return false;
    },
    failureDataMsg: function () {
        Ext.Msg.show({
                title: this.dataErrorHdr,
                msg: this.dataErrormsg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            }
        );
        return false;
    },
    /**
     * обрабатывает текст ответа от сервера после запроса объединения документов и шаблона
     * @param response ответ сервера
     * @returns {*} текст ответа
     */
    avisoXsmgsMsgText: function (response) {
        var me = TK.Utils;
        var succ = Ext.decode(response.responseText)['success'], msgText = '';
        if (succ) {
            msgText = me.processed + ' ' + Ext.decode(response.responseText)['result'];
            if (Ext.decode(response.responseText)['errors']) {
                msgText += '<br>' + me.unProcDocs + Ext.decode(response.responseText)['errors'];
            }
        } else
            msgText = this.wrongAviso;

        return msgText;
    },
    /**
     * Делает Ajax запрос на сервер
     * @param url адрес запроса
     * @param params объект с параметрами запроса
     * @param respHandler обработчик сообщения ответа
     * @param form форма которую надо затенить на время запроса
     * @param afterMsgHandler обработчик выполняющий действия после нажатия OK в окнее с сообщением
     * @param opts переменные для обработчика
     */
    makeAjaxRequest: function (url, params, respHandler, form, afterMsgHandler, opts) {
        var me = TK.Utils, afterHandl = afterMsgHandler ? afterMsgHandler : function () {
        }
        if (form)
            form.getEl().mask(me.request, 'x-mask-loading');
        Ext.Ajax.request({
            url: url,
            params: params,
            // scope: this,
            success: function (response, options) {
                var msgTxt;
                if (respHandler)
                    msgTxt = respHandler(response, form);
                if (msgTxt)
                    Ext.Msg.show({
                        title: me.successMsgTitle,
                        msg: msgTxt,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: afterHandl(opts)
                    });
                if (form && form.getEl())
                    form.getEl().unmask();
            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, this.errorMsg);
                if (form)
                    form.getEl().unmask();
            }
        });
    },

    renderLongStr: function (value, meta) {
        meta.style = 'white-space:normal;';
        return value;
    },
// return '<div class="view_tbc" onclick="TK.app.getController(\'Docs\').unText(\'' + rec.data.un + '\')">' + val + '</div>';


    renderMessCount: function (value, meta, record, rowIndex, colIndex, store, view) {
        var result = '';
        meta.style = 'cursor: pointer;';
        if (value) {
            meta.style += 'background: #fffdea;';
            // result = '<div style="cursor: pointer">';
            if (record.get('newMessCount')) {
                result = '<b>' + record.get('newMessCount') + '</b>' + '/';
            }
            result += value;
            // result += '</div>';
        }
        return result;
    },

    renderNonZeroStr: function (value, meta) {
        return value !== 0 ? value : '';
    },
    rendererNewDoc: function (value) {
        return value ? '<img src="./resources/images/doc_new.png" width="16" height="16">' : '';
    },
    rendererUserFlag: function (value) {
        return (value != null) ? '<img src="./resources/images/flag-' + value + '.png" width="16" height="16">' : '';
    },
    isRowSelected: function (grid) {
        if (grid.selModel.getCount() == 0) {
            Ext.Msg.show({
                title: grid.warnTitle,
                msg: grid.warnMsg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        } else {
            return true;
        }
    },
    isOneRowSelected: function (grid) {
        if (grid.selModel.getCount() !== 1) {
            Ext.Msg.show({
                title: grid.warnTitle,
                msg: 'Следует выбрать одну строку из таблицы с данными',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        } else {
            return true;
        }
    },
    num2str: function (money/*, target*/) {
        var money;
        var price;
        var rub, kop;
        var litera = sotny = desatky = edinicy = minus = "";
        var k = 0, i, j;

        N = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
            "", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
            "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
            "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
            "тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч",
            "миллионов", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов",
            "миллиардов", "миллиард", "миллиарда", "миллиарда", "миллиарда", "миллиардов", "миллиардов", "миллиардов", "миллиардов", "миллиардов"];

        var M = new Array(10);
        for (j = 0; j < 10; ++j)
            M[j] = new Array(N.length);

        for (i = 0; i < N.length; i++)
            for (j = 0; j < 10; j++)
                M[j][i] = N[k++]

        //var R = new Array("рублей", "рубль", "рубля", "рубля", "рубля", "рублей", "рублей", "рублей", "рублей", "рублей");
        //var K = new Array("копеек", "копейка", "копейки", "копейки", "копейки", "копеек", "копеек", "копеек", "копеек", "копеек");
        var R = new Array("", "", "", "", "", "", "", "", "", "");
        var K = new Array("", "", "", "", "", "", "", "", "", "");

        function n(start, len) {
            if (start > price.length) return 0;
            else return Number(price.substr(price.length - start, len));
        }

        function propis(price, D) {
            litera = "";
            for (i = 0; i < price.length; i += 3) {
                sotny = desatky = edinicy = "";
                if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
                    edinicy = " " + M[n(i + 1, 1)][1] + " " + M[0][i / 3 + 3];
                    i == 0 ? edinicy += D[0] : 0;
                } else {
                    edinicy = M[n(i + 1, 1)][0];
                    (edinicy == "один" && (i == 3 || D == K)) ? edinicy = "одна" : 0;
                    (edinicy == "два" && (i == 3 || D == K)) ? edinicy = "две" : 0;
                    i == 0 && edinicy != "" ? 0 : edinicy += " " + M[n(i + 1, 1)][i / 3 + 3];
                    edinicy == " " ? edinicy = "" : (edinicy == " " + M[n(i + 1, 1)][i / 3 + 3]) ? 0 : edinicy = " " + edinicy;
                    i == 0 ? edinicy += " " + D[n(i + 1, 1)] : 0;
                    (desatky = M[n(i + 2, 1)][2]) != "" ? desatky = " " + desatky : 0;
                }
                (sotny = M[n(i + 3, 1)][3]) != "" ? sotny = " " + sotny : 0;
                if (price.substr(price.length - i - 3, 3) == "000" && edinicy == " " + M[0][i / 3 + 3]) edinicy = "";
                litera = sotny + desatky + edinicy + litera;
            }
            if (litera == " " + R[0]) return "ноль" + litera;
            else return litera.substr(1);
        }

        rub = "", kop = "";
        money = money.replace(",", ".");

        if (isNaN(money)) {
            return "Не числовое значение";
        }
        if (money.substr(0, 1) == "-") {
            money = money.substr(1);
            minus = "минус "
        } else minus = "";
        money = Math.round(money * 100) / 100 + "";

        if (money.indexOf(".") != -1) {
            rub = money.substr(0, money.indexOf("."));
            kop = money.substr(money.indexOf(".") + 1);
            if (kop.length == 1) kop += "0";
        } else rub = money;

        if (rub.length > 12) {
            return "Слишком большое число";
        }

        ru = propis(price = rub, R);
        ko = propis(price = kop, K);
        ko != "" ? res = ru + " " + ko : res = ru;
        ru == "Ноль " + R[0] && ko != "" ? res = ko : 0;
        // kop == 0? res += " ноль " + K[0]: 0;
        return (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
    },
    findFieldBy: function (name, items) {
        var me = this;
        for (var i = 0; i < items.length; i++) {
            if (items[i].items) {
                return me.findFieldBy(name, items[i].items);
            } else if (items[i].name === name) {
                return items[i];
            }
        }
    },

    /**
     * translit russian text into latin
     * @param text input text
     * @returns {*} result
     */
    translit_ru: function (text) {
        for (var i = 0; i < this.arrru.length; i++) {
            var reg = new RegExp(this.arrru[i], "g");
            text = text.replace(reg, this.arren[i]);
        }
        return text;
    },
    /**
     * translit latin text into russian
     * @param text input text
     * @returns {*} result
     */
    translit_en: function (text) {
        for (var i = 0; i < this.arren.length; i++) {
            var reg = new RegExp(this.arren[i], "g");
            text = text.replace(reg, this.arrru[i]);
        }
        return text;
    },
    /**
     * replace german letters with english analogs
     * @param text
     * @returns {*}
     */
    translit_de: function (text) {
        for (var i = 0; i < this.arrde.length; i++) {
            var reg = new RegExp(this.arrde[i], "g");
            text = text.replace(reg, this.arrde_en[i]);
        }
        return text;
    },
    translit: function (text, arrayFrom, arrayTo) {
        for (var i = 0; i < arrayFrom.length; i++) {
            var reg = new RegExp(arrayFrom[i], "g");
            text = text.replace(reg, arrayTo[i]);
        }
        return text;
    },

    /**
     * translit text to chosen destination and paste to entered component.
     * @param text
     * @param component
     * @param lang
     */
    set_translit: function (text, component, lang) {
        if (text && component) {
            if (lang === 'ru')
                component.setValue(this.translit(text, this.arrru, this.arren));
            if (lang === 'en') {

                text = this.translit(text, this.arrde, this.arrde_en);
                text = this.translit(text, this.arrpl, this.arrpl_en);
                component.setValue(this.translit(text, this.arren, this.arrru));
            }
        }
    },
    /**
     * translit text to chosen destination .
     * @param text input text
     * @param lang language destination
     * @returns {string} transliterated text
     */
    perform_translit: function (text, lang) {
        var res = '';
        if (text && component) {
            if (lang === 'ru')
                res = this.translit(text, this.arrru, this.arren);
            if (lang === 'en') {

                text = this.translit(text, this.arrde, this.arrde_en);
                text = this.translit(text, this.arrpl, this.arrpl_en);
                res = this.translit(text, this.arren, this.arrru);
            }
        }
        return res;
    },
    /**
     * Method used to compare 2 objects.
     * @param {Object} one the first object
     * @param {Object} two the second object
     * @param {Array} [skippedProperties] - optional array of properties to be skipped by this comparison
     * @return {Boolean}
     */
    deepEquals: function (one, two, skippedProperties) {
        /**
         * Returns true if object one equals object two
         * @private
         * @param {Object} one
         * @param {Object} two
         * @param {Array} skippedProperties optional
         */
        function objectEquals(one, two, skippedProperties) {
            var equals = true;
            if (!one || !two) {
                return false;
            }
            if (!skippedProperties)
                skippedProperties = [];
            for (var propertyName in one) {
                if (skippedProperties.indexOf(propertyName) > -1) {
                    continue;
                }

                if (one[propertyName] != null && two[propertyName] == null) {
                    equals = false;
                } else if (one[propertyName] != null && two[propertyName] != null) {
                    if (typeof one[propertyName] == 'object' && typeof two[propertyName] == 'object') {
                        equals = equals && TK.Utils.deepEquals(one[propertyName], two[propertyName], skippedProperties);
                    } else {
                        equals = equals && (one[propertyName] == two[propertyName]);
                    }
                }
            }

            return equals;
        }

        var oneEqualsTwo = objectEquals(one, two, skippedProperties || []),
            twoEqualsOne = objectEquals(two, one, skippedProperties || []);

        return (oneEqualsTwo && twoEqualsOne);
    },
    firstContainsSecond: function (first, second, skippedProperties) {

        for (var propertyName in second) {
            if (skippedProperties.indexOf(propertyName) > -1) {
            } else if (first[propertyName] == null || first[propertyName] !== second[propertyName])
                return false;
        }
        return true;
    },
    /**
     * Метод снимает Dirty флаг со всех полей формы
     * @param doc документ
     */
    cleanDirtyFlags: function (doc, scope) {
        if (!doc || !doc.form)
            return;

        if (doc.dataObj) {
            // if(!doc.dataObj.back)
            // {
            doc.dataObj.back = {};
            doc.dataObj.back['cimSmgsCarLists'] = doc.dataObj['cimSmgsCarLists'] ? Ext.clone(doc.dataObj['cimSmgsCarLists']) : {};
            doc.dataObj.back['cimSmgsDocses7'] = doc.dataObj['cimSmgsDocses7'] ? Ext.clone(doc.dataObj['cimSmgsDocses7']) : {};
            doc.dataObj.back['cimSmgsDocses13'] = doc.dataObj['cimSmgsDocses13'] ? Ext.clone(doc.dataObj['cimSmgsDocses13']) : {};
            doc.dataObj.back['cimSmgsDocses136'] = doc.dataObj['cimSmgsDocses136'] ? Ext.clone(doc.dataObj['cimSmgsDocses136']) : {};
            doc.dataObj.back['cimSmgsPerevoz'] = doc.dataObj['cimSmgsPerevoz'] ? Ext.clone(doc.dataObj['cimSmgsPerevoz']) : {};
            doc.dataObj.back['cimSmgsPlatels'] = doc.dataObj['cimSmgsPlatels'] ? Ext.clone(doc.dataObj['cimSmgsPlatels']) : {};
            // }
        }

        var form, fields, it, l;
        form = doc.getForm();

        fields = form.getFields();
        it = fields.items;
        l = it.length;
        for (var i = 0; i < l; i++) {
            var c = it[i];
            c.originalValue = c.getValue();
        }
    },
    isFunction: function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
});
