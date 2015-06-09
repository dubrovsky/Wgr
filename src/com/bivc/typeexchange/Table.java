package com.bivc.typeexchange;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.log4j.Logger;

import java.util.Arrays;
import java.util.TreeMap;

public class Table implements java.io.Serializable
{
  private String[] columnNames;
  private String[] columnTypes;
  private Row[] data;
  private TreeMap cnMap;

  static Logger log = Logger.getLogger(Table.class);

  public Table() {
  }

  public Table(String[] columnNames, String[] columnTypes, Row[] data) {
    setColumnNames(columnNames);
    this.columnTypes = columnTypes;
    this.data = data;
  }

  public java.lang.String[] getColumnNames() {
    return columnNames;
  }

  public void setColumnNames(java.lang.String[] columnNames) {
    this.columnNames = columnNames;
    if(this.columnNames != null) {
      for(int i = 0; i < this.columnNames.length; i++) {
        this.columnNames[i] = this.columnNames[i].toUpperCase();
      }
    }
    makeCnMap();
  }

  public java.lang.String[] getColumnTypes() {
    return columnTypes;
  }

  public void setColumnTypes(java.lang.String[] columnTypes) {
    this.columnTypes = columnTypes;
  }

  public Row[] getRows() {
    return data;
  }

  public void setRows(Row[] data) {
    this.data = data;
  }

  public int rowCount() {
    int res = 0;
    if(data != null)
      res = data.length;
    return res;
  }

  public int columnCount() {
    int res = 0;
    if(columnNames != null)
      res = columnNames.length;
    return res;
  }

  public int getColumnIndex(String colName) {
//    return ArrayUtils.indexOf(columnNames, colName.toUpperCase());
    Integer res = (Integer)cnMap.get(colName.toUpperCase());
    if (res != null)
      return res.intValue();
    else
      throw new ArrayIndexOutOfBoundsException(colName);
  }

  public String getElementAt(int row, String colName) {
    String res = null;
    try {
      res = getElementAt(row, getColumnIndex(colName));
    }
    catch(ArrayIndexOutOfBoundsException ex) {
      log.warn("Column '" + colName + "' not found");
    }
    return res;
  }

  public String getElementAt(int row, int col) {
    return data[row].getData()[col];
  }

  public void setElementAt(int row, String colName, String value) {
    try {
      setElementAt(row, getColumnIndex(colName), value);
    }
    catch(ArrayIndexOutOfBoundsException ex) {
      log.warn("Column '" + colName + "' not found");
    }
  }

  public void setElementAt(int row, int col, String value) {
    data[row].getData()[col] = value;
  }

  public boolean setElementAt2(int row, String colName, String value) {
    boolean res = false;
    try {
      res = setElementAt2(row, getColumnIndex(colName), value);
    }
    catch (ArrayIndexOutOfBoundsException ex) {
      log.warn("Column '" + colName + "' not found");
    }
    return res;
  }

  public boolean setElementAt2(int row, int col, String value) {
    boolean res = !(new EqualsBuilder().append(data[row].getData()[col], value).isEquals());
    data[row].getData()[col] = value;
    return res;
  }

  public void sColumnType(int col, String colType) {
    columnTypes[col] = colType;
  }

  public void sColumnType(String colName, String colType) {
    columnTypes[getColumnIndex(colName)] = colType;
  }

  public String gColumnType(int col) {
    return columnTypes[col];
  }

  public String gColumnType(String colName) {
    return columnTypes[getColumnIndex(colName)];
  }

  public void add(Table table) {
    if (table == null) return;
//    ArrayList newRows = new ArrayList();
    int rc = table.rowCount();
    Row[] newRows = new Row[rc];
    for (int i = 0; i < rc; i++) {
      String[] str = new String[this.columnCount()];
      Arrays.fill(str, "");
      int cc = table.columnCount();
      for (int j =0; j < cc; j++) {
        try {
          str[this.getColumnIndex(table.getColumnNames()[j])] = table.getElementAt(i, j);
        }
        catch (ArrayIndexOutOfBoundsException ex) {
          log.warn("Column '" + table.getColumnNames()[j] + "' not found, ignored");
        }
      }
      newRows[i] = new Row(str);
    }
//    List rrr = Arrays.asList(this.getRows());
//    rrr = ListUtils.union(rrr, newRows);
//    this.setRows((Row[]) rrr.toArray(new Row[rrr.size()]));
    this.setRows((Row[])ArrayUtils.addAll(this.getRows(), newRows));
  }

  public void addRow(Row row) {
    if (row == null) return;
    setRows((Row[])ArrayUtils.add(this.getRows(), row));
  }

  public void removeColumn(String column) {
    removeColumn(new String[] {column});
  }

  public void removeColumn(String[] columns) {
    if (log.isDebugEnabled()) log.debug("Call removeColumns with columns=" + new ToStringBuilder(columns).append(columns).toString());
    if (log.isDebugEnabled()) log.debug("Old columns count=" + columnCount());
    boolean changed = false;
    for (int i = 0; i < columns.length; i++) {
      String colName = columns[i];
      if (colName != null) {
        colName = colName.toUpperCase();
        int colNum = ArrayUtils.indexOf(columnNames, colName);
        if (colNum >= 0) {
          columnNames = (String[])ArrayUtils.remove(columnNames, colNum);
          columnTypes = (String[])ArrayUtils.remove(columnTypes, colNum);
          changed = true;

          for (int j = 0; j < rowCount(); j++) {
            data[j].remove(colNum);
          }
        }
      }
    }
    if (changed) {
      makeCnMap();
    }
    if (log.isDebugEnabled()) log.debug("New columns count=" + columnCount());
  }

  public void appendColumn(String column, String type, String[] col) {
    String[][] rows = new String[1][col.length];
    for (int j = 0; j < col.length; j++)
      rows[0][j] = col[j];
    appendColumn(new String[] {column}, new String[] {type}, rows);
  }

  public void appendColumn(String[] columns, String[] types, String[][] rows) {
    if (log.isDebugEnabled()) log.debug("Call appendColumn with " + new ToStringBuilder(columns).append("Columns", columns)
                                                                                                .append("Types", types)
                                                                                                .toString());
    if (log.isDebugEnabled()) log.debug("Old columns count=" + columnCount());
    boolean changed = false;
    for (int i = 0; i < columns.length; i++) {
      String colName = columns[i];
      if (colName != null) {
        columnNames = (String[])ArrayUtils.add(columnNames, colName.toUpperCase());
        columnTypes = (String[])ArrayUtils.add(columnTypes, types[i]);
        changed = true;
        for (int j = 0; j < rowCount(); j++) {
          data[j].append(rows[i][j]);
        }
      }
    }
    if (changed) {
      makeCnMap();
    }
    if (log.isDebugEnabled()) log.debug("New columns count=" + columnCount());
  }

  public String toString() {
    return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
      .append("ColumnNames", getColumnNames())
      .append("ColumnTypes", getColumnTypes())
      .append("RowCount", rowCount())
      .append("Rows", getRows()).
      toString();
  }

  private void makeCnMap() {
    if (columnNames == null) {
      cnMap = null;
      return;
    }

    cnMap = new TreeMap();
    for (int i = 0; i < columnNames.length; i++)
      cnMap.put(columnNames[i].toUpperCase(), new Integer(i));
  }
}
