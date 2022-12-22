const input = document.getElementById('myInput')
const output = document.getElementById('output')

function translateNucleotides(nucleotides) {
  // Create maps of DNA nucleotide to RNA bases and RNA to DNA bases
  const dnaToRNA = {
    'A': 'U',
    'C': 'G',
    'G': 'C',
    'T': 'A',
    'a': 'U',
    'c': 'G',
    'c': 'C',
    't': 'A'
  };
  const rnaToDNA = {
    'A': 'T',
    'C': 'G',
    'G': 'C',
    'U': 'A',
    'a': 'T',
    'c': 'G',
    'g': 'C',
    'u': 'A'
  };

  // Initialize an empty output string
  let output = '';

  // Loop through each nucleotide in the input string
  for (let i = 0; i < nucleotides.length; i++) {
    // Get the current nucleotide
    const nucleotide = nucleotides[i];

    // If the flag is set to true, use the DNA to RNA map to translate the nucleotide
    if (nucleotides.includes('T') && nucleotides.includes('U')) {
      output = 'NOT A VALID SEQUENCE! URACIL AND THYMINE DO NOT MIX!!!'
    }
    else if (nucleotides.includes('T')) {
      output += dnaToRNA[nucleotide];
    }
    // Otherwise, use the RNA to DNA map to translate the nucleotide
    else {
      output += rnaToDNA[nucleotide];
    }

  }

  // Return the output string
  return output;
}

//Not as elegant as function below but definitely good to keep in mind! 
// input.addEventListener('keydown', function(event) {
//   switch (event.code) {
//     case 'ShiftLeft':
//     case 'ShiftRight':
//     case 'CapsLock':
//     case 'KeyA':
//     case 'KeyC':
//     case 'KeyG':
//     case 'KeyT':
//     case 'KeyU':
//     case 'Delete':
//     case 'Backspace':
//       setInterval(() => {
//         output.innerHTML = translateNucleotides(input.value)
//       }, 250);
//       break;
//     default:
//       event.preventDefault();
//       break;
//   }
// });

input.addEventListener('input', function(event) {
  this.value = this.value.replace(/[^AaCcGgTtUu]/g, '')
  setInterval(() => {
    output.innerHTML = translateNucleotides(input.value)
  }, 250);
});


