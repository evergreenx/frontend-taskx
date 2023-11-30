export function getAbbreviation(name:string) {
    // Split the name into words
    const words = name.trim().split(' ');
  
    if (words.length === 0) {
      return '';
    }
  
    // Get the first letters of each word and join them
    const abbreviation = words.map(word => word.charAt(0)).join('');
  
    return abbreviation;
  }