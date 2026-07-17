import * as vscode from "vscode";
import { LocalCopilotProvider, SUPPORTED_LANGUAGES } from "./features/completion/provider";
import { ContextEngine } from "./context/ContextEngine";
import { AIRequestManager } from "./ai/manager/AIRequestManager";
import { AIRequest } from "./ai/models/AIRequest";
import { TaskType } from "./ai/models/TaskType";

export function activate(context: vscode.ExtensionContext) {

    console.log("Local Copilot Activated");

    const selectors = SUPPORTED_LANGUAGES.map(language => ({
        language,
        scheme: "file"
    }));

    const provider = vscode.languages.registerInlineCompletionItemProvider(
        selectors,
        new LocalCopilotProvider()
    );

    context.subscriptions.push(provider);

    const cleanCodeCommand = vscode.commands.registerCommand(
        "local-coder.generateCleanCode",
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage(
                    "Open a file to generate clean code."
                );
                return;
            }

            const userPrompt = await vscode.window.showInputBox({
                prompt: "What clean-code improvement do you want?",
                placeHolder: "e.g. Simplify this function and improve naming"
            });

            if (!userPrompt) {
                return;
            }

            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: "Generating clean code...",
                    cancellable: false
                },
                async () => {
                    try {
                        const contextEngine = new ContextEngine();
                        const context = await contextEngine.build(
                            editor.document,
                            editor.selection.active
                        );

                        const request: AIRequest = {
                            task: TaskType.EDIT,
                            context,
                            prompt: {
                                userPrompt
                            },
                            temperature: 0.2,
                            maxTokens: 512
                        };

                        const response = await new AIRequestManager().execute(request);
                        const generated = (response.content || "").trim();

                        if (!generated) {
                            vscode.window.showWarningMessage(
                                "The model returned no code. Please try a more specific prompt."
                            );
                            return;
                        }

                        const applied = await editor.edit(editBuilder => {
                            if (editor.selection.isEmpty) {
                                editBuilder.insert(editor.selection.active, generated);
                            } else {
                                editBuilder.replace(editor.selection, generated);
                            }
                        });

                        if (applied) {
                            vscode.window.showInformationMessage(
                                "Clean code generation completed."
                            );
                        } else {
                            vscode.window.showErrorMessage(
                                "Failed to apply generated clean code."
                            );
                        }
                    } catch (error) {
                        const message = error instanceof Error ? error.message : String(error);
                        vscode.window.showErrorMessage(
                            `Local Coder could not generate clean code: ${message}`
                        );
                    }
                }
            );
        }
    );

    context.subscriptions.push(cleanCodeCommand);
}

export function deactivate() {}