SELECT p.HID, p.NPPRM, p.KOLEYA, p.DIRECTION, p.DOTP, p.DPOGR, p.DUVED, pr.NAME AS PROJ_NAME,
       (SELECT GROUP_CONCAT(DISTINCT cl.FNAME SEPARATOR ', ')
        FROM NSI_CLIENT cl, KY_KONT k, KY_VAGON v
        WHERE p.HID = v.HID_POEZD AND v.HID = k.HID_VAGON AND k.HID_CLIENT = cl.HID) AS FNAMES
FROM KY_POEZD p
         JOIN ROUTE r ON p.HID_ROUTE=r.HID
         JOIN PROJECT pr ON r.HID_PROJ=pr.HID
WHERE p.HID = ?