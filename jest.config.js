module.exports = {
	preset: 'ts-jest',
	testEnvironment: "node",
	roots: ['<rootDir>/test'],
	coverageDirectory: 'coverage',
	setupFilesAfterEnv: ['./test/setupTests.ts'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!**/test/**',
		'!**/config/**'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@test/(.*)$': '<rootDir>/test/$1'
	},
	verbose: false,
	setupFiles: ['dotenv/config']
}