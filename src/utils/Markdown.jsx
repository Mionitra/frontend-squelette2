import React from 'react';

const Markdown = ({ children, className = '' }) => {
  const parseText = (text) => {
    if (!text) return null;

    const rules = [
      // Titres
      { pattern: /^###### (.*$)/gim, replacement: '<h6>$1</h6>' },
      { pattern: /^##### (.*$)/gim, replacement: '<h5>$1</h5>' },
      { pattern: /^#### (.*$)/gim, replacement: '<h4>$1</h4>' },
      { pattern: /^### (.*$)/gim, replacement: '<h3>$1</h3>' },
      { pattern: /^## (.*$)/gim, replacement: '<h2>$1</h2>' },
      { pattern: /^# (.*$)/gim, replacement: '<h1>$1</h1>' },
      
      // Gras
      { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
      
      // Italique
      { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
      
      // Retour à la ligne
      { pattern: /\n/g, replacement: '<br />' }
    ];

    let formattedText = text;
    rules.forEach(rule => {
      formattedText = formattedText.replace(rule.pattern, rule.replacement);
    });

    return formattedText;
  };

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: parseText(children) }} 
    />
  );
};

export default Markdown;