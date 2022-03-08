'''这个类规定数据库的约束。'''

def perform_checks(node):
    return checkfather(node)

def checkfather(node):
    seen = set()

    # 这个节点还在新建中...
    if node.id == None:
        return True

    while node is not None:
        if node in seen:
            return False
        seen.add(node)
        node = node.father
    return True
