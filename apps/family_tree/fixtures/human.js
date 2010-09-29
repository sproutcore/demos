sc_require('models/human');

FamilyTree.Human.FIXTURES = [
  // ..........................................................
  // Doe Family
  // 
  {
    id: '1',
    type: "Human",
    name: 'John',
    isMale: true,
    family: '1',
    mother: null,
    father: null,
    spouse: '2',
    pets: [],
    position: {y: 10, x: 10}
  },
  
  {
    id: '2',
    type: "Human",
    name: 'Nancy',
    isMale: false,
    family: '1',
    mother: null,
    father: null,
    spouse: '1',
    pets: [],
    position: {y: 35, x: 300}
  },
  
  {
    id: '3',
    type: "Human",
    name: 'John Jr',
    isMale: true,
    family: '1',
    mother: '2',
    father: '1',
    spouse: null,
    pets: [],
    position: {y: 300, x: 10}
  },
  
  {
    id: '4',
    type: "Human",
    name: 'Penelope',
    isMale: false,
    family: '1',
    mother: '2',
    father: '1',
    spouse: '1',
    pets: [],
    position: {y: 300, x: 300}
  },
  
  // ..........................................................
  // Obama Family
  // 
  {
    id: '5',
    type: "Human",
    name: 'Barack Obama Sr.',
    isMale: true,
    family: '2',
    mother: null,
    father: null,
    spouse: null,
    pets: [],
    position: {y: 10, x: 10}
  },
  
  {
    id: '6',
    type: "Human",
    name: 'Lolo Soetoro',
    isMale: true,
    family: '2',
    mother: null,
    father: null,
    spouse: '7',
    pets: [],
    position: {y: 10, x: 300}
  },
  
  {
    id: '7',
    type: "Human",
    name: 'Stanley Ann Dunham',
    isMale: false,
    family: '2',
    mother: null,
    father: null,
    spouse: '6',
    pets: [],
    position: {y: 35, x: 500}
  },
  
  {
    id: '8',
    type: "Human",
    name: 'Barack Obama',
    isMale: true,
    family: '2',
    mother: '7',
    father: '5',
    spouse: '9',
    pets: [],
    position: {y: 200, x: 300}
  },
  
  {
    id: '9',
    type: "Human",
    name: 'Michelle Obama',
    isMale: false,
    family: '2',
    mother: null,
    father: null,
    spouse: '5',
    pets: [],
    position: {y: 225, x: 500}
  },
  
  {
    id: '10',
    type: "Human",
    name: 'Malia Ann Obama',
    isMale: false,
    family: '2',
    mother: '9',
    father: '8',
    spouse: null,
    pets: [],
    position: {y: 400, x: 250}
  },
  
  {
    id: '11',
    type: "Human",
    name: 'Natasha Obama',
    isMale: false,
    family: '2',
    mother: '9',
    father: '8',
    spouse: null,
    pets: [],
    position: {y: 400, x: 550}
  }
];
