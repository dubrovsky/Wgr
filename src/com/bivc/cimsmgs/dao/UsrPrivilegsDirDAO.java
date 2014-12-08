package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.UsrPrivilegsDir;

import java.util.List;

public interface UsrPrivilegsDirDAO extends GenericDAO<UsrPrivilegsDir, String> {
	public List<UsrPrivilegsDir> findAll();
}
