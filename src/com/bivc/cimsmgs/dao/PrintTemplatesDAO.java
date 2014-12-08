package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;

import java.util.ArrayList;
import java.util.List;

public interface PrintTemplatesDAO  extends GenericDAO<PrintTemplates, Long>{
    List<PrintTemplates> findAll(Integer limit, Integer start, Search search, Usr usr);

    Long countAll(Search search, Usr usr);


//    PrintTemplates findDefaultTemplate(DocDir doc);

    PrintTemplates findById2(PrintTemplates prnTempl);

    Long findDefaultDocTemplate(Long hid, DocDir doc);

    ArrayList<RoutePrintTemplates> findPrnTempls4Route(DocDir doc, Route route);

    ArrayList<PrintTemplates> findDefaultPrnTempls(DocDir doc);

    PrintTemplates findById1(Long hid);

    List<Integer> findPages4BindedPrnTemplate(DocDir doc, Route route);

    List<Integer> findPages4DefaultPrnTemplate(DocDir doc);

    Long countPrnBlankRefs(DocDir doc, Route route);

    Long countPrnBlankRefs4Default(DocDir doc);

    List<PrintTemplates> findAllNotDeafault(Integer limit, Integer start, Search search, Usr usr);

    Long countAllNotDeafault(Search search, Usr usr);

    ArrayList<RouteUnPrintTemplates> findPrnTempls4UnRoute(DocDir doc, Route route, String username);

    List<Integer> findPages4BindedUnPrnTemplate(DocDir doc, Route route, String username);

    Long countUnPrnBlankRefs(DocDir doc, Route route, String username);
}
