package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.Area;

public class UserAreaResource extends Resource<Area> {
    public UserAreaResource(HttpClient client) {
        super(Area[].class, "/user/{uid}/area", client);
    }
}
