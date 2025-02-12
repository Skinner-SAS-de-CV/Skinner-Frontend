"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDesc, setJobDesc] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please upload a file and enter a job description.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("job_desc", jobDesc)

    setLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze_resume/", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error analyzing CV:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-600">📄 Subir CV para Análisis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="text-gray-700 font-medium">Sube tu CV (PDF/DOCX):</label>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          accept=".pdf,.docx"
          className="input"
        />

        <label className="text-gray-700 font-medium">Descripcion del trabajo:</label>
        <Textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Enter the job description here..."
          className="input"
        />

        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze CV"
          )}
        </Button>

        {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">📊 Resultado del Análisis:</h3>
          <p><strong>📄 Archivo:</strong> {result.file_name}</p>
          <p><strong>📊 Puntaje:</strong> {result.match_score}</p>
          <p><strong>🛠 Habilidades:</strong> {result.skills?.length ? result.skills.join(", ") : "No detectadas"}</p>
          <p><strong>📅 Experiencia:</strong> {result.experience?.length ? result.experience.join(" años") : "No detectada"}</p>
          <p>
            <strong>✅ Decisión:</strong>{" "}
            <span className={result.decision === "Selected" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {result.decision}
            </span>
          </p>
          <p><strong>📌 Razón:</strong> {result.reason}</p>
          {result.feedback && <p><strong>💡 Feedback de IA:</strong> {result.feedback}</p>}
        </div>
        )}

      </CardContent>
    </Card>
  )
}

