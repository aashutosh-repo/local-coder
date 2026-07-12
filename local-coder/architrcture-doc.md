# 🚀 Local Copilot

A lightweight **VS Code AI Code Completion Extension** powered by **Ollama**, **Qwen2.5-Coder**, **FastAPI**, and **TypeScript**.

The goal of this project is to build a **fully local GitHub Copilot alternative** that runs entirely on your machine without relying on cloud APIs.

---

# Current Status

## ✅ Phase 1 - Basic Local Copilot

- VS Code Extension
- Inline Code Completion
- FastAPI Backend
- Ollama Integration
- Qwen2.5-Coder Model
- Prompt Engineering
- Context Extraction
- Response Cleanup

---

## ✅ Phase 2 - Performance

- Debouncing
- Modular Architecture
- Completion Cache (Foundation)
- Logging
- API Layer Separation

---

# Architecture

```
                          +----------------------+
                          |      VS Code         |
                          |      Extension       |
                          +----------+-----------+
                                     |
                                     |
                          Inline Completion API
                                     |
                                     |
                  +------------------v------------------+
                  |        LocalCopilotProvider         |
                  +------------------+------------------+
                                     |
                      Extract Context |
                                     |
                      +--------------v--------------+
                      |     Context Extractor       |
                      +--------------+--------------+
                                     |
                          Completion Request
                                     |
                                     |
                      +--------------v--------------+
                      |        API Client           |
                      +--------------+--------------+
                                     |
                                 HTTP POST
                                     |
                                     |
             +-----------------------v-----------------------+
             |                 FastAPI Backend               |
             +-----------------------+-----------------------+
                                     |
                             Prompt Builder
                                     |
                             Response Cleanup
                                     |
                                     |
                    +----------------v----------------+
                    |        Ollama Generate API      |
                    +----------------+----------------+
                                     |
                                     |
                         Qwen2.5-Coder Model
                                     |
                                     |
                    +----------------v----------------+
                    | Generated Completion           |
                    +----------------+----------------+
                                     |
                                     |
                     InlineCompletionItem returned
                                     |
                                     |
                          VS Code Ghost Text
```

---

# Project Structure

```
src
│
├── extension.ts
│
├── api
│   └── client.ts
│
├── completion
│   ├── provider.ts
│   ├── debounce.ts
│   └── cache.ts
│
├── context
│   └── extractor.ts
│
├── types
│   └── completion.ts
│
└── utils
    └── logger.ts
```

---

# Component Description

## extension.ts

Registers the VS Code Inline Completion Provider.

Responsible for:

- Extension activation
- Provider registration
- Lifecycle management

---

## completion/provider.ts

Heart of the extension.

Responsibilities:

- Receives inline completion requests
- Validates supported language
- Extracts context
- Calls API
- Creates InlineCompletionItem
- Returns ghost text

---

## completion/debounce.ts

Prevents excessive AI requests while the user is typing.

Example

```
Typing...

↓

250 ms idle

↓

Send AI request
```

Benefits

- Reduced CPU usage
- Reduced Ollama calls
- Better UX

---

## completion/cache.ts

Foundation for completion caching.

Stores previously generated completions.

(Current implementation is intentionally simple and will evolve.)

---

## context/extractor.ts

Extracts the editor context before sending it to the model.

Currently sends

- Last 100 lines before cursor
- First 20 lines after cursor

Future improvements

- Current method
- Current class
- Imports
- Visible variables
- Workspace context

---

## api/client.ts

Communicates with FastAPI.

Responsibilities

- Build HTTP request
- Serialize JSON
- Parse response
- Error handling

---

## FastAPI Backend

Acts as the AI Orchestrator.

Responsibilities

- Build prompt
- Send request to Ollama
- Receive completion
- Remove markdown
- Clean response
- Return JSON

---

## Ollama

Runs local LLM.

Current model

```
qwen2.5-coder:7b
```

---

# Completion Flow

```
User Types

↓

VS Code

↓

Inline Completion Provider

↓

Extract Context

↓

Debounce

↓

FastAPI

↓

Prompt Builder

↓

Ollama

↓

Qwen2.5-Coder

↓

Generated Code

↓

Cleanup

↓

Return Completion

↓

Ghost Text
```

---

# Current Prompt Strategy

The backend sends

- Language
- Prefix
- Suffix

along with instructions like

- Return only inserted code
- No markdown
- No explanation
- No class generation
- No imports
- No duplicate code

This significantly improves inline completion quality.

---

# Technologies

## Extension

- TypeScript
- VS Code Extension API

## Backend

- Python
- FastAPI

## AI

- Ollama
- Qwen2.5-Coder

---

# Current Features

✅ Local inference

✅ No cloud dependency

✅ Inline ghost text

✅ Debounced completion

✅ Prompt engineering

✅ Response cleanup

✅ Modular architecture

---

# Upcoming Roadmap

## Phase 2.5

- Request Cancellation
- AbortController
- Ignore stale completions

---

## Phase 3

Smarter Context Extraction

- Current method
- Current class
- Imports
- Visible variables
- Package detection

---

## Phase 4

Workspace Awareness

- Repository indexing
- Embeddings
- Semantic Search (RAG)

---

## Phase 5

Chat Panel

- Explain Code
- Generate Tests
- Refactor
- Optimize
- Documentation

---

## Phase 6

Autonomous Coding Agent

- Read project
- Modify files
- Fix compiler errors
- Run build
- Iterate until success

---

# Long Term Goal

Build a completely local AI development assistant comparable to:

- GitHub Copilot
- Cursor
- Continue
- Codeium

while maintaining full control over:

- Models
- Prompts
- Data
- Privacy

---

# License

MIT