package com.seanachaidh.handyparking;

import java.sql.Timestamp;
import java.util.UUID;

public class Token {
    private UUID token;
    private boolean valid;
    private Timestamp time;

    public Token(UUID token, boolean valid, Timestamp time) {
        this.token = token;
        this.valid = valid;
        this.time = time;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((token == null) ? 0 : token.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Token other = (Token) obj;
        if (token == null) {
            if (other.token != null)
                return false;
        } else if (!token.equals(other.token))
            return false;
        return true;
    }

    public boolean isValid() {
        return true;
    }

}
