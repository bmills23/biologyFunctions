const input = document.getElementById('myInput')
const stringoutput = document.getElementById('output')
const altoutput = document.getElementById('output2')
const aminoOutput = document.getElementById('output3')

const aminoDropdown = document.getElementById('amino-dropdown')

function translateNucleotides(nucleotides) {

  const dnaToRNA = {
    'A': 'U',
    'C': 'G',
    'G': 'C',
    'T': 'A',
  };
  const rnaToDNA = {
    'A': 'T',
    'C': 'G',
    'G': 'C',
    'U': 'A',
  };

  let output = '';
  let output2 = '';

  for (let i = 0; i < nucleotides.length; i++) {

    const nucleotide = nucleotides[i];

    if (nucleotides.includes('T') && nucleotides.includes('U')) {
      output = 'NOT A VALID SEQUENCE! URACIL AND THYMINE DO NOT MIX!!!'
      output2 = output
    }
    else if (nucleotides.includes('T')) {
      output += dnaToRNA[nucleotide];
      output2 = ''
    }
    else if (nucleotides.includes('U')) {
      output2 += rnaToDNA[nucleotide];
      output = ''
    }
    else if (!nucleotides.includes('U') && !nucleotides.includes('T')) {
      output += dnaToRNA[nucleotide];
      output2 += rnaToDNA[nucleotide];
    }
  }
  // Return the output strings
  return [output, output2]
}

function translateCodons(codons) {
  if (input.value === '') {
    return ''
  } else {

    const DNACodonTable = {
      'AAA' : 'Phenylalanine',
      'AAG' : 'Phenylalanine',
      'AAT' : 'Leucine',
      'AAC' : 'Leucine',
      'GAA' : 'Leucine',
      'GAG' : 'Leucine',
      'GAC' : 'Leucine',
      'GAT' : 'Leucine',
      'TAA' : 'Isoleucine',
      'TAG' : 'Isoleucine',
      'TAT' : 'Isoleucine',
      'TAC' : 'Methionine',
      'CAA' : 'Valine',
      'CAG' : 'Valine',
      'CAT' : 'Valine',
      'CAC' : 'Valine',
      'AGA' : 'Serine',
      'AGG' : 'Serine',
      'AGT' : 'Serine',
      'AGC' : 'Serine',
      'GGA' : 'Proline',
      'GGG' : 'Proline',
      'GGT' : 'Proline',
      'GGC' : 'Proline',
      'TGA' : 'Threonine',
      'TGG' : 'Threonine',
      'TGT' : 'Threonine',
      'TGC' : 'Threonine',
      'CGA' : 'Alanine',
      'CGG' : 'Alanine',
      'CGT' : 'Alanine',
      'CGC' : 'Alanine',
      'ATA' : 'Tyrosine',
      'ATG' : 'Tyrosine',
      'ATT' : 'STOP',
      'ATC' : 'STOP',
      'GTA' : 'Histidine',
      'GTG' : 'Histidine',
      'GTT' : 'Glutamine',
      'GTC' : 'Glutamine',
      'TTA' : 'Asparagine',
      'TTG' : 'Asparagine',
      'TTT' : 'Lysine',
      'TTC' : 'Lysine',
      'CTA' : 'Aspartic acid',
      'CTG' : 'Aspartic acid',
      'CTT' : 'Glutamic acid',
      'CTC' : 'Glutamic acid',
      'ACA' : 'Cysteine',
      'ACG' : 'Cysteine',
      'ACT' : 'STOP',
      'ACC' : 'Tryptophan',
      'GCA' : 'Arginine',
      'GCG' : 'Arginine',
      'GCT' : 'Arginine',
      'GCC' : 'Arginine',
      'TCA' : 'Serine',
      'TCG' : 'Serine',
      'TCT' : 'Arginine',
      'TCC' : 'Arginine',
      'CCA' : 'Glycine',
      'CCG' : 'Glycine',
      'CCT' : 'Glycine',
      'CCC' : 'Glycine'
    }

    function getAminoAcids(codonsString) {
      const codonArray = codonsString.split('-')
      let aminoAcids = []

      if (codonsString.includes('U')) {

        for (let i = 0; i < codonArray.length; i++) {
          const codon = codonArray[i];
          const translated = translateNucleotides(codon)[1]
          aminoAcids.push(DNACodonTable[translated])
        }

        return aminoAcids.join(' - ')

    } else if (codonsString.includes('T')) {

        for (let i = 0; i < codonArray.length; i++) {
          const codon = codonArray[i];
          aminoAcids.push(DNACodonTable[codon])
        }

        return aminoAcids.join(' - ')

    } else if ((codonsString.includes('A') || 
                codonsString.includes('C') || 
                codonsString.includes('G')) && 
                (!codonsString.includes('T') && 
                !codonsString.includes('U'))) {

        for (let i = 0; i < codonArray.length; i++) {

          const codon = codonArray[i];
          const translated = translateNucleotides(codon)[1]
          const translatedTwice = translateNucleotides(translated)[0]
          aminoAcids.push(DNACodonTable[translatedTwice] + ' (DNA) ' + ' / ' + DNACodonTable[translated] + ' (RNA) ')
          if ((codonArray.join('').length < 3 )) {
            aminoAcids = []
          } else if ((codonArray.join('').length % 3 !== 0) && codonArray.length > 1) {
            codonArray.pop();
          }
        }

        return aminoAcids.join(' - ')

      }

    }

  return getAminoAcids(codons)

  }

}

