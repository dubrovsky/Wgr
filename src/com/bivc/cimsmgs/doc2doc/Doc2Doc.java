package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;

public interface Doc2Doc {
    public void convert(Doc2Doc_A action) throws Exception;
    public String getResultMsg();
}
