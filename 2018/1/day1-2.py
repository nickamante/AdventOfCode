frequency = int(input("Starting Frequency: "))

with open('day1_input.txt', 'r') as file:
    x = file.read().splitlines()

adjustments = [int(el) for el in x] # cast to int

curFreq = frequency
curAdjIndx = 0
seen = { }

while True:
    adj = adjustments[curAdjIndx]
    curFreq = curFreq + adj

    count = seen.get(curFreq, 0)
    seen[curFreq] = count + 1
    if(seen[curFreq] != 2):
        curAdjIndx = 0 if curAdjIndx == len(adjustments) - 1 else curAdjIndx + 1
    else:
        print(curFreq)
        break