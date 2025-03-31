const response = await ollama.chat({
    model: "deepseek-r1:1.5b",
    messages: [...messages, userMessage],
    host: "http://localhost:3000/ollama/api/chat", // Explicit full endpoint
  });