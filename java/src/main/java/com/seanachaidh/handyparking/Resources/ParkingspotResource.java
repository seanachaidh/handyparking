package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.ParkingSpot;

public class ParkingspotResource extends Resource<ParkingSpot> {

    public ParkingspotResource(HttpClient client) {
        super(ParkingSpot[].class, "/parkingspot", client);
    }
    
}
