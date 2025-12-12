/**
 * CSV Chunker Utility — Streaming Version
 * Splits large CSV files into smaller chunks without loading entire file into memory
 * Run this via Node.js or integrate into build pipeline
 *
 * Usage:
 *   node src/app/core/services/provider-data/csv-chunker.js input.csv output-dir chunk-size
 *   Example: node csv-chunker.js src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv src/assets/data/agoda 1000
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function chunkCSV(inputFile, outputDir, chunkSize = 1000) {
  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let chunkIndex = 0;
  let currentChunk = [];
  let headerLine = null;
  let lineCount = 0;
  let isFirstLine = true;

  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile, { encoding: 'utf-8' }),
    crlfDelay: Infinity // Handles both \r\n and \n
  });

  rl.on('line', (line) => {
    // Skip empty lines
    if (!line.trim()) return;

    if (isFirstLine) {
      headerLine = line;
      currentChunk.push(line);
      isFirstLine = false;
      return;
    }

    currentChunk.push(line);
    lineCount++;

    if (lineCount >= chunkSize) {
      writeChunk(outputDir, chunkIndex, currentChunk);
      chunkIndex++;
      currentChunk = [headerLine]; // Reset with header
      lineCount = 0;
    }
  });

  rl.on('close', () => {
    // Write remaining data
    if (currentChunk.length > 1) {
      writeChunk(outputDir, chunkIndex, currentChunk);
      chunkIndex++;
    }

    console.log(`✓ CSV split into ${chunkIndex} chunks (${chunkSize} rows each)`);
    generateManifest(outputDir, chunkIndex, inputFile);
  });

  rl.on('error', (error) => {
    console.error('Error reading file:', error);
    process.exit(1);
  });
}

function writeChunk(outputDir, index, lines) {
  const filename = path.join(outputDir, `chunk-${index}.csv`);
  const content = lines.join('\n');
  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`  ✓ Wrote ${filename} (${lines.length} lines)`);
}

function generateManifest(outputDir, chunkCount, originalFile) {
  const manifest = {
    originalFile,
    totalChunks: chunkCount,
    chunkSize: 1000,
    createdAt: new Date().toISOString(),
    chunks: Array.from({ length: chunkCount }, (_, i) => ({
      index: i,
      filename: `chunk-${i}.csv`
    }))
  };

  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✓ Created manifest at ${manifestPath}`);
}

// CLI entry point
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node csv-chunker.js <input-file> <output-dir> [chunk-size]');
  process.exit(1);
}

const [inputFile, outputDir, chunkSize = '1000'] = args;
chunkCSV(inputFile, outputDir, parseInt(chunkSize, 10));
