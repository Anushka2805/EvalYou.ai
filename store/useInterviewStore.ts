import { create } from "zustand";

export type InterviewMode = "cv" | "hr" | "company";

export interface Answer {
    question: string;
    videoUrl: string;
    timestamp: number;
}

export interface QuestionResult {
    confidence: number;
    communication: number;
    bodyLanguage: number;
    content: number;
    feedbackGood: string;
    feedbackImprove: string;
}

export interface InterviewResult {
    overall: number;
    confidence: number;
    communication: number;
    bodyLanguage: number;
    content: number;
    perQuestion: QuestionResult[];
}

export interface InterviewSession {
    id: string;
    date: number;
    mode: InterviewMode;
    role: string;
    company: string;
    experience: string;
    questions: string[];
    answers: Answer[];
    results: InterviewResult;
}

interface InterviewState {
    // current session
    mode: InterviewMode;
    role: string;
    company: string;
    experience: string;
    questions: string[];
    answers: Answer[];
    results: InterviewResult | null;

    // history
    sessions: InterviewSession[];

    // actions
    setConfig: (data: Partial<InterviewState>) => void;
    setQuestions: (q: string[]) => void;
    addAnswer: (a: Answer) => void;
    setResults: (r: InterviewResult) => void;
    saveSessionToHistory: () => void;
    loadSessions: () => void;
    loadSessionById: (id: string) => void;
    resetSession: () => void;
    getLastSession: () => InterviewSession | null;
    deleteSession: (id: string) => void;
    clearSessions: () => void;

}

const STORAGE_KEY = "evalyou_sessions";

export const useInterviewStore = create<InterviewState>((set, get) => ({
    mode: "cv",
    role: "Software Engineer",
    company: "General",
    experience: "Fresher",
    questions: [],
    answers: [],
    results: null,
    sessions: [],

    setConfig: (data) => set((state) => ({ ...state, ...data })),
    setQuestions: (q) => set({ questions: q }),
    addAnswer: (a) =>
        set((state) => ({
            answers: [...state.answers, a],
        })),
    setResults: (r) => set({ results: r }),

    saveSessionToHistory: () => {
        const state = get();
        if (!state.results) return;

        const newSession: InterviewSession = {
            id: crypto.randomUUID(),
            date: Date.now(),
            mode: state.mode,
            role: state.role,
            company: state.company,
            experience: state.experience,
            questions: state.questions,
            answers: state.answers,
            results: state.results,
        };

        const updated = [newSession, ...state.sessions];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        set({ sessions: updated });
    },

    loadSessions: () => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed: InterviewSession[] = JSON.parse(raw);
        set({ sessions: parsed });
    },

    loadSessionById: (id: string) => {
        const state = get();
        const session = state.sessions.find((s) => s.id === id);
        if (!session) return;

        set({
            mode: session.mode,
            role: session.role,
            company: session.company,
            experience: session.experience,
            questions: session.questions,
            answers: session.answers,
            results: session.results,
        });
    },

    resetSession: () =>
        set({
            questions: [],
            answers: [],
            results: null,
        }),
    getLastSession: () => {
        const state = get();
        return state.sessions.length ? state.sessions[0] : null;
    },
    deleteSession: (id: string) => {
        const state = get();
        const updated = state.sessions.filter((s) => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ sessions: updated });
    },

    clearSessions: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({ sessions: [] });
    },
}));