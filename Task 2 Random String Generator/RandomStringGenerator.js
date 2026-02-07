import React, { useState, useCallback, useEffect } from 'react';

const RandomStringGenerator = () => {
  // Define character sets
  const CHARACTER_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  // State declarations
  const [generatedString, setGeneratedString] = useState('');
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [stringCount, setStringCount] = useState(1);
  const [generatedStrings, setGeneratedStrings] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Function to generate a random string
  const generateRandomString = useCallback(() => {
    let charPool = '';
    
    // Build character pool
    if (includeLowercase) charPool += CHARACTER_SETS.lowercase;
    if (includeUppercase) charPool += CHARACTER_SETS.uppercase;
    if (includeNumbers) charPool += CHARACTER_SETS.numbers;
    if (includeSymbols) charPool += CHARACTER_SETS.symbols;

    // Default to lowercase if nothing selected
    if (!charPool) {
      charPool = CHARACTER_SETS.lowercase;
      setIncludeLowercase(true);
    }

    let result = '';
    const poolLength = charPool.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * poolLength);
      result += charPool[randomIndex];
    }
    
    return result;
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  // Generate multiple strings
  const generateMultipleStrings = useCallback(() => {
    const strings = [];
    for (let i = 0; i < stringCount; i++) {
      strings.push(generateRandomString());
    }
    setGeneratedStrings(strings);
    
    if (strings.length > 0) {
      setGeneratedString(strings[0]);
    }
  }, [stringCount, generateRandomString]);

  // Copy to clipboard
  const copyToClipboard = useCallback((text, index = null) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }, []);

  // Handle length change
  const handleLengthChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 100) {
      setLength(value);
    }
  };

  // Handle string count change
  const handleStringCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 50) {
      setStringCount(value);
    }
  };

  // Reset all settings
  const handleReset = () => {
    setLength(12);
    setIncludeLowercase(true);
    setIncludeUppercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(false);
    setStringCount(1);
    setGeneratedString('');
    setGeneratedStrings([]);
  };

  // Generate initial string
  useEffect(() => {
    generateMultipleStrings();
  }, []);

  // Update when dependencies change
  useEffect(() => {
    generateMultipleStrings();
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, generateMultipleStrings]);

  // Inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    generatorContainer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    mainDisplay: {
      background: 'white',
      borderRadius: '10px',
      padding: '2rem',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    stringDisplay: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f9fa',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px solid #e9ecef'
    },
    generatedString: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333',
      wordBreak: 'break-all',
      flex: '1',
      textAlign: 'center',
      fontFamily: "'Courier New', monospace"
    },
    copyBtn: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#28a745',
      color: 'white',
      minWidth: '100px',
      transition: 'all 0.3s ease'
    },
    copiedBtn: {
      background: '#218838'
    },
    controlsSection: {
      background: 'white',
      borderRadius: '10px',
      padding: '2rem',
      marginBottom: '2rem'
    },
    controlGroup: {
      marginBottom: '1.5rem'
    },
    controlLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#333'
    },
    slider: {
      width: '100%',
      marginBottom: '0.5rem',
      height: '6px',
      borderRadius: '3px',
      background: '#e9ecef',
      outline: 'none'
    },
    numberInput: {
      width: '80px',
      padding: '0.5rem',
      border: '2px solid #e9ecef',
      borderRadius: '5px',
      textAlign: 'center',
      fontSize: '1rem'
    },
    checkboxGroup: {
      marginBottom: '2rem'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      cursor: 'pointer',
      color: '#555'
    },
    generateBtn: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      flex: '2',
      transition: 'all 0.3s ease'
    },
    resetBtn: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#6c757d',
      color: 'white',
      flex: '1'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem'
    },
    multipleStrings: {
      background: 'white',
      borderRadius: '10px',
      padding: '2rem'
    },
    stringItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      marginBottom: '0.5rem'
    },
    smallCopyBtn: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '5px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      background: '#28a745',
      color: 'white',
      minWidth: '60px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.generatorContainer}>
        {/* Main generated string display */}
        <div style={styles.mainDisplay}>
          <h2>Generated String</h2>
          <div style={styles.stringDisplay}>
            <code style={styles.generatedString}>
              {generatedString || 'Click Generate'}
            </code>
            <button 
              onClick={() => copyToClipboard(generatedString)}
              style={{
                ...styles.copyBtn,
                ...(copiedIndex === null ? {} : styles.copiedBtn)
              }}
              disabled={!generatedString}
            >
              {copiedIndex === null ? 'Copy' : '✓ Copied!'}
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div style={styles.controlsSection}>
          <div style={styles.controlGroup}>
            <label style={styles.controlLabel}>Length: {length}</label>
            <input
              type="range"
              min="1"
              max="100"
              value={length}
              onChange={handleLengthChange}
              style={styles.slider}
            />
            <input
              type="number"
              min="1"
              max="100"
              value={length}
              onChange={handleLengthChange}
              style={styles.numberInput}
            />
          </div>

          <div style={styles.controlGroup}>
            <label style={styles.controlLabel}>Number of Strings: {stringCount}</label>
            <input
              type="range"
              min="1"
              max="50"
              value={stringCount}
              onChange={handleStringCountChange}
              style={styles.slider}
            />
            <input
              type="number"
              min="1"
              max="50"
              value={stringCount}
              onChange={handleStringCountChange}
              style={styles.numberInput}
            />
          </div>

          <div style={styles.checkboxGroup}>
            <h3>Character Sets</h3>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              Lowercase (a-z)
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              Uppercase (A-Z)
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              Numbers (0-9)
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              Symbols (!@#$%...)
            </label>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button 
              onClick={generateMultipleStrings}
              style={styles.generateBtn}
            >
              Generate New Strings
            </button>
            <button 
              onClick={handleReset}
              style={styles.resetBtn}
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Multiple Strings Display */}
        {generatedStrings.length > 1 && (
          <div style={styles.multipleStrings}>
            <h3>Generated Strings ({generatedStrings.length})</h3>
            <div>
              {generatedStrings.map((str, index) => (
                <div key={index} style={styles.stringItem}>
                  <span style={{fontWeight: 'bold', color: '#667eea', minWidth: '30px'}}>
                    {index + 1}.
                  </span>
                  <code style={{flex: 1, fontFamily: "'Courier New', monospace", wordBreak: 'break-all'}}>
                    {str}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(str, index)}
                    style={{
                      ...styles.smallCopyBtn,
                      ...(copiedIndex === index ? styles.copiedBtn : {})
                    }}
                  >
                    {copiedIndex === index ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomStringGenerator;