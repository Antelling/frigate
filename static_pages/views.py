from django.shortcuts import render
from django.http import HttpResponse
from main.models import Paper
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    if request.user.is_authenticated():
        user = User.objects.get(username=request.user.username)
        papers = Paper.objects.filter(owner=user)
        print(papers)
        return render(request, 'main/dash.html', {'user':request.user.username, 'papers': papers})
    else:
        return render(request, 'static_pages/index.html', {'user':request.user.username})
