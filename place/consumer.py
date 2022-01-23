import json
from asgiref.sync import async_to_sync

from channels.generic.websocket import WebsocketConsumer
from place.serializers import PlaceListSerializer

from .models import Place


class NearbyPlacesConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)("places_nearby", self.channel_name)
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data):
        print("Location Received: ", text_data)
        data = json.loads(text_data)

        lat = data["latitude"]
        lng = data["longitude"]

        self.scope["session"]["latitude"] = lat
        self.scope["session"]["longitude"] = lng
        self.scope["session"].save()

        places = Place.find_nearby_places(lat, lng)
        serializer = PlaceListSerializer(places, many=True)

        self.send(json.dumps(serializer.data))

    def update_places(self, event):

        lat = self.scope["session"]["latitude"]
        lng = self.scope["session"]["longitude"]

        print("Message Recieved from Outside: ")

        # Send message to WebSocket
        places = Place.find_nearby_places(lat, lng)
        serializer = PlaceListSerializer(places, many=True)

        self.send(json.dumps(serializer.data))
