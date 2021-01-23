// C++ program to reverse a string preserving
// spaces.
#include <iostream>
using namespace std;

// Function to reverse the string
// and preserve the space position
string reverses(string str)
{
	// Mark spaces in result
	int n = str.size();
	string result(n, '\0');
	for (int i = 0; i < n; i++)
		if (str[i] == ' ')
			result[i] = ' ';

	// Traverse input string from beginning
	// and put characters in result from end
	int j = n - 1;
	for (int i = 0; i < str.length(); i++) {
		// Ignore spaces in input string
		if (str[i] != ' ') {
			// ignore spaces in result.
			if (result[j] == ' ')
				j--;

			result[j] = str[i];
			j--;
		}
	}

	return result;
}

// Driver code
int main()
{
	string str;
	getline(cin, str); 
	cout << reverses(str) << endl;
	return 0;
}
