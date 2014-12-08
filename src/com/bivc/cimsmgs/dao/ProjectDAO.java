package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Project;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

public interface ProjectDAO extends GenericDAO<Project, Long>{
    public List findAll(Usr usr);

    public List<Project> findAll4aviso(Usr usr);

//    public List<DocDir> findDocs4User(Usr usr);


    List<Project> findAllProjects(Integer limit, Integer start);

    Long countAllProjects();

    Project findById2(Project project);

    List<Project> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);
}
