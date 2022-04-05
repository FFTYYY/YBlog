SHORT_STR_LENGTH = 200
from .concepts import CONCEPT_METAS

'''
CONCEPT_METAS的格式是：
{
    [name : string]: {
        parameters: {[name:string]: {val: string , type: string}} , 
        labels: {[name:string]: string} ,
    }
}
'''

__all__ = [
    "SHORT_STR_LENGTH" , 
    "CONCEPT_METAS" , 
]