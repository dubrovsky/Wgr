SELECT k.HID,

       v1.NVAG AS NVAG1, p1.NPPR AS NPPR1, p1.DPRB,

       k.NKON, k.TYPE, k.VID, k.GRUZOTPR,
       (SELECT GROUP_CONCAT(pl.ZNAK SEPARATOR ',') AS KONT_PLOMB
        FROM KY_PLOMB pl WHERE pl.HID_KONT=k.HID
        ORDER BY pl.SORT) AS KONT_PLOMB,
       k.MASSA_TAR,k.POD_SILA,k.MASSA_BRUTTO,

       (SELECT GROUP_CONCAT(CASE WHEN h.HID_VAGON IS NOT NULL THEN 'W' WHEN HID_SECTOR IS NOT NULL THEN 'P' WHEN HID_AVTO IS NOT NULL THEN 'A' END SEPARATOR '-') AS KONT_POSITION
        FROM KY_KONT_GRUZ_HISTORY h WHERE h.HID_KONT=k.HID
        ORDER BY h.DATE_OPERATION) AS KONT_POSITION,

       p2.DOTP,CASE WHEN p2.KOLEYA=2 THEN 'NORMALNY' WHEN p2.KOLEYA=1 THEN 'SZEROKI' END AS KOLEYA, v2.NVAG AS NVAG2,  '' AS DRIVER_NM

FROM KY_KONT k

         JOIN KY_KONT_GRUZ_HISTORY h1
              ON k.HID=h1.HID_KONT AND h1.DATE_OPERATION=(SELECT MIN(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT=k.HID AND h11.DIRECTION=1 GROUP BY h11.HID_KONT)
         JOIN KY_KONT_GRUZ_HISTORY h2
              ON k.HID=h2.HID_KONT AND h2.DATE_OPERATION=(SELECT MAX(h22.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h22 WHERE h22.HID_KONT=k.HID AND h22.DIRECTION=2 GROUP BY h22.HID_KONT)

         JOIN KY_VAGON v1
              ON v1.HID=h1.HID_VAGON
         JOIN KY_POEZD p1
              ON p1.HID=h1.HID_POEZD AND p1.DIRECTION=1
         JOIN KY_VAGON v2
              ON v2.HID=h2.HID_VAGON
         JOIN KY_POEZD p2
              ON p2.HID=h2.HID_POEZD AND p2.DIRECTION=2

WHERE p1.DPRB>=? AND p1.DPRB<?
ORDER BY DPRB