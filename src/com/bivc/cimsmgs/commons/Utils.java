package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.db.BoardMessenger;
import com.bivc.cimsmgs.db.BoardTalkNewMess;

import java.util.List;

public class Utils {

    public static void setNewMessCount(List<? extends BoardMessenger> entityList, String un) {
        for (BoardMessenger entity : entityList) {
            entity.setNewMessCount(
                    entity.getBoardTalkNewMesses().stream().
                            filter(boardTalkNewMess ->
                                    boardTalkNewMess.getId().getPackDocHid().equals(entity.getPackDoc().getHid()) &&
                                            boardTalkNewMess.getId().getDocName().equals(entity.getDocName()) &&
                                            boardTalkNewMess.getId().getUn().equals(un)
                            ).
                            mapToInt(BoardTalkNewMess::getNewCount).sum()
            );
        }
    }
}
