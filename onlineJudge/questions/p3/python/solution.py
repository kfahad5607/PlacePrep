row = int(input())
col = int(input())
mylist1 = []

for i in range(row):
    mylist2 = []
    for j in range(col):
        mylist2.append(input())
    mylist1.append(mylist2)
print(mylist1)