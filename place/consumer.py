import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from .models import Place
from place.serializers import PlaceListSerializer


class NearbyPlacesConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data):
        print("Location Received: ", text_data)
        data = json.loads(text_data)
        lat = data["latitude"]
        lng = data["longitude"]

        places = Place.find_nearby_places(lat, lng)
        serializer = PlaceListSerializer(places, many=True)

        self.send(json.dumps(serializer.data))
        # self.scope["session"].save()
