SELECT MAX(a.DATTR) AS DATTR, a.N_POEZD, a.N_PACKET, a.VED_NOMER,
       MAX(CONCAT(KSTO, NSTO_F)) AS STO_F, MAX(KSTN) AS STN, COUNT(DISTINCT NVAG) AS COUNT_NVAG
FROM VAG_PER_VED a
WHERE N_PACKET = (SELECT MAX(b.N_PACKET) FROM VAG_PER_VED b WHERE a.VED_NOMER=b.VED_NOMER AND a.N_POEZD=b.N_POEZD)
GROUP BY a.N_POEZD, a.N_PACKET, a.VED_NOMER
ORDER BY a.N_PACKET DESC
