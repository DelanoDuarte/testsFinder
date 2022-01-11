from django.db import models

# Create your models here.

class PlaceAddress(models.Model):

    address = models.CharField(max_length=2048, null=False)
    district = models.CharField(max_length=2048)
    zone = models.CharField(max_length=2048)
    zip = models.CharField(max_length=64, null=False)
    city = models.CharField(max_length=128, null=False)
    country = models.CharField(max_length=128, null=False)
    
    # GeoLocation
    latitude = models.DecimalField(max_digits=50, decimal_places=20)
    longitude = models.DecimalField(max_digits=50, decimal_places=20)

class Place(models.Model):

    logo = models.ImageField(upload_to="images/logos/", blank=True, null=True)
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=1028, null=True)
    phone = models.CharField(max_length=64, null=True)
    email = models.CharField(max_length=128)
    website = models.CharField(max_length=512, null=True)
    active = models.BooleanField(default=True)

    last_update = models.DateTimeField(auto_now=True)

    amount_tests = models.IntegerField(null=False)

    # Relationships
    address = models.ForeignKey(PlaceAddress, null=True, on_delete=models.CASCADE)

    @classmethod
    def find_nearby_places(cls, latitude, longitude, radius=2000, limit=50):

        radius = float(radius) / 1000.0

        query = """SELECT place.id, (6367*acos(cos(radians(%2f))
                *cos(radians(address.latitude))*cos(radians(address.longitude)-radians(%2f))
                +sin(radians(%2f))*sin(radians(address.latitude))))
                AS distance FROM place_place AS place INNER JOIN place_placeaddress AS address ON place.address_id = address.id GROUP BY place.id HAVING
                distance < %2f ORDER BY distance LIMIT 0, %d""" % (
            float(latitude),
            float(longitude),
            float(latitude),
            radius,
            limit
        )

        return cls.objects.raw(query)