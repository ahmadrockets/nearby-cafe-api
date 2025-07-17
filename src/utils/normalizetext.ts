const normalizationMap: Record<string, string> = {
    "gw": "saya",
    "gue": "saya",
    "gk": "tidak",
    "ga": "tidak",
    "nggak": "tidak",
    "mau": "ingin",
    "pesen": "pesan",
    "sm": "sama",
    "udh": "sudah",
    "blom": "belum",
    "aja": "saja",
    "nih": "",
    "dong": "",
    "deh": "",
    "ya": "",
    "si": ""
};

export function normalizeText(text: string): string {
    return text
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s.,!?]/g, '')
        .toLowerCase()
        .split(/\s+/)
        .map(word => normalizationMap[word] ?? word)
        .filter(Boolean)
        .join(" ");
}
