import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // TODO: v0のデータベースとの連携を実装
    // 仮の実装として、成功レスポンスを返す
    return NextResponse.json({ message: 'ユーザーを作成しました' })
  } catch (error) {
    return NextResponse.json({ error: 'ユーザーの作成に失敗しました' }, { status: 500 })
  }
}
