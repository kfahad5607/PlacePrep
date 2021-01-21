mylist1 = []
mylist2 = []
mylist3 = []
n1 = int(input())

for i in range(n1):
    mylist1.append(int(input()))

n2 = int(input())

for j in range(n2):
    mylist2.append(int(input()))

for k in range(len(mylist2)):
    mylist3.append(mylist1[k] + mylist2[k])

print(mylist3)