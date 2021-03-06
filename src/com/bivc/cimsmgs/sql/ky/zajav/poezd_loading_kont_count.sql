SELECT COUNT(DISTINCT v.HID) AS COUNT_VAG, COUNT(kzz.HID) AS COUNT_KONT_ALL, COUNT(kz.HID) COUNT_KONT_DONE
FROM KY_ZAYAV z
         JOIN KY_VAGON v ON z.HID = v.HID_ZAYAV AND z.DIRECTION = 2
         LEFT JOIN KY_KONT kzz ON v.HID = kzz.HID_VAGON
         LEFT JOIN KY_KONT kz ON kzz.HID = kz.HID AND
                                 EXISTS(
                                         SELECT k.HID
                                         FROM KY_KONT k
                                                  JOIN KY_KONT_GRUZ_HISTORY h
                                                       ON k.HID = h.HID_KONT AND h.DIRECTION = 2
                                                           AND h.DATE_OPERATION = (SELECT MAX(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT = k.HID GROUP BY h11.HID_KONT)
                                         WHERE z.DATE_ZAYAV < h.DATE_OPERATION
                                           AND kz.NKON = k.NKON AND (k.IS_ZAJAV IS NULL OR k.IS_ZAJAV = 0))
WHERE z.HID=?