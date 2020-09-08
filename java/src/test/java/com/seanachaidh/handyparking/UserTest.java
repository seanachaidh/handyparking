package com.seanachaidh.handyparking;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.Resources.RESTResult;
import com.seanachaidh.handyparking.Resources.Resource;
import com.seanachaidh.handyparking.Resources.UserResource;

import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;

public class UserTest extends TestCase {
    private HttpClient client;
    @Before
    public void setUp(){
        this.client = HttpClient.newHttpClient();
    }

    @Test
    public void testGet(){
        UserResource resource = new UserResource(this.client);
        User[] result = resource.get(null, null);
        User first = result[0];
        assertEquals("Pieter", first.getName());
    }
}
