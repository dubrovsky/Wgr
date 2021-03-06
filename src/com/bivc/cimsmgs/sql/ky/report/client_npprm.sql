SELECT DISTINCT k.HID_CLIENT AS hid_client, CASE WHEN c.FNAME IS NULL OR LENGTH(c.FNAME) = 0 THEN c.SNAME ELSE c.FNAME END AS name
FROM KY_POEZD p
         JOIN KY_VAGON v ON v.HID_POEZD = p.HID
         JOIN KY_KONT k ON k.HID_VAGON = v.HID
         JOIN NSI_CLIENT c ON k.HID_CLIENT = c.HID
WHERE p.HID=? AND k.HID_CLIENT IS NOT NULL 