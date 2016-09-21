from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotModified
from .models import *
import json


def new_paper(request):  # if get, serve new dialogue, if post, make test then redirect to edit page
    if request.method == "POST":
        user = User.objects.get(username=request.user.username)
        title = request.POST.get("title").replace(" ", "_")

        if Paper.objects.filter(owner=user).filter(title=title).exists():
            return HttpResponseRedirect('/main/edit/' + title)

        object = Paper(
            title=title,
            cards="""[{"numb":"1","fact":"Create notecards using the panel below. Pages and tags are optional,sources are mandatory.","source":"1","tags":[]},{"numb":"2","fact":"Notecards will turn green when they are used.Sources will turn yellow when used by a notecard, and green when used by a notecard in the essay.", "source":"1","tags":[]},{"numb":"3","fact":"There are several keyboard shortcuts. Alt-n will toggle the new notecards panel. Alt-s will toggle the sources panel. Alt-l will focus on the search box. Alt-e will focus on the essay.","source":"1","tags":[]},{"numb":"4","fact":"The search box can search text and tags. Clicking on a tag will add it to the search box.","source":"1","tags":[]}]""",
            text='Type your essay here. Cite notecards in your essay like this (1).',
            sources='[{"numb":"1","url":"vosotros.xyz"}]',
            owner=user
        )
        object.save()

        return HttpResponseRedirect('/main/edit/' + title)

    # making a new test. Serve the create file.
    return render(request, 'main/new.html')


def edit(request, paper):
    owner = User.objects.get(username=request.user.username)
    paper = Paper.objects.filter(owner=owner).get(title=paper)
    if paper.cards == "" or paper.cards is None:
        paper.cards = False
    else:
        paper.cards = json.loads(paper.cards)
    if paper.sources == "" or paper.sources is None:
        paper.sources = False
    else:
        paper.sources = json.loads(paper.sources)
    return render(request, "main/edit.html", {'paper': paper})


def rename_paper(request):
    user = User.objects.get(username=request.user.username)
    if Paper.objects.filter(owner=user).filter(title=request.POST.get("new")).exists():
            return HttpResponseNotModified("test with this name already exists")
    paper = Paper.objects.filter(owner=user).get(title=request.POST.get("old"))
    paper.title = request.POST.get("new")
    paper.save()
    return HttpResponse("renamed")
    pass


def delete_paper(request, paper):
    owner = User.objects.get(username=request.user.username)
    paper = Paper.objects.filter(owner=owner).get(title=paper)
    paper.delete()
    return HttpResponse("deleted")
    pass


def save_paper(request):
    user = User.objects.get(username=request.user.username)
    paper = Paper.objects.filter(owner=user).get(title=request.POST.get("title"))
    paper.cards = request.POST.get("cards")
    paper.sources = request.POST.get("sources")
    paper.text = request.POST.get("essay")
    paper.save()
    return HttpResponse("saved")
    pass
