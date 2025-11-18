
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

export interface NotesData {
    [grade: string]: {
        [weekIndex: number]: string;
    };
}

export type GradeOption = {
    id: string;
    label: string;
    subLabel: string;
    icon: 'atom' | 'telescope' | 'book' | 'calculator';
    color: string;
};
