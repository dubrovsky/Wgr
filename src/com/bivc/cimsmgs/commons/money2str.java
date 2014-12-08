package com.bivc.cimsmgs.commons;


/*
 *  Класс money2str - Приведение денежного выражения к строковому
 *  25/06/2003 Алексей Федоров
 *
 *  Разрешается использование без всех известных мне ограничений
 *  Выражаю благодарность неизвестному программисту
 *  описавшему алгоритм этой задачи
 */

public class money2str {
  static String RubOneUnit, RubTwoUnit, RubFiveUnit, RubSex,
  KopOneUnit, KopTwoUnit, KopFiveUnit, KopSex;
  StringBuffer money2str = new StringBuffer();

  public money2str(Double theMoney, String theISOstr)
  {
    FillSuffix(theISOstr);
    moneytostr(theMoney);
  }

  public void FillSuffix(String theISOstr)
  {
//    org.w3c.dom.Document xmlDoc = null;
//
//    javax.xml.parsers.DocumentBuilderFactory DocFactory = javax.xml.parsers.
//        DocumentBuilderFactory.newInstance();
//
//    try {
//      javax.xml.parsers.DocumentBuilder xmlDocBuilder = DocFactory.
//          newDocumentBuilder();
//      xmlDoc = xmlDocBuilder.parse(new URL("/currlist.xml").openStream());
//    }
//    catch (org.xml.sax.SAXException sxe) {
//      Exception x = sxe;
//      if (sxe.getException() != null)
//        x = sxe.getException();
//      x.printStackTrace();
//    }
//    catch (javax.xml.parsers.ParserConfigurationException pce) {
//      pce.printStackTrace();
//    }
//    catch (java.io.IOException ioe) {
//      ioe.printStackTrace();
//    }
//    org.w3c.dom.Element theISOElement = (org.w3c.dom.Element) (xmlDoc.
//        getElementsByTagName(theISOstr)).item(0);

//    org.dom4j.io.SAXReader rdr = new org.dom4j.io.SAXReader();
//    try
//    {
//      org.dom4j.Node nd4j = rdr.read(getClass().getResource("/currlist.xml")).getRootElement();
//      List<DefaultElement> lst = nd4j.selectNodes(theISOstr);
//      DefaultElement theISOElement = lst.get(0);
//
//      RubOneUnit = theISOElement.attributeValue("RubOneUnit");
//      RubTwoUnit = theISOElement.attributeValue("RubTwoUnit");
//      RubFiveUnit = theISOElement.attributeValue("RubFiveUnit");
//      KopOneUnit = theISOElement.attributeValue("KopOneUnit");
//      KopTwoUnit = theISOElement.attributeValue("KopTwoUnit");
//      KopFiveUnit = theISOElement.attributeValue("KopFiveUnit");
//      RubSex = theISOElement.attributeValue("RubSex");
//      KopSex = theISOElement.attributeValue("KopSex");
//    }
//    catch(DocumentException ex)
//    {
//    }

    RubOneUnit = "";
    RubTwoUnit = "";
    RubFiveUnit = "";
    KopOneUnit = "";
    KopTwoUnit = "";
    KopFiveUnit = "";
    RubSex = "M";
    KopSex = "M";

  }

  public void moneytostr(Double theMoney) {
    int triadNum = 0;
    int theTriad;

    int intPart = theMoney.intValue();
//    int fractPart = (int) Math.round( (theMoney.doubleValue() - intPart) * 100);
    if (intPart == 0)
      money2str.append("Ноль ");
    do {
      theTriad = intPart % 1000;
      money2str.insert(0, triad2Word(theTriad, triadNum, RubSex));
      if (triadNum == 0) {
        int range10 = (theTriad % 100) / 10;
        int range = theTriad % 10;
        if (range10 == 1) {
          money2str = money2str.append(RubFiveUnit);
        }
        else {
          switch (range) {
            case 1:
              money2str = money2str.append(RubOneUnit);
              break;
            case 2:
            case 3:
            case 4:
              money2str = money2str.append(RubTwoUnit);
              break;
            default:
              money2str = money2str.append(RubFiveUnit);
              break;
          }
        }
      }
//      intPart = intPart / 1000;
//      triadNum++;
//    }
//    while (theTriad != 0);
      intPart = intPart / 1000;
      triadNum++;
    }
    while (intPart > 0);

//    money2str = money2str.append(" ").append(triad2Word(fractPart, 0, KopSex));
//    if ( (fractPart % 10) == 1) {
//      money2str = money2str.append(KopOneUnit);
//    }
//    else {
//      switch (fractPart % 10) {
//        case 1:
//          money2str = money2str.append(KopOneUnit);
//          break;
//        case 2:
//        case 3:
//        case 4:
//          money2str = money2str.append(KopTwoUnit);
//          break;
//        default:
//          money2str = money2str.append(KopFiveUnit);
//          break;
//      }
//    }
    money2str.setCharAt(0, Character.toUpperCase(money2str.charAt(0)));
  }

