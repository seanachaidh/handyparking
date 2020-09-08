package com.seanachaidh.handyparking.Resources;

import java.net.http.HttpClient;

import com.seanachaidh.handyparking.ParkingSpot;

public class ParkingspotAreaResource extends Resource<ParkingSpot> {
    public ParkingspotAreaResource(HttpClient client) {
        super(ParkingSpot[].class, "/area/{id}/parkingspots", client);
    }
}
