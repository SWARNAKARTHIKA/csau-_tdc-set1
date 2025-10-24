import React from 'react';
import '../css/ConfigFile.css';

const ConfigFile = ({ config }) => {
  const configLines = config.split('\n');

  return (
    <div className="config-file">
      <div className="panel-header">
        <span className="panel-icon">⚙️</span>
        <span className="panel-title">CONFIGURATION FILE</span>
        <div className="panel-controls">
          <span className="control-dot red"></span>
          <span className="control-dot yellow"></span>
          <span className="control-dot green"></span>
        </div>
      </div>
      <div className="config-content terminal">
        <div className="file-path">// /etc/system/security.conf</div>
        {configLines.map((line, index) => {
          const [key, value] = line.split('=').map(s => s.trim());
          return (
            <div key={index} className="config-line fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              {key && value ? (
                <>
                  <span className="config-key">{key}</span>
                  <span className="config-equals"> = </span>
                  <span className="config-value">{value}</span>
                </>
              ) : (
                <span className="config-key">{line}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConfigFile;