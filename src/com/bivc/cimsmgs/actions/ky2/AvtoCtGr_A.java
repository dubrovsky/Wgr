package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author p.dzeviarylin
 */
public class AvtoCtGr_A extends CimSmgsSupport_A {
	private static final Logger log = LoggerFactory.getLogger(AvtoCtGr_A.class);

	public String execute() throws Exception {
		if (StringUtils.isEmpty(action)) {
			throw new RuntimeException("Empty action parameter");
		}

		try {
			switch (Action.valueOf(action.toUpperCase())) {
				case SAVE:
					return save();
				case EDIT:
					return edit();
				default:
					throw new RuntimeException("Unknown action");
			}

		} catch (IllegalArgumentException e) {
			throw new RuntimeException(e);
		}

	}

	private String edit() throws Exception {
		Avto avto = avtoDAO.findById(getHid(), false);
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(avto, AvtoDTO.class)
								)
						)
		);
		return SUCCESS;
	}

	private String save() throws Exception {
		final AvtoDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoDTO.class, dataObj);
		Avto avto = avtoDAO.findById(dto.getHid(), false);
		avto.updateKonts(dto.getKonts(), mapper);
		avto.updateGruzs(dto.getGruzs(), mapper);
		avto = avtoDAO.makePersistent(avto);
		avtoDAO.flush(); // to get ids
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(avto, AvtoDTO.class)
								)
						)
		);
		return SUCCESS;
	}

	@Autowired
	private Serializer defaultSerializer;
	@Autowired
	private Deserializer defaultDeserializer;
	@Autowired
	private Mapper mapper;
	@Autowired
	private AvtoDAO avtoDAO;

	private String action;
	private String dataObj;

	public void setAction(String action) {
		this.action = action;
	}

	public void setDataObj(String dataObj) {
		this.dataObj = dataObj;
	}

	enum Action {SAVE, EDIT}

}
