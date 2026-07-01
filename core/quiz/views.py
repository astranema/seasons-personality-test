from django.shortcuts import render
import json
from pathlib import Path
from django.http import JsonResponse

# Create your views here.
def test(request):
    return render(request, 'quiz/test.html')

def questionsJson(request):
    # maps to core/quiz/questions.json
    path = Path(Path(__file__).parent, 'questions.json')
    jsonText = path.read_text()
    jsonDict = json.loads(jsonText)
    return JsonResponse(jsonDict, safe=False)