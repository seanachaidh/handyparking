package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.Area;

public class UserAreaSpecificResource extends Resource<Area> {

    public UserAreaSpecificResource(HttpClient client) {
        super(Area[].class, "/user/{uid}/area/{aid}", client);
    }
    
}
