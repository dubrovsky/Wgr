SELECT NVAG, TARA_VAG AS MAS_TAR, KOL_OSI AS KOL_OS, GRPOD AS POD_SILA, OWNERN AS SOBSTV,
       CASE WHEN NKON IS NOT NULL AND LENGTH(NKON) > 0 THEN 0
            WHEN KGVN NOT LIKE '992%' THEN 1 ELSE NULL END AS OTPRAVKA
FROM VAG_PER_VED WHERE HID=?
