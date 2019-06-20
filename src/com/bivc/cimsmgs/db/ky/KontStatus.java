package com.bivc.cimsmgs.db.ky;

/**
 * @author p.dzeviarylin
 */
public enum KontStatus {

    AVTO_INTO() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
//            return new KontStatusHistory(this, kont, kont.getAvtoInto());
            return null;
        }

    },
    POEZD_INTO() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
//            return new KontStatusHistory(this, kont, kont.getPoezdInto(), kont.getVagonInto());
            return null;
        }

    },
    YARD() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
//            return new KontStatusHistory(this, kont, kont.getYard());
            return null;
        }

    },
    POEZD_OUT() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
//            return new KontStatusHistory(this, kont, kont.getPoezdOut(), kont.getVagonOut());
            return null;
        }

    },
    AVTO_OUT() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
//            return new KontStatusHistory(this, kont, kont.getAvtoOut());
            return null;
        }

    },
    NO_TRANSP() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
            return new KontStatusHistory(this, kont);
        }

    },
    CANCEL() {
        @Override
        public KontStatusHistory supplyHistory(Kont kont) {
            return new KontStatusHistory(this, kont);
        }

    };

    /*private static final Map<KontLocation, Collection<KontStatus>> lookup = new EnumMap<>(KontLocation.class);
    static {
        for(KontStatus status: EnumSet.allOf(KontStatus.class)) {
            Collection<KontStatus> states = lookup.get(status.getState());
            if(states == null){
                states = new ArrayList<>();
                lookup.put(status.getState(), states);
            }
            states.add(status);
        }
    }*/

//    private KontLocation location;

    KontStatus(/*KontLocation location*/){
//        this.location = location;
    }

    /*public KontLocation getLocation(){
        return this.location;
    }*/

    /*public static Collection get(KontLocation state) {
        return lookup.get(state);
    }*/

    public abstract KontStatusHistory supplyHistory(Kont kont);
//    public abstract Kont applyStatusDateTo(Kont kont, Date date);
}
