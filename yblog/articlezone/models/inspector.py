# Inspector 在空闲的时候巡视所有文章并进行一些修改。

from typing import Any
from django.db import models
from django.db.models.manager import BaseManager
from django.contrib import admin
import django.utils.timezone as timezone
from ..constants import SHORT_STR_LENGTH 
from datetime import date 

class InspectorLog(models.Model):
    id: int
    content  = models.TextField(default = "")
    date     = models.DateField(default = date.today)

    def __str__(self) -> str:
        return f"Log [{self.id}] {self.date}"
