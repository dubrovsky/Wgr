package com.bivc.cimsmgs.commons;

import java.io.UnsupportedEncodingException;
import java.text.ParsePosition;

/**
 * This class is to be used as utility for parsing and building java-style strings.
*/
public class StringParser extends java.lang.Object
{
    public final static String parse(String s,ParsePosition posi)
    {
        return parse(s.toCharArray(),posi);
    }

    public final static StringBuffer parseToBuffer(String s,ParsePosition posi)
    {
        return parseToBuffer(s.toCharArray(),posi);
    }

    public static String parse(char sa[],ParsePosition posi)
    {
        return parseToBuffer(sa,posi).toString();
    }

    public static StringBuffer parseToBuffer(char sa[],ParsePosition posi)
    {
        char c;
        int i=posi.getIndex(),iMax=sa.length;
        StringBuffer buf=new StringBuffer(iMax);

        if (sa[i]=='"')
            i++;

        while (i<iMax) {
            c=sa[i++];

            if (c=='\"') {
                posi.setIndex(i);
                return buf;
            }

            if (c=='\\') {
                c=sa[i++];
                switch (c) {
                    case 'r':
                        c='\r';
                        break;
                    case 'n':
                        c='\n';
                        break;
                    case 't':
                        c='\t';
                        break;
                    case 'b':
                        c='\b';
                        break;
                    case 'f':
                        c='\f';
                        break;
                    case '\\':
                        c='\\';
                        break;
                    case '\"':
                        c='\"';
                        break;
                    case '\'':
                        c='\'';
                        break;
                    case 'u':
                        // Unicode escape processing
                        c=(char) ((hexDigit(sa[i++])<<12)
                            | (hexDigit(sa[i++])<<8)
                            | (hexDigit(sa[i++])<<4)
                            | hexDigit(sa[i++]));
                        if (! Character.isDefined(c) )
                            c='?';
                }
            }

            buf.append(c);
        }

        posi.setIndex(iMax);
        return buf;
     }

    public final static String parse(String s)
    {
        return parse(s,new ParsePosition(0));
    }

    public final static StringBuffer parseToBuffer(String s)
    {
        return parseToBuffer(s,new ParsePosition(0));
    }

    /**
     * Encodes a given string to java-style string (i.e. surrouding it with quotes and
     * escaping any special chars in it)
    */
    public static String encode(String s)
    {
        int slen=s.length();
        StringBuffer buf = new StringBuffer(slen+2).append('"');
        char ch;
        for (int i = 0; i < slen; i++)
         switch (ch = s.charAt(i))
         {
            case '\r': buf.append("\\r"); break;
            case '\n': buf.append("\\n"); break;
            case '\t': buf.append("\\t"); break;
            case '\b': buf.append("\\b"); break;
            case '\f': buf.append("\\f"); break;
            case '\\': buf.append("\\\\"); break;
            case '\"': buf.append("\\\""); break;
            case '\'': buf.append("\\\'"); break;
            default:
              if (Character.getType(ch) == Character.CONTROL)
                toUnicodeEscape(buf,ch);
              else
                buf.append(ch);
         }
       return buf.append('"').toString();
    }

    /**
     * Encodes a given string to java-style string (i.e. surrouding it with quotes and
     * escaping any special chars in it).
     * Unlike {@link #encode(String)} method, it escapes all non-latin1 characters with
     * unicode escape syntax (\\uXXXX).
    */
    public static String encodeLatin1(String s)
    {
        StringBuffer buf = new StringBuffer();
        char ch;
        for (int i = 0; i < s.length(); i++)
         switch (ch = s.charAt(i))
         {
            case '\r': buf.append("\\r"); break;
            case '\n': buf.append("\\n"); break;
            case '\t': buf.append("\\t"); break;
            case '\b': buf.append("\\b"); break;
            case '\f': buf.append("\\f"); break;
            case '\\': buf.append("\\\\"); break;
            case '\"': buf.append("\\\""); break;
            case '\'': buf.append("\\\'"); break;
            default:
              if (!isLatin1(ch) || Character.getType(ch) == Character.CONTROL )
                toUnicodeEscape(buf,ch);
              else
                buf.append(ch);
         }
       return buf.toString();
    }


