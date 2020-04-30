SELECT z.HID AS hid,z.NO_ZAYAV AS noZayav,z.DATE_ZAYAV AS dateZayav,z.DATTR AS dattr,z.UN AS un,z.ALTERED AS altered,z.DIRECTION AS direction,
       z.TRANSPORT AS transport,z.HID_ROUTE AS routeId,z.HID_PACK AS packId,z.NPPR AS nppr,z.NPPRM AS npprm,
       (SELECT cc.SNAME FROM NSI_CLIENT cc WHERE cc.HID=z.HID_CLIENT) AS gruzotpr,
       z.TRANS AS trans, z.MESS_COUNT AS messCount, MAX(bt.NEW_COUNT) AS newMessCount,
       COUNT(DISTINCT v.HID) AS vagCount, COUNT(kzz.HID) AS kontCount, COUNT(kz.HID) kontCountDone, COUNT(kzz.HID)=COUNT(kz.HID) AND COUNT(kzz.HID) > 0 AS isZayavDone
FROM KY_ZAYAV z
         LEFT JOIN KY_VAGON v ON z.HID = v.HID_ZAYAV
         LEFT JOIN KY_KONT kzz ON v.HID = kzz.HID_VAGON
         LEFT JOIN KY_KONT kz ON kzz.HID = kz.HID AND
                                 EXISTS(
                                         SELECT k.HID
                                         FROM KY_KONT k
                                                  JOIN KY_KONT_GRUZ_HISTORY h
                                                       ON k.HID = h.HID_KONT
                                                           AND h.DATE_OPERATION = (SELECT MAX(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT = k.HID GROUP BY h11.HID_KONT)
                                         WHERE z.DATE_ZAYAV < h.DATE_OPERATION AND (h.DIRECTION = 2 OR z.DIRECTION = 1 AND h.HID_YARD IS NOT NULL)
                                           AND kz.NKON = k.NKON AND (k.IS_ZAJAV IS NULL OR k.IS_ZAJAV = 0))
         LEFT JOIN BOARDTALK_NEW_MESS bt ON bt.PACK_DOC_HID=z.HID_PACK AND bt.DOC_NAME='poezdZayav2' AND bt.DOC_HID=z.HID AND bt.UN=?
WHERE z.HID_ROUTE=?
%s
GROUP BY z.HID,z.NO_ZAYAV,z.DATE_ZAYAV,z.DATTR,z.UN,z.ALTERED,z.DIRECTION,z.TRANSPORT,z.HID_ROUTE,z.HID_PACK,z.NPPR,z.NPPRM,z.GRUZOTPR
ORDER BY COUNT(kzz.HID)=COUNT(kz.HID) AND COUNT(kzz.HID) > 0,z.DATE_ZAYAV DESC