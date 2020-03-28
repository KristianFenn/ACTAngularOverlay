import { Theme, Layout } from "./config.model";

export interface QueryString {
    playerName: string;
    theme: string;
    layout: string;
    scale: number;
    test: string;
}