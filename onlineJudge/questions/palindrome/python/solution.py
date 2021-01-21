# function which return reverse of a string

def isPalindrome(s):
	return s == s[::-1]


# Driver code
s = input()
ans = isPalindrome(s)

if ans:
	print(1)
else:
	print(0)