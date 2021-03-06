package com.bivc.cimsmgs.db;

// Generated 05.05.2012 14:42:49 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * LoggingEvent generated by hbm2java
 */
public class LoggingEvent implements java.io.Serializable {

	private Long eventId;
	private BigDecimal timestmp;
	private String formattedMessage;
	private String loggerName;
	private String levelString;
	private String threadName;
	private Byte referenceFlag;
	private String arg0;
	private String arg1;
	private String arg2;
	private String arg3;
	private String callerFilename;
	private String callerClass;
	private String callerMethod;
	private String callerLine;
	private Set<LoggingEventProperty> loggingEventProperties = new HashSet<LoggingEventProperty>(
			0);
	private Set<LoggingEventException> loggingEventExceptions = new HashSet<LoggingEventException>(
			0);

	public LoggingEvent() {
	}

	public LoggingEvent(Long eventId, BigDecimal timestmp,
			String formattedMessage, String loggerName, String levelString,
			String callerFilename, String callerClass, String callerMethod,
			String callerLine) {
		this.eventId = eventId;
		this.timestmp = timestmp;
		this.formattedMessage = formattedMessage;
		this.loggerName = loggerName;
		this.levelString = levelString;
		this.callerFilename = callerFilename;
		this.callerClass = callerClass;
		this.callerMethod = callerMethod;
		this.callerLine = callerLine;
	}

	public LoggingEvent(Long eventId, BigDecimal timestmp,
			String formattedMessage, String loggerName, String levelString,
			String threadName, Byte referenceFlag, String arg0,
			String arg1, String arg2, String arg3, String callerFilename,
			String callerClass, String callerMethod, String callerLine,
			Set<LoggingEventProperty> loggingEventProperties,
			Set<LoggingEventException> loggingEventExceptions) {
		this.eventId = eventId;
		this.timestmp = timestmp;
		this.formattedMessage = formattedMessage;
		this.loggerName = loggerName;
		this.levelString = levelString;
		this.threadName = threadName;
		this.referenceFlag = referenceFlag;
		this.arg0 = arg0;
		this.arg1 = arg1;
		this.arg2 = arg2;
		this.arg3 = arg3;
		this.callerFilename = callerFilename;
		this.callerClass = callerClass;
		this.callerMethod = callerMethod;
		this.callerLine = callerLine;
		this.loggingEventProperties = loggingEventProperties;
		this.loggingEventExceptions = loggingEventExceptions;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public BigDecimal getTimestmp() {
		return this.timestmp;
	}

	public void setTimestmp(BigDecimal timestmp) {
		this.timestmp = timestmp;
	}

	public String getFormattedMessage() {
		return this.formattedMessage;
	}

	public void setFormattedMessage(String formattedMessage) {
		this.formattedMessage = formattedMessage;
	}

	public String getLoggerName() {
		return this.loggerName;
	}

	public void setLoggerName(String loggerName) {
		this.loggerName = loggerName;
	}

	public String getLevelString() {
		return this.levelString;
	}

	public void setLevelString(String levelString) {
		this.levelString = levelString;
	}

	public String getThreadName() {
		return this.threadName;
	}

	public void setThreadName(String threadName) {
		this.threadName = threadName;
	}

	public Byte getReferenceFlag() {
		return this.referenceFlag;
	}

	public void setReferenceFlag(Byte referenceFlag) {
		this.referenceFlag = referenceFlag;
	}

	public String getArg0() {
		return this.arg0;
	}

	public void setArg0(String arg0) {
		this.arg0 = arg0;
	}

	public String getArg1() {
		return this.arg1;
	}

	public void setArg1(String arg1) {
		this.arg1 = arg1;
	}

	public String getArg2() {
		return this.arg2;
	}

	public void setArg2(String arg2) {
		this.arg2 = arg2;
	}

	public String getArg3() {
		return this.arg3;
	}

	public void setArg3(String arg3) {
		this.arg3 = arg3;
	}

	public String getCallerFilename() {
		return this.callerFilename;
	}

	public void setCallerFilename(String callerFilename) {
		this.callerFilename = callerFilename;
	}

	public String getCallerClass() {
		return this.callerClass;
	}

	public void setCallerClass(String callerClass) {
		this.callerClass = callerClass;
	}

	public String getCallerMethod() {
		return this.callerMethod;
	}

	public void setCallerMethod(String callerMethod) {
		this.callerMethod = callerMethod;
	}

	public String getCallerLine() {
		return this.callerLine;
	}

	public void setCallerLine(String callerLine) {
		this.callerLine = callerLine;
	}

	public Set<LoggingEventProperty> getLoggingEventProperties() {
		return this.loggingEventProperties;
	}

	public void setLoggingEventProperties(
			Set<LoggingEventProperty> loggingEventProperties) {
		this.loggingEventProperties = loggingEventProperties;
	}

	public Set<LoggingEventException> getLoggingEventExceptions() {
		return this.loggingEventExceptions;
	}

	public void setLoggingEventExceptions(
			Set<LoggingEventException> loggingEventExceptions) {
		this.loggingEventExceptions = loggingEventExceptions;
	}

}
