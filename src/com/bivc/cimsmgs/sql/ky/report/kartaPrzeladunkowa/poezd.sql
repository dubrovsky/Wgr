SELECT p.HID, c.HID AS HID_CLIENT, c.FNAME, p.NPPRM, p.KOLEYA, p.DIRECTION, p.DOTP
FROM KY_POEZD p
         JOIN NSI_CLIENT c ON c.HID = ?
WHERE p.HID = ?