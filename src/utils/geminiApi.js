import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "./constants";

const API_KEY = GEMINI_API;

const genAI = new GoogleGenerativeAI(API_KEY);

const AI = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default AI;