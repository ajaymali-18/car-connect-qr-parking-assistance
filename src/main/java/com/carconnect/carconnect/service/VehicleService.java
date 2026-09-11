package com.carconnect.carconnect.service;

import com.carconnect.carconnect.entity.Vehicle;
import com.carconnect.carconnect.repository.AuthServiceRepository;
import com.carconnect.carconnect.repository.VehicleRepository;

import java.util.List;

public class VehicleService {

    private VehicleRepository vehicleRepository;

    public VehicleService(AuthServiceRepository authServiceRepository) {
        this.authServiceRepository = authServiceRepository;
    }

    private AuthServiceRepository authServiceRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }


// Get Vehicle informarion

    public Vehicle getVehicleInformation(Vehicle vehicle) {

        Vehicle vObj = new Vehicle();
        vObj.setVehicleNo(vehicle.getVehicleNo());
        vObj.setBrand(vehicle.getBrand());
        vObj.setColor(vehicle.getColor());
        vObj.setModel(vehicle.getModel());

        return vehicleRepository.save(vObj);

    }





}
