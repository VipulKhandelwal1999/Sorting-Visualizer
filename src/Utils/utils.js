const buttonDisability = (disability, title, elementID, bg, pointer) => {
  document.getElementById(elementID).disabled = disability;
  let buttonStyle = document.getElementById(elementID).style;
  document.getElementById(elementID).title = title;
  buttonStyle.cursor = pointer;
  buttonStyle.background = bg;
};

// Function to generate random number between two numbers (min and max)
const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};


export {randomIntFromInterval, buttonDisability};