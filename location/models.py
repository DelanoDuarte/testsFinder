from typing import List
from django.db import models
from dataclasses import dataclass

from geopy.geocoders import Nominatim
from geopy.location import Location

# Create your models here.
@dataclass
class LocationDTO:

    latitude: str
    longitude: str

@dataclass
class Geolocation:

    address: str
    district: str
    zone: str
    city: str
    zip: str
    country: str

    _geolocator = Nominatim(user_agent="geoapiExercises")

    @classmethod
    def find_by_latitude_and_longitude(cls, location_request: LocationDTO):
        location: Location
        location = cls._geolocator.geocode(location_request.latitude + "," + location_request.longitude)
        return cls._mapLocationToAddress(location)

    def _mapLocationToAddress(location: Location):
        if not location:
            return None

        address: List
        address = location.address.split(",")
        return Geolocation(
            address=address[0].strip(),
            district=address[1].strip(),
            zone=address[2].strip(),
            city=address[-3].strip(),
            zip=address[-2].strip(),
            country=address[-1].strip(),
        )

    def json(self):
        return self.__dict__