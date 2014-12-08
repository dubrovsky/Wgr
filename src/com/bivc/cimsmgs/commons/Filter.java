package com.bivc.cimsmgs.commons;

import java.io.Serializable;

public class Filter implements Serializable{
  private String status;
  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
