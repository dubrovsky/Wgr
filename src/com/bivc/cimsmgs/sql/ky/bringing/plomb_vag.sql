SELECT KPL, ZNAK FROM VAG_PER_VED
WHERE HID=? AND (NKON IS NULL OR LENGTH(NKON) = 0)