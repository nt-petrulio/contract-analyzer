import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import * as pdfParse from 'pdf-parse'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse PDF
    const pdfData = await (pdfParse as any).default(buffer)
    const contractText = pdfData.text

    if (!contractText || contractText.length < 100) {
      return NextResponse.json({ error: 'PDF appears to be empty or too short' }, { status: 400 })
    }

    // Analyze with GPT-4
    const prompt = `Ти — експерт з українського договірного права (IT галузь).
Проаналізуй цей договір і знайди:
1. Критичні ризики (non-compete clauses, IP ownership, liability, payment terms)
2. Потенційні проблеми (unclear terms, missing clauses)
3. Нечіткі формулювання (ambiguous dates, vague scope, unclear deliverables)
4. Відсутні пункти (що має бути, але немає)
5. Червоні прапорці (termination without notice, penalty clauses, unfair terms)

Договір:
${contractText.substring(0, 12000)}

Відповідь дай українською мовою в наступному JSON форматі:
{
  "score": <число від 0 до 100, де 100 = найбезпечніший договір>,
  "critical": [<масив критичних ризиків, кожен елемент - окремий пункт>],
  "warnings": [<масив потенційних проблем>],
  "ambiguous": [<масив нечітких формулювань>],
  "recommendations": [<масив рекомендацій, що робити далі>]
}

Приклад відповіді:
{
  "score": 65,
  "critical": [
    "Відсутній пункт про інтелектуальну власність - всі розробки можуть перейти до замовника",
    "Штраф за розірвання контракту становить 50% від суми договору - надто високий"
  ],
  "warnings": [
    "Термін оплати не вказано чітко - може призвести до затримок",
    "Відсутня процедура прийняття робіт"
  ],
  "ambiguous": [
    "Формулювання 'розумний термін' у пункті 3.2 - потрібно конкретизувати",
    "Поняття 'якісне виконання' не визначено"
  ],
  "recommendations": [
    "Додати розділ про права інтелектуальної власності",
    "Зменшити штраф до 10-20% або домовитись про попередження",
    "Вказати точні терміни оплати (наприклад, '5 робочих днів після підписання акту')",
    "Визначити критерії 'якісного виконання' або процедуру приймання"
  ]
}

Відповідай ТІЛЬКИ валідним JSON без додаткового тексту.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a Ukrainian contract law expert specializing in IT industry contracts. Always respond with valid JSON in Ukrainian language.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const responseText = completion.choices[0].message.content || ''
    
    // Try to parse JSON from response
    let analysis
    try {
      // Remove markdown code blocks if present
      const jsonText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      analysis = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseText)
      // Fallback response
      analysis = {
        score: 50,
        critical: ['Помилка обробки відповіді AI. Спробуйте ще раз.'],
        warnings: [],
        ambiguous: [],
        recommendations: ['Спробуйте завантажити договір ще раз']
      }
    }

    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Error analyzing contract:', error)
    return NextResponse.json(
      { error: 'Failed to analyze contract', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
