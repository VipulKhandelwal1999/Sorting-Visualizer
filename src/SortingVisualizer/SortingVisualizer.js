import React from 'react';
import './SortingVisualizer.css';
import {buttonDisability, randomIntFromInterval} from "../Utils/utils";
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/QuickSort';
import getInsertionSortAnimations from '../SortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';
import getBubbleSortAnimations from '../SortingAlgorithms/BubbleSort';
//Changing width,height accordingly with the browser
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = 58;

const PRIMARY_COLOR = 'white'; //Normal color of bars
const SECONDARY_COLOR = 'red'; //Color of bars when they are being compared
const ANIMATION_SPEED_MS = 5; //Animation Speed (how fast color changes, how fast height gets overwritten)

//Tooltips for buttons
const DISABLED_BUTTON = 'Currently Disabled';
const ENABLED_BUTTON = {
  nlogn: 'O(NlogN) Time Complexity',
  nSquare: 'O(N^2) Time Complexity',
};


class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  //Generates new random array
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, WINDOW_HEIGHT - 50)); //random array
    }
    this.setState({ array: array });
    this.restoreStoreButtons();
  }
  disableSortButtons() {
    // let buttonStyle = document.getElementById('mergeSort').style;
    buttonDisability(true, DISABLED_BUTTON, 'mergeSort', '#000000', 'default');
    buttonDisability(true, DISABLED_BUTTON, 'quickSort', '#000000', 'default');
    buttonDisability(true, DISABLED_BUTTON, 'insertionSort', '#000000', 'default');
    buttonDisability(true, DISABLED_BUTTON, 'selectionSort', '#000000', 'default');
    buttonDisability(true, DISABLED_BUTTON, 'bubbleSort', '#000000', 'default');
  }
  restoreStoreButtons() {
    buttonDisability(false, ENABLED_BUTTON.nlogn, 'mergeSort', '#47535E', 'pointer');
    buttonDisability(false, ENABLED_BUTTON.nSquare, 'quickSort', '#47535E', 'pointer');
    buttonDisability(false, ENABLED_BUTTON.nSquare, 'bubbleSort', '#47535E', 'pointer');
    buttonDisability(false, ENABLED_BUTTON.nSquare, 'selectionSort', '#47535E', 'pointer');
    buttonDisability(false, ENABLED_BUTTON.nSquare, 'insertionSort', '#47535E', 'pointer');
  }
  //Sorting Algorithms
  mergeSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == 'comparision1' ||
        animations[i][0] == 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const color =
          animations[i][0] == 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [overwrite, barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  quickSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == 'comparision1' ||
        animations[i][0] == 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color =
          animations[i][0] == 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  bubbleSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == 'comparision1' ||
        animations[i][0] == 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color =
          animations[i][0] == 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  insertionSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getInsertionSortAnimations(
      this.state.array
    );
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === 'comparision1' ||
        animations[i][0] === 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color =
          animations[i][0] === 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  selectionSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getSelectionSortAnimations(
      this.state.array
    );
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === 'comparision1' ||
        animations[i][0] === 'comparision2';
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color =
          animations[i][0] === 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  render() {
    const array = this.state.array;
    const SORT_BUTTONS = 6;
    const TOTAL_BUTTONS = 1 + SORT_BUTTONS;
    return (
      <>
        <div className='buttons'>
          <button
            title='Generates a new random array'
            onClick={() => this.resetArray()}
          >
            Generate New Array
          </button>
          <button
            title='O(NlogN) Time Complexity'
            id='mergeSort'
            onClick={() => this.mergeSort()}
          >
            Merge Sort
          </button>
          <button
            title='O(N^2) Time Complexity'
            id='quickSort'
            onClick={() => this.quickSort()}
          >
            Quick Sort
          </button>
          <button
            title='O(N^2) Time Complexity'
            id='bubbleSort'
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort
          </button>
          <button
            title='O(N^2) Time Complexity'
            id='insertionSort'
            onClick={() => this.insertionSort()}
          >
            Insertion Sort
          </button>
          <button
            title='O(N^2) Time Complexity'
            id='selectionSort'
            onClick={() => this.selectionSort()}
          >
            Selection Sort
          </button>
        </div>
        <div className='array-container'>
          {array.map((value, idx) => (
            <div
              className='array-bar'
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </>
    );
  }
}


export default SortingVisualizer;
