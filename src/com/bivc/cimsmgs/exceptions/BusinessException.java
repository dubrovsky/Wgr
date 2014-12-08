package com.bivc.cimsmgs.exceptions;

/**
 * This exception is used to mark business rule violations.
 *
 */
public class BusinessException
	extends RuntimeException {

	public BusinessException() {}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}
}
