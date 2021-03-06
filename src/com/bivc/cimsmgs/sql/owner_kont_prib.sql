SELECT DISTINCT K.HID_OWNER, O.NAMEOWN, V.LINE, P.DPRB FROM KY_POEZD P, KY_VAGON V, KY_KONT K, NSI_KY_OWNERS O
WHERE P.DIRECTION=1 AND P.KOLEYA=? AND P.HID=K.HID_POEZD_INTO
AND V.HID=K.HID_VAGON_INTO AND K.HID_OWNER=O.HID AND K.STATUS=1
ORDER BY P.DPRB DESC
