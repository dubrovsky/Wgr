package com.bivc.cimsmgs.interceptors;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class ParamsInterceptor implements Interceptor
{
  public void destroy()
  {
  }

  public void init()
  {
  }

  public String intercept(ActionInvocation actionInvocation) throws Exception
  {
    Map<?, ?> params = actionInvocation.getInvocationContext().getParameters();
    Collection<?> values = params.values();
    ArrayList<Object> toRemove = new ArrayList<Object>();
    String[] param;
    for(Object elem : values)
    {
        try
        {
          param = ((String[])elem);
          if(param.length == 1 && param[0] == "")
            toRemove.add(elem);
        }
        catch(Exception ex){}
    }
    values.removeAll(toRemove);
    return actionInvocation.invoke();
  }
}
