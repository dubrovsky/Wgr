package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.dto.*;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.metadata.TypeBuilder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
@Component("mapper")
public class DefaultMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {
        factory.getConverterFactory().registerConverter(new CimSmgsDocsConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCarListConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCarListKontOtprConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCarListVagOtprConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsKonListConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCimSmgsPlatelConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCimSmgsPlombConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCimSmgsGruzConverter());
        factory.getConverterFactory().registerConverter(new CimSmgsCimSmgsDanGruzConverter());
    }

    static class CimSmgsDocsConverter extends BidirectionalConverter<Map<Integer, CimSmgsDocs>, Map<Integer, Aviso2CimSmgsDocsDTO>> {

        @Override
        public Map<Integer, Aviso2CimSmgsDocsDTO> convertTo(Map<Integer, CimSmgsDocs> source, Type<Map<Integer, Aviso2CimSmgsDocsDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Integer, CimSmgsDocs>>(){}.build(), new TypeBuilder<Map<Integer, Aviso2CimSmgsDocsDTO>>(){}.build()));
        }

        @Override
        public Map<Integer, CimSmgsDocs> convertFrom(Map<Integer, Aviso2CimSmgsDocsDTO> source, Type<Map<Integer, CimSmgsDocs>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Integer, Aviso2CimSmgsDocsDTO>>(){}.build(), new TypeBuilder<Map<Integer, CimSmgsDocs>>(){}.build()));
        }
    }

    static class CimSmgsCarListConverter extends BidirectionalConverter<Map<Byte, CimSmgsCarList>, Map<Byte, Aviso2CimSmgsCarListDTO>> {

        @Override
        public Map<Byte, Aviso2CimSmgsCarListDTO> convertTo(Map<Byte, CimSmgsCarList> source, Type<Map<Byte, Aviso2CimSmgsCarListDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTO>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsCarList> convertFrom(Map<Byte, Aviso2CimSmgsCarListDTO> source, Type<Map<Byte, CimSmgsCarList>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTO>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build()));
        }
    }

    static class CimSmgsCarListKontOtprConverter extends BidirectionalConverter<Map<Byte, CimSmgsCarList>, Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr>> {

        @Override
        public Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr> convertTo(Map<Byte, CimSmgsCarList> source, Type<Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsCarList> convertFrom(Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr> source, Type<Map<Byte, CimSmgsCarList>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build()));
        }
    }

    static class CimSmgsCarListVagOtprConverter extends BidirectionalConverter<Map<Byte, CimSmgsCarList>, Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr>> {

        @Override
        public Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr> convertTo(Map<Byte, CimSmgsCarList> source, Type<Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsCarList> convertFrom(Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr> source, Type<Map<Byte, CimSmgsCarList>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build()));
        }
    }

    static class CimSmgsKonListConverter extends BidirectionalConverter<Map<Byte, CimSmgsKonList>, Map<Byte, Aviso2CimSmgsKonListDTO>> {

        @Override
        public Map<Byte, Aviso2CimSmgsKonListDTO> convertTo(Map<Byte, CimSmgsKonList> source, Type<Map<Byte, Aviso2CimSmgsKonListDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsKonList>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsKonListDTO>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsKonList> convertFrom(Map<Byte, Aviso2CimSmgsKonListDTO> source, Type<Map<Byte, CimSmgsKonList>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsKonListDTO>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsKonList>>(){}.build()));
        }
    }

    static class CimSmgsCimSmgsPlatelConverter extends BidirectionalConverter<Map<Byte, CimSmgsPlatel>, Map<Byte, Aviso2CimSmgsPlatelDTO>> {

        @Override
        public Map<Byte, Aviso2CimSmgsPlatelDTO> convertTo(Map<Byte, CimSmgsPlatel> source, Type<Map<Byte, Aviso2CimSmgsPlatelDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsPlatel>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsPlatelDTO>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsPlatel> convertFrom(Map<Byte, Aviso2CimSmgsPlatelDTO> source, Type<Map<Byte, CimSmgsPlatel>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsPlatelDTO>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsPlatel>>(){}.build()));
        }
    }

    static class CimSmgsCimSmgsPlombConverter extends BidirectionalConverter<Map<Byte, CimSmgsPlomb>, Map<Byte, Aviso2CimSmgsPlombDTO>> {

        @Override
        public Map<Byte, Aviso2CimSmgsPlombDTO> convertTo(Map<Byte, CimSmgsPlomb> source, Type<Map<Byte, Aviso2CimSmgsPlombDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsPlomb>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsPlombDTO>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsPlomb> convertFrom(Map<Byte, Aviso2CimSmgsPlombDTO> source, Type<Map<Byte, CimSmgsPlomb>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsPlombDTO>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsPlomb>>(){}.build()));
        }
    }

    static class CimSmgsCimSmgsGruzConverter extends BidirectionalConverter<Map<Integer, CimSmgsGruz>, Map<Integer, Aviso2CimSmgsGruzDTO>> {

        @Override
        public Map<Integer, Aviso2CimSmgsGruzDTO> convertTo(Map<Integer, CimSmgsGruz> source, Type<Map<Integer, Aviso2CimSmgsGruzDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build(), new TypeBuilder<Map<Integer, Aviso2CimSmgsGruzDTO>>(){}.build()));
        }

        @Override
        public Map<Integer, CimSmgsGruz> convertFrom(Map<Integer, Aviso2CimSmgsGruzDTO> source, Type<Map<Integer, CimSmgsGruz>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Integer, Aviso2CimSmgsGruzDTO>>(){}.build(), new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build()));
        }
    }

    static class CimSmgsCimSmgsDanGruzConverter extends BidirectionalConverter<Map<Byte, CimSmgsDanGruz>, Map<Byte, Aviso2CimSmgsDanGruzDTO>> {

        @Override
        public Map<Byte, Aviso2CimSmgsDanGruzDTO> convertTo(Map<Byte, CimSmgsDanGruz> source, Type<Map<Byte, Aviso2CimSmgsDanGruzDTO>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, CimSmgsDanGruz>>(){}.build(), new TypeBuilder<Map<Byte, Aviso2CimSmgsDanGruzDTO>>(){}.build()));
        }

        @Override
        public Map<Byte, CimSmgsDanGruz> convertFrom(Map<Byte, Aviso2CimSmgsDanGruzDTO> source, Type<Map<Byte, CimSmgsDanGruz>> destinationType, MappingContext mappingContext) {
            return new TreeMap<>(mapperFacade.mapAsMap(source, new TypeBuilder<Map<Byte, Aviso2CimSmgsDanGruzDTO>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsDanGruz>>(){}.build()));
        }
    }
}


