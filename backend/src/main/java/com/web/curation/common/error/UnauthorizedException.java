package com.web.curation.common.error;

public class UnauthorizedException extends RuntimeException{
    private static final long serialVersionUID = -2238030302650813813L;

    public UnauthorizedException() {
        super("jwt unauthorized");
    }
}
