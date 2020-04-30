package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
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

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.INPUT;
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
				case DELETE:
					return delete();
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
		Yard yard;
		if(dto.getHid() == null) {
			yard = yardDAO.findPlace4Kont(dto.getSector().getHid());
			if (yard == null) {
				setJSONData(
						defaultSerializer
								.setLocale(getLocale())
								.write(new Response<>(false))
				);
				return SUCCESS;
			}
		}
		else
			yard = yardDAO.findById(dto.getHid(), false);

		List<Kont> konts = yard.updateKonts(dto.getKonts(), mapper, clientDAO);
		for(Kont kont: yard.getKonts())
			kontDAO.makePersistent(kont);
		Map<String, List<?>> contGruz4History = new HashMap<>(1);
		contGruz4History.put("konts", new ArrayList<Kont>());
		((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//		yard.setSector(yardSectorDAO.getById(dto.getSector().getHid(), false));

//		yard = yardDAO.makePersistent(yard);
		saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, KontGruzHistoryType.INPUT, vagonHistoryDAO, getUser().getUsr().getUn(), null);
		saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, YARD, vagonHistoryDAO, getUser().getUsr().getUn(), null);

		yardDAO.flush(); // to get ids
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

	private String delete() throws Exception {
		final Kont kont = kontDAO.getById(getHid(), false);
		kontDAO.makeTransient(kont);
		setJSONData(defaultSerializer.setLocale(getLocale()).write(new Response()));
		return SUCCESS;
	}

	@Autowired
	private VagonHistoryDAO vagonHistoryDAO;
	@Autowired
	private KontGruzHistoryDAO kontGruzHistoryDAO;
	@Autowired
	private Serializer defaultSerializer;
	@Autowired
	private Deserializer defaultDeserializer;
	@Autowired
	private Mapper mapper;
	@Autowired
	private YardDAO yardDAO;
	@Autowired
	private YardSectorDAO yardSectorDAO;
	@Autowired
	private NsiClientDAO clientDAO;
	@Autowired
	private KontDAO kontDAO;

	private String action;
	private String dataObj;

	public void setAction(String action) {
		this.action = action;
	}

	public void setDataObj(String dataObj) {
		this.dataObj = dataObj;
	}

	enum Action {SAVE, EDIT, DELETE}

}
