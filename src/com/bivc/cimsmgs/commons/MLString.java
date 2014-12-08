/**
 * Created on 04.10.2002
 */
package com.bivc.cimsmgs.commons;

import java.text.ParsePosition;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.ResourceBundle;

//import lv.fis.app.DefaultAppFactory;

/**
 * This is a string, which can store representations of the same string in multiple languages at once.
 * It is primarily designed to store it's state in single varchar column of the single record
 * (in opposite to LocalizedString component, which stores different languages in different records
 * of the dedicated table).
 *
 * To accomplish this, MLString has 2 methods: marshal and unmarshal, which transforms a multiple strings to and from
 * single string.
 *
 * This class can be used as attribute type in ejb models and can be stored by Hibernate using
 * lv.fis.hib.MLStringType custom datatype.
 *
 * This class needs to know default language used in application to operate properly. You can either supply it in it;s
 * constructor or just leave it unspecified, so MLString gets it from AppFactory facility.
 *
 *
 * @author oleg
 */
public class MLString implements /*ILocalizedValue,*/ Comparable<Object> {

    private static final long serialVersionUID = 100L;

    /** Strings in multiple languages
     * Key: Language ISO code (ru,en,lv and so on)
     * Value: String
     */
    private Map<String, String> strs=new HashMap<String, String>(10);

    private String def_language;

    /**
     * Constructor for MLString.
     * Consults app factory for default slanguage
     */
    public MLString() {
        super();
    }

    /**
     * Constructor of MLString.
     * @param default_language the default language to use
     */
    public MLString(String default_language)
    {
        def_language=default_language;
    }


    /**
     * Constructor of MLString to deep copy the source object
     */
    public MLString(MLString src)
    {
        this(src.def_language);
        strs.putAll(src.strs);
    }



    public String getDefaultLanguageCode()
    {
//        if (def_language==null)
//            def_language=DefaultAppFactory.getInstance().getDefaultLanguageCode();

        return def_language;
    }

    /**
     * Method setText sets the new value for specified language
     * @param lang language ISO code
     * @param text national text
     */
    public void setText(String lang,String text)
    {
	if (text == null) {
	    strs.remove(lang);
	}
	else {
	    strs.put(lang, text);
	}
    }

    /**
     * Method setDefaultText sets new text for default language
     * @param text new default language text
     */
    public void setDefaultText(String text) {
        setText(getDefaultLanguageCode(), text);
    }

    /**
     * Method clear clears all multilingual texts from this string, so it becomes empty
     */
    public void clear() {
        strs.clear();
    }

    /**
     * Method getLText obtains a text in specified language.
     * If text in specified language is not found (was not specified) then return null
     *
     * @param lang language ISO code
     * @return String in desired language or null
     */
    public final String getLText(String lang) {
        return strs.get(lang);
    }

    /**
     * Method getText obtains a text in specified language. If text in specified language is not found (was not specified) the default
     * language's text is returned.
     *
     * @param lang language ISO code
     * @return String in desired language or in default one
     */
    public String getText(String lang) {
        Object t=strs.get(lang);

        return t==null ? getDefaultText() : (String) t;
    }

    /**
     * Method getDefaultText obtains a text of this string in default application language
     * @return String text or null, if not set yet
     */
    private String getDefaultText() {
        return strs.get(getDefaultLanguageCode());
    }

    /**
     * Check is empty MLString.
     *
     * @return a <code>true</code> if not specified text for any language
     */
    public final boolean isEmpty() {
	return this.strs.isEmpty();
    }

    /**
     * Concatenates this string and secord one in all languages.
     * The result is ML String, which in all languages has concatenated
     * content.
     * If text for language, which exists in this string not found in
     * second one - the default language's text used in place of national one.
     *
     * @param second multilanguage string to concatenate with
     *
     * @return new MLString with texts like this.getText+second.getText in all languages of this MLString
     */
    public MLString concat(MLString second)
    {
        MLString result = new MLString(getDefaultLanguageCode());

        for (Iterator<String> it = strs.keySet().iterator(); it.hasNext();) {
            String lang = it.next();

            result.setText(lang, getText(lang)+second.getText(lang));
        }

        return result;
    }