    /**
     * Transforms 1 char to unicode escape
    **/
    private final static void toUnicodeEscape(StringBuffer buf, char ch)
    {
        buf.append("\\u").append(hex2Digit(ch>>12)).append(hex2Digit(ch>>8)).append(hex2Digit(ch>>4)).append(hex2Digit(ch));
    }

    /**
     * Tests, can the given char be represented in LATIN1 charset
    **/
    public final static boolean isLatin1(char ch)
    {
        return (ch & 0xFF00)==0;
    }

    /**
     * Tests, is the given char falls into legacy ASCII charset
     */
    public final static boolean isASCII(char ch)
    {
        return (ch & 0xFF80)==0;
    }

    /**
     * Tests, is the given char falls into legacy ASCII charset and is not a control character
     * @param ch
     * @return
     */
    public final static boolean isASCIILetterOrDigit(char ch)
    {
        return isASCII(ch) && ch>=' ';
    }

// Moved from lv.fis.util.Util

    /**
        Encodes the string data into URL form, according to RFC 1738.
        Result is written into specified stringbuffer.
        @param data data to be converted
        @param encoding the java name of encoding to use when converting data
        @param sb The output stringbuffer
        @author Oleg Anastasyev
    **/
    public static void urlEncodeString(String data,String encoding, StringBuffer sb) throws UnsupportedEncodingException
    {
        byte d[]=data.getBytes(encoding);
        int dlen=d.length;

        // First character unconditionally encoded to avoid various
        // bugs of browsers (noted on Unix Netscape), that can interpret
        // &something as html special symbol
        if (dlen>0) {
            urlEncodeByte(d[0],sb);

            for (int i=1;i<dlen;i++) {
                byte b=d[i];

                // A-Z, a-z
                if ( (b>0x41 && b<0x5B) || (b>0x61 && b <0x7B) ) {
                    sb.append((char) b);
                    continue;
                }

                // Space
                if (b==0x20) {
                    sb.append('+');
                    continue;
                }

                // Control characters, remember, byte is signed in java
                if (b<0x20 && b>0) {
                    urlEncodeByte(b,sb);
                    continue;
                }

                // Non US ASCII Values, remember, byte is signed in java
                if (b<0 || b>0x7A  ) {
                    urlEncodeByte(b,sb);
                    continue;
                }

                // Other special characters
                switch ((char)b) {
                    case '%':
                    case '+':
                    case '>':
                    case '<':
                    case '"':
                    case '`':
                    case '#':
                    case '{':
                    case '}':
                    case '|':
                    case '\\':
                    case '^':
                    case '~':
                    case '[':
                    case ']':
                    case ':':
                    case ';':
                    case '/':
                    case '?':
                    case '@':
                    case '=':
                    case '&':
                        urlEncodeByte(b,sb);
                        continue;
                    default:
                        sb.append((char) b);
                } // case

            } // for
        } //if dlen
    }

    private static final void urlEncodeByte(byte b, StringBuffer out)
    {
	int i = (b >= 0)?(b):(((int)b)+256);
        out.append('%').append(hex2Digit(i/16)).append(hex2Digit(i%16));
    }

    /**
     * Evaluates the value of given hex digit (0-9,A-F)
    **/
    public final static int hexDigit(char c)
    {
        if (c>='0' && c<='9') return c-'0';
        if (c>='A' && c<='F') return c-'A'+10;
        if (c>='a' && c<='f') return c-'a'+10;

        return (int) 0;
    }

    private final static char hexes[]={'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};

    /**
     * Transforms given number from 0 to 15 to the HEX digit (0-9,A-F)
    **/
    public final static char hex2Digit(int num)
    {
        return hexes[num%16];
    }

    /**
     * Transforms the given byte value to 2 hex digit string
    **/
    public final static StringBuffer byte2hexString(byte num)
    {
        StringBuffer str = new StringBuffer(2);
        str.append(hexes[num/16]);
        str.append(hexes[num%16]);
        return str;
    }
}
