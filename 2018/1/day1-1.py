frequency = int(input("Starting Frequency: "))

with open('day1_input.txt', 'r') as file:
    x = file.read().splitlines()

adjustments = [int(el) for el in x] # cast to int

result = sum(adjustments, frequency)
print(result)