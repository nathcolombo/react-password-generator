import React, { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [language, setLanguage] = useState("pt");

  const texts = {
    pt: {
      title: "Gerador de Senhas",
      length: "Tamanho da senha:",
      includeUppercase: "Incluir letras maiúsculas",
      includeNumbers: "Incluir números",
      includeSymbols: "Incluir caracteres especiais",
      generate: "Gerar senha",
      generatedPassword: "Senha gerada:",
      copy: "Copiar senha",
      copied: "Senha copiada para a área de transferência!",
    },
    en: {
      title: "Password Generator",
      length: "Password length:",
      includeUppercase: "Include uppercase letters",
      includeNumbers: "Include numbers",
      includeSymbols: "Include special characters",
      generate: "Generate password",
      generatedPassword: "Generated password:",
      copy: "Copy password",
      copied: "Password copied to clipboard!",
    },
  };

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    let mandatoryChars = "";

    if (includeUppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      mandatoryChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
        Math.floor(Math.random() * 26)
      );
    }
    if (includeNumbers) {
      charset += "0123456789";
      mandatoryChars += "0123456789".charAt(Math.floor(Math.random() * 10));
    }
    if (includeSymbols) {
      charset += "!@#$%^&*()_+";
      mandatoryChars += "!@#$%^&*()_+".charAt(Math.floor(Math.random() * 12));
    }

    let newPassword = mandatoryChars;

    for (let i = newPassword.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    newPassword = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert(texts[language].copied);
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>{texts[language].title}</h1>
        <button
          aria-label={
            language === "pt"
              ? "Change language to English"
              : "Mudar idioma para Português"
          }
          onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
        >
          {language === "pt" ? "🇧🇷" : "🇬🇧"}
        </button>
      </div>
      <div className="options">
        <label>
          {texts[language].length}
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          {texts[language].includeUppercase}
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          {texts[language].includeNumbers}
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          {texts[language].includeSymbols}
        </label>
      </div>

      <button onClick={generatePassword}>{texts[language].generate}</button>

      {password && (
        <div>
          <h2>{texts[language].generatedPassword}</h2>
          <p>{password}</p>
          <button onClick={copyToClipboard}>{texts[language].copy}</button>
        </div>
      )}
    </div>
  );
}

export default App;
