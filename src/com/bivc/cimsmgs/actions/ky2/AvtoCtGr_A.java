package com.bivc.cimsmgs.actions.ky2;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Response;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.AvtoDTO;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.bivc.cimsmgs.services.ky2.AvtoWzPzService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bivc.cimsmgs.actions.CimSmgsSupport_A.KontGruzHistoryType.AVTO;
import static com.bivc.cimsmgs.services.ky2.AvtoWzPzService.AvtoDocType.PZ;

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
		Map<String, List<?>> contGruz4History = new HashMap<>(2);
		contGruz4History.put("konts", new ArrayList<Kont>());
		contGruz4History.put("gruzs", new ArrayList<Gruz>());

		List<Kont> konts = avto.updateKonts(dto.getKonts(), mapper, clientDAO);
		List<Gruz> gruzs = avto.updateGruzs(dto.getGruzs(), mapper);
		((List<Kont>) contGruz4History.get("konts")).addAll(konts);
		((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
		avto = avtoDAO.makePersistent(avto);
		saveVagContGruzHistory(contGruz4History, kontGruzHistoryDAO, AVTO, vagonHistoryDAO, getUser().getUsr().getUn(), null);

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

		if (avto.getDirection() == 1 && !avto.getKonts().isEmpty()) {
			new Avto_A().getWzPz(PZ, avto.getHid(), avtoDAO, getUser(), avtoWzPzService, avtoFilesDAO);
		}

		return SUCCESS;
	}

	@Autowired
	private AvtoFilesDAO avtoFilesDAO;
	@Autowired
	private AvtoWzPzService avtoWzPzService;
	@Autowired
	private Serializer defaultSerializer;
	@Autowired
	private Deserializer defaultDeserializer;
	@Autowired
	private Mapper mapper;
	@Autowired
	private AvtoDAO avtoDAO;
	@Autowired
	private KontGruzHistoryDAO kontGruzHistoryDAO;
	@Autowired
	private NsiClientDAO clientDAO;
	@Autowired
	private VagonHistoryDAO vagonHistoryDAO;


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
