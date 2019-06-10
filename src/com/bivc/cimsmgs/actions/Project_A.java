package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.dao.PrintTemplatesDAO;
import com.bivc.cimsmgs.dao.PrintTemplatesDAOAware;
import com.bivc.cimsmgs.dao.ProjectDAO;
import com.bivc.cimsmgs.dao.ProjectDAOAware;
import com.bivc.cimsmgs.db.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class Project_A extends CimSmgsSupport_A implements ProjectDAOAware, PrintTemplatesDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Project_A.class);

    public String list() {
        log.info("list");
        List<Project> projects = projectDAO.findAll(getUser().getUsr());
        setJSONData(treeJSON(projects, true));
        return SUCCESS;
    }

    public String listPart() {
        log.info("listPart");
        List<Project> projects = projectDAO.findAll(getUser().getUsr());
        setJSONData(treeJSON(projects, false));
        return SUCCESS;
    }

    public String listPrnTmpl() {
        log.info("Routes for Print Templates");
        List<Project> projects = projectDAO.findAll(getUser().getUsr());
        setJSONData(treeJSON4PrnTmpl(projects));
        return SUCCESS;
    }

    public String list4aviso() {
        log.info("list4aviso");
        List<Project> projects = projectDAO.findAll4aviso(getUser().getUsr());
        setJSONData(treeJSON4aviso(projects));
        return SUCCESS;
    }

    public String listProjects() {
        log.info("listProjects");
        List<Project> projects = projectDAO.findAllProjects(getLimit(), getStart());
        Long total = projectDAO.countAllProjects();
        setJSONData(Constants.convert2JSON_ProjList(projects, total));
        return SUCCESS;
    }

    public String view1() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException {
        log.info("view1");
        project = projectDAO.findById2(project);
        setJSONData(project != null ? "{project:" + JsonUtils.doJson(project) + "}" : "");
        return SUCCESS;
    }

    public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("save");

