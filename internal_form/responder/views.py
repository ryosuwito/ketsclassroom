from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.shortcuts import render
from datetime import datetime, timedelta
from assignment.models import Assignment, AssignmentGroup
from custom_form.models import CustomForm
from responder.models import Responder, ResponderGroup
from django.forms.models import model_to_dict

import json

def convert_date(timestamp_data):
    return timestamp_data.strftime("%d/%m/%Y")

def responder_group_create_view(request,*args,**kwargs):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    cResponderGroup = ResponderGroup()
    cResponderGroup.name = body['title']
    cResponderGroup.description = body['description']
    cResponderGroup.save()

    response = {
        "status":"OK",
        "survey_url": cResponderGroup.slug,
        "title":cResponderGroup.name,
        "description":cResponderGroup.description
    }
    return JsonResponse(response, status=200, safe=False)
        
def responder_group_edit_view(request,*args,**kwargs):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    try:
        eResponderGroup = ResponderGroup.objects.get(slug=kwargs['slug'])
    except Exception as e:
        print(e)
        response = {
            "status":"Error",
            "message":"ResponderGroup not found"
        }
        return JsonResponse(response, status=400, safe=False)
    eResponderGroup.name = body['title']
    eResponderGroup.description = body['description']
    eResponderGroup.save()
    response = {
        "status":"OK",
        "survey_url": eResponderGroup.slug,
        "title":eResponderGroup.name,
        "description":eResponderGroup.description
    }
    return JsonResponse(response, safe=False)


def responder_detail_view(request,*args,**kwargs):
    assignment =  Assignment.objects.get(id=kwargs['id'])
    return JsonResponse(model_to_dict(assignment), status=200, safe=False)

def responder_group_detail_view(request,*args,**kwargs):
    responder_group =  model_to_dict(ResponderGroup.objects.get(id=kwargs['id']))
    responders = [model_to_dict(f) for f in Responder.objects.all()]
    response = {
        "responder_group": responder_group,
        "responders": responders
    } 
    print(response)
    return JsonResponse(response, status=200, safe=False)

def responder_list_view(request,*args,**kwargs):
    offset = kwargs['offset']
    limit = kwargs['limit']
    if offset < 0:
        offset = 0
    if limit < 0:
        limit = 1
    responders = Responder.objects.all()
    print(responders.count())
    pages = int(responders.count() / limit) + 1
    responders_queryset = responders[offset:offset+limit]
    responders = [x for x in responders_queryset.values()]
    for s in responders:
        s["created_at"] = datetime.strftime(s["created_at"], "%H:%M %d/%m/%Y")
    response = {
        "pages":pages,
        "data":responders
    }
    return JsonResponse(response, status=200, safe=False)

def responder_group_list_view(request,*args,**kwargs):
    offset = kwargs['offset']
    limit = kwargs['limit']
    if offset < 0:
        offset = 0
    if limit < 0:
        limit = 1
    responder_groups = ResponderGroup.objects.all()
    print(responder_groups.count())
    pages = int(responder_groups.count() / limit) + 1
    responder_groups_queryset = responder_groups[offset:offset+limit]
    responder_groups = [x for x in responder_groups_queryset.values()]
    for s in responder_groups:
        s["created_at"] = datetime.strftime(s["created_at"], "%H:%M %d/%m/%Y")
    response = {
        "pages":pages,
        "data":responder_groups
    }
    return JsonResponse(response, status=200, safe=False)