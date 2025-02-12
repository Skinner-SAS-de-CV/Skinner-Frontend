import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-gray-50 p-6">
      <Card className="max-w-3xl bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
        <CardContent className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">📄 CV Analyzer</h1>
          <p className="text-lg text-gray-600">
          Sube tu CV y ​​compáralo para ver qué tan compatible es.
          </p>
          <div className="w-full flex justify-center">
            <Image
              src="/robot.jpg"
              alt="CV Analysis"
              width={400}
              height={300}
              className="w-full max-w-sm sm:max-w-md rounded-lg shadow-md drop-shadow-lg"
            />
          </div>
          <Link href="/analyze">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              🚀 Start Analysis
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

