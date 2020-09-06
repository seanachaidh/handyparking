package com.seanachaidh.handyparking;

import java.util.ArrayList;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("idUsers")
    private int id;
    private String name, password, email;
    private boolean guide;

    private ArrayList<Area> favorites;
    private ArrayList<ParkingSpot> history;

    private String AuthToken;

    public int getId() {
        return this.id;
    }

    public boolean isGuide() {
        return guide;
    }

    public void setGuide(boolean guide) {
        this.guide = guide;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User(String name, String password, String email, boolean guide) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.guide = guide;
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
        User other = (User) obj;
        if (id != other.id)
            return false;
        return true;
    }

    //Netwerkmethoden: Worden in de constructor gebruikt
    private ArrayList<Area> retrieveFavorites() {
        ArrayList<Area> result = new ArrayList<Area>();
        return result;
    }
    
    private ArrayList<ParkingSpot> retrieveHistory() {
        ArrayList<ParkingSpot> result = new ArrayList<ParkingSpot>();
        return result;
    }

}
