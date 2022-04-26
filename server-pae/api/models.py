from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class UserManager(BaseUserManager):
	def create_user(self, unique_identifier, registration_number, password, name, email):
		if not registration_number:
			raise ValueError("must have registrationNumber")

		user = self.model(unique_identifier=unique_identifier, registration_number=registration_number, name=name, email=email)
		user.set_password(password)
		user.save(using=self.db)

		return user 

	def create_superuser(self, registration_number, password, name):
		user = self.create_user(registration_number, password, name)

		user.is_superuser = True
		user.is_staff = True
		user.save(using=self.db)

		return user

class User(AbstractBaseUser, PermissionsMixin):
	unique_identifier = models.CharField(max_length=20, primary_key=True)
	name = models.CharField(max_length=255)
	email = models.EmailField(max_length=255, unique=True)
	is_superuser = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_tutor = models.BooleanField(default=False)
	is_tutee = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'unique_identifier'
	REQUIRED_FIELDS = ['registration_number', 'name', 'email']


class Tutor(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	registration_number = models.TextField(max_length=9, primary_key=True)
	completed_hours = models.IntegerField(default=0)

class Tutee(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	registration_number = models.TextField(max_length=9, primary_key=True)

class Subject(models.Model):
	code = models.TextField(max_length=9, primary_key=True)
	name = models.CharField(max_length=255, null=False)
	semester = models.PositiveSmallIntegerField(null=False)
