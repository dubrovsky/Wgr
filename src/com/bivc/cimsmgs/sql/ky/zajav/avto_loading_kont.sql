SELECT DISTINCT kz.HID
FROM KY_KONT kz
         JOIN KY_ZAYAV_AVTO z ON z.HID = kz.HID_ZAYAV AND z.DIRECTION = 2
WHERE kz.IS_ZAJAV = 1
  AND EXISTS(
        SELECT k.HID
        FROM KY_KONT k
                 JOIN KY_KONT_GRUZ_HISTORY h
                      ON k.HID = h.HID_KONT AND h.DIRECTION = 2
                          AND h.DATE_OPERATION = (SELECT MAX(h11.DATE_OPERATION) FROM KY_KONT_GRUZ_HISTORY h11 WHERE h11.HID_KONT = k.HID GROUP BY h11.HID_KONT)
        WHERE z.DATE_ZAYAV < h.DATE_OPERATION
          AND kz.NKON = k.NKON
          AND (k.IS_ZAJAV IS NULL OR k.IS_ZAJAV = 0))