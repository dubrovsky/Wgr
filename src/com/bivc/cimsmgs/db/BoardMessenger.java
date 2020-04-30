package com.bivc.cimsmgs.db;

import java.util.Set;

public interface BoardMessenger {
    Set<BoardTalkNewMess> getBoardTalkNewMesses();
    void setNewMessCount(long newMessCount);
    PackDoc getPackDoc();
    String getDocName();
}
