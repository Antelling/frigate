from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'new', views.new_paper, name='new paper'),
    url(r'rename', views.rename_paper, name='rename paper'),
    url(r'save', views.save_paper, name='save paper'),
    url(r'edit/(?P<paper>[\w]+)/$', views.edit, name='edit paper'),
    url(r'delete/(?P<paper>[\w]+)/$', views.delete_paper, name='delete paper'),
]
