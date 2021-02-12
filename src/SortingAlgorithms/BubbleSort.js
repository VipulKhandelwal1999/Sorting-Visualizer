const getBubbleSortAnimations = (array) => {
    let animations  = [];
    let auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations);
    array = auxillaryArray;
    return [animations, array];
}

const bubbleSort = (auxillaryArray, animations) => {
    const N = auxillaryArray.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["comparision1", i, i + 1]);
            animations.push(["comparision2", i, i + 1]);
            if(auxillaryArray[i] > auxillaryArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, auxillaryArray[i + 1]]);
                animations.push(["swap", i + 1, auxillaryArray[i]]);
                swap(auxillaryArray, i, i + 1);
            }
        }
        if(swapped === false) break;
        iters--;
    }
}

const swap = (auxillaryArray, firstIndex, secondIndex) => {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

export default getBubbleSortAnimations;