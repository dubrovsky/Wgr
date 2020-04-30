Ext.define('TK.Validators', {
    requires: [
        'Ext.util.MixedCollection'
    ],

    singleton: true,

    kontNum: function(val){
        if(!val){
            return true;
        }

        val = val.replace(/\s|-/g, '');
        /*var result = TK.Validators.kontNumLength.call(this, val);
        return Ext.isString(result) ? result : TK.Validators.kontNumLastDigit.call(this, val);*/
        var result = TK.Validators.kontNumLength(val);
        return Ext.isString(result) ? result : TK.Validators.kontNumLastDigit(val);
    },

    kontNum2: function(val){
        if(!val){
            return 'Незаполнено поле';
        }

        var result = TK.Validators.kontNumLength(val);
        return result;
        // return Ext.isString(result) ? result : TK.Validators.kontNumLastDigit(val);
    },

    kontNumLength: function(val) {
        var result = /^[a-zA-Z]{4}[0-9]{7}$/.test(val);
        if(!result) {
            return this.kontNumText;
        }
        return true;
    },

    vagNum: function(val){
        if(!val){
            return true;
        }

        val = val.replace(/\s|-/g, '');
        var result;
        switch (val.length){
            case 8:
                result = TK.Validators.vagNumShirLegth(val);
                return Ext.isString(result) ? result : TK.Validators.vagNumShirLastDigit(val);
            case 12:
                result =  TK.Validators.vagNumUzkLegth(val);
                return Ext.isString(result) ? result : TK.Validators.vagNumUzkLastDigit(val);
            default:
                return TK.Validators.vagNumLastDigitText;
        }
    },

    vagNumUzkLegth: function(val){
        var result = /^[0-9]{12}$/.test(val);
        if(!result) {
            return this.vagNumUzkText;
        }
        return true;
    },

    vagNumShirLegth: function(val){
        var result = /^[0-9]{8}$/.test(val);
        if(!result) {
            return this.vagNumShirText;
        }
        return true;
    },

    vagNumShirLastDigit: function(val){
        return TK.Validators.vagNumLastDigit(val, [2,1,2,1,2,1,2], 7);
    },

    vagNumUzkLastDigit: function(val){
        return TK.Validators.vagNumLastDigit(val, [2,1,2,1,2,1,2,1,2,1,2], 11);
    },

    vagNumLastDigit: function(val, multipliers, index) {
        var multArr = [],
            sum = 0;

        val = val.split("");
        for(var i = 0; i < index; i++){
            multArr.push(parseInt(val[i]) * multipliers[i]);
        }

        multArr = multArr.join("").split("");

        for(i = 0; i < multArr.length; i++){
            sum += parseInt(multArr[i]);
        }

        var nearestUp10 = Math.ceil(sum / 10) * 10;
        var result = nearestUp10 - sum;
        return result === parseInt(val[index]) ? true : this.vagNumLastDigitText;
    },

    kontNumLastDigit: function (val) {
       var multipliers = [1,2,4,8,16,32,64,128,256,512],
           remainders = [0,1,2,3,4,5,6,7,8,9,0],
           equivalent = {A: 10, B: 12, C: 13, D: 14, E: 15, F: 16, G: 17, H: 18, I: 19, J: 20, K: 21, L: 23, M: 24, N: 25, O: 26, P: 27, Q: 28, R: 29, S: 30, T: 31, U: 32, V: 34, W: 35, X: 36, Y: 37, Z: 38},
           equivalents = new Ext.util.MixedCollection(),
           sum = 0;

        equivalents.addAll(equivalent);
        val = val.split("");
        for(var i = 0; i < 4; i++){
            sum += equivalents.get(val[i].toUpperCase()) * multipliers[i];
        }

        for(; i < 10; i++){
            sum += parseInt(val[i]) * multipliers[i];
        }
        var result = remainders[sum % 11];
        return result === parseInt(val[10]) ? true : this.kontNumLastDigitText;
    },
    validExcel:function (value) {
        var ext=value.split('.').pop().toLowerCase();
        if(ext==='xls'||ext==='xlsx')
            return true;
        return TK.Validators.notXLS;
    }


});