//        validateParams();

        project.prepare4save(getUser());
        projectDAO.merge(project);
        project.prepareGroups4Save();
        project.prepareRoutes4Save();
        projectDAO.merge(project);
        project.prepareRouteGroups4Save();
        project.prepareRouteDocs4Save();

        projectDAO.merge(project);

        setJSONData(Constants.convert2JSON_Project_Save_Results(project));
        return SUCCESS;
    }

    /*private void validateParams() {
         if(CollectionUtils.isNotEmpty(project.getRts())){
             List<Route> routesForDeleted = new ArrayList<>();
             for(Route route: project.getRts()){
                if(route.getForDeleted()){
                    routesForDeleted.add(route);
                }
             }
             if(!routesForDeleted.isEmpty()) {
                 if(routesForDeleted.size() > 1){
                     throw new BusinessException("Route for deleted docs can be only 1.");
                 } else {
                     Route route = getRouteDAO().findForDeleted();
                     if(route != null){
                         Long hid = routesForDeleted.iterator().next().getHid();
                         if(hid == null || !Objects.equals(hid, route.getHid())) {
                             throw new BusinessException("Route for deleted docs already exists.");
                         }
                     }
                 }
             }
         }
    }*/

    /*public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("");

        if (getTask().equals("copy")) {
            Constants.delHids(project);
        }
        project.prepare4save(getUser());
        if (project.getHid() != null) // обновить
        {
            project.prepareGroups4Save();
            project.prepareRoutes4Save();
            project.prepareRouteGroups4Save();
            project.prepareRouteDocs4Save();
            projectDAO.merge(project);

        } else {
            project.prepareRoutes4Save();
            projectDAO.makePersistent(project);
            project.prepareGroups4Save();
            project.prepareRouteGroups4Save();
            project.prepareRouteDocs4Save();
        }
//        setJSONData(Constants.convert2JSON_Smgs_Save_Results(project, "project"));
        setJSONData(Constants.convert2JSON_Project_Save_Results(project));
        return SUCCESS;
    }*/

    public String delete() {
        log.info("delete");

        Project origin = projectDAO.findById(project.getHid(), false);
//        try{
        projectDAO.makeTransient(origin);
//            projectDAO.flush();
//        } catch (ConstraintViolationException e){
//            setJSONData(Constants.convert2JSON_False());
//            return SUCCESS;
//        }

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    /*public String listDocs4User() {
        log.info("");
        List<DocDir> docs = dao.findDocs4User(getUser().getUsr());
        setJSONData(docsJSON(docs));
        return SUCCESS;
    }*/

//    private void treeBuilder(List<Project> projects, StringBuffer buffer) {
//        String prefix = "";
//        for (int i = 0; i < projects.size(); i++) {
//            Project project1 = projects.get(i);
//            buffer.append(prefix);
//            prefix = ",";
//            buffer.append("{");
//            buffer.append("text:");
//            buffer.append("'" + Constants.javascriptString(project1.getName()) + "'");
//            buffer.append(",");
//            buffer.append("id:");
//            buffer.append("'id_" + project1.getHid() + "'");
//            buffer.append(",");
//
//            buffer.append("leaf:true, cls:''");
//            buffer.append("}");
//        }
//        buffer.append(",{text: 'Выход',leaf: true,iconCls:'logout',id:'exit'}");
//    }

    private String treeJSON4aviso(List<Project> projects) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("[");
        String prefix = "";
        for (int i = 0; i < projects.size(); i++) {
            Project project1 = projects.get(i);
            buffer.append(prefix);
            prefix = ",";
            buffer.append("{");
            buffer.append("text:");
            buffer.append("'" + Constants.javascriptString(project1.getName()) + "'");
            buffer.append(",");
            buffer.append("id:");
            buffer.append("'id_" + project1.getHid() + "'");
            buffer.append(",");
            buffer.append("expanded: true");
            buffer.append(",");
            buffer.append("children:");
            buffer.append("[");
            String prefix1 = "";
            for (Route route1 : project1.getRoutes()) {
                buffer.append(prefix1);
                prefix1 = ",";
                buffer.append("{");
                buffer.append("text:");
                buffer.append("'" + Constants.javascriptString(route1.getName()) + "'");
                buffer.append(",");
                buffer.append("id:");
                buffer.append("'id_" + project1.getHid() + "_" + route1.getHid() + "'");
                buffer.append(",");
                buffer.append("leaf:true");
                buffer.append(",");
                buffer.append("checked: false");
                buffer.append("}");
            }
            buffer.append("]");
            buffer.append("}");
        }
        buffer.append("]");
        return buffer.toString();
    }

    private String treeJSON4PrnTmpl(List<Project> projects) {
        StringBuffer buffer = new StringBuffer();
//        buffer.append("root: {expanded: true, children:");

        buffer.append("[");
        String prefix = "";
        for (int i = 0; i < projects.size(); i++) {
            Project project1 = projects.get(i);
            buffer.append(prefix);
            prefix = ",";
            buffer.append("{");
            buffer.append("text:");
            buffer.append("'" + Constants.javascriptString(project1.getName()) + "'");
            buffer.append(",");
            buffer.append("id:");
            buffer.append("'id_" + project1.getHid() + "'");
            buffer.append(",");
            buffer.append("expanded: true");
            buffer.append(",");
            buffer.append("children:");
            buffer.append("[");
            String prefix1 = "";
            for (Route route : project1.getRoutes()) {
                buffer.append(prefix1);
                prefix1 = ",";
                buffer.append("{");
//                buffer.append("text:");
//                buffer.append("'" + Constants.javascriptString(route.getName()) + "'");
//                buffer.append(",");
                buffer.append("id:");
                buffer.append("'id_" + project1.getHid() + "_" + route.getHid() + "'");
                buffer.append(",");
                buffer.append("leaf:true");
                buffer.append(",");

                String routeName = Constants.javascriptString(route.getName());
                String prnTmplName; // alredy binded print template name in another route
                if((prnTmplName = route.canHaveThisPrintTemplate(getType(), getHid())) == null){
                    String result = "checked: false,";
                    if(route.getRoutePrintTemplateses().size() > 0){
                        for(RoutePrintTemplates routePrnTmpl : route.getRoutePrintTemplateses()) {
                            PrintTemplates prnTmpl = routePrnTmpl.getPrintTemplates();
                            if(prnTmpl.getDocDir().getHid().intValue() == getType()){// one print template per route
                                result = "checked: true,";
                                break;
                            }
                        }
                    }
                    buffer.append(result);

                } else {// has refs, but not mine -> binded somewhere else
                    routeName += " (<b>" + prnTmplName + "</b>)";
                }
                buffer.append("text:");
                buffer.append("'" + routeName + "'");

                buffer.append("}");
            }
            buffer.append("]");
            buffer.append("}");
        }
        buffer.append("]");
        return buffer.toString();
    }

    private String treeJSON(List<Project> projects, boolean full) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("[");
        String prefix = "";
        for (int i = 0; i < projects.size(); i++) {
            Project project1 = projects.get(i);
            buffer.append(prefix);
            prefix = ",";
            buffer.append("{");
            buffer.append("text:");
            buffer.append("'" + Constants.javascriptString(project1.getName()) + "'");
            buffer.append(",");
            buffer.append("id:");
            buffer.append("'id_" + project1.getHid() + "'");
            if (i == 0) {
                buffer.append(",");
                buffer.append("expanded:true");
            }
            buffer.append(",");
            buffer.append("children:");
            buffer.append("[");
            String prefix1 = "";
            int idx = 0;
            for (Route route1 : project1.getRoutes()) {
                buffer.append(prefix1);
                prefix1 = ",";
                buffer.append("{");
                buffer.append("text:");
                buffer.append("'" + Constants.javascriptString(route1.getName()) + "'");
                buffer.append(",");
                buffer.append("id:");
                buffer.append("'id_" + project1.getHid() + "_" + route1.getHid() + "'");
                if (i == 0 && idx == 0) {
                    buffer.append(",");
                    buffer.append("expanded:true");
                }
                buffer.append(",");
                buffer.append("children:");
                buffer.append("[");
                if (full) {
                    String prefix2 = "";
                    for (RouteDoc routeDoc1 : route1.getRouteDocs()) {
                        if (routeDoc1 != null) {     // if filter applied, check LIST collection for elements that was fileterd out(can be NULL elements in LIST), for SETS this checking is not required
                            buffer.append(prefix2);
                            prefix2 = ",";
                            buffer.append("{");
                            buffer.append("text:");
                            buffer.append("'" + Constants.javascriptString(routeDoc1.getDocDir().getName()) + "'");
                            buffer.append(",");
                            buffer.append("id:");
                            buffer.append("'id_" + project1.getHid() + "_" + route1.getHid() + "_" + routeDoc1.getDocDir().getName() + "'");
                            buffer.append(",");
                            buffer.append("leaf:true");
                            buffer.append("}");
                        }
                    }
                }
                buffer.append("]");
                buffer.append("}");
                idx++;
            }
            buffer.append("]");
            buffer.append("}");
        }
