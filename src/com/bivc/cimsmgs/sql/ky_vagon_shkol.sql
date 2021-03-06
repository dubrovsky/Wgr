SELECT P1.KOLEYA,V1.NVAG,V1.FOOT,V1.MAS_TAR*1000 AS MAS_TAR,V1.POD_SILA,V1.REVIZ,CASE WHEN V1.PORUZ = 1 THEN 'P' ELSE 'L' END AS PORUZ,
  V1.DEFECTIVE,V1.SOBSTV,V1.PRIM
FROM KY_VAGON V1, KY_POEZD P1 WHERE V1.HID_POEZD=P1.HID AND P1.DIRECTION=1 AND P1.KOLEYA=? AND V1.LINE=?
AND NOT EXISTS (SELECT V2.NVAG FROM KY_VAGON V2, KY_POEZD P2 WHERE V1.NVAG=V2.NVAG AND V2.HID_POEZD=P2.HID AND P2.DIRECTION=2 AND V1.DPRB<V2.DOTP)
