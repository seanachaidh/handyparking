package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.ParkingSpot;

public class ParkingspotSpecificResource extends Resource<ParkingSpot> {

    public ParkingspotSpecificResource(HttpClient client) {
        super(ParkingSpot[].class, "/parkingspot/{id}", client);
    }
    
}
