package com.bivc.cimsmgs.upload.excel;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;

/**
 * @author p.dzeviarylin
 */
public class CellStyleSettings {

    private boolean wrapText;
    private Font font;
    private HorizontalAlignment horizontalAlignment;
    private VerticalAlignment verticalAlignment;
    private BorderStyle borderLeft;
    private BorderStyle borderRight;
    private BorderStyle borderBottom;
    private BorderStyle borderTop;
    private short rotation;

    public boolean isWrapText() {
        return wrapText;
    }

    public Font getFont() {
        return font;
    }

    public HorizontalAlignment getHorizontalAlignment() {
        return horizontalAlignment;
    }

    public VerticalAlignment getVerticalAlignment() {
        return verticalAlignment;
    }

    public BorderStyle getBorderLeft() {
        return borderLeft;
    }

    public BorderStyle getBorderRight() {
        return borderRight;
    }

    public BorderStyle getBorderBottom() {
        return borderBottom;
    }

    public BorderStyle getBorderTop() {
        return borderTop;
    }

    public short getRotation() {
        return rotation;
    }

    private CellStyleSettings(Builder builder) {
        wrapText = builder.wrapText;
        font = builder.font;
        horizontalAlignment = builder.horizontalAlignment;
        verticalAlignment = builder.verticalAlignment;
        borderLeft = builder.borderLeft;
        borderRight = builder.borderRight;
        borderBottom = builder.borderBottom;
        borderTop = builder.borderTop;
        rotation = builder.rotation;
    }

    public static Builder newBuilder() {
        return new Builder();
    }

    public static final class Builder {
        private boolean wrapText = true;
        private Font font;
        private HorizontalAlignment horizontalAlignment = HorizontalAlignment.LEFT;
        private VerticalAlignment verticalAlignment = VerticalAlignment.TOP;
        private BorderStyle borderLeft = BorderStyle.NONE;
        private BorderStyle borderRight = BorderStyle.NONE;
        private BorderStyle borderBottom = BorderStyle.NONE;
        private BorderStyle borderTop = BorderStyle.NONE;
        private short rotation = 0;

        private Builder() {
        }

        public Builder wrapText(boolean val) {
            wrapText = val;
            return this;
        }

        public Builder font(Font val) {
            font = val;
            return this;
        }

        public Builder horizontalAlignment(HorizontalAlignment val) {
            horizontalAlignment = val;
            return this;
        }

        public Builder verticalAlignment(VerticalAlignment val) {
            verticalAlignment = val;
            return this;
        }

        public Builder borderLeft(BorderStyle val) {
            borderLeft = val;
            return this;
        }

        public Builder borderRight(BorderStyle val) {
            borderRight = val;
            return this;
        }

        public Builder borderBottom(BorderStyle val) {
            borderBottom = val;
            return this;
        }

        public Builder borderTop(BorderStyle val) {
            borderTop = val;
            return this;
        }

        public Builder borders(BorderStyle val) {
            borderLeft = val;
            borderRight = val;
            borderBottom = val;
            borderTop = val;
            return this;
        }

        public Builder rotation(short val) {
            rotation = val;
            return this;
        }

        public CellStyleSettings build() {
            return new CellStyleSettings(this);
        }
    }
}
