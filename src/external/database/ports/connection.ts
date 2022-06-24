export default interface Connection {
	query (statement: string): Promise<any>;
}