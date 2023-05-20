// Two most popular equations to estimate 1RM
// (from https://en.wikipedia.org/wiki/One-repetition_maximum#Calculating_1RM)

// Brzycki
//
//  1RM = w * 36 / (37 - r)
function brzycki1RM(weight, reps) {
  return (weight * 36.0) / (37.0 - reps);
}
// for calculating reps based on 1RM
//  w = 1RM / (36 / (37 - r))
function brzyckiReps(oneRepMax, reps) {
  return oneRepMax / (36.0 / (37.0 - reps));
}

// Epley
//
//  1RM = w * (1 + r/30)
function epley1RM(weight, reps) {
  return weight * (1.0 + reps / 30.0);
}

// for calculating reps based on 1RM
//  w = 1RM / (1 + r/30)
function epleyReps(oneRepMax, reps) {
  return oneRepMax / (1.0 + reps / 30.0);
}

const KG_PER_LB = 2.20462262185;

const WeightUnits = Object.freeze({
  LB: 1,
  KG: 2,
});

function unitToStr(unit) {
  if (unit === WeightUnits.LB) {
    return 'lb';
  } else {
    return 'kg';
  }
}

function formatWeight(weight, unit) {
  // &nbsp; is char 160
  return `${weight.toFixed(1)}\xa0${unitToStr(unit)}`;
}

function conversionFactor(fromUnit, toUnit) {
  if (fromUnit === WeightUnits.LB) {
    if (toUnit === WeightUnits.LB) {
      return 1;
    } else {
      return 1 / KG_PER_LB;
    }
  } else {
    if (toUnit === WeightUnits.KG) {
      return 1;
    } else {
      return KG_PER_LB;
    }
  }
}

class Weight {
  constructor(weight, unit, repEquation) {
    this.weight = weight;
    this.unit = unit;
    this.repEquation = repEquation;
  }

  formatOneRepMax() {
    return formatWeight(this.weight, this.unit);
  }

  formatPercentage(percentage, targetUnit) {
    const weight = this.weight * percentage;
    const converted = weight * conversionFactor(this.unit, targetUnit);
    return formatWeight(converted, targetUnit);
  }

  formatRep(repNumber, targetUnit) {
    const weight = this.repEquation(this.weight, repNumber);
    const converted = weight * conversionFactor(this.unit, targetUnit);
    return formatWeight(converted, targetUnit);
  }
}

function getWeight() {
  const weight = document.getElementById('weight-input').value;
  const weightNum = Number(weight);
  if (Number.isNaN(weightNum) || weight === '') {
    weightError('Please enter a number for weight');
  } else if (weightNum <= 0) {
    weightError('Please enter a number greater than 0 for weight');
  } else {
    hideWeighError();
    return weightNum;
  }
}

function getReps() {
  const reps = document.getElementById('reps-input').value;
  const repsNum = Number(reps);
  if (Number.isNaN(repsNum) || reps === '') {
    repsError('Please enter a number for reps');
  } else if (repsNum <= 0) {
    repsError('Please enter a number greater than 0 for reps');
  } else {
    hideRepsError();
    return repsNum;
  }
}

function getUnit() {
  if (document.getElementById('radio-lb').checked) {
    return WeightUnits.LB;
  } else {
    // assuming one of these must be checked
    return WeightUnits.KG;
  }
}

function getEquations() {
  if (document.getElementById('brzycki').checked) {
    return [brzycki1RM, brzyckiReps];
  } else {
    // assuming one of these must be checked
    return [epley1RM, epleyReps];
  }
}

function calcOneRepMax() {
  const weight = getWeight();
  const reps = getReps();
  const unit = getUnit();
  const [oneRepMaxEquation, repEquation] = getEquations();
  if (weight !== undefined && reps !== undefined) {
    const oneRepMax = oneRepMaxEquation(weight, reps);
    return new Weight(oneRepMax, unit, repEquation);
  }
}

function weightError(message) {
  const errorElem = document.getElementById('weight-error');
  errorElem.textContent = message;
  errorElem.classList.remove('none');
}

function hideWeighError() {
  const errorElem = document.getElementById('weight-error');
  errorElem.classList.add('none');
}

function repsError(message) {
  const errorElem = document.getElementById('reps-error');
  errorElem.textContent = message;
  errorElem.classList.remove('none');
}

function hideRepsError() {
  const errorElem = document.getElementById('reps-error');
  errorElem.classList.add('none');
}

function setOneRepMax(weight) {
  if (weight !== undefined) {
    const oneRepMaxSpan = document.getElementById('one-rep-max');
    oneRepMaxSpan.textContent = weight.formatOneRepMax();
  }
}

function setPercentages(weight) {
  if (weight !== undefined) {
    const percentageTable = document.getElementById('table-percent');
    const tbody = percentageTable.children[1];
    for (let i = 0; i < tbody.childElementCount; i++) {
      const tr = tbody.children[i];
      const tdLb = tr.children[1];
      const tdKg = tr.children[2];
      // value goes down by 5% every step
      const percentage = 1 - 0.05 * i;
      tdLb.textContent = weight.formatPercentage(percentage, WeightUnits.LB);
      tdKg.textContent = weight.formatPercentage(percentage, WeightUnits.KG);
    }
  }
}

function setReps(weight) {
  if (weight !== undefined) {
    const repsTable = document.getElementById('table-reps');
    const tbody = repsTable.children[1];
    for (let i = 0; i < tbody.childElementCount; i++) {
      const tr = tbody.children[i];
      const tdLb = tr.children[1];
      const tdKg = tr.children[2];
      tdLb.textContent = weight.formatRep(i + 1, WeightUnits.LB);
      tdKg.textContent = weight.formatRep(i + 1, WeightUnits.KG);
    }
  }
}

// setup listeners

// if anything changes, recalculate
function inputChanged(/* event */) {
  const oneRepMax = calcOneRepMax();
  setOneRepMax(oneRepMax);
  setPercentages(oneRepMax);
  setReps(oneRepMax);
}

// use the 'input' event for the text inputs
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
const weightInput = document.getElementById('weight-input');
weightInput.addEventListener('input', inputChanged);
const repsInput = document.getElementById('reps-input');
repsInput.addEventListener('input', inputChanged);

// use the 'change' event for the radio buttons
// (only fires when radio is selected, not when un-selected)
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
const lbsRadio = document.getElementById('radio-lb');
lbsRadio.addEventListener('change', inputChanged);
const kgsRadio = document.getElementById('radio-kg');
kgsRadio.addEventListener('change', inputChanged);

const brzyckiRadio = document.getElementById('brzycki');
brzyckiRadio.addEventListener('change', inputChanged);
const epleyRadio = document.getElementById('epley');
epleyRadio.addEventListener('change', inputChanged);

// call this to initialize everything
inputChanged();
