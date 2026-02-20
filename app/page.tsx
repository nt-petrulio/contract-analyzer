'use client'

import { useState } from 'react'
import { Upload, CheckCircle, AlertTriangle, FileText, Shield } from 'lucide-react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0]
      if (uploadedFile.type === 'application/pdf' && uploadedFile.size <= 10 * 1024 * 1024) {
        setFile(uploadedFile)
      } else {
        alert('Будь ласка, завантажте PDF файл розміром до 10MB')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0]
      if (uploadedFile.type === 'application/pdf' && uploadedFile.size <= 10 * 1024 * 1024) {
        setFile(uploadedFile)
      } else {
        alert('Будь ласка, завантажте PDF файл розміром до 10MB')
      }
    }
  }

  const analyzeContract = async () => {
    if (!file) return

    setAnalyzing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Помилка аналізу')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Помилка при аналізі договору. Спробуйте ще раз.')
    } finally {
      setAnalyzing(false)
    }
  }

  const loadExample = async (type: string) => {
    setAnalyzing(true)
    try {
      const response = await fetch(`/api/example?type=${type}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Помилка при завантаженні прикладу')
    } finally {
      setAnalyzing(false)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button
            onClick={() => { setResult(null); setFile(null) }}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Назад
          </button>

          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center gap-4 mb-8">
              <div className={`text-6xl font-bold ${
                result.score >= 80 ? 'text-green-400' : 
                result.score >= 60 ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {result.score}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Загальна оцінка безпеки договору</h2>
                <p className="text-gray-400">
                  {result.score >= 80 ? 'Договір виглядає безпечно' : 
                   result.score >= 60 ? 'Потребує уваги' : 
                   'Критичні ризики виявлено'}
                </p>
              </div>
            </div>

            {result.critical && result.critical.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  🔴 Критичні ризики
                </h3>
                <div className="space-y-3">
                  {result.critical.map((item: string, idx: number) => (
                    <div key={idx} className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                      <p className="text-red-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.warnings && result.warnings.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  🟡 Потенційні проблеми
                </h3>
                <div className="space-y-3">
                  {result.warnings.map((item: string, idx: number) => (
                    <div key={idx} className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                      <p className="text-yellow-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.ambiguous && result.ambiguous.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  🟢 Нечіткі формулювання
                </h3>
                <div className="space-y-3">
                  {result.ambiguous.map((item: string, idx: number) => (
                    <div key={idx} className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                      <p className="text-green-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  📋 Рекомендації
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((item: string, idx: number) => (
                    <div key={idx} className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                      <p className="text-blue-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Потрібна повна версія?</h3>
                <p className="mb-4">Отримайте детальний аналіз + консультацію юриста</p>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                  Оплатити $19
                </button>
                <p className="text-sm mt-2 opacity-80">або $49/міс для необмеженого доступу</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              ContractGuard
            </h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI аналізує твій договір за 2 хвилини
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Знаходить ризики, які ти пропустив
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-16">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">Швидше за юриста</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">Дешевше в 10 разів</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">Доступно 24/7</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-blue-400 bg-blue-900/20' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2">Завантажити договір</h3>
                <p className="text-gray-400 mb-6">
                  Перетягни PDF файл сюди або натисни кнопку
                </p>
                <label className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-lg font-bold cursor-pointer hover:from-blue-500 hover:to-blue-400 transition">
                  Вибрати файл
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-4">Максимум 10MB, тільки PDF</p>
              </>
            ) : (
              <>
                <FileText className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2">{file.name}</h3>
                <p className="text-gray-400 mb-6">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {analyzing ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
                    <p className="text-lg">Аналізуємо договір...</p>
                    <p className="text-sm text-gray-400">Це може зайняти 30-60 секунд</p>
                  </div>
                ) : (
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={analyzeContract}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-lg font-bold hover:from-blue-500 hover:to-blue-400 transition"
                    >
                      Аналізувати договір
                    </button>
                    <button
                      onClick={() => setFile(null)}
                      className="bg-gray-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-600 transition"
                    >
                      Змінити файл
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Example Contracts */}
          {!analyzing && (
            <div className="mt-12">
              <h3 className="text-center text-xl font-bold mb-6 text-gray-400">
                Або спробуй з прикладом:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => loadExample('nda')}
                  className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition"
                >
                  <FileText className="w-8 h-8 mb-2 text-blue-400" />
                  <h4 className="font-bold">Freelance NDA</h4>
                  <p className="text-sm text-gray-400">Приклад аналізу</p>
                </button>
                <button
                  onClick={() => loadExample('employment')}
                  className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-yellow-500 transition"
                >
                  <FileText className="w-8 h-8 mb-2 text-yellow-400" />
                  <h4 className="font-bold">Employment Contract</h4>
                  <p className="text-sm text-gray-400">Приклад аналізу</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Ціни</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Разовий аналіз</h3>
              <div className="text-5xl font-bold text-blue-400 mb-4">$19</div>
              <p className="text-gray-400 mb-6">За один договір</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Повний аналіз договору</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Виявлення ризиків</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Рекомендації</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>PDF звіт</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 py-4 rounded-lg font-bold hover:bg-blue-500 transition">
                Спробувати
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-yellow-900 border-4 border-yellow-400 rounded-2xl p-8 relative">
              <div className="absolute -top-4 right-8 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold">
                Популярно
              </div>
              <h3 className="text-2xl font-bold mb-2">Безлімітний</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-4">$49</div>
              <p className="text-gray-300 mb-6">На місяць</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Необмежена кількість аналізів</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Пріоритетна обробка</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Історія аналізів</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span>Email підтримка</span>
                </li>
              </ul>
              <button className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold hover:bg-yellow-300 transition">
                Почати зараз
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-800 text-center text-gray-500">
          <p>© 2025 ContractGuard. Зроблено для українських IT компаній 🇺🇦</p>
        </footer>
      </div>
    </div>
  )
}
