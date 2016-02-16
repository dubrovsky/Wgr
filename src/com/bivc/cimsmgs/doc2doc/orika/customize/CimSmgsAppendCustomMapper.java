package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsDocs;
import com.bivc.cimsmgs.db.CimSmgsPerevoz;
import com.bivc.cimsmgs.db.CimSmgsPlatel;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import org.apache.commons.collections4.MapUtils;

import java.util.TreeMap;

/**
 * Created by peter on 07.04.2014.
 */
public class CimSmgsAppendCustomMapper extends CustomMapper<CimSmgs, CimSmgs> {
    @Override
    public void mapAtoB(CimSmgs cimSmgsSource, CimSmgs cimSmgsDestination, MappingContext context) {
        ///
        int sort;
        if (MapUtils.isNotEmpty(cimSmgsSource.getCimSmgsPlatels())) {
            for(CimSmgsPlatel platelSource : cimSmgsSource.getCimSmgsPlatels().values()){
                CimSmgsPlatel platelDestination = mapperFacade.map(platelSource, CimSmgsPlatel.class);
                sort = cimSmgsDestination.getCimSmgsPlatels().size();
                platelDestination.setSort((byte)sort);
                cimSmgsDestination.getCimSmgsPlatels().put((byte) sort, platelDestination);
            }
        } else if (MapUtils.isEmpty(cimSmgsDestination.getCimSmgsPlatels())){
            cimSmgsDestination.setCimSmgsPlatels(new TreeMap<Byte, CimSmgsPlatel>());
        }

        if (MapUtils.isNotEmpty(cimSmgsSource.getCimSmgsDocses13())) {
            for(CimSmgsDocs docsSource : cimSmgsSource.getCimSmgsDocses13().values()){
                CimSmgsDocs docsDestination = mapperFacade.map(docsSource, CimSmgsDocs.class);
                sort = cimSmgsDestination.getCimSmgsDocses13().size();
                docsDestination.setSort((byte)sort);
                cimSmgsDestination.getCimSmgsDocses13().put((byte) sort, docsDestination);
            }
        } else if (MapUtils.isEmpty(cimSmgsDestination.getCimSmgsDocses13())){
            cimSmgsDestination.setCimSmgsDocses13(new TreeMap<Byte, CimSmgsDocs>());
        }

        if (MapUtils.isNotEmpty(cimSmgsSource.getCimSmgsPerevoz())) {
            for(CimSmgsPerevoz perevozSource : cimSmgsSource.getCimSmgsPerevoz().values()){
                CimSmgsPerevoz perevozDestination = mapperFacade.map(perevozSource, CimSmgsPerevoz.class);
                sort = cimSmgsDestination.getCimSmgsPerevoz().size();
                perevozDestination.setSort((byte)sort);
                cimSmgsDestination.getCimSmgsPerevoz().put((byte) sort, perevozDestination);
            }
        } else if (MapUtils.isEmpty(cimSmgsDestination.getCimSmgsPerevoz())){
            cimSmgsDestination.setCimSmgsPerevoz(new TreeMap<Byte, CimSmgsPerevoz>());
        }
    }
}
