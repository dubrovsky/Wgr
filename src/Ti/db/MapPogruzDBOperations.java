package Ti.db;

import Ti.model.MapPogruz;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;


public class MapPogruzDBOperations {
    final static private Logger log = LoggerFactory.getLogger(MapPogruzDBOperations.class);

    /**
     * Метод processBase записывает карту перегруза в базу данных
     *
     * @param mapPeregruzs карта перегруза
     * @param hid          id CIM/СМГС
     */
    public static void processBase(List<MapPogruz> mapPeregruzs, Long hid) {
        log.debug("processBase");
        Byte plSort = 0;

        try {
            HibernateUtil.beginTransaction();


                CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid);
                // читаем карту вагонов
                Map<Byte, CimSmgsCarList> carListMap = cs.getCimSmgsCarLists();

                Iterator<Byte> i = carListMap.keySet().iterator();
                while (i.hasNext()) {
                    boolean stop_flag = false;

                    Byte aByte = i.next();
                    // считываем 1 вагон
                    CimSmgsCarList cimSmgsCarList = carListMap.get(aByte);
                    // считываем карту контейнеров на вагоне
                    Map<Byte, CimSmgsKonList> konListMap = carListMap.get(aByte).getCimSmgsKonLists();

                    Iterator<Byte> it = konListMap.keySet().iterator();
                    while (it.hasNext()) {
                        Byte aByte1 = it.next();
                        // считываем 1 контейнер
                        CimSmgsKonList cimSmgsKonList = konListMap.get(aByte1);
                        // считываем номер контейнера
                        String utin = cimSmgsKonList.getUtiN().toLowerCase().replaceAll(" ","").replaceAll("-","");
                        for (MapPogruz mapPeregruz : mapPeregruzs)
                            // проверяем наш ли это контейнер
                        if (mapPeregruz.getUtiN().toLowerCase().replaceAll(" ","").replaceAll("-","").equals(utin)) {

                            //удаляем все имеющиеся пломбы
                            delPlombs(cimSmgsKonList.getCimSmgsPlombs());

                            // создаем новую карту пломб
                            Map<Byte, CimSmgsPlomb> plombMap = new TreeMap<>();
                            List<String> plombs = mapPeregruz.getZnak();

                            StringBuilder plombStr=new StringBuilder();
                            // заносим записи из EXCEL в созданную карту пломб
                            for (String pl : plombs) {
                                CimSmgsPlomb plomb = new CimSmgsPlomb();
                                plomb.setKpl(new Short("1"));
                                plomb.setZnak(pl);
                                if(plombStr.length()>0)
                                    plombStr.append(",");
                                plombStr.append(pl);
                                plomb.setSort(new Byte(plSort));
                                plSort++;
                                plomb.setCimSmgs(cs);
                                plomb.setCimSmgsKonList(cimSmgsKonList);
                                // заносим пломбу в карту пломб
                                plombMap.put(plSort, plomb);

                                HibernateUtil.getSession().save(plomb);
                            }
                            cs.setG694(mapPeregruz.getG694());
                            // сохраняем карту пломб
                            cimSmgsKonList.setCimSmgsPlombs(plombMap);
                            cs.setG2012(plombStr.toString());

                            cimSmgsKonList.setSizeFoot(mapPeregruz.getSizeFoot());
                            cimSmgsKonList.setUtiType(mapPeregruz.getUti_type());
                            cimSmgsKonList.setTaraKont(mapPeregruz.getTaraKont());
                            cimSmgsKonList.setGrpod(mapPeregruz.getGrPodKont());
                            cimSmgsKonList.setNvag(mapPeregruz.getNvag());

                            HibernateUtil.getSession().update(cimSmgsKonList);


                            // проверяем не находимся ли мы уже на нужном вагоне
                            if (mapPeregruz.getNvag().toLowerCase().equals(cimSmgsCarList.getNvag().toLowerCase())) {
                                // заносим данные об вагоне
                                cimSmgsCarList.setNvag(mapPeregruz.getNvag());
                                cimSmgsCarList.setKolOs(mapPeregruz.getKolOs());
                                cimSmgsCarList.setGrPod(mapPeregruz.getGrPod());
                                cimSmgsCarList.setTaraVag(mapPeregruz.getTaraVag());
                                cimSmgsCarList.setKlientName(mapPeregruz.getKlientName());

                                HibernateUtil.getSession().update(cimSmgsCarList);
                            }
                            else // ищем нужный вагон для нашего контейнера
                            {
                                Boolean findVagFlag = false;
                                String carName2Find = mapPeregruz.getNvag();
                                Iterator<Byte> carListMapIterator = carListMap.keySet().iterator();
                                while (carListMapIterator.hasNext()) {
                                    CimSmgsCarList carList2Check = carListMap.get(carListMapIterator.next());
                                    if (carList2Check.getNvag().toLowerCase().equals(carName2Find.toLowerCase())) {
                                        // нашли нужный вагон
                                        // получаем номер по порядку для контейнера на новом вагоне
                                        Byte konListKeyMaxValue = Collections.max(carList2Check.getCimSmgsKonLists().keySet());
                                        konListKeyMaxValue++;


                                        cimSmgsKonList.setCimSmgsCarList(carList2Check);
                                        cimSmgsKonList.setSort(konListKeyMaxValue);

                                        carList2Check.getCimSmgsKonLists().put(konListKeyMaxValue, cimSmgsKonList);
                                        HibernateUtil.getSession().update(carList2Check);
                                        HibernateUtil.getSession().update(cimSmgsKonList);

                                        //меняем ссылку на вагон во всех объектах груза привязанных к данному контейнеру
                                        for (Integer cimSmgsGruzNum : cimSmgsKonList.getCimSmgsGruzs().keySet()) {
                                            CimSmgsGruz gr = cimSmgsKonList.getCimSmgsGruzs().get(cimSmgsGruzNum);
                                            gr.setCimSmgsCarList(carList2Check);
                                            HibernateUtil.getSession().update(gr);
                                        }
                                        findVagFlag = true;
                                    }
                                }

                                // Если вагон не найдет создаем запись о вагоне в базе данных
                                if (!findVagFlag) {
                                    // создаем и заполняем новый вагон
                                    CimSmgsCarList newCarList = new CimSmgsCarList();
                                    Byte carListKeyMaxValue = Collections.max(carListMap.keySet());
                                    carListKeyMaxValue++;
                                    newCarList.setSort(carListKeyMaxValue);
                                    newCarList.setNvag(mapPeregruz.getNvag());
                                    newCarList.setKolOs(mapPeregruz.getKolOs());
                                    newCarList.setGrPod(mapPeregruz.getGrPod());
                                    newCarList.setTaraVag(mapPeregruz.getTaraVag());
                                    newCarList.setKlientName(mapPeregruz.getKlientName());
                                    carListMap.put(carListKeyMaxValue, newCarList);
                                    newCarList.setCimSmgs(cs);

                                    cimSmgsKonList.setSort(new Byte("0"));
                                    cimSmgsKonList.setCimSmgsCarList(newCarList);
                                    //меняем ссылку на вагон во всех объектах груза привязанных к данному контейнеру

                                    for (Integer cimSmgsGruzNum : cimSmgsKonList.getCimSmgsGruzs().keySet()) {
                                        CimSmgsGruz gr = cimSmgsKonList.getCimSmgsGruzs().get(cimSmgsGruzNum);
                                        gr.setCimSmgsCarList(newCarList);
                                        HibernateUtil.getSession().update(gr);
                                    }

                                    newCarList.getCimSmgsKonLists().put(new Byte("0"), cimSmgsKonList);

                                    HibernateUtil.getSession().save(newCarList);
                                    HibernateUtil.getSession().update(cimSmgsKonList);
                                    stop_flag = true;
                                    break;
                                }
                            }

                        }
                    }
                    if (stop_flag)
                        break;
                }
                cs.setAltered(new Date());

// записываем в базу данных
            HibernateUtil.commitTransaction();
        }
        catch (HibernateException ex) {
            log.error(ex.getMessage());
            HibernateUtil.rollbackTransaction();
        }
    }

    /**
     * Метод delPlombs удалем все пломбы из базы данных согласно заданной карте пломб
     *
     * @param delPlombMap карта пломб
     */
    private static void delPlombs(Map<Byte, CimSmgsPlomb> delPlombMap) {
        log.debug("delPlombs");
        Iterator<Byte> byteIterator = delPlombMap.keySet().iterator();
        while (byteIterator.hasNext()) {
            CimSmgsPlomb delPlomb = delPlombMap.get(byteIterator.next());
            HibernateUtil.getSession().delete(delPlomb);
        }
    }

    /**
     * метод delEmtyCarsFromSMGS удалем записи о вагонах без контейнеров
     *
     * @param hid id CIM/СМГС
     */
    public static void delEmtyCarsFromSMGS(Long hid) {
        log.debug("delEmtyCarsFromSMGS");
        HibernateUtil.getSession().beginTransaction();
        try {
            CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid);
            // читаем карту вагонов
            Map<Byte, CimSmgsCarList> carListMap = cs.getCimSmgsCarLists();
            Iterator<Byte> carIterator = carListMap.keySet().iterator();
            while (carIterator.hasNext()) {
                Byte num = carIterator.next();
                // ищем вагон без контейнеров
                if (carListMap.get(num).getCimSmgsKonLists().size() == 0) {

                    HibernateUtil.getSession().delete(carListMap.get(num));
                    carIterator.remove();
                }
            }
            HibernateUtil.getSession().update(cs);
            // записываем в базу данных
            HibernateUtil.commitTransaction();
        }
        catch (HibernateException ex) {
            log.error(ex.getMessage());
            HibernateUtil.rollbackTransaction();
        }
    }

    /**
     * метод setUpVagonPlaces рассталяет вагоны по местам согласно карте перегрузки
     *
     * @param mapPeregruzs карта перегрузки
     * @param hid          id CIM/СМГС
     */
    public static void setUpVagonPlaces(List<MapPogruz> mapPeregruzs, Long hid) {
        log.debug("setUpVagonPlaces");
        Byte sort = new Byte("0");
        HibernateUtil.getSession().beginTransaction();
        try {
            CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid);
            // читаем карту вагонов
            Map<Byte, CimSmgsCarList> carListMap = cs.getCimSmgsCarLists();
            Iterator<Byte> carIterator = carListMap.keySet().iterator();

            // расставляем по порядку вначале те вагоны, что есть в карте перегруза
            while (carIterator.hasNext()) {
                CimSmgsCarList cimSmgsCarList = carListMap.get(carIterator.next());
                cimSmgsCarList.setSort(new Byte("-1"));
                for (MapPogruz mapPeregruz : mapPeregruzs) {
                    if (cimSmgsCarList.getNvag().toLowerCase().equals(mapPeregruz.getNvag().toLowerCase())) {
                        cimSmgsCarList.setSort(sort);
                        sort++;
                        break;
                    }
                }
            }
            // затем расставляем вагоны, которых нет в карте перегруза
            carIterator = carListMap.keySet().iterator();
            while (carIterator.hasNext()) {
                CimSmgsCarList cimSmgsCarList = carListMap.get(carIterator.next());
                if (cimSmgsCarList.getSort() == -1) {
                    cimSmgsCarList.setSort(sort);
                    sort++;
                }
                HibernateUtil.getSession().update(cimSmgsCarList);
            }

            HibernateUtil.commitTransaction();
        }
        catch (HibernateException ex) {
            log.error(ex.getMessage());
            HibernateUtil.rollbackTransaction();
        }
    }

