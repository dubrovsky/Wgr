SELECT k.HID,

       CONCAT(p1.NO_AVTO, '/', p1.NO_TRAIL) AS NVAG1, '' AS NPPR1, k.DPRB,

       k.NKON, k.TYPE, k.VID, CASE WHEN cl.FNAME IS NULL OR LENGTH(cl.FNAME) = 0 THEN cl.SNAME ELSE cl.FNAME END AS GRUZOTPR,
       (SELECT GROUP_CONCAT(pl.ZNAK SEPARATOR ',') AS KONT_PLOMB
        FROM KY_PLOMB pl WHERE pl.HID_KONT=k.HID
        ORDER BY pl.SORT) AS KONT_PLOMB,
       k.MASSA_TAR,k.POD_SILA,k.MASSA_BRUTTO,

       (SELECT GROUP_CONCAT(CASE WHEN h.HID_VAGON IS NOT NULL THEN 'W' WHEN HID_SECTOR IS NOT NULL THEN 'P' WHEN HID_AVTO IS NOT NULL THEN 'A' END
                            ORDER BY h.DATE_OPERATION SEPARATOR '-') AS K_P
        FROM KY_KONT_GRUZ_HISTORY h WHERE h.HID_KONT=k.HID) AS KONT_POSITION,

       k.DOTP, NULL AS KOLEYA, NULL AS NVAG2, p1.DRIVER_FIO, NULL AS DRIVER_FIO2

FROM KY_KONT k

         JOIN KY_KONT_GRUZ_HISTORY h1
              ON k.HID=h1.HID_KONT AND h1.DATE_OPERATION=(SELECT MIN(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT=k.HID AND h11.DIRECTION=1 GROUP BY h11.HID_KONT)
         JOIN KY_AVTO p1
              ON p1.HID=h1.HID_AVTO AND p1.DIRECTION=1

         LEFT JOIN KY_KONT_GRUZ_HISTORY h2
              ON k.HID=h2.HID_KONT AND h2.DIRECTION=2 AND h2.DATE_OPERATION=(SELECT MAX(h22.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h22 WHERE h22.HID_KONT=k.HID GROUP BY h22.HID_KONT)

         LEFT JOIN NSI_CLIENT cl ON k.HID_CLIENT = cl.HID

WHERE h2.HID_VAGON IS NULL AND h2.HID_AVTO IS NULL AND