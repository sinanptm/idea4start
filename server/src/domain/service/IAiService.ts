export default interface IAiService {
    generateResponse(prompt: string): Promise<string>;
}
