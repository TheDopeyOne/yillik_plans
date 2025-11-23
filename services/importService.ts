import { LessonPlan, ColumnMapping } from '../types';

// Mammoth browser script ile yüklendiği için global window objesinde mevcuttur.
declare var mammoth: any;

export const parseWordFile = async (file: File): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                
                if (typeof mammoth === 'undefined') {
                    reject(new Error("Word okuyucu kütüphanesi yüklenemedi. Sayfayı yenileyip tekrar deneyin."));
                    return;
                }

                // Word -> HTML conversion
                const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                const html = result.value;
                
                // HTML Table -> Array extraction
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const table = doc.querySelector('table');
                
                if (!table) {
                    reject(new Error("Dosyada tablo bulunamadı."));
                    return;
                }

                const rows = Array.from(table.querySelectorAll('tr'));
                const tableData: string[][] = [];

                rows.forEach(row => {
                    const cells = Array.from(row.querySelectorAll('td, th')).map(cell => {
                        // Temizleme: HTML taglerini temizle, boşlukları kırp
                        return cell.textContent?.trim().replace(/\s+/g, ' ') || '';
                    });
                    if (cells.some(c => c.length > 0)) {
                        tableData.push(cells);
                    }
                });

                resolve(tableData);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

// Özel haftaları algılayan yardımcı fonksiyon
const detectSpecialWeek = (text: string): string | null => {
    if (!text) return null;
    const upper = text.toUpperCase();
    if (upper.includes('SINAV') || upper.includes('YAZILI')) return 'SINAV HAFTASI';
    if (upper.includes('ARA TATİL') || upper.includes('YARIYIL')) return 'TATİL';
    if (upper.includes('PLANLAMA') || upper.includes('SEMİNER')) return 'OKUL TEMELLİ PLANLAMA';
    if (upper.includes('BAYRAM') || upper.includes('RESMİ TATİL')) return 'RESMİ TATİL';
    return null;
};

// Tarih verisini temizleyen fonksiyon (Örn: "1. Hafta: 08-12 Eylül" -> "08-12 Eylül")
const cleanDateRange = (raw: string): string => {
    if (!raw) return '';
    // Sadece tarih aralığını (sayı-sayı Ayİsmi) almaya çalış
    // Regex: 1 veya 2 rakam, opsiyonel boşluk, tire, opsiyonel boşluk, 1 veya 2 rakam, boşluk, kelime
    const match = raw.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s+([a-zA-ZçğıöşüÇĞİÖŞÜ]+)/);
    if (match) {
        return match[0]; // Tam eşleşmeyi döndür (örn: 08-12 Eylül)
    }
    // Eğer eşleşme yoksa, "1. Hafta:" gibi prefixleri silip ham veriyi döndür
    return raw.replace(/^\d+\.?\s*Hafta:?\s*/i, '').trim();
};

// Tablo verisini (Array) bizim formatımıza (LessonPlan) çeviren fonksiyon
export const processTableData = (
    rawTable: string[][], 
    mapping: ColumnMapping
): LessonPlan[] => {
    const plans: LessonPlan[] = [];
    
    // Fill-down mantığı için son geçerli değerleri tut
    let lastMonth = "EYLÜL"; // Varsayılan başlangıç

    rawTable.forEach((row, index) => {
        if (!row) return; // Safety check

        // Ensure values are strings to prevent "cannot read properties of undefined (reading 'length')"
        let dateRaw = row[mapping.dateIndex] || '';
        let topicRaw = row[mapping.topicIndex] || '';
        let outcomeRaw = row[mapping.outcomeIndex] || '';

        // Fill-Down Logic (Eğer hücre boşsa üsttekini al - Word merged cell mantığı)
        // Özel Durum Kontrolü (Tüm satırda ara)
        const rowText = row.join(' ').toUpperCase();
        const specialType = detectSpecialWeek(rowText);

        // Ayı tahmin et (Tarih sütunundan)
        let displayMonth = lastMonth;
        const monthMatch = dateRaw.match(/([a-zA-ZçğıöşüÇĞİÖŞÜ]+)$/);
        if (monthMatch) {
            displayMonth = monthMatch[1].toUpperCase();
            lastMonth = displayMonth;
        }

        const cleanDate = cleanDateRange(dateRaw);

        // Eğer satır çok boşsa atla (Tarih ve Konu yoksa)
        if (cleanDate.length < 3 && topicRaw.length < 3) return;

        if (specialType) {
            plans.push({
                range: cleanDate,
                displayMonth: displayMonth,
                topic: specialType, // Konu yerine "SINAV HAFTASI" yaz
                outcome: topicRaw + " " + outcomeRaw // Detayları birleştir
            });
        } else {
            plans.push({
                range: cleanDate,
                displayMonth: displayMonth,
                topic: topicRaw,
                outcome: outcomeRaw
            });
        }
    });

    return plans;
};