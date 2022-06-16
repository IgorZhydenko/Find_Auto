from django.test import TestCase
from api.models import User, Post


class PostModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Post.objects.create(name='Test', year="2022-06-14", last_seen_date="2022-06-14")

    def test_name_label(self):
        post = Post.objects.get(pk=1)
        field_label = post._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_date_of_death_label(self):
        post = Post.objects.get(pk=1)
        field_label = post._meta.get_field('year').verbose_name
        self.assertEquals(field_label, 'year')

    def test_first_name_max_length(self):
        post=Post.objects.get(pk=1)
        max_length = post._meta.get_field('name').max_length
        self.assertEquals(max_length, 100)
