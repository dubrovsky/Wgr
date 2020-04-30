Ext.define('TK.VTypes', {
    singleton: true,

    alphanum: /^[a-zA-Z0-9_-]+$/,
    alphanumMask: /[a-z0-9_-]/i,

    textnum: /^\d+(\.\d{1,2})?$/,
    textnumMask: /[0-9\.]/i,

    kontnum: /^[a-zA-Z]{4}[0-9]{7}$/,
    kontnumMask: /[a-zA-Z0-9]/i,

    kontUniqueText: 'Это поле должно содержать уникальный номер контейнера',
    vagUniqueText: 'Это поле должно содержать уникальный номер вагона',

    shirvagnum: /^[0-9]{8}$/,
    vagnumMask: /[0-9]/i,
    shirvagnumText: 'Это поле должно содержать номер широкого вагона в формате 12345678',

    uzvagnum: /^[0-9]{4}-[0-9]{8}$/,
    uzvagnumText: 'Это поле должно содержать номер узкого вагона в формате 1234-12345678',

    /*uzvagnum: /^[0-9]{7}$/,
    uzvagnumText: 'Это поле должно содержать номер узкого вагона в формате 12345678',*/


    init:function() {
        this.passCheck();
        this.loginCheck();
        this.textNumCheck();
        this.kontNumCheck();
        this.shirvagNumCheck();
        this.uzvagNumCheck();
        this.vagShirNumCheck();
        this.vagUzkyNumCheck();
        this.vagUniqueCheck();
        this.kontInAvtoUniqueCheck();
        this.kontInPoezdUniqueCheck();
        this.fileCheck();
    },

    passCheck: function() {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field){
                if (field.initPassFld) {
                    var pwd = field.ownerCt.getForm().findField(field.initPassFld);
                    return (val == pwd.getValue());
                }
                return me.alphanum.test(val);
            },
            passwordText: me.vTypeLabelPass,
            passwordMask: me.alphanumMask
        });
    },
    loginCheck: function() {
        var me = this;

        Ext.apply(Ext.form.field.VTypes, {
            login:  function(val, field){
                var panel = field.ownerCt;
                if (panel.mode != 'edit' && val) {
                    var userlist = Ext.ComponentQuery.query('viewport > tabpanel > userlist')[0],
                        arr = userlist.getStore().collect('usr.un');
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].toLowerCase() == val.toLowerCase()) {
                            return false;
                        }
                    }
                }
                return me.alphanum.test(val);
            },
            loginText: me.vTypeLabelLogin,
            loginMask: me.alphanumMask
        });
    },
    textNumCheck: function() {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            textNum: function (val, field) {
                return me.textnum.test(val);
            },
            textNumText: 'Неверный формат числа',
            textNumMask: me.textnumMask
        });
    },
    kontNumCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            kontNum: function (val, field) {
                return me.kontnum.test(val);
            },
            kontNumText: 'Это поле должно содержать номер контейнера в формате ABCD1234567',
            kontNumMask: me.kontnumMask
        });
    },
    kontInPoezdUniqueCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            kontInPoezdUnique: function (val, field) {
                var form = field.up('form'),
                    poezd = form.getRecord().getPoezd(),
                    id = form.getRecord().getId(),
                    success = true;

                poezd.vagons().each(function(vagon){
                    vagon.konts().each(function(kont){
                        var self = kont.getId() === id;
                        if(!self && kont.get('nkon') === val){
                            success = false;
                        }
                        return success;
                    });
                    return success;
                });

                return success;
            },
            kontInPoezdUniqueText: me.kontUniqueText,
            kontInPoezdUniqueMask: me.kontnumMask
        });
    },
    kontInAvtoUniqueCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            kontInAvtoUnique: function (val, field) {
                var form = field.up('form'),
                    avto = form.getRecord().getAvto(),
                    id = form.getRecord().getId(),
                    success = true;

                avto.konts().each(function(kont){
                    var self = kont.getId() === id;
                    if(!self && kont.get('nkon') === val){
                        success = false;
                    }
                    return success;
                });

                return success;
            },
            kontInAvtoUniqueText: me.kontUniqueText,
            kontInAvtoUniqueMask: me.kontnumMask
        });
    },
    vagShirNumCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            vagShirNum: function (val, field) {
                /*var form = field.up('form'),
                    poezd = form.getRecord().getPoezd(),
                    koleya = poezd.get('koleya');*/

                //if(koleya === 1){
                    Ext.apply(Ext.form.field.VTypes, {
                        vagShirNumText: me.shirvagnumText,
                        vagShirNumMask: me.vagnumMask
                    });

                    return me.testShirVagNum(val);
                /*} else {
                    Ext.apply(Ext.form.field.VTypes, {
                        vagNumText: me.uzvagnumText,
                        vagNumMask: me.vagnumMask
                    });

                    return me.testUzVagNum(val);
                }*/
            }
        });
    },
    vagUzkyNumCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            vagUzkyNum: function (val, field) {
                /*var form = field.up('form'),
                    poezd = form.getRecord().getPoezd(),
                    koleya = poezd.get('koleya');*/

                /*if(koleya === 1){
                    Ext.apply(Ext.form.field.VTypes, {
                        vagNumText: me.shirvagnumText,
                        vagNumMask: me.vagnumMask
                    });

                    return me.testShirVagNum(val);
                } else {*/
                    Ext.apply(Ext.form.field.VTypes, {
                        vagUzkyNumText: me.uzvagnumText,
                        vagUzkyNumMask: me.vagnumMask
                    });

                    return me.testUzVagNum(val);
                //}
            }
        });
    },
    vagUniqueCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            vagUnique: function (val, field) {
                var form = field.up('form'),
                    poezd = form.getRecord().getPoezd(),
                    id = form.getRecord().getId(),
                    success = true;

                poezd.vagons().each(function(vagon){
                    var self = vagon.getId() === id;
                    if(!self && vagon.get('nvag') === val){
                        success = false;
                    }
                    return success;
                });

                return success;
            },
            vagUniqueText: me.vagUniqueText,
            vagUniqueMask: me.vagnumMask
        });
    },

    shirvagNumCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            shirvagNum: function (val, field) {
                 return me.testShirVagNum(val);
            },
            shirvagNumText: me.shirvagnumText,
            shirvagNumMask: me.vagnumMask
        });
    },
    uzvagNumCheck: function(){
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
            shirvagNum: function (val, field) {
                return me.testUzVagNum(val);
            },
            uzvagNumText: me.uzvagnumText,
            uzvagNumMask: me.vagnumMask
        });
    },

    testShirVagNum: function(val){
        return this.shirvagnum.test(val);
    },
    testUzVagNum: function(val){
        return this.uzvagnum.test(val);
    },
    fileCheck: function(val, field) {
        Ext.apply(Ext.form.field.VTypes, {
            file: function(val, field) {
                var types = field.acceptMimes ||['png', 'jpeg','jpg'],
                    acceptSize = field.acceptSize|| 65535,
                    size=field.el.down('input[type=file]').dom.files[0].size;
                if(size&&size>acceptSize) {
                    this.fileText=this.msgInvalidFsize+acceptSize;
                    return false;
                }
                ext = val.substring(val.lastIndexOf('.') + 1).toLowerCase();
                if(Ext.Array.indexOf(types, ext) === -1) {
                    this.fileText= this.msgInvalidFType+types;
                    return false;
                }
                return true;
            },
            fileText: '!Invalid file type or size'
        });
    }
});