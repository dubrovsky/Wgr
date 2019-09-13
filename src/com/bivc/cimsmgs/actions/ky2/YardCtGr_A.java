package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoDTO;
import com.bivc.cimsmgs.dto.ky2.YardDTO;
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

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.YARD;

public class YardCtGr_A extends CimSmgsSupport_A {
	private static final Logger log = LoggerFactory.getLogger(YardCtGr_A.class);

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
		Yard yard = yardDAO.findById(getHid(), false);
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(yard, YardDTO.class)
								)
						)
		);
		return SUCCESS;
	}

	private String save() throws Exception {
		final YardDTO dto = defaultDeserializer.setLocale(getLocale()).read(YardDTO.class, dataObj);
		Yard yard = yardDAO.findById(dto.getHid(), false);
		Map<String, List<?>> contGruz4History = new HashMap<>(2);
		contGruz4History.put("konts", new ArrayList<Kont>());
//		contGruz4History.put("gruzs", new ArrayList<Gruz>());

		List<Kont> konts = yard.updateKonts(dto.getKonts(), mapper);
		((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//		((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
		yard.setSector(yardSectorDAO.getById(dto.getSector().getHid(), false));
		yard = yardDAO.makePersistent(yard);
//		saveContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD);

		yardDAO.flush(); // to get ids
		setJSONData(
				defaultSerializer
						.setLocale(getLocale())
						.write(
								new Response<>(
										mapper.map(yard, AvtoDTO.class)
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
	private YardDAO yardDAO;
	@Autowired
	private KontGruzHistoryDAO kontGruzHistoryDAO;
	@Autowired
	private YardSectorDAO yardSectorDAO;



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
