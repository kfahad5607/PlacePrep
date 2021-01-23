import java.util.*;

public class solution {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int i, m = 0, flag = 0;
        int n = sc.nextInt();// it is the number to be checked
        m = n / 2;
        if (n == 0 || n == 1) {
            System.out.println("false");
        } else {
            for (i = 2; i <= m; i++) {
                if (n % i == 0) {
                    System.out.println("false");
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                System.out.println("true");
            }
        } // end of else
    }

}
