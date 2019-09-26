package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Vagon;

import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 05.03.14.
 */
public interface VagonDAO extends GenericDAO<Vagon, Long> {

    List<Vagon> findPoezdsOut4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale);

    Long countPoezdsOut4Kont(List<Filter> filters, Usr usr, Locale locale);

    List<Vagon> getVagsForPoezdout(Long poezdHid);
}
