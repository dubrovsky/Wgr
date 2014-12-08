package com.bivc.cimsmgs.exceptions;

/**
 * This exception is used to mark (fatal) failures in infrastructure and system code.
 *
 */
public class InfrastructureException
	extends RuntimeException {

	public InfrastructureException() {
	}

	public InfrastructureException(String message) {
		super(message);
	}

	public InfrastructureException(String message, Throwable cause) {
		super(message, cause);
	}

	public InfrastructureException(Throwable cause) {
		super(cause);
	}
}