function translateToShort(aminoAcidsLong) {

  const DNACodonTableShort = {
    'Alanine': 'A',
    'Cysteine': 'C',
    'Aspartic acid': 'D',
    'Glutamic acid': 'E',
    'Phenylalanine': 'F',
    'Glycine': 'G',
    'Histidine': 'H',
    'Isoleucine': 'I',
    'Lysine': 'K',
    'Leucine': 'L',
    'Methionine': 'M',
    'Asparagine': 'N',
    'Proline': 'P',
    'Glutamine': 'Q',
    'Arginine': 'R',
    'Serine': 'S',
    'Threonine': 'T',
    'Valine': 'V',
    'Tryptophan': 'W',
    'Tyrosine': 'Y',
    'STOP' : 'X'
  };
  
  if (input.value === '') {
    return ''
  } else if (aminoAcidsLong.includes('/')) {
    const aminoAcidsLongArray = aminoAcidsLong.split(' - ')
    const pairsArray = aminoAcidsLongArray.map(pairs => pairs.split('  / ').map(pair => pair.trim()).map(pair => pair.slice(0, -6)))
    
    const aminoAcidsShort = pairsArray.map(subarray => subarray.map(amino => DNACodonTableShort[amino]))

    const shortNotations = aminoAcidsShort.map(subarray => subarray.join(' (DNA) / ') + ' (RNA) ')
    
    return shortNotations.join(" - ")

  } else {
    const aminoAcidsLongArray = aminoAcidsLong.split(' - ')
    aminoAcidsShort = []
    for (let i = 0; i < aminoAcidsLongArray.length; i++) {
      const longNotation = aminoAcidsLongArray[i]
      for (const [longNotationValue, shortNotation] of 
      Object.entries(DNACodonTableShort)) {
        if (longNotation === longNotationValue) {
          aminoAcidsShort.push(shortNotation)
        }
      }
    } 
  }
  return aminoAcidsShort.join(' - ')
}
 
function addHyphens(string) {
  let output = '';
  for (let i = 0; i < string.length; i++) {
    output += string[i];
    if ((i + 1) % 3 === 0 && i !== string.length - 1) {
      output += '-';
    }
  }
  return output;
}

input.addEventListener('input', function(event) {
  this.value = this.value.toUpperCase()
  this.value = addHyphens(this.value.replace(/[^ACGTU]/g, ''))
  setInterval(() => {

    var values = translateNucleotides(input.value)
    var aminos = translateCodons(input.value)

    if (values[0] === 'NOT A VALID SEQUENCE! URACIL AND THYMINE DO NOT MIX!!!') {
      stringoutput.innerHTML = values[0]
      altoutput.innerHTML = values[0]
      aminoOutput.innerHTML = values[0]

    } else {
      
      var values = translateNucleotides(input.value.replace(/-/g, ""))
      altoutput.innerHTML = stringoutput.innerHTML
      stringoutput.innerHTML = addHyphens(values[0])
      altoutput.innerHTML = addHyphens(values[1])
      aminoOutput.innerHTML = aminos

      if (aminoDropdown.value === 'Short') {
        aminoOutput.innerHTML = translateToShort(aminos)
      }

    }

  }, 250);

});

