package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgs;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

import java.util.TreeMap;

/**
 * Created by peter on 07.04.2014.
 */
public class CimSmgsCustomMapper extends CustomMapper<CimSmgs, CimSmgs> {
    @Override
    public void mapAtoB(CimSmgs source, CimSmgs destination, MappingContext context) {
        ///
//        if (MapUtils.isNotEmpty(destination.getCimSmgsPlatels())) {
            destination.setCimSmgsPlatels(new TreeMap<>(destination.getCimSmgsPlatels()));
//        }
//        if (MapUtils.isNotEmpty(destination.getCimSmgsDocses13())) {
            destination.setCimSmgsDocses13(new TreeMap<>(destination.getCimSmgsDocses13()));
//        }

        destination.setCimSmgsPerevoz(new TreeMap<>(destination.getCimSmgsPerevoz()));
    }
}
