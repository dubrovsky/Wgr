package com.bivc.typeexchange;

import org.apache.commons.lang3.builder.*;
import org.apache.commons.lang3.ArrayUtils;

public class Row  implements java.io.Serializable {
    private java.lang.String[] data;

    public Row() {
      data = null;
    }

    public Row(String[] data) {
      this.data = data;
    }

    public java.lang.String[] getData() {
        return data;
    }

    public void setData(java.lang.String[] data) {
        this.data = data;
    }

    public String toString() {
      return new ToStringBuilder(this).append("Row", getData()).toString();
    }

    public void remove(int index) {
      data = (String[])ArrayUtils.remove(data, index);
    }

    public void append(String elem) {
      data = (String[])ArrayUtils.add(data, elem);
    }

}
