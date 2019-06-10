package com.bivc.cimsmgs.commons;

/**
 * Created by LDN on 17.04.2017.
 */
public enum VidOtpr {
    VAG((byte)1),
    KONT((byte)2);

    VidOtpr(byte g25) {
        this.g25 = g25;
    }

    public byte getG25() {
        return g25;
    }

    private byte g25;
}
