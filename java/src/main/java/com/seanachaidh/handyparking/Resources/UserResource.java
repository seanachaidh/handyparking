package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.User;

public class UserResource extends Resource<User> {
    public UserResource(HttpClient client) {
        super(User[].class, "/user", client);
    }
}
