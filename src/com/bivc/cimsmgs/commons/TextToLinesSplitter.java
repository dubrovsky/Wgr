package com.bivc.cimsmgs.commons;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;

import java.awt.*;
import java.awt.font.FontRenderContext;
import java.util.StringTokenizer;

public class TextToLinesSplitter {
    /*// required
    private String text;*/

    private static int fontHeightPt = 10; // points

    private static final int pointsPerInch = 72; // postscript points per inch

    private static int pixelsPerInch = 96; // default px per inch in a monitor

    private static String fontName = null;
    //font family name
    public final static String FONT_DIALOG = Font.DIALOG;
    public final static String FONT_DIALOG_INPUT = Font.DIALOG_INPUT;
    public final static String FONT_MONOSPACED = Font.MONOSPACED;
    public final static String FONT_SERIF = Font.SERIF;
    public final static String FONT_SANS_SERIF = Font.SANS_SERIF;

    public final static int FONT_PLAIN = Font.PLAIN;
    public final static int FONT_BOLD = Font.BOLD;
    public final static int FONT_ITALIC = Font.ITALIC;

    private static int fontWeight = FONT_PLAIN;

    private static String nlChar = "\n";
    /*// required
    private int columnWidth;   // px*/

    /*// private constructor to defer responsibility to Builder.
    private WordSplitter() {
    }*/

    /*public TextToLinesSplitter(String text, int columnWidth) {
        setText(text);
        setColumnWidth(columnWidth);
    }*/

    /*public String getText() {
        return this.text;
    }

    public void setText(final String text) {
        if (StringUtils.isBlank(text)) {
            throw new IllegalArgumentException("splitter.text must not be blank");
        }
        this.text = text;
    }*/

    public static String getNlChar() {
        return nlChar;
    }

    public static void setNlChar(String nlChar) {
        TextToLinesSplitter.nlChar = nlChar;
    }

    public static int getPixelsPerInch() {
        return pixelsPerInch;
    }

    public static void setPixelsPerInch(int pixelsPerInch) {
        TextToLinesSplitter.pixelsPerInch = pixelsPerInch;
    }

    public static int getFontHeightPt() {
        return fontHeightPt;
    }

    public static void setFontHeightPt(int fontHeightPt) {
        fontHeightPt = fontHeightPt;
    }

    public static int getFontWeight() {
        return fontWeight;
    }

    public static void setFontWeight(int fontWeight) {
        fontWeight = fontWeight;
    }

    public static String getFontName() {
        return fontName;
    }

    public static void setFontName(String fontName) {
        fontName = fontName;
    }

    /*public int getColumnWidth() {
        return columnWidth;
    }

    public void setColumnWidth(final int width) {
        if (width < 1) {
            throw new IllegalArgumentException("splitter.columnWidth must not be < 1");
        }
        this.columnWidth = width;
    }*/


    // builder class to ensure that all required fields are set while avoiding clunky, "telescopic" constructors
    /*public static class Builder {
        private WordSplitter built;

        public Builder() {
            built = new WordSplitter();
        }

        public Builder setText(final String text) {
            built.setText(text);
            return this;
        }

        public Builder setColumnWidth(final int width) {
            built.setColumnWidth(width);
            return this;
        }

        public WordSplitter build() {
            if (built.text == null) {
                throw new IllegalStateException("splitter.text is required");
            }

            if (built.columnWidth < 1) {
                throw new IllegalStateException("splitter.columnWidth must not be < 1");
            }

            return built;
        }
    }*/

    private static String wrapText(String text, int columnWidth){
        return WordUtils.wrap(text, countSimbolsInColumn(text, columnWidth));
    }

    public static int countLinesInText(String text, int columnWidth){
        int count = 0;
        if(StringUtils.isNotBlank(text)) {
            StringTokenizer tokenizer = new StringTokenizer(text, nlChar);   // check for nl simbols in source
            String substring;
            count = tokenizer.countTokens();
            while (tokenizer.hasMoreTokens()){
                substring =  tokenizer.nextToken();
                count += StringUtils.countMatches(wrapText(substring, columnWidth), System.getProperty("line.separator"));
            }
//            count++;  // return at list 1, as StringUtils.countMatches return 0 for only one string
        }
        return count;  // count new lines simbols
    }

    private static int countSimbolsInColumn(String text, int columnWidth){
        int fontSizePx = countFontSizePx();
        double textWidth = countTextWidth(text, fontSizePx);    // px
        double simbolAvrgWidth = Math.ceil(textWidth / text.length()); // px
        double simbolsInColumn = Math.floor(columnWidth / simbolAvrgWidth);
        return (int) simbolsInColumn;
    }

    private static int countFontSizePx(){
        double ratio = (double)pixelsPerInch / (double)pointsPerInch;
        return (int) (fontHeightPt * ratio);
    }

    public static int getScreenResolution(){
        int resolution = -1;
        try{
            resolution = Toolkit.getDefaultToolkit().getScreenResolution();
        } catch (HeadlessException ex){
            System.out.println("ERROR! Use it in only when GraphicsEnvironment is available, in Desktop apps for example");
        }
        return resolution;
    }

    private static double countTextWidth(String text, int fontSizePx) {
        Font currFont = createFont(fontSizePx);
        FontRenderContext fontContext = getFontRenderContext(currFont);
        return currFont.getStringBounds(text, fontContext).getWidth();
    }

    /*private static double countTextWidth(String text, int fontSizePx) {
        Font currFont = new Font(fontName, fontWeight, 13);
        BufferedImage img = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
        FontMetrics fm = img.getGraphics().getFontMetrics(currFont);
        return fm.stringWidth(text);
    }*/

    private static Font createFont(int fontSizePx){
        return new Font(fontName, fontWeight, fontSizePx);
    }

    private static FontRenderContext getFontRenderContext(Font currFont) {
        return new FontRenderContext(currFont.getTransform(), RenderingHints.VALUE_TEXT_ANTIALIAS_DEFAULT, RenderingHints.VALUE_FRACTIONALMETRICS_DEFAULT);
    }

}
