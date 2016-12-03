
//Start off with what passes the first test.
class KNN {
  constructor(kSize) {
  	this.kSize = kSize;
  	this.points = [];
  }

  train(array) {
    this.points = this.points.concat(array);
  }

  _distance(vector1, vector2) {
    let distanceNotYetSqrted = 0;

    for (var i = 0; i < vector1.length; i++) {
      distanceNotYetSqrted += Math.pow((vector1[i] - vector2[i]), 2)
    }

    return Math.sqrt(distanceNotYetSqrted)
  }

  _distances(unClassedVector, classedVectors) {
    const output = [];

    for(let i = 0; i < classedVectors.length; i++) {
      let distance = this._distance(unClassedVector, classedVectors[i][0]);
      let classification = classedVectors[i][1];

      output.push([distance, classification])
    }
    return output;
  }

  _sorted(vectorArrayWithClassification) {
    const sortedArray = vectorArrayWithClassification.sort((first, second) => {
      return first[0] - second[0];
    })

    return sortedArray.map(array => {
      return array[1]
    })
  }

  _majority(limit, arrayOfClasses) {
    const hashOfClasses = {}

    for (let i = 0; i < limit; i++) {
      if (!hashOfClasses[arrayOfClasses[i]]) {
        hashOfClasses[arrayOfClasses[i]] = 1;
      } else {
        hashOfClasses[arrayOfClasses[i]]++
      }
    }

    return +Object.keys(hashOfClasses).reduce((a, b) => { return hashOfClasses[a] > hashOfClasses[b] ? a : b
    });
  }

  predictSingle(vector) {
    const array = this._distances(vector, this.points)
    const sortedArray = this._sorted(array)
    return this._majority(this.kSize, sortedArray)
  }

  predict(sampleOfVectors) {
    return sampleOfVectors.map(vector => {
      return this.predictSingle(vector)
    })
  }

  score(testArray) {

    let sampleOfVectors = testArray.map(array => {
      return array[0];
    })

    let predictions = this.predict(sampleOfVectors);

    let actualClassifications = testArray.map(array => {
      return array[1];
    })

    let count = 0;

    for (var i = 0; i < testArray.length; i++) {
      if(predictions[i] === actualClassifications[i]) count++;
    }

    return count/(testArray.length * 1.0)
  }

}

module.exports = KNN
