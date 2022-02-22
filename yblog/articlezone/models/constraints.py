'''这个类规定数据库的约束。'''

def perform_checks(node):
    return checkfather(node)

def checkfather(node):
    seen = set()

    while node is not None:
        if node in seen:
            return False
        seen.add(node)
        node = node.father
    return True
