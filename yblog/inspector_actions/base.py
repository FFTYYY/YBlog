
from typing import Any
from xingyun import Logger
from articlezone.models.inspector import InspectorLog
from datetime import date, datetime

def get_logger(action: str):

    def attach_time(str):
        current_time = datetime.now()
        formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")

        return f"[{formatted_time}] {str}"

    def attach_action(str):

        return f"{action}: {str}"
    
    def make_log(content: str):

        log_obj = InspectorLog.objects.filter(date = date.today())
        if len(log_obj) == 0:
            log_obj = InspectorLog()
        else:
            log_obj = log_obj[0]
        log_obj.content = log_obj.content + f"{content}\n"
        log_obj.save()

    logger = Logger([make_log] , [attach_action, attach_time])
    return logger 

