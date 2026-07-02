from django.shortcuts import render
import json
from pathlib import Path
from django.http import JsonResponse
from django.template import loader
from django.http import HttpResponse

# Create your views here.
def test(request):
    return render(request, 'quiz/test.html')

def questionsJson(request):
    # maps to core/quiz/questions.json
    path = Path(Path(__file__).parent, 'questions.json')
    jsonText = path.read_text()
    jsonDict = json.loads(jsonText)
    return JsonResponse(jsonDict, safe=False)

def results(request):
    template = loader.get_template("quiz/results.html")
    context = {"type": "S--W",
        "spring_value": 6,
        "summer_value": 8,
        "winter_value": 2,
        "autumn_value": 4}
    return HttpResponse(template.render(context, request))