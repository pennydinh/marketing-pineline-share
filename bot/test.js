const text = "This is a short script. It should be split ok.";
const rawLines = text.split('\n').filter(l => l.trim().length > 0);
  const chunkedLines = [];
  rawLines.forEach(line => {
    const words = line.split(' ');
    let currentChunk = [];
    for (let i = 0; i < words.length; i++) {
        currentChunk.push(words[i]);
        const isEndMark = words[i].includes('.') || words[i].includes(',') || words[i].includes('!') || words[i].includes('?');
        if (isEndMark || currentChunk.length >= 8 || i === words.length - 1) {
            chunkedLines.push(currentChunk.join(' '));
            currentChunk = [];
        }
    }
  });
console.log(chunkedLines);