    /**
     * Concatenates this string and secord one in all languages.
     * The result is ML String, which in all languages has concatenated
     * content.
     *
     * @param second string to concatenate with
     *
     * @return new MLString with texts like this.getText+second in all languages of this MLString
     */
    public MLString concat(String second) {
        MLString result = new MLString(getDefaultLanguageCode());

        for (Iterator<String> it = strs.keySet().iterator(); it.hasNext();) {
            String lang = it.next();

            result.setText(lang, getText(lang)+second);
        }

        return result;
    }

    /**
     * Marshals the entire object (i.e. texts in all languages) into 1 string, so it can be stored then into single column.
     * @return marshalled object's String
     */
    public String marshal()
    {
        StringBuffer sb=new StringBuffer(100);

        for (Iterator<?> it = strs.entrySet().iterator(); it.hasNext();) {
            Map.Entry<?,?> e = (Map.Entry<?,?>) it.next();
            String lang=(String) e.getKey();
            String text = (String) e.getValue();

            sb.append(lang).append(StringParser.encode(text));
        }

        return sb.toString();
    }

    /**
     * Unmarshals data from previously marshalled string into this object
     * @param marshalled previously marshalled string by marshal()
     *
     * @return this object
     */
    public MLString unmarshal(String marshalled)
    {
        return unmarshal(marshalled,new ParsePosition(0));
    }

    /**
     * Unmarshals data from previously marshalled string into this object
     * @param marshalled previously marshalled string by marshal()
     *
     * @return this object
     */
    public MLString unmarshal(String marshalled,ParsePosition pp)
    {
        strs.clear();
        if (marshalled==null)
            return this;

        int len=marshalled.length();
        char[] cmsh=marshalled.toCharArray();
        String lang;

        while ( (lang=parseLang(cmsh,pp,len))!=null ) {
            String text=StringParser.parse(cmsh, pp);

            if (text!=null)
                strs.put(lang, text);
        }

        return this;
    }

    /**
     * Method parseLang parses a 2 char language code from current parse position
     * @param cmsh
     * @param pp
     * @param len
     * @return String
     */
    private String parseLang(char[] cmsh, ParsePosition pp, int len)
    {
        int idx=pp.getIndex();
        if (idx+2>=len)
            return null;

        pp.setIndex(idx+2);

        return new String(cmsh,idx,2);
    }

    public boolean equals(MLString obj) {
        return strs.equals(obj.strs);
    }

    public boolean equals(Object obj) {
        if (obj instanceof MLString)
            return equals((MLString) obj);

        return false;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        String s=getDefaultText();

        return s==null ? 0 : s.hashCode();
    }

    /* (non-Javadoc)
     * @see java.lang.Comparable#compareTo(Object)
     */
    public int compareTo(Object o) {
        if (o instanceof String) {
            String s = (String) o;
            return getDefaultText().compareTo(s);
        }

        if (o instanceof MLString) {
            MLString ms = (MLString) o;
            return getDefaultText().compareTo(ms.getDefaultText());
        }

        throw new IllegalArgumentException("MLString.compareTo: Accept only String or MLString objects");
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return getDefaultText();
    }

//    public static void main(String[] args) {
//        MLString ms = new MLString("en");
//
//        ms.setDefaultText("\"Fuck you!\"");
//        ms.setText("ru", "Ne \"ebet");
//        ms.setText("lv", "Mans 'ir pohujs!");
//
//        String m=ms.marshal();
//        System.out.println("Marshalled to:"+m);
//
//        MLString ms2=new MLString("en");
//
//        ms2.unmarshal(m);
//
//        if (!ms2.equals(ms))
//            System.out.println("MLStrings not equal after unmarshalling");
//        else
//            System.out.println("Umarshalling test completed OK");
//    }


    /**
     * Method getText gets a text of this string in one of bundles locales,
     * traversing them from 0 to max index.
     *
     * @param bundles to take locales of
     * @return text in one of bundle's locale or in default locale if neither of
     *          locales' text found
     */
    public String getText(ResourceBundle[] bundles)
    {
        final int imax=bundles.length;

        for (int i=0;i<imax;i++) {
            Object o=strs.get(bundles[i].getLocale().getLanguage());
            if (o!=null)
                return (String) o;
        }

        return getDefaultText();
    }

// --------------- ILocalizedValue interface ---------------

    /**
     * Get localized presentation.
     *
     * @param bundles a resource bundles for localization.
     * @return localized presentation.
     */
    public String getString(ResourceBundle[] bundles) {
        return getText(bundles);
    }


}
