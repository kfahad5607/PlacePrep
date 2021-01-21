
def inorderTraversal( root):
        if not root: return []
        res = []
        
        def inorder(node):
            if node.left: inorder(node.left)
            res.append(node.val)
            if node.right: inorder(node.right)
        inorder(root)
        return res

# Driver Code 
if __name__ == '__main__':
    n = int(input())
    list1 = []
    i = 0
    while i <= n:
        a = input()
        if a == 'null':
            list1.append(a)
        else:
            list1.append(int(input()))
        i = i  + 1
    print(list1)

    # inorderTraversal(list1[0])
  
   