//    public static List<Long> getCimSmgsList(Long hid) {
//        List<Long> cimSmgsList = new ArrayList<>();
//
//        log.debug("setUpVagonPlaces");
//        HibernateUtil.getSession().beginTransaction();
//        try {
//            CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid);
//
//            String npoezd = cs.getNpoezd();
//        }
//        catch (HibernateException ex) {
//            log.error(ex.getMessage());
//            HibernateUtil.rollbackTransaction();
//        }
//        return cimSmgsList;
//    }

    public static void createList2BaseList(ArrayList<MapPogruz> mapPeregruzs, Long hid) {
        log.debug("processBase");
        Byte plSort = 0;


        HibernateUtil.beginTransaction();

//        for (MapPogruz mapPeregruz : mapPeregruzs) {
        CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid);
        // читаем карту вагонов
        Map<Byte, CimSmgsCarList> carListMap = cs.getCimSmgsCarLists();

        Iterator<Byte> i = carListMap.keySet().iterator();
        while (i.hasNext()) {
            boolean stop_flag = false;

            Byte aByte = i.next();
            // считываем 1 вагон
            CimSmgsCarList cimSmgsCarList = carListMap.get(aByte);
            // считываем карту контейнеров на вагоне
            Map<Byte, CimSmgsKonList> konListMap = carListMap.get(aByte).getCimSmgsKonLists();

            Iterator<Byte> it = konListMap.keySet().iterator();
            while (it.hasNext()) {
                Byte aByte1 = it.next();
                // считываем 1 контейнер
                CimSmgsKonList cimSmgsKonList = konListMap.get(aByte1);
                // считываем номер контейнера
                String utin = cimSmgsKonList.getUtiN().toLowerCase().replaceAll(" ","").replaceAll("-","");
                boolean found = false;
                for (MapPogruz mapPeregruz : mapPeregruzs) {
                    // проверяем наш ли это контейнер
                    if (mapPeregruz.getUtiN().toLowerCase().replaceAll(" ","").replaceAll("-","").equals(utin)) {

//                        mapPeregruz.setG694_db(cs.getG694());
                        mapPeregruz.setUtiN_db(utin);
                        mapPeregruz.setCs_hid(cs.getHid());
                        mapPeregruz.setSelected(true);
                        stop_flag = true;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    MapPogruz mapPogruztemp = new MapPogruz();
                    mapPogruztemp.setCs_hid(hid);
                    mapPogruztemp.setUtiN_db(utin);
                    mapPogruztemp.setUtiN("");
                    mapPogruztemp.setG694("");
                    mapPogruztemp.setNvag("");
                    mapPogruztemp.setKlientName("");
                    mapPogruztemp.setUti_type(cimSmgsKonList.getUtiType());
                    mapPogruztemp.setZnak(new ArrayList<String>());


//                    mapPogruztemp.setG694(cs.getG694());
//                    mapPogruztemp.setNvag(cimSmgsKonList.getNvag());
//                    mapPogruztemp.setKlientName(cimSmgsCarList.getKlientName());
//                    mapPogruztemp.setSizeFoot(cimSmgsKonList.getSizeFoot());
//                    mapPogruztemp.setUti_type(cimSmgsKonList.getUtiType());
//                    List<String> plombs = new ArrayList<>();
//                    for (CimSmgsPlomb plomb : cimSmgsKonList.getCimSmgsPlombs().values()) {
//                        plombs.add(plomb.getZnak());
//                    }
//                    mapPogruztemp.setZnak(plombs);
//                    mapPogruztemp.setGrPod(cimSmgsKonList.getGrpod());
//                    mapPogruztemp.setTaraKont(cimSmgsKonList.getTaraKont());
//                    mapPogruztemp.setTaraVag(cimSmgsCarList.getTaraVag());
//                    mapPogruztemp.setGrPod(cimSmgsCarList.getGrPod());
//                    mapPogruztemp.setKolOs(cimSmgsCarList.getKolOs());
                    mapPogruztemp.setSelected(false);
                    mapPeregruzs.add(mapPogruztemp);
                }

            }
//            if (stop_flag)
//                break;
        }
    }
//    }


}
