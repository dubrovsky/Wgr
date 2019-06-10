SELECT K.HID AS HID_K, K.NKON, CASE WHEN K.PORUZ=1 THEN 'ДА' ELSE 'НЕТ' END AS PORUZ, K.PREV_STATUS,
  S.NAME,Y.X,Y.Y,Y.Z,Y.EMPTY,P.NPPR,V.NVAG,A.NO_AVTO FROM KY_KONT K
  LEFT JOIN KY_YARD Y ON Y.HID=K.HID_KY AND K.PREV_STATUS=2
  LEFT JOIN KY_YARD_SECTOR S ON S.HID=Y.HID_SECTOR
  LEFT JOIN KY_POEZD P ON P.HID=K.HID_VAGON_INTO AND K.PREV_STATUS=1
  LEFT JOIN KY_VAGON V ON V.HID=K.HID_VAGON_INTO AND K.PREV_STATUS=1
  LEFT JOIN KY_AVTO A ON A.HID=K.HID_AVTO_INTO AND K.PREV_STATUS=0
WHERE K.HID_VAGON_OUT=?