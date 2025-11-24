
export interface LessonPlan {
    range: string;
    displayMonth: string;
    topic: string;
    outcome?: string;    // 9-10. sınıflar için
    achievement?: string; // 11-12. sınıflar için
}

export interface PlanData {
    [key: string]: LessonPlan[];
}

export interface CompletionData {
    [grade: string]: boolean[];
}

export interface ChecklistItem {
    id: string;
    text: string;
    checked: boolean;
}

export interface RichNote {
    text: string;
    images: string[]; // Base64 strings
    audio?: string; // Base64 string for audio recording
    checklist: ChecklistItem[];
}

export interface NotesData {
    [grade: string]: {
        [weekIndex: number]: RichNote | string; // Support legacy string notes
    };
}

export type GradeOption = {
    id: string;
    label: string;
    subLabel: string;
    icon: 'atom' | 'telescope' | 'book' | 'calculator' | 'file-text';
    color: string;
    isCustom?: boolean; // Kullanıcı tarafından eklenen planları işaretlemek için
};

export interface ColumnMapping {
    dateIndex: number;
    topicIndex: number;
    outcomeIndex: number;
}