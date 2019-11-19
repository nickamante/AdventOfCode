with open('day2_input.txt','r') as file:
    ids = file.read().splitlines()

exactly2 = 0
exactly3 = 0

checksum = exactly2 * exactly3
print(checksum)