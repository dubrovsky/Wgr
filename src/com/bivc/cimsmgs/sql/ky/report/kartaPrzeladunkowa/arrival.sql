SELECT CASE WHEN h.`HID_VAGON` IS NOT NULL THEN v.NVAG WHEN h.HID_AVTO IS NOT NULL THEN a.`NO_AVTO` ELSE NULL END AS NVAG2
FROM KY_KONT_GRUZ_HISTORY h
         LEFT JOIN `KY_VAGON` v ON h.`HID_VAGON` = v.HID
         LEFT JOIN `KY_AVTO` a ON h.`HID_AVTO` = a.HID
WHERE h.HID_KONT = ? AND h.DIRECTION = 1
  AND h.DATE_OPERATION = (SELECT MIN(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT = h.HID_KONT AND h11.DIRECTION = 1 GROUP BY h11.HID_KONT)