package Ti.DataProcessing.Tools;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(value= RetentionPolicy.RUNTIME)
public @interface DocCH {
    String ch() default "0";
    String doc() default "cmgs2";
}