  static private String triad2Word(int triad, int triadNum, String Sex) {
    StringBuffer triadWord = new StringBuffer(28); // девятьсот восемьдесят четыре - 28 достаточно ?

    if (triad == 0) {
      return triadWord.toString();
    }

    int range = triad / 100;
    switch (range) {
      default:
        break;
      case 1:
        triadWord = triadWord.append("сто ");
        break;
      case 2:
        triadWord = triadWord.append("двести ");
        break;
      case 3:
        triadWord = triadWord.append("триста ");
        break;
      case 4:
        triadWord = triadWord.append("четыреста ");
        break;
      case 5:
        triadWord = triadWord.append("пятьсот ");
        break;
      case 6:
        triadWord = triadWord.append("шестьсот ");
        break;
      case 7:
        triadWord = triadWord.append("семьсот ");
        break;
      case 8:
        triadWord = triadWord.append("восемьсот ");
        break;
      case 9:
        triadWord = triadWord.append("девятьсот ");
        break;
    }

    range = (triad % 100) / 10;
    switch (range) {
      default:
        break;
      case 2:
        triadWord = triadWord.append("двадцать ");
        break;
      case 3:
        triadWord = triadWord.append("тридцать ");
        break;
      case 4:
        triadWord = triadWord.append("сорок ");
        break;
      case 5:
        triadWord = triadWord.append("пятьдесят ");
        break;
      case 6:
        triadWord = triadWord.append("шестьдесят ");
        break;
      case 7:
        triadWord = triadWord.append("семьдесят ");
        break;
      case 8:
        triadWord = triadWord.append("восемьдесят ");
        break;
      case 9:
        triadWord = triadWord.append("девяносто ");
        break;
    }

    int range10 = range;
    range = triad % 10;
    if (range10 == 1) {
      switch (range) {
        case 0:
          triadWord = triadWord.append("десять ");
          break;
        case 1:
          triadWord = triadWord.append("одиннадцать ");
          break;
        case 2:
          triadWord = triadWord.append("двенадцать ");
          break;
        case 3:
          triadWord = triadWord.append("тринадцать ");
          break;
        case 4:
          triadWord = triadWord.append("четырнадцать ");
          break;
        case 5:
          triadWord = triadWord.append("пятнадцать ");
          break;
        case 6:
          triadWord = triadWord.append("шестнадцать ");
          break;
        case 7:
          triadWord = triadWord.append("семнадцать ");
          break;
        case 8:
          triadWord = triadWord.append("восемнадцать ");
          break;
        case 9:
          triadWord = triadWord.append("девятнадцать ");
          break;
      }
    }
    else {
      switch (range) {
        default:
          break;
        case 1:
          if (triadNum == 1)
            triadWord = triadWord.append("одна ");
          else
          if (Sex.equals("M"))
            triadWord = triadWord.append("один ");
          if (Sex.equals("F"))
            triadWord = triadWord.append("одна ");
          break;
        case 2:
          if (triadNum == 1)
            triadWord = triadWord.append("две ");
          else
          if (Sex.equals("M"))
            triadWord = triadWord.append("два ");
          if (Sex.equals("F"))
            triadWord = triadWord.append("две ");
          break;
        case 3:
          triadWord = triadWord.append("три ");
          break;
        case 4:
          triadWord = triadWord.append("четыре ");
          break;
        case 5:
          triadWord = triadWord.append("пять ");
          break;
        case 6:
          triadWord = triadWord.append("шесть ");
          break;
        case 7:
          triadWord = triadWord.append("семь ");
          break;
        case 8:
          triadWord = triadWord.append("восемь ");
          break;
        case 9:
          triadWord = triadWord.append("девять ");
          break;
      }
    }

    switch (triadNum) {
      default:
        break;
      case 1:
        if (range10 == 1)
          triadWord = triadWord.append("тысяч ");
        else {
          switch (range) {
            default:
              triadWord = triadWord.append("тысяч ");
              break;
            case 1:
              triadWord = triadWord.append("тысяча ");
              break;
            case 2:
            case 3:
            case 4:
              triadWord = triadWord.append("тысячи ");
              break;
          }
        }
        break;
      case 2:
        if (range10 == 1)
          triadWord = triadWord.append("миллионов ");
        else {
          switch (range) {
            default:
              triadWord = triadWord.append("миллионов ");
              break;
            case 1:
              triadWord = triadWord.append("миллион ");
              break;
            case 2:
            case 3:
            case 4:
              triadWord = triadWord.append("миллиона ");
              break;
          }
        }
        break;
      case 3:
        if (range10 == 1)
          triadWord = triadWord.append("миллиардов ");
        else {
          switch (range) {
            default:
              triadWord = triadWord.append("миллиардов ");
              break;
            case 1:
              triadWord = triadWord.append("миллиард ");
              break;
            case 2:
            case 3:
            case 4:
              triadWord = triadWord.append("миллиарда ");
              break;
          }
        }
        break;
      case 4:
        if (range10 == 1)
          triadWord = triadWord.append("триллионов ");
        else {
          switch (range) {
            default:
              triadWord = triadWord.append("триллионов ");
              break;
            case 1:
              triadWord = triadWord.append("триллион ");
              break;
            case 2:
            case 3:
            case 4:
              triadWord = triadWord.append("триллиона ");
              break;
          }
        }
        break;
    }
    return triadWord.toString();
  }

  public StringBuffer getMoney2str()
  {
    return money2str;
  }

  public void setMoney2str(StringBuffer money2str)
  {
    this.money2str = money2str;
  }
}
