# 这个模块用来管理inspector的trigger_time。这个值是最近一次后端接收到修改请求的时间。
# 如果这个时间和当前时间相差在一定时间以内，那么inspector就会停止工作。

import multiprocessing
from multiprocessing.shared_memory import SharedMemory
import atexit
import pickle 
import time 
import numpy as np

KEY = "_ylbog_inspector_trigger_time"

def init_trigger_time():
    '''初始化trigger_time。如果已经存在，那么返回False。否则返回True。'''
    try: 
        _data = np.ndarray(1, dtype = np.int64)
        inspector_trigger_time = SharedMemory(KEY, create = True, size = _data.nbytes)
        atexit.register(inspector_trigger_time.close)
        atexit.register(inspector_trigger_time.unlink)

        # 初始化为0
        data = np.ndarray(1, dtype = np.int64, buffer = inspector_trigger_time.buf)
        data[0] = 0

    except FileExistsError:
        return False
    return True

def set_trigger_time(val: int):
    try: 
        inspector_trigger_time = SharedMemory(KEY)

        # 初始化为0
        data = np.ndarray(1, dtype = np.int64, buffer = inspector_trigger_time.buf)
        data [0] = val

        inspector_trigger_time.close()

    except FileNotFoundError:
        return False
    return True

def get_trigger_time() -> int | None:
    val = 0
    try: 
        inspector_trigger_time = SharedMemory(KEY)

        # 初始化为0
        data = np.ndarray(1, dtype = np.int64, buffer = inspector_trigger_time.buf)
        val = data[0]
        inspector_trigger_time.close()

    except FileNotFoundError:
        return None
    
    return val


    