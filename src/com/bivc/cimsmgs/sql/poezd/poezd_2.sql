SELECT P.HID AS HID_P, P.NPPR, P.DOTP AS DAT, (SELECT COUNT(*) FROM KY_VAGON V WHERE V.HID_POEZD=P.HID) AS COUNT_V, (SELECT COUNT(*) FROM KY_KONT K WHERE K.HID_POEZD_OUT=P.HID) AS COUNT_K
FROM KY_POEZD P WHERE UPPER(P.NPPR)=? AND P.DIRECTION=2 AND P.HID=(SELECT MAX(P2.HID) FROM KY_POEZD P2 WHERE P.NPPR=P2.NPPR AND P2.DIRECTION=2)