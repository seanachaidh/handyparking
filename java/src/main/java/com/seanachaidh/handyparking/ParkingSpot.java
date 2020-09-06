package com.seanachaidh.handyparking;

import com.google.gson.annotations.SerializedName;

public class ParkingSpot {
    @SerializedName("idParkingSpots")
    private int id;
    private boolean occupied;
    private Coordinate c;

    public int getId() {
        return id;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }

    public Coordinate getC() {
        return c;
    }

    public void setC(Coordinate c) {
        this.c = c;
    }

    public ParkingSpot(boolean occupied, Coordinate c) {
        this.occupied = occupied;
        this.c = c;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
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
        ParkingSpot other = (ParkingSpot) obj;
        if (id != other.id)
            return false;
        return true;
    }


}
