import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { WorkspaceEngine } from '../workspace/WorkspaceEngine';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('build skips expensive symbol scanning on startup', async () => {
		const workspaceExtractor = {
			extract: async () => [{
				path: '/tmp/example.ts',
				name: 'example.ts',
				language: 'typescript'
			}]
		};

		let symbolScanCalled = false;
		const symbolExtractor = {
			extract: async () => {
				symbolScanCalled = true;
				return [];
			}
		};
		const openEditorsExtractor = {
			extract: () => []
		};

		const engine = new WorkspaceEngine(
			workspaceExtractor as any,
			symbolExtractor as any,
			openEditorsExtractor as any
		);

		const context = await engine.build();

		assert.strictEqual(symbolScanCalled, false);
		assert.strictEqual(context.files.length, 1);
		assert.deepStrictEqual(context.symbols, []);
		assert.deepStrictEqual(context.openEditors, []);
	});
});
