package com.carconnect.carconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

        private String vehicleNo;
        private String brand;
        private String model;
        private String color;

//     Remaining :Implement Relationship with User




}
