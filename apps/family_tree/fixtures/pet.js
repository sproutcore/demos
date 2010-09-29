
sc_require('models/pet');
FamilyTree.Pet.FIXTURES = [
  // ..........................................................
  // Doe Family
  // 
  {
    id: '1',
    type: 'Pet',
    name: 'Fluffy',
    kindOfPet: 'Dog',
    isMale: true,
    belongsTo: '4',
    family: '1',
    position: {y: 400, x: 450}
  },
  
  // ..........................................................
  // Obama Family
  // 
  {
    id: '2',
    type: 'Pet',
    name: 'Rahm Emanuel',
    kindOfPet: 'Dog',
    isMale: true,
    belongsTo: '8',
    family: '2',
    position: {y: 300, x: 150}
  }
];
