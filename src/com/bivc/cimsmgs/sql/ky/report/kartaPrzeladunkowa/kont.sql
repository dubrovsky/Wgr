SELECT k.HID, k.NKON, k.DPRB, k.DOTP, k.MASSA_BRUTTO_ALL,
       (SELECT GROUP_CONCAT(pl.ZNAK SEPARATOR ', ') AS PLOMB
        FROM KY_PLOMB pl
        WHERE pl.HID_KONT = k.HID
        ORDER BY pl.SORT) AS PLOMB,
       (SELECT GROUP_CONCAT(CASE WHEN h.HID_VAGON IS NOT NULL THEN 'W' WHEN HID_SECTOR IS NOT NULL THEN 'P' WHEN HID_AVTO IS NOT NULL THEN 'A' END SEPARATOR '-') AS KONT_POSITION
        FROM KY_KONT_GRUZ_HISTORY h WHERE h.HID_KONT=k.HID
        ORDER BY h.DATE_OPERATION) AS KONT_POSITION,
       k.MASSA_TAR, k.POD_SILA, k.VID, k.TYPE, k.NOTP
FROM KY_KONT k WHERE k.HID_VAGON = ?