import { API_URL } from "../api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAnalysis = async (formData: FormData, token: string | null) => {
  return fetch(`${BACKEND_URL || API_URL}/analyze/`, {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const getCandidateAnalysis = async (formData: FormData, token: string | null) => {
  return fetch(`${BACKEND_URL || API_URL}/feedbackCandidate/`, {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
}