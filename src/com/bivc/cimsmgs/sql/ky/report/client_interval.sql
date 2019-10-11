SELECT DISTINCT k.HID_CLIENT AS hid_client, c.FNAME AS name
FROM KY_KONT k
         JOIN NSI_CLIENT c ON k.HID_CLIENT = c.HID
WHERE k.HID_CLIENT IS NOT NULL AND k.DPRB >= ? AND k.DPRB < ?
