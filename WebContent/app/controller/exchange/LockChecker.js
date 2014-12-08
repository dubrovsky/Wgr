Ext.define('TK.controller.exchange.LockChecker', {
    extend: 'Ext.app.Controller',

    isStatusLocked: function (tbc, iftmin, fts, btlc, tdgFts) {

        if(tbc){     // no in cimsmgs
            switch (tbc.toString()) {
                case '8':
                case '1':
                case '2':
                case '3':
                case '4':
                    return true;
            }
        }

        switch (iftmin.toString()) {
            case '22':
            case '24':
                return true;
        }

        switch (fts.toString()) {
            case '25':
            case '27':
                return true;
        }

        switch (btlc.toString()) {
            case '39':
            case '41':
                return true;
        }

        switch (tdgFts.toString()) {
            case '44':
            case '46':
                return true;
        }

        return false;
    }
});
