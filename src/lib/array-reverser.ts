class ArrayReverser {
    /**
     * The reverseArray function will loop through half an array of size n
     * and swap the first and the last * elements, then the second and 
     * second to last elements, and so on, where i is the curreng index of the array. 
     * If it finds that the either value it is going to swap is an array, 
     * it will call itself on that array and put the reversed array in its new position. 
     * 
     * Once it finishes half of the array, it performs one final check that if there's an odd number 
     * of items in the array and the middle item is an array we do a reverse on that array.
     * @param arr An Array of Arbitrary Elements
     */
    reverseArray(arr: any[]) {
        
        let maxIndex = arr.length / 2;
        if (!Array.isArray(arr)) {
            throw new Error("Start Parameter not an array.")
        }
        for (let i = 0; i < maxIndex; i++) {
            let swapIndex = arr.length-(i + 1)
            let valueStore = arr[swapIndex];
            if (Array.isArray(valueStore)) {
                valueStore = this.reverseArray(valueStore);
            }
            arr[swapIndex] = arr[i];
            arr[i] = valueStore;
        }
        if (arr.length % 2 === 1 && Array.isArray(arr[(arr.length /2) + 1])) {
            let middleElement = arr[(arr.length /2) + 1];
            if (Array.isArray(middleElement)){
                middleElement = this.reverseArray(middleElement);
            }
        }
        return arr;
    }
}

export default ArrayReverser;







