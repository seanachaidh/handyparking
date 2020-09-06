package com.seanachaidh.handyparking;

import com.google.gson.annotations.SerializedName;

public class Area {
    @SerializedName("idArea")
    private int id;
    private String name;
    private Coordinate c1, c2;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        Area other = (Area) obj;
        if (id != other.id)
            return false;
        return true;
    }

    public Coordinate getC1() {
        return c1;
    }

    public void setC1(Coordinate c1) {
        this.c1 = c1;
    }

    public Coordinate getC2() {
        return c2;
    }

    public void setC2(Coordinate c2) {
        this.c2 = c2;
    }

    public Area(String name, Coordinate c1, Coordinate c2) {
        this.name = name;
        this.c1 = c1;
        this.c2 = c2;
    }
    
}
