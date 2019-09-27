package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.AvtoZayavDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.AvtoZayavDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.AVTO;

/**
 * @author p.dzeviarylin
 */
public class AvtoZayavCtGr_A extends CimSmgsSupport_A {
	private static final Logger log = LoggerFactory.getLogger(AvtoZayavCtGr_A.class);

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
		AvtoZayav avtoZayav = avtoZayavDAO.findById(getHid(), false);
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(avtoZayav, AvtoZayavDTO.class)
								)
						)
		);
		return SUCCESS;
	}

	private String save() throws Exception {
		final AvtoDTO dto = defaultDeserializer.setLocale(getLocale()).read(AvtoDTO.class, dataObj);
		AvtoZayav avtoZayav = avtoZayavDAO.findById(dto.getHid(), false);
		Map<String, List<?>> contGruz4History = new HashMap<>(2);
		contGruz4History.put("konts", new ArrayList<Kont>());
		contGruz4History.put("gruzs", new ArrayList<Gruz>());

		List<Kont> konts = avtoZayav.updateKonts(dto.getKonts(), mapper);
		List<Gruz> gruzs = avtoZayav.updateGruzs(dto.getGruzs(), mapper);
//		((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//		((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
		avtoZayav = avtoZayavDAO.makePersistent(avtoZayav);
//		saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO);

		avtoZayavDAO.flush(); // to get ids
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(avtoZayav, AvtoZayavDTO.class)
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
	private AvtoZayavDAO avtoZayavDAO;
	@Autowired
	private KontGruzHistoryDAO kontGruzHistoryDAO;


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
