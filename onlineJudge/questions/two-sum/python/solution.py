def twoSum(nums, target):
    if nums == None:
        return [0,0]
    required = {}
    for i in range(len(nums)):
        if target - nums[i] in required:
            return [required[target - nums[i]],i]
        else:
            required[nums[i]] = i

n = int(input())
input_list = []

for i in range(n):
    input_list.append(int(input()))

target = int(input())

print(twoSum(input_list, target))