export default interface IAiService {
    generateText(prompt: string): Promise<string>;
}
