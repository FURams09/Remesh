class ArrayReverser {
    static reverseArray(arr) {
        //odd numbered arrays will round down and leave out the n/2 + 1th element but that would not need to swap places. Do a check after the reverse if n%2 ===1 if it's an array and flip it in place;
        let maxIndex = arr.length / 2;
        if (!Array.isArray(arr)) {
            throw new Error("Start Parameter not an array.")
        }
        for (let i = 0; i < maxIndex; i++) {
            let swapIndex = arr.length-(i + 1)
            let valueStore = arr[swapIndex]; //Gets the value we're going to swap with the ith item in the array. 

            if (!this.valueIsValid(valueStore)) {
                throw new Error(`Array has invalid value at index ${swapIndex}`)   
            }
            if (!this.valueIsValid(arr[i])) {
                throw new Error(`Array has invalid value at index ${arr[i]}`)   
            }

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

    static valueIsValid(val: any) {
        return typeof(val) === 'number' || Array.isArray(val)
    }
    
}

export default ArrayReverser;







