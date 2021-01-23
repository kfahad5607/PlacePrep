import java.util.LinkedList;
import java.util.*;

class solution {
    public static void main(String[] args) {
        // Initializing the Linked List
        Scanner sc = new Scanner(System.in);
        LinkedList<Integer> ll = new LinkedList<>();

        int element = sc.nextInt();
        int n = sc.nextInt();
        int temp;
        for (int i = 0; i < n; i++) {
            temp = sc.nextInt();
            ll.add(temp);
        }
        // Adding elements to the Linked List

        // Element to be searched

        // Initializing the answer to the index -1
        int ans = -1;

        // Traversing through the Linked List
        for (int i = 0; i < ll.size(); i++) {

            // Eztracting each element in
            // the Linked List
            int llElement = ll.get(i);

            // Checking if the extracted element is equal to
            // the element to be searched
            if (llElement == element) {

                // Assigning the index of the
                // element to answer
                ans = i;
                break;
            }
        }
        // Checking if the element is present in the Linked
        // List
        if (ans == -1) {
            System.out.println(0);
        } else {
            System.out.println(1);
        }
    }
}
