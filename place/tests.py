import json
from typing import List
from django.test import Client, TestCase

from place.models import Place, PlaceAddress

client = Client()

# Create your tests here.
class PlaceTest(TestCase):
    def setUp(self):
        Place.objects.create(
            name="Random Place",
            phone="913456965",
            email="some@email.com",
            amount_tests=3440,
            address=PlaceAddress.objects.create(
                address="Some Address",
                district="Some District",
                zone="Zone",
                zip="1778432",
                city="Lisbon",
                country="Portugal",
                latitude="38.7525437727448",
                longitude="-9.14951384067536",
            ),
        )
        Place.objects.create(
            name="Random Place 123",
            phone="913456987",
            email="some@email.com",
            amount_tests=2650,
            address=PlaceAddress.objects.create(
                address="Another Address",
                district="Another District",
                zone="Another Zone",
                zip="1778566",
                city="Lisbon",
                country="Portugal",
                latitude="38.7532633272146",
                longitude="-9.1432186961174",
            ),
        )

    ##################################### integration tests

    def test_list_all_places(self):
        response = client.get("/place/")
        self.assertEqual(response.status_code, 200)

    def test_has_more_than_one_place_saved(self):
        response = client.get("/place/")
        data: List
        data = json.loads(response.content)
        self.assertEqual(len(data), 2)

    def test_find_nearby_places(self):
        response = client.post(
            "/place/nearby", {"latitude": "38.7639072", "longitude": "-9.1566962"}
        )
        self.assertTrue(response.status_code, 200)

    ##################################### unit tests

    def test_given_place_id_and_amount_when_decrement_then_update_place(self):

        amount_to_decrement = 5

        place: Place
        place = Place.objects.all().first()
        current_amount = place.amount_tests

        place_new_amount: Place
        place_new_amount = place.decrement_tests(place.id, amount_to_decrement)
        new_amount = place_new_amount.amount_tests

        self.assertEqual(new_amount, current_amount - amount_to_decrement)

    def test_given_place_id_and_amount_when_increment_then_update_place(self):

        amount_to_increment = 10

        place: Place
        place = Place.objects.all().first()
        current_amount = place.amount_tests

        place_new_amount: Place
        place_new_amount = place.increment_tests(place.id, amount_to_increment)
        new_amount = place_new_amount.amount_tests

        self.assertEqual(new_amount, current_amount + amount_to_increment)
