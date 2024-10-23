// Função para gerar uma chave idempotente alfanumérica
export function generateIdempotencyKey(length: number = 200): string {
    // Definir os caracteres permitidos (alfanuméricos)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let idempotencyKey = '';

    // Gerar a chave aleatoriamente até o comprimento máximo especificado
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        idempotencyKey += characters[randomIndex];
    }

    return idempotencyKey;
}

// Função para verificar se a chave ainda é válida (dentro de 48 horas)
export function isKeyValid(timestamp: number): boolean {
    const now = Date.now();
    const validityPeriod = 48 * 60 * 60 * 1000; // 48 horas em milissegundos
    return now - timestamp <= validityPeriod;
}