package Ti.DataProcessing.Tools;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(value= RetentionPolicy.RUNTIME)
public @interface Info {
    String value() default "";
}
