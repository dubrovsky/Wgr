SELECT k.HID, k.NKON, k.DPRB, k.DOTP, k.MASSA_BRUTTO_ALL, k.MASSA_BRUTTO,
       (SELECT GROUP_CONCAT(pl.ZNAK SEPARATOR ', ') AS PLOMB
        FROM KY_PLOMB pl
        WHERE pl.HID_KONT = k.HID
        ORDER BY pl.SORT) AS PLOMB,
       k.MASSA_TAR, k.POD_SILA, k.VID, k.TYPE, k.NOTP,
       CASE WHEN cl.FNAME IS NULL OR LENGTH(cl.FNAME) = 0 THEN cl.SNAME ELSE cl.FNAME END AS SOBSTV
FROM KY_KONT k
         LEFT JOIN NSI_CLIENT cl ON k.HID_CLIENT = cl.HID
WHERE k.HID_VAGON = ?