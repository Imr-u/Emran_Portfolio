import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "../styles/Projects.css";

export default function CodeViewer({ code, language, type }) {
  const isTabbed = code && typeof code === "object" && !Array.isArray(code);
  const tabKeys = isTabbed ? Object.keys(code) : [];
  const [activeTab, setActiveTab] = useState(isTabbed ? tabKeys[0] : null);

  const codeToShow = isTabbed ? code[activeTab] : code;

  if ((type === "notebook" || type === "html") && typeof code === "string") {
    return (
      <div className="code-viewer">
        <iframe
          src={code}
          width="100%"
          height="600"
          style={{ border: "none" }}
          title="Notebook"
        />
      </div>
    );
  }

  return (
    <div className="code-viewer">
      {isTabbed && (
        <div className="code-tabs">
          {tabKeys.map(tab => (
            <button
              key={tab}
              className={`code-tab-btn${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className="code-block-container">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            background: "transparent",
            fontFamily: "'JetBrains Mono', 'Fira Mono', 'Menlo', 'monospace'",
            fontSize: "12px",
            paddingTop: "30px"
          }}
          codeTagProps={{
            style: { fontFamily: "'JetBrains Mono', 'Fira Mono', 'Menlo', 'monospace'" }
          }}
        >
          {codeToShow}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}