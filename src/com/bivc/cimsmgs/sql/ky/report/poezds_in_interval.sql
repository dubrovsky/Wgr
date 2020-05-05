SELECT `HID` AS hid, `NPPRM` AS npprm FROM `KY_POEZD` p
WHERE HID IN (SELECT v.`HID_POEZD` FROM `KY_VAGON` v
              JOIN `KY_KONT` k ON v.`HID`=k.`HID_VAGON` AND k.DPRB>=? AND k.DPRB<?)
      AND p.`DIRECTION`=1