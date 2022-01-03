from django.db import models

# Create your models here.

class PlaceAddress(models.Model):

    mainStreet = models.CharField(max_length=2048, null=False)
    additionalStreet = models.CharField(max_length=2048)
    streetNumber = models.IntegerField(null=False)
    zip = models.IntegerField(null=False)
    city = models.CharField(max_length=128, null=False)
    country = models.CharField(max_length=128, null=False)
    
    # GeoLocation
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

class Place(models.Model):

    logo = models.ImageField(upload_to="images/logos/", blank=True, null=True)
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=1028, null=True)
    phone = models.CharField(max_length=64, null=True)
    email = models.CharField(max_length=128)
    website = models.CharField(max_length=512, null=True)
    active = models.BooleanField(default=True)

    # Relationships
    address = models.ForeignKey(PlaceAddress, null=True, on_delete=models.CASCADE)