//        buffer.append(",{text: 'Пользователи',iconCls:'users',leaf: true,id:'users'}");
//        buffer.append(",{text: 'Выход',leaf: true,iconCls:'logout',id:'exit'}");
        buffer.append("]");
        return buffer.toString();
    }

    private String docsJSON(List<DocDir> docs) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("[");
        String prefix = "";
        for (DocDir doc : docs) {
            buffer.append(prefix);
            prefix = ",";
            buffer.append("{");
            buffer.append("text:");
//            buffer.append("'" + Constants.javascriptString(routeDoc1.getDocDir().getDescr()) + "'");
            buffer.append(",");
            buffer.append("id:");
//            buffer.append("'id_" + project.getHid() + "_" + route.getHid() + "_" + routeDoc1.getDocDir().getName() + "'");
            buffer.append(",");
            buffer.append("leaf:true");
            buffer.append("}");
        }
        buffer.append("]");
        return buffer.toString();
    }


//    private String docsJSON(List<Project> projects) {
//        StringBuffer buffer = new StringBuffer();
//        buffer.append("[");
//        String prefix = "";
//        for (Project project : projects) {
//            for (Route route : project.getRoutes().values()) {
//                for (RouteDoc routeDoc1 : route.getRouteDocs()) {
//                    buffer.append(prefix);
//                    prefix = ",";
//                    buffer.append("{");
//                    buffer.append("text:");
//                    buffer.append("'" + Constants.javascriptString(routeDoc1.getDocDir().getDescr()) + "'");
//                    buffer.append(",");
//                    buffer.append("id:");
//                    buffer.append("'id_" + project.getHid() + "_" + route.getHid() + "_" + routeDoc1.getDocDir().getName() + "'");
//                    buffer.append(",");
//                    buffer.append("leaf:true");
//                    buffer.append("}");
//                }
//                buffer.append("]");
//                buffer.append("}");
//            }
//            buffer.append("]");
//            buffer.append("}");
//        }
//        buffer.append("]");
//        return buffer.toString();
//    }


    private ProjectDAO projectDAO;
    private PrintTemplatesDAO printTemplatesDAO;
    private Project project;

    public void setProjectDAO(ProjectDAO dao) {
        this.projectDAO = dao;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Override
    public void setPrintTemplatesDAO(PrintTemplatesDAO dao) {
        printTemplatesDAO = dao;
    }
}
