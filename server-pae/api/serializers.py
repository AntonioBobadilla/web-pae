import email
from rest_framework import serializers
from .models import User, Tutee, Tutor

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['registration_number', 'name', 'password']
		extra_kwargs = {
			'password': {
				'write_only': True
			}
		}

class TuteeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tutee
		fields = ['user', 'email']

class TutorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tutor
		fields = ['user', 'email']

class TuteeRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutee
		fields = ('user', 'email')
		extra_kwargs = {
			'password': {
				'write_only': True
			}
		}

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['user']['registration_number'], validated_data['user']['name'], validated_data['user']['password'])
		tutee = Tutee.objects.create(user=user, email=validated_data.pop('email'))
		return tutee

class TutorRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutor
		fields = ('user', 'email')
		extra_kwargs = {
			'password': {
				'write_only': True
			}
		}

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['user']['registration_number'], validated_data['user']['name'], validated_data['user']['password'])
		tutor = Tutor.objects.create(user=user, email=validated_data.pop('email'))
		return tutor
