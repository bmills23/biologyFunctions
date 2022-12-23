const input = document.getElementById('myInput')
const stringoutput = document.getElementById('output')
const altoutput = document.getElementById('output2')
const codonoutput = document.getElementById('output3')
const outputParent = document.getElementById('outputParent')

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
  const DNACodonTable = {
    'AAA' : 'Phenylalanine',
    'AAG' : 'Phenylalanine',
    'AAT' : 'Leucine',
    'AAC' : 'Leucine',
    'GAA' : 'Leucine',
    'GAG' : 'Leucine',
    'GAC' : 'Leucine',
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
        console.log(translated)
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
        aminoAcids.push(DNACodonTable[translatedTwice] + ' if DNA Input ' + ' OR ' + DNACodonTable[translated] + ' if RNA Input')
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
    var codons = translateCodons(input.value)

    if (values[0] === 'NOT A VALID SEQUENCE! URACIL AND THYMINE DO NOT MIX!!!') {
      stringoutput.innerHTML = values[0]
      altoutput.innerHTML = values[0]
      codonoutput.innerHTML = values[0]

    } else {

      var values = translateNucleotides(input.value.replace(/-/g, ""))
      altoutput.innerHTML = stringoutput.innerHTML
      stringoutput.innerHTML = addHyphens(values[0])
      altoutput.innerHTML = addHyphens(values[1])
      codonoutput.innerHTML = codons
      if (this.value === '') {
        codonoutput.innerHTML = ''
      }
    }

  }, 250);

});

