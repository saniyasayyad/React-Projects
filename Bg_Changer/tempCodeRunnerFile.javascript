year = 2003;

if(year % 4 ==0) and (year %  100 != 0):
    print("leap");

elif (year % 400 == 0 and year % 100 == 0):
    print("Leap year");

else:
    print("Not A leap Year")