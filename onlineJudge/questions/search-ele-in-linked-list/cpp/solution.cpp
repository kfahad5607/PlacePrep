// Recursive C++ program to search 
// an element in linked list 
#include <bits/stdc++.h> 
using namespace std; 

/* Link list node */
struct Node 
{ 
	int key; 
	struct Node* next; 
}; 

/* Given a reference (pointer to pointer) to the head 
of a list and an int, push a new node on the front 
of the list. */
void push(struct Node** head_ref, int new_key) 
{ 
	/* allocate node */
	struct Node* new_node = 
			(struct Node*) malloc(sizeof(struct Node)); 

	/* put in the key */
	new_node->key = new_key; 

	/* link the old list off the new node */
	new_node->next = (*head_ref); 

	/* move the head to point to the new node */
	(*head_ref) = new_node; 
} 

/* Checks whether the value x is present in linked list */
bool search(struct Node* head, int x) 
{ 
	// Base case 
	if (head == NULL) 
		return false; 
	
	// If key is present in current node, return true 
	if (head->key == x) 
		return true; 

	// Recur for remaining list 
	return search(head->next, x); 
} 

/* Driver code*/
int main() 
{ 
	/* Start with the empty list */
	struct Node* head = NULL; 
	int target, n, temp; 

    cin >> target;
    cin >> n;

    for (int i = 0; i < n; i++) {
        cin >> temp;
        push(&head, temp);
    }

	/* Use push() to construct below list 
	14->21->11->30->10 */

	search(head, target)? cout << "1" : cout << "0"; 
	return 0; 
} 

// This code is contributed by SHUBHAMSINGH10 
