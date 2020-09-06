package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.UUID;

import com.google.gson.GsonBuilder;
import com.seanachaidh.handyparking.User;

public class UserResource extends Resource<User> {

    private GsonBuilder buildGSON() {
        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(UUID.class, new UUIDJson());
        return builder;
    }

    public UserResource() {
        super("/user");
    }

    @Override
    public RESTResult delete(HashMap<String, String> params, HashMap<String, String> body) {
        String jsonResult = "";
        return null;
    }

    @Override
    public RESTResult get(HashMap<String, String> params, HashMap<String, String> body) {
        HttpResponse<String> response = this.performRequest(RequestType.GET, "");

        String retval = response.body();
        GsonBuilder mybuilder = buildGSON();
        User[] result = mybuilder.create().fromJson(retval, User[].class);
        return new RESTResult(result, true);
    }

    @Override
    public RESTResult patch(HashMap<String, String> params, HashMap<String, String> body) {
        return null;
    }

    @Override
    public RESTResult post(HashMap<String, String> params, HashMap<String, String> body) {
        return null;
    }

    @Override
    public RESTResult put(HashMap<String, String> params, HashMap<String, String> body) {
        return null;
    }
    
}
