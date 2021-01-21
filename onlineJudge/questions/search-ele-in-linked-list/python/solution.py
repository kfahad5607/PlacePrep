# Iterative Python program to search an element 
# in linked list 

# Node class 
class Node: 
	
	# Function to initialise the node object 
	def __init__(self, data): 
		self.data = data # Assign data 
		self.next = None # Initialize next as null 

# Linked List class 
class LinkedList: 
	def __init__(self): 
		self.head = None # Initialize head as None 

	# This function insert a new node at the 
	# beginning of the linked list 
	def push(self, new_data): 
	
		# Create a new Node 
		new_node = Node(new_data) 

		# 3. Make next of new Node as head 
		new_node.next = self.head 

		# 4. Move the head to point to new Node 
		self.head = new_node 

	# This Function checks whether the value 
	# x present in the linked list 
	def search(self, x): 

		# Initialize current to head 
		current = self.head 

		# loop till current not equal to None 
		while current != None: 
			if current.data == x: 
				return True # data found 
			
			current = current.next
		
		return False # Data Not found 


# Code execution starts here 
if __name__ == '__main__':
    target = int(input())
    size = int(input())
    llist = LinkedList()
    for i in range(size):
        llist.push(int(input()))
    if llist.search(target):
        print(1)
    else:
        print(0)