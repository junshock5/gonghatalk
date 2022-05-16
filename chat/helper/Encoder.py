import json
from json import JSONEncoder


class ComplexEncoder(JSONEncoder):
  def default(self, obj):
    if isinstance(obj, dict):
      return json.JSONEncoder.default(self, obj)
    if hasattr(obj, '__dict__'):
      try:
        return obj.__dict__()
      except:
        return obj.__str__()
    else:
      return json.JSONEncoder.default(self, obj)
