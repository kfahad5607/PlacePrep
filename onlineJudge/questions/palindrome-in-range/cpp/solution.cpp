#include<iostream>
using namespace std;
//checking if the number is a palindrome
int is_palin(int n){
   int rev = 0;
   for (int i = n; i > 0; i /= 10)
   rev = rev*10 + i%10;
   return (n==rev);
}
void countPal(int min, int max){
   for (int i = min; i <= max; i++)
   if (is_palin(i))
   cout << i << " ";
}
int main(){
   int min, max;
   cin >> min;
   cin >> max;

   countPal(min, max);
   return 0;
}