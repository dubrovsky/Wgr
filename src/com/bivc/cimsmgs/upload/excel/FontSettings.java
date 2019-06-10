package com.bivc.cimsmgs.upload.excel;

/**
 * @author p.dzeviarylin
 */
public class FontSettings {

    private int fontHeightInPoints;
    private boolean bold;

    private FontSettings(Builder builder) {
        fontHeightInPoints = builder.fontHeightInPoints;
        bold = builder.bold;
    }

    public static Builder newBuilder() {
        return new Builder();
    }

    public int getFontHeightInPoints() {
        return fontHeightInPoints;
    }

    public boolean isBold() {
        return bold;
    }


    public static final class Builder {
        private int fontHeightInPoints = 7;
        private boolean bold = false;

        private Builder() {
        }

        public Builder fontHeightInPoints(int val) {
            fontHeightInPoints = val;
            return this;
        }

        public Builder bold(boolean val) {
            bold = val;
            return this;
        }

        public FontSettings build() {
            return new FontSettings(this);
        }
    }
